import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import './faq.css';

const ITEMS = [
  {
    q: '결과가 실제 착용과 비슷한가요?',
    a: 'AI가 사진 속 체형과 포즈를 유지한 채 옷을 입혀요. 키·몸무게·체형 정보를 입력하면 핏이 더 정확해져요. 다만 완벽하진 않으며, 구매 판단을 돕는 참고용이에요.',
  },
  {
    q: '내 사진은 안전하게 처리되나요?',
    a: '사진은 결과 생성에만 사용되며, 설정에서 자동 삭제를 켜면 생성 직후 원본이 삭제돼요. 자세한 내용은 개인정보처리방침을 참고하세요.',
  },
  {
    q: '무료로 써볼 수 있나요?',
    a: '가입하면 무료 크레딧이 제공돼 바로 입어볼 수 있어요. 더 필요하면 구독하거나 크레딧을 충전하세요.',
  },
  {
    q: '어떤 옷이든 되나요?',
    a: '상의·하의·아우터·원피스 등 대부분의 의류가 가능해요. 옷 사진이 선명할수록 결과가 좋아요.',
  },
  {
    q: '구독은 언제든 해지할 수 있나요?',
    a: '네, 스토어(App Store / Google Play) 구독 관리에서 언제든 해지할 수 있어요. 무료체험 기간 중 해지하면 요금이 청구되지 않아요.',
  },
];

/** FAQ — 시맨틱 <details>/<summary> 아코디언. 첫 항목 기본 열림. */
export function FAQ() {
  return (
    <Section id="faq" eyebrow="FAQ" title="궁금한 점이 있으신가요?">
      <div className="faq-list">
        {ITEMS.map((item, i) => (
          <Reveal key={item.q} delay={i * 60} as="div">
            <details className="faq-item" open={i === 0}>
              <summary className="faq-q">{item.q}</summary>
              <p className="faq-a">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
