import type { Meta, StoryObj } from '@storybook/react';
import Tabs from '../components/Tab/Tab';

const meta = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['md', 'sm'], description: '탭 높이 (md: 48px / sm: 40px)' },
    defaultIndex: { control: { type: 'number', min: 0 }, description: '초기 선택 탭 인덱스' },
  },
  decorators: [
    (Story) => (
      <div className="w-[600px] p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── md ────────────────────────────────────────────────────────────────────

export const SizeMd: Story = {
  name: 'Size - md (48px)',
  args: {
    size: 'md',
    defaultIndex: 0,
    items: [
      { label: 'Tab 1' },
      { label: 'Tab 2' },
      { label: 'Tab 3' },
      { label: 'Tab 4' },
    ],
  },
};

// ── sm ────────────────────────────────────────────────────────────────────

export const SizeSm: Story = {
  name: 'Size - sm (40px)',
  args: {
    size: 'sm',
    defaultIndex: 0,
    items: [
      { label: 'Tab 1' },
      { label: 'Tab 2' },
      { label: 'Tab 3' },
      { label: 'Tab 4' },
    ],
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────

export const WithDisabled: Story = {
  name: 'With Disabled',
  args: {
    size: 'md',
    defaultIndex: 0,
    items: [
      { label: 'Tab 1' },
      { label: 'Tab 2' },
      { label: 'Tab 3', disabled: true },
      { label: 'Tab 4', disabled: true },
    ],
  },
};

// ── Disabled + Selected ───────────────────────────────────────────────────

export const DisabledSelected: Story = {
  name: 'Disabled + Selected (indicator: fill-disabled)',
  args: {
    size: 'md',
    defaultIndex: 1,
    items: [
      { label: 'Tab 1' },
      { label: 'Tab 2', disabled: true },
      { label: 'Tab 3' },
    ],
  },
};

// ── With Badge ────────────────────────────────────────────────────────────

export const WithBadge: Story = {
  name: 'With Badge',
  args: {
    size: 'md',
    defaultIndex: 0,
    items: [
      { label: 'All',     badge: 12 },
      { label: 'Active',  badge: 5 },
      { label: 'Pending', badge: 3 },
      { label: 'Closed',  badge: 0 },
    ],
  },
};

// ── With Dot ──────────────────────────────────────────────────────────────

export const WithDot: Story = {
  name: 'With Dot (notification)',
  args: {
    size: 'md',
    defaultIndex: 0,
    items: [
      { label: 'Inbox',    dot: true },
      { label: 'Sent' },
      { label: 'Drafts',   dot: true },
      { label: 'Archive' },
    ],
  },
};

// ── Mixed ─────────────────────────────────────────────────────────────────

export const Mixed: Story = {
  name: 'Mixed (badge + dot + disabled)',
  args: {
    size: 'md',
    defaultIndex: 1,
    items: [
      { label: 'Overview' },
      { label: 'Issues',   badge: 8, dot: true },
      { label: 'Reports',  badge: 2 },
      { label: 'Settings', disabled: true },
    ],
  },
};

// ── sm + Badge ────────────────────────────────────────────────────────────

export const SmWithBadge: Story = {
  name: 'sm + Badge',
  args: {
    size: 'sm',
    defaultIndex: 0,
    items: [
      { label: 'All',    badge: 12 },
      { label: 'Active', badge: 5 },
      { label: 'Closed', badge: 0, disabled: true },
    ],
  },
};
