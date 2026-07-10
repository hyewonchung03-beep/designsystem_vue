import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Breadcrumb from './Breadcrumb.vue';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Pilot/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Category', href: '#' },
      { label: 'Subcategory', href: '#' },
      { label: 'Current page' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoItems: Story = {
  args: {
    items: [{ label: 'Home', href: '#' }, { label: 'Current page' }],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Current page' }],
  },
};

export const ManyItemsCollapsed: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Level 1', href: '#' },
      { label: 'Level 2', href: '#' },
      { label: 'Level 3', href: '#' },
      { label: 'Level 4', href: '#' },
      { label: 'Current page' },
    ],
    maxItems: 2,
  },
};

export const LongLabels: Story = {
  args: {
    items: [
      { label: 'A very long breadcrumb label that will truncate', href: '#' },
      { label: 'Another quite long intermediate label', href: '#' },
      { label: 'Yet another very long current page label' },
    ],
  },
};
