import type { Meta, StoryObj } from '@storybook/react';
import Divider from '../components/Divider/Divider';

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    cap: {
      control: 'select',
      options: ['round', 'square'],
    },
    color: {
      control: 'select',
      options: ['G100', 'G150'],
    },
    solid: { control: 'boolean' },
    spacing: {
      control: 'select',
      options: ['0', '12', '24'],
    },
  },
  args: {
    type: 'horizontal',
    cap: 'square',
    color: 'G100',
    solid: true,
    spacing: '0',
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

/* ── Stories ─────────────────────────────────────────────────────────────── */

export const HorizontalDefault: Story = {
  name: 'Horizontal · Default',
  decorators: [
    (Story) => (
      <div className="w-80 p-6">
        <Story />
      </div>
    ),
  ],
};

export const HorizontalRound: Story = {
  name: 'Horizontal · Round cap',
  args: { cap: 'round' },
  decorators: [
    (Story) => (
      <div className="w-80 p-6">
        <Story />
      </div>
    ),
  ],
};

export const HorizontalG150: Story = {
  name: 'Horizontal · G150 (darker)',
  args: { color: 'G150' },
  decorators: [
    (Story) => (
      <div className="w-80 p-6">
        <Story />
      </div>
    ),
  ],
};

export const HorizontalNonSolid: Story = {
  name: 'Horizontal · Non-solid',
  args: { solid: false },
  decorators: [
    (Story) => (
      <div className="w-80 p-6">
        <Story />
      </div>
    ),
  ],
};

export const HorizontalSpacing12: Story = {
  name: 'Horizontal · Spacing 12px',
  args: { spacing: '12' },
  decorators: [
    (Story) => (
      <div className="w-80 p-6">
        <Story />
      </div>
    ),
  ],
};

export const HorizontalSpacing24: Story = {
  name: 'Horizontal · Spacing 24px',
  args: { spacing: '24' },
  decorators: [
    (Story) => (
      <div className="w-80 p-6">
        <Story />
      </div>
    ),
  ],
};

export const VerticalDefault: Story = {
  name: 'Vertical · Default',
  args: { type: 'vertical' },
  decorators: [
    (Story) => (
      <div className="flex h-24 items-stretch p-6">
        <Story />
      </div>
    ),
  ],
};

export const VerticalRound: Story = {
  name: 'Vertical · Round cap',
  args: { type: 'vertical', cap: 'round' },
  decorators: [
    (Story) => (
      <div className="flex h-24 items-stretch p-6">
        <Story />
      </div>
    ),
  ],
};

export const VerticalG150: Story = {
  name: 'Vertical · G150 (darker)',
  args: { type: 'vertical', color: 'G150' },
  decorators: [
    (Story) => (
      <div className="flex h-24 items-stretch p-6">
        <Story />
      </div>
    ),
  ],
};

/* ── All Variants ───────────────────────────────────────────────────────── */

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-col gap-8 rounded-4 p-6">
      {/* Horizontal variants */}
      <div>
        <p className="mb-4 text-text-xs font-semibold uppercase text-element-tertiary">
          Horizontal
        </p>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">
              Square · G100 · Solid
            </span>
            <Divider />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">
              Round · G100 · Solid
            </span>
            <Divider cap="round" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">
              Square · G150 · Solid
            </span>
            <Divider color="G150" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">
              Round · G150 · Solid
            </span>
            <Divider cap="round" color="G150" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">
              Square · G100 · Non-solid
            </span>
            <Divider solid={false} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">
              Round · G100 · Spacing 12px
            </span>
            <Divider cap="round" spacing="12" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">
              Round · G100 · Spacing 24px
            </span>
            <Divider cap="round" spacing="24" />
          </div>
        </div>
      </div>

      {/* Vertical variants */}
      <div>
        <p className="mb-4 text-text-xs font-semibold uppercase text-element-tertiary">
          Vertical
        </p>
        <div className="flex h-24 items-stretch gap-10">
          <div className="flex flex-col items-center gap-1">
            <span className="text-text-xxs text-element-quaternary">
              Square · G100
            </span>
            <div className="flex flex-1 items-stretch">
              <Divider type="vertical" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-text-xxs text-element-quaternary">
              Round · G100
            </span>
            <div className="flex flex-1 items-stretch">
              <Divider type="vertical" cap="round" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-text-xxs text-element-quaternary">
              Square · G150
            </span>
            <div className="flex flex-1 items-stretch">
              <Divider type="vertical" color="G150" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-text-xxs text-element-quaternary">
              Round · G150
            </span>
            <div className="flex flex-1 items-stretch">
              <Divider type="vertical" cap="round" color="G150" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-text-xxs text-element-quaternary">
              Non-solid
            </span>
            <div className="flex flex-1 items-stretch">
              <Divider type="vertical" solid={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
