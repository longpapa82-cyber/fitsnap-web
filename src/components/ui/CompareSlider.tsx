import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { asset } from '../../lib/asset';
import './compare-slider.css';

interface CompareSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** 초기 경계 위치(%). 기본 50. */
  initial?: number;
}

/**
 * Before/After 좌우 드래그 슬라이더.
 *
 * 왜 이제 슬라이더가 가능한가:
 *  과거엔 VTON 결과가 AI 재생성으로 픽셀이 어긋나 슬라이더(경계 분할)가 불가 → 크로스페이드.
 *  현재 에셋은 앱 inpaint(상의 밴드만 교체, 밴드 밖 원본 강제 복원)로 before/after가 픽셀
 *  정렬(밴드 밖 diff≈0)이라 슬라이더 경계가 어디서든 맞물린다.
 *
 * 정렬 보장: 두 img 모두 object-fit:cover + object-position:center 동일 좌표계 →
 *  before를 감싼 .cs-clip에 clip-path만 걸어 잘라도 경계가 정확히 일치.
 * 성능: 경계 위치는 CSS 변수(--pos)로 전달 → 드래그 중 React 리렌더 없이 컴포지터만 갱신.
 * 접근성: 핸들 role="slider" + aria-valuenow, 키보드 ←/→(±2), Home/End(0/100).
 */
export function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = '원본',
  afterAlt = 'AI 가상 착용 결과',
  initial = 50,
}: CompareSliderProps) {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(initial); // 리렌더 없이 현재값 추적(키보드/드래그 공용)
  const [pos, setPos] = useState(initial); // aria-valuenow 표시용(가끔 갱신)
  // 사용자가 한 번이라도 조작하면 자동 스윕 영구 중단(수동 모드로 전환).
  const interacted = useRef(false);
  const rafRef = useRef<number | null>(null);

  // 경계 위치 반영: DOM CSS 변수 직접 조작(리렌더 회피) + aria용 state 동기화.
  const apply = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(100, next));
    posRef.current = clamped;
    if (stageRef.current) stageRef.current.style.setProperty('--pos', `${clamped}%`);
    setPos(Math.round(clamped));
  }, []);

  useEffect(() => {
    apply(initial);
  }, [initial, apply]);

  // 사용자 조작 시작: 자동 스윕 중단(rAF 취소) + 이후 스윕 재개 안 함.
  const stopAuto = useCallback(() => {
    interacted.current = true;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // 진입 시 자동 스윕 — 경계선이 좌↔우로 왕복하며 "밀면 옷이 바뀐다"를 시연.
  // 뷰포트 진입(IntersectionObserver) 시 1회 시작. reduced-motion·사용자조작 시 생략/중단.
  useEffect(() => {
    if (reduced) return;
    const el = stageRef.current;
    if (!el) return;

    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started || interacted.current) return;
        started = true;
        io.disconnect();

        // 이징 왕복: initial → 22% → 82% → initial. 총 ~3.4s.
        const KEYS = [
          { t: 0, v: initial },
          { t: 900, v: 22 },
          { t: 2100, v: 82 },
          { t: 3400, v: initial },
        ];
        const startTs = performance.now();
        const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2); // easeInOutQuad
        const tick = (now: number) => {
          if (interacted.current) return; // 도중 조작 시 중단
          const elapsed = now - startTs;
          // 현재 구간 찾기
          let seg = KEYS.length - 1;
          for (let i = 0; i < KEYS.length - 1; i++) {
            if (elapsed < KEYS[i + 1].t) { seg = i; break; }
          }
          if (elapsed >= KEYS[KEYS.length - 1].t) {
            apply(initial);
            rafRef.current = null;
            return;
          }
          const a = KEYS[seg];
          const b = KEYS[seg + 1];
          const p = ease((elapsed - a.t) / (b.t - a.t));
          apply(a.v + (b.v - a.v) * p);
          rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, initial, apply]);

  // 포인터 x → 경계 %(마우스·터치 공용, pointer capture로 스테이지 밖 드래그도 추적).
  const fromClientX = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return posRef.current;
    const rect = el.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }, []);

  const dragging = useRef(false);
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    stopAuto();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    apply(fromClientX(e.clientX));
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    apply(fromClientX(e.clientX));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    let handled = true;
    if (e.key === 'ArrowLeft') apply(posRef.current - 2);
    else if (e.key === 'ArrowRight') apply(posRef.current + 2);
    else if (e.key === 'Home') apply(0);
    else if (e.key === 'End') apply(100);
    else handled = false;
    if (handled) {
      e.preventDefault();
      stopAuto();
    }
  };

  return (
    <div
      ref={stageRef}
      className="cs-stage"
      style={{ ['--pos' as string]: `${initial}%` }}
      aria-label="변경 전후 비교 슬라이더"
    >
      {/* after: 전체 깔림(경계 오른쪽에 노출) */}
      <img className="cs-img" src={asset(afterSrc)} alt={afterAlt} draggable={false} />
      {/* before: clip으로 왼쪽 pos%만 노출 */}
      <div className="cs-clip">
        <img className="cs-img" src={asset(beforeSrc)} alt={beforeAlt} draggable={false} />
      </div>

      {/* 라벨 */}
      <span className="cs-label cs-label--before">{beforeAlt}</span>
      <span className="cs-label cs-label--after">{afterAlt}</span>

      {/* 드래그 히트 영역(스테이지 전체) + 핸들 */}
      <div
        className="cs-drag"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="cs-handle"
          role="slider"
          tabIndex={0}
          aria-label="비교 경계"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pos}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
        >
          <span className="cs-grip" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path d="M9 6 L5 12 L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 6 L19 12 L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
