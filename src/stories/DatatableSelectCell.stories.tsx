import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatatableSelectCell } from '../components/DatatableSelectCell/DatatableSelectCell';
import type { DatatableSelectCellSize } from '../components/DatatableSelectCell/DatatableSelectCell';

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Data table/DataTableSelectCell',
  component: DatatableSelectCell,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'lg'],
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'lg',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="flex items-start p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatatableSelectCell>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Stories ─────────────────────────────────────────────────────────────── */

export const Default: Story = {};

export const Checked: Story = {
  name: 'Checked',
  args: { checked: true },
};

export const Indeterminate: Story = {
  name: 'Indeterminate',
  args: { indeterminate: true },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  name: 'Disabled & Checked',
  args: { disabled: true, checked: true },
};

export const SmallSize: Story = {
  name: 'Small (sm)',
  args: { size: 'sm' },
};

export const SmallChecked: Story = {
  name: 'Small — Checked',
  args: { size: 'sm', checked: true },
};

/* ── Interactive ────────────────────────────────────────────────────────── */

export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center gap-4">
        <DatatableSelectCell
          checked={checked}
          onChange={setChecked}
          aria-label="Toggle row"
        />
        <span className="text-text-sm leading-text-sm text-element-secondary">
          {checked ? 'Selected' : 'Not selected'}
        </span>
      </div>
    );
  },
};

/* ── All States Grid ────────────────────────────────────────────────────── */

const sizes: DatatableSelectCellSize[] = ['sm', 'lg'];
const sizeLabels: Record<DatatableSelectCellSize, string> = {
  sm: 'sm (14px)',
  lg: 'lg (20px)',
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="inline-flex flex-col gap-6 rounded-[5px] bg-surface-default p-6">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
            {sizeLabels[size]}
          </span>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <span className="text-text-xxs text-element-quaternary">Default</span>
              <DatatableSelectCell size={size} />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-text-xxs text-element-quaternary">Checked</span>
              <DatatableSelectCell size={size} checked />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-text-xxs text-element-quaternary">Indeterminate</span>
              <DatatableSelectCell size={size} indeterminate />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-text-xxs text-element-quaternary">Disabled</span>
              <DatatableSelectCell size={size} disabled />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-text-xxs text-element-quaternary">Disabled ✓</span>
              <DatatableSelectCell size={size} disabled checked />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Data table Row Context ──────────────────────────────────────────────────── */

export const InTableContext: Story = {
  name: 'In Data table Context',
  render: () => {
    const [selected, setSelected] = useState<Set<number>>(new Set());
    const rows = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    const allSelected = selected.size === rows.length;
    const someSelected = selected.size > 0 && !allSelected;

    function toggleAll() {
      setSelected(allSelected ? new Set() : new Set(rows.map((_, i) => i)));
    }
    function toggleRow(idx: number) {
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(idx) ? next.delete(idx) : next.add(idx);
        return next;
      });
    }

    return (
      <div className="w-[400px] divide-y divide-border-solid-variant rounded-4 border border-border-solid-variant bg-surface-container">
        <div className="flex items-center border-b border-border-solid-variant bg-surface-container-low">
          <DatatableSelectCell
            checked={allSelected}
            indeterminate={someSelected}
            onChange={toggleAll}
            aria-label="Select all rows"
          />
          <span className="flex-1 px-2 text-text-sm leading-text-sm font-semibold text-element-tertiary">
            Name
          </span>
        </div>
        {rows.map((name, idx) => (
          <div key={idx} className="flex items-center hover:bg-interaction-neutral-hover">
            <DatatableSelectCell
              checked={selected.has(idx)}
              onChange={() => toggleRow(idx)}
              aria-label={`Select ${name}`}
            />
            <span className="flex-1 px-2 text-text-md leading-text-md font-regular text-element-secondary">
              {name}
            </span>
          </div>
        ))}
      </div>
    );
  },
};
