import type { Meta, StoryObj } from '@storybook/react';
import SplitButton from '../components/SplitButton/SplitButton';

const meta = {
  title: 'Components/Button/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  argTypes: {
    label:       { control: 'text',    description: '기본 액션 라벨' },
    showIcon:    { control: 'boolean', description: '아이콘 표시 여부' },
    disabled:    { control: 'boolean', description: '비활성화 상태' },
    triggerOpen: { control: 'boolean', description: '트리거(드롭다운) 열림 상태' },
  },
  args: {
    label: 'Add',
    showIcon: true,
  },
  decorators: [
    (Story) => (
      <div className="flex items-center gap-4 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ───────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: {
    label: 'Add',
    showIcon: true,
  },
};

// ── Without Icon ──────────────────────────────────────────────────────────

export const WithoutIcon: Story = {
  name: 'Without Icon',
  args: {
    label: 'Action',
    showIcon: false,
  },
};

// ── Trigger Open ──────────────────────────────────────────────────────────

export const TriggerOpen: Story = {
  name: 'Trigger Open',
  args: {
    label: 'Add',
    showIcon: true,
    triggerOpen: true,
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    label: 'Add',
    showIcon: true,
    disabled: true,
  },
};

// ── All Variants ──────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  args: {
    label: 'Add',
    showIcon: true,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <SplitButton label="Add" showIcon />
      <SplitButton label="Action" showIcon={false} />
      <SplitButton label="Add" showIcon triggerOpen />
      <SplitButton label="Add" showIcon disabled />
    </div>
  ),
};
