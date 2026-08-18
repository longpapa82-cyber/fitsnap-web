import type { ReactNode } from 'react';
import { STORES } from '../../constants/site.shared.mjs';
import './store-cta.css';

/**
 * 스토어 다운로드 버튼 — SSOT(site.shared.mjs)에서 URL·상태 + 브랜드 마크.
 * status='coming-soon'이면 링크 대신 "출시 예정" 배지.
 */

// Google Play 컬러 삼각형 로고.
const GooglePlayIcon = (
  <svg viewBox="0 0 512 512" width="22" height="22" aria-hidden focusable="false">
    <path fill="#00D0FF" d="M65 47c-6 6-9 15-9 27v364c0 12 3 21 9 27l1 1 204-204v-5L66 46z" />
    <path fill="#00F076" d="M337 324l-68-68v-5l68-68 2 1 81 46c23 13 23 34 0 47l-81 46z" />
    <path fill="#FF3A44" d="M339 323l-70-70L65 457c8 8 20 9 34 1z" />
    <path fill="#FFC900" d="M339 183L99 54c-14-8-26-7-34 1l204 203z" />
  </svg>
);

// Apple 로고(단색).
const AppleIcon = (
  <svg viewBox="0 0 384 512" width="22" height="22" aria-hidden focusable="false">
    <path fill="currentColor" d="M318 271c-1-58 47-86 49-87-27-39-68-44-83-45-35-4-69 21-87 21-18 0-45-20-74-20-38 1-73 22-93 56-40 69-10 171 28 227 19 27 41 58 70 57 28-1 39-18 73-18 34 0 43 18 73 17 30-1 49-28 67-55 21-31 30-61 30-63-1-1-58-22-59-90zM261 74c15-19 26-45 23-71-22 1-49 15-65 34-14 16-27 43-24 68 25 2 50-13 66-31z" />
  </svg>
);

export function StoreCTA() {
  return (
    <div className="store-cta">
      <StoreButton icon={GooglePlayIcon} label="Google Play" sub={badge(STORES.android.status)} store={STORES.android} />
      <StoreButton icon={<span className="apple-wrap">{AppleIcon}</span>} label="App Store" sub={badge(STORES.ios.status)} store={STORES.ios} />
    </div>
  );
}

function badge(status: string): string {
  return status === 'live' ? '다운로드' : '출시 예정';
}

function StoreButton({
  icon,
  label,
  sub,
  store,
}: {
  icon: ReactNode;
  label: string;
  sub: string;
  store: { url: string; status: string };
}) {
  const live = store.status === 'live';
  const inner = (
    <>
      <span className="store-btn-icon">{icon}</span>
      <span className="store-btn-text">
        <span className="store-btn-sub">{sub}</span>
        <span className="store-btn-label">{label}</span>
      </span>
    </>
  );
  return live ? (
    <a className="store-btn store-btn--live" href={store.url} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <span className="store-btn store-btn--soon" aria-disabled="true">
      {inner}
    </span>
  );
}
