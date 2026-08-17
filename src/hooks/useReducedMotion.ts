import { useEffect, useState } from 'react';

/**
 * prefers-reduced-motion 감지. 접근성: 모션 최소화 사용자에겐 자동 애니메이션을 끈다.
 * SSR 안전(초기값 false, 클라이언트에서 실제 매체쿼리 반영).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
