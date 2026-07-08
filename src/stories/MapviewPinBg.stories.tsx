import type { Meta, StoryObj } from '@storybook/react';
import { MapviewPinBg } from '../components/Mapview/MapviewPinBg';

const meta = {
  title: 'Components/Mapview/MapviewPinBg',
  component: MapviewPinBg,
  tags: ['autodocs'],
  decorators: [
    (Story: React.FC) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MapviewPinBg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'MapviewPinBg',
};
