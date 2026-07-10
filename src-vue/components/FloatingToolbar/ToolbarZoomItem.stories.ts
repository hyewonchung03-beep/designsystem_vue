import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ToolbarZoomItem from './ToolbarZoomItem.vue';
import IcPlus from '../Icon/IcPlus.vue';

const meta: Meta<typeof ToolbarZoomItem> = {
  title: 'Pilot/FloatingToolbar/ToolbarZoomItem',
  component: ToolbarZoomItem,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['icon', 'value'] },
    state: { control: 'select', options: ['enabled', 'disabled'] },
  },
  args: {
    type: 'icon',
    state: 'enabled',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  render: (args) => ({
    components: { ToolbarZoomItem, IcPlus },
    setup: () => ({ args }),
    template: `
      <ToolbarZoomItem v-bind="args">
        <template #icon><IcPlus :size="20" /></template>
      </ToolbarZoomItem>
    `,
  }),
};

export const IconDisabled: Story = {
  args: { state: 'disabled' },
  render: (args) => ({
    components: { ToolbarZoomItem, IcPlus },
    setup: () => ({ args }),
    template: `
      <ToolbarZoomItem v-bind="args">
        <template #icon><IcPlus :size="20" /></template>
      </ToolbarZoomItem>
    `,
  }),
};

export const Value: Story = {
  args: { type: 'value', value: '100%' },
};

export const ValueDisabled: Story = {
  args: { type: 'value', value: '100%', state: 'disabled' },
};
