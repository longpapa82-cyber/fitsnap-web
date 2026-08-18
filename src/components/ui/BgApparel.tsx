import './bg-apparel.css';

/**
 * 배경 의류 아이콘 — "옷장/피팅룸" 분위기. 코랄 톤 라인 아이콘이 은은히 떠다닌다.
 * 앱 아이콘(코랄 티셔츠)과 톤 일치. blob 위, 콘텐츠 뒤. 장식이라 aria-hidden.
 * 아이콘은 viewBox 0 0 24 24 기준으로 또렷하게 의류를 표현.
 */

const ICONS = {
  // 티셔츠: 목선 + 소매 + 몸통
  tshirt: (
    <path d="M8.5 3 L5 5 L3 8 L5.5 10 L7 8.5 V21 H17 V8.5 L18.5 10 L21 8 L19 5 L15.5 3 Q12 6 8.5 3 Z" />
  ),
  // 원피스: 어깨끈 + A라인
  dress: (
    <path d="M9 3 L15 3 L14 8 L18 21 L6 21 L10 8 Z M9 3 L11 6 M15 3 L13 6" />
  ),
  // 코트: 라펠 + 몸통 + 밑단
  coat: (
    <path d="M8 3 L12 5 L16 3 L19 5 L18 21 H14 V11 M10 21 H6 L5 5 Z M12 5 V21" />
  ),
  // 바지: 허리 + 두 다리
  pants: (
    <path d="M7 3 H17 L16 21 H13 L12 11 L11 21 H8 Z" />
  ),
  // 모자(캡): 챙 + 크라운
  hat: (
    <path d="M4 17 H15 M6 17 Q6 8 12 8 Q17 8 17 13 L20 15 L17 17" />
  ),
};

interface Item { icon: keyof typeof ICONS; cls: string; }
const ITEMS: Item[] = [
  { icon: 'tshirt', cls: 'ap-1' },
  { icon: 'dress',  cls: 'ap-2' },
  { icon: 'coat',   cls: 'ap-3' },
  { icon: 'pants',  cls: 'ap-4' },
  { icon: 'hat',    cls: 'ap-5' },
  { icon: 'tshirt', cls: 'ap-6' },
  { icon: 'dress',  cls: 'ap-7' },
];

export function BgApparel() {
  return (
    <div className="bg-apparel" aria-hidden>
      {ITEMS.map((it, i) => (
        <svg key={i} className={`ap ${it.cls}`} viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
          {ICONS[it.icon]}
        </svg>
      ))}
    </div>
  );
}
