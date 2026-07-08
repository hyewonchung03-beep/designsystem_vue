/**
 * Chip (combo_chip)
 *
 * Figma: combo_chip (YqKny45xSmjr76WGIXeL7P)
 *   - All variants: node 969-214498
 *   - sm selected:  node 6032-86810
 *   - md selected:  node 6032-89899
 */
import type { ReactNode } from 'react';
import { IcResponsive } from '../Icon/IcResponsive';
import type { IconSize } from '../Icon/IcResponsive';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ChipSize = 'sm' | 'md';
export type ChipState = 'enabled' | 'disabled' | 'error';

export type ChipProps = {
  label: string;
  size?: ChipSize;
  state?: ChipState;
  selected?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
};

// ─── Icon size mapping (Figma: ic_responsive 허용 크기만 사용) ─────────────────

const iconSizeMap: Record<ChipSize, IconSize> = { sm: 14, md: 16 };

// ─── Style helpers ────────────────────────────────────────────────────────────

function getBgClass(selected: boolean, state: ChipState): string {
  if (state === 'disabled') return 'bg-fill-disabled';
  if (state === 'error') return selected ? 'bg-error-container' : '';
  return selected ? 'bg-secondary-container' : 'bg-surface-container';
}

function getBorderClass(state: ChipState): string {
  return state === 'error' ? 'border-error-variant' : 'border-border-normal';
}

function getTextClass(selected: boolean, state: ChipState): string {
  if (state === 'disabled') return 'text-element-disabled';
  if (state === 'error') return 'text-error-dim';
  return selected ? 'text-element-brand-variant' : 'text-element-tertiary';
}

// ─── Chip ─────────────────────────────────────────────────────────────────────

export function Chip({
  label,
  size = 'md',
  state = 'enabled',
  selected = false,
  leftIcon,
  rightIcon,
  onClick,
}: ChipProps) {
  const isDisabled = state === 'disabled';
  const isSm = size === 'sm';
  const iconSize = iconSizeMap[size];

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={`relative inline-flex w-fit items-center overflow-hidden border font-regular whitespace-nowrap
        ${isSm ? 'h-5 gap-sol-2 px-sol-4 py-sol-2 rounded-2' : 'gap-sol-4 px-sol-6 py-sol-4 rounded-4'}
        ${getBgClass(selected, state)}
        ${getBorderClass(state)}
        ${getTextClass(selected, state)}
        ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {leftIcon && <IcResponsive size={iconSize}>{leftIcon}</IcResponsive>}
      <span className={isSm ? 'text-text-xs leading-text-xs' : 'text-text-sm leading-text-sm'}>
        {label}
      </span>
      {rightIcon && <IcResponsive size={iconSize}>{rightIcon}</IcResponsive>}
    </button>
  );
}
