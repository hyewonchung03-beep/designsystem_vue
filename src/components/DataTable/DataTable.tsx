import { useState, useEffect } from 'react';
import DataToolbar from '../DataToolbar/DataToolbar';
import { DatatableHeader } from '../DatatableHeader/DatatableHeader';
import type { DatatableHeaderColumn, SortDirection } from '../DatatableHeader/DatatableHeader';
import { DatatableSelectCell } from '../DatatableSelectCell/DatatableSelectCell';

// ── Types ────────────────────────────────────────────────────────────────────

export type { SortDirection };

export type DataTableColumn<T = Record<string, unknown>> = {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
};

export type DataTableProps<T = Record<string, unknown>> = {
  columns: DataTableColumn<T>[];
  data: T[];
  perPage?: number;
  showToolbar?: boolean;
  showPagination?: boolean;
  selectable?: boolean;
  className?: string;
};

// ── Pagination icons ─────────────────────────────────────────────────────────

function IcChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcChevronDoubleLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M11 15L6 10L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 15L10 10L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcChevronDoubleRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15L10 10L5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 15L14 10L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Pagination ───────────────────────────────────────────────────────────────

function getVisiblePages(current: number, total: number): number[] {
  const maxVisible = 5;
  if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);

  let start = current - Math.floor(maxVisible / 2);
  let end = start + maxVisible - 1;

  if (start < 1) { start = 1; end = maxVisible; }
  if (end > total) { end = total; start = total - maxVisible + 1; }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

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
  const pages = getVisiblePages(currentPage, totalPages);

  function handleInputSubmit(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      const page = parseInt(inputValue, 10);
      if (page >= 1 && page <= totalPages) onPageChange(page);
    }
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-3">
      <div className="flex items-start">
        <button
          type="button"
          aria-label="First page"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          className="flex size-9 items-center justify-center rounded-circle text-element-primary disabled:text-element-disabled
            hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
            focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        >
          <IcChevronDoubleLeft />
        </button>
        <button
          type="button"
          aria-label="Previous page"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex size-9 items-center justify-center rounded-circle text-element-primary disabled:text-element-disabled
            hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
            focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        >
          <IcChevronLeft />
        </button>

        <div className="flex items-center">
          {pages.map((p) => (
            <button
              key={p}
              type="button"
              aria-current={p === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(p)}
              className={`relative flex size-9 flex-col items-center justify-center text-text-sm leading-text-sm
                hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
                focus-visible:outline-none focus-visible:shadow-focus-button-ring ${
                  p === currentPage
                    ? 'font-semibold text-element-brand'
                    : 'font-regular text-element-quaternary'
                }`}
            >
              {p}
              {p === currentPage && (
                <span className="absolute bottom-0 left-3 right-3 h-[3px] rounded-1 bg-element-brand" />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="Next page"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex size-9 items-center justify-center rounded-circle text-element-primary disabled:text-element-disabled
            hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
            focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        >
          <IcChevronRight />
        </button>
        <button
          type="button"
          aria-label="Last page"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          className="flex size-9 items-center justify-center rounded-circle text-element-primary disabled:text-element-disabled
            hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
            focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        >
          <IcChevronDoubleRight />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputSubmit}
          aria-label="Go to page"
          className="h-[30px] w-[34px] rounded-4 border border-border-normal bg-surface-container px-2.5 py-2 text-center text-text-xs leading-text-xs font-regular text-element-quaternary outline-none
            focus:shadow-[0_0_0_2px_var(--color-primary)]"
        />
        <span className="text-text-sm leading-text-sm font-regular text-element-quaternary">
          of {totalPages} page
        </span>
      </div>
    </nav>
  );
}

// ── DataTable ────────────────────────────────────────────────────────────────

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  perPage: initialPerPage = 10,
  showToolbar = true,
  showPagination = true,
  selectable = false,
  className,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [visibleColumnHeaders, setVisibleColumnHeaders] = useState<string[]>(
    () => columns.map((c) => c.header),
  );

  useEffect(() => {
    setPerPage(initialPerPage);
    setCurrentPage(1);
  }, [initialPerPage]);

  const visibleCols = columns.filter((c) => visibleColumnHeaders.includes(c.header));

  const headerColumns: DatatableHeaderColumn[] = visibleCols.map((col) => ({
    key: col.key,
    label: col.header,
    icon: col.sortable !== false ? 'sort' : 'none',
  }));

  function handleSortChange(key: string, direction: SortDirection) {
    setSortKey(key);
    setSortDir(direction);
    setCurrentPage(1);
  }

  function handlePerPageChange(value: number) {
    setPerPage(value);
    setCurrentPage(1);
  }

  const sorted = sortKey && sortDir
    ? [...data].sort((a, b) => {
        const av = String(a[sortKey] ?? '');
        const bv = String(b[sortKey] ?? '');
        const cmp = av.localeCompare(bv);
        return sortDir === 'desc' ? -cmp : cmp;
      })
    : data;

  const totalPages = Math.max(1, Math.ceil(data.length / perPage));
  const pageData = sorted.slice((currentPage - 1) * perPage, currentPage * perPage);

  const allPageSelected =
    selectable &&
    pageData.length > 0 &&
    pageData.every((_, i) => selectedRows.has((currentPage - 1) * perPage + i));
  const somePageSelected =
    selectable &&
    !allPageSelected &&
    pageData.some((_, i) => selectedRows.has((currentPage - 1) * perPage + i));

  function handleSelectAll(checked: boolean) {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      pageData.forEach((_, i) => {
        const idx = (currentPage - 1) * perPage + i;
        if (checked) next.add(idx);
        else next.delete(idx);
      });
      return next;
    });
  }

  function handleSelectRow(absoluteIdx: number, checked: boolean) {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (checked) next.add(absoluteIdx);
      else next.delete(absoluteIdx);
      return next;
    });
  }

  return (
    <div className={`flex flex-col gap-5 overflow-hidden text-left ${className ?? ''}`}>
      <div className="overflow-hidden rounded-4 border border-border-solid-variant bg-surface-container">
        {showToolbar && (
          <DataToolbar
            totalCount={data.length}
            perPage={perPage}
            perPageOptions={[10, 20, 50, 100]}
            onPerPageChange={handlePerPageChange}
            columns={columns.map((c) => c.header)}
            visibleColumns={visibleColumnHeaders}
            onVisibleColumnsChange={(cols) => { setVisibleColumnHeaders(cols); setCurrentPage(1); }}
          />
        )}

        <DatatableHeader
          columns={headerColumns}
          showSelect={selectable}
          selectChecked={allPageSelected}
          selectIndeterminate={somePageSelected}
          onSelectChange={handleSelectAll}
          onSortChange={handleSortChange}
        />

        <div>
          {pageData.map((row, rowIdx) => {
            const absoluteIdx = (currentPage - 1) * perPage + rowIdx;
            const isSelected = selectable && selectedRows.has(absoluteIdx);
            return (
              <div
                key={rowIdx}
                className={`flex items-center border-b border-border-solid-variant last:border-b-0
                  hover:bg-interaction-neutral-hover
                  ${isSelected ? 'bg-selected-container-variant' : ''}`}
              >
                {selectable && (
                  <DatatableSelectCell
                    size="lg"
                    checked={isSelected}
                    onChange={(checked) => handleSelectRow(absoluteIdx, checked)}
                    aria-label={`Select row ${absoluteIdx + 1}`}
                  />
                )}
                <div className="flex min-w-0 flex-1">
                  {visibleCols.map((col) => (
                    <div key={col.key} className="flex min-h-9 min-w-0 flex-1 items-center py-3">
                      <div className="w-2 shrink-0" />
                      <span className="min-w-0 flex-1 truncate text-text-md leading-text-md font-regular text-element-secondary">
                        {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                      </span>
                      <div className="w-2 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showPagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))}
        />
      )}
    </div>
  );
}
