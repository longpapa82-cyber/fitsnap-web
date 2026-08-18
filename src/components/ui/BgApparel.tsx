import { asset } from '../../lib/asset';
import './bg-apparel.css';

/**
 * 배경 옷장 레이어 — "가상 피팅룸/옷장" 분위기.
 * 실제 옷 이미지 카드가 부유 + 라인 의류 아이콘. blob 위·콘텐츠 뒤. 장식이라 aria-hidden.
 */

// 라인 의류 아이콘(currentColor).
const ICONS = {
  tshirt: <path d="M8.5 3 L5 5 L3 8 L5.5 10 L7 8.5 V21 H17 V8.5 L18.5 10 L21 8 L19 5 L15.5 3 Q12 6 8.5 3 Z" />,
  hat: <path d="M4 17 H15 M6 17 Q6 8 12 8 Q17 8 17 13 L20 15 L17 17" />,
  pants: <path d="M7 3 H17 L16 21 H13 L12 11 L11 21 H8 Z" />,
};

// 부유하는 실제 옷 이미지 카드.
const FLOAT_IMGS = [
  { src: '/assets/demo/float/coat.webp', cls: 'fi-1' },
  { src: '/assets/demo/float/dress.webp', cls: 'fi-2' },
  { src: '/assets/demo/float/jacket.webp', cls: 'fi-3' },
  { src: '/assets/demo/float/knit.webp', cls: 'fi-4' },
];

const LINE_ICONS: { icon: keyof typeof ICONS; cls: string }[] = [
  { icon: 'tshirt', cls: 'ap-1' },
  { icon: 'hat', cls: 'ap-5' },
  { icon: 'pants', cls: 'ap-4' },
  { icon: 'tshirt', cls: 'ap-6' },
];

export function BgApparel() {
  return (
    <div className="bg-apparel" aria-hidden>
      {/* 부유하는 실제 옷 이미지 카드 */}
      {FLOAT_IMGS.map((f, i) => (
        <div key={i} className={`fi ${f.cls}`}>
          <img src={asset(f.src)} alt="" loading="lazy" draggable={false} />
        </div>
      ))}
      {/* 라인 의류 아이콘(여백 채움) */}
      {LINE_ICONS.map((it, i) => (
        <svg key={i} className={`ap ${it.cls}`} viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
          {ICONS[it.icon]}
        </svg>
      ))}
    </div>
  );
}
