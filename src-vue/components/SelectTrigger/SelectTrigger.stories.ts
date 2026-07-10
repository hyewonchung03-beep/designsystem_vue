import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SelectTrigger from './SelectTrigger.vue';

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'closed', label: 'Closed' },
];

const meta: Meta<typeof SelectTrigger> = {
  title: 'Pilot/SelectTrigger',
  component: SelectTrigger,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['enabled', 'disabled', 'error', 'readonly'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    options: statusOptions,
    placeholder: 'Select',
    state: 'enabled',
    size: 'sm',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: 'open' },
};

export const WithBadgeCount: Story = {
  args: { defaultValue: 'open', badgeCount: 3 },
};

export const WithLeftIcon: Story = {
  render: (args) => ({
    components: { SelectTrigger },
    setup: () => ({ args }),
    template: `
      <SelectTrigger v-bind="args">
        <template #leftIcon>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </template>
      </SelectTrigger>
    `,
  }),
  args: { defaultValue: 'open' },
};

export const ErrorState: Story = {
  args: { state: 'error', defaultValue: 'closed' },
};

export const Disabled: Story = {
  args: { state: 'disabled', defaultValue: 'open' },
};

export const Readonly: Story = {
  args: { state: 'readonly', defaultValue: 'open' },
};

export const MediumSize: Story = {
  args: { size: 'md', defaultValue: 'open' },
};

export const NoOptions: Story = {
  name: 'No options (panel never opens)',
  args: { options: [] },
};
