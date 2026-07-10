import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Banner from './Banner.vue';

const meta: Meta<typeof Banner> = {
  title: 'Pilot/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['error', 'warning', 'brand', 'announcement'] },
    showIcon: { control: 'boolean' },
    showAction: { control: 'boolean' },
    showClose: { control: 'boolean' },
  },
  args: {
    color: 'error',
    heading: 'Heading',
    actionLabel: 'Button',
    showIcon: true,
    showAction: true,
    showClose: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {};

export const Warning: Story = {
  args: { color: 'warning' },
};

export const Brand: Story = {
  args: { color: 'brand' },
};

export const Announcement: Story = {
  args: { color: 'announcement' },
};

export const NoIcon: Story = {
  args: { showIcon: false },
};

export const NoAction: Story = {
  args: { showAction: false },
};

export const NoClose: Story = {
  args: { showClose: false },
};

export const MinimalContent: Story = {
  args: { showIcon: false, showAction: false, showClose: false },
};
