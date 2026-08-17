/**
 * 블로그 정적 페이지 HTML 셸 — 제로-dep.
 * 랜딩(React)과 달리 블로그는 빌드 시 완성된 HTML을 생성(SEO·무JS 표시).
 * public/blog.css 로 스타일. 토큰(tokens.css)은 build-blog가 복사.
 */
import { analyticsSnippet } from './analytics.mjs';

// BASE_PATH env(예: '/repo/') — 서브패스 배포 시 정적 링크에 접두. 루트면 '/'.
const BASE = (process.env.BASE_PATH ?? '/').replace(/\/+$/, '') || '';
/** 절대 경로에 base 접두. b('/blog/') → '/repo/blog/' (서브패스) 또는 '/blog/'(루트). */
function b(path) {
  return BASE + path;
}

/**
 * @param {object} o
 * @param {string} o.title 페이지 <title>
 * @param {string} o.description meta description
 * @param {string} o.canonical 절대 canonical URL
 * @param {string} o.body <main> 내부 HTML
 * @param {string} [o.jsonLd] <script type=application/ld+json> 내용(문자열)
 * @param {string} o.siteName
 * @param {string} o.origin
 */
export function blogShell(o) {
  const analytics = analyticsSnippet();
  const jsonLd = o.jsonLd ? `\n  <script type="application/ld+json">${o.jsonLd}</script>` : '';
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(o.title)}</title>
  <meta name="description" content="${esc(o.description)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${esc(o.canonical)}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(o.title)}" />
  <meta property="og:description" content="${esc(o.description)}" />
  <meta property="og:url" content="${esc(o.canonical)}" />
  <meta property="og:locale" content="ko_KR" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${b('/tokens.css')}" />
  <link rel="stylesheet" href="${b('/blog.css')}" />${jsonLd}${analytics}
</head>
<body>
  <header class="blog-header">
    <a class="blog-home" href="${b('/')}">← ${esc(o.siteName)}</a>
  </header>
  <main class="blog-main">
${o.body}
  </main>
  <footer class="blog-footer">
    <a href="${b('/')}">${esc(o.siteName)}</a> · <a href="${b('/#privacy')}">개인정보처리방침</a> · <a href="${b('/#terms')}">이용약관</a>
  </footer>
</body>
</html>
`;
}

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
