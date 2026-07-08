import { useState } from 'react';
import { DatatableHeader } from '../DatatableHeader/DatatableHeader';
import type { DatatableHeaderColumn, SortDirection } from '../DatatableHeader/DatatableHeader';

// ── Types ────────────────────────────────────────────────────────────────────

export type DatatableTreeColumn = {
  key: string;
  header: string;
  sortable?: boolean;
};

export type DatatableTreeRow = {
  id: string;
  label: string;
  cells: Record<string, { content: string; subText?: string }>;
  children?: DatatableTreeRow[];
  badge?: string;
};

export type DatatableTreeProps = {
  columns: DatatableTreeColumn[];
  rows: DatatableTreeRow[];
  perPage?: number;
  showSearch?: boolean;
  showPagination?: boolean;
  primaryAction?: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
  searchPlaceholder?: string;
  className?: string;
};

// ── Icons ────────────────────────────────────────────────────────────────────

function IcSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IcChevronRight({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcBlankSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.25 18V16H4.75V18C4.75 18.69 5.31 19.25 6 19.25H8V20.75H6C4.48 20.75 3.25 19.52 3.25 18ZM14 19.25V20.75H10V19.25H14ZM19.25 18V16H20.75V18C20.75 19.52 19.52 20.75 18 20.75H16V19.25H18C18.69 19.25 19.25 18.69 19.25 18ZM4.75 10V14H3.25V10H4.75ZM20.75 10V14H19.25V10H20.75ZM3.25 6C3.25 4.48 4.48 3.25 6 3.25H8V4.75H6C5.31 4.75 4.75 5.31 4.75 6V8H3.25V6ZM19.25 6C19.25 5.31 18.69 4.75 18 4.75H16V3.25H18C19.52 3.25 20.75 4.48 20.75 6V8H19.25V6ZM14 3.25V4.75H10V3.25H14Z" fill="currentColor" />
    </svg>
  );
}

function IcChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcDoubleLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M11 15L6 10L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 15L10 10L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcDoubleRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15L10 10L5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 15L14 10L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcChevronRightNav() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const [inputValue, setInputValue] = useState(String(currentPage));

  const maxVisible = 5;
  let start = currentPage - Math.floor(maxVisible / 2);
  let end = start + maxVisible - 1;
  if (start < 1) { start = 1; end = Math.min(maxVisible, totalPages); }
  if (end > totalPages) { end = totalPages; start = Math.max(1, totalPages - maxVisible + 1); }
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const navBtn = 'flex size-9 items-center justify-center text-element-primary disabled:text-element-disabled hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed rounded-circle focus-visible:outline-none focus-visible:shadow-focus-button-ring';

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-3">
      <div className="flex items-start">
        <button type="button" aria-label="First page" disabled={currentPage === 1} onClick={() => onPageChange(1)} className={navBtn}><IcDoubleLeft /></button>
        <button type="button" aria-label="Previous page" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className={navBtn}><IcChevronLeft /></button>
        <div className="flex items-center">
          {pages.map((p) => (
            <button key={p} type="button" aria-current={p === currentPage ? 'page' : undefined} onClick={() => onPageChange(p)}
              className={`relative flex size-9 flex-col items-center justify-center text-text-sm leading-text-sm hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed focus-visible:outline-none focus-visible:shadow-focus-button-ring ${p === currentPage ? 'font-semibold text-element-brand' : 'font-regular text-element-quaternary'}`}>
              {p}
              {p === currentPage && <span className="absolute bottom-0 left-3 right-3 h-[3px] rounded-1 bg-element-brand" />}
            </button>
          ))}
        </div>
        <button type="button" aria-label="Next page" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} className={navBtn}><IcChevronRightNav /></button>
        <button type="button" aria-label="Last page" disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)} className={navBtn}><IcDoubleRight /></button>
      </div>
      <div className="flex items-center gap-2">
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { const p = parseInt(inputValue, 10); if (p >= 1 && p <= totalPages) onPageChange(p); } }}
          aria-label="Go to page"
          className="h-[30px] w-[34px] rounded-4 border border-border-normal bg-surface-container px-2.5 py-2 text-center text-text-xs leading-text-xs font-regular text-element-quaternary outline-none focus:shadow-[0_0_0_2px_var(--color-primary)]" />
        <span className="text-text-sm leading-text-sm font-regular text-element-quaternary">of {totalPages} page</span>
      </div>
    </nav>
  );
}

// ── Tree Row ─────────────────────────────────────────────────────────────────

const tierIndent: Record<number, string> = {
  1: 'pl-3',
  2: 'pl-7',
  3: 'pl-[42px]',
  4: 'pl-14',
};

