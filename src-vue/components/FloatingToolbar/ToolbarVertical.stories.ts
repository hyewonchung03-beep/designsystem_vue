import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ToolbarVertical from './ToolbarVertical.vue';
import ToolbarItem from './ToolbarItem.vue';
import IcImage from '../Icon/IcImage.vue';
import IcHelp from '../Icon/IcHelp.vue';

const meta: Meta<typeof ToolbarVertical> = {
  title: 'Pilot/FloatingToolbar/ToolbarVertical',
  component: ToolbarVertical,
  tags: ['autodocs'],
  argTypes: {
    disabledIn: { control: 'boolean' },
    disabledOut: { control: 'boolean' },
  },
  args: {
    disabledIn: false,
    disabledOut: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithItems: Story = {
  render: (args) => ({
    components: { ToolbarVertical, ToolbarItem, IcImage, IcHelp },
    setup: () => ({ args }),
    template: `
      <ToolbarVertical v-bind="args">
        <ToolbarItem selected>
          <template #icon><IcImage :size="20" /></template>
        </ToolbarItem>
        <ToolbarItem>
          <template #icon><IcHelp :size="20" /></template>
        </ToolbarItem>
      </ToolbarVertical>
    `,
  }),
};

export const ZoomOnly: Story = {
  render: (args) => ({
    components: { ToolbarVertical },
    setup: () => ({ args }),
    template: `<ToolbarVertical v-bind="args" />`,
  }),
};

export const ZoomLimitsReached: Story = {
  args: { disabledIn: true, disabledOut: true },
  render: (args) => ({
    components: { ToolbarVertical, ToolbarItem, IcImage },
    setup: () => ({ args }),
    template: `
      <ToolbarVertical v-bind="args">
        <ToolbarItem selected>
          <template #icon><IcImage :size="20" /></template>
        </ToolbarItem>
      </ToolbarVertical>
    `,
  }),
};
