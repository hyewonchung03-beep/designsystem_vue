import type { Meta, StoryObj } from '@storybook/react';
import { UploadFile } from '../components/Upload/UploadFile';

const meta = {
  title: 'Components/Upload/UploadFile',
  component: UploadFile,
  tags: ['autodocs'],
  argTypes: {
    fileName: { control: 'text' },
    showIcon: { control: 'boolean' },
  },
  args: {
    fileName: 'title.pdf',
    showIcon: true,
  },
  decorators: [
    (Story: React.FC) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UploadFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'default',
};

export const NoIcon: Story = {
  name: 'showIcon=false',
  args: { showIcon: false },
};

export const LongFileName: Story = {
  name: 'long file name',
  args: { fileName: 'very_long_document_filename_example.pdf' },
};
