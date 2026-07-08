import { useId } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

export type DropdownItemType = 'default' | 'checkbox';

export type DropdownItemProps = {
  label?: string;
  description?: string;
  type?: DropdownItemType;
  compact?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export type DropdownProps = {
  compact?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export type DropdownGroupLabelProps = {
  label: string;
  compact?: boolean;
};

export type DropdownFooterProps = {
  variant?: 'control' | 'add';
  addLabel?: string;
  onAdd?: () => void;
  onRefresh?: () => void;
  onCancel?: () => void;
  onApply?: () => void;
  showRefresh?: boolean;
};

// ── Icons ──────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M11.0833 4.08301L5.54163 9.62467L2.91663 6.99967L3.6213 6.29501L5.54163 8.21534L10.3786 3.37834L11.0833 4.08301Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckboxUncheckedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.25" className="text-border-solid" />
    </svg>
  );
}

function CheckboxCheckedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="13" height="13" rx="2.5" fill="currentColor" className="text-element-brand" />
      <path
        d="M12.299 4.131L5.824 10.606C5.568 10.861 5.148 10.859 4.902 10.606L1.701 7.409L2.629 6.477L5.36 9.215L11.371 3.203Z"
        className="fill-static-white"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7.625 3.5H6.375V6.375H3.5V7.625H6.375V10.5H7.625V7.625H10.5V6.375H7.625V3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M11.6667 7.00033C11.6667 9.57767 9.57767 11.6667 7.00033 11.6667C4.42299 11.6667 2.33366 9.57767 2.33366 7.00033C2.33366 4.42299 4.42299 2.33366 7.00033 2.33366C8.55249 2.33366 9.93109 3.08539 10.7917 4.24251V2.91699H11.6667V5.83366H8.75033V4.95866H10.0921C9.37776 3.86636 8.27036 3.20866 7.00033 3.20866C4.90599 3.20866 3.20866 4.90599 3.20866 7.00033C3.20866 9.09466 4.90599 10.7917 7.00033 10.7917C9.09466 10.7917 10.7917 9.09466 10.7917 7.00033H11.6667Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ── DropdownItem ──────────────────────────────────────────────────────────

export function DropdownItem({
  label = 'Dropdown Item',
  description,
  type = 'default',
  compact = true,
  selected = false,
  disabled = false,
  onClick,
  className,
}: DropdownItemProps) {
  const heightClass = compact ? 'min-h-[30px]' : 'min-h-9';
  const textColor = disabled
    ? 'text-element-disabled'
    : 'text-element-primary';
  const fontWeight = selected && type === 'default' ? 'font-semibold' : 'font-regular';

  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
      className={`relative flex w-full items-center gap-1.5 overflow-hidden rounded-2 px-2 py-1.5
        ${heightClass}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        focus-visible:outline-none focus-visible:shadow-focus-button-ring
        ${!disabled && !selected ? 'hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed' : ''}
        ${selected ? 'bg-selected-container' : ''}
        ${className ?? ''}`}
    >
      {type === 'checkbox' && (
        <span className="flex size-3.5 shrink-0 items-center justify-center">
          {selected ? <CheckboxCheckedIcon /> : <CheckboxUncheckedIcon />}
        </span>
      )}

      <span className={`flex min-w-0 flex-1 flex-col gap-0.5 text-left ${textColor}`}>
        <span className={`truncate text-text-sm leading-text-sm ${fontWeight}`}>
          {label}
        </span>
        {description && (
          <span className="truncate text-text-xxs leading-text-xxs text-element-tertiary">
            {description}
          </span>
        )}
      </span>

      {type === 'default' && selected && (
        <span className="flex size-3.5 shrink-0 items-center justify-center text-element-brand">
          <CheckIcon />
        </span>
      )}
    </button>
  );
}

// ── DropdownGroupLabel ────────────────────────────────────────────────────

export function DropdownGroupLabel({ label, compact = true }: DropdownGroupLabelProps) {
  const heightClass = compact ? 'min-h-[30px]' : 'min-h-8';

  return (
    <div
      role="presentation"
      className={`flex items-center px-3 py-2 ${heightClass}`}
    >
      <span className="truncate text-text-xs font-semibold leading-text-xs text-element-tertiary">
        {label}
      </span>
    </div>
  );
}

// ── DropdownFooter ────────────────────────────────────────────────────────

export function DropdownFooter({
  variant = 'control',
  addLabel = 'Add',
  onAdd,
  onRefresh,
  onCancel,
  onApply,
  showRefresh = true,
}: DropdownFooterProps) {
  if (variant === 'add') {
    return (
      <div className="flex items-center justify-center border-t border-border-solid p-3">
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 rounded-2 text-text-xs font-semibold leading-text-xs text-primary
            hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
            focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        >
          <PlusIcon />
          {addLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-3 border-t border-border-solid p-3">
      <div className="flex min-w-0 flex-1 items-center">
        {showRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            className="flex items-center gap-1 rounded-2 text-text-xs font-semibold leading-text-xs text-element-quaternary
              hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
              focus-visible:outline-none focus-visible:shadow-focus-button-ring"
          >
            <RefreshIcon />
            Refresh
          </button>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-2 text-text-xs font-semibold leading-text-xs text-element-quaternary
            hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
            focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onApply}
          className="rounded-2 text-text-xs font-semibold leading-text-xs text-primary
            hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
            focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

// ── Dropdown (container) ──────────────────────────────────────────────────

export default function Dropdown({
  compact = true,
  children,
  className,
}: DropdownProps) {
  const listId = useId();
  const maxHeight = compact ? 'max-h-60' : 'max-h-80';

  return (
    <div
      role="listbox"
      id={listId}
      className={`min-w-40 overflow-hidden rounded-4 bg-surface-container-high p-1 shadow-normal
        ${className ?? ''}`}
    >
      <div className={`overflow-y-auto ${maxHeight}`}>
        {children}
      </div>
    </div>
  );
}
