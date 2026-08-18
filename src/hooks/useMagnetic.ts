import { useEffect } from 'react';

/**
 * 마그네틱 호버(FUN-3) — 커서가 요소 근처에 오면 살짝 끌려오는 손맛.
 * 요소 중심 대비 커서 오프셋을 strength 비율로 translate. 벗어나면 원위치.
 * pointermove(가벼움). 터치·reduced-motion 비활성.
 * @param strength 끌림 정도(0~1, 기본 0.3)
 */
export function useMagnetic(ref: React.RefObject<HTMLElement>, strength = 0.3): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      el.style.setProperty('--mx', `${(e.clientX - cx) * strength}px`);
      el.style.setProperty('--my', `${(e.clientY - cy) * strength}px`);
    };
    const reset = () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', reset);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', reset);
    };
  }, [ref, strength]);
}
