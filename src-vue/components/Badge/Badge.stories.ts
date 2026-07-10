import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Badge from './Badge.vue';

const meta: Meta<typeof Badge> = {
  title: 'Pilot/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    type: { control: 'select', options: ['outlined', 'solid'] },
    option: {
      control: 'select',
      options: ['red', 'orange', 'yellow', 'green', 'teal', 'lightBlue', 'indigo', 'pink', 'purple', 'neutral'],
    },
    showLeftIndicator: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    label: 'Badge',
    size: 'sm',
    type: 'outlined',
    option: 'red',
    showLeftIndicator: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {};

export const Solid: Story = {
  args: { type: 'solid' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const WithLeftIndicator: Story = {
  args: { showLeftIndicator: true },
};

export const Neutral: Story = {
  args: { option: 'neutral' },
};

export const AllColors: Story = {
  render: (args) => ({
    components: { Badge },
    setup: () => ({
      args,
      options: ['red', 'orange', 'yellow', 'green', 'teal', 'lightBlue', 'indigo', 'pink', 'purple', 'neutral'],
    }),
    template: `
      <div class="flex flex-wrap gap-sol-8">
        <Badge v-for="option in options" :key="option" v-bind="args" :option="option" :label="option" />
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: `
      <Badge v-bind="args">
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
      </Badge>
    `,
  }),
};
