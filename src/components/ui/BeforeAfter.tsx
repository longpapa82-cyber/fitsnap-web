import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { asset } from '../../lib/asset';
import './before-after.css';

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}

/**
 * Before/After 슬라이더 — FitSnap "변신의 순간" 핵심 인터랙션.
 * 앱 BeforeAfterSlider 로직을 웹으로 각색(clip-path 아님, 앱 방식):
 *  - after를 스테이지 전체로 깔고, before를 클립 래퍼(width만 축소, overflow:hidden)로 얹음.
 *  - before 이미지는 스테이지 실측 폭(--ba-w)으로 고정 → 래퍼가 줄어도 이미지는 왼쪽 기준
 *    동일 위치·크기로 렌더되어 after와 픽셀 정확히 겹친다.
 *  - pointer 드래그 + 키보드 + 진입 자동 스윕(reduced-motion 존중).
 *
 * ⚠️ 완벽 정렬 전제: before/after가 동일 카메라·구도의 정렬된 쌍이어야 함.
 *    (정렬 안 된 쌍이면 경계에서 인물이 어긋남 — 데이터 요건)
 */
export function BeforeAfter({ beforeSrc, afterSrc, beforeAlt = '변경 전', afterAlt = '변경 후' }: BeforeAfterProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0.5); // 0~1
  const [dragging, setDragging] = useState(false);
  const [demoed, setDemoed] = useState(false);
  const [stageW, setStageW] = useState(0); // 스테이지 실측 폭(px) — before 이미지 고정폭
  const reduced = useReducedMotion();

  // 스테이지 실제 폭 추적 → before 이미지를 이 폭으로 고정(앱 방식).
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (w) setStageW(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)));
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

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 0.05));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(1, p + 0.05));
  };

  // 진입 자동 시연(1회 좌→우 스윕). reduced-motion이면 생략.
  useEffect(() => {
    if (reduced || demoed) return;
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setDemoed(true);
          io.disconnect();
          [0.2, 0.8, 0.5].forEach((v, i) => setTimeout(() => setPos(v), 400 + i * 700));
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
      style={stageW ? ({ ['--ba-w' as string]: `${stageW}px` }) : undefined}
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
      {/* after: 스테이지 전체 배경 */}
      <img className="ba-img" src={asset(afterSrc)} alt={afterAlt} draggable={false} />
      {/* before: 클립 래퍼(width만 축소) + 고정폭 이미지 → after와 정확히 겹침 */}
      <div className={`ba-clip${dragging ? '' : ' ba-anim'}`} style={{ width: `${pct}%` }} aria-hidden>
        <img className="ba-img ba-stage-w" src={asset(beforeSrc)} alt={beforeAlt} draggable={false} />
      </div>
      {/* 손잡이 */}
      <div className={`ba-handle${dragging ? '' : ' ba-anim'}`} style={{ left: `${pct}%` }} aria-hidden>
        <span className="ba-handle-grip">⟨ ⟩</span>
      </div>
      {/* 라벨 */}
      <span className="ba-label ba-label--before">{beforeAlt}</span>
      <span className="ba-label ba-label--after">{afterAlt}</span>
    </div>
  );
}
