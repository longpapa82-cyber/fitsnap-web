import { useHashRoute } from './hooks/useHashRoute';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useSectionTint } from './hooks/useSectionTint';
import { Nav } from './components/ui/Nav';
import { BgApparel } from './components/ui/BgApparel';
import { Hero } from './sections/Hero';
import { HowItWorks } from './sections/HowItWorks';
import { Demo } from './sections/Demo';
import { Features } from './sections/Features';
import { Pricing } from './sections/Pricing';
import { FAQ } from './sections/FAQ';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './components/ui/Footer';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AccountDeletionPage } from './pages/AccountDeletionPage';
import './styles/global.css';

/**
 * 앱 셸 — W3: 법리 페이지 해시 라우팅 추가.
 * 홈(랜딩) + 법리 3종(#privacy·#terms·#account-deletion)을 해시로 전환.
 * 정적 호스팅(GitHub Pages)이라 서버 라우팅 없이 SPA 내에서 렌더.
 */
const HOME_SECTIONS = ['hero', 'how', 'demo', 'features', 'pricing', 'faq'];

export default function App() {
  const route = useHashRoute();
  // 앱 인앱 브라우저(#privacy?embed=1)면 홍보 크롬(GNB·브레드크럼·Footer) 숨김.
  const embed = useEmbedMode();
  // 홈 섹션 톤 변주(BG-2). 법리 페이지에선 섹션이 없어 no-op.
  useSectionTint(HOME_SECTIONS);

  if (route === 'privacy') return <PrivacyPage showChrome={!embed} />;
  if (route === 'terms') return <TermsPage showChrome={!embed} />;
  if (route === 'account-deletion') return <AccountDeletionPage showChrome={!embed} />;

  return (
    <>
      {/* 문서 전체 배경 옷 레이어 — 가장자리 여백에만(콘텐츠와 안 겹침), 스크롤 시 함께 흐름 */}
      <BgApparel />
      <a className="skip-link" href="#main">본문 바로가기</a>
      <Nav />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Demo />
        <Features />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
