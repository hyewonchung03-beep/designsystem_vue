import type { Meta, StoryObj } from '@storybook/vue3-vite';
import UploadItem from './UploadItem.vue';

const meta: Meta<typeof UploadItem> = {
  title: 'Pilot/UploadItem',
  component: UploadItem,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['uploading', 'error', 'done', 'read-only'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
    showSubtext: { control: 'boolean' },
    showPause: { control: 'boolean' },
    showClose: { control: 'boolean' },
    showTextButton: { control: 'boolean' },
    defaultPaused: { control: 'boolean' },
  },
  args: {
    fileName: 'title.jpg',
    fileSize: '4.39KB',
    timeLeft: '2 sec left',
    showSubtext: true,
    value: 60,
    state: 'uploading',
    showPause: true,
    showClose: true,
    showTextButton: true,
    defaultPaused: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Uploading: Story = {};

export const UploadingPaused: Story = {
  args: { defaultPaused: true },
};

export const UploadingNearDone: Story = {
  args: { value: 92, timeLeft: '1 sec left' },
};

export const Error: Story = {
  args: { state: 'error', showSubtext: false },
};

export const Done: Story = {
  args: { state: 'done' },
};

export const ReadOnly: Story = {
  args: { state: 'read-only', showTextButton: false, showClose: false },
};

export const DoneWithRetryHidden: Story = {
  args: { state: 'done', showTextButton: false },
};
