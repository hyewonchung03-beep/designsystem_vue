import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../components/Tooltip';

const meta = {
  title: 'Components/Overlaying surface/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'radio', options: ['top', 'bottom', 'left', 'right'] },
    showLeadingIcon: { control: 'boolean' },
    showTrailingIcon: { control: 'boolean' },
    text: { control: 'text' },
  },
  args: {
    placement: 'bottom',
    showLeadingIcon: true,
    showTrailingIcon: true,
    text: 'text',
  },
  decorators: [
    (Story: React.FC) => (
      <div className="flex min-h-64 items-center justify-center bg-surface-container p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bottom: Story = {
  name: 'placement=bottom',
  args: {
    placement: 'bottom',
  },
};

export const Top: Story = {
  name: 'placement=top',
  args: {
    placement: 'top',
  },
};

export const Right: Story = {
  name: 'placement=right',
  args: {
    placement: 'right',
  },
};

export const Left: Story = {
  name: 'placement=left',
  args: {
    placement: 'left',
  },
};

export const WithoutIcons: Story = {
  name: 'Without icons',
  args: {
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const TooltipComponent: Story = {
  name: 'tooltip',
  render: () => {
    const items = [
      { placement: 'bottom', top: 20 },
      { placement: 'top', top: 64 },
      { placement: 'right', top: 108 },
      { placement: 'left', top: 152 },
    ] as const;

    return (
      <div
        style={{
          position: 'relative',
          width: 117,
          height: 196,
          background: 'var(--sol-surface-container)',
        }}
      >
        {items.map(({ placement, top }) => (
          <div key={placement} style={{ position: 'absolute', left: 20, top }}>
            <Tooltip placement={placement} text="text" showLeadingIcon showTrailingIcon />
          </div>
        ))}
      </div>
    );
  },
};

export const LongText: Story = {
  name: 'Long text',
  args: {
    text: 'Tooltip text can stay within the max width and truncate when it becomes too long.',
  },
};
