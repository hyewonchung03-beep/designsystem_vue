import type { Meta, StoryObj, Decorator } from '@storybook/react';
import ToastMessage, { type ToastMessageProps } from '../components/ToastMessage/ToastMessage';

/* ── Decorators ─────────────────────────────────────────────────────────── */

const lightCanvas: Decorator = (Story) => (
  <div className="flex min-h-40 items-start p-8">
    <Story />
  </div>
);

const darkCanvas: Decorator = (Story) => (
  <div className="flex min-h-40 items-start p-8 bg-surface-base-variant">
    <Story />
  </div>
);

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Feedback/ToastMessage',
  component: ToastMessage,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error', 'default'],
    },
    inverse: { control: 'boolean' },
    text: { control: 'text' },
    description: { control: 'text' },
    actionLabel: { control: 'text' },
    showDescription: { control: 'boolean' },
    showAction: { control: 'boolean' },
    showClose: { control: 'boolean' },
  },
  args: {
    status: 'success',
    inverse: false,
    text: 'Notification Message',
    description: 'Description text',
    actionLabel: 'Action',
    showDescription: true,
    showAction: true,
    showClose: true,
  },
  decorators: [lightCanvas],
} satisfies Meta<ToastMessageProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Stories ─────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => <ToastMessage {...args} className="w-80" />,
};

export const Success: Story = {
  args: { status: 'success' },
  render: (args) => <ToastMessage {...args} className="w-80" />,
};

export const Warning: Story = {
  args: { status: 'warning' },
  render: (args) => <ToastMessage {...args} className="w-80" />,
};

export const Error: Story = {
  args: { status: 'error' },
  render: (args) => <ToastMessage {...args} className="w-80" />,
};

export const Info: Story = {
  args: { status: 'info' },
  render: (args) => <ToastMessage {...args} className="w-80" />,
};

export const DefaultStatus: Story = {
  name: 'Default (no icon)',
  args: { status: 'default' },
  render: (args) => <ToastMessage {...args} className="w-80" />,
};

export const Inverse: Story = {
  decorators: [darkCanvas],
  args: { status: 'success', inverse: true },
  render: (args) => <ToastMessage {...args} className="w-80" />,
};

export const WithoutDescription: Story = {
  name: 'Without description',
  args: { showDescription: false },
  render: (args) => <ToastMessage {...args} className="w-80" />,
};

export const WithoutAction: Story = {
  name: 'Without action',
  args: { showAction: false },
  render: (args) => <ToastMessage {...args} className="w-80" />,
};

export const WithoutClose: Story = {
  name: 'Without close',
  args: { showClose: false },
  render: (args) => <ToastMessage {...args} className="w-80" />,
};

export const TitleOnly: Story = {
  name: 'Title only',
  args: { showDescription: false, showAction: false },
  render: (args) => <ToastMessage {...args} className="w-80" />,
};

/* ── All Variants ────────────────────────────────────────────────────────── */

const statuses = ['success', 'warning', 'error', 'info', 'default'] as const;

export const AllVariants: Story = {
  name: 'All variants',
  decorators: [],
  render: () => (
    <div className="flex flex-col gap-10 p-6">
      <div>
        <p className="mb-4 text-text-xs font-semibold uppercase tracking-wide text-element-tertiary">
          Light
        </p>
        <div className="flex flex-wrap gap-4">
          {statuses.map((s) => (
            <ToastMessage key={s} status={s} className="w-60" />
          ))}
        </div>
      </div>

      <div className="rounded-4 bg-surface-base-variant p-6">
        <p className="mb-4 text-text-xs font-semibold uppercase tracking-wide text-element-tertiary">
          Inverse
        </p>
        <div className="flex flex-wrap gap-4">
          {statuses.map((s) => (
            <ToastMessage key={s} status={s} inverse className="w-60" />
          ))}
        </div>
      </div>
    </div>
  ),
};
