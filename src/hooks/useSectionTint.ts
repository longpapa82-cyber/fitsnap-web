import { useEffect } from 'react';

/**
 * 섹션별 배경 톤 변주(BG-2) — 현재 뷰포트 중앙에 걸친 섹션의 id를 읽어
 * document.body의 data-section 속성에 반영. CSS에서 body[data-section="..."]로
 * 전역 그라디언트 오버레이 색조를 은은하게 전환(긴 페이지 지루함 완화).
 * IntersectionObserver 기반이라 스크롤 핸들러 없음. reduced-motion이면 전환만 CSS가 무효화.
 */
export function useSectionTint(sectionIds: string[]): void {
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    let current = '';
    const io = new IntersectionObserver(
      (entries) => {
        // 가장 많이 보이는 섹션을 선택
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible && visible.target.id !== current) {
          current = visible.target.id;
          document.body.dataset.section = current;
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-20% 0px -40% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [sectionIds]);
}
