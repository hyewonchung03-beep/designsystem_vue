import React from 'react';

type BadgeTone = 'neutral' | 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'indigo' | 'pink';
type BadgeStyle = 'outlined' | 'filled';
type ChipState = 'enabled' | 'hover' | 'pressed' | 'error' | 'disabled';

function MiniIcon(): React.ReactElement {
  return <span className="status-indicator-mini-icon" aria-hidden="true" />;
}

export function BadgeDemo({
  children = 'Badge',
  tone = 'neutral',
  styleType = 'outlined',
  leading = false,
  trailing = false,
}: {
  children?: React.ReactNode;
  tone?: BadgeTone;
  styleType?: BadgeStyle;
  leading?: boolean;
  trailing?: boolean;
}): React.ReactElement {
  return (
    <span className={`status-badge status-badge--${tone} status-badge--${styleType}`}>
      {leading && <MiniIcon />}
      <span>{children}</span>
      {trailing && <MiniIcon />}
    </span>
  );
}

export function BadgeCounterDemo({
  children = '1',
  tone = 'brand',
  size = 'md',
}: {
  children?: React.ReactNode;
  tone?: 'brand' | 'grey' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}): React.ReactElement {
  return <span className={`status-counter status-counter--${tone} status-counter--${size}`}>{children}</span>;
}

export function BadgeStatusDemo({
  type = 'number',
  value = '24',
  size = 'md',
}: {
  type?: 'none' | 'dot' | 'number' | 'new';
  value?: string;
  size?: 'sm' | 'md' | 'lg';
}): React.ReactElement {
  return (
    <span className="status-badge-status">
      <span className="status-badge-status__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M18 8.5a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.7 19a2 2 0 0 1-3.4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {type === 'dot' && <span className={`status-badge-status__dot status-badge-status__dot--${size}`} />}
      {type === 'number' && <BadgeCounterDemo tone="danger" size={size}>{value}</BadgeCounterDemo>}
      {type === 'new' && <BadgeCounterDemo tone="danger" size={size}>New</BadgeCounterDemo>}
    </span>
  );
}

export function ChipDemo({
  children = 'Chip',
  size = 'md',
  selected = false,
  state = 'enabled',
  leading = false,
  trailing = false,
}: {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  state?: ChipState;
  leading?: boolean;
  trailing?: boolean;
}): React.ReactElement {
  return (
    <span className={`status-chip status-chip--${size} status-chip--${state}${selected ? ' status-chip--selected' : ''}`}>
      {leading && <MiniIcon />}
      <span>{children}</span>
      {trailing && <MiniIcon />}
    </span>
  );
}

export function EmptyStateDemo({
  title = 'No companies yet',
  description = 'Add a company to get started',
}: {
  title?: string;
  description?: string;
}): React.ReactElement {
  return (
    <div className="status-empty-state">
      <span className="status-empty-state__icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="currentColor" opacity="0.16" />
          <path d="M10 14h12v8H10v-8Z" fill="currentColor" opacity="0.34" />
          <path d="M12 11h8l2 3H10l2-3Z" fill="currentColor" opacity="0.5" />
        </svg>
      </span>
      <span className="status-empty-state__title">{title}</span>
      {description && <span className="status-empty-state__description">{description}</span>}
    </div>
  );
}

export function BadgeBasicExample(): React.ReactElement {
  return <BadgeDemo>Badge</BadgeDemo>;
}

export function BadgeWithIconExample(): React.ReactElement {
  return <BadgeDemo tone="blue" leading>Active</BadgeDemo>;
}

export function BadgeColorExample(): React.ReactElement {
  return (
    <div className="status-example-row">
      <BadgeDemo tone="yellow">Low Battery</BadgeDemo>
      <BadgeDemo tone="red">Out Of Stock</BadgeDemo>
      <BadgeDemo tone="green">Active</BadgeDemo>
      <BadgeDemo tone="blue">Connected</BadgeDemo>
    </div>
  );
}

