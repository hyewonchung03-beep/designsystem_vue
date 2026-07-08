import type { Meta, StoryObj } from '@storybook/react';
import SegmentedControl from '../components/SegmentedControl/SegmentedControl';

const meta = {
  title: 'Components/Button/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean', description: '비활성화 상태' },
  },
  args: {
    items: [{ label: 'Segment 1' }, { label: 'Segment 2' }],
    selectedIndex: 0,
  },
  decorators: [
    (Story) => (
      <div className="flex items-center gap-4 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default (2 Segments) ─────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default (2 Segments)',
  args: {
    items: [{ label: 'Segment 1' }, { label: 'Segment 2' }],
    selectedIndex: 0,
  },
};

// ── 3 Segments ───────────────────────────────────────────────────────────

export const ThreeSegments: Story = {
  name: '3 Segments',
  args: {
    items: [
      { label: 'Segment 1' },
      { label: 'Segment 2' },
      { label: 'Segment 3' },
    ],
    selectedIndex: 0,
  },
};

// ── 4 Segments ───────────────────────────────────────────────────────────

export const FourSegments: Story = {
  name: '4 Segments',
  args: {
    items: [
      { label: 'Segment 1' },
      { label: 'Segment 2' },
      { label: 'Segment 3' },
      { label: 'Segment 4' },
    ],
    selectedIndex: 0,
  },
};

// ── Disabled ─────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    items: [
      { label: 'Segment 1' },
      { label: 'Segment 2' },
      { label: 'Segment 3' },
    ],
    selectedIndex: 0,
    disabled: true,
  },
};

// ── All Variants ─────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  args: {
    items: [{ label: 'Segment 1' }, { label: 'Segment 2' }],
    selectedIndex: 0,
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-text-sm text-element-secondary">2 Segments</p>
        <SegmentedControl
          items={[{ label: 'Active' }, { label: 'Inactive' }]}
          selectedIndex={0}
        />
      </div>
      <div>
        <p className="mb-2 text-text-sm text-element-secondary">3 Segments</p>
        <SegmentedControl
          items={[
            { label: 'Day' },
            { label: 'Week' },
            { label: 'Month' },
          ]}
          selectedIndex={1}
        />
      </div>
      <div>
        <p className="mb-2 text-text-sm text-element-secondary">4 Segments</p>
        <SegmentedControl
          items={[
            { label: 'All' },
            { label: 'Active' },
            { label: 'Pending' },
            { label: 'Archived' },
          ]}
          selectedIndex={2}
        />
      </div>
      <div>
        <p className="mb-2 text-text-sm text-element-secondary">Disabled</p>
        <SegmentedControl
          items={[
            { label: 'Segment 1' },
            { label: 'Segment 2' },
            { label: 'Segment 3' },
          ]}
          selectedIndex={0}
          disabled
        />
      </div>
    </div>
  ),
};
