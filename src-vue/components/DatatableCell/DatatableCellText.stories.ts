import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DatatableCellText from './DatatableCellText.vue';

const meta: Meta<typeof DatatableCellText> = {
  title: 'Pilot/DatatableCellText',
  component: DatatableCellText,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['regular', 'semibold', 'null'] },
  },
  args: {
    text: 'Content',
    size: 'sm',
    type: 'regular',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Regular: Story = {};

export const Semibold: Story = {
  args: { type: 'semibold' },
};

export const NullValue: Story = {
  args: { type: 'null' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};
