export type OverlayFooterModalSize = 'sm' | 'md';
export type OverlayFooterModalAlign = 'right' | 'center';
export type OverlayFooterModalType = 'web' | 'mobile';

export type OverlayFooterModalProps = {
  size?: OverlayFooterModalSize;
  align?: OverlayFooterModalAlign;
  type?: OverlayFooterModalType;
  cancelLabel?: string;
  actionLabel?: string;
  onCancel?: () => void;
  onAction?: () => void;
  showCancelBtn?: boolean;
  showActionBtn?: boolean;
  showDivider?: boolean;
  showLeftAction?: boolean;
  showLinkBtn?: boolean;
  linkLabel?: string;
  onLinkClick?: () => void;
  showStep?: boolean;
  step?: string;
  className?: string;
};

export function OverlayFooterModal({
  size = 'md',
  align = 'right',
  type = 'web',
  cancelLabel = 'Cancel',
  actionLabel = 'Action',
  onCancel,
  onAction,
  showCancelBtn = true,
  showActionBtn = true,
  showDivider = false,
  showLeftAction = false,
  showLinkBtn = false,
  linkLabel = 'label',
  onLinkClick,
  showStep = false,
  step = '1/5',
  className = '',
}: OverlayFooterModalProps) {
  const isMd = size === 'md';
  const isMobile = type === 'mobile';
  const isCenter = align === 'center';

  const btnTextStyle = {
    fontSize: isMd ? 'var(--sol-font-size-text-sm)' : 'var(--sol-font-size-text-xs)',
    lineHeight: isMd ? 'var(--sol-line-height-text-sm)' : 'var(--sol-line-height-text-xs-2line)',
  };

  const btnPaddingStyle = {
    paddingTop: 'var(--sol-spacing-8)',
    paddingBottom: 'var(--sol-spacing-8)',
    paddingLeft: 'var(--sol-spacing-12)',
    paddingRight: 'var(--sol-spacing-12)',
  };

  const containerPaddingStyle = isMd
    ? { padding: 'var(--sol-spacing-24)' }
    : {
        paddingTop: 'var(--sol-spacing-20)',
        paddingBottom: 'var(--sol-spacing-20)',
        paddingLeft: 'var(--sol-spacing-24)',
        paddingRight: 'var(--sol-spacing-24)',
      };

  /* Mobile: full-width docked Action button */
  if (isMobile) {
    return (
      <div
        className={`relative flex flex-col w-full shrink-0 ${className}`}
        style={{ paddingTop: 'var(--sol-spacing-16)', paddingBottom: 'var(--sol-spacing-16)' }}
      >
        <div
          className="flex flex-col w-full"
          style={{ paddingLeft: 'var(--sol-spacing-16)', paddingRight: 'var(--sol-spacing-16)' }}
        >
          {showActionBtn && (
            <button
              type="button"
              onClick={onAction}
              className="flex items-center justify-center w-full bg-primary text-element-inverse font-semibold rounded-4"
              style={{
                ...btnTextStyle,
                paddingTop: 'var(--sol-spacing-10)',
                paddingBottom: 'var(--sol-spacing-10)',
                paddingLeft: 'var(--sol-spacing-16)',
                paddingRight: 'var(--sol-spacing-16)',
              }}
            >
              {actionLabel}
            </button>
          )}
        </div>
        {showDivider && <div className="absolute top-0 left-0 right-0 h-px bg-border-solid-variant" />}
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center w-full shrink-0 ${isCenter ? 'justify-center' : 'justify-end'} ${className}`}
      style={{ ...containerPaddingStyle, gap: 'var(--sol-spacing-8)' }}
    >
      {/* Left area: link button + step indicator */}
      {!isCenter && showLeftAction && (
        <div
          className="flex flex-1 items-center min-w-0"
          style={{ gap: isMd ? 'var(--sol-spacing-8)' : 'var(--sol-spacing-6)' }}
        >
          {showLinkBtn && (
            <button
              type="button"
              onClick={onLinkClick}
              className="font-semibold text-primary underline shrink-0"
              style={btnTextStyle}
            >
              {linkLabel}
            </button>
          )}
          {showStep && (
            <span className="font-regular text-element-quaternary whitespace-nowrap shrink-0" style={btnTextStyle}>
              {step}
            </span>
          )}
        </div>
      )}

      {showCancelBtn && (
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center justify-center border border-border-normal rounded-4 font-semibold text-element-brand whitespace-nowrap shrink-0"
          style={{
            ...btnPaddingStyle,
            ...btnTextStyle,
            backgroundColor: 'var(--sol-surface-container-highest)',
            gap: 'var(--sol-spacing-6)',
          }}
        >
          {cancelLabel}
        </button>
      )}

      {showActionBtn && (
        <button
          type="button"
          onClick={onAction}
          className="flex items-center justify-center bg-primary rounded-4 font-semibold text-element-inverse whitespace-nowrap shrink-0"
          style={{
            ...btnPaddingStyle,
            ...btnTextStyle,
            gap: 'var(--sol-spacing-6)',
          }}
        >
          {actionLabel}
        </button>
      )}

      {showDivider && <div className="absolute top-0 left-0 right-0 h-px bg-border-solid-variant" />}
    </div>
  );
}
