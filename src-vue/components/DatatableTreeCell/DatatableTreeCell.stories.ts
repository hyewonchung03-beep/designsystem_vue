import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DatatableTreeCell from './DatatableTreeCell.vue';

const meta: Meta<typeof DatatableTreeCell> = {
  title: 'Pilot/DatatableTreeCell',
  component: DatatableTreeCell,
  tags: ['autodocs'],
  argTypes: {
    tier: { control: 'select', options: [1, 2, 3, 4] },
  },
  args: {
    label: 'Marketing',
    branch: true,
    tier: 1,
    showBadge: false,
    showCounter: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {};

export const Expanded: Story = {
  args: { defaultOpen: true },
};

export const Leaf: Story = {
  name: 'Leaf (branch=false, no chevron)',
  args: { branch: false, label: 'README.md' },
};

export const WithBadge: Story = {
  args: { showBadge: true, badgeText: 'Folder' },
};

export const WithCounter: Story = {
  args: { showCounter: true, counterCount: 3, counterTotal: 12 },
};

export const NestedTier: Story = {
  name: 'Nested tier (tier=3 indentation)',
  args: { tier: 3, label: 'Q3 Launch' },
};
