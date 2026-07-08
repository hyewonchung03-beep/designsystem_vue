import React from 'react';

type StructuredListDemoProps = {
  checkbox?: boolean;
  status?: boolean;
  action?: boolean;
  icon?: boolean;
  selected?: boolean;
  vertical?: boolean;
  overflow?: boolean;
  rows?: number;
};

function Check({checked = false}: {checked?: boolean}): React.ReactElement {
  return <span className={`structured-list-demo__check${checked ? ' structured-list-demo__check--checked' : ''}`} aria-hidden="true" />;
}

function Status({tone = 'success'}: {tone?: 'success' | 'warning'}): React.ReactElement {
  return <span className={`structured-list-demo__status structured-list-demo__status--${tone}`}>{tone === 'success' ? 'Active' : 'Pending'}</span>;
}

export function StructuredListDemo({
  checkbox = false,
  status = false,
  action = false,
  icon = false,
  selected = false,
  vertical = false,
  overflow = false,
  rows = 4,
}: StructuredListDemoProps): React.ReactElement {
  const names = ['Device 01', 'Device 02', 'Gateway', 'Sensor group'];
  const content = Array.from({length: rows}).map((_, index) => (
    <tr key={names[index] ?? index} className={selected && index === 1 ? 'structured-list-demo__row--selected' : undefined}>
      {checkbox && <td><Check checked={selected && index === 1} /></td>}
      <td>{icon && <span className="structured-list-demo__icon" aria-hidden="true" />}<strong>{names[index] ?? `Item ${index + 1}`}</strong></td>
      <td>{vertical ? <><span>Region</span><b>Seoul</b></> : 'Seoul'}</td>
      <td>{status ? <Status tone={index === 2 ? 'warning' : 'success'} /> : 'Online'}</td>
      {action && <td><button type="button">Edit</button></td>}
      {overflow && <><td>2026-06-10</td><td>Owner</td><td>Group A</td></>}
    </tr>
  ));

  return (
    <div className={`structured-list-demo${vertical ? ' structured-list-demo--vertical' : ''}${overflow ? ' structured-list-demo--overflow' : ''}`}>
      <table>
        <thead>
          <tr>
            {checkbox && <th><Check /></th>}
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            {action && <th>Action</th>}
            {overflow && <><th>Date</th><th>Owner</th><th>Group</th></>}
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}

export function BasicStructuredListExample(): React.ReactElement {
  return <StructuredListDemo />;
}

export function StructuredListWithCheckboxExample(): React.ReactElement {
  return <StructuredListDemo checkbox selected />;
}

export function StructuredListWithStatusExample(): React.ReactElement {
  return <StructuredListDemo status />;
}

export function StructuredListWithActionExample(): React.ReactElement {
  return <StructuredListDemo action />;
}

export function HorizontalStructuredListExample(): React.ReactElement {
  return <StructuredListDemo checkbox status action />;
}

export function VerticalStructuredListExample(): React.ReactElement {
  return <StructuredListDemo vertical rows={3} />;
}

export function StructuredListWithOverflowExample(): React.ReactElement {
  return <StructuredListDemo overflow status action />;
}

export function StructuredListWithSelectionExample(): React.ReactElement {
  return <StructuredListDemo checkbox selected status />;
}

export const structuredListComponentSourceMap = {
  basic: `<StructuredList columns={columns} rows={rows} />`,
  checkbox: `<StructuredList columns={columns} rows={rows} selectable />`,
  status: `<StructuredList columns={columns} rows={rows} cellRenderer={{ status: StatusBadge }} />`,
  action: `<StructuredList columns={columns} rows={rows} rowActions={actions} />`,
  horizontal: `<StructuredList columns={columns} rows={rows} selectable rowActions={actions} />`,
  vertical: `<StructuredList columns={columns} rows={rows} layout="vertical" />`,
  overflow: `<StructuredList columns={manyColumns} rows={rows} overflow="scroll" />`,
  selection: `<StructuredList columns={columns} rows={rows} selectable selectedKeys={selectedKeys} />`,
};
