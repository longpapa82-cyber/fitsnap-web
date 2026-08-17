import { BeforeAfter } from '../components/ui/BeforeAfter';
import { StoreCTA } from '../components/ui/StoreCTA';
import { Reveal } from '../components/ui/Reveal';
import { SITE } from '../constants/site.shared.mjs';
import './hero.css';

/**
 * Hero — "변신의 순간"이 첫 화면. 좌: 카피+CTA / 우: before/after 슬라이더.
 * before/after가 FitSnap의 핵심 설득 자산이라 히어로 정중앙에 배치.
 */
export function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <Reveal>
            <span className="hero-eyebrow">{SITE.name}</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="hero-title">
              사기 전에,<br />
              <span className="hero-accent">입어보세요</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="hero-sub">
              내 사진과 옷 사진만 있으면 돼요. AI가 진짜 입은 것처럼 보여줘, 사기 전에 어울리는지 확인할 수 있어요.
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
            <BeforeAfter
              beforeSrc="/assets/demo/hero-before.webp"
              afterSrc="/assets/demo/hero-after.webp"
              beforeAlt="옷을 입기 전 사용자 사진"
              afterAlt="AI 가상 착용 결과"
            />
            <p className="hero-hint">← 드래그해서 변신을 확인하세요 →</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
