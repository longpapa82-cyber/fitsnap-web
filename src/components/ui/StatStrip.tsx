import { useCountUp } from '../../hooks/useCountUp';
import './stat-strip.css';

/**
 * 통계 스트립(FUN-4) — 스크롤 진입 시 숫자 카운트업.
 * ⚠️ 사실 기반 수치만: 사진 2장(내 사진+옷 사진), 3단계, 무료 생성 약 5초(gemini flash-lite).
 * 과장/허위 금지(컴플라이언스).
 */

interface Stat {
  target: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { target: 2, suffix: '장', label: '내 사진 + 옷 사진이면 끝' },
  { target: 3, suffix: '단계', label: '업로드부터 결과까지' },
  { target: 5, suffix: '초', label: '결과를 미리 확인' },
];

function StatItem({ stat }: { stat: Stat }) {
  const [ref, value] = useCountUp(stat.target);
  return (
    <div className="stat-item">
      <span className="stat-num" ref={ref}>
        {stat.target === 5 ? '약 ' : ''}{value}
        <span className="stat-suffix">{stat.suffix}</span>
      </span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

export function StatStrip() {
  return (
    <div className="stat-strip">
      {STATS.map((s) => (
        <StatItem key={s.label} stat={s} />
      ))}
    </div>
  );
}
