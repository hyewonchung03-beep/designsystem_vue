import type { Meta, StoryObj } from '@storybook/react';
import { Upload } from '../components/Upload/Upload';

const meta = {
  title: 'Components/Upload/Upload',
  component: Upload,
  tags: ['autodocs'],
  argTypes: {
    barState: { control: 'radio', options: ['default', 'disabled', 'drag-active'] },
    hint: { control: 'text' },
  },
  args: {
    barState: 'default',
    hint: "'JPG or PNG' image with a size of '240 × 240px', up to '50KB'",
    browseLabel: 'Browse File',
  },
  decorators: [
    (Story: React.FC) => (
      <div className="p-6" style={{ width: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {
  name: 'drop zone only (no files)',
  args: { files: [] },
};

export const WithUploadingFile: Story = {
  name: 'with uploading file',
  args: {
    files: [
      {
        id: '1',
        fileName: 'title.jpg',
        fileSize: '4.39KB',
        timeLeft: '2 sec left',
        showSubtext: true,
        value: 60,
        state: 'uploading',
      },
    ],
  },
};

export const WithMultipleFiles: Story = {
  name: 'with multiple files',
  args: {
    files: [
      {
        id: '1',
        fileName: 'title.jpg',
        fileSize: '4.39KB',
        timeLeft: '2 sec left',
        showSubtext: true,
        value: 60,
        state: 'uploading',
      },
      {
        id: '2',
        fileName: 'image_large.png',
        fileSize: '1.2MB',
        showSubtext: false,
        value: 40,
        state: 'error',
      },
    ],
  },
};
