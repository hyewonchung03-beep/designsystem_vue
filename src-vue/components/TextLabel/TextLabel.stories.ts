import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TextLabel from './TextLabel.vue';

const meta: Meta<typeof TextLabel> = {
  title: 'Pilot/TextLabel',
  component: TextLabel,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['md', 'sm'] },
    required: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    size: 'md',
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Required: Story = {
  args: { required: true },
};

export const RequiredSmall: Story = {
  args: { size: 'sm', required: true },
};
