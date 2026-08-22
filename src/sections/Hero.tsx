import { CompareSlider } from '../components/ui/CompareSlider';
import { StoreCTA } from '../components/ui/StoreCTA';
import { Reveal } from '../components/ui/Reveal';
import { SITE } from '../constants/site.shared.mjs';
import './hero.css';

/**
 * Hero — "피팅룸 거울" 연출. 좌: 카피+CTA / 우: 전신 거울(before/after 드래그 슬라이더).
 * 거울 프레임·상단 광원으로 가상 피팅룸 현실감을 더한다.
 * CompareSlider는 핸들을 좌우로 밀어 전후를 비교(정렬된 inpaint 쌍이라 경계가 맞물림).
 * 바닥 반사는 제거 — 슬라이더 경계가 움직이면 "반쯤 before인데 반사는 after" 모순이 생김(앱과 통일).
 */
export function Hero() {
  return (
    <section id="hero" className="hero">
      {/* 히어로 국소 광원·blob(거울과 안 겹치게 가장자리) */}
      <div className="hero-atmos" aria-hidden>
        <span className="hero-glow" />
        <span className="hero-blob hero-blob--1" />
        <span className="hero-blob hero-blob--2" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <Reveal>
            <span className="hero-eyebrow">{SITE.name}</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="hero-title">
              사기 전에,<br />
              <span className="hero-accent">
                입어보세요
                <svg className="hero-underline" viewBox="0 0 220 12" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 8 Q 60 2 110 6 T 218 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="hero-sub">
              내 사진과 옷 사진만 있으면 돼요. AI가 입은 모습을 미리 보여줘, 사기 전에 어울리는지 확인하는 데 도움을 줘요.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="hero-cta">
              <StoreCTA />
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="hero-visual">
            {/* 전신 거울: 프레임 + 드래그 슬라이더 */}
            <div className="hero-mirror">
              <div className="hero-mirror-frame">
                <CompareSlider
                  beforeSrc="/assets/demo/hero-before.webp"
                  afterSrc="/assets/demo/hero-after.webp"
                  beforeAlt="옷을 입기 전"
                  afterAlt="AI 가상 착용"
                />
                {/* 거울 상단 광택 */}
                <span className="hero-mirror-sheen" aria-hidden />
              </div>
            </div>
            <p className="hero-hint">핸들을 좌우로 밀어 전후를 비교해 보세요</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
