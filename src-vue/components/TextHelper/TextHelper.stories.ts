import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TextHelper from './TextHelper.vue';

const meta: Meta<typeof TextHelper> = {
  title: 'Pilot/TextHelper',
  component: TextHelper,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['enabled', 'error'] },
  },
  args: {
    helperText: 'Helper text',
    type: 'enabled',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: { type: 'error' },
};
