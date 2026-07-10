import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TextInput from './TextInput.vue';

const meta: Meta<typeof TextInput> = {
  title: 'Pilot/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['default', 'error', 'disabled', 'readonly'] },
    size: { control: 'select', options: ['sm', 'md'] },
    required: { control: 'boolean' },
    showLeadingIcon: { control: 'boolean' },
    showTrailingIcon: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
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
  args: { defaultValue: 'Filled value' },
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

export const Small: Story = {
  args: { size: 'sm', label: 'Label', defaultValue: 'Small value' },
};

export const WithClearButton: Story = {
  args: { label: 'Label', defaultValue: 'Clearable', showClearButton: true },
};

export const WithIcons: Story = {
  args: { label: 'Label', showLeadingIcon: true, showTrailingIcon: true },
};

export const Controlled: Story = {
  render: (args) => ({
    components: { TextInput },
    setup: () => ({ args }),
    data: () => ({ value: 'Controlled value' }),
    template: `<TextInput v-bind="args" v-model="value" />`,
  }),
  args: { label: 'Label' },
};
