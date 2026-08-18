import { useEffect, useRef, useState } from 'react';

/**
 * 숫자 카운트업(FUN-4) — 요소가 뷰포트에 들어오면 0→target으로 애니.
 * IntersectionObserver로 1회 트리거. reduced-motion이면 즉시 target 표시.
 * @param target 목표 숫자
 * @param duration ms
 * @returns [ref, 현재 표시값]
 */
export function useCountUp(
  target: number,
  duration = 1200
): [React.RefObject<HTMLSpanElement>, number] {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    let startTs = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const step = (ts: number) => {
          if (!startTs) startTs = ts;
          const p = Math.min((ts - startTs) / duration, 1);
          // ease-out
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(eased * target));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return [ref, value];
}
