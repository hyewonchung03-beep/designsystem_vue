import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import ToggleButtonGroup from './ToggleButtonGroup.vue';

const meta: Meta<typeof ToggleButtonGroup> = {
  title: 'Pilot/ToggleButtonGroup',
  component: ToggleButtonGroup,
  tags: ['autodocs'],
  args: {
    items: [{ label: 'All' }, { label: 'Active' }, { label: 'Completed' }],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBadges: Story = {
  args: {
    items: [
      { label: 'Inbox', badge: 4 },
      { label: 'Sent' },
      { label: 'Drafts', badge: 2 },
    ],
  },
};

export const WithChevron: Story = {
  args: {
    items: [
      { label: 'This week', showChevron: true },
      { label: 'This month', showChevron: true },
      { label: 'Custom' },
    ],
  },
};

export const Controlled: Story = {
  render: (args) => ({
    components: { ToggleButtonGroup },
    setup: () => {
      const selectedIndex = ref(1);
      return { args, selectedIndex };
    },
    template: `<ToggleButtonGroup v-bind="args" :selected-index="selectedIndex" @select="selectedIndex = $event" />`,
  }),
};

export const Uncontrolled: Story = {
  render: (args) => ({
    components: { ToggleButtonGroup },
    setup: () => ({ args }),
    template: `<ToggleButtonGroup v-bind="args" />`,
  }),
};
