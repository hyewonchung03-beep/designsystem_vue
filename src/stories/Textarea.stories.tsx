import type { Meta, StoryObj } from '@storybook/react';
import Textarea from '../components/Textarea/Textarea';

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Input/TextArea',
  component: Textarea,
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
    showCounter: { control: 'boolean' },
    showResize: { control: 'boolean' },
    maxLength: { control: 'number' },
    rows: { control: 'number' },
  },
  args: {
    placeholder: 'Placeholder',
    state: 'default',
    size: 'md',
    showResize: true,
    rows: 3,
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-60 items-start p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

/* ── Stories ─────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => <Textarea {...args} className="w-80" />,
};

export const WithLabel: Story = {
  name: 'With label',
  render: (args) => (
    <Textarea {...args} label="Label" className="w-80" />
  ),
};

export const WithLabelAndHelper: Story = {
  name: 'With label & helper text',
  render: (args) => (
    <Textarea
      {...args}
      label="Label"
      helperText="Helper text"
      className="w-80"
    />
  ),
};

export const WithCounter: Story = {
  name: 'With counter',
  render: (args) => (
    <Textarea
      {...args}
      label="Label"
      helperText="Helper text"
      showCounter
      maxLength={100}
      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      className="w-80"
    />
  ),
};

export const WithActionButton: Story = {
  name: 'With action button',
  render: (args) => (
    <Textarea
      {...args}
      label="Label"
      helperText="Helper text"
      showCounter
      maxLength={100}
      actionLabel="label"
      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      className="w-80"
    />
  ),
};

export const Required: Story = {
  name: 'Required',
  render: (args) => (
    <Textarea
      {...args}
      label="Label"
      helperText="Helper text"
      required
      className="w-80"
    />
  ),
};

export const ErrorState: Story = {
  name: 'Error',
  args: { state: 'error' },
  render: (args) => (
    <Textarea
      {...args}
      label="Label"
      helperText="Error message"
      defaultValue="Invalid input"
      className="w-80"
    />
  ),
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { state: 'disabled' },
  render: (args) => (
    <Textarea
      {...args}
      label="Label"
      helperText="Helper text"
      defaultValue="Disabled content"
      className="w-80"
    />
  ),
};

export const Readonly: Story = {
  name: 'Readonly',
  args: { state: 'readonly' },
  render: (args) => (
    <Textarea
      {...args}
      label="Label"
      helperText="Helper text"
      defaultValue="Read-only content"
      className="w-80"
    />
  ),
};

export const NoResize: Story = {
  name: 'No resize',
  args: { showResize: false },
  render: (args) => (
    <Textarea
      {...args}
      label="Label"
      helperText="Helper text"
      className="w-80"
    />
  ),
};

/* ── All States ─────────────────────────────────────────────────────────── */

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div className="flex flex-col gap-8 rounded-4 p-6">
      <div>
        <p className="mb-3 text-text-xs font-semibold uppercase text-element-tertiary">
          Default · Placeholder
        </p>
        <Textarea
          label="Label"
          helperText="Helper text"
          showCounter
          maxLength={100}
          className="w-80"
        />
      </div>

      <div>
        <p className="mb-3 text-text-xs font-semibold uppercase text-element-tertiary">
          Default · Filled with action
        </p>
        <Textarea
          label="Label"
          helperText="Helper text"
          showCounter
          maxLength={100}
          actionLabel="label"
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          className="w-80"
        />
      </div>

      <div>
        <p className="mb-3 text-text-xs font-semibold uppercase text-element-tertiary">
          Error
        </p>
        <Textarea
          label="Label"
          helperText="Error message"
          state="error"
          showCounter
          maxLength={100}
          defaultValue="Invalid input"
          className="w-80"
        />
      </div>

      <div>
        <p className="mb-3 text-text-xs font-semibold uppercase text-element-tertiary">
          Disabled
        </p>
        <Textarea
          label="Label"
          helperText="Helper text"
          state="disabled"
          showCounter
          maxLength={100}
          defaultValue="Disabled content"
          className="w-80"
        />
      </div>

      <div>
        <p className="mb-3 text-text-xs font-semibold uppercase text-element-tertiary">
          Readonly
        </p>
        <Textarea
          label="Label"
          helperText="Helper text"
          state="readonly"
          defaultValue="Read-only content"
          className="w-80"
        />
      </div>
    </div>
  ),
};
