import { useEffect, useRef, useState, type ReactNode } from 'react';
import './reveal.css';

interface RevealProps {
  children: ReactNode;
  /** 진입 지연(ms) — 스태거용. */
  delay?: number;
  as?: 'div' | 'section' | 'li';
}

/**
 * 스크롤 진입 페이드업 — IntersectionObserver. 한 번만 실행(once).
 * prefers-reduced-motion 은 CSS(reveal.css)에서 즉시 표시로 처리.
 * transform/opacity 만 애니 → 컴포지터 친화(60fps).
 */
export function Reveal({ children, delay = 0, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal${shown ? ' reveal--in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
