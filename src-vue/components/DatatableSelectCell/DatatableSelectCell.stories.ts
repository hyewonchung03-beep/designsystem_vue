import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DatatableSelectCell from './DatatableSelectCell.vue';

const meta: Meta<typeof DatatableSelectCell> = {
  title: 'Pilot/DatatableSelectCell',
  component: DatatableSelectCell,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'lg'] },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'lg',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

export const Small: Story = {
  args: { size: 'sm', checked: true },
};
