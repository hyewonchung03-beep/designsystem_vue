import Checkbox from '../Checkbox/Checkbox';
import type { CheckboxSize } from '../Checkbox/Checkbox';

// ── Types ────────────────────────────────────────────────────────────────────

export type DatatableSelectCellSize = 'sm' | 'lg';

export type DatatableSelectCellProps = {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  size?: DatatableSelectCellSize;
  className?: string;
  'aria-label'?: string;
};

// ── Size config ──────────────────────────────────────────────────────────────

const cellConfig: Record<DatatableSelectCellSize, { padding: string; checkboxSize: CheckboxSize }> = {
  sm: { padding: 'py-1', checkboxSize: 'sm' },
  lg: { padding: 'py-3', checkboxSize: 'sm' },
};

// ── DatatableSelectCell ──────────────────────────────────────────────────────

export function DatatableSelectCell({
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  size = 'lg',
  className,
  'aria-label': ariaLabel = 'Select row',
}: DatatableSelectCellProps) {
  const { padding, checkboxSize } = cellConfig[size];
  return (
    <div className={`flex w-14 items-center justify-center ${padding} ${className ?? ''}`}>
      <Checkbox
        size={checkboxSize}
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        onChange={onChange}
        aria-label={ariaLabel}
      />
    </div>
  );
}

export default DatatableSelectCell;
