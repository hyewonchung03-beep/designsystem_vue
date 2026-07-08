// ── Types ────────────────────────────────────────────────────────────────────

export type DividerType = 'horizontal' | 'vertical';
export type DividerCap = 'round' | 'square';
export type DividerColor = 'G150' | 'G100';
export type DividerSpacing = '0' | '12' | '24';

export type DividerProps = {
  type?: DividerType;
  cap?: DividerCap;
  color?: DividerColor;
  solid?: boolean;
  spacing?: DividerSpacing;
  className?: string;
};

// ── Color mapping ────────────────────────────────────────────────────────────

function getColorClass(color: DividerColor, solid: boolean) {
  if (!solid) return 'bg-border-normal-variant';
  return color === 'G150' ? 'bg-border-solid' : 'bg-border-solid-variant';
}

// ── Divider ──────────────────────────────────────────────────────────────────

export default function Divider({
  type = 'horizontal',
  cap = 'square',
  color = 'G100',
  solid = true,
  spacing = '0',
  className,
}: DividerProps) {
  const colorClass = getColorClass(color, solid);
  const roundedClass = cap === 'round' ? 'rounded-2' : '';

  if (type === 'horizontal' && spacing !== '0') {
    const paddingClass = spacing === '12' ? 'px-3' : 'px-6';
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={`flex w-full flex-col items-start ${paddingClass} ${className ?? ''}`}
      >
        <div className={`h-px w-full ${colorClass}`} />
      </div>
    );
  }

  if (type === 'horizontal') {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={`h-px w-full overflow-hidden ${colorClass} ${roundedClass} ${className ?? ''}`}
      />
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      className={`w-px self-stretch overflow-hidden ${colorClass} ${roundedClass} ${className ?? ''}`}
    />
  );
}
