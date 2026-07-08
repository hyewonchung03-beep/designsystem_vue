import type { ReactNode } from 'react';
import { StructuredListGrid, type StructuredListGridProps } from './StructuredListGrid';

// ── Types ────────────────────────────────────────────────────────────────────

export type StructuredListPatternOrientation = 'horizontal' | 'vertical';

export type StructuredListPatternProps = {
  orientation?: StructuredListPatternOrientation;
  title?: string;
  showHeader?: boolean;
  grids: StructuredListGridProps[];
  className?: string;
};

// ── SectionHeader ────────────────────────────────────────────────────────────

type SectionHeaderProps = {
  title?: string;
  size?: 'md' | 'sm';
};

function SectionHeader({ title = 'Section Header', size = 'md' }: SectionHeaderProps) {
  const textCls =
    size === 'md'
      ? 'text-text-lg leading-text-lg'
      : 'text-text-md leading-text-md';

  return (
    <div className="flex flex-col items-start shrink-0 w-full">
      <span className={`${textCls} font-semibold text-element-primary whitespace-nowrap`}>
        {title}
      </span>
      <div className="shrink-0 w-full h-2" />
    </div>
  );
}

// ── StructuredListPattern ────────────────────────────────────────────────────

export function StructuredListPattern({
  orientation = 'horizontal',
  title = 'Section Header',
  showHeader = true,
  grids,
  className = '',
}: StructuredListPatternProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div className={`flex flex-col items-start w-full ${className}`}>
      {showHeader && (
        <SectionHeader title={title} size={isHorizontal ? 'md' : 'sm'} />
      )}

      {/* Slot */}
      <div className={`flex ${isHorizontal ? 'flex-col' : 'flex-row'} items-start shrink-0 w-full`}>
        {grids.map((gridProps, i) => (
          <StructuredListGrid key={i} {...gridProps} />
        ))}
      </div>
    </div>
  );
}
