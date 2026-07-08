import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '../components/Checkbox/Checkbox';

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Controls/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    checked: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-20 items-start p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default (without label) ─────────────────────────────────────────── */

export const Default: Story = {
  name: 'Default',
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox checked />
      <Checkbox checked={false} />
    </div>
  ),
};

/* ── Checked / Unchecked ────────────────────────────────────────────── */

export const Checked: Story = {
  name: 'Checked',
  render: () => <Checkbox checked />,
};

export const Unchecked: Story = {
  name: 'Unchecked',
  render: () => <Checkbox checked={false} />,
};

/* ── Indeterminate ──────────────────────────────────────────────────── */

export const Indeterminate: Story = {
  name: 'Indeterminate',
  render: () => <Checkbox indeterminate />,
};

/* ── Disabled ───────────────────────────────────────────────────────── */

export const DisabledChecked: Story = {
  name: 'Disabled — Checked',
  render: () => <Checkbox checked disabled />,
};

export const DisabledUnchecked: Story = {
  name: 'Disabled — Unchecked',
  render: () => <Checkbox checked={false} disabled />,
};

export const DisabledIndeterminate: Story = {
  name: 'Disabled — Indeterminate',
  render: () => <Checkbox indeterminate disabled />,
};

/* ── Interactive ────────────────────────────────────────────────────── */

export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center gap-4">
        <Checkbox checked={checked} onChange={setChecked} />
        <Checkbox checked={!checked} onChange={(v) => setChecked(!v)} />
      </div>
    );
  },
};

/* ── All Variants ───────────────────────────────────────────────────── */

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <p className="text-text-xs font-semibold uppercase tracking-wide text-element-tertiary">
          Enabled
        </p>
        <div className="flex items-center gap-4">
          <Checkbox checked />
          <Checkbox checked={false} />
          <Checkbox indeterminate />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-text-xs font-semibold uppercase tracking-wide text-element-tertiary">
          Disabled
        </p>
        <div className="flex items-center gap-4">
          <Checkbox checked disabled />
          <Checkbox checked={false} disabled />
          <Checkbox indeterminate disabled />
        </div>
      </div>
    </div>
  ),
};
