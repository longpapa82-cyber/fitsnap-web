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
      <div className="os-stage">
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
