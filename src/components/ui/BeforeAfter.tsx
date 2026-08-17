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
 * Before/After 크로스페이드 데모 — 앱 TransformDemo 방식(docs/10 무대3) 웹 이식.
 *
 * 왜 슬라이더가 아니라 크로스페이드인가:
 *  슬라이더(경계 분할)는 "동일 카메라·동일 구도에 옷만 바뀐 진짜 VTON 쌍"이어야 정렬된다.
 *  데모 자산(onboard before/after)은 다른 촬영 컷이라 슬라이더에선 경계가 어긋난다.
 *  크로스페이드는 두 이미지를 겹쳐 opacity만 전환 → 정렬 불필요, 앱과 동일하게 자연스럽다.
 *
 * 동작: after 유지(1.4s) → before로 페이드(0.9s) → 유지 → after로 반복.
 * reduced-motion이면 after 고정(정적).
 */
export function BeforeAfter({ beforeSrc, afterSrc, beforeAlt = '원본', afterAlt = '입은 모습' }: BeforeAfterProps) {
  const reduced = useReducedMotion();
  const [showAfter, setShowAfter] = useState(true); // after 보임 여부

  useEffect(() => {
    if (reduced) {
      setShowAfter(true);
      return;
    }
    // 1.4s 유지 + 0.9s 전환 = 2.3s 주기로 토글.
    const id = setInterval(() => setShowAfter((v) => !v), 2300);
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
