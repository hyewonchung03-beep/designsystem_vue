import type { Meta, StoryObj } from '@storybook/react';
import { MapviewPinIcon } from '../components/Mapview/MapviewPinIcon';

const meta = {
  title: 'Components/Mapview/MapviewPinIcon',
  component: MapviewPinIcon,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['operation', 'device', 'environment', 'NRF'] },
    option: { control: 'select', options: [
      'oos', 'low', 'misplaced',
      'gateway', 'esl1.3', 'esl2.6', 'esl4.2', 'LCD', 'EPD', 'newtoneye', 'powerrail', 's-ward', 'trace',
      'humid+temp', 'humid', 'temp',
      'not yet', 'done',
    ]},
    showNumber: { control: 'boolean' },
    count: { control: 'number' },
  },
  args: {
    type: 'NRF',
    option: 'not yet',
    showNumber: false,
    count: 2,
  },
  decorators: [
    (Story: React.FC) => (
      <div className="p-6 flex items-center gap-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MapviewPinIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NRFNotYet: Story = {
  name: 'NRF / not yet',
  args: { type: 'NRF', option: 'not yet' },
};

export const NRFNotYetWithNumber: Story = {
  name: 'NRF / not yet + number',
  args: { type: 'NRF', option: 'not yet', showNumber: true, count: 2 },
};

export const NRFDone: Story = {
  name: 'NRF / done',
  args: { type: 'NRF', option: 'done' },
};

export const OperationAll: Story = {
  name: 'operation — all options',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {(['oos', 'low', 'misplaced'] as const).map((opt) => (
        <div key={opt} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <MapviewPinIcon type="operation" option={opt} />
          <span style={{ fontSize: 10 }}>{opt}</span>
        </div>
      ))}
    </div>
  ),
};

export const DeviceAll: Story = {
  name: 'device — all options',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      {(['gateway', 'esl1.3', 'esl2.6', 'esl4.2', 'LCD', 'EPD', 'newtoneye', 'powerrail', 's-ward', 'trace'] as const).map((opt) => (
        <div key={opt} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <MapviewPinIcon type="device" option={opt} />
          <span style={{ fontSize: 10 }}>{opt}</span>
        </div>
      ))}
    </div>
  ),
};

export const EnvironmentAll: Story = {
  name: 'environment — all options',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {(['humid', 'temp', 'humid+temp'] as const).map((opt) => (
        <div key={opt} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <MapviewPinIcon type="environment" option={opt} />
          <span style={{ fontSize: 10 }}>{opt}</span>
        </div>
      ))}
    </div>
  ),
};
