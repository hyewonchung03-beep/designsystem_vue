import type { Meta, StoryObj } from '@storybook/vue3-vite';
import EmptyState from './EmptyState.vue';

const meta: Meta<typeof EmptyState> = {
  title: 'Pilot/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['widget', 'data', 'event', 'store'] },
  },
  args: {
    type: 'widget',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { EmptyState },
    setup: () => ({ args }),
    template: `
      <EmptyState v-bind="args">
        No data to display yet.
      </EmptyState>
    `,
  }),
};

export const WithBoldText: Story = {
  render: (args) => ({
    components: { EmptyState },
    setup: () => ({ args }),
    template: `
      <EmptyState v-bind="args">
        <strong>No results</strong> found for your search.
      </EmptyState>
    `,
  }),
};

export const WithAction: Story = {
  render: (args) => ({
    components: { EmptyState },
    setup: () => ({ args }),
    template: `
      <EmptyState v-bind="args">
        There's nothing here yet.
        <template #action>
          <button type="button" class="rounded-4 bg-tertiary px-3 py-1.5 text-text-sm font-semibold text-element-inverse">
            Add item
          </button>
        </template>
      </EmptyState>
    `,
  }),
};

export const IconOnly: Story = {};
