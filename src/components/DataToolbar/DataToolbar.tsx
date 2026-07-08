import { useState, useRef, useEffect, useId } from 'react';
import { BadgeCounter } from '../Badge/BadgeCounter';

// ── Types ────────────────────────────────────────────────────────────────────

export type DataToolbarProps = {
  type?: 'basic' | 'action';
  // basic
  totalCount?: number;
  perPage?: number;
  perPageOptions?: number[];
  onPerPageChange?: (value: number) => void;
  columns?: string[];
  visibleColumns?: string[];
  onVisibleColumnsChange?: (columns: string[]) => void;
  // action
  showInput?: boolean;
  showAction?: boolean;
  showCount?: boolean;
  selectedCount?: number;
  subLabel?: string;
  onSubClick?: () => void;
  showSubButton?: boolean;
  // shared
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onDownload?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  onActionTrigger?: () => void;
  className?: string;
};

// ── Icons ────────────────────────────────────────────────────────────────────

function IcChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z" fill="currentColor" />
    </svg>
  );
}

function IcChevronDownSm() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z" fill="currentColor" />
    </svg>
  );
}

function IcColumn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19.5 18.5V20H4.5V18.5H19.5ZM19.5 5.5H4.5V20L4.34668 19.9922C3.59028 19.9154 3 19.2767 3 18.5V5.5C3 4.67157 3.67157 4 4.5 4H19.5C20.3284 4 21 4.67157 21 5.5V18.5C21 19.2767 20.4097 19.9154 19.6533 19.9922L19.5 20V5.5Z" fill="currentColor" />
      <path d="M10 18.9248H8.5L8.5 5.27148L10 5.27148L10 18.9248Z" fill="currentColor" />
      <path d="M15.5 18.9248H14L14 5.27148L15.5 5.27148L15.5 18.9248Z" fill="currentColor" />
    </svg>
  );
}

function IcSearchSm() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.2217 11.4502C20.2216 13.5376 19.4624 15.4466 18.208 16.9209L21.6318 20.2324L20.5889 21.3105L17.1406 17.9746C15.6808 19.1773 13.8106 19.9003 11.7715 19.9004C7.10474 19.9004 3.32139 16.1169 3.32129 11.4502C3.32129 6.78339 7.10468 3 11.7715 3C16.4382 3.00011 20.2217 6.78345 20.2217 11.4502ZM18.7217 11.4502C18.7217 7.61188 15.6098 4.50011 11.7715 4.5C7.93311 4.5 4.82129 7.61182 4.82129 11.4502C4.82139 15.2885 7.93317 18.4004 11.7715 18.4004C15.6097 18.4003 18.7216 15.2884 18.7217 11.4502Z" fill="currentColor" />
    </svg>
  );
}

function IcSearchMd() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.2217 11.4502C20.2216 13.5376 19.4624 15.4466 18.208 16.9209L21.6318 20.2324L20.5889 21.3105L17.1406 17.9746C15.6808 19.1773 13.8106 19.9003 11.7715 19.9004C7.10474 19.9004 3.32139 16.1169 3.32129 11.4502C3.32129 6.78339 7.10468 3 11.7715 3C16.4382 3.00011 20.2217 6.78345 20.2217 11.4502ZM18.7217 11.4502C18.7217 7.61188 15.6098 4.50011 11.7715 4.5C7.93311 4.5 4.82129 7.61182 4.82129 11.4502C4.82139 15.2885 7.93317 18.4004 11.7715 18.4004C15.6097 18.4003 18.7216 15.2884 18.7217 11.4502Z" fill="currentColor" />
    </svg>
  );
}

