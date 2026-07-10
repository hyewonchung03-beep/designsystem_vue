import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Tab from './Tab.vue';

const meta: Meta<typeof Tab> = {
  title: 'Pilot/Tab',
  component: Tab,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    items: [
      { label: 'Overview' },
      { label: 'Activity' },
      { label: 'Settings' },
    ],
    size: 'md',
    defaultIndex: 0,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};

export const WithDisabledTab: Story = {
  args: {
    items: [
      { label: 'Overview' },
      { label: 'Activity' },
      { label: 'Settings', disabled: true },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      { label: 'Inbox', badge: 3 },
      { label: 'Sent', badge: 12 },
      { label: 'Archive' },
    ],
  },
};

export const WithDot: Story = {
  args: {
    items: [
      { label: 'Overview' },
      { label: 'Notifications', dot: true },
      { label: 'Settings' },
    ],
  },
};

export const ManyTabs: Story = {
  args: {
    items: [
      { label: 'Overview' },
      { label: 'Activity', badge: 5 },
      { label: 'Members' },
      { label: 'Notifications', dot: true },
      { label: 'Settings', disabled: true },
    ],
  },
};
