import type { ReactNode } from 'react';
import { ToolbarZoom } from './ToolbarZoom';

// ── Types ────────────────────────────────────────────────────────────────────

export type ToolbarVerticalProps = {
  children?: ReactNode;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  disabledIn?: boolean;
  disabledOut?: boolean;
  className?: string;
};

// ── ToolbarVertical ───────────────────────────────────────────────────────────

export function ToolbarVertical({
  children,
  onZoomIn,
  onZoomOut,
  disabledIn = false,
  disabledOut = false,
  className = '',
}: ToolbarVerticalProps) {
  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      {children}
      <ToolbarZoom
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        disabledIn={disabledIn}
        disabledOut={disabledOut}
      />
    </div>
  );
}
