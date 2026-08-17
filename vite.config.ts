import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { analyticsSnippet } from './scripts/lib/analytics.mjs';

// ── 애널리틱스 주입 플러그인 ──────────────────────────────────────
// index.html <head> 끝에 GA4·네이버 스니펫을 빌드 시 주입한다.
// 측정 ID(GA4_MEASUREMENT_ID·NAVER_ANALYTICS_ID)가 환경변수에 없으면 no-op → 안전.
// #root 밖(<head>)이라 프리렌더 hydration과 무관.
function analyticsPlugin(): Plugin {
  return {
    name: 'inject-analytics',
    transformIndexHtml(html: string): string {
      const snippet = analyticsSnippet();
      if (!snippet) return html;
      return html.replace('</head>', `${snippet}\n  </head>`);
    },
  };
}

// ── origin 치환 플러그인 ──────────────────────────────────────
// index.html의 절대 URL(canonical·og·twitter)을 SITE_ORIGIN env로 치환.
// GitHub Pages 서브패스/커스텀도메인 어디든 빌드 시 정확한 URL로.
// 미설정 시 플레이스홀더(https://fitsnap.app) 유지.
function originPlugin(): Plugin {
  const origin = (process.env.SITE_ORIGIN ?? 'https://fitsnap.app').replace(/\/$/, '');
  return {
    name: 'inject-origin',
    transformIndexHtml(html: string): string {
      return html.replace(/https:\/\/fitsnap\.app/g, origin);
    },
  };
}

// base: 커스텀 도메인 루트 배포 → '/'. GitHub Pages 서브패스는 BASE_PATH=/<repo>/ 로.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), originPlugin(), analyticsPlugin()],
});
