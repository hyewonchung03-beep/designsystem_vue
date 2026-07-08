import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '../components/EmptyState/EmptyState';
import type { EmptyStateType } from '../components/EmptyState/EmptyState';

const meta = {
  title: 'Components/Status indicator/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['widget', 'data', 'event', 'store'] satisfies EmptyStateType[] },
    text: { control: 'text' },
  },
  args: {
    type: 'data',
    text: 'Sorry, there is not enough data for that date',
  },
  decorators: [
    (Story: React.FC) => (
      <div className="flex flex-wrap items-center justify-center gap-6 p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Data: Story = {
  args: {
    type: 'data',
    text: 'Sorry, there is not enough data for that date',
  },
};

export const Widget: Story = {
  args: {
    type: 'widget',
    text: 'No widgets available.',
  },
};

export const Store: Story = {
  args: {
    type: 'store',
    text: (
      <>
        No stores yet. <strong>Add a store</strong> to get started.
      </>
    ),
  },
};

export const Event: Story = {
  args: {
    type: 'event',
    text: 'No events yet.',
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex items-start">
      <EmptyState type="data" text="Sorry, there is not enough data for that date" />
      <EmptyState type="widget" text="There are no more widgets to add" />
      <EmptyState type="event" text="yay! There is no event" />
      <EmptyState type="store" text="No stores yet." />
    </div>
  ),
};