function IcDownload() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.3213 18.7832V15.833H4.8213V18.7832C4.8213 19.0522 4.82166 19.209 4.83106 19.3242C4.83516 19.3744 4.84008 19.4019 4.84278 19.4141C4.85767 19.4408 4.87962 19.4624 4.90626 19.4775C4.91786 19.4802 4.94528 19.486 4.99708 19.4902C5.1123 19.4996 5.26913 19.5 5.5381 19.5H19.1045C19.3735 19.5 19.5303 19.4996 19.6455 19.4902C19.696 19.4861 19.7233 19.4802 19.7354 19.4775C19.7622 19.4625 19.7838 19.4409 19.7988 19.4141C19.8015 19.402 19.8074 19.3747 19.8115 19.3242C19.8209 19.209 19.8213 19.0522 19.8213 18.7832V15.833H21.3213V18.7832C21.3213 19.0274 21.3222 19.2558 21.3067 19.4463C21.2944 19.5957 21.2698 19.7585 21.2109 19.9238L21.1397 20.0898C20.9999 20.3641 20.7873 20.5938 20.5264 20.7539L20.4111 20.8184C20.1898 20.9311 19.9668 20.9691 19.7676 20.9854C19.5771 21.0009 19.3487 21 19.1045 21H5.5381C5.29387 21 5.06545 21.0009 4.87501 20.9854C4.72564 20.9731 4.56283 20.9485 4.39747 20.8896L4.23145 20.8184C3.91785 20.6586 3.66273 20.4034 3.50294 20.0898C3.39018 19.8685 3.35222 19.6455 3.33595 19.4463C3.3204 19.2558 3.3213 19.0274 3.3213 18.7832ZM11.5713 3H13.0713V14.7725L17.8213 10.0225L18.8818 11.083L12.8516 17.1133C12.5587 17.4062 12.0839 17.4062 11.791 17.1133L5.76075 11.083L6.8213 10.0225L11.5713 14.7725V3Z" fill="currentColor" />
    </svg>
  );
}

// ── Shared sub-components ────────────────────────────────────────────────────

function ToolbarDivider() {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      className="h-3 w-px shrink-0 rounded-2 bg-border-solid"
    />
  );
}

function SplitButton({
  label,
  onClick,
  onTrigger,
}: {
  label: string;
  onClick?: () => void;
  onTrigger?: () => void;
}) {
  return (
    <div className="flex h-[32px] items-center overflow-hidden rounded-4">
      <button
        type="button"
        onClick={onClick}
        className="flex h-full items-center pl-3 pr-2.5 bg-primary text-text-xs leading-text-xs font-semibold text-element-inverse
          hover:bg-interaction-inverse-hover active:bg-interaction-inverse-pressed
          focus-visible:outline-none"
      >
        {label}
      </button>
      <div aria-hidden="true" className="h-full w-px shrink-0 bg-border-solid-variant" />
      <button
        type="button"
        onClick={onTrigger}
        aria-label="More actions"
        className="flex size-[32px] shrink-0 items-center justify-center bg-primary text-element-inverse
          hover:bg-interaction-inverse-hover active:bg-interaction-inverse-pressed
          focus-visible:outline-none"
      >
        <IcChevronDownSm />
      </button>
    </div>
  );
}

function DownloadIconButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Download"
      className="relative flex size-[32px] shrink-0 items-center justify-center overflow-hidden rounded-4 border border-border-normal bg-secondary
        hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
        focus-visible:outline-none focus-visible:shadow-focus-button-ring"
    >
      <span className="flex size-4 items-center justify-center text-element-primary">
        <IcDownload />
      </span>
    </button>
  );
}

// ── Basic sub-components ─────────────────────────────────────────────────────

function BasicSearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputId = useId();
  return (
    <div className="flex w-[200px] flex-col items-start">
      <div className="flex h-[30px] w-full items-center gap-1 overflow-hidden rounded-4 border border-border-normal bg-surface-container pl-2.5 pr-3">
        <label htmlFor={inputId} className="flex size-3.5 shrink-0 items-center justify-center text-element-quaternary">
          <IcSearchSm />
        </label>
        <input
          id={inputId}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search"
          className="min-w-0 flex-1 truncate border-none bg-transparent text-text-sm leading-text-xs font-regular text-element-primary placeholder:text-element-quaternary outline-none"
        />
      </div>
    </div>
  );
}

