// ── Types ────────────────────────────────────────────────────────────────────

export type StructuredListSelectCellProps = {
  condensed?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
};

// ── StructuredListSelectCell ─────────────────────────────────────────────────

export function StructuredListSelectCell({
  condensed = false,
  checked = false,
  disabled = false,
  onChange,
  className = '',
}: StructuredListSelectCellProps) {
  const containerStyle = condensed
    ? { minHeight: 32, paddingTop: 8, paddingBottom: 8 }
    : { minHeight: 56, paddingTop: 16, paddingBottom: 24 };

  return (
    <div
      className={`flex flex-col items-center justify-center shrink-0 ${className}`}
      style={{ minWidth: 32, width: 56, ...containerStyle }}
    >
      <button
        type="button"
        role="radio"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={`group relative flex items-center justify-center shrink-0 rounded-full focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)] ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        style={{ width: 20, height: 20 }}
      >
        {/* Interaction overlay (full 20px area) */}
        {!disabled && (
          <span className="absolute inset-0 rounded-full bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
        )}

        {/* Radio circle (inset 16.67% → ~13.3px) */}
        <span
          className={`absolute flex items-center justify-center rounded-full ${
            checked
              ? disabled
                ? 'bg-fill-disabled'
                : 'bg-tertiary'
              : disabled
                ? 'border border-border-disabled bg-surface-container'
                : 'border border-border-normal bg-surface-container'
          }`}
          style={{ inset: '16.67%' }}
        >
          {/* Inner dot */}
          {checked && (
            <span
              className={`rounded-full ${disabled ? 'bg-element-disabled' : 'bg-element-inverse'}`}
              style={{ width: 6, height: 6 }}
            />
          )}
        </span>
      </button>
    </div>
  );
}