export function BadgeCounterBasicExample(): React.ReactElement {
  return <BadgeCounterDemo>7</BadgeCounterDemo>;
}

export function BadgeCounterSizeExample(): React.ReactElement {
  return (
    <div className="status-example-row">
      <BadgeCounterDemo size="sm">1</BadgeCounterDemo>
      <BadgeCounterDemo size="md">16</BadgeCounterDemo>
      <BadgeCounterDemo size="lg">99+</BadgeCounterDemo>
    </div>
  );
}

export function BadgeCounterGreyExample(): React.ReactElement {
  return <BadgeCounterDemo tone="grey">-6</BadgeCounterDemo>;
}

export function BadgeStatusNumberExample(): React.ReactElement {
  return <BadgeStatusDemo type="number" value="24" />;
}

export function BadgeStatusDotExample(): React.ReactElement {
  return <BadgeStatusDemo type="dot" />;
}

export function BadgeStatusNewExample(): React.ReactElement {
  return <BadgeStatusDemo type="new" />;
}

export function ChipBasicExample(): React.ReactElement {
  return <ChipDemo leading trailing>Chip</ChipDemo>;
}

export function ChipSizeExample(): React.ReactElement {
  return (
    <div className="status-example-row">
      <ChipDemo size="sm" leading>Small</ChipDemo>
      <ChipDemo size="md" leading selected>Medium</ChipDemo>
      <ChipDemo size="lg" leading trailing>Large</ChipDemo>
    </div>
  );
}

export function ChipStateExample(): React.ReactElement {
  return (
    <div className="status-example-column">
      <ChipDemo selected>Enabled</ChipDemo>
      <ChipDemo selected state="hover">Hover</ChipDemo>
      <ChipDemo selected state="pressed">Pressed</ChipDemo>
      <ChipDemo state="error">Error</ChipDemo>
      <ChipDemo state="disabled">Disabled</ChipDemo>
    </div>
  );
}

export function EmptyStateBasicExample(): React.ReactElement {
  return <EmptyStateDemo />;
}

export function EmptyStateSearchExample(): React.ReactElement {
  return <EmptyStateDemo title="No matching results" description="Try adjusting your filters" />;
}

export const statusIndicatorSourceMap = {
  badgeBasic: `<Badge>Badge</Badge>`,
  badgeIcon: `<Badge leadingIcon tone="blue">Active</Badge>`,
  badgeColor: `<Badge tone="yellow">Low Battery</Badge>
<Badge tone="red">Out Of Stock</Badge>
<Badge tone="green">Active</Badge>
<Badge tone="blue">Connected</Badge>`,
  counterBasic: `<BadgeCounter>7</BadgeCounter>`,
  counterSize: `<BadgeCounter size="sm">1</BadgeCounter>
<BadgeCounter size="md">16</BadgeCounter>
<BadgeCounter size="lg">99+</BadgeCounter>`,
  counterGrey: `<BadgeCounter tone="grey">-6</BadgeCounter>`,
  statusNumber: `<BadgeStatus type="number" value={24} />`,
  statusDot: `<BadgeStatus type="dot" />`,
  statusNew: `<BadgeStatus type="new" />`,
  chipBasic: `<Chip leadingIcon trailingIcon>Chip</Chip>`,
  chipSize: `<Chip size="sm" leadingIcon>Small</Chip>
<Chip size="md" selected leadingIcon>Medium</Chip>
<Chip size="lg" leadingIcon trailingIcon>Large</Chip>`,
  chipState: `<Chip selected>Enabled</Chip>
<Chip selected state="hover">Hover</Chip>
<Chip selected state="pressed">Pressed</Chip>
<Chip state="error">Error</Chip>
<Chip state="disabled">Disabled</Chip>`,
  emptyBasic: `<EmptyState
  title="No companies yet"
  description="Add a company to get started"
/>`,
  emptySearch: `<EmptyState
  title="No matching results"
  description="Try adjusting your filters"
/>`,
};
