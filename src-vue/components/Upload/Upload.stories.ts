import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Upload, { type UploadFileItem } from './Upload.vue';

const meta: Meta<typeof Upload> = {
  title: 'Pilot/Upload',
  component: Upload,
  tags: ['autodocs'],
  argTypes: {
    barState: { control: 'select', options: ['default', 'disabled', 'drag-active'] },
  },
  args: {
    hint: "'JPG or PNG' image with a size of '240 × 240px', up to '50KB'",
    browseLabel: 'Browse File',
    barState: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

const mixedFiles: UploadFileItem[] = [
  { id: '1', fileName: 'uploading.jpg', fileSize: '4.39KB', timeLeft: '2 sec left', value: 60, state: 'uploading' },
  { id: '2', fileName: 'errored-file.png', fileSize: '1.2MB', value: 0, state: 'error' },
  { id: '3', fileName: 'complete.pdf', fileSize: '890KB', value: 100, state: 'done' },
  { id: '4', fileName: 'locked-report.xlsx', fileSize: '2.1MB', value: 100, state: 'read-only' },
];

export const WithFiles: Story = {
  args: { files: mixedFiles },
};

export const AllUploading: Story = {
  args: {
    files: [
      { id: '1', fileName: 'photo-01.jpg', fileSize: '3.1MB', timeLeft: '4 sec left', value: 25, state: 'uploading' },
      { id: '2', fileName: 'photo-02.jpg', fileSize: '2.8MB', timeLeft: '1 sec left', value: 80, state: 'uploading' },
    ],
  },
};

export const DisabledArea: Story = {
  args: { barState: 'disabled', files: mixedFiles },
};
