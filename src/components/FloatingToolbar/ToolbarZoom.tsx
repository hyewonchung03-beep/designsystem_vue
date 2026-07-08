import { IcPlus } from '../Icon/IcPlus';
import { IcMinus } from '../Icon/IcMinus';
import { ToolbarZoomItem } from './ToolbarZoomItem';

// ── Types ────────────────────────────────────────────────────────────────────

export type ToolbarZoomProps = {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  disabledIn?: boolean;
  disabledOut?: boolean;
  className?: string;
};

// ── ToolbarZoom ───────────────────────────────────────────────────────────────

export function ToolbarZoom({
  onZoomIn,
  onZoomOut,
  disabledIn = false,
  disabledOut = false,
  className = '',
}: ToolbarZoomProps) {
  return (
    <div
      className={`flex w-9 flex-col overflow-hidden rounded-2 ring-1 ring-border-solid bg-surface-container-high shadow-normal ${className}`}
    >
      <ToolbarZoomItem
        type="icon"
        icon={<IcPlus size={20} />}
        state={disabledIn ? 'disabled' : 'enabled'}
        onClick={onZoomIn}
      />
      <ToolbarZoomItem
        type="icon"
        icon={<IcMinus size={20} />}
        state={disabledOut ? 'disabled' : 'enabled'}
        onClick={onZoomOut}
      />
    </div>
  );
}
