import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { IcResponsive, type IconSize } from '../Icon/IcResponsive';

// ── Types ──────────────────────────────────────────────────────────────────

export type IconButtonStyle = 'square' | 'circle';
export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export type IconButtonProps = {
  icon?: ReactNode;
  buttonStyle?: IconButtonStyle;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  'aria-label': string;
  onClick?: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className' | 'style'>;

// ── Size tokens ────────────────────────────────────────────────────────────

const CONTAINER_SIZE: Record<IconButtonSize, string> = {
  sm: 'size-8',
  md: 'size-9',
  lg: 'size-sol-42',
};

const ICON_SIZE_MAP: Record<IconButtonSize, IconSize> = {
  sm: 16,
  md: 20,
  lg: 24,
};

// ── Style tokens ───────────────────────────────────────────────────────────

const RADIUS: Record<IconButtonStyle, string> = {
  circle: 'rounded-circle',
  square: 'rounded-4',
};

const VARIANT_CLS: Record<IconButtonVariant, string> = {
  primary: 'bg-primary text-element-inverse',
  secondary: 'bg-secondary border border-border-normal text-element-primary',
  tertiary: 'bg-tertiary text-element-inverse',
};

const INTERACTION_CLS: Record<IconButtonVariant, string> = {
  primary:
    'bg-interaction-inverse-normal group-hover/btn:bg-interaction-inverse-hover group-active/btn:bg-interaction-inverse-pressed',
  secondary:
    'bg-interaction-neutral-normal group-hover/btn:bg-interaction-neutral-hover group-active/btn:bg-interaction-neutral-pressed',
  tertiary:
    'bg-interaction-inverse-normal group-hover/btn:bg-interaction-inverse-hover group-active/btn:bg-interaction-inverse-pressed',
};

// ── Component ──────────────────────────────────────────────────────────────

export default function IconButton({
  icon,
  buttonStyle = 'square',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  ...rest
}: IconButtonProps) {
  const radius = RADIUS[buttonStyle];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`group/btn relative inline-flex items-center justify-center overflow-clip
        ${CONTAINER_SIZE[size]} ${radius}
        ${
          disabled
            ? 'bg-fill-disabled text-element-disabled cursor-not-allowed'
            : `${VARIANT_CLS[variant]} cursor-pointer`
        }
        focus:outline-none focus-visible:shadow-focus-button-ring
      `}
      {...rest}
    >
      <IcResponsive size={ICON_SIZE_MAP[size]}>{icon}</IcResponsive>

      {!disabled && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute ${
            variant === 'secondary' ? '-inset-px' : 'inset-0'
          } ${radius} ${INTERACTION_CLS[variant]}`}
        />
      )}
    </button>
  );
}
