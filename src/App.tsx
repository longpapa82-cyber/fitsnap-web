import { useHashRoute } from './hooks/useHashRoute';
import { Nav } from './components/ui/Nav';
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
export default function App() {
  const route = useHashRoute();

  if (route === 'privacy') return <PrivacyPage />;
  if (route === 'terms') return <TermsPage />;
  if (route === 'account-deletion') return <AccountDeletionPage />;

  return (
    <>
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
