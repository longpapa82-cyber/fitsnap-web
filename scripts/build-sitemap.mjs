/**
 * sitemap.xml 생성 — dist/ 의 정적 페이지를 스캔해 URL 목록 작성.
 * W0: 홈만. W5(블로그) 추가 시 dist/blog/ 재귀 스캔 확장.
 */
import { writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE } from '../src/constants/site.shared.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const origin = SITE.origin.replace(/\/$/, '');

/** dist/blog/ 이 있으면 인덱스(0.9)+포스트(0.7)를 URL로 추가. */
async function blogUrls() {
  try {
    const files = await readdir(join(DIST, 'blog'));
    const urls = [];
    if (files.includes('index.html')) {
      urls.push({ loc: `${origin}/blog/`, priority: '0.9', changefreq: 'weekly' });
    }
    for (const f of files.filter((f) => f.endsWith('.html') && f !== 'index.html')) {
      urls.push({ loc: `${origin}/blog/${f}`, priority: '0.7', changefreq: 'monthly' });
    }
    return urls;
  } catch {
    return [];
  }
}

const urls = [
  { loc: `${origin}/`, priority: '1.0', changefreq: 'weekly' },
  ...(await blogUrls()),
];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url><loc>${u.loc}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
    )
    .join('\n') +
  `\n</urlset>\n`;

await writeFile(join(DIST, 'sitemap.xml'), xml, 'utf8');
console.log(`✓ sitemap.xml (${urls.length} urls)`);
