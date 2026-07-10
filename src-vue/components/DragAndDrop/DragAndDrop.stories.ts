import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DragAndDrop from './DragAndDrop.vue';

const meta: Meta<typeof DragAndDrop> = {
  title: 'Pilot/DragAndDrop',
  component: DragAndDrop,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
  },
  args: {
    text: 'Drag and drop widgets on your dashboard',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomText: Story = {
  args: { text: 'Drag widgets here to add them to your dashboard' },
};

export const NoText: Story = {
  args: { text: '' },
};
