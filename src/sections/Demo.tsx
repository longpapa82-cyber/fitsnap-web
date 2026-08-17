import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { BeforeAfter } from '../components/ui/BeforeAfter';
import './demo.css';

/**
 * Demo — 실제 변신 결과를 크게 보여주는 쇼케이스.
 * W1 Hero의 슬라이더를 재사용하되, 여기선 "결과 품질"에 집중한 카피와 함께.
 * (실제 VTON 케이스가 늘면 갤러리로 확장 가능)
 */
export function Demo() {
  return (
    <Section id="demo" eyebrow="See the magic" title="직접 보세요, 이 변신을">
      <div className="demo-grid">
        <Reveal>
          <div className="demo-visual">
            <BeforeAfter
              beforeSrc="/assets/demo/hero-before.webp"
              afterSrc="/assets/demo/hero-after.webp"
              beforeAlt="옷 입기 전"
              afterAlt="AI 가상 착용 결과"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="demo-copy">
            <h3 className="demo-heading">얼굴도, 포즈도, 배경도 그대로</h3>
            <p className="demo-text">
              FitSnap은 당신의 모습을 그대로 유지한 채 옷만 자연스럽게 바꿔요. 체형 정보를 입력하면 핏도 더 정확해져요.
            </p>
            <ul className="demo-points">
              <li>실제 착용감에 가까운 드레이프·핏</li>
              <li>고해상도 결과 · 워터마크 없음(구독)</li>
              <li>결과는 내 옷장에 저장</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
