export type TooltipPointerColor = 'black' | 'white';
export type TooltipPointerSize = 'sm' | 'xs';
export type TooltipPointerPlacement = 'start' | 'center' | 'end';
export type TooltipPointerVariant = 'filled' | 'outline';

export type TooltipPointerProps = {
  color?: TooltipPointerColor;
  size?: TooltipPointerSize;
  placement?: TooltipPointerPlacement;
  variant?: TooltipPointerVariant;
  fill?: string;
  className?: string;
};

const pointerFillByColor: Record<TooltipPointerColor, string> = {
  black: 'var(--sol-surface-inverse)',
  white: 'var(--sol-surface-container-highest)',
};

function ArrowSm({
  color,
  variant,
  fill,
}: {
  color: TooltipPointerColor;
  variant: TooltipPointerVariant;
  fill?: string;
}) {
  if (variant === 'outline') {
    return (
      <svg width="24" height="8" viewBox="0 0 24 8" fill="none" aria-hidden="true">
        <path
          d="M5 7.6L11.45 1.2Q12 0.65 12.55 1.2L19 7.6H17.1L12 2.55L6.9 7.6H5Z"
          fill="var(--sol-border-solid)"
        />
      </svg>
    );
  }

  const path =
    color === 'black'
      ? 'M5 8L11.45 1.35Q12 0.8 12.55 1.35L19 8H5Z'
      : 'M6.4 7.6L11.55 2.25Q12 1.8 12.45 2.25L17.6 7.6H6.4Z';

  return (
    <svg width="24" height="8" viewBox="0 0 24 8" fill="none" aria-hidden="true">
      <path d={path} fill={fill ?? pointerFillByColor[color]} />
    </svg>
  );
}

function ArrowXs({
  color,
  variant,
  fill,
}: {
  color: TooltipPointerColor;
  variant: TooltipPointerVariant;
  fill?: string;
}) {
  if (variant === 'outline') {
    return (
      <svg width="13" height="5" viewBox="0 0 13 5" fill="none" aria-hidden="true">
        <path
          d="M4 4.3L6.2 1.2Q6.5 0.8 6.8 1.2L9 4.3H7.8L6.5 2.45L5.2 4.3H4Z"
          fill="var(--sol-border-solid)"
        />
      </svg>
    );
  }

  return (
    <svg width="13" height="5" viewBox="0 0 13 5" fill="none" aria-hidden="true">
      <path d="M4 4L6.2 1.25Q6.5 0.85 6.8 1.25L9 4H4Z" fill={fill ?? pointerFillByColor[color]} />
    </svg>
  );
}

export function TooltipPointer({
  color = 'black',
  size = 'sm',
  placement = 'start',
  variant = 'filled',
  fill,
  className = '',
}: TooltipPointerProps) {
  const alignClass =
    placement === 'center' ? 'items-center' : placement === 'end' ? 'items-end' : 'items-start';

  return (
    <div
      className={`flex flex-col justify-center ${alignClass} ${className}`}
      // NOTE: width: 120 has no matching --sol-* token.
      // CLAUDE.md violation (no hardcoded px) — left as-is pending a token decision.
      style={{ paddingLeft: 'var(--sol-spacing-6)', paddingRight: 'var(--sol-spacing-6)', width: 120 }}
    >
      {size === 'sm' ? (
        <ArrowSm color={color} variant={variant} fill={fill} />
      ) : (
        <ArrowXs color={color} variant={variant} fill={fill} />
      )}
    </div>
  );
}
