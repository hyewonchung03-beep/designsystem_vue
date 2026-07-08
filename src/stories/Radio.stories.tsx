import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RadioGroup, { Radio } from '../components/Radio/Radio';

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Controls/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    value: 'option1',
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-20 items-start p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default (without label) ─────────────────────────────────────────── */

export const Default: Story = {
  name: 'Default',
  render: () => (
    <RadioGroup value="a">
      <div className="flex items-center gap-4">
        <Radio value="a" />
        <Radio value="b" />
      </div>
    </RadioGroup>
  ),
};

/* ── Selected / Unselected ───────────────────────────────────────────── */

export const Selected: Story = {
  name: 'Selected',
  render: () => (
    <RadioGroup value="a">
      <Radio value="a" />
    </RadioGroup>
  ),
};

export const Unselected: Story = {
  name: 'Unselected',
  render: () => (
    <RadioGroup value="">
      <Radio value="a" />
    </RadioGroup>
  ),
};

/* ── Disabled ────────────────────────────────────────────────────────── */

export const DisabledSelected: Story = {
  name: 'Disabled — Selected',
  render: () => (
    <RadioGroup value="a" disabled>
      <Radio value="a" />
    </RadioGroup>
  ),
};

export const DisabledUnselected: Story = {
  name: 'Disabled — Unselected',
  render: () => (
    <RadioGroup value="" disabled>
      <Radio value="a" />
    </RadioGroup>
  ),
};

/* ── Interactive ─────────────────────────────────────────────────────── */

export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const [value, setValue] = useState('a');
    return (
      <RadioGroup value={value} onChange={setValue}>
        <div className="flex items-center gap-4">
          <Radio value="a" />
          <Radio value="b" />
          <Radio value="c" />
        </div>
      </RadioGroup>
    );
  },
};

/* ── All Variants ────────────────────────────────────────────────────── */

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <p className="text-text-xs font-semibold uppercase tracking-wide text-element-tertiary">
          Enabled
        </p>
        <RadioGroup value="selected">
          <div className="flex items-center gap-4">
            <Radio value="selected" />
            <Radio value="unselected" />
          </div>
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-text-xs font-semibold uppercase tracking-wide text-element-tertiary">
          Disabled
        </p>
        <RadioGroup value="selected" disabled>
          <div className="flex items-center gap-4">
            <Radio value="selected" />
            <Radio value="unselected" />
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};

/* ── With Label ──────────────────────────────────────────────────────── */

export const WithLabel: Story = {
  name: 'With Label',
  render: () => (
    <RadioGroup value="a">
      <Radio value="a" label="Option" />
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  name: 'With Description',
  render: () => (
    <RadioGroup value="a">
      <Radio value="a" label="Gateway" description="Use gateway connection." />
    </RadioGroup>
  ),
};

export const Required: Story = {
  name: 'Required',
  render: () => (
    <RadioGroup value="a">
      <Radio value="a" label="Option" required />
    </RadioGroup>
  ),
};

export const WithHelpIcon: Story = {
  name: 'With Help Icon',
  render: () => (
    <RadioGroup value="a">
      <Radio value="a" label="Option" helpIcon onHelpClick={() => alert('help clicked')} />
    </RadioGroup>
  ),
};

export const ErrorState: Story = {
  name: 'Error',
  render: () => (
    <RadioGroup value="a">
      <Radio value="a" label="Option" error />
    </RadioGroup>
  ),
};

/* ── Label Matrix (Figma: control_label) ─────────────────────────────── */

export const LabelMatrix: Story = {
  name: 'Label Matrix (size × state)',
  render: () => (
    <div className="grid grid-cols-3 gap-x-10 gap-y-8 p-6">
      {(['md', 'sm'] as const).flatMap((size) => [
        <RadioGroup key={`${size}-enabled`} value="a">
          <Radio size={size} value="a" label="Option" />
        </RadioGroup>,
        <RadioGroup key={`${size}-disabled`} value="">
          <Radio size={size} value="a" label="Option" disabled />
        </RadioGroup>,
        <RadioGroup key={`${size}-error`} value="a">
          <Radio size={size} value="a" label="Option" error />
        </RadioGroup>,
      ])}
    </div>
  ),
};
