import type { Meta, StoryObj } from '@storybook/react';
import { DatatableHeaderCell } from '../components/DatatableHeaderCell/DatatableHeaderCell';

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Data table/DataTableHeaderCell',
  component: DatatableHeaderCell,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    position: { control: 'select', options: ['left', 'center', 'right'] },
    label: { control: 'text' },
    showIcon: { control: 'boolean' },
    showPadding: { control: 'boolean' },
  },
  args: {
    label: 'Header',
    size: 'sm',
    position: 'left',
    showIcon: true,
    showPadding: false,
  },
  decorators: [
    (Story) => (
      <div className="flex items-start p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatatableHeaderCell>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Stories ─────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => <DatatableHeaderCell {...args} className="w-[240px]" />,
};

export const NoIcon: Story = {
  name: 'Without icon',
  args: { showIcon: false },
  render: (args) => <DatatableHeaderCell {...args} className="w-[240px]" />,
};

export const WithPadding: Story = {
  name: 'With padding',
  args: { showPadding: true },
  render: (args) => <DatatableHeaderCell {...args} className="w-[240px]" />,
};

/* ── All variants grid ────────────────────────────────────────────────────── */

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="inline-flex flex-col rounded-4 border border-border-solid-variant">
      {([
        { size: 'sm', label: 'sm' },
        { size: 'md', label: 'md\n(default)' },
        { size: 'lg', label: 'lg' },
      ] as const).map(({ size, label }, i) => (
        <div
          key={size}
          className={`flex items-center ${i !== 0 ? 'border-t border-border-solid-variant' : ''}`}
        >
          {/* Size label */}
          <div className="flex w-[80px] shrink-0 items-center justify-end pr-4">
            <span className="whitespace-pre-wrap text-right text-text-xs leading-text-xs font-regular text-element-quaternary">
              {label}
            </span>
          </div>
          <div className="w-px self-stretch bg-border-solid-variant" />

          {/* 3 position columns */}
          {(['left', 'center', 'right'] as const).map((position, j) => (
            <div
              key={position}
              className={`flex w-[240px] ${j !== 0 ? 'border-l border-border-solid-variant' : ''}`}
            >
              <DatatableHeaderCell
                size={size}
                position={position}
                showPadding
                className="w-full"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
