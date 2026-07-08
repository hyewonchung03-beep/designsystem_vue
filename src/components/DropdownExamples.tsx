import React from 'react';

type DropdownVariant = 'default' | 'checkbox' | 'avatar' | 'flag' | 'grouped' | 'state';
type DropdownItemState = 'default' | 'hover' | 'pressed' | 'focused' | 'selected' | 'disabled';

type DropdownDemoProps = {
  variant?: DropdownVariant;
  compact?: boolean;
  loading?: boolean;
  items?: string[];
  state?: DropdownItemState;
  grouped?: boolean;
  className?: string;
};

const countryItems = ['Andorra (+376)', 'United Arab Emirates (+971)', 'Afghanistan (+93)', 'Antigua and Barbuda (+1-268)'];
const avatarItems = ['Sophia Hernandez', 'Daniel Smith', 'Emily Johnson', 'Alex Brown'];
const checkboxItems = ['Active', 'Pending', 'Failed', 'Disabled'];

function Flag({index}: {index: number}): React.ReactElement {
  const flags = ['🇦🇩', '🇦🇪', '🇦🇫', '🇦🇬'];
  return <span className="dropdown-demo__flag" aria-hidden="true">{flags[index % flags.length]}</span>;
}

function Avatar({label}: {label: string}): React.ReactElement {
  return <span className="dropdown-demo__avatar" aria-hidden="true">{label.slice(0, 1)}</span>;
}

function Spinner(): React.ReactElement {
  return <span className="dropdown-demo__spinner" aria-hidden="true" />;
}

function DropdownItem({
  children,
  variant = 'default',
  state = 'default',
  index = 0,
  compact = false,
  loading = false,
}: {
  children: React.ReactNode;
  variant?: DropdownVariant;
  state?: DropdownItemState;
  index?: number;
  compact?: boolean;
  loading?: boolean;
}): React.ReactElement {
  const selected = state === 'selected' || (variant === 'checkbox' && index === 0);
  return (
    <div className={`dropdown-demo__item dropdown-demo__item--${state}${compact ? ' dropdown-demo__item--compact' : ''}`}>
      {variant === 'checkbox' && <span className={`dropdown-demo__check${selected ? ' dropdown-demo__check--checked' : ''}`} aria-hidden="true" />}
      {variant === 'avatar' && <Avatar label={String(children)} />}
      {variant === 'flag' && <Flag index={index} />}
      <span className="dropdown-demo__label">{children}</span>
      {loading && index === 0 && <Spinner />}
      {selected && variant !== 'checkbox' && <span className="dropdown-demo__selected" aria-hidden="true">✓</span>}
    </div>
  );
}

export function DropdownDemo({
  variant = 'default',
  compact = false,
  loading = false,
  items,
  state,
  grouped = false,
  className,
}: DropdownDemoProps): React.ReactElement {
  if (grouped || variant === 'grouped') {
    return (
      <div className={`dropdown-demo${compact ? ' dropdown-demo--compact' : ''}${className ? ` ${className}` : ''}`}>
        <div className="dropdown-demo__group-label">Admin</div>
        <DropdownItem compact={compact}>Manage account</DropdownItem>
        <DropdownItem compact={compact}>Edit profile</DropdownItem>
        <div className="dropdown-demo__divider" />
        <div className="dropdown-demo__group-label">Danger zone</div>
        <DropdownItem compact={compact} state="pressed">Delete user</DropdownItem>
      </div>
    );
  }

  const resolvedItems =
    items ?? (variant === 'checkbox' ? checkboxItems : variant === 'avatar' ? avatarItems : variant === 'flag' ? countryItems : ['Select Item', 'Select Item', 'Select Item', 'Select Item', 'Select Item']);

  return (
    <div className={`dropdown-demo${compact ? ' dropdown-demo--compact' : ''}${className ? ` ${className}` : ''}`}>
      {resolvedItems.map((item, index) => (
        <DropdownItem
          key={`${item}-${index}`}
          variant={variant}
          compact={compact}
          loading={loading}
          index={index}
          state={state ?? (variant === 'state' ? (item.toLowerCase() as DropdownItemState) : 'default')}
        >
          {item}
        </DropdownItem>
      ))}
      {resolvedItems.length > 4 && <span className="dropdown-demo__scrollbar" aria-hidden="true" />}
    </div>
  );
}

