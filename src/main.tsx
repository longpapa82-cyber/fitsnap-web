import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

/**
 * 클라이언트 진입. 프리렌더된 HTML(data-prerendered)이면 hydrate, 아니면 새로 렌더.
 * (myPet 패턴: 프리렌더 결과에 자연스럽게 붙어 flicker 방지)
 */
const root = document.getElementById('root')!;

if (root.getAttribute('data-prerendered') === 'true') {
  hydrateRoot(root, <StrictMode><App /></StrictMode>);
} else {
  createRoot(root).render(<StrictMode><App /></StrictMode>);
}