function PerPageSelect({
  value,
  options,
  onChange,
}: {
  value: number;
  options: number[];
  onChange?: (v: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    if (isOpen) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center gap-1 rounded-4 text-text-md leading-text-md font-regular text-element-primary
          hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
          focus-visible:outline-none focus-visible:shadow-focus-button-ring"
      >
        <span className="truncate">{value} per page</span>
        <span className="flex size-4 shrink-0 items-center justify-center text-element-primary">
          <IcChevronDown />
        </span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 top-full z-50 mt-1 min-w-28 rounded-4 bg-surface-container-high p-1 shadow-normal"
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              role="option"
              aria-selected={opt === value}
              onClick={() => { onChange?.(opt); setIsOpen(false); }}
              className={`flex h-[30px] w-full items-center rounded-2 px-2 text-left text-text-sm leading-text-sm font-regular text-element-primary focus:outline-none ${
                opt === value ? 'bg-selected-container font-semibold' : 'hover:bg-interaction-neutral-hover'
              }`}
            >
              {opt} per page
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ColumnSelect({
  columns,
  visibleColumns,
  onChange,
}: {
  columns: string[];
  visibleColumns: string[];
  onChange?: (cols: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    if (isOpen) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen]);

  function toggleColumn(col: string) {
    const next = visibleColumns.includes(col)
      ? visibleColumns.filter((c) => c !== col)
      : [...visibleColumns, col];
    onChange?.(next);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center gap-1 rounded-4 text-text-md leading-text-md font-regular text-element-primary
          hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
          focus-visible:outline-none focus-visible:shadow-focus-button-ring"
      >
        <span className="flex size-5 shrink-0 items-center justify-center text-element-primary">
          <IcColumn />
        </span>
        <span className="truncate">Column</span>
        <BadgeCounter count={visibleColumns.length} />
        <span className="flex size-4 shrink-0 items-center justify-center text-element-primary">
          <IcChevronDown />
        </span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className="absolute left-0 top-full z-50 mt-1 min-w-40 rounded-4 bg-surface-container-high p-1 shadow-normal"
        >
          {columns.map((col) => {
            const checked = visibleColumns.includes(col);
            return (
              <button
                key={col}
                type="button"
                role="option"
                aria-selected={checked}
                onClick={() => toggleColumn(col)}
                className={`flex h-[30px] w-full items-center gap-1.5 rounded-2 px-2 text-left text-text-sm leading-text-sm font-regular text-element-primary focus:outline-none ${
                  checked ? 'bg-selected-container' : 'hover:bg-interaction-neutral-hover'
                }`}
              >
                <span className="flex size-3.5 shrink-0 items-center justify-center">
                  {checked ? <CheckboxCheckedIcon /> : <CheckboxUncheckedIcon />}
                </span>
                {col}
              </button>
            );
          })}
        </div>
      )}
    </div>
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
      <path d="M12.299 4.131L5.824 10.606C5.568 10.861 5.148 10.859 4.902 10.606L1.701 7.409L2.629 6.477L5.36 9.215L11.371 3.203Z" className="fill-static-white" />
    </svg>
  );
}

// ── Action sub-components ────────────────────────────────────────────────────

function ActionSearchInput({
  placeholder = 'Search',
  value,
  onChange,
}: {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const inputId = useId();
  return (
    <div className="flex max-w-[300px] flex-1 flex-col items-start">
      <div className="flex h-[36px] w-full items-center gap-1 overflow-hidden rounded-4 border border-border-normal bg-surface-container pl-3 pr-3 py-2.5">
        <label htmlFor={inputId} className="flex size-4 shrink-0 items-center justify-center text-element-quaternary">
          <IcSearchMd />
        </label>
        <input
          id={inputId}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 truncate border-none bg-transparent text-text-sm leading-text-xs font-regular text-element-primary placeholder:text-element-quaternary outline-none"
        />
      </div>
    </div>
  );
}

// ── DataToolbar ──────────────────────────────────────────────────────────────

export default function DataToolbar({
  type = 'basic',
  // basic
  totalCount = 0,
  perPage = 10,
  perPageOptions = [10, 20, 50, 100],
  onPerPageChange,
  columns = [],
  visibleColumns,
  onVisibleColumnsChange,
  // action
  showInput = true,
  showAction = true,
  showCount = false,
  selectedCount = 0,
  subLabel = 'Sub',
  onSubClick,
  showSubButton = true,
  // shared
  searchValue,
  onSearchChange,
  onDownload,
  actionLabel = 'Action',
  onAction,
  onActionTrigger,
  className,
}: DataToolbarProps) {
  const [internalPerPage, setInternalPerPage] = useState(perPage);
  const [internalVisible, setInternalVisible] = useState<string[]>(visibleColumns ?? columns);
  const [internalSearch, setInternalSearch] = useState('');

  const currentPerPage = onPerPageChange ? perPage : internalPerPage;
  const currentVisible = onVisibleColumnsChange ? (visibleColumns ?? columns) : internalVisible;
  const currentSearch = searchValue ?? internalSearch;

  function handlePerPageChange(v: number) {
    if (!onPerPageChange) setInternalPerPage(v);
    onPerPageChange?.(v);
  }

  function handleVisibleChange(cols: string[]) {
    if (!onVisibleColumnsChange) setInternalVisible(cols);
    onVisibleColumnsChange?.(cols);
  }

  function handleSearchChange(v: string) {
    if (searchValue === undefined) setInternalSearch(v);
    onSearchChange?.(v);
  }

  if (type === 'action') {
    return (
      <div
        role="toolbar"
        aria-label="Data table action toolbar"
        className={`flex h-[52px] items-center justify-between gap-3 px-3 py-2 ${className ?? ''}`}
      >
        {/* Left: search */}
        {showInput && (
          <ActionSearchInput
            value={currentSearch}
            onChange={handleSearchChange}
          />
        )}

        {/* Middle: selected count */}
        {showCount && (
          <span className="flex shrink-0 items-center gap-1.5 text-text-xs leading-text-xs font-semibold">
            <span className="text-element-tertiary">Selected</span>
            <span className="text-element-tertiary">{selectedCount}</span>
          </span>
        )}

        {/* Right: actions */}
        {showAction && (
          <div className="flex shrink-0 items-center gap-2">
            <DownloadIconButton onClick={onDownload} />
            {showSubButton && (
              <button
                type="button"
                onClick={onSubClick}
                className="relative flex h-[32px] min-w-[64px] items-center justify-center gap-1 overflow-hidden rounded-4 border border-border-normal bg-secondary px-3 py-2
                  hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
                  focus-visible:outline-none focus-visible:shadow-focus-button-ring"
              >
                <span className="text-text-xs leading-text-xs font-semibold text-element-brand">
                  {subLabel}
                </span>
              </button>
            )}
            <SplitButton
              label={actionLabel}
              onClick={onAction}
              onTrigger={onActionTrigger}
            />
          </div>
        )}
      </div>
    );
  }

  // type === 'basic'
  return (
    <div
      role="toolbar"
      aria-label="Data table toolbar"
      className={`flex h-[52px] items-center justify-between px-3 py-2 ${className ?? ''}`}
    >
      {/* Left section */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="flex shrink-0 items-center gap-1.5 text-text-md leading-text-md font-semibold">
          <span className="text-element-tertiary">All</span>
          <span className="text-element-brand">{totalCount}</span>
        </span>

        <ToolbarDivider />

        <PerPageSelect
          value={currentPerPage}
          options={perPageOptions}
          onChange={handlePerPageChange}
        />

        {columns.length > 0 && (
          <>
            <ToolbarDivider />
            <ColumnSelect
              columns={columns}
              visibleColumns={currentVisible}
              onChange={handleVisibleChange}
            />
          </>
        )}
      </div>

      {/* Right section */}
      <div className="flex shrink-0 items-center gap-2">
        <BasicSearchInput
          value={currentSearch}
          onChange={handleSearchChange}
        />
        <DownloadIconButton onClick={onDownload} />
        <SplitButton
          label={actionLabel}
          onClick={onAction}
          onTrigger={onActionTrigger}
        />
      </div>
    </div>
  );
}
