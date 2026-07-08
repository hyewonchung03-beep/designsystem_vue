import { DatatableCell } from '../DatatableCell/DatatableCell';
import type { DatatableCellProps } from '../DatatableCell/DatatableCell';
import { DatatableSelectCell } from '../DatatableSelectCell/DatatableSelectCell';

// ── Types ────────────────────────────────────────────────────────────────────

export type DatatableRowState = 'enabled' | 'disabled' | 'selected';

export type DatatableRowProps = {
  cells?: DatatableCellProps[];
  showDivider?: boolean;
  showSelect?: boolean;
  selectChecked?: boolean;
  onSelectChange?: (checked: boolean) => void;
  state?: DatatableRowState;
  children?: React.ReactNode;
  className?: string;
};

// ── DatatableRow ─────────────────────────────────────────────────────────────

export function DatatableRow({
  cells,
  showDivider = true,
  showSelect = false,
  selectChecked = false,
  onSelectChange,
  state = 'enabled',
  children,
  className,
}: DatatableRowProps) {
  const isDisabled = state === 'disabled';
  const isSelected = state === 'selected';

  return (
    <div
      role="row"
      className={`relative flex flex-col items-start text-left ${className ?? ''}`}
    >
      {/* Selected state background */}
      {isSelected && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-clip bg-selected-container-variant"
        />
      )}

      {/* Interaction overlay — hover/active only for non-disabled rows */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-clip bg-interaction-neutral-normal${
          !isDisabled
            ? ' hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed'
            : ''
        }`}
      />

      {/* Cells */}
      <div className="relative flex w-full shrink-0 items-center overflow-clip">
        {showSelect && (
          <DatatableSelectCell
            checked={selectChecked}
            onChange={onSelectChange}
            size="lg"
            aria-label="Select row"
          />
        )}

        {/* Data cells — dimmed for disabled state */}
        <div
          className={`flex min-w-0 flex-1 items-center overflow-clip${
            isDisabled ? ' opacity-[0.36]' : ''
          }`}
        >
          {children ?? (
            cells?.map((cellProps, idx) => (
              <DatatableCell
                key={idx}
                showLeftIcon
                showSubText
                size="lg"
                {...cellProps}
                className={`flex-1 px-2 ${cellProps.className ?? ''}`}
              />
            ))
          )}
        </div>
      </div>

      {/* Bottom divider */}
      {showDivider && (
        <div className="h-px w-full shrink-0 rounded-2 bg-border-solid-variant" />
      )}
    </div>
  );
}

export default DatatableRow;
