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
    let prev = normalize(window.location.hash);
    setRoute(prev);

    const apply = () => {
      const next = normalize(window.location.hash);
      // ⚠️ 섹션 앵커(#how·#pricing 등)는 normalize에서 ''로 떨어진다.
      //    이때 scrollTo(0,0)을 하면 브라우저의 앵커 점프를 즉시 되돌려
      //    "두 번 눌러야 이동" 버그가 생긴다. → 라우트가 실제로 바뀔 때만 top으로.
      if (next !== prev) {
        setRoute(next);
        prev = next;
        // 법리 페이지로 "진입"할 때만 상단 정렬(섹션 앵커는 브라우저 기본 스크롤에 맡김).
        if (next !== '') window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  return route;
}