export function DefaultDropdownExample(): React.ReactElement {
  return <DropdownDemo items={['Select Item', 'Select Item', 'Select Item', 'Select Item']} />;
}

export function CheckboxDropdownExample(): React.ReactElement {
  return <DropdownDemo variant="checkbox" />;
}

export function AvatarDropdownExample(): React.ReactElement {
  return <DropdownDemo variant="avatar" />;
}

export function FlagDropdownExample(): React.ReactElement {
  return <DropdownDemo variant="flag" />;
}

export function GroupedDropdownExample(): React.ReactElement {
  return <DropdownDemo variant="grouped" />;
}

export function DropdownStateExample(): React.ReactElement {
  return <DropdownDemo variant="state" items={['Default', 'Hover', 'Pressed', 'Focused', 'Selected', 'Disabled']} />;
}

export const dropdownSourceMap = {
  default: `<Dropdown>
  <Dropdown.Item>Select Item</Dropdown.Item>
  <Dropdown.Item>Select Item</Dropdown.Item>
  <Dropdown.Item>Select Item</Dropdown.Item>
  <Dropdown.Item>Select Item</Dropdown.Item>
</Dropdown>`,
  checkbox: `<Dropdown multiple>
  <Dropdown.CheckboxItem checked>Active</Dropdown.CheckboxItem>
  <Dropdown.CheckboxItem>Pending</Dropdown.CheckboxItem>
  <Dropdown.CheckboxItem>Failed</Dropdown.CheckboxItem>
  <Dropdown.CheckboxItem disabled>Disabled</Dropdown.CheckboxItem>
</Dropdown>`,
  avatar: `<Dropdown>
  <Dropdown.AvatarItem avatar={sophiaAvatar}>Sophia Hernandez</Dropdown.AvatarItem>
  <Dropdown.AvatarItem avatar={danielAvatar}>Daniel Smith</Dropdown.AvatarItem>
  <Dropdown.AvatarItem avatar={emilyAvatar}>Emily Johnson</Dropdown.AvatarItem>
  <Dropdown.AvatarItem avatar={alexAvatar}>Alex Brown</Dropdown.AvatarItem>
</Dropdown>`,
  flag: `<Dropdown>
  <Dropdown.FlagItem flag="AD" meta="+376">Andorra</Dropdown.FlagItem>
  <Dropdown.FlagItem flag="AE" meta="+971">United Arab Emirates</Dropdown.FlagItem>
  <Dropdown.FlagItem flag="AF" meta="+93">Afghanistan</Dropdown.FlagItem>
  <Dropdown.FlagItem flag="AG" meta="+1-268">Antigua and Barbuda</Dropdown.FlagItem>
</Dropdown>`,
  grouped: `<Dropdown>
  <Dropdown.Group label="Admin">
    <Dropdown.Item>Manage account</Dropdown.Item>
    <Dropdown.Item>Edit profile</Dropdown.Item>
  </Dropdown.Group>
  <Dropdown.Separator />
  <Dropdown.Group label="Danger zone">
    <Dropdown.Item tone="danger">Delete user</Dropdown.Item>
  </Dropdown.Group>
</Dropdown>`,
  state: `<Dropdown>
  <Dropdown.Item>Default</Dropdown.Item>
  <Dropdown.Item state="hover">Hover</Dropdown.Item>
  <Dropdown.Item state="pressed">Pressed</Dropdown.Item>
  <Dropdown.Item state="focused">Focused</Dropdown.Item>
  <Dropdown.Item selected>Selected</Dropdown.Item>
  <Dropdown.Item disabled>Disabled</Dropdown.Item>
</Dropdown>`,
};
