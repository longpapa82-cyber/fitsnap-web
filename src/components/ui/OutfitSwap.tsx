import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { asset } from '../../lib/asset';
import './outfit-swap.css';

interface Outfit {
  id: string;
  label: string;
  src: string;
}

const OUTFITS: Outfit[] = [
  { id: 'base', label: '원본', src: '/assets/demo/outfits/base.webp' },
  { id: 'knit', label: '니트', src: '/assets/demo/outfits/knit.webp' },
  { id: 'coat', label: '코트', src: '/assets/demo/outfits/coat.webp' },
  { id: 'shirt', label: '셔츠', src: '/assets/demo/outfits/shirt.webp' },
  { id: 'jacket', label: '자켓', src: '/assets/demo/outfits/jacket.webp' },
];

/**
 * 옷장 스와이프 — 같은 인물에 옷을 갈아입히는 가상 피팅룸 데모(D2).
 * 옷 썸네일 클릭 → 인물이 크로스페이드로 갈아입음. 자동 순환(hover·focus 시 멈춤).
 * 모든 옷 이미지가 동일 프레임(고정 subject 생성)이라 제자리에서 옷만 바뀐다.
 */
export function OutfitSwap() {
  const [active, setActive] = useState(1); // 니트로 시작(원본 다음)
  const [paused, setPaused] = useState(false);
  const [shake, setShake] = useState(false);

  // FUN-2: 랜덤 스타일링 — 현재와 다른 무작위 옷으로 전환 + 흔들림 모션.
  const randomize = () => {
    setActive((cur) => {
      let next = cur;
      while (next === cur) next = Math.floor(Math.random() * OUTFITS.length);
      return next;
    });
    setPaused(true);
    setShake(true);
    window.setTimeout(() => setShake(false), 500);
  };
  const reduced = useReducedMotion();
  const timer = useRef<number | null>(null);

  // 자동 순환 — reduced-motion·일시정지 시 멈춤.
  useEffect(() => {
    if (reduced || paused) return;
    timer.current = window.setInterval(() => {
      setActive((i) => (i + 1) % OUTFITS.length);
    }, 2600);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [reduced, paused]);

  return (
    <div
      className="os"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`os-stage${shake ? ' os-stage--shake' : ''}`}>
        {OUTFITS.map((o, i) => (
          <img
            key={o.id}
            className={`os-img${i === active ? ' os-show' : ''}`}
            src={asset(o.src)}
            alt={`${o.label} 착용 모습`}
            draggable={false}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <span className="os-badge">{OUTFITS[active].label}</span>
        {/* FUN-2: 랜덤 스타일링 버튼 */}
        <button className="os-random" onClick={randomize} aria-label="랜덤 스타일링">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="16" cy="8" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="8" cy="16" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="16" cy="16" r="1.3" fill="currentColor" stroke="none" />
          </svg>
          <span>랜덤</span>
        </button>
      </div>

      {/* 옷 썸네일 선택 */}
      <div className="os-thumbs" role="tablist" aria-label="옷 선택">
        {OUTFITS.map((o, i) => (
          <button
            key={o.id}
            className={`os-thumb${i === active ? ' os-thumb--on' : ''}`}
            role="tab"
            aria-selected={i === active}
            aria-label={o.label}
            onClick={() => { setActive(i); setPaused(true); }}
            onFocus={() => setPaused(true)}
          >
            <img src={asset(o.src)} alt="" draggable={false} loading="lazy" />
            <span>{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
