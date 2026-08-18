import type { ReactNode } from 'react';
import './section.css';

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  /** 배경 톤: default(크림) | tint(옅은 코랄) | dark(코랄 강조, FinalCTA용) */
  tone?: 'default' | 'tint' | 'dark';
}

/**
 * 섹션 공용 래퍼 — 일관된 상하 여백·최대폭·제목 블록·배경 톤.
 * 각 랜딩 섹션이 이걸 감싸 시각 리듬을 통일한다.
 */
export function Section({ id, eyebrow, title, children, tone = 'default' }: SectionProps) {
  return (
    <section id={id} className={`section section--${tone}`}>
      <div className="section-inner">
        {(eyebrow || title) && (
          <header className="section-head">
            {eyebrow && (
              <span className="section-eyebrow">
                <span className="section-eyebrow-line" aria-hidden />
                {eyebrow}
                <span className="section-eyebrow-line" aria-hidden />
              </span>
            )}
            {title && <h2 className="section-title">{title}</h2>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
