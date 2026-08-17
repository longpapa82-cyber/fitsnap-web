import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import './features.css';

const FEATURES = [
  { icon: '👕', title: '가상 착용', desc: '옷 사진만 있으면 실제 입은 모습을 미리 확인해요.' },
  { icon: '📏', title: '체형 맞춤 핏', desc: '키·몸무게·체형을 입력하면 핏이 더 정확해져요.' },
  { icon: '🗂️', title: '내 옷장 저장', desc: '마음에 드는 결과를 저장하고 언제든 다시 꺼내봐요.' },
  { icon: '✨', title: '고해상도 결과', desc: '구독하면 워터마크 없이 선명한 결과를 받아요.' },
];

/** Features — 핵심 기능 4종 타일. */
export function Features() {
  return (
    <Section id="features" eyebrow="Features" title="쇼핑이 더 똑똑해져요" tone="tint">
      <div className="feat-grid">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 80}>
            <div className="feat-card">
              <span className="feat-icon" aria-hidden>{f.icon}</span>
              <h3 className="feat-title">{f.title}</h3>
              <p className="feat-desc">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
