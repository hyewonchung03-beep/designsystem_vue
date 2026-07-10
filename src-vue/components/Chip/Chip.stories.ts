import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Chip from './Chip.vue';

const meta: Meta<typeof Chip> = {
  title: 'Pilot/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    state: { control: 'select', options: ['enabled', 'disabled', 'error'] },
    selected: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    label: 'Chip',
    size: 'md',
    state: 'enabled',
    selected: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const Disabled: Story = {
  args: { state: 'disabled' },
};

export const Error: Story = {
  args: { state: 'error' },
};

export const ErrorSelected: Story = {
  args: { state: 'error', selected: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const SmallSelected: Story = {
  args: { size: 'sm', selected: true },
};

export const WithIcons: Story = {
  render: (args) => ({
    components: { Chip },
    setup: () => ({ args }),
    template: `
      <Chip v-bind="args">
        <template #leftIcon>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </template>
        <template #rightIcon>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </template>
      </Chip>
    `,
  }),
};

export const AllStates: Story = {
  render: (args) => ({
    components: { Chip },
    setup: () => ({ args }),
    template: `
      <div class="flex flex-wrap items-center gap-sol-8">
        <Chip v-bind="args" state="enabled" label="Enabled" />
        <Chip v-bind="args" state="enabled" :selected="true" label="Selected" />
        <Chip v-bind="args" state="disabled" label="Disabled" />
        <Chip v-bind="args" state="error" label="Error" />
        <Chip v-bind="args" state="error" :selected="true" label="Error selected" />
      </div>
    `,
  }),
};
