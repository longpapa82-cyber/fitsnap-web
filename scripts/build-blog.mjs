/**
 * build-blog — content/blog/*.md → dist/blog/<slug>.html + dist/blog/index.html.
 * 제로-dep(md.mjs 파서 + blog-shell). SEO: BlogPosting + BreadcrumbList JSON-LD.
 * tokens.css 를 dist/tokens.css 로 복사(블로그 정적 페이지가 참조).
 */
import { readdir, readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseMarkdown } from './lib/md.mjs';
import { blogShell, esc } from './lib/blog-shell.mjs';
import { SITE } from '../src/constants/site.shared.mjs';

// BASE_PATH 접두(서브패스 배포 대응). blog-shell과 동일 규칙.
const BASE = (process.env.BASE_PATH ?? '/').replace(/\/+$/, '') || '';
const b = (p) => BASE + p;

const ROOT = new URL('..', import.meta.url).pathname;
const CONTENT = join(ROOT, 'content/blog');
const DIST = join(ROOT, 'dist');
const OUT = join(DIST, 'blog');
const origin = SITE.origin.replace(/\/$/, '');

async function readPosts() {
  let files = [];
  try {
    files = (await readdir(CONTENT)).filter((f) => f.endsWith('.md'));
  } catch {
    return []; // content/blog 없으면 블로그 생략(안전)
  }
  const posts = [];
  for (const f of files) {
    const raw = await readFile(join(CONTENT, f), 'utf8');
    const { frontmatter, html } = parseMarkdown(raw);
    if (!frontmatter.slug || !frontmatter.title) {
      console.warn(`⚠ skip ${f}: slug/title 필요`);
      continue;
    }
    posts.push({ ...frontmatter, html });
  }
  // 최신순 정렬
  posts.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  return posts;
}

function postJsonLd(p) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description ?? '',
        datePublished: p.date,
        author: { '@type': 'Organization', name: SITE.name },
        publisher: { '@type': 'Organization', name: SITE.name },
        mainEntityOfPage: `${origin}/blog/${p.slug}.html`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: '블로그', item: `${origin}/blog/` },
          { '@type': 'ListItem', position: 3, name: p.title },
        ],
      },
    ],
  });
}

function renderPost(p) {
  const tag = Array.isArray(p.tags) && p.tags[0] ? p.tags[0] : '';
  const body = `
    <nav class="blog-crumb"><a href="${b('/')}">홈</a> / <a href="${b('/blog/')}">블로그</a> / <span>${esc(p.title)}</span></nav>
    <article class="blog-article">
      ${tag ? `<span class="blog-eyebrow">${esc(tag)}</span>` : ''}
      <h1 class="blog-title">${esc(p.title)}</h1>
      <p class="blog-date">${esc(p.date)}</p>
      ${p.html}
    </article>`;
  return blogShell({
    title: `${p.title} | ${SITE.name}`,
    description: p.description ?? '',
    canonical: `${origin}/blog/${p.slug}.html`,
    body,
    jsonLd: postJsonLd(p),
    siteName: SITE.name,
    origin,
  });
}

function renderIndex(posts) {
  const cards = posts
    .map((p) => {
      const tag = Array.isArray(p.tags) && p.tags[0] ? p.tags[0] : '';
      return `
      <a class="blog-card" href="${b(`/blog/${esc(p.slug)}.html`)}">
        ${tag ? `<span class="blog-eyebrow">${esc(tag)}</span>` : ''}
        <h2 class="blog-card-title">${esc(p.title)}</h2>
        <p class="blog-card-desc">${esc(p.description ?? '')}</p>
        <span class="blog-card-date">${esc(p.date)}</span>
      </a>`;
    })
    .join('\n');

  const body = `
    <nav class="blog-crumb"><a href="${b('/')}">홈</a> / <span>블로그</span></nav>
    <h1 class="blog-title">FitSnap 블로그</h1>
    <p class="blog-lead">가상 착용, 온라인 쇼핑, 스타일링 팁을 전해요.</p>
    <div class="blog-grid">${cards || '<p>아직 글이 없어요.</p>'}</div>`;

  return blogShell({
    title: `블로그 | ${SITE.name}`,
    description: 'FitSnap 블로그 — 가상 착용과 스마트한 쇼핑 이야기.',
    canonical: `${origin}/blog/`,
    body,
    siteName: SITE.name,
    origin,
  });
}

async function main() {
  const posts = await readPosts();
  if (!posts.length) {
    console.log('build-blog: content/blog 에 글이 없어 생략');
    return;
  }
  await mkdir(OUT, { recursive: true });

  // tokens.css 복사(정적 블로그가 참조)
  try {
    await copyFile(join(ROOT, 'src/styles/tokens.css'), join(DIST, 'tokens.css'));
  } catch (e) {
    console.warn('⚠ tokens.css 복사 실패:', e.message);
  }

  for (const p of posts) {
    await writeFile(join(OUT, `${p.slug}.html`), renderPost(p), 'utf8');
  }
  await writeFile(join(OUT, 'index.html'), renderIndex(posts), 'utf8');
  console.log(`✓ blog: ${posts.length} posts + index`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
