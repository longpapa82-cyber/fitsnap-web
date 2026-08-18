import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { asset } from '../lib/asset';
import './how-it-works.css';

const STEPS = [
  { n: '01', title: '내 사진 업로드', desc: '전신이 나온 사진 한 장이면 충분해요.', img: '/assets/demo/steps/step1.webp' },
  { n: '02', title: '입어볼 옷 선택', desc: '쇼핑몰 옷 사진이나 갖고 있는 옷 사진을 올려요.', img: '/assets/demo/steps/step2.webp' },
  { n: '03', title: 'AI가 입혀줘요', desc: '몇 초 만에 입은 모습을 미리 확인해요.', img: '/assets/demo/steps/step3.webp' },
];

/**
 * HowItWorks — 3단계 플로우(FUN-1). 각 단계에 미니 비주얼 + 번호 배지 + 연결 화살표로
 * 사용 흐름을 시각화하고 빈 공간을 채운다. 스크롤 진입 시 순차 등장(Reveal delay).
 */
export function HowItWorks() {
  return (
    <Section id="how" eyebrow="How it works" title="이렇게 간단해요">
      <ol className="how-grid">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 140}>
            <li className="how-step">
              <div className="how-media">
                <img src={asset(s.img)} alt={`${s.title} 단계`} loading="lazy" draggable={false} />
                <span className="how-num">{s.n}</span>
              </div>
              <h3 className="how-step-title">{s.title}</h3>
              <p className="how-step-desc">{s.desc}</p>
              {i < STEPS.length - 1 && (
                <span className="how-arrow" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
