import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { StoreCTA } from '../components/ui/StoreCTA';
import './final-cta.css';

/** FinalCTA — 마지막 다운로드 유도. 코랄 강조 배경 + 떠다니는 옷 실루엣(클라이맥스, HQ-3). */
export function FinalCTA() {
  return (
    <Section id="download" tone="dark">
      {/* 떠다니는 옷 실루엣 — 몰입형 배경 장식 */}
      <div className="final-shapes" aria-hidden>
        <svg className="final-shape final-shape--1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 9.5 8.8 7A3.2 3.2 0 0 0 12 8.6 3.2 3.2 0 0 0 15.2 7L18 9.5l-2.3 2v6.9H8.3v-6.9L6 9.5Z" />
        </svg>
        <svg className="final-shape final-shape--2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.2 4h5.6l-1 4 2.4 11.8H7.8L10.2 8Z" />
        </svg>
        <svg className="final-shape final-shape--3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6a1.6 1.6 0 1 1 1.4 2.3c-.9.2-1.4.7-1.4 1.5l7.4 4.1c1 .6.6 2.1-.5 2.1H4.1c-1.1 0-1.5-1.5-.5-2.1L11 9.3" />
        </svg>
      </div>
      <Reveal>
        <div className="final-inner">
          <span className="final-eyebrow">Ready?</span>
          <h2 className="final-title">사기 전에,<br />먼저 입어보세요</h2>
          <p className="final-sub">지금 FitSnap을 받고 무료로 시작하세요.</p>
          <div className="final-cta">
            <StoreCTA />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
