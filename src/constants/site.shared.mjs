/**
 * 사이트 단일 진실원본(SSOT) — React 컴포넌트와 빌드 스크립트가 공용.
 * .mjs 라 Node ESM 빌드 스크립트에서도 그대로 import 가능.
 *
 * ⚠️ TODO 값은 확정 후 이 파일 한 곳만 수정하면 사이트 전체 반영.
 */

// 사이트 기본 정보 ──────────────────────────────────────────────
// 배포 origin: 빌드 시 SITE_ORIGIN env로 주입(SSOT). 미설정 시 플레이스홀더.
//  - GitHub Pages 기본 URL: SITE_ORIGIN=https://<user>.github.io/<repo>
//  - 커스텀 도메인:          SITE_ORIGIN=https://fitsnap.app
// (Node 빌드스크립트는 process.env, 브라우저는 빌드타임에 이미 확정된 값 사용)
const ORIGIN =
  (typeof process !== 'undefined' && process.env && process.env.SITE_ORIGIN) ||
  'https://fitsnap.app';

export const SITE = {
  name: 'FitSnap',
  origin: ORIGIN,
  tagline: '사기 전에 입어보세요',
  description:
    'AI 가상 착용으로 옷을 실제로 입어보지 않고도 입은 모습을 확인하세요. 내 사진과 옷 사진만으로 가상 피팅.',
  locale: 'ko_KR',
};

// 스토어 링크 ──────────────────────────────────────────────────
// status: 'live' | 'coming-soon'. coming-soon 이면 StoreCTA가 "출시 예정" 배지로 표시.
export const STORES = {
  android: {
    // TODO: Play 출시 후 실제 URL로 교체
    url: 'https://play.google.com/store/apps/details?id=app.fitsnap',
    status: 'coming-soon',
  },
  ios: {
    // TODO: App Store 출시 후 실제 URL로 교체
    url: 'https://apps.apple.com/app/id0000000000',
    status: 'coming-soon',
  },
};

// 회사/연락처 (법리 페이지·푸터) ─────────────────────────────────
// TODO: 실제 사업자 정보로 교체
export const COMPANY = {
  name: 'AI Soft', // 상호
  ceo: '',
  address: '',
  bizRegNo: '', // 사업자등록번호
  email: 'fitsnap.help@gmail.com',
};

// 법리 페이지 유효일 ────────────────────────────────────────────
export const LEGAL = {
  effectiveDate: '2026-08-17',
};
