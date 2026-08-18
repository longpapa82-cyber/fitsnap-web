import { BeforeAfter } from '../components/ui/BeforeAfter';
import { StoreCTA } from '../components/ui/StoreCTA';
import { Reveal } from '../components/ui/Reveal';
import { SITE } from '../constants/site.shared.mjs';
import './hero.css';

/** 떠다니는 옷 태그 칩 — 피팅룸 분위기(가벼운 parallax float). */
const FLOAT_TAGS = [
  { label: '니트', cls: 'hero-tag--1' },
  { label: '코트', cls: 'hero-tag--2' },
  { label: '원피스', cls: 'hero-tag--3' },
  { label: '자켓', cls: 'hero-tag--4' },
];

/**
 * Hero — "피팅룸 거울" 연출(D1). 좌: 카피+CTA / 우: 전신 거울(before/after 슬라이더).
 * 거울 프레임·바닥 반사·상단 광원·떠다니는 옷 칩으로 가상 피팅룸 현실감을 더한다.
 * 기존 BeforeAfter 슬라이더는 그대로, 시각 레이어만 감싼다.
 */
export function Hero() {
  return (
    <section id="hero" className="hero">
      {/* 피팅룸 분위기: 은은한 광원 + 떠다니는 옷 칩 */}
      <div className="hero-atmos" aria-hidden>
        <span className="hero-glow" />
        {FLOAT_TAGS.map((t) => (
          <span key={t.label} className={`hero-tag ${t.cls}`}>{t.label}</span>
        ))}
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
            {/* 전신 거울: 프레임 + 슬라이더 + 바닥 반사 */}
            <div className="hero-mirror">
              <div className="hero-mirror-frame">
                <BeforeAfter
                  beforeSrc="/assets/demo/hero-before.webp"
                  afterSrc="/assets/demo/hero-after.webp"
                  beforeAlt="옷을 입기 전 모델 사진"
                  afterAlt="AI 가상 착용 결과"
                />
                {/* 거울 상단 광택 */}
                <span className="hero-mirror-sheen" aria-hidden />
              </div>
              {/* 거울 아래 바닥 반사 */}
              <div className="hero-reflection" aria-hidden>
                <img src="/assets/demo/hero-after.webp" alt="" draggable={false} />
              </div>
            </div>
            <p className="hero-hint">← 드래그해서 변신을 확인하세요 →</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
