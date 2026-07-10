import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TimePicker from './TimePicker.vue';

const meta: Meta<typeof TimePicker> = {
  title: 'Pilot/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  argTypes: {
    format: { control: 'select', options: ['12hour', '24hour'] },
    showMinute: { control: 'boolean' },
    showSecond: { control: 'boolean' },
    showFooter: { control: 'boolean' },
  },
  args: {
    format: '24hour',
    showMinute: true,
    showSecond: true,
    showFooter: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Format12Hour: Story = {
  args: { format: '12hour' },
};

export const WithPresetValue: Story = {
  args: { defaultValue: { hour: 14, minute: 30, second: 15 } },
};

export const WithPresetValue12Hour: Story = {
  args: { format: '12hour', defaultValue: { hour: 9, minute: 45, ampm: 'PM' } },
};

export const WithoutSeconds: Story = {
  args: { showSecond: false },
};

export const HourOnly: Story = {
  args: { showMinute: false, showSecond: false },
};

export const WithoutFooter: Story = {
  args: { showFooter: false },
};
