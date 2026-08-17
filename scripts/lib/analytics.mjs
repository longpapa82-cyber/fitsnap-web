/**
 * 애널리틱스 스니펫 SSOT — vite 플러그인이 빌드 시 <head>에 주입.
 * 측정 ID가 env에 없으면 빈 문자열 반환(no-op) → 개발·미설정 시 안전.
 * GA4: GA4_MEASUREMENT_ID (G-XXXX), 네이버: NAVER_ANALYTICS_ID.
 *
 * ⚠️ SRI(integrity) 미적용 — 의도적. GA4/네이버는 버전 고정 없이 벤더가 수시로
 *    갱신하는 스크립트라 해시를 박으면 갱신 시 로드 실패한다(애널리틱스 전면 중단).
 *    SRI는 버전 고정 CDN 라이브러리용 방어책이고, 이런 벤더 스크립트엔 부적합.
 *    올바른 방어 = 프로덕션 CSP script-src 화이트리스트(GA·네이버 도메인). → W4에서 배포 헤더로 처리.
 */
export function analyticsSnippet() {
  const ga4 = process.env.GA4_MEASUREMENT_ID;
  const naver = process.env.NAVER_ANALYTICS_ID;
  let out = '';

  if (ga4 && /^G-[A-Z0-9]{4,}$/.test(ga4)) {
    out += `
  <script async src="https://www.googletagmanager.com/gtag/js?id=${ga4}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}');</script>`;
  }

  if (naver && /^[A-Za-z0-9_-]{4,}$/.test(naver)) {
    out += `
  <script type="text/javascript" src="//wcs.naver.net/wcslog.js"></script>
  <script>if(!wcs_add)var wcs_add={};wcs_add["wa"]="${naver}";if(window.wcs){wcs_do();}</script>`;
  }

  return out;
}
