import type { Meta, StoryObj } from '@storybook/react';
import { MapviewPin } from '../components/Mapview/MapviewPin';

const meta = {
  title: 'Components/Mapview/MapviewPin',
  component: MapviewPin,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['icon', 'occupancy', 'Issues'] },
    selected: { control: 'boolean' },
    showAlert: { control: 'boolean' },
    alertColor: { control: 'radio', options: ['red', 'yellow'] },
    text: { control: 'text' },
    iconType: { control: 'radio', options: ['operation', 'device', 'environment', 'NRF'] },
    iconOption: { control: 'select', options: [
      'oos', 'low', 'misplaced',
      'gateway', 'esl1.3', 'esl2.6', 'esl4.2', 'LCD', 'EPD', 'newtoneye', 'powerrail', 's-ward', 'trace',
      'humid+temp', 'humid', 'temp',
      'not yet', 'done',
    ]},
  },
  args: {
    type: 'icon',
    selected: false,
    showAlert: false,
    alertColor: 'red',
    text: 'NN',
    iconType: 'device',
    iconOption: 'gateway',
  },
  decorators: [
    (Story: React.FC) => (
      <div className="p-8" style={{ background: '#f0f0f0' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MapviewPin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconNormal: Story = {
  name: 'type=icon, selected=false',
  args: { type: 'icon', selected: false },
};

export const IconSelected: Story = {
  name: 'type=icon, selected=true',
  args: { type: 'icon', selected: true },
};

export const OccupancySelected: Story = {
  name: 'type=occupancy, selected=true',
  args: { type: 'occupancy', selected: true, text: 'NN' },
};

export const IssuesNormal: Story = {
  name: 'type=Issues, selected=false',
  args: { type: 'Issues', selected: false, text: 'NN' },
};

export const IssuesSelected: Story = {
  name: 'type=Issues, selected=true',
  args: { type: 'Issues', selected: true, text: 'NN' },
};

export const WithAlert: Story = {
  name: 'showAlert=true',
  args: { type: 'icon', selected: false, showAlert: true },
};

export const IssuesWithAlert: Story = {
  name: 'type=Issues, showAlert=true',
  args: { type: 'Issues', selected: true, text: 'NN', showAlert: true },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapviewPin type="icon" selected={false} iconType="device" iconOption="gateway" />
        <span style={{ fontSize: 10 }}>icon / normal</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapviewPin type="icon" selected={true} iconType="device" iconOption="gateway" />
        <span style={{ fontSize: 10 }}>icon / selected</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapviewPin type="icon" selected={false} iconType="device" iconOption="gateway" showAlert />
        <span style={{ fontSize: 10 }}>icon / alert</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapviewPin type="occupancy" selected={true} text="NN" />
        <span style={{ fontSize: 10 }}>occupancy / selected</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapviewPin type="Issues" selected={false} text="NN" />
        <span style={{ fontSize: 10 }}>Issues / normal</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapviewPin type="Issues" selected={true} text="NN" />
        <span style={{ fontSize: 10 }}>Issues / selected</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapviewPin type="Issues" selected={true} text="NN" showAlert />
        <span style={{ fontSize: 10 }}>Issues / selected + alert</span>
      </div>
    </div>
  ),
};
