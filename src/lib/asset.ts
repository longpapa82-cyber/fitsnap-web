/**
 * public/ 에셋 경로에 vite base 접두 — 서브패스 배포(GitHub Pages) 대응.
 *
 * ⚠️ vite는 HTML의 src/href·JS import는 base 재작성하지만,
 *    컴포넌트에 문자열로 하드코딩한 "/assets/..." 는 못 건드린다.
 *    → public 에셋을 컴포넌트에서 참조할 땐 반드시 이 헬퍼로 감싼다.
 *
 * asset('/assets/x.webp') → '/repo/assets/x.webp'(서브패스) 또는 '/assets/x.webp'(루트)
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + path;
}