function TreeRow({
  row,
  columns,
  tier,
  expandedIds,
  onToggle,
}: {
  row: DatatableTreeRow;
  columns: DatatableTreeColumn[];
  tier: number;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  const isOpen = expandedIds.has(row.id);
  const hasChildren = row.children && row.children.length > 0;
  const indent = tierIndent[Math.min(tier, 4)] ?? 'pl-14';

  return (
    <>
      <div className="flex items-center border-b border-border-solid-variant last:border-b-0 hover:bg-interaction-neutral-hover">
        {/* Tree cell (first column) */}
        <div className={`flex min-h-9 min-w-0 flex-1 items-center py-3 ${indent}`}>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {hasChildren ? (
              <button type="button" onClick={() => onToggle(row.id)} aria-expanded={isOpen} aria-label={isOpen ? `Collapse ${row.label}` : `Expand ${row.label}`}
                className="flex shrink-0 items-center justify-center rounded-circle text-element-secondary hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed focus-visible:outline-none focus-visible:shadow-focus-button-ring">
                <IcChevronRight className={`transition-transform duration-150 ${isOpen ? 'rotate-90' : ''}`} />
              </button>
            ) : (
              <span className="size-5 shrink-0" />
            )}
            <span className="truncate text-text-md leading-text-md font-regular text-element-secondary">{row.label}</span>
            {row.badge && (
              <span className="inline-flex shrink-0 items-center rounded-circle border border-border-normal px-2 py-1 text-text-xs leading-text-xs font-regular text-element-tertiary">{row.badge}</span>
            )}
          </div>
          <div className="w-2 shrink-0" />
        </div>

        {/* Data cells */}
        {columns.slice(1).map((col) => {
          const cell = row.cells[col.key];
          return (
            <div key={col.key} className="flex min-h-9 min-w-0 flex-1 items-center py-3">
              <div className="w-2 shrink-0" />
              {cell ? (
                <div className="flex min-w-0 flex-1 items-center gap-1.5">
                  <span className="flex shrink-0 items-center justify-center text-element-secondary"><IcBlankSmall /></span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-text-md leading-text-md font-regular text-element-secondary">{cell.content}</span>
                    {cell.subText && <span className="text-text-sm leading-text-sm-compact font-regular text-element-quaternary">{cell.subText}</span>}
                  </div>
                </div>
              ) : <div className="flex-1" />}
              <div className="w-2 shrink-0" />
            </div>
          );
        })}
      </div>

      {isOpen && row.children?.map((child) => (
        <TreeRow key={child.id} row={child} columns={columns} tier={tier + 1} expandedIds={expandedIds} onToggle={onToggle} />
      ))}
    </>
  );
}

// ── DatatableTree ────────────────────────────────────────────────────────────

export function DatatableTree({
  columns,
  rows,
  perPage = 10,
  showSearch = true,
  showPagination = true,
  primaryAction,
  secondaryAction,
  searchPlaceholder = 'Placeholder name',
  className,
}: DatatableTreeProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection | null>(null);

  function handleToggle(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleSortChange(key: string, direction: SortDirection) {
    setSortKey(key);
    setSortDir(direction);
    setCurrentPage(1);
  }

  const headerColumns: DatatableHeaderColumn[] = columns.map((col) => ({
    key: col.key,
    label: col.header,
    icon: col.sortable !== false ? 'sort' : 'none',
  }));

  const totalPages = Math.max(1, Math.ceil(rows.length / perPage));
  const pageRows = rows.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className={`flex flex-col gap-5 text-left ${className ?? ''}`}>
      <div className="overflow-hidden rounded-4 border border-border-solid-variant bg-surface-container">
        {/* Toolbar */}
        {(showSearch || primaryAction || secondaryAction) && (
          <div className="flex items-center gap-3 px-4 py-3">
            {showSearch && (
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-element-quaternary"><IcSearch /></span>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="h-9 w-full rounded-4 border border-border-normal bg-surface-container pl-9 pr-3 text-text-sm leading-text-sm font-regular text-element-primary placeholder:text-element-quaternary outline-none focus:shadow-[0_0_0_2px_var(--color-primary)]" />
              </div>
            )}
            <div className="flex shrink-0 items-center gap-2">
              {secondaryAction && (
                <button type="button" onClick={secondaryAction.onClick}
                  className="inline-flex h-9 items-center justify-center rounded-4 border border-border-normal px-4 text-text-sm leading-text-sm font-semibold text-element-primary hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed focus-visible:outline-none focus-visible:shadow-focus-button-ring">
                  {secondaryAction.label}
                </button>
              )}
              {primaryAction && (
                <button type="button" onClick={primaryAction.onClick}
                  className="inline-flex h-9 items-center justify-center rounded-4 bg-primary px-4 text-text-sm leading-text-sm font-semibold text-element-inverse hover:opacity-90 active:opacity-80 focus-visible:outline-none focus-visible:shadow-focus-button-ring">
                  {primaryAction.label}
                </button>
              )}
            </div>
          </div>
        )}

        <DatatableHeader
          columns={headerColumns}
          onSortChange={handleSortChange}
        />

        <div>
          {pageRows.map((row) => (
            <TreeRow key={row.id} row={row} columns={columns} tier={1} expandedIds={expandedIds} onToggle={handleToggle} />
          ))}
        </div>
      </div>

      {showPagination && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => setCurrentPage(Math.max(1, Math.min(p, totalPages)))} />
      )}
    </div>
  );
}

export default DatatableTree;
