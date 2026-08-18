import { useEffect, useRef, useState } from 'react';
import { SITE } from '../../constants/site.shared.mjs';
import { useMagnetic } from '../../hooks/useMagnetic';
import './nav.css';

/** 섹션 앵커 — 랜딩 섹션 id와 일치. */
const LINKS = [
  { href: '#how', label: '사용법' },
  { href: '#features', label: '기능' },
  { href: '#pricing', label: '가격' },
  { href: '#faq', label: 'FAQ' },
];

/**
 * GNB(상단 글로벌 네비) — sticky. 브랜드 + 섹션 앵커 + 다운로드 CTA.
 * 스크롤 시 배경 불투명도↑(가독성). 모바일은 앵커 숨기고 브랜드+CTA만.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  useMagnetic(ctaRef, 0.25); // FUN-3: 다운로드 CTA 마그네틱

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="nav-brand" href="#hero" aria-label={`${SITE.name} 홈`}>
          {SITE.name}
        </a>
        <nav className="nav-links" aria-label="주요 메뉴">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#download" ref={ctaRef}>
          다운로드
        </a>
      </div>
    </header>
  );
}
