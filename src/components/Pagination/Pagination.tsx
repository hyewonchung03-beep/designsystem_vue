import { useRef, useState } from 'react';
import { SelectTrigger } from '../SelectTrigger/SelectTrigger';

// ── Nav Icons (inline SVG from iconography) ───────────────────────────────────

function IcChevronLeftDouble({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11.5302 7.53027L7.06049 12L11.5302 16.4697L10.4697 17.5303L5.46967 12.5303C5.17678 12.2374 5.17678 11.7626 5.46967 11.4697L10.4697 6.46973L11.5302 7.53027ZM18.5302 7.53027L14.0605 12L18.5302 16.4697L17.4697 17.5303L12.4697 12.5303C12.1768 12.2374 12.1768 11.7626 12.4697 11.4697L17.4697 6.46973L18.5302 7.53027Z" fill="currentColor" />
    </svg>
  );
}

function IcChevronLeft({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15.5302 6.53027L10.0605 12L15.5302 17.4697L14.4697 18.5303L8.46967 12.5303C8.17678 12.2374 8.17678 11.7626 8.46967 11.4697L14.4697 5.46973L15.5302 6.53027Z" fill="currentColor" />
    </svg>
  );
}

function IcChevronRight({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15.5303 11.4697C15.8232 11.7626 15.8232 12.2374 15.5303 12.5303L9.53027 18.5303L8.46973 17.4697L13.9395 12L8.46973 6.53027L9.53027 5.46973L15.5303 11.4697Z" fill="currentColor" />
    </svg>
  );
}

function IcChevronRightDouble({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11.5303 11.4697L11.582 11.5264C11.8063 11.8013 11.8063 12.1987 11.582 12.4736L11.5303 12.5303L6.53027 17.5303L5.46973 16.4697L9.93945 12L5.46973 7.53027L6.53027 6.46973L11.5303 11.4697ZM18.5303 11.4697L18.582 11.5264C18.8063 11.8013 18.8063 12.1987 18.582 12.4736L18.5303 12.5303L13.5303 17.5303L12.4697 16.4697L16.9395 12L12.4697 7.53027L13.5303 6.46973L18.5303 11.4697Z" fill="currentColor" />
    </svg>
  );
}

// ── Page range algorithm ──────────────────────────────────────────────────────
// Rules:
// 1. 첫 페이지와 마지막 페이지는 항상 표시
// 2. 현재 페이지 기준 ±2 페이지 표시
// 3. 생략 페이지 2개 이상 → ellipsis
// 4. 생략 페이지 1개 → 해당 페이지 번호 직접 표시
// 5. 전체가 표시 범위 이내 → ellipsis 없이 모두 표시

type PageEntry = number | 'ellipsis';

function getPageEntries(current: number, total: number): PageEntry[] {
  const wStart = Math.max(1, current - 2);
  const wEnd   = Math.min(total, current + 2);

  const entries: PageEntry[] = [];

  // Left side: first page + gap
  if (wStart > 1) {
    entries.push(1);
    const leftGap = wStart - 2; // hidden page count between 1 and wStart
    if (leftGap >= 2)       entries.push('ellipsis'); // rule 3
    else if (leftGap === 1) entries.push(2);           // rule 4
    // leftGap === 0: wStart===2, no gap
  }

  // Window pages (current ±2)
  for (let i = wStart; i <= wEnd; i++) entries.push(i);

  // Right side: gap + last page
  if (wEnd < total) {
    const rightGap = total - 1 - wEnd; // hidden page count between wEnd and total
    if (rightGap >= 2)       entries.push('ellipsis'); // rule 3
    else if (rightGap === 1) entries.push(wEnd + 1);   // rule 4
    // rightGap === 0: wEnd===total-1, no gap
    entries.push(total);
  }

  return entries;
}

// ── NavButton (ic_trigger 패턴: 36×36 container + 20×20 icon + -4px inset overlay)

type NavIcon = 'first' | 'prev' | 'next' | 'last';

