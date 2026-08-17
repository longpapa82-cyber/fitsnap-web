import { STORES } from '../../constants/site.shared.mjs';
import './store-cta.css';

/**
 * 스토어 다운로드 버튼 — SSOT(site.shared.mjs)에서 URL·상태.
 * status='coming-soon'이면 링크 대신 "출시 예정" 배지(lawPic 패턴).
 */
export function StoreCTA() {
  return (
    <div className="store-cta">
      <StoreButton label="Google Play" sub={badge(STORES.android.status)} store={STORES.android} />
      <StoreButton label="App Store" sub={badge(STORES.ios.status)} store={STORES.ios} />
    </div>
  );
}

function badge(status: string): string {
  return status === 'live' ? '다운로드' : '출시 예정';
}

function StoreButton({
  label,
  sub,
  store,
}: {
  label: string;
  sub: string;
  store: { url: string; status: string };
}) {
  const live = store.status === 'live';
  const inner = (
    <>
      <span className="store-btn-sub">{sub}</span>
      <span className="store-btn-label">{label}</span>
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
