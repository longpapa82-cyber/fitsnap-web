import { asset } from '../../lib/asset';
import './bg-apparel.css';

/**
 * 문서 전체 배경 옷장 레이어 — "가상 피팅룸/옷장" 분위기.
 * 실제 옷 이미지 카드 + 라인 의류 아이콘을 전 페이지 좌우 가장자리에 촘촘히 배치.
 * absolute(body 기준)라 스크롤 시 함께 흐름. 콘텐츠 컬럼 바깥이라 안 겹침. 장식이라 aria-hidden.
 */

const ICONS = {
  tshirt: <path d="M8.5 3 L5 5 L3 8 L5.5 10 L7 8.5 V21 H17 V8.5 L18.5 10 L21 8 L19 5 L15.5 3 Q12 6 8.5 3 Z" />,
  hat: <path d="M4 17 H15 M6 17 Q6 8 12 8 Q17 8 17 13 L20 15 L17 17" />,
  pants: <path d="M7 3 H17 L16 21 H13 L12 11 L11 21 H8 Z" />,
  dress: <path d="M9 3 L15 3 L14 8 L18 21 L6 21 L10 8 Z M9 3 L11 6 M15 3 L13 6" />,
};

const OUTFITS = ['coat', 'dress', 'jacket', 'knit'];
// 옷 이미지 카드 — 좌우 번갈아, 전 페이지에 촘촘히(top %).
const FLOAT_IMGS = [
  { o: 0, cls: 'fi-1' }, { o: 1, cls: 'fi-2' }, { o: 2, cls: 'fi-3' }, { o: 3, cls: 'fi-4' },
  { o: 1, cls: 'fi-5' }, { o: 0, cls: 'fi-6' }, { o: 3, cls: 'fi-7' }, { o: 2, cls: 'fi-8' },
];

const LINE_ICONS: { icon: keyof typeof ICONS; cls: string }[] = [
  { icon: 'tshirt', cls: 'ap-1' }, { icon: 'hat', cls: 'ap-2' }, { icon: 'pants', cls: 'ap-3' },
  { icon: 'dress', cls: 'ap-4' }, { icon: 'tshirt', cls: 'ap-5' }, { icon: 'hat', cls: 'ap-6' },
  { icon: 'pants', cls: 'ap-7' }, { icon: 'dress', cls: 'ap-8' },
];

export function BgApparel() {
  return (
    <div className="bg-apparel" aria-hidden>
      {FLOAT_IMGS.map((f, i) => (
        <div key={i} className={`fi ${f.cls}`}>
          <img src={asset(`/assets/demo/float/${OUTFITS[f.o]}.webp`)} alt="" loading="lazy" draggable={false} />
        </div>
      ))}
      {LINE_ICONS.map((it, i) => (
        <svg key={i} className={`ap ${it.cls}`} viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
          {ICONS[it.icon]}
        </svg>
      ))}
    </div>
  );
}
