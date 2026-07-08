import type { ReactNode } from 'react';
import { IcPlus } from '../Icon/IcPlus';

// ── Types ────────────────────────────────────────────────────────────────────

export type ToolbarZoomItemType = 'icon' | 'value';
export type ToolbarZoomItemState = 'enabled' | 'disabled';

export type ToolbarZoomItemProps = {
  type?: ToolbarZoomItemType;
  state?: ToolbarZoomItemState;
  icon?: ReactNode;
  value?: string;
  onClick?: () => void;
  className?: string;
};

// ── Style helpers ─────────────────────────────────────────────────────────────

function getContainerCls(state: ToolbarZoomItemState): string {
  if (state === 'disabled') return 'cursor-not-allowed';
  return '';
}

// ── ToolbarZoomItem ───────────────────────────────────────────────────────────

export function ToolbarZoomItem({
  type = 'icon',
  state = 'enabled',
  icon,
  value = '100%',
  onClick,
  className = '',
}: ToolbarZoomItemProps) {
  const isDisabled = state === 'disabled';
  const isIcon = type === 'icon';
  const contentColorCls = isDisabled ? 'text-element-disabled' : 'text-element-secondary';

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={`group relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-2 focus-visible:outline-none ${getContainerCls(state)} ${className}`}
    >
      {!isDisabled && (
        <span className="absolute inset-0.5 rounded-2 group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
      )}

      {isIcon ? (
        <span className={`relative z-10 flex size-5 shrink-0 items-center justify-center ${contentColorCls}`}>
          {icon ?? <IcPlus size={20} />}
        </span>
      ) : (
        <>
          <span className={`relative z-10 text-text-xxs leading-text-xxs font-regular text-center ${contentColorCls}`}>
            {value}
          </span>
          <span className="absolute bottom-0 left-1 right-1 h-px rounded-2 bg-border-solid" />
        </>
      )}
    </button>
  );
}
