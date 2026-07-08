import type { Meta, StoryObj } from '@storybook/react';
import { UploadItem, type UploadItemProps } from '../components/Upload/UploadItem';

const meta = {
  title: 'Components/Upload/UploadItem',
  component: UploadItem,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'radio', options: ['uploading', 'error', 'done', 'read-only'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
    showSubtext: { control: 'boolean' },
    showPause: { control: 'boolean' },
    showClose: { control: 'boolean' },
    showTextButton: { control: 'boolean' },
  },
  args: {
    fileName: 'title.jpg',
    fileSize: '4.39KB',
    timeLeft: '2 sec left',
    showSubtext: true,
    showPause: true,
    showClose: true,
    showTextButton: true,
    value: 60,
    state: 'uploading',
  },
  decorators: [
    (Story: React.FC) => (
      <div className="p-6" style={{ width: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UploadItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Uploading: Story = {
  name: 'state=uploading',
  args: { state: 'uploading', value: 60, showSubtext: true },
};

export const UploadingNoSubtext: Story = {
  name: 'state=uploading, showSubtext=false',
  args: { state: 'uploading', value: 60, showSubtext: false },
};

export const Error: Story = {
  name: 'state=error',
  args: { state: 'error' },
};

export const Done: Story = {
  name: 'state=done',
  args: { state: 'done' },
};

export const ReadOnly: Story = {
  name: 'state=read-only',
  args: { state: 'read-only' },
};

export const AllStates: Story = {
  name: 'All States',
  render: (args: UploadItemProps) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <UploadItem {...args} state="uploading" value={60} />
      <UploadItem {...args} state="error" />
      <UploadItem {...args} state="done" />
      <UploadItem {...args} state="read-only" />
    </div>
  ),
};
