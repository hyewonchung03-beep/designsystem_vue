import type { Meta, StoryObj } from '@storybook/vue3-vite';
import UploadFile from './UploadFile.vue';

const meta: Meta<typeof UploadFile> = {
  title: 'Pilot/UploadFile',
  component: UploadFile,
  tags: ['autodocs'],
  argTypes: {
    showIcon: { control: 'boolean' },
  },
  args: {
    fileName: 'title.pdf',
    showIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoIcon: Story = {
  args: { showIcon: false },
};

export const LongFileName: Story = {
  args: { fileName: 'a-very-long-descriptive-file-name-example.pdf' },
};
