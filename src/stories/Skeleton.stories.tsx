import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from '../components/Skeleton/Skeleton';
import SkeletonItem from '../components/Skeleton/SkeletonItem';

const meta = {
  title: 'Components/Loading/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['card', 'text', 'bar'], description: '레이아웃 프리셋' },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Skeleton Items ─────────────────────────────────────────────────────────

export const Items: Story = {
  name: 'Items',
  render: () => (
    <div className="flex items-center gap-6">
      <SkeletonItem type="bar" className="w-[120px]" />
      <SkeletonItem type="rectangle" />
      <SkeletonItem type="circle" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SkeletonItem type="bar" className="w-[120px]" />
<SkeletonItem type="rectangle" />
<SkeletonItem type="circle" />`,
        language: 'tsx',
      },
    },
  },
};

// ── Bar variant ────────────────────────────────────────────────────────────

export const Bar: Story = {
  name: 'Variant - Bar',
  args: { variant: 'bar' },
  render: (args) => (
    <div className="w-[400px]">
      <Skeleton {...args} />
    </div>
  ),
  parameters: {
    docs: {
      source: { code: `<Skeleton variant="bar" />`, language: 'tsx' },
    },
  },
};

// ── Card variant ───────────────────────────────────────────────────────────

export const Card: Story = {
  name: 'Variant - Card',
  args: { variant: 'card' },
  render: (args) => (
    <div className="w-[400px]">
      <Skeleton {...args} />
    </div>
  ),
  parameters: {
    docs: {
      source: { code: `<Skeleton variant="card" />`, language: 'tsx' },
    },
  },
};

// ── Text variant ───────────────────────────────────────────────────────────

export const Text: Story = {
  name: 'Variant - Text',
  args: { variant: 'text' },
  render: (args) => (
    <div className="w-[500px]">
      <Skeleton {...args} />
    </div>
  ),
  parameters: {
    docs: {
      source: { code: `<Skeleton variant="text" />`, language: 'tsx' },
    },
  },
};

// ── List example ───────────────────────────────────────────────────────────

export const List: Story = {
  name: 'List',
  render: () => (
    <div className="flex w-[400px] flex-col gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} variant="card" />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `{Array.from({ length: 4 }).map((_, i) => (
  <Skeleton key={i} variant="card" />
))}`,
        language: 'tsx',
      },
    },
  },
};
