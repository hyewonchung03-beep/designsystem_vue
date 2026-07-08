import { useState } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

export type BtnType      = 'primary' | 'secondary' | 'tertiary' | 'white';
export type BtnSize      = 'sm' | 'md' | 'lg';
export type BtnStyleType = 'solid' | 'outline' | 'ghost' | 'link' | 'danger' | 'text';
export type BtnState     = 'enabled' | 'hover' | 'focused' | 'pressed' | 'disabled' | 'loading';

export type BtnIconProps = {
  label?:        string;
  type?:         BtnType;
  size?:         BtnSize;
  styleType?:    BtnStyleType;
  state?:        BtnState;
  /** Show label text (default: true) */
  showLabel?:    boolean;
  /** Show icon on the left (default: true) */
  showLeftIcon?: boolean;
  /** Show icon on the right */
  showRightIcon?: boolean;
  /** Show loading spinner */
  showLoading?:  boolean;
  onClick?:      () => void;
};

// ── Class maps (static strings so Tailwind v4 can detect them) ─────────────

// Layout — shared base
const BASE =
  'relative inline-flex items-center justify-center overflow-hidden font-sans font-semibold select-none';

// Size classes
// sm: h-8(32px)  px-3(12px) py-2(8px)   gap-1(4px)   text-text-xs(12) leading-4(16)
// md: h-10(40px) px-4(16px) py-2(8px)   gap-1(4px)   text-text-sm(14) leading-5(20)
// lg: h-11(44px) px-3(12px) py-2.5(10px) gap-2(8px)  text-text-md(16) leading-5(20)
const SIZE_CLS: Record<BtnSize, string> = {
  sm: 'h-8  min-w-16 px-3 py-2     gap-1 text-text-xs leading-4 rounded-4',
  md: 'h-10 min-w-16 px-4 py-2     gap-1 text-text-sm leading-5 rounded-4',
  lg: 'h-11 min-w-16 px-3 py-2.5   gap-2 text-text-md leading-5 rounded-4',
};

// Color classes per type + style
// Theme token mapping (2026-06-02):
// bg-primary: Theme/Primary/Primary (#282363)
// text-element-brand: Theme/Element/Brand (#282363)
// border-border-normal: Theme/Border/Normal (rgba(0,0,0,0.16))
// bg-tertiary: Theme/Tertiary/tertiary (#4d469a)
// bg-static-white / border-static-white: Theme/Static/White (#ffffff)
const COLOR_CLS: Record<BtnStyleType, Record<BtnType, string>> = {
  solid: {
    primary:   'bg-primary     text-element-inverse border-transparent',
    secondary: 'bg-tertiary    text-element-inverse border-transparent',
    tertiary:  'bg-tertiary    text-element-inverse border-transparent',
    white:     'bg-static-white text-element-brand  border-transparent',
  },
  outline: {
    primary:   'bg-transparent text-element-brand border border-border-normal',
    secondary: 'bg-surface-default text-element-brand border border-border-normal',
    tertiary:  'bg-transparent text-tertiary       border border-tertiary',
    white:     'bg-transparent text-element-inverse border border-static-white',
  },
  ghost: {
    primary:   'bg-transparent text-element-brand       border-transparent',
    secondary: 'bg-transparent text-element-quaternary  border-transparent',
    tertiary:  'bg-transparent text-tertiary            border-transparent',
    white:     'bg-transparent text-element-inverse     border-transparent',
  },
  link: {
    primary:   'bg-transparent text-element-brand       border-transparent underline',
    secondary: 'bg-transparent text-element-quaternary  border-transparent underline',
    tertiary:  'bg-transparent text-tertiary            border-transparent underline',
    white:     'bg-transparent text-element-inverse     border-transparent underline',
  },
  danger: {
    primary:   'bg-error text-element-inverse border-transparent',
    secondary: 'bg-error text-element-inverse border-transparent',
    tertiary:  'bg-error text-element-inverse border-transparent',
    white:     'bg-error text-element-inverse border-transparent',
  },
  text: {
    primary:   'bg-transparent text-element-brand          border-transparent',
    secondary: 'bg-transparent text-element-quaternary     border-transparent',
    tertiary:  'bg-transparent text-tertiary              border-transparent',
    white:     'bg-transparent text-element-inverse        border-transparent',
  },
};

// solid / danger: dark background → white overlay
const OVERLAY_ON_DARK: Record<BtnState, string> = {
  enabled:  'bg-transparent',
  hover:    'bg-white/8',
  focused:  'bg-white/8',
  pressed:  'bg-white/14',
  disabled: 'bg-transparent',
  loading:  'bg-transparent',
};

// ghost / text / link / outline: light/transparent background → Theme/Interaction/neutral-normal
const OVERLAY_ON_LIGHT: Record<BtnState, string> = {
  enabled:  'bg-transparent',
  hover:    'bg-black/8',
  focused:  'bg-black/8',
  pressed:  'bg-black/16',
  disabled: 'bg-transparent',
  loading:  'bg-transparent',
};

// ── Public utility ─────────────────────────────────────────────────────────

