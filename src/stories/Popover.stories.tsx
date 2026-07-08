import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from '../components/Popover';

const meta = {
  title: 'Components/Overlaying surface/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['md', 'lg'] },
    placement: { control: 'radio', options: ['top', 'bottom', 'left', 'right'] },
    title: { control: 'text' },
    showHeader: { control: 'boolean' },
    showFooter: { control: 'boolean' },
    showScroll: { control: 'boolean' },
    showSlot: { control: 'boolean' },
  },
  args: {
    size: 'md',
    placement: 'bottom',
    title: 'Header',
    showHeader: true,
    showFooter: true,
    showScroll: true,
    showSlot: true,
  },
  decorators: [
    (Story: React.FC) => (
      <div className="flex min-h-[360px] items-center justify-center bg-surface-container p-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MdBottom: Story = {
  name: 'size=md, placement=bottom',
  args: {
    size: 'md',
    placement: 'bottom',
  },
};

export const LgBottom: Story = {
  name: 'size=lg, placement=bottom',
  args: {
    size: 'lg',
    placement: 'bottom',
  },
};

export const PopoverComponent: Story = {
  name: 'popover',
  render: () => {
    const rows = [
      { placement: 'bottom', top: 25 },
      { placement: 'top', top: 302.5 },
      { placement: 'right', top: 580 },
      { placement: 'left', top: 824 },
    ] as const;

    return (
      <div
        style={{
          position: 'relative',
          width: 694,
          height: 1138,
          background: 'var(--sol-surface)',
        }}
      >
        {rows.map(({ placement, top }) => (
          <div key={`md-${placement}`} style={{ position: 'absolute', left: 36, top }}>
            <Popover size="md" placement={placement} />
          </div>
        ))}
        {rows.map(({ placement, top }) => (
          <div key={`lg-${placement}`} style={{ position: 'absolute', left: 298, top }}>
            <Popover size="lg" placement={placement} />
          </div>
        ))}
      </div>
    );
  },
};

export const WithoutFooter: Story = {
  name: 'Without footer',
  args: {
    showFooter: false,
  },
};

export const CustomContent: Story = {
  name: 'Custom content',
  render: () => (
    <Popover size="lg" placement="bottom">
      <div
        className="flex w-full flex-col text-element-secondary"
        style={{
          gap: 'var(--sol-spacing-8)',
          fontSize: 'var(--sol-font-size-text-sm)',
          lineHeight: 'var(--sol-line-height-text-sm)',
        }}
      >
        <span>Popover content can be replaced by product-specific controls.</span>
        <span className="text-element-tertiary">Use this area for short contextual actions.</span>
      </div>
    </Popover>
  ),
};
