import type { Meta, StoryObj } from '@storybook/react';
import { DatatableTreeCell } from '../components/DatatableTreeCell/DatatableTreeCell';

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Data table/DataTableTreeCell',
  component: DatatableTreeCell,
  tags: ['autodocs'],
  argTypes: {
    branch: { control: 'boolean' },
    open: { control: 'boolean' },
    tier: {
      control: 'select',
      options: [1, 2, 3, 4],
    },
    label: { control: 'text' },
    showBadge: { control: 'boolean' },
    badgeText: { control: 'text' },
    showCounter: { control: 'boolean' },
    counterCount: { control: 'number' },
    counterTotal: { control: 'number' },
  },
  args: {
    label: 'Label',
    branch: true,
    tier: 1,
  },
  decorators: [
    (Story) => (
      <div className="flex items-start p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatatableTreeCell>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Stories ─────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => <DatatableTreeCell {...args} className="w-[534px]" />,
};

export const Open: Story = {
  name: 'Open',
  args: { defaultOpen: true },
  render: (args) => <DatatableTreeCell {...args} className="w-[534px]" />,
};

export const Leaf: Story = {
  name: 'Leaf (no children)',
  args: { branch: false },
  render: (args) => <DatatableTreeCell {...args} className="w-[534px]" />,
};

export const WithCounter: Story = {
  name: 'With Counter',
  args: { showCounter: true, counterCount: 3, counterTotal: 10 },
  render: (args) => <DatatableTreeCell {...args} className="w-[534px]" />,
};

export const WithBadge: Story = {
  name: 'With Badge',
  args: { showBadge: true, badgeText: 'Default' },
  render: (args) => <DatatableTreeCell {...args} className="w-[534px]" />,
};

export const WithCounterAndBadge: Story = {
  name: 'With Counter & Badge',
  args: { showCounter: true, counterCount: 1, counterTotal: 5, showBadge: true, badgeText: 'Active' },
  render: (args) => <DatatableTreeCell {...args} className="w-[534px]" />,
};

/* ── Tiers ──────────────────────────────────────────────────────────────── */

export const AllTiers: Story = {
  name: 'All Tier Levels',
  render: () => (
    <div className="flex w-[534px] flex-col rounded-[5px] bg-surface-default">
      <DatatableTreeCell label="Tier 1 — Root" tier={1} defaultOpen />
      <DatatableTreeCell label="Tier 2 — Child" tier={2} defaultOpen />
      <DatatableTreeCell label="Tier 3 — Grandchild" tier={3} />
      <DatatableTreeCell label="Tier 3 — Grandchild" tier={3} branch={false} />
      <DatatableTreeCell label="Tier 2 — Child" tier={2} />
      <DatatableTreeCell label="Tier 4 — Deep" tier={4} branch={false} />
    </div>
  ),
};

/* ── Tree Example ──────────────────────────────────────────────────────── */

export const TreeExample: Story = {
  name: 'Tree Structure Example',
  render: () => (
    <div className="flex w-[534px] flex-col divide-y divide-border-solid-variant rounded-4 border border-border-solid-variant bg-surface-container">
      <DatatableTreeCell label="Documents" tier={1} defaultOpen showCounter counterCount={3} counterTotal={12} />
      <DatatableTreeCell label="Reports" tier={2} defaultOpen showBadge badgeText="Active" />
      <DatatableTreeCell label="Q1 Report.pdf" tier={3} branch={false} />
      <DatatableTreeCell label="Q2 Report.pdf" tier={3} branch={false} />
      <DatatableTreeCell label="Invoices" tier={2} />
      <DatatableTreeCell label="Images" tier={1} showCounter counterCount={24} counterTotal={24} />
      <DatatableTreeCell label="Settings" tier={1} branch={false} showBadge badgeText="System" />
    </div>
  ),
};
