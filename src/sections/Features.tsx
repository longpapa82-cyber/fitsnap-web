import { useEffect, useRef, useState } from 'react';
import { Section } from '../components/ui/Section';
import { CompareSlider } from '../components/ui/CompareSlider';
import { Icon, type IconName } from '../components/ui/Icon';
import './features.css';

interface Feat {
  icon: IconName;
  title: string;
  desc: string;
  area: string; // grid-area 이름
  big?: boolean;
}

const FEATURES: Feat[] = [
  { icon: 'tryon', title: '가상 착용', desc: '옷 사진만 있으면 실제 입은 모습을 미리 확인해요.', area: 'a', big: true },
  { icon: 'ruler', title: '체형 맞춤 핏', desc: '키·몸무게·체형을 입력하면 핏 표현에 참고해요.', area: 'b' },
  { icon: 'wardrobe', title: '내 옷장 저장', desc: '마음에 드는 결과를 저장하고 언제든 다시 꺼내봐요.', area: 'c' },
  { icon: 'sparkle', title: '고해상도 결과', desc: '구독하면 워터마크 없이 선명한 결과를 받아요.', area: 'd' },
];

/**
 * Features — bento 레이아웃(D4). 대표 타일(가상 착용)은 좌측 카피 + 우측 미리보기를
 * 가로로 배치해 2×2 공간을 꽉 채운다(빈 공간 제거). 나머지는 작게. 스크롤 진입 시 스태거.
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
            {f.big ? (
              <div className="feat-big-inner">
                <div className="feat-big-copy">
                  <span className="feat-icon" aria-hidden><Icon name={f.icon} size={30} /></span>
                  <h3 className="feat-title">{f.title}</h3>
                  <p className="feat-desc">{f.desc}</p>
                  <ul className="feat-big-points">
                    <li>내 사진 + 옷 사진, 두 장이면 끝</li>
                    <li>얼굴·포즈는 그대로, 옷만 바뀜</li>
                    <li>구매 전 어울림을 미리 확인</li>
                  </ul>
                </div>
                {/* 우측 미리보기: before/after 드래그 슬라이더(정렬된 inpaint 쌍) */}
                <div className="feat-preview">
                  <CompareSlider
                    beforeSrc="/assets/demo/features-before.webp"
                    afterSrc="/assets/demo/features-after.webp"
                    beforeAlt="원본"
                    afterAlt="AI 착용"
                  />
                </div>
              </div>
            ) : (
              <>
                <span className="feat-icon" aria-hidden><Icon name={f.icon} size={26} /></span>
                <h3 className="feat-title">{f.title}</h3>
                <p className="feat-desc">{f.desc}</p>
              </>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
