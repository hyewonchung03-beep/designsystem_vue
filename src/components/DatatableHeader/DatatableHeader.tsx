import { useState } from 'react';
import { IcBlank } from '../Icon/IcBlank';
import { DatatableSelectCell } from '../DatatableSelectCell/DatatableSelectCell';

// ── Types ────────────────────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc';

export type DatatableHeaderColumn = {
  key: string;
  label: string;
  icon?: 'blank' | 'sort' | 'help' | 'none';
  sortable?: boolean;
};

export type DatatableHeaderProps = {
  columns: DatatableHeaderColumn[];
  showSelect?: boolean;
  selectChecked?: boolean;
  selectIndeterminate?: boolean;
  onSelectChange?: (checked: boolean) => void;
  onSortChange?: (key: string, direction: SortDirection) => void;
  className?: string;
};

// ── Icons ────────────────────────────────────────────────────────────────────

function IcSortDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5.37695 5.25H6.87695V16.2793L10.1172 13.2715L11.1377 14.3711L6.6377 18.5498C6.34599 18.8206 5.89304 18.8163 5.60645 18.54L1.26074 14.3516L2.30176 13.2715L5.37695 16.2354V5.25ZM18.1807 15.5068V17.0068H13.0127V15.5068H18.1807ZM20.626 10.6924V12.1924H13.0127V10.6924H20.626ZM23.0713 5.87695V7.37695H13.0127V5.87695H23.0713Z" fill="currentColor" />
    </svg>
  );
}

function IcSortUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17.8594 16.0651V17.5651H12.6915V16.0651H17.8594ZM20.3047 11.2497V12.7497H12.6915V11.2497H20.3047ZM22.7501 6.4352V7.9352H12.6915V6.4352H22.7501Z" fill="currentColor" />
      <path d="M6.70093 18.75H5.20093L5.20093 7.72068L1.96069 10.7285L0.940186 9.62888L5.44019 5.45017C5.73189 5.17934 6.18484 5.18372 6.47144 5.45994L10.8171 9.64842L9.77612 10.7285L6.70093 7.76463L6.70093 18.75Z" fill="currentColor" />
    </svg>
  );
}

function IcInfo() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19.75 12C19.75 7.71979 16.2802 4.25 12 4.25C7.71979 4.25 4.25 7.71979 4.25 12C4.25 16.2802 7.71979 19.75 12 19.75C16.2802 19.75 19.75 16.2802 19.75 12ZM11.25 11.25H12.75V16.1504H11.25V11.25ZM12.7588 7.84961V9.34961H11.25V7.84961H12.7588ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" fill="currentColor" />
    </svg>
  );
}

// ── DatatableHeader ──────────────────────────────────────────────────────────

export function DatatableHeader({
  columns,
  showSelect = false,
  selectChecked = false,
  selectIndeterminate = false,
  onSelectChange,
  onSortChange,
  className,
}: DatatableHeaderProps) {
  const [sortStates, setSortStates] = useState<Record<string, SortDirection>>({});

  function handleSortClick(key: string) {
    setSortStates((prev) => {
      const cur = prev[key] ?? 'desc';
      const next: SortDirection = cur === 'desc' ? 'asc' : 'desc';
      onSortChange?.(key, next);
      return { [key]: next };
    });
  }

  return (
    <div
      role="row"
      className={`flex items-center border-y border-border-solid-variant bg-surface-container-low ${className ?? ''}`}
    >
      {showSelect && (
        <DatatableSelectCell
          size="sm"
          checked={selectChecked}
          indeterminate={selectIndeterminate}
          onChange={onSelectChange}
          aria-label="Select all rows"
        />
      )}

      <div className="flex min-w-0 flex-1 items-start">
        {columns.map((col) => (
          <div
            key={col.key}
            className="flex min-h-9 min-w-0 flex-1 items-center gap-1.5 py-2"
          >
            <div className="w-2 shrink-0" />
            <div className="flex min-w-0 flex-1 items-center gap-1">
              <span className="shrink-0 whitespace-nowrap text-text-sm leading-text-sm font-semibold text-element-tertiary">
                {col.label}
              </span>
              {col.icon === 'blank' && (
                <span className="flex shrink-0 items-center justify-center text-element-secondary">
                  <IcBlank size={14} />
                </span>
              )}
              {col.icon === 'help' && (
                <span className="flex shrink-0 items-center justify-center text-element-secondary">
                  <IcInfo />
                </span>
              )}
              {(col.icon === 'sort' || col.sortable) && (
                <button
                  type="button"
                  onClick={() => handleSortClick(col.key)}
                  aria-label={`Sort by ${col.label}`}
                  className="flex shrink-0 items-center justify-center text-element-secondary hover:text-element-primary focus-visible:outline-none"
                >
                  {(sortStates[col.key] ?? 'desc') === 'desc' ? <IcSortDown /> : <IcSortUp />}
                </button>
              )}
            </div>
            <div className="w-2 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DatatableHeader;
