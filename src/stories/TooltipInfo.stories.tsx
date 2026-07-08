import type { Meta, StoryObj } from '@storybook/react';
import { TooltipInfo } from '../components/Tooltip';

const meta = {
  title: 'Components/Overlaying surface/Tooltip Info',
  component: TooltipInfo,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
  },
  args: {
    text: 'text',
  },
  decorators: [
    (Story: React.FC) => (
      <div className="flex min-h-64 items-center justify-center bg-surface-container p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TooltipInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TooltipInfoComponent: Story = {
  name: 'tooltip_info',
  args: {
    text: 'text',
  },
};

export const LongText: Story = {
  name: 'Long text',
  args: {
    text: 'Additional information can truncate within the maximum width.',
  },
};
