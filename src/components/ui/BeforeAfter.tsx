import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { asset } from '../../lib/asset';
import './before-after.css';

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** CLS 방어용 원본 종횡비(width, height). 미지정 시 CSS aspect-ratio가 대신. */
  width?: number;
  height?: number;
}

/**
 * Before/After 슬라이더 — FitSnap "변신의 순간" 핵심 인터랙션.
 * 앱 BeforeAfterSlider 로직을 웹으로 각색:
 *  - after를 전체로 깔고, before를 위에 얹되 clip-path(inset)로 손잡이 위치까지만 표시.
 *  - 두 이미지 모두 스테이지 전체 크기 → 클립해도 왜곡 없이 정확히 겹침.
 *  - 진입 시 자동 좌→우 스윕 1회로 "이렇게 바뀌었어요" 시연(reduced-motion 존중).
 *  - pointer 이벤트로 드래그. clip-path/opacity만 변경 → 컴포지터 친화.
 */
export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = '변경 전',
  afterAlt = '변경 후',
  width = 900,
  height = 1125,
}: BeforeAfterProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0.5); // 0~1
  const [dragging, setDragging] = useState(false);
  const [demoed, setDemoed] = useState(false);
  const reduced = useReducedMotion();

  // 포인터 위치 → 비율.
  const updateFromClientX = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    setPos(Math.min(1, Math.max(0, ratio)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging) updateFromClientX(e.clientX);
  };
  const onPointerUp = () => setDragging(false);

  // 키보드 접근성: 좌우 화살표로 조절.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 0.05));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(1, p + 0.05));
  };

  // 진입 자동 시연: 뷰포트 진입 시 1회 좌→우 스윕. reduced-motion이면 생략.
  useEffect(() => {
    if (reduced || demoed) return;
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setDemoed(true);
          io.disconnect();
          // 0.5 → 0.15 → 0.85 → 0.5 시퀀스 (CSS transition이 부드럽게 처리)
          const seq = [0.15, 0.85, 0.5];
          seq.forEach((v, i) => setTimeout(() => setPos(v), 400 + i * 700));
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, demoed]);

  const pct = pos * 100;

  return (
    <div
      ref={stageRef}
      className="ba-stage"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      role="slider"
      aria-label="변경 전후 비교 슬라이더"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* after: 전체 배경. width/height 명시로 CLS(레이아웃 시프트) 방어. asset()로 base 접두. */}
      <img className="ba-img" src={asset(afterSrc)} alt={afterAlt} width={width} height={height} draggable={false} />
      {/* before: 위에 얹고 오른쪽을 클립(손잡이 오른쪽은 after가 보임) */}
      <img
        className={`ba-img ba-before${dragging ? '' : ' ba-anim'}`}
        src={asset(beforeSrc)}
        alt={beforeAlt}
        width={width}
        height={height}
        draggable={false}
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      />
      {/* 손잡이 */}
      <div className={`ba-handle${dragging ? '' : ' ba-anim'}`} style={{ left: `${pct}%` }} aria-hidden>
        <span className="ba-handle-grip">⟨ ⟩</span>
      </div>
      {/* 라벨 */}
      <span className="ba-label ba-label--before">BEFORE</span>
      <span className="ba-label ba-label--after">AFTER</span>
    </div>
  );
}
