import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { StoreCTA } from '../components/ui/StoreCTA';
import './final-cta.css';

/** FinalCTA — 마지막 다운로드 유도. 코랄 강조 배경(클라이맥스). */
export function FinalCTA() {
  return (
    <Section id="download" tone="dark">
      <Reveal>
        <div className="final-inner">
          <h2 className="final-title">사기 전에, 먼저 입어보세요</h2>
          <p className="final-sub">지금 FitSnap을 받고 무료로 시작하세요.</p>
          <div className="final-cta">
            <StoreCTA />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
