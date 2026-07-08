import type { Meta, StoryObj } from '@storybook/react';
import { DatatableCell } from '../components/DatatableCell/DatatableCell';
import type { DatatableCellSize, DatatableCellAlign, DatatableCellTextType } from '../components/DatatableCell/DatatableCell';

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Data table/DataTableBodyCell',
  component: DatatableCell,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    content: { control: 'text' },
    subText: { control: 'text' },
    textType: { control: 'select', options: ['regular', 'semibold', 'null'] },
    showLeftIcon: { control: 'boolean' },
    showRightIcon: { control: 'boolean' },
    showSubText: { control: 'boolean' },
    showTrend: { control: 'boolean' },
    trendValue: { control: 'text' },
    trendDirection: {
      control: 'select',
      options: ['up', 'down'],
    },
  },
  args: {
    content: 'Content',
    subText: 'Data',
    size: 'lg',
    align: 'left',
    showLeftIcon: true,
    showSubText: true,
  },
  decorators: [
    (Story) => (
      <div className="flex items-start p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatatableCell>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Stories ─────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => <DatatableCell {...args} className="w-60" />,
};

export const WithoutIcon: Story = {
  name: 'Without Icon',
  args: { showLeftIcon: false },
  render: (args) => <DatatableCell {...args} className="w-60" />,
};

export const WithRightIcon: Story = {
  name: 'With Right Icon',
  args: { showRightIcon: true },
  render: (args) => <DatatableCell {...args} className="w-60" />,
};

export const WithTrend: Story = {
  name: 'With Trend',
  args: { showTrend: true, trendValue: '12', trendDirection: 'up' },
  render: (args) => <DatatableCell {...args} className="w-60" />,
};

export const ContentOnly: Story = {
  name: 'Content Only',
  args: { showLeftIcon: false, showSubText: false },
  render: (args) => <DatatableCell {...args} className="w-60" />,
};

export const AlignCenter: Story = {
  name: 'Align Center',
  args: { align: 'center', showLeftIcon: false },
  render: (args) => <DatatableCell {...args} className="w-60" />,
};

export const AlignRight: Story = {
  name: 'Align Right',
  args: { align: 'right', showLeftIcon: false },
  render: (args) => <DatatableCell {...args} className="w-60" />,
};

/* ── All Sizes ──────────────────────────────────────────────────────────── */

const sizes: DatatableCellSize[] = ['sm', 'md', 'lg'];
const sizeLabels: Record<DatatableCellSize, string> = {
  sm: 'sm (34px)',
  md: 'md (40px)',
  lg: 'lg (46px)',
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="inline-flex flex-col gap-4 rounded-[5px] bg-surface-default p-6">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
            {sizeLabels[size]}
          </span>
          <DatatableCell
            size={size}
            content="Content"
            subText="Data"
            showLeftIcon
            showSubText
            className="w-60"
          />
        </div>
      ))}
    </div>
  ),
};

/* ── All Alignments ─────────────────────────────────────────────────────── */

const aligns: DatatableCellAlign[] = ['left', 'center', 'right'];
const alignLabels: Record<DatatableCellAlign, string> = {
  left: 'Left',
  center: 'Center',
  right: 'Right',
};

export const AllAlignments: Story = {
  name: 'All Alignments',
  render: () => (
    <div className="inline-flex gap-4 rounded-[5px] bg-surface-default p-6">
      {aligns.map((align) => (
        <div key={align} className="flex flex-col gap-1">
          <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
            {alignLabels[align]}
          </span>
          <DatatableCell
            align={align}
            content="Content"
            subText="Data"
            showLeftIcon
            showSubText
            className="w-60"
          />
        </div>
      ))}
    </div>
  ),
};

/* ── Text Types ─────────────────────────────────────────────────────────── */

const textTypes: DatatableCellTextType[] = ['regular', 'semibold', 'null'];

export const TextTypes: Story = {
  name: 'Text Types',
  render: () => (
    <div className="inline-flex flex-col gap-4 rounded-[5px] bg-surface-default p-6">
      {textTypes.map((textType) => (
        <div key={textType} className="flex flex-col gap-1">
          <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
            {textType}
          </span>
          <DatatableCell
            content="Content"
            size="lg"
            textType={textType}
            showLeftIcon={false}
            className="w-60"
          />
        </div>
      ))}
    </div>
  ),
};

/* ── Size × Alignment Grid ──────────────────────────────────────────────── */

export const SizeAlignGrid: Story = {
  name: 'Size × Alignment Grid',
  render: () => (
    <div className="inline-flex flex-col gap-6 rounded-[5px] bg-surface-default p-6">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
            {sizeLabels[size]}
          </span>
          <div className="grid grid-cols-3 gap-4">
            {aligns.map((align) => (
              <DatatableCell
                key={align}
                size={size}
                align={align}
                content="Content"
                subText="Data"
                showLeftIcon
                showSubText
                className="w-60"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
