import { useEffect } from 'react';

/**
 * 3D tilt(HQ-1) — 마우스 위치에 따라 카드가 살짝 기울어 입체감(고퀄 손맛).
 * 카드 rect 기준 커서 위치를 -0.5~0.5로 정규화해 CSS 변수 --rx/--ry에 반영.
 * CSS에서 rotateX/rotateY로 사용. rAF 없이 pointermove(가벼움). 터치·reduced-motion 비활성.
 * @param max 최대 기울기(도)
 */
export function useTilt(ref: React.RefObject<HTMLElement>, max = 6): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--ry', `${px * max}deg`);
      el.style.setProperty('--rx', `${-py * max}deg`);
    };
    const reset = () => {
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--rx', '0deg');
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', reset);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', reset);
    };
  }, [ref, max]);
}
