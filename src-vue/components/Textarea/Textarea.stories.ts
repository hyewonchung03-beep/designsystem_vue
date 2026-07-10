import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Textarea from './Textarea.vue';

const meta: Meta<typeof Textarea> = {
  title: 'Pilot/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['default', 'error', 'disabled', 'readonly'] },
    size: { control: 'select', options: ['sm', 'md'] },
    required: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    showResize: { control: 'boolean' },
  },
  args: {
    placeholder: 'Placeholder',
    state: 'default',
    size: 'md',
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: { defaultValue: 'Filled value spanning multiple lines of text.' },
};

export const WithLabel: Story = {
  args: { label: 'Label', defaultValue: 'Value' },
};

export const RequiredLabel: Story = {
  args: { label: 'Label', required: true },
};

export const WithHelperText: Story = {
  args: { label: 'Label', helperText: 'Helper text' },
};

export const Error: Story = {
  args: { label: 'Label', state: 'error', helperText: 'Error helper text', defaultValue: 'Invalid value' },
};

export const Disabled: Story = {
  args: { label: 'Label', state: 'disabled', defaultValue: 'Disabled value' },
};

export const Readonly: Story = {
  args: { label: 'Label', state: 'readonly', defaultValue: 'Readonly value' },
};

export const WithCounter: Story = {
  args: { label: 'Label', showCounter: true, maxLength: 200, defaultValue: 'Some text' },
};

export const WithAction: Story = {
  args: { label: 'Label', actionLabel: 'Action' },
};

export const NoResize: Story = {
  args: { label: 'Label', showResize: false },
};

export const Controlled: Story = {
  render: (args) => ({
    components: { Textarea },
    setup: () => ({ args }),
    data: () => ({ value: 'Controlled value' }),
    template: `<Textarea v-bind="args" v-model="value" />`,
  }),
  args: { label: 'Label' },
};
