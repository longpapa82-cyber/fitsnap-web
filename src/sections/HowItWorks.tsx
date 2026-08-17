import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import './how-it-works.css';

const STEPS = [
  { n: '01', title: '내 사진 업로드', desc: '전신이 나온 사진 한 장이면 충분해요.' },
  { n: '02', title: '입어볼 옷 선택', desc: '쇼핑몰 옷 사진이나 갖고 있는 옷 사진을 올려요.' },
  { n: '03', title: 'AI가 입혀줘요', desc: '몇 초 만에 진짜 입은 것처럼 결과를 확인해요.' },
];

/** HowItWorks — 3단계 플로우. FitSnap 사용법을 한눈에. */
export function HowItWorks() {
  return (
    <Section id="how" eyebrow="How it works" title="이렇게 간단해요">
      <div className="how-grid">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 100}>
            <div className="how-step">
              <span className="how-num">{s.n}</span>
              <h3 className="how-step-title">{s.title}</h3>
              <p className="how-step-desc">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
