import type { Meta, StoryObj } from '@storybook/vue3-vite';
import UploadArea from './UploadArea.vue';

const meta: Meta<typeof UploadArea> = {
  title: 'Pilot/UploadArea',
  component: UploadArea,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['default', 'disabled', 'drag-active'] },
    showHint: { control: 'boolean' },
  },
  args: {
    hint: "'JPG or PNG' image with a size of '240 × 240px', up to '50KB'",
    browseLabel: 'Browse File',
    showHint: true,
    state: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {};

export const DragOver: Story = {
  args: { state: 'drag-active' },
};

export const Disabled: Story = {
  args: { state: 'disabled' },
};

export const NoHint: Story = {
  args: { showHint: false },
};

export const CustomHint: Story = {
  args: { hint: 'CSV files only, up to 10MB' },
};