function NavButton({
  icon,
  disabled,
  onClick,
}: {
  icon: NavIcon;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-center size-9 shrink-0">
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={[
          'group relative flex items-center justify-center size-5 rounded-full',
          'focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        {/* ic_trigger interaction overlay: -4px inset = 28×28 circle */}
        <span
          className={[
            'absolute rounded-full transition-colors duration-150',
            disabled
              ? 'bg-interaction-neutral-normal'
              : 'bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed',
          ].join(' ')}
          style={{ inset: -4 }}
        />
        <span className={`relative ${disabled ? 'text-element-disabled' : 'text-element-primary'}`}>
          {icon === 'first'  && <IcChevronLeftDouble size={20} />}
          {icon === 'prev'   && <IcChevronLeft size={20} />}
          {icon === 'next'   && <IcChevronRight size={20} />}
          {icon === 'last'   && <IcChevronRightDouble size={20} />}
        </span>
      </button>
    </div>
  );
}

// ── PageItem ──────────────────────────────────────────────────────────────────

function PageItem({
  page,
  selected,
  onClick,
}: {
  page: number;
  selected: boolean;
  onClick: (p: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(page)}
      className={[
        'relative flex items-center justify-center size-9 rounded-4',
        'text-text-sm leading-text-sm',
        'focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]',
        selected
          ? 'font-semibold text-element-brand cursor-default'
          : 'font-regular text-element-quaternary cursor-pointer hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed',
      ].join(' ')}
    >
      {page}
      {selected && (
        <span
          className="absolute bottom-0 h-[3px] bg-element-brand"
          style={{ left: 12, right: 12 }}
        />
      )}
    </button>
  );
}

// ── EllipsisItem (non-interactive per Figma spec) ─────────────────────────────

function EllipsisItem() {
  return (
    <div className="flex items-center justify-center size-9 text-text-sm leading-text-sm font-regular text-element-quaternary select-none">
      ...
    </div>
  );
}

// ── PaginationNav ─────────────────────────────────────────────────────────────

export type PaginationNavProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
};

export function PaginationNav({
  currentPage,
  totalPages,
  onChange,
  className = '',
}: PaginationNavProps) {
  const entries = getPageEntries(currentPage, totalPages);

  function go(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onChange(page);
  }

  return (
    <div className={`flex items-center ${className}`}>
      <NavButton icon="first" disabled={currentPage <= 1}         onClick={() => go(1)} />
      <NavButton icon="prev"  disabled={currentPage <= 1}         onClick={() => go(currentPage - 1)} />

      {entries.map((entry, i) =>
        entry === 'ellipsis' ? (
          <EllipsisItem key={`e-${i}`} />
        ) : (
          <PageItem
            key={entry}
            page={entry}
            selected={entry === currentPage}
            onClick={go}
          />
        )
      )}

      <NavButton icon="next" disabled={currentPage >= totalPages} onClick={() => go(currentPage + 1)} />
      <NavButton icon="last" disabled={currentPage >= totalPages} onClick={() => go(totalPages)} />
    </div>
  );
}

// ── PaginationSearch ──────────────────────────────────────────────────────────

export type PaginationSearchProps = {
  totalPages: number;
  onJump: (page: number) => void;
};

export function PaginationSearch({ totalPages, onJump }: PaginationSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    const val = Number(inputRef.current?.value);
    if (!Number.isInteger(val) || val < 1 || val > totalPages) return;
    onJump(val);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="flex items-center gap-sol-8 shrink-0">
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        onKeyDown={handleKeyDown}
        className={[
          'w-[34px] h-[30px] rounded-4 border border-border-normal',
          'bg-surface-container text-text-xs leading-text-xs font-regular text-element-primary',
          'text-center px-sol-4',
          'focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]',
          'hover:bg-interaction-neutral-hover',
        ].join(' ')}
        aria-label="Go to page"
      />
      <span className="text-text-sm leading-text-sm font-regular text-element-quaternary whitespace-nowrap shrink-0">
        of {totalPages} page
      </span>
    </div>
  );
}

// ── Pagination (composite) ────────────────────────────────────────────────────

const DEFAULT_PER_PAGE_OPTIONS = [10, 20, 50, 100];

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange?: (page: number) => void;
  showItemsPerPage?: boolean;
  itemsPerPage?: number;
  itemsPerPageOptions?: number[];
  onItemsPerPageChange?: (n: number) => void;
  showSearch?: boolean;
  className?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  onChange,
  showItemsPerPage = false,
  itemsPerPage = 10,
  itemsPerPageOptions = DEFAULT_PER_PAGE_OPTIONS,
  onItemsPerPageChange,
  showSearch = true,
  className = '',
}: PaginationProps) {
  function handleChange(page: number) {
    onChange?.(page);
  }

  const perPageSelectOptions = itemsPerPageOptions.map((n) => ({
    value: String(n),
    label: String(n),
  }));

  return (
    <div className={`flex items-center gap-sol-12 ${className}`}>
      {showItemsPerPage && (
        <div className="flex items-center gap-sol-8 shrink-0">
          <SelectTrigger
            className="w-[61px]"
            options={perPageSelectOptions}
            value={String(itemsPerPage)}
            size="sm"
            onChange={(v) => onItemsPerPageChange?.(Number(v))}
          />
          <span className="text-text-sm leading-text-sm font-regular text-element-quaternary whitespace-nowrap shrink-0">
            Items per page
          </span>
        </div>
      )}

      <PaginationNav
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={handleChange}
      />

      {showSearch && (
        <PaginationSearch totalPages={totalPages} onJump={handleChange} />
      )}
    </div>
  );
}
