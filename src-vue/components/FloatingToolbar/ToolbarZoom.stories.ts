import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ToolbarZoom from './ToolbarZoom.vue';

const meta: Meta<typeof ToolbarZoom> = {
  title: 'Pilot/FloatingToolbar/ToolbarZoom',
  component: ToolbarZoom,
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

export const Default: Story = {};

export const ZoomInDisabled: Story = {
  args: { disabledIn: true },
};

export const ZoomOutDisabled: Story = {
  args: { disabledOut: true },
};

export const BothDisabled: Story = {
  args: { disabledIn: true, disabledOut: true },
};
