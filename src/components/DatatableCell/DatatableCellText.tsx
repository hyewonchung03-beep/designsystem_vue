// ── Types ────────────────────────────────────────────────────────────────────

export type DatatableCellTextSize = 'sm' | 'md' | 'lg';
export type DatatableCellTextType = 'regular' | 'semibold' | 'null';

export type DatatableCellTextProps = {
  text?: string;
  size?: DatatableCellTextSize;
  type?: DatatableCellTextType;
  className?: string;
};

// ── Size → text token ────────────────────────────────────────────────────────

const sizeTextClass: Record<DatatableCellTextSize, string> = {
  sm: 'text-text-xs leading-text-xs',
  md: 'text-text-sm leading-text-sm',
  lg: 'text-text-md leading-text-md',
};

// ── DatatableCellText ────────────────────────────────────────────────────────

export function DatatableCellText({
  text = 'Content',
  size = 'sm',
  type = 'regular',
  className = '',
}: DatatableCellTextProps) {
  const isNull = type === 'null';
  const colorCls = isNull ? 'text-element-disabled' : 'text-element-secondary';
  const fontCls = type === 'semibold' ? 'font-semibold' : 'font-regular';

  return (
    <span className={`${sizeTextClass[size]} ${fontCls} ${colorCls} whitespace-nowrap ${className}`}>
      {isNull ? '-' : text}
    </span>
  );
}
