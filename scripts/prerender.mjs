/**
 * 프리렌더(SSG) — SSR 번들의 render()를 실행해 dist/index.html 의 #root 에 주입.
 * 클라이언트는 data-prerendered="true" 를 보고 hydrate → flicker 없음.
 * 순수 Node, 외부 네트워크 없음.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const SSR = join(ROOT, 'dist-ssr');

const { render } = await import(join(SSR, 'entry-server.js'));
const appHtml = render();

const indexPath = join(DIST, 'index.html');
let html = await readFile(indexPath, 'utf8');

// 빈 #root 를 프리렌더 HTML로 치환 + 마커 부착.
html = html.replace(
  '<div id="root"></div>',
  `<div id="root" data-prerendered="true">${appHtml}</div>`
);

await writeFile(indexPath, html, 'utf8');
console.log('✓ prerendered dist/index.html');
