import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

/**
 * SSR 진입 — prerender.mjs 가 빌드 시 호출해 정적 HTML을 생성한다.
 * 순수 렌더(네트워크 없음)라 GitHub Pages 정적 배포에 적합.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
