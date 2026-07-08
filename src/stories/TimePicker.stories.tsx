import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from '../components/TimePicker/TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: { layout: 'centered' },
};
export default meta;

export const TwelveHour: StoryObj<typeof TimePicker> = {
  name: '12-hour',
  render: () => (
    <TimePicker
      format="12hour"
      defaultValue={{ hour: 12, minute: 0, second: 0, ampm: 'AM' }}
    />
  ),
};

export const TwentyFourHour: StoryObj<typeof TimePicker> = {
  name: '24-hour',
  render: () => (
    <TimePicker
      format="24hour"
      defaultValue={{ hour: 0, minute: 0, second: 0 }}
    />
  ),
};

export const HourMinuteOnly: StoryObj<typeof TimePicker> = {
  name: 'Hour + Minute (no second)',
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <TimePicker format="12hour" showSecond={false} />
      <TimePicker format="24hour" showSecond={false} />
    </div>
  ),
};

export const Interactive: StoryObj<typeof TimePicker> = {
  args: {
    format: '12hour',
    showMinute: true,
    showSecond: true,
    showFooter: true,
  },
  argTypes: {
    format: { control: 'radio', options: ['12hour', '24hour'] },
  },
};
