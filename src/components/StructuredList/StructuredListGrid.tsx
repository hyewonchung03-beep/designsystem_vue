import { Fragment, type CSSProperties } from 'react';
import { StructuredListBodyCell, type StructuredListBodyCellProps } from './StructuredListBodyCell';
import { StructuredListSelectCell } from './StructuredListSelectCell';

// ── Types ────────────────────────────────────────────────────────────────────

export type StructuredListGridType = 'column' | 'row';

export type StructuredListGridProps = {
  type?: StructuredListGridType;
  showDivider?: boolean;
  showSelectCell?: boolean;
  selectCellChecked?: boolean;
  condensed?: boolean;
  onSelectChange?: (checked: boolean) => void;
  cells: StructuredListBodyCellProps[];
  className?: string;
  style?: CSSProperties;
};

// ── StructuredListGrid ───────────────────────────────────────────────────────

export function StructuredListGrid({
  type = 'column',
  showDivider = true,
  showSelectCell = false,
  selectCellChecked = false,
  condensed = false,
  onSelectChange,
  cells,
  className = '',
  style,
}: StructuredListGridProps) {
  if (type === 'column') {
    return (
      <div className={`flex items-start overflow-hidden text-left ${className}`} style={style}>
        <div className="flex flex-1 flex-col min-w-0 self-stretch">
          {cells.map((cellProps, i) => (
            <Fragment key={i}>
              <StructuredListBodyCell {...cellProps} />
              {i < cells.length - 1 && (
                <div className="h-px w-full shrink-0 bg-border-solid-variant" />
              )}
            </Fragment>
          ))}
        </div>

        {showDivider && (
          <div className="w-px self-stretch shrink-0 bg-border-solid-variant" />
        )}
      </div>
    );
  }

  // ── Row type ───────────────────────────────────────────────────────────────
  return (
    <div className={`flex flex-col overflow-hidden w-full text-left ${className}`} style={style}>
      <div className="flex items-start w-full shrink-0">
        {showSelectCell && (
          <StructuredListSelectCell
            condensed={condensed}
            checked={selectCellChecked}
            onChange={onSelectChange}
          />
        )}
        <div className="flex flex-1 min-w-0 items-start">
          {cells.map((cellProps, i) => (
            <StructuredListBodyCell
              key={i}
              {...cellProps}
              className={`flex-1${cellProps.className ? ` ${cellProps.className}` : ''}`}
            />
          ))}
        </div>
      </div>

      {showDivider && (
        <div className="h-px w-full shrink-0 bg-border-solid-variant" />
      )}
    </div>
  );
}
