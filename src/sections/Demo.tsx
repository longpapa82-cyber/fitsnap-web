import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { OutfitSwap } from '../components/ui/OutfitSwap';
import './demo.css';

/**
 * Demo — 옷장 스와이프(D2). 같은 인물에 옷을 갈아입혀 보는 가상 피팅룸 체험.
 * 썸네일을 눌러 옷을 바꾸는 재미로 "입어보기"를 직관적으로 보여준다.
 */
export function Demo() {
  return (
    <Section id="demo" eyebrow="Virtual fitting room" title="옷장을 넘겨보며 입어봐요">
      <div className="demo-grid">
        <Reveal>
          <div className="demo-visual">
            <OutfitSwap />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="demo-copy">
            <h3 className="demo-heading">한 사람, 여러 옷 — 넘겨보며 비교</h3>
            <p className="demo-text">
              마음에 드는 옷을 눌러보세요. 같은 모습에 옷만 갈아입혀 어떤 게 더 어울리는지 한눈에 비교할 수 있어요. 결과는 구매 판단을 돕는 참고용이에요.
            </p>
            <ul className="demo-points">
              <li>옷 썸네일을 눌러 즉시 갈아입기</li>
              <li>얼굴·포즈는 그대로, 옷만 바뀜</li>
              <li>마음에 드는 결과는 내 옷장에 저장</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
