import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import SegmentedControl from './SegmentedControl.vue';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Pilot/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['outlined', 'solid'] },
    disabled: { control: 'boolean' },
  },
  args: {
    items: [{ label: 'Day' }, { label: 'Week' }, { label: 'Month' }],
    type: 'outlined',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  render: (args) => ({
    components: { SegmentedControl },
    setup: () => ({ args, selectedIndex: ref(0) }),
    template: `<SegmentedControl v-bind="args" :selected-index="selectedIndex" @select="selectedIndex = $event" />`,
  }),
};

export const Solid: Story = {
  args: { type: 'solid' },
  render: (args) => ({
    components: { SegmentedControl },
    setup: () => ({ args, selectedIndex: ref(0) }),
    template: `<SegmentedControl v-bind="args" :selected-index="selectedIndex" @select="selectedIndex = $event" />`,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const TwoItems: Story = {
  args: { items: [{ label: 'On' }, { label: 'Off' }] },
};

export const Uncontrolled: Story = {
  render: (args) => ({
    components: { SegmentedControl },
    setup: () => ({ args }),
    template: `<SegmentedControl v-bind="args" />`,
  }),
};
