import type { Meta, StoryObj } from '@storybook/react';
import { DragAndDrop } from '../components/DragAndDrop/DragAndDrop';

const meta = {
  title: 'Components/DragAndDrop',
  component: DragAndDrop,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
  },
  args: {
    text: 'Drag and drop widgets on your dashboard',
  },
  decorators: [
    (Story: React.FC) => (
      <div className="flex items-center justify-center p-8 w-[514px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DragAndDrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomText: Story = {
  name: 'Custom Text',
  args: {
    text: 'Drag files here to upload',
  },
};
