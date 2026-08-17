import { useEffect, useState } from 'react';

/**
 * 해시 기반 라우팅 — 정적 호스팅(GitHub Pages)에서 서버 라우팅 없이 SPA 페이지 전환.
 * '#privacy', '#/privacy', '#terms', '#account-deletion' 등을 정규화해 반환.
 * SSR 안전: 초기값은 '' (홈), 클라이언트에서 실제 해시 반영.
 */
export type Route = '' | 'privacy' | 'terms' | 'account-deletion';

function normalize(hash: string): Route {
  const h = hash.replace(/^#\/?/, '').split('?')[0];
  if (h === 'privacy' || h === 'terms' || h === 'account-deletion') return h;
  return '';
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>('');

  useEffect(() => {
    const apply = () => {
      setRoute(normalize(window.location.hash));
      // 라우트 전환 시 상단으로.
      window.scrollTo(0, 0);
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  return route;
}
