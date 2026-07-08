import React from 'react';

type MenuDemoProps = {
  trigger?: 'button' | 'icon' | 'select';
  cascading?: boolean;
  leadingIcon?: boolean;
  danger?: boolean;
  selected?: string;
  compact?: boolean;
  className?: string;
  items?: string[];
};

const defaultItems = ['Trigger item', 'Trigger item', 'Trigger item'];
const actionItems = ['Move', 'Scale', 'Hand tool', 'Rotate'];
const accountItems = ['Manage account', 'Edit profile', 'Reset password', 'Deactivate user'];

function MenuIcon({name}: {name: string}): React.ReactElement {
  const label = name.slice(0, 1).toUpperCase();
  return <span className="menu-demo__icon" aria-hidden="true">{label}</span>;
}

export function MenuPanel({
  items = defaultItems,
  leadingIcon = false,
  danger = false,
  selected,
  compact = false,
}: Pick<MenuDemoProps, 'items' | 'leadingIcon' | 'danger' | 'selected' | 'compact'>): React.ReactElement {
  return (
    <div className={`menu-demo__panel${compact ? ' menu-demo__panel--compact' : ''}`}>
      {items.map((item, index) => {
        const isDanger = danger && index === items.length - 1;
        const isSelected = selected === item || (!selected && index === items.length - 1 && items === actionItems);

        return (
          <div className={`menu-demo__item${isDanger ? ' menu-demo__item--danger' : ''}${isSelected ? ' menu-demo__item--selected' : ''}`} key={`${item}-${index}`}>
            {leadingIcon && <MenuIcon name={item} />}
            <span>{item}</span>
            {isSelected && <span className="menu-demo__check" aria-hidden="true">✓</span>}
          </div>
        );
      })}
    </div>
  );
}

function Trigger({type = 'button'}: {type?: MenuDemoProps['trigger']}): React.ReactElement {
  if (type === 'icon') {
    return <button type="button" className="menu-demo__icon-trigger" aria-label="Open menu">•••</button>;
  }

  if (type === 'select') {
    return <button type="button" className="menu-demo__select-trigger">Last 30 days <span aria-hidden="true">⌄</span></button>;
  }

  return <button type="button" className="menu-demo__button-trigger">Action <span aria-hidden="true">⌄</span></button>;
}

export function MenuDemo({
  trigger = 'button',
  cascading = false,
  leadingIcon = false,
  danger = false,
  selected,
  compact = false,
  className = '',
  items,
}: MenuDemoProps): React.ReactElement {
  const panelItems = items ?? (danger ? accountItems : trigger === 'select' ? ['Last 7 days', 'Last 14 days', 'Last 30 days', 'Last 60 days'] : actionItems);

  return (
    <div className={`menu-demo ${className}`}>
      <Trigger type={trigger} />
      <div className="menu-demo__floating">
        <MenuPanel items={panelItems} leadingIcon={leadingIcon} danger={danger} selected={selected} compact={compact} />
        {cascading && (
          <div className="menu-demo__cascade">
            <MenuPanel items={['Export to CSV', 'Export to DOC', 'Export to PPT', 'Export to PDF']} leadingIcon compact />
          </div>
        )}
      </div>
    </div>
  );
}

export function BasicMenuExample(): React.ReactElement {
  return <MenuDemo />;
}

export function CascadingMenuExample(): React.ReactElement {
  return <MenuDemo cascading leadingIcon items={['Trigger item', 'Download as', 'Trigger item']} />;
}

export function IconTriggerMenuExample(): React.ReactElement {
  return <MenuDemo trigger="icon" danger />;
}

export function SelectTriggerMenuExample(): React.ReactElement {
  return <MenuDemo trigger="select" selected="Last 30 days" />;
}

export const menuSourceMap = {
  basic: `<Menu trigger="button" items={['Move', 'Scale', 'Hand tool', 'Rotate']} />`,
  cascading: `<Menu trigger="button" type="cascading" items={['Trigger item', 'Download as', 'Trigger item']} />`,
  iconTrigger: `<Menu trigger="icon" items={['Manage account', 'Edit profile', 'Reset password', 'Deactivate user']} />`,
  selectTrigger: `<Menu trigger="select" items={['Last 7 days', 'Last 14 days', 'Last 30 days', 'Last 60 days']} />`,
};
