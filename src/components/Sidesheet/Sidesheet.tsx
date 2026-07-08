import type { ReactNode } from 'react';
import { OverlayHeaderModal } from '../Modal/OverlayHeaderModal';
import { OverlayFooterModal } from '../Modal/OverlayFooterModal';
import type { OverlayHeaderModalSize } from '../Modal/OverlayHeaderModal';

export type SidesheetSize = 'sm' | 'md';

export type SidesheetProps = {
  title: ReactNode;
  children?: ReactNode;
  size?: SidesheetSize;
  showFooter?: boolean;
  cancelLabel?: string;
  actionLabel?: string;
  showCancelBtn?: boolean;
  showActionBtn?: boolean;
  showHeaderDivider?: boolean;
  showFooterDivider?: boolean;
  showLeadingIcon?: boolean;
  leadingIcon?: ReactNode;
  showExtraIcon?: boolean;
  extraIcon?: ReactNode;
  onClose?: () => void;
  onCancel?: () => void;
  onAction?: () => void;
  className?: string;
};

const SIZE_WIDTH: Record<SidesheetSize, number> = {
  sm: 360,
  md: 480,
};

const SIZE_HEADER: Record<SidesheetSize, OverlayHeaderModalSize> = {
  sm: 'sm',
  md: 'md',
};

export function Sidesheet({
  title,
  children,
  size = 'sm',
  showFooter = false,
  cancelLabel = 'Cancel',
  actionLabel = 'Action',
  showCancelBtn = true,
  showActionBtn = true,
  showHeaderDivider = false,
  showFooterDivider = false,
  showLeadingIcon = false,
  leadingIcon,
  showExtraIcon = false,
  extraIcon,
  onClose,
  onCancel,
  onAction,
  className = '',
}: SidesheetProps) {
  const headerSize = SIZE_HEADER[size];

  return (
    <div
      className={`flex flex-col h-full bg-surface-container-highest text-element-primary overflow-hidden ${className}`}
      style={{
        width: SIZE_WIDTH[size],
        boxShadow: 'var(--sol-shadow-light)',
      }}
    >
      {/* overlay_header_modal */}
      <OverlayHeaderModal
        title={title}
        size={headerSize}
        align="left"
        type="web"
        showDivider={showHeaderDivider}
        showLeadingIcon={showLeadingIcon}
        leadingIcon={leadingIcon}
        showExtraIcon={showExtraIcon}
        extraIcon={extraIcon}
        onClose={onClose}
      />

      {/* slot */}
      <div
        className="flex flex-1 flex-col overflow-y-auto w-full"
        style={{ padding: 'var(--sol-spacing-16) var(--sol-spacing-24)' }}
      >
        {children}
      </div>

      {/* overlay_footer_modal */}
      {showFooter && (
        <OverlayFooterModal
          size={headerSize}
          align="right"
          type="web"
          cancelLabel={cancelLabel}
          actionLabel={actionLabel}
          showCancelBtn={showCancelBtn}
          showActionBtn={showActionBtn}
          showDivider={showFooterDivider}
          onCancel={onCancel}
          onAction={onAction}
        />
      )}
    </div>
  );
}
