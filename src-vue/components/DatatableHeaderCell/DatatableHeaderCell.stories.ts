import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DatatableHeaderCell from './DatatableHeaderCell.vue';

const meta: Meta<typeof DatatableHeaderCell> = {
  title: 'Pilot/DatatableHeaderCell',
  component: DatatableHeaderCell,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    position: { control: 'select', options: ['left', 'center', 'right'] },
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoIcon: Story = {
  args: { showIcon: false },
};

export const WithPadding: Story = {
  args: { showPadding: true },
};

export const CenterPosition: Story = {
  args: { position: 'center' },
};

export const RightPosition: Story = {
  args: { position: 'right' },
};

export const SmallSize: Story = {
  args: { size: 'sm' },
};

export const MediumSize: Story = {
  args: { size: 'md' },
};

export const LargeSize: Story = {
  args: { size: 'lg' },
};
