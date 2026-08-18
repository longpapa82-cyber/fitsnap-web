import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { SUBSCRIPTIONS, CREDIT_PACKS } from '../constants/products.mjs';
import './pricing.css';

/**
 * Pricing — 구독 3티어(주간 리드/월/연 앵커) + 크레딧팩. 앱 products.ts 값 미러링.
 * 웹은 결제 안 함 → "앱에서 시작" CTA(다운로드 유도).
 */
export function Pricing() {
  return (
    <Section id="pricing" eyebrow="Pricing" title="부담 없이 시작해요">
      <p className="pricing-note">가입하면 무료 크레딧을 드려요. 마음에 들면 구독하거나 필요한 만큼 충전하세요.</p>

      <div className="price-grid">
        {SUBSCRIPTIONS.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}>
            <div className={`price-card${s.isLead ? ' price-card--lead' : ''}`}>
              {s.isLead && <span className="price-badge">추천</span>}
              <h3 className="price-title">{s.title}</h3>
              <div className="price-amount">
                <strong>{s.priceLabel}</strong>
                <span>/{s.period}</span>
              </div>
              {s.trialDays ? <p className="price-trial">{s.trialDays}일 무료체험</p> : null}
              {s.anchorNote ? <p className="price-anchor">{s.anchorNote}</p> : null}
              <ul className="price-perks">
                {s.perks.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="pack-row">
          <span className="pack-label">또는 필요한 만큼 충전</span>
          <div className="pack-chips">
            {CREDIT_PACKS.map((p) => (
              <div key={p.title} className="pack-chip">
                <strong>{p.credits}회</strong>
                <span>{p.priceLabel}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <p className="pricing-disclaimer">
        표시된 가격은 출시 예정 가격이며, 실제 결제 금액은 App Store·Google Play의 지역별 가격에 따라 달라질 수 있어요.
      </p>
    </Section>
  );
}
