import React from 'react';

type TreeMenuItem = {
  key: string;
  label: string;
  count?: number;
  selected?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  icon?: boolean;
  children?: TreeMenuItem[];
};

type TreeMenuDemoProps = {
  heading?: string;
  items: TreeMenuItem[];
  leadingIcon?: boolean;
  className?: string;
};

function Chevron({expanded = false}: {expanded?: boolean}): React.ReactElement {
  return (
    <span className={`tree-menu-doc__toggle${expanded ? ' tree-menu-doc__toggle--expanded' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function NodeIcon(): React.ReactElement {
  return (
    <span className="tree-menu-doc__icon" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M3.5 4.5H7L8.2 6H12.5V11.5H3.5V4.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function TreeMenuRow({
  item,
  level,
  leadingIcon,
}: {
  item: TreeMenuItem;
  level: number;
  leadingIcon: boolean;
}): React.ReactElement {
  const hasChildren = Boolean(item.children?.length);

  return (
    <>
      <div
        className={[
          'tree-menu-doc__row',
          `tree-menu-doc__row--level-${level}`,
          item.selected ? 'tree-menu-doc__row--selected' : '',
          item.disabled ? 'tree-menu-doc__row--disabled' : '',
        ].filter(Boolean).join(' ')}
      >
        {hasChildren ? <Chevron expanded={item.expanded} /> : <span className="tree-menu-doc__toggle-spacer" aria-hidden="true" />}
        {(leadingIcon || item.icon) && <NodeIcon />}
        <span className="tree-menu-doc__label">{item.label}</span>
        {item.count !== undefined && <span className="tree-menu-doc__count">{item.count}</span>}
      </div>
      {hasChildren && item.expanded && (
        <div className="tree-menu-doc__children">
          {item.children?.map((child) => (
            <TreeMenuRow key={child.key} item={child} level={Math.min(level + 1, 3)} leadingIcon={leadingIcon} />
          ))}
        </div>
      )}
    </>
  );
}

export function TreeMenuDemo({heading = 'Panel Heading', items, leadingIcon = false, className}: TreeMenuDemoProps): React.ReactElement {
  return (
    <div className={`tree-menu-doc${className ? ` ${className}` : ''}`}>
      <div className="tree-menu-doc__heading">
        <span>{heading}</span>
      </div>
      <div className="tree-menu-doc__body">
        {items.map((item) => (
          <TreeMenuRow key={item.key} item={item} level={1} leadingIcon={leadingIcon} />
        ))}
      </div>
    </div>
  );
}

const basicItems: TreeMenuItem[] = [
  {
    key: 'all-store',
    label: 'All Store',
    expanded: true,
    children: [
      {
        key: 'region-01',
        label: 'Region 01',
        expanded: true,
        children: [
          {key: 'store-01', label: 'Store 01'},
          {key: 'store-02', label: 'Store 02'},
        ],
      },
      {key: 'region-02', label: 'Region 02'},
    ],
  },
];

export function BasicTreeMenuExample(): React.ReactElement {
  return (
    <div className="tree-menu-example-wrap">
      <TreeMenuDemo items={basicItems} />
    </div>
  );
}

export function TreeMenuWithLeadingIconExample(): React.ReactElement {
  return (
    <div className="tree-menu-example-wrap">
      <TreeMenuDemo items={basicItems} leadingIcon />
    </div>
  );
}

export function TreeMenuWithCountExample(): React.ReactElement {
  return (
    <div className="tree-menu-example-wrap">
      <TreeMenuDemo
        items={[
          {
            key: 'all-store',
            label: 'All Stores',
            count: 512,
            expanded: true,
            children: [
              {key: 'seoul', label: 'Seoul', count: 231},
              {key: 'busan', label: 'Busan', count: 18},
            ],
          },
        ]}
      />
    </div>
  );
}

export function SelectableTreeMenuExample(): React.ReactElement {
  return (
    <div className="tree-menu-example-wrap">
      <TreeMenuDemo
        leadingIcon
        items={[
          {
            key: 'all-store',
            label: 'All Store',
            count: 512,
            expanded: true,
            children: [
              {
                key: 'seoul',
                label: 'Seoul',
                count: 231,
                expanded: true,
                selected: true,
                children: [
                  {key: 'gangnam', label: 'Gangnam Store'},
                  {key: 'sinsa', label: 'Sinsa Store'},
                ],
              },
              {key: 'busan', label: 'Busan', count: 18},
            ],
          },
        ]}
      />
    </div>
  );
}

export function ExpandedCollapsedTreeMenuExample(): React.ReactElement {
  return (
    <div className="tree-menu-example-wrap tree-menu-example-wrap--split">
      <TreeMenuDemo items={basicItems} />
      <TreeMenuDemo
        items={[
          {
            key: 'all-store',
            label: 'All Store',
            expanded: false,
            children: [{key: 'region-01', label: 'Region 01'}],
          },
        ]}
      />
    </div>
  );
}

export function DisabledTreeMenuExample(): React.ReactElement {
  return (
    <div className="tree-menu-example-wrap">
      <TreeMenuDemo
        items={[
          {
            key: 'all-store',
            label: 'All Store',
            expanded: true,
            children: [
              {key: 'region-01', label: 'Region 01'},
              {key: 'region-02', label: 'Region 02', disabled: true},
              {key: 'region-03', label: 'Region 03'},
            ],
          },
        ]}
      />
    </div>
  );
}

export const treeMenuSourceMap = {
  basic: `<TreeMenu
  heading="Panel Heading"
  items={[
    {
      key: 'all-store',
      label: 'All Store',
      children: [
        {
          key: 'region-01',
          label: 'Region 01',
          children: [
            { key: 'store-01', label: 'Store 01' },
            { key: 'store-02', label: 'Store 02' },
          ],
        },
        { key: 'region-02', label: 'Region 02' },
      ],
    },
  ]}
/>`,
  leadingIcon: `<TreeMenu
  heading="Panel Heading"
  leadingIcon
  items={items}
/>`,
  count: `<TreeMenu
  heading="Panel Heading"
  items={[
    { key: 'all-store', label: 'All Stores', count: 512 },
    { key: 'seoul', label: 'Seoul', count: 231 },
  ]}
/>`,
  selectable: `<TreeMenu
  heading="Panel Heading"
  selectedKey="seoul"
  items={items}
/>`,
  expandedCollapsed: `<TreeMenu
  heading="Panel Heading"
  defaultExpandedKeys={['all-store', 'region-01']}
  items={items}
/>`,
  disabled: `<TreeMenu
  heading="Panel Heading"
  disabledKeys={['region-02']}
  items={items}
/>`,
};
