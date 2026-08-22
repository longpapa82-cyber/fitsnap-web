import { useEffect, useState } from 'react';

/**
 * 임베드 모드 감지 — 앱 인앱 브라우저(SFSafariViewController)에서 법리 문서를 열 때
 * 홍보용 GNB(로고·다운로드 버튼)·Footer를 숨기기 위한 플래그.
 *
 * 앱은 `#privacy?embed=1` 형태로 연다. 해시 라우터는 route를 `.split('?')[0]`로
 * 정규화하므로, 쿼리(embed)는 여기서 별도로 파싱한다.
 * SSR 안전: 초기값 false, 클라이언트에서 실제 해시 반영.
 */
function readEmbed(hash: string): boolean {
  const q = hash.split('?')[1];
  if (!q) return false;
  return new URLSearchParams(q).get('embed') === '1';
}

export function useEmbedMode(): boolean {
  const [embed, setEmbed] = useState(false);

  useEffect(() => {
    const apply = () => setEmbed(readEmbed(window.location.hash));
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  return embed;
}
