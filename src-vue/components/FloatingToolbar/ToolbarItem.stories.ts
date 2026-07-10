import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ToolbarItem from './ToolbarItem.vue';
import IcImage from '../Icon/IcImage.vue';

const meta: Meta<typeof ToolbarItem> = {
  title: 'Pilot/FloatingToolbar/ToolbarItem',
  component: ToolbarItem,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['enabled', 'focused', 'disabled'] },
    selected: { control: 'boolean' },
  },
  args: {
    state: 'enabled',
    selected: false,
  },
  render: (args) => ({
    components: { ToolbarItem, IcImage },
    setup: () => ({ args }),
    template: `
      <ToolbarItem v-bind="args">
        <template #icon><IcImage :size="20" /></template>
      </ToolbarItem>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const Focused: Story = {
  args: { state: 'focused' },
};

export const FocusedSelected: Story = {
  args: { state: 'focused', selected: true },
};

export const Disabled: Story = {
  args: { state: 'disabled' },
};

export const NoIcon: Story = {
  render: (args) => ({
    components: { ToolbarItem },
    setup: () => ({ args }),
    template: `<ToolbarItem v-bind="args" />`,
  }),
};
