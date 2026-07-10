import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ToastMessage from './ToastMessage.vue';

const meta: Meta<typeof ToastMessage> = {
  title: 'Pilot/ToastMessage',
  component: ToastMessage,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['success', 'info', 'warning', 'error', 'default'] },
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Info: Story = {
  args: { status: 'info' },
};

export const Warning: Story = {
  args: { status: 'warning' },
};

export const Error: Story = {
  args: { status: 'error' },
};

export const DefaultStatus: Story = {
  args: { status: 'default' },
};

export const Inverse: Story = {
  args: { inverse: true },
};

export const InverseWarning: Story = {
  args: { inverse: true, status: 'warning' },
};

export const TitleOnly: Story = {
  args: { showDescription: false, showAction: false, showClose: false },
};

export const NoClose: Story = {
  args: { showClose: false },
};

export const NoAction: Story = {
  args: { showAction: false },
};

export const AllStatuses: Story = {
  render: (args) => ({
    components: { ToastMessage },
    setup: () => ({ args, statuses: ['success', 'info', 'warning', 'error', 'default'] }),
    template: `
      <div class="flex flex-col gap-sol-8">
        <ToastMessage v-for="status in statuses" :key="status" v-bind="args" :status="status" />
      </div>
    `,
  }),
};

export const WithHandlers: Story = {
  render: (args) => ({
    components: { ToastMessage },
    setup: () => ({
      args,
      onClose: () => alert('Toast closed'),
      onAction: () => alert('Action clicked'),
    }),
    template: `<ToastMessage v-bind="args" @close="onClose" @action="onAction" />`,
  }),
};
