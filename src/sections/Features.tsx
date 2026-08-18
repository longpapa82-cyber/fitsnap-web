import { useEffect, useRef, useState } from 'react';
import { Section } from '../components/ui/Section';
import { BeforeAfter } from '../components/ui/BeforeAfter';
import './features.css';

interface Feat {
  icon: string;
  title: string;
  desc: string;
  area: string; // grid-area 이름
  big?: boolean;
}

const FEATURES: Feat[] = [
  { icon: '👕', title: '가상 착용', desc: '옷 사진만 있으면 실제 입은 모습을 미리 확인해요.', area: 'a', big: true },
  { icon: '📏', title: '체형 맞춤 핏', desc: '키·몸무게·체형을 입력하면 핏 표현에 참고해요.', area: 'b' },
  { icon: '🗂️', title: '내 옷장 저장', desc: '마음에 드는 결과를 저장하고 언제든 다시 꺼내봐요.', area: 'c' },
  { icon: '✨', title: '고해상도 결과', desc: '구독하면 워터마크 없이 선명한 결과를 받아요.', area: 'd' },
];

/**
 * Features — bento 레이아웃(D4). 대표 기능(가상 착용)을 크게 + 미니 미리보기,
 * 나머지는 작게. 크기 대비로 시각 위계를 만든다. 스크롤 진입 시 스태거 등장.
 */
export function Features() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => { if (e[0]?.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section id="features" eyebrow="Features" title="쇼핑이 더 똑똑해져요" tone="tint">
      <div ref={gridRef} className={`feat-bento${shown ? ' feat-bento--in' : ''}`}>
        {FEATURES.map((f, i) => (
          <article
            key={f.title}
            className={`feat-card feat-card--${f.area}${f.big ? ' feat-card--big' : ''}`}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <span className="feat-icon" aria-hidden>{f.icon}</span>
            <h3 className="feat-title">{f.title}</h3>
            <p className="feat-desc">{f.desc}</p>
            {/* 대표 타일: 미니 before/after 크로스페이드(정렬 불필요) */}
            {f.big && (
              <div className="feat-preview">
                <BeforeAfter
                  beforeSrc="/assets/demo/hero-before.webp"
                  afterSrc="/assets/demo/hero-after.webp"
                  beforeAlt="원본"
                  afterAlt="AI 착용"
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
