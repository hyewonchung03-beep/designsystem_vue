import type { Meta, StoryObj } from '@storybook/vue3-vite';
import MapviewPin from './MapviewPin.vue';

const meta: Meta<typeof MapviewPin> = {
  title: 'Pilot/MapviewPin',
  component: MapviewPin,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['icon', 'occupancy', 'Issues'] },
    selected: { control: 'boolean' },
    showAlert: { control: 'boolean' },
    alertColor: { control: 'select', options: ['red', 'yellow'] },
    text: { control: 'text' },
    iconType: { control: 'select', options: ['operation', 'device', 'environment', 'NRF'] },
    iconOption: {
      control: 'select',
      options: [
        'oos', 'low', 'misplaced',
        'gateway', 'esl1.3', 'esl2.6', 'esl4.2', 'LCD', 'EPD', 'newtoneye', 'powerrail', 's-ward', 'trace',
        'humid+temp', 'humid', 'temp',
        'not yet', 'done',
      ],
    },
    showIconNumber: { control: 'boolean' },
    iconCount: { control: 'number' },
  },
  args: {
    type: 'icon',
    selected: false,
    showAlert: false,
    alertColor: 'red',
    text: 'NN',
    iconType: 'device',
    iconOption: 'gateway',
    showIconNumber: false,
    iconCount: 2,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const IconDefault: Story = {};

export const IconSelected: Story = {
  args: { selected: true },
};

export const IconNrfWithCount: Story = {
  args: { iconType: 'NRF', iconOption: 'not yet', showIconNumber: true, iconCount: 5 },
};

export const IconWithAlertRed: Story = {
  args: { showAlert: true, alertColor: 'red' },
};

export const IconWithAlertYellow: Story = {
  args: { showAlert: true, alertColor: 'yellow' },
};

export const IconSelectedWithAlert: Story = {
  args: { selected: true, showAlert: true, alertColor: 'red' },
};

export const Occupancy: Story = {
  args: { type: 'occupancy', text: '12' },
};

export const OccupancySelected: Story = {
  args: { type: 'occupancy', text: '12', selected: true },
};

export const IssuesRed: Story = {
  args: { type: 'Issues', text: '3', alertColor: 'red' },
};

export const IssuesYellow: Story = {
  args: { type: 'Issues', text: '3', alertColor: 'yellow', selected: true },
};
