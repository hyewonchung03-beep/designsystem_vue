import Divider from '../Divider/Divider';

export type OverlayFooterPopoverProps = {
  cancelLabel?: string;
  selectLabel?: string;
  onCancel?: () => void;
  onSelect?: () => void;
  showRefresh?: boolean;
  clearAllLabel?: string;
  onClearAll?: () => void;
  className?: string;
};

export function OverlayFooterPopover({
  cancelLabel = 'Cancel',
  selectLabel = 'Select',
  onCancel,
  onSelect,
  showRefresh = false,
  clearAllLabel = 'Clear all',
  onClearAll,
  className = '',
}: OverlayFooterPopoverProps) {
  const textStyle = {
    fontSize: 'var(--sol-font-size-text-sm)',
    lineHeight: 'var(--sol-line-height-text-sm)',
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <Divider type="horizontal" color="G100" solid className="shrink-0" />
      <div
        className={`flex items-center w-full ${showRefresh ? 'justify-between' : 'justify-end'}`}
        style={{
          paddingTop: 'var(--sol-spacing-16)',
          paddingBottom: 'var(--sol-spacing-16)',
          paddingLeft: 'var(--sol-spacing-20)',
          paddingRight: 'var(--sol-spacing-20)',
        }}
      >
        {showRefresh && (
          <button
            type="button"
            onClick={onClearAll}
            className="font-semibold text-element-quaternary whitespace-nowrap shrink-0"
            style={textStyle}
          >
            {clearAllLabel}
          </button>
        )}

        <div
          className="flex items-center shrink-0"
          style={{ gap: 'var(--sol-spacing-20)' }}
        >
          <button
            type="button"
            onClick={onCancel}
            className="font-semibold text-element-quaternary whitespace-nowrap"
            style={textStyle}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onSelect}
            className="font-semibold text-element-brand whitespace-nowrap"
            style={textStyle}
          >
            {selectLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
