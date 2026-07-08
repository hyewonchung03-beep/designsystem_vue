export type SidesheetFooterProps = {
  cancelLabel?: string;
  actionLabel?: string;
  showCancelBtn?: boolean;
  showActionBtn?: boolean;
  showDivider?: boolean;
  onCancel?: () => void;
  onAction?: () => void;
  className?: string;
};

const btnTextStyle = {
  fontSize: 'var(--sol-font-size-text-sm)',
  lineHeight: 'var(--sol-line-height-text-sm)',
};

const btnPaddingStyle = {
  paddingTop: 'var(--sol-spacing-8)',
  paddingBottom: 'var(--sol-spacing-8)',
  paddingLeft: 'var(--sol-spacing-12)',
  paddingRight: 'var(--sol-spacing-12)',
};

export function SidesheetFooter({
  cancelLabel = 'Cancel',
  actionLabel = 'Action',
  showCancelBtn = true,
  showActionBtn = true,
  showDivider = true,
  onCancel,
  onAction,
  className = '',
}: SidesheetFooterProps) {
  return (
    <div
      className={`relative flex items-center justify-end shrink-0 w-full ${className}`}
      style={{
        gap: 'var(--sol-spacing-8)',
        padding: 'var(--sol-spacing-16) var(--sol-spacing-20)',
      }}
    >
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
      {showDivider && (
        <div className="absolute top-0 left-0 right-0 h-px bg-border-solid-variant" />
      )}
    </div>
  );
}
