import { SITE, COMPANY } from '../../constants/site.shared.mjs';
import './footer.css';

/**
 * Footer — 법리 링크(W3에서 실제 페이지 연결) + 회사정보 + 연락처.
 * 법리 링크는 해시 라우팅(#privacy·#terms) — W3에서 페이지 구현.
 */
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-name">{SITE.name}</span>
          <p className="footer-tagline">{SITE.tagline}</p>
        </div>

        <nav className="footer-links" aria-label="법적 고지">
          <a href="#privacy">개인정보처리방침</a>
          <a href="#terms">이용약관</a>
          <a href="#account-deletion">계정·데이터 삭제</a>
          {COMPANY.email && <a href={`mailto:${COMPANY.email}`}>문의</a>}
        </nav>
      </div>

      <div className="footer-legal">
        {COMPANY.name && <span>{COMPANY.name}</span>}
        <span>© {SITE.name}. All rights reserved.</span>
      </div>
    </footer>
  );
}
