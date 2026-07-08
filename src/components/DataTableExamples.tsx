import React, {type ReactNode} from 'react';

type RowState = 'enabled' | 'hover' | 'pressed' | 'selected' | 'disabled';

type TableDemoProps = {
  selectable?: boolean;
  status?: boolean;
  pagination?: boolean;
  actions?: boolean;
  fixedAction?: boolean;
  empty?: boolean;
  rows?: number;
  className?: string;
};

function CheckCell({checked = false, disabled = false}: {checked?: boolean; disabled?: boolean}): React.ReactElement {
  return <span className={`data-table-doc-check${checked ? ' data-table-doc-check--checked' : ''}${disabled ? ' data-table-doc-check--disabled' : ''}`} aria-hidden="true" />;
}

function StatusBadge({tone = 'success', children}: {tone?: 'success' | 'warning' | 'danger' | 'neutral'; children: ReactNode}): React.ReactElement {
  return <span className={`data-table-doc-badge data-table-doc-badge--${tone}`}>{children}</span>;
}

function IconButton(): React.ReactElement {
  return (
    <span className="data-table-doc-icon-btn" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M4 8H12M8 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function TableToolbarDemo({actions = false, search = false, compact = false}: {actions?: boolean; search?: boolean; compact?: boolean}): React.ReactElement {
  return (
    <div className={`data-table-toolbar-doc${compact ? ' data-table-toolbar-doc--compact' : ''}`}>
      <div className="data-table-toolbar-doc__meta">
        <strong>All <span>NN</span></strong>
        <button type="button">10 per page</button>
        <button type="button">Column <span>5</span></button>
      </div>
      {(search || actions) && (
        <div className="data-table-toolbar-doc__actions">
          {search && <input aria-label="Search table" placeholder="Placeholder name" readOnly />}
          {actions && (
            <>
              <button type="button" className="data-table-toolbar-doc__icon"><IconButton /></button>
              <button type="button" className="data-table-toolbar-doc__button">sub</button>
              <button type="button" className="data-table-toolbar-doc__button data-table-toolbar-doc__button--primary">main</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function TableDemo({
  selectable = false,
  status = false,
  pagination = false,
  actions = false,
  fixedAction = false,
  empty = false,
  rows = 4,
  className,
}: TableDemoProps): React.ReactElement {
  const rowLabels = ['Seoul flagship store', 'SOLDAM market, Yongin', 'Sensor group', 'Device 01', 'Device 02'];

  return (
    <div className={`data-table-doc${fixedAction ? ' data-table-doc--fixed-action' : ''}${className ? ` ${className}` : ''}`}>
      <TableToolbarDemo compact />
      <table>
        <thead>
          <tr>
            {selectable && <th><CheckCell /></th>}
            <th>Header</th>
            <th>Header</th>
            <th>Header</th>
            {actions && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {empty ? (
            <tr className="data-table-doc__empty-row">
              <td colSpan={selectable ? 5 : 4}>No data available</td>
            </tr>
          ) : Array.from({length: rows}).map((_, index) => (
            <tr key={rowLabels[index] ?? index} className={index === 1 ? 'data-table-doc__row--selected' : ''}>
              {selectable && <td><CheckCell checked={index === 1} disabled={index === rows - 1} /></td>}
              <td>{rowLabels[index] ?? `Content ${index + 1}`}</td>
              <td>{status ? <StatusBadge tone={index === 2 ? 'warning' : 'success'}>{index === 2 ? 'Pending' : 'Success'}</StatusBadge> : 'Content'}</td>
              <td>{index % 2 === 0 ? 'Content' : 'Data'}</td>
              {actions && <td><IconButton /></td>}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="data-table-doc__pagination">
          <span>01</span>
          <strong>1</strong>
          <span>of 115 page</span>
        </div>
      )}
    </div>
  );
}

function TreeToggle({expanded = false}: {expanded?: boolean}): React.ReactElement {
  return (
    <span className={`data-table-tree-doc__toggle${expanded ? ' data-table-tree-doc__toggle--expanded' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function TreeRow({level, label, expanded = false, selected = false, badge}: {level: number; label: string; expanded?: boolean; selected?: boolean; badge?: string}): React.ReactElement {
  return (
    <tr className={selected ? 'data-table-doc__row--selected' : undefined}>
      <td>
        <span className={`data-table-tree-doc__label data-table-tree-doc__label--level-${level}`}>
          <TreeToggle expanded={expanded} />
          <strong>{label}</strong>
          {badge && <StatusBadge tone="neutral">{badge}</StatusBadge>}
        </span>
      </td>
      <td>Content</td>
      <td>Content</td>
    </tr>
  );
}

export function TableTreeDemo({badge = false, selected = false, levels = 3}: {badge?: boolean; selected?: boolean; levels?: number}): React.ReactElement {
  return (
    <div className="data-table-doc data-table-tree-doc">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Devices</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <TreeRow level={1} label="Seoul flagship store" expanded badge={badge ? '24' : undefined} selected={selected} />
          {levels >= 2 && <TreeRow level={2} label="ESL group" expanded badge={badge ? '8' : undefined} />}
          {levels >= 3 && <TreeRow level={3} label="Sensor group" badge={badge ? '16' : undefined} />}
          {levels >= 4 && <TreeRow level={4} label="Device group" />}
        </tbody>
      </table>
    </div>
  );
}

export function BasicTableExample(): React.ReactElement {
  return <TableDemo />;
}

export function SelectableTableExample(): React.ReactElement {
  return <TableDemo selectable />;
}

export function TableWithStatusExample(): React.ReactElement {
  return <TableDemo status />;
}

export function TableWithPaginationExample(): React.ReactElement {
  return <TableDemo pagination rows={3} />;
}

export function TableWithFixedActionColumnExample(): React.ReactElement {
  return <TableDemo actions fixedAction rows={3} />;
}

export function BasicTableTreeExample(): React.ReactElement {
  return <TableTreeDemo />;
}

export function TableTreeWithBadgeExample(): React.ReactElement {
  return <TableTreeDemo badge />;
}

export function TableTreeWithSelectedRowExample(): React.ReactElement {
  return <TableTreeDemo selected />;
}

export function ExpandedTableTreeExample(): React.ReactElement {
  return <TableTreeDemo levels={4} />;
}

export function MultiLevelHierarchyExample(): React.ReactElement {
  return <TableTreeDemo badge levels={4} />;
}

export function MetadataToolbarExample(): React.ReactElement {
  return <TableToolbarDemo />;
}

export function ToolbarWithSearchExample(): React.ReactElement {
  return <TableToolbarDemo search />;
}

export function ToolbarWithActionsExample(): React.ReactElement {
  return <TableToolbarDemo actions search />;
}

export function ToolbarWithColumnVisibilityExample(): React.ReactElement {
  return (
    <div className="data-table-toolbar-example-stack">
      <TableToolbarDemo />
      <div className="data-table-doc-menu">
        {['Header', 'Header', 'Header', 'Header'].map((item, index) => (
          <label key={`${item}-${index}`}><CheckCell checked /> {item}</label>
        ))}
      </div>
    </div>
  );
}

export function ToolbarWithTableExample(): React.ReactElement {
  return <TableDemo actions pagination rows={3} />;
}

export const dataTableSourceMap = {
  basicTable: `<DataTable columns={columns} rows={rows} />`,
  selectableTable: `<DataTable columns={columns} rows={rows} selectable />`,
  tableWithStatus: `<DataTable columns={columns} rows={rows} cellRenderer={{ status: StatusBadge }} />`,
  tableWithPagination: `<DataTable columns={columns} rows={rows} pagination pageSize={10} />`,
  tableWithFixedAction: `<DataTable columns={columns} rows={rows} fixedActionColumn actions={rowActions} />`,
  basicTableTree: `<DataTableTree columns={columns} rows={treeRows} defaultExpandedKeys={['seoul']} />`,
  tableTreeWithBadge: `<DataTableTree columns={columns} rows={treeRows} showCounterBadge />`,
  tableTreeSelected: `<DataTableTree columns={columns} rows={treeRows} selectedKey="seoul" />`,
  expandedTableTree: `<DataTableTree columns={columns} rows={treeRows} expandedKeys={expandedKeys} />`,
  multiLevelHierarchy: `<DataTableTree columns={columns} rows={treeRows} maxDepth={4} />`,
  metadataToolbar: `<DataTableToolbar totalCount={245} pageSize={10} visibleColumns={5} />`,
  toolbarWithSearch: `<DataTableToolbar totalCount={245} pageSize={10} visibleColumns={5} searchPlaceholder="Placeholder name" />`,
  toolbarWithActions: `<DataTableToolbar totalCount={245} searchPlaceholder="Placeholder name" actions={toolbarActions} />`,
  toolbarWithColumnVisibility: `<DataTableToolbar totalCount={245} columnVisibilityOptions={columns} />`,
  toolbarWithTable: `<DataTableToolbar totalCount={245} actions={toolbarActions} />
<DataTable columns={columns} rows={rows} pagination />`,
};
