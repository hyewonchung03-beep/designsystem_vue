import type { Meta, StoryObj } from '@storybook/react';
import TextInput from '../components/TextInput/TextInput';

const meta = {
  title: 'Components/Input/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'error', 'disabled', 'readonly'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    showLeadingIcon: { control: 'boolean' },
    showTrailingIcon: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
    required: { control: 'boolean' },
    maxLength: { control: 'number' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Helper text',
    state: 'default',
    size: 'md',
    showLeadingIcon: false,
    showTrailingIcon: false,
    showClearButton: false,
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-40 items-start p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <TextInput {...args} className="w-60" />,
};

export const WithLabel: Story = {
  name: 'With Label',
  render: (args) => <TextInput {...args} className="w-60" />,
};

export const Required: Story = {
  name: 'Required',
  args: { required: true },
  render: (args) => <TextInput {...args} className="w-60" />,
};

export const WithLeadingIcon: Story = {
  name: 'With Leading Icon',
  args: { showLeadingIcon: true },
  render: (args) => <TextInput {...args} className="w-60" />,
};

export const WithTrailingIcon: Story = {
  name: 'With Trailing Icon',
  args: { showTrailingIcon: true },
  render: (args) => <TextInput {...args} className="w-60" />,
};

export const WithClearButton: Story = {
  name: 'With Clear Button',
  args: { showClearButton: true, defaultValue: 'Some text' },
  render: (args) => <TextInput {...args} className="w-60" />,
};

export const Focused: Story = {
  name: 'Focused',
  args: { defaultValue: 'Te', showClearButton: true, autoFocus: true },
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-text-xxs text-element-tertiary">focused · sm</p>
        <TextInput {...args} size="sm" label="Label" helperText="Helper text" className="w-60" />
      </div>
      <div>
        <p className="mb-2 text-text-xxs text-element-tertiary">focused · md</p>
        <TextInput {...args} size="md" label="Label" helperText="Helper text" className="w-60" />
      </div>
    </div>
  ),
};

export const ErrorState: Story = {
  name: 'Error',
  args: { state: 'error', defaultValue: 'Invalid input', helperText: 'Error message' },
  render: (args) => <TextInput {...args} className="w-60" />,
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { state: 'disabled', defaultValue: 'Disabled content' },
  render: (args) => <TextInput {...args} className="w-60" />,
};

export const Readonly: Story = {
  name: 'Readonly',
  args: { state: 'readonly', defaultValue: 'Read-only content' },
  render: (args) => <TextInput {...args} className="w-60" />,
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {(['sm', 'md'] as const).map((size) => (
        <div key={size}>
          <p className="mb-4 text-text-xs font-semibold uppercase text-element-tertiary">
            Size: {size}
          </p>
          <div className="grid grid-cols-6 gap-4">
            {(
              [
                { label: 'Placeholder', state: 'default' as const },
                { label: 'Filled', state: 'default' as const, defaultValue: 'Text' },
                { label: 'Focused', state: 'default' as const, defaultValue: 'Te', autoFocus: true, showClearButton: true },
                { label: 'Error', state: 'error' as const, defaultValue: 'Text', helperText: 'Error message' },
                { label: 'Disabled', state: 'disabled' as const, defaultValue: 'Text' },
                { label: 'Readonly', state: 'readonly' as const, defaultValue: 'Text' },
              ] as Array<{
                label: string;
                state: 'default' | 'error' | 'disabled' | 'readonly';
                defaultValue?: string;
                helperText?: string;
                autoFocus?: boolean;
                showClearButton?: boolean;
              }>
            ).map(({ label, state, defaultValue, helperText, autoFocus, showClearButton }) => (
              <div key={label} className="flex flex-col">
                <p className="mb-3 text-text-xs font-semibold text-element-tertiary uppercase tracking-wide">
                  {label}
                </p>
                <TextInput
                  size={size}
                  state={state}
                  label="Label"
                  helperText={helperText ?? 'Helper text'}
                  defaultValue={defaultValue}
                  placeholder="Placeholder"
                  autoFocus={autoFocus}
                  showClearButton={showClearButton}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const SmVsMd: Story = {
  name: 'Size - sm vs md',
  render: () => (
    <div className="flex gap-8 p-6">
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <p className="text-text-xs font-semibold text-element-tertiary uppercase tracking-wide">
            {size === 'sm' ? 'sm (30px)' : 'md (36px)'}
          </p>
          <TextInput
            size={size}
            label="Label"
            placeholder="Placeholder"
            helperText="Helper text"
            className="w-48"
          />
        </div>
      ))}
    </div>
  ),
};
