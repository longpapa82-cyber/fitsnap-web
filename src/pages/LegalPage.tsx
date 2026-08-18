import type { ReactNode } from 'react';
import { COMPANY, LEGAL } from '../constants/site.shared.mjs';
import { Nav } from '../components/ui/Nav';
import './legal.css';

interface LegalPageProps {
  title: string;
  children: ReactNode;
  /** 문서 하단 문의/유효일 표시 여부(기본 true). */
  showMeta?: boolean;
}

/**
 * 법리 페이지 공용 레이아웃 — 랜딩과 동일한 GNB(<Nav/>) + 브레드크럼 + 본문 + 회사정보.
 * 개인정보/약관/계정삭제가 이 래퍼를 공유(일관 + DRY). GNB의 섹션 앵커(#how 등)는
 * 해시 라우터가 홈으로 되돌리며 해당 섹션으로 스크롤하므로 법리 페이지에서도 정상 동작.
 */
export function LegalPage({ title, children, showMeta = true }: LegalPageProps) {
  return (
    <div className="legal">
      <Nav />
      <main className="legal-main">
        <nav className="legal-crumb" aria-label="위치">
          <a href="#">홈</a> <span aria-hidden>/</span> <span aria-current="page">{title}</span>
        </nav>
        <article className="legal-article">
          <h1 className="legal-title">{title}</h1>
          {children}

          {showMeta && (
            <footer className="legal-meta">
              {COMPANY.name && <p>{COMPANY.name}</p>}
              {COMPANY.email && (
                <p>
                  문의: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                </p>
              )}
              <p>최종 수정일: {LEGAL.effectiveDate}</p>
              <p className="legal-draft">
                ⚠️ 본 문서는 초안입니다. 실제 서비스 배포 전 법률 검토가 필요합니다.
              </p>
            </footer>
          )}
        </article>
      </main>
    </div>
  );
}
