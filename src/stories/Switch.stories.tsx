import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Switch from '../components/Switch/Switch';

const meta = {
  title: 'Components/Controls/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked:  { control: 'boolean', description: '활성화 상태' },
    disabled: { control: 'boolean', description: '비활성화 상태' },
    readOnly: { control: 'boolean', description: '읽기 전용 상태' },
    size:     { control: 'radio', options: ['sm', 'md'], description: '사이즈' },
    showIcon: { control: 'boolean', description: '핸들 내 아이콘 표시 (md만)' },
    label:    { control: 'text', description: '라벨 텍스트' },
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default (Checked) ───────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default (Checked)',
  args: {
    checked: true,
    size: 'md',
    label: 'Switch label',
  },
};

// ── Unchecked ───────────────────────────────────────────────────────────

export const Unchecked: Story = {
  name: 'Unchecked',
  args: {
    checked: false,
    size: 'md',
    label: 'Switch label',
  },
};

// ── With Icon ───────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: 'With Icon (md)',
  args: {
    checked: true,
    size: 'md',
    showIcon: true,
    label: 'With icon',
  },
};

// ── Small Size ──────────────────────────────────────────────────────────

export const SmallSize: Story = {
  name: 'Small Size',
  args: {
    checked: true,
    size: 'sm',
    label: 'Small switch',
  },
};

// ── Disabled ────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    checked: true,
    disabled: true,
    size: 'md',
    label: 'Disabled checked',
  },
};

// ── Read Only ───────────────────────────────────────────────────────────

export const ReadOnly: Story = {
  name: 'Read Only',
  args: {
    checked: true,
    readOnly: true,
    size: 'md',
    label: 'Read only',
  },
};

// ── Interactive ─────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive',
  args: { label: '' },
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        checked={checked}
        onChange={setChecked}
        size="md"
        showIcon
        label={checked ? 'Active' : 'Inactive'}
      />
    );
  },
};

// ── All Variants ────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  args: { label: '' },
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Size: md */}
      <div>
        <p className="mb-3 text-text-sm text-element-secondary">Size: md — Enabled</p>
        <div className="flex items-center gap-6">
          <Switch checked={false} size="md" label="Off" />
          <Switch checked size="md" label="On" />
          <Switch checked={false} size="md" showIcon label="Off (icon)" />
          <Switch checked size="md" showIcon label="On (icon)" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-text-sm text-element-secondary">Size: md — Disabled</p>
        <div className="flex items-center gap-6">
          <Switch checked={false} disabled size="md" label="Off" />
          <Switch checked disabled size="md" label="On" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-text-sm text-element-secondary">Size: md — Read Only</p>
        <div className="flex items-center gap-6">
          <Switch checked={false} readOnly size="md" label="Off" />
          <Switch checked readOnly size="md" label="On" />
        </div>
      </div>

      {/* Size: sm */}
      <div>
        <p className="mb-3 text-text-sm text-element-secondary">Size: sm — Enabled</p>
        <div className="flex items-center gap-6">
          <Switch checked={false} size="sm" label="Off" />
          <Switch checked size="sm" label="On" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-text-sm text-element-secondary">Size: sm — Disabled</p>
        <div className="flex items-center gap-6">
          <Switch checked={false} disabled size="sm" label="Off" />
          <Switch checked disabled size="sm" label="On" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-text-sm text-element-secondary">Size: sm — Read Only</p>
        <div className="flex items-center gap-6">
          <Switch checked={false} readOnly size="sm" label="Off" />
          <Switch checked readOnly size="sm" label="On" />
        </div>
      </div>

      {/* Without Label */}
      <div>
        <p className="mb-3 text-text-sm text-element-secondary">Without Label</p>
        <div className="flex items-center gap-6">
          <Switch checked={false} size="md" />
          <Switch checked size="md" />
          <Switch checked={false} size="sm" />
          <Switch checked size="sm" />
        </div>
      </div>
    </div>
  ),
};

// ── With Description ───────────────────────────────────────────────────

export const WithDescription: Story = {
  name: 'With Description',
  args: {
    checked: true,
    size: 'md',
    label: 'User Management',
    description: 'Allow admins to invite, edit, and remove users.',
  },
};

// ── With Help Icon ──────────────────────────────────────────────────────

export const WithHelpIcon: Story = {
  name: 'With Help Icon',
  args: {
    checked: true,
    size: 'md',
    label: 'Gateway',
    helpIcon: true,
  },
};

/* ── Label Matrix (Figma: control_label) ─────────────────────────────── */

export const LabelMatrix: Story = {
  name: 'Label Matrix (size × state)',
  args: { label: '' },
  render: () => (
    <div className="grid grid-cols-2 gap-x-10 gap-y-8 p-6">
      {(['md', 'sm'] as const).flatMap((size) => [
        <Switch key={`${size}-enabled`} size={size} checked label="Option" />,
        <Switch key={`${size}-disabled`} size={size} checked disabled label="Option" />,
      ])}
    </div>
  ),
};
