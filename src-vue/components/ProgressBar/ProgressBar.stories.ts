import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ProgressBar from './ProgressBar.vue';
import TableProgressBar from './TableProgressBar.vue';

const meta: Meta<typeof ProgressBar> = {
  title: 'Pilot/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    size: { control: 'select', options: ['sm', 'md'] },
    state: { control: 'select', options: ['normal', 'info', 'success', 'warning', 'error'] },
    showLabel: { control: 'boolean' },
    showValue: { control: 'boolean' },
  },
  args: {
    value: 50,
    size: 'sm',
    state: 'normal',
    label: 'Label',
    showLabel: true,
    showValue: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Info: Story = {
  args: { state: 'info' },
};

export const Success: Story = {
  args: { state: 'success', value: 80 },
};

export const Warning: Story = {
  args: { state: 'warning', value: 60 },
};

export const Error: Story = {
  args: { state: 'error', value: 20 },
};

export const NoLabel: Story = {
  args: { showLabel: false },
};

export const NoValue: Story = {
  args: { showValue: false },
};

export const TableSize: Story = {
  render: (args) => ({
    components: { TableProgressBar },
    setup: () => ({ args }),
    template: `<TableProgressBar v-bind="args" />`,
  }),
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md'] },
  },
  args: {
    value: 65,
    size: 'md',
    showValue: true,
    showNumber: true,
    currentNumber: '13',
    totalNumber: '20',
  },
};
