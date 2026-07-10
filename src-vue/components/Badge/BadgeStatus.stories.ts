import type { Meta, StoryObj } from '@storybook/vue3-vite';
import BadgeStatus from './BadgeStatus.vue';

const meta: Meta<typeof BadgeStatus> = {
  title: 'Pilot/Badge/BadgeStatus',
  component: BadgeStatus,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['dot', 'number', 'new'] },
    size: { control: 'select', options: ['sm', 'md'] },
    count: { control: 'number' },
    showBox: { control: 'boolean' },
  },
  args: {
    type: 'dot',
    size: 'sm',
    count: 1,
    showBox: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Dot: Story = {};

export const Number: Story = {
  args: { type: 'number', count: 5 },
};

export const NumberOverflow: Story = {
  args: { type: 'number', count: 128 },
};

export const New: Story = {
  args: { type: 'new' },
};

export const MediumSize: Story = {
  args: { type: 'number', count: 5, size: 'md' },
};

export const OverlayOnBox: Story = {
  args: { type: 'number', count: 3, showBox: true },
};
