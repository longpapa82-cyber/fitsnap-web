import { useEffect } from 'react';

/**
 * 스크롤 패럴럭스 — window.scrollY를 CSS 변수 `--scroll`(px)로 노출.
 * React 리렌더 없이 rAF로 DOM에 직접 세팅 → 컴포지터 transform만 사용(성능).
 * 카드마다 CSS에서 `translateY(calc(var(--scroll) * <speed>))`로 속도차 부여.
 * reduced-motion이면 아무것도 안 함(--scroll=0 유지 → 패럴럭스 정지).
 */
export function useParallax(targetRef: React.RefObject<HTMLElement>): void {
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      el.style.setProperty('--scroll', String(window.scrollY));
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [targetRef]);
}