// Disabled overrides ALL color classes regardless of type/style
// bg-fill-disabled: --sol-fill-disabled rgba(0,0,0,0.08)
// text-element-disabled: --sol-element-disabled rgba(0,0,0,0.24)
// For inverse ghost/link disabled buttons, use white disabled text instead of black disabled text.
const DEFAULT_DISABLED_CLS = 'bg-fill-disabled text-element-disabled border-transparent cursor-not-allowed';
const GHOST_LINK_DISABLED_CLS = 'bg-transparent text-element-disabled border-transparent cursor-not-allowed';
const INVERSE_GHOST_LINK_DISABLED_CLS = 'bg-transparent text-element-inverse/24 border-transparent cursor-not-allowed';

const FOCUSED_CLS: Record<BtnStyleType, string> = {
  solid:   'shadow-focus-button-ring',
  outline: 'shadow-focus-button-ring',
  ghost:   'shadow-focus-button-ring',
  link:    'rounded-[var(--sol-focus-ring-link-radius)] outline outline-[length:var(--sol-focus-ring-link-outline-width)] outline-[color:var(--sol-focus-ring-link-outline-color)]',
  danger:  'shadow-focus-button-ring',
  text:    'shadow-focus-button-ring',
};

/**
 * Returns the full Tailwind className string for a button given its props.
 * Exported so Storybook docs can display it alongside the component usage.
 */
export function getBtnClassNames(
  type:      BtnType      = 'primary',
  size:      BtnSize      = 'lg',
  styleType: BtnStyleType = 'solid',
  state:     BtnState     = 'enabled',
): string {
  const colorCls = state === 'disabled'
    ? styleType === 'ghost' || styleType === 'link'
      ? type === 'white'
        ? INVERSE_GHOST_LINK_DISABLED_CLS
        : GHOST_LINK_DISABLED_CLS
      : DEFAULT_DISABLED_CLS
    : `${COLOR_CLS[styleType][type]} cursor-pointer`;
  const focusCls = state === 'focused' ? FOCUSED_CLS[styleType] : '';

  return [BASE, SIZE_CLS[size], colorCls, focusCls].filter(Boolean).join(' ');
}

// ── Helpers ────────────────────────────────────────────────────────────────

function resolveState(
  explicit: BtnState,
  hovered:  boolean,
  active:   boolean,
): BtnState {
  if (explicit !== 'enabled') return explicit;
  if (active)  return 'pressed';
  if (hovered) return 'hover';
  return 'enabled';
}

// ── Sub-components ─────────────────────────────────────────────────────────

const ICON_SIZE: Record<BtnSize, number> = { sm: 16, md: 18, lg: 20 };

function BoxIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.25 18V16H4.75V18C4.75 18.69 5.31 19.25 6 19.25H8V20.75H6C4.48 20.75 3.25 19.52 3.25 18ZM14 19.25V20.75H10V19.25H14ZM19.25 18V16H20.75V18C20.75 19.52 19.52 20.75 18 20.75H16V19.25H18C18.69 19.25 19.25 18.69 19.25 18ZM4.75 10V14H3.25V10H4.75ZM20.75 10V14H19.25V10H20.75ZM3.25 6C3.25 4.48 4.48 3.25 6 3.25H8V4.75H6C5.31 4.75 4.75 5.31 4.75 6V8H3.25V6ZM19.25 6C19.25 5.31 18.69 4.75 18 4.75H16V3.25H18C19.52 3.25 20.75 4.48 20.75 6V8H19.25V6ZM14 3.25V4.75H10V3.25H14Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Spinner({ size }: { size: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"
      className="animate-spin"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
      <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function BtnIcon({
  label        = 'Label',
  type         = 'primary',
  size         = 'lg',
  styleType    = 'solid',
  state        = 'enabled',
  showLabel    = true,
  showLeftIcon = true,
  showRightIcon = false,
  showLoading  = false,
  onClick,
}: BtnIconProps) {
  const [hovered, setHovered] = useState(false);
  const [active,  setActive]  = useState(false);

  const resolved   = resolveState(state, hovered, active);
  const isDisabled = resolved === 'disabled';
  const isLoading  = showLoading || resolved === 'loading';
  const iconSz     = ICON_SIZE[size];

  const className = getBtnClassNames(type, size, styleType, resolved);
  const isDarkBg  = (styleType === 'solid' && type !== 'white') || styleType === 'danger';
  const isInverseOnDark = type === 'white' && (styleType === 'ghost' || styleType === 'link');
  const isGhostOrLink = styleType === 'ghost' || styleType === 'link';
  const overlayCls = resolved === 'focused' && isGhostOrLink
    ? 'bg-transparent'
    : (isDarkBg || isInverseOnDark ? OVERLAY_ON_DARK : OVERLAY_ON_LIGHT)[resolved];

  return (
    <button
      type="button"
      className={className}
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={() => !isDisabled && setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => !isDisabled && setActive(true)}
      onMouseUp={() => setActive(false)}
      data-type={type}
      data-style={styleType}
      data-size={size}
      data-state={resolved}
    >
      {/* Left icon / loading spinner */}
      {(showLeftIcon || isLoading) && (
        <span className="flex items-center shrink-0">
          {isLoading ? <Spinner size={iconSz} /> : <BoxIcon size={iconSz} />}
        </span>
      )}

      {/* Label */}
      {showLabel && <span className="text-center whitespace-nowrap">{label}</span>}

      {/* Right icon */}
      {showRightIcon && !isLoading && (
        <span className="flex items-center shrink-0">
          <BoxIcon size={iconSz} />
        </span>
      )}

      {/* Interaction overlay */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-[inherit] pointer-events-none transition-colors duration-150 ${overlayCls}`}
      />
    </button>
  );
}
