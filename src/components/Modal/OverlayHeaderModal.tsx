import type { ReactNode } from 'react';
import { IcBlank } from '../Icon/IcBlank';
import { IcTrigger } from '../Icon/IcTrigger';

export type OverlayHeaderModalSize = 'sm' | 'md';
export type OverlayHeaderModalAlign = 'left' | 'center';
export type OverlayHeaderModalType = 'web' | 'mobile';

export type OverlayHeaderModalProps = {
  title: ReactNode;
  size?: OverlayHeaderModalSize;
  align?: OverlayHeaderModalAlign;
  type?: OverlayHeaderModalType;
  showDivider?: boolean;
  showLeadingIcon?: boolean;
  leadingIcon?: ReactNode;
  showExtraIcon?: boolean;
  extraIcon?: ReactNode;
  onClose?: () => void;
  className?: string;
};

function IcClose({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M18.9707 5.91064L12.8809 11.9995L18.9707 18.0894L17.9102 19.1499L11.8203 13.0601L5.73145 19.1499L4.6709 18.0894L10.7598 11.9995L4.6709 5.91064L5.73145 4.8501L11.8203 10.939L17.9102 4.8501L18.9707 5.91064Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ModalCloseButton({ size, onClose }: { size: 16 | 20; onClose?: () => void }) {
  return (
    <IcTrigger size={size} aria-label="닫기" onClick={onClose}>
      <span className="inline-flex text-element-quaternary">
        <IcClose size={size} />
      </span>
    </IcTrigger>
  );
}

export function OverlayHeaderModal({
  title,
  size = 'md',
  align = 'left',
  type = 'web',
  showDivider = false,
  showLeadingIcon = false,
  leadingIcon,
  showExtraIcon = false,
  extraIcon,
  onClose,
  className = '',
}: OverlayHeaderModalProps) {
  const isMd = size === 'md';
  const isCenter = align === 'center';
  const isMobile = type === 'mobile';
  const iconSize = isMd ? 20 : 16;

  const titleStyle = {
    fontSize: isMd ? 'var(--sol-font-size-text-lg)' : 'var(--sol-font-size-text-md)',
    lineHeight: isMd ? 'var(--sol-line-height-text-lg)' : 'var(--sol-line-height-text-md)',
  };

  const paddingStyle = isMobile
    ? {
        paddingTop: 'var(--sol-spacing-16)',
        paddingBottom: 'var(--sol-spacing-16)',
        paddingLeft: 'var(--sol-spacing-24)',
        paddingRight: 'var(--sol-spacing-24)',
      }
    : isCenter
      ? {
          paddingTop: 'var(--sol-spacing-24)',
          paddingBottom: 'var(--sol-spacing-16)',
          paddingLeft: 'var(--sol-spacing-24)',
          paddingRight: 'var(--sol-spacing-24)',
        }
      : {
          paddingTop: 'var(--sol-spacing-24)',
          paddingBottom: 'var(--sol-spacing-12)',
          paddingLeft: 'var(--sol-spacing-24)',
          paddingRight: 'var(--sol-spacing-24)',
        };

  return (
    <div
      className={`relative flex flex-col w-full shrink-0 ${isMobile ? 'bg-surface-container-highest items-center' : isCenter ? 'items-center' : 'items-start justify-center'} ${className}`}
      style={paddingStyle}
    >
      {isCenter ? (
        <>
          {!isMobile && (
            <div className="flex items-start justify-end w-full">
              <ModalCloseButton size={iconSize} onClose={onClose} />
            </div>
          )}
          <p className="font-semibold text-element-primary text-center w-full" style={titleStyle}>
            {title}
          </p>
        </>
      ) : (
        <div
          className="flex items-center w-full"
          style={{ gap: 'var(--sol-spacing-8)' }}
        >
          {showLeadingIcon && (
            <span className="text-element-primary shrink-0">
              {leadingIcon ?? <IcBlank size={iconSize} />}
            </span>
          )}
          <p className="flex-1 font-semibold text-element-primary min-w-0 break-words" style={titleStyle}>
            {title}
          </p>
          <div
            className="flex items-center shrink-0"
            style={{ gap: isMd ? 'var(--sol-spacing-20)' : 'var(--sol-spacing-12)' }}
          >
            {showExtraIcon && (
              <span className="text-element-secondary shrink-0">
                {extraIcon ?? <IcBlank size={iconSize} />}
              </span>
            )}
            <ModalCloseButton size={iconSize} onClose={onClose} />
          </div>
        </div>
      )}

      {showDivider && (
        <div className="absolute left-0 right-0 bottom-0 h-px bg-border-solid-variant" />
      )}
    </div>
  );
}
