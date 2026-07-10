import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Divider from './Divider.vue';

const meta: Meta<typeof Divider> = {
  title: 'Pilot/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['horizontal', 'vertical'] },
    cap: { control: 'select', options: ['round', 'square'] },
    color: { control: 'select', options: ['G150', 'G100'] },
    solid: { control: 'boolean' },
    spacing: { control: 'select', options: ['0', '12', '24'] },
  },
  args: {
    type: 'horizontal',
    cap: 'square',
    color: 'G100',
    solid: true,
    spacing: '0',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const HorizontalSpacing12: Story = {
  args: { spacing: '12' },
};

export const HorizontalSpacing24: Story = {
  args: { spacing: '24' },
};

export const RoundCap: Story = {
  args: { cap: 'round' },
};

export const ColorG150: Story = {
  args: { color: 'G150' },
};

export const NotSolid: Story = {
  args: { solid: false },
};

export const Vertical: Story = {
  args: { type: 'vertical' },
  render: (args) => ({
    components: { Divider },
    setup: () => ({ args }),
    template: `<div style="height: 48px; display: flex;"><Divider v-bind="args" /></div>`,
  }),
};
