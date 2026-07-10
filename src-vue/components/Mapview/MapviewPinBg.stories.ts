import type { Meta, StoryObj } from '@storybook/vue3-vite';
import MapviewPinBg from './MapviewPinBg.vue';

const meta: Meta<typeof MapviewPinBg> = {
  title: 'Pilot/MapviewPinBg',
  component: MapviewPinBg,
  tags: ['autodocs'],
  render: (args) => ({
    components: { MapviewPinBg },
    setup: () => ({ args }),
    template: `<div style="width: 46px; height: 54px"><MapviewPinBg v-bind="args" /></div>`,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
