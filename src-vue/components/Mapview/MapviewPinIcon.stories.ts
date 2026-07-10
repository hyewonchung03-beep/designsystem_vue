import type { Meta, StoryObj } from '@storybook/vue3-vite';
import MapviewPinIcon from './MapviewPinIcon.vue';

const meta: Meta<typeof MapviewPinIcon> = {
  title: 'Pilot/MapviewPinIcon',
  component: MapviewPinIcon,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['operation', 'device', 'environment', 'NRF'] },
    option: {
      control: 'select',
      options: [
        'oos', 'low', 'misplaced',
        'gateway', 'esl1.3', 'esl2.6', 'esl4.2', 'LCD', 'EPD', 'newtoneye', 'powerrail', 's-ward', 'trace',
        'humid+temp', 'humid', 'temp',
        'not yet', 'done',
      ],
    },
    showNumber: { control: 'boolean' },
    count: { control: 'number' },
    size: { control: 'number' },
  },
  args: {
    type: 'NRF',
    option: 'not yet',
    showNumber: false,
    count: 2,
    size: 28,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NrfNotYet: Story = {};

export const NrfNotYetWithCount: Story = {
  args: { showNumber: true, count: 5 },
};

export const NrfDone: Story = {
  args: { option: 'done' },
};

export const OperationOos: Story = {
  args: { type: 'operation', option: 'oos' },
};

export const OperationLow: Story = {
  args: { type: 'operation', option: 'low' },
};

export const OperationMisplaced: Story = {
  args: { type: 'operation', option: 'misplaced' },
};

export const DeviceGateway: Story = {
  args: { type: 'device', option: 'gateway' },
};

export const DeviceEsl13: Story = {
  args: { type: 'device', option: 'esl1.3' },
};

export const DeviceEsl26: Story = {
  args: { type: 'device', option: 'esl2.6' },
};

export const DeviceEsl42: Story = {
  args: { type: 'device', option: 'esl4.2' },
};

export const DeviceLcd: Story = {
  args: { type: 'device', option: 'LCD' },
};

export const DeviceEpd: Story = {
  args: { type: 'device', option: 'EPD' },
};

export const DeviceNewtoneye: Story = {
  args: { type: 'device', option: 'newtoneye' },
};

export const DevicePowerrail: Story = {
  args: { type: 'device', option: 'powerrail' },
};

export const DeviceSWard: Story = {
  args: { type: 'device', option: 's-ward' },
};

export const DeviceTrace: Story = {
  args: { type: 'device', option: 'trace' },
};

export const EnvironmentHumid: Story = {
  args: { type: 'environment', option: 'humid' },
};

export const EnvironmentTemp: Story = {
  args: { type: 'environment', option: 'temp' },
};

export const EnvironmentHumidTemp: Story = {
  args: { type: 'environment', option: 'humid+temp' },
};

export const LargeSize: Story = {
  args: { size: 36 },
};

export const UnknownCombo: Story = {
  args: { type: 'operation', option: 'gateway' },
};
