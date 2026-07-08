import type { ReactNode } from 'react';
import { IcBlank } from '../Icon/IcBlank';

// ── Types ────────────────────────────────────────────────────────────────────

export type ToolbarItemState = 'enabled' | 'focused' | 'disabled';

export type ToolbarItemProps = {
  selected?: boolean;
  state?: ToolbarItemState;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
};

// ── Style helpers ─────────────────────────────────────────────────────────────

function getVariantCls(selected: boolean, state: ToolbarItemState): string {
  // disabled (selected or not)
  if (state === 'disabled') {
    return 'border border-border-solid bg-fill-disabled shadow-normal cursor-not-allowed';
  }

  // focused + not selected
  if (state === 'focused' && !selected) {
    return 'border border-border-solid bg-surface-bright shadow-focus-button-ring';
  }

  // focused + selected: container = surface-bright + focus ring, inner layer = secondary-container
  if (state === 'focused' && selected) {
    return 'border border-border-solid bg-surface-bright shadow-focus-button-ring';
  }

  // enabled + selected: outside border via ring, no container fill (inner layer provides bg)
  if (selected) {
    return 'ring-1 ring-primary-inverse shadow-normal border-0';
  }

  // enabled + not selected
  return 'border border-border-solid bg-surface-bright shadow-normal';
}

// ── ToolbarItem ───────────────────────────────────────────────────────────────

export function ToolbarItem({
  selected = false,
  state = 'enabled',
  icon,
  onClick,
  className = '',
}: ToolbarItemProps) {
  const isDisabled = state === 'disabled';
  const showSelectedBg = selected && !isDisabled;
  // selected+focused uses secondary-container, selected+enabled uses selected-container
  const selectedBgCls = state === 'focused' ? 'bg-secondary-container' : 'bg-selected-container';
  const iconColorCls = isDisabled ? 'text-element-disabled' : 'text-element-secondary';

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={`group relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-2 p-3 focus-visible:outline-none ${getVariantCls(selected, state)} ${className}`}
    >
      {showSelectedBg && (
        <div className={`absolute inset-0 rounded-2 ${selectedBgCls}`} />
      )}
      {!isDisabled && (
        <span className="absolute inset-0.5 rounded-2 group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
      )}
      <span className={`relative z-10 flex size-5 shrink-0 items-center justify-center ${iconColorCls}`}>
        {icon ?? <IcBlank size={20} />}
      </span>
    </button>
  );
}
