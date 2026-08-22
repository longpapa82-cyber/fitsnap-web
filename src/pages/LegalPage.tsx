import type { ReactNode } from 'react';
import { COMPANY, LEGAL } from '../constants/site.shared.mjs';
import { Nav } from '../components/ui/Nav';
import './legal.css';

interface LegalPageProps {
  title: string;
  children: ReactNode;
  /** 문서 하단 문의/유효일 표시 여부(기본 true). */
  showMeta?: boolean;
  /**
   * 홍보용 크롬(GNB·브레드크럼) 표시 여부(기본 true).
   * 앱 인앱 브라우저(임베드 모드)에선 false → 로고·다운로드 버튼·"홈" 링크 숨김.
   */
  showChrome?: boolean;
}

/**
 * 법리 페이지 공용 레이아웃 — 랜딩과 동일한 GNB(<Nav/>) + 브레드크럼 + 본문 + 회사정보.
 * 개인정보/약관/계정삭제가 이 래퍼를 공유(일관 + DRY). GNB의 섹션 앵커(#how 등)는
 * 해시 라우터가 홈으로 되돌리며 해당 섹션으로 스크롤하므로 법리 페이지에서도 정상 동작.
 *
 * 앱에서 열 때(showChrome=false)는 홍보 GNB·브레드크럼을 숨겨 "앱 이탈"처럼 보이지
 * 않게 한다(다운로드 버튼은 앱 안에서 무의미).
 */
export function LegalPage({ title, children, showMeta = true, showChrome = true }: LegalPageProps) {
  return (
    <div className={`legal${showChrome ? '' : ' legal--embed'}`}>
      {showChrome && <Nav />}
      <main className="legal-main">
        {showChrome && (
          <nav className="legal-crumb" aria-label="위치">
            <a href="#">홈</a> <span aria-hidden>/</span> <span aria-current="page">{title}</span>
          </nav>
        )}
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
