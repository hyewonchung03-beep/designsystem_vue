import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Tooltip from './Tooltip.vue';
import TooltipInfo from './TooltipInfo.vue';
import TooltipPointer from './TooltipPointer.vue';

const meta: Meta<typeof Tooltip> = {
  title: 'Pilot/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    showLeadingIcon: { control: 'boolean' },
    showTrailingIcon: { control: 'boolean' },
  },
  args: {
    text: 'Tooltip text',
    placement: 'bottom',
    showLeadingIcon: true,
    showTrailingIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Top: Story = {
  args: { placement: 'top' },
};

export const Left: Story = {
  args: { placement: 'left' },
};

export const Right: Story = {
  args: { placement: 'right' },
};

export const NoIcons: Story = {
  args: { showLeadingIcon: false, showTrailingIcon: false },
};

export const LeadingIconOnly: Story = {
  args: { showTrailingIcon: false },
};

export const Info: Story = {
  render: (args) => ({
    components: { TooltipInfo },
    setup: () => ({ args }),
    template: `<TooltipInfo v-bind="args" />`,
  }),
  args: { text: 'Info tooltip text' },
};

export const Pointer: Story = {
  render: (args) => ({
    components: { TooltipPointer },
    setup: () => ({ args }),
    template: `<TooltipPointer v-bind="args" />`,
  }),
  args: { color: 'black', size: 'sm', placement: 'start', variant: 'filled' },
  argTypes: {
    color: { control: 'select', options: ['black', 'white'] },
    size: { control: 'select', options: ['sm', 'xs'] },
    placement: { control: 'select', options: ['start', 'center', 'end'] },
    variant: { control: 'select', options: ['filled', 'outline'] },
  },
};
