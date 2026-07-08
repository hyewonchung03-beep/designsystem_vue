import type { ReactNode } from 'react';
import { OverlayHeaderModal } from './OverlayHeaderModal';
import { OverlayFooterModal } from './OverlayFooterModal';
import type {
  OverlayHeaderModalSize,
  OverlayHeaderModalAlign,
  OverlayHeaderModalType,
} from './OverlayHeaderModal';

export type OverlayModalWidth = 360 | 480 | 768 | 1024;

export type OverlayModalProps = {
  title: ReactNode;
  children?: ReactNode;
  size?: OverlayHeaderModalSize;
  align?: OverlayHeaderModalAlign;
  type?: OverlayHeaderModalType;
  width?: OverlayModalWidth;
  cancelLabel?: string;
  actionLabel?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onAction?: () => void;
  showCancelBtn?: boolean;
  showActionBtn?: boolean;
  showHeaderDivider?: boolean;
  showFooterDivider?: boolean;
  showLeadingIcon?: boolean;
  leadingIcon?: ReactNode;
  showExtraIcon?: boolean;
  extraIcon?: ReactNode;
  showLeftAction?: boolean;
  showLinkBtn?: boolean;
  linkLabel?: string;
  onLinkClick?: () => void;
  showStep?: boolean;
  step?: string;
  className?: string;
};

export function OverlayModal({
  title,
  children,
  size = 'md',
  align = 'left',
  type = 'web',
  width = 480,
  cancelLabel = 'Cancel',
  actionLabel = 'Action',
  onClose,
  onCancel,
  onAction,
  showCancelBtn = true,
  showActionBtn = true,
  showHeaderDivider = false,
  showFooterDivider = false,
  showLeadingIcon = false,
  leadingIcon,
  showExtraIcon = false,
  extraIcon,
  showLeftAction = false,
  showLinkBtn = false,
  linkLabel = 'label',
  onLinkClick,
  showStep = false,
  step = '1/5',
  className = '',
}: OverlayModalProps) {
  const isMobile = type === 'mobile';
  const slotStyle = {
    height: isMobile ? 80 : 28,
    paddingTop: 0,
    paddingRight: 'var(--sol-spacing-24)',
    paddingBottom: 'var(--sol-spacing-8)',
    paddingLeft: 'var(--sol-spacing-24)',
  };

  return (
    <div
      className={`flex flex-col bg-surface-container-highest text-element-primary border border-border-normal rounded-4 overflow-hidden ${className}`}
      style={{
        width,
        maxHeight: 660,
        boxShadow: 'var(--sol-shadow-light)',
      }}
    >
      <OverlayHeaderModal
        title={title}
        size={size}
        align={align}
        type={type}
        showDivider={showHeaderDivider}
        showLeadingIcon={showLeadingIcon}
        leadingIcon={leadingIcon}
        showExtraIcon={showExtraIcon}
        extraIcon={extraIcon}
        onClose={onClose}
      />

      {children && (
        <div className="flex w-full shrink-0 overflow-y-auto" style={slotStyle}>
          {children}
        </div>
      )}

      <OverlayFooterModal
        size={size}
        align={align === 'left' ? 'right' : 'center'}
        type={type}
        cancelLabel={cancelLabel}
        actionLabel={actionLabel}
        onCancel={onCancel}
        onAction={onAction}
        showCancelBtn={showCancelBtn}
        showActionBtn={showActionBtn}
        showDivider={showFooterDivider}
        showLeftAction={showLeftAction}
        showLinkBtn={showLinkBtn}
        linkLabel={linkLabel}
        onLinkClick={onLinkClick}
        showStep={showStep}
        step={step}
      />
    </div>
  );
}
