import type { Meta, StoryObj } from '@storybook/react';
import ToggleButtonGroup from '../components/ToggleButton/ToggleButton';

const meta = {
  title: 'Components/Button/ToggleButtonGroup',
  component: ToggleButtonGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ToggleButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ───────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: {
    items: [
      { label: 'All', showChevron: true },
      { label: 'Active' },
      { label: 'Inactive' },
      { label: 'Pending' },
      { label: 'Archived' },
    ],
    selectedIndex: 0,
  },
};

// ── With Badge ────────────────────────────────────────────────────────────

export const WithBadge: Story = {
  name: 'With Badge',
  args: {
    items: [
      { label: 'All', badge: 12, showChevron: true },
      { label: 'Active', badge: 5 },
      { label: 'Inactive', badge: 3 },
      { label: 'Pending' },
    ],
    selectedIndex: 0,
  },
};

// ── No Chevron ────────────────────────────────────────────────────────────

export const NoChevron: Story = {
  name: 'No Chevron',
  args: {
    items: [
      { label: 'Tab 1' },
      { label: 'Tab 2' },
      { label: 'Tab 3' },
    ],
    selectedIndex: 0,
  },
};

// ── Many Items ────────────────────────────────────────────────────────────

export const ManyItems: Story = {
  name: 'Many Items',
  args: {
    items: [
      { label: 'All' },
      { label: 'Design' },
      { label: 'Development' },
      { label: 'Marketing' },
      { label: 'Sales' },
      { label: 'Support' },
    ],
    selectedIndex: 2,
  },
};
