import type { Meta, StoryObj } from '@storybook/vue3-vite';
import BadgeCounter from './BadgeCounter.vue';

const meta: Meta<typeof BadgeCounter> = {
  title: 'Pilot/Badge/BadgeCounter',
  component: BadgeCounter,
  tags: ['autodocs'],
  argTypes: {
    count: { control: 'number' },
    total: { control: 'number' },
  },
  args: {
    count: 1,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DoubleDigit: Story = {
  args: { count: 12 },
};

export const WithTotal: Story = {
  args: { count: 3, total: 10 },
};
