import './icon.css';

/**
 * 브랜드 커스텀 아이콘 세트 — 이모지 대체.
 * Duotone 스타일: 옅은 코랄 면(soft) + 코랄 라인(currentColor).
 * OS별 렌더 편차 없이 코랄 톤으로 통일. 24×24 그리드, stroke 1.6, round join.
 */

export type IconName =
  | 'tryon' | 'ruler' | 'wardrobe' | 'sparkle'
  | 'hanger' | 'camera' | 'shirt' | 'dress' | 'check';

const PATHS: Record<IconName, JSX.Element> = {
  // 가상 착용: 옷걸이 위 티셔츠(면+라인)
  tryon: (
    <>
      <path className="i-fill" d="M6 9.5 8.8 7A3.2 3.2 0 0 1 12 5.6 3.2 3.2 0 0 1 15.2 7L18 9.5l-2.3 2v6.9H8.3v-6.9L6 9.5Z" />
      <path className="i-line" d="M6 9.5 8.8 7A3.2 3.2 0 0 0 12 8.6 3.2 3.2 0 0 0 15.2 7L18 9.5l-2.3 2v6.9H8.3v-6.9L6 9.5Z" />
    </>
  ),
  // 체형 맞춤 핏: 줄자
  ruler: (
    <>
      <rect className="i-fill" x="3.5" y="8" width="17" height="8" rx="1.6" transform="rotate(-20 12 12)" />
      <path className="i-line" d="M3.9 13.4 19.9 7.6M8 9.2l.9 2.4m2-3.1.9 2.4m2-3.1.9 2.4m2-3.1.9 2.4" />
    </>
  ),
  // 내 옷장 저장: 서랍장
  wardrobe: (
    <>
      <rect className="i-fill" x="5" y="4" width="14" height="16" rx="1.8" />
      <path className="i-line" d="M5 4h14v16H5zM12 4v16M9.4 9.6h.01M14.6 9.6h.01" />
    </>
  ),
  // 고해상도: 반짝임
  sparkle: (
    <>
      <path className="i-fill" d="M12 3.5c.5 3.9 1.6 5 5.5 5.5-3.9.5-5 1.6-5.5 5.5-.5-3.9-1.6-5-5.5-5.5 3.9-.5 5-1.6 5.5-5.5Z" />
      <path className="i-line" d="M12 3.5c.5 3.9 1.6 5 5.5 5.5-3.9.5-5 1.6-5.5 5.5-.5-3.9-1.6-5-5.5-5.5 3.9-.5 5-1.6 5.5-5.5ZM18 15.5c.3 1.7.8 2.2 2.5 2.5-1.7.3-2.2.8-2.5 2.5-.3-1.7-.8-2.2-2.5-2.5 1.7-.3 2.2-.8 2.5-2.5Z" />
    </>
  ),
  // 옷걸이(배경/보조)
  hanger: (
    <path className="i-line" d="M12 6a1.6 1.6 0 1 1 1.4 2.3c-.9.2-1.4.7-1.4 1.5l8 4.4c1 .6.6 2.3-.6 2.3H4.6c-1.2 0-1.6-1.7-.6-2.3l8-4.4" />
  ),
  // 카메라(보조)
  camera: (
    <>
      <rect className="i-fill" x="3.5" y="7.5" width="17" height="11" rx="2.2" />
      <path className="i-line" d="M3.5 9.7A2.2 2.2 0 0 1 5.7 7.5h1.1l1.2-2h6l1.2 2h1.1a2.2 2.2 0 0 1 2.2 2.2v6.6a2.2 2.2 0 0 1-2.2 2.2H5.7a2.2 2.2 0 0 1-2.2-2.2Z" />
      <circle className="i-line" cx="12" cy="13" r="3" />
    </>
  ),
  shirt: (
    <path className="i-line" d="M6 9.5 8.8 7A3.2 3.2 0 0 0 12 8.6 3.2 3.2 0 0 0 15.2 7L18 9.5l-2.3 2v6.9H8.3v-6.9L6 9.5Z" />
  ),
  dress: (
    <path className="i-line" d="M9.2 4h5.6l-1 4 2.4 11.8H7.8L10.2 8ZM9.2 4 11 6.5M14.8 4 13 6.5" />
  ),
  check: <path className="i-line" d="M5 12.5 10 17.5 19 6.5" />,
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
  return (
    <svg
      className={`icon${className ? ` ${className}` : ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
