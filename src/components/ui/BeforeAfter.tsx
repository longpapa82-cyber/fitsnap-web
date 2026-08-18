import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { asset } from '../../lib/asset';
import './before-after.css';

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}

/**
 * Before/After 크로스페이드 — 앱 TransformDemo 방식.
 *
 * 왜 슬라이더가 아니라 크로스페이드인가:
 *  슬라이더(경계 분할)는 두 이미지가 픽셀 100% 동일해야 정렬된다. 하지만 VTON 결과는
 *  AI가 매번 인물을 재생성해 픽셀이 어긋난다(수차례 증명). 크로스페이드는 두 이미지를 겹쳐
 *  opacity만 전환 → 각각 온전하게 보여 정렬 문제가 원천적으로 없다.
 *
 * 동작: after 유지(2.3s) ↔ before 페이드 반복. reduced-motion이면 after 고정.
 */
export function BeforeAfter({ beforeSrc, afterSrc, beforeAlt = '원본', afterAlt = 'AI 가상 착용 결과' }: BeforeAfterProps) {
  const reduced = useReducedMotion();
  const [showAfter, setShowAfter] = useState(true);

  useEffect(() => {
    if (reduced) { setShowAfter(true); return; }
    const id = setInterval(() => setShowAfter((v) => !v), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="ba-stage" aria-label="변경 전후 비교">
      {/* before: 아래 깔림 */}
      <img className="ba-img" src={asset(beforeSrc)} alt={beforeAlt} draggable={false} />
      {/* after: 위에 얹고 opacity 전환 */}
      <img
        className={`ba-img ba-after${showAfter ? ' ba-show' : ''}`}
        src={asset(afterSrc)}
        alt={afterAlt}
        draggable={false}
      />
      {/* 라벨: 현재 보이는 쪽 강조 */}
      <span className={`ba-label ba-label--before${showAfter ? '' : ' ba-label--on'}`}>{beforeAlt}</span>
      <span className={`ba-label ba-label--after${showAfter ? ' ba-label--on' : ''}`}>{afterAlt}</span>
    </div>
  );
}
