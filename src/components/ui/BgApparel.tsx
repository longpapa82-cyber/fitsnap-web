import { useRef } from 'react';
import { asset } from '../../lib/asset';
import { useParallax } from '../../hooks/useParallax';
import './bg-apparel.css';

/**
 * 문서 전체 배경 옷장 레이어 — "가상 피팅룸/옷장" 분위기.
 * 다양한 인물·옷 이미지 카드 + 세련된 라인 의류 아이콘을 전 페이지 좌우 가장자리에 촘촘히 배치.
 * absolute(body 기준)라 스크롤 시 함께 흐름. 콘텐츠 컬럼 바깥이라 안 겹침. 장식이라 aria-hidden.
 */

// 세련된 라인 아이콘 — Icon.tsx와 톤 통일(둥근 join, 부드러운 곡선).
const ICONS = {
  tshirt: <path d="M6 9.5 8.8 7A3.2 3.2 0 0 0 12 8.6 3.2 3.2 0 0 0 15.2 7L18 9.5l-2.3 2v6.9H8.3v-6.9L6 9.5Z" />,
  dress: <path d="M9.2 4h5.6l-1 4 2.4 11.8H7.8L10.2 8ZM9.2 4 11 6.5M14.8 4 13 6.5" />,
  hanger: <path d="M12 6a1.6 1.6 0 1 1 1.4 2.3c-.9.2-1.4.7-1.4 1.5l7.4 4.1c1 .6.6 2.1-.5 2.1H4.1c-1.1 0-1.5-1.5-.5-2.1L11 9.3" />,
  coat: <path d="M8 5 6 8v11h5V5m2 0v14h5V8l-2-3M12 5 8 5m4 0 4 0M12 5v10" />,
};

// 다양한 인물·옷(여성4·남성4·젊은여성2·곡선여성2 = 12종). 좌우 가장자리 전 페이지 분포.
const OUTFITS = [
  'coat', 'dress', 'jacket', 'knit',
  'm-knit', 'm-coat', 'm-jacket', 'm-shirt',
  'f-knit', 'f-dress', 'c-coat', 'c-dress',
];
// 옷 이미지 카드 — 12개 카드에 12종을 겹치지 않게 1:1 배치(전부 다른 인물·옷).
const FLOAT_IMGS = [
  { o: 0, cls: 'fi-1' }, { o: 4, cls: 'fi-2' }, { o: 8, cls: 'fi-3' }, { o: 5, cls: 'fi-4' },
  { o: 1, cls: 'fi-5' }, { o: 9, cls: 'fi-6' }, { o: 2, cls: 'fi-7' }, { o: 6, cls: 'fi-8' },
  { o: 10, cls: 'fi-9' }, { o: 3, cls: 'fi-10' }, { o: 7, cls: 'fi-11' }, { o: 11, cls: 'fi-12' },
];

const LINE_ICONS: { icon: keyof typeof ICONS; cls: string }[] = [
  { icon: 'hanger', cls: 'ap-1' }, { icon: 'dress', cls: 'ap-2' }, { icon: 'tshirt', cls: 'ap-3' },
  { icon: 'coat', cls: 'ap-4' }, { icon: 'hanger', cls: 'ap-5' }, { icon: 'tshirt', cls: 'ap-6' },
  { icon: 'dress', cls: 'ap-7' }, { icon: 'coat', cls: 'ap-8' },
];

export function BgApparel() {
  const rootRef = useRef<HTMLDivElement>(null);
  useParallax(rootRef);
  return (
    <div className="bg-apparel" aria-hidden ref={rootRef}>
      {FLOAT_IMGS.map((f, i) => (
        <div key={i} className={`fi ${f.cls}`}>
          <img src={asset(`/assets/demo/float/${OUTFITS[f.o]}.webp`)} alt="" loading="lazy" draggable={false} />
        </div>
      ))}
      {LINE_ICONS.map((it, i) => (
        <svg key={i} className={`ap ${it.cls}`} viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
          {ICONS[it.icon]}
        </svg>
      ))}
    </div>
  );
}
