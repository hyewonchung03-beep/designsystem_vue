import type { Meta, StoryObj } from '@storybook/react';
import { TooltipPointer } from '../components/Tooltip/TooltipPointer';

const meta = {
  title: 'Components/Overlaying surface/Tooltip Pointer',
  component: TooltipPointer,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['black', 'white'] },
    size: { control: 'radio', options: ['sm', 'xs'] },
    placement: { control: 'radio', options: ['start', 'center', 'end'] },
    variant: { control: 'radio', options: ['filled', 'outline'] },
  },
  args: {
    color: 'black',
    size: 'sm',
    placement: 'start',
    variant: 'filled',
  },
  decorators: [
    (Story: React.FC) => (
      <div className="flex items-center justify-center p-8 bg-surface-container">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TooltipPointer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Black14x7: Story = {
  name: 'tooltip_arrow_black',
  args: {
    color: 'black',
    size: 'sm',
    placement: 'center',
  },
};

export const White11_2x5_6: Story = {
  name: 'tooltip_arrow_white',
  args: {
    color: 'white',
    size: 'sm',
    placement: 'center',
  },
  render: (args) => (
    <div
      style={{
        padding: 'var(--sol-spacing-4)',
        background: 'rgba(0, 0, 0, 0.72)',
        borderRadius: 'var(--sol-radius-2)',
      }}
    >
      <TooltipPointer {...args} />
    </div>
  ),
};

export const Small5x3: Story = {
  name: 'tooltip_arrow_small',
  args: {
    color: 'white',
    size: 'xs',
    placement: 'center',
  },
};

export const Pointer: Story = {
  name: 'pointer',
  render: () => {
    const rows = [
      {color: 'white', size: 'sm', top: 20},
      {color: 'black', size: 'sm', top: 78},
      {color: 'white', size: 'xs', top: 150},
      {color: 'black', size: 'xs', top: 195},
    ] as const;
    const placementTopOffset = {
      start: 0,
      center: 18,
      end: 36,
    } as const;

    return (
      <div
        style={{
          position: 'relative',
          width: 200,
          height: 250,
          background: 'var(--sol-surface-container)',
        }}
      >
        {rows.map(({color, size, top}) =>
          (['start', 'center', 'end'] as const).map((placement) => (
            <div
              key={`${color}-${size}-${placement}`}
              style={{
                position: 'absolute',
                left: 20,
                top: top + placementTopOffset[placement],
              }}
            >
              <TooltipPointer
                color={color}
                size={size}
                placement={placement}
                variant={color === 'white' ? 'outline' : 'filled'}
              />
            </div>
          )),
        )}
      </div>
    );
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col" style={{ gap: 'var(--sol-spacing-16)' }}>
      {(['sm', 'xs'] as const).map((size) => (
        <div key={size} className="flex flex-col" style={{ gap: 'var(--sol-spacing-8)' }}>
          <span
            className="text-element-quaternary font-regular uppercase"
            style={{ fontSize: 'var(--sol-font-size-text-xs)', lineHeight: 'var(--sol-line-height-text-xs)' }}
          >
            size={size}
          </span>
          <div className="flex flex-wrap items-start" style={{ gap: 'var(--sol-spacing-12)' }}>
            {(['black', 'white'] as const).map((color) => (
              <div
                key={`${size}-${color}`}
                className="flex flex-wrap"
                style={{
                  gap: 'var(--sol-spacing-4)',
                  padding: color === 'white' ? 'var(--sol-spacing-4)' : 0,
                  background: color === 'white' ? 'rgba(0, 0, 0, 0.72)' : 'transparent',
                  borderRadius: color === 'white' ? 'var(--sol-radius-2)' : 0,
                }}
              >
                {(['start', 'center', 'end'] as const).map((placement) => (
                  <div
                    key={`${color}-${placement}`}
                    className="flex flex-col items-center"
                    style={{ gap: 'var(--sol-spacing-4)' }}
                  >
                    <div style={{ padding: 'var(--sol-spacing-4)' }}>
                      <TooltipPointer color={color} size={size} placement={placement} />
                    </div>
                    <span
                      className="text-element-quaternary"
                      style={{ fontSize: 'var(--sol-font-size-text-xxs)', lineHeight: 'var(--sol-line-height-text-xxs)' }}
                    >
                      {color}/{placement}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
