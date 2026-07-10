import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DatatableCell from './DatatableCell.vue';

const meta: Meta<typeof DatatableCell> = {
  title: 'Pilot/DatatableCell',
  component: DatatableCell,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    align: { control: 'select', options: ['left', 'center', 'right'] },
    textType: { control: 'select', options: ['regular', 'semibold', 'null'] },
    trendDirection: { control: 'select', options: ['up', 'down'] },
    showLeftIcon: { control: 'boolean' },
    showRightIcon: { control: 'boolean' },
    showSubText: { control: 'boolean' },
    showTrend: { control: 'boolean' },
  },
  args: {
    content: 'Content',
    subText: 'Data',
    size: 'lg',
    align: 'left',
    textType: 'regular',
    showLeftIcon: false,
    showRightIcon: false,
    showSubText: false,
    showTrend: false,
    trendValue: 'N',
    trendDirection: 'up',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Regular: Story = {};

export const Semibold: Story = {
  args: { textType: 'semibold' },
};

export const NullValue: Story = {
  args: { textType: 'null' },
};

export const WithSubText: Story = {
  args: { showSubText: true },
};

export const WithLeftIcon: Story = {
  args: { showLeftIcon: true },
};

export const WithRightIcon: Story = {
  args: { showRightIcon: true },
};

export const WithTrendUp: Story = {
  args: { showTrend: true, trendDirection: 'up', trendValue: '12' },
};

export const WithTrendDown: Story = {
  args: { showTrend: true, trendDirection: 'down', trendValue: '4' },
};

export const CenterAligned: Story = {
  args: { align: 'center', showSubText: true },
};

export const RightAligned: Story = {
  args: { align: 'right', showSubText: true },
};

export const SmallSize: Story = {
  args: { size: 'sm', showSubText: true, showLeftIcon: true },
};

export const MediumSize: Story = {
  args: { size: 'md', showSubText: true, showLeftIcon: true },
};

export const FullFeatured: Story = {
  args: {
    showLeftIcon: true,
    showRightIcon: true,
    showSubText: true,
    showTrend: true,
    trendDirection: 'up',
    trendValue: '8',
  },
};
