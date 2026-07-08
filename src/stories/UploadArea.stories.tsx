import type { Meta, StoryObj } from '@storybook/react';
import { UploadArea } from '../components/Upload/UploadArea';

const meta = {
  title: 'Components/Upload/UploadArea',
  component: UploadArea,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'radio', options: ['default', 'disabled', 'drag-active'] },
    hint: { control: 'text' },
    browseLabel: { control: 'text' },
  },
  args: {
    state: 'default',
    hint: "'JPG or PNG' image with a size of '240 × 240px', up to '50KB'",
    browseLabel: 'Browse File',
  },
  decorators: [
    (Story: React.FC) => (
      <div className="p-6" style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UploadArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'state=default',
  args: { state: 'default' },
};

export const Disabled: Story = {
  name: 'state=disabled',
  args: { state: 'disabled' },
};

export const DragActive: Story = {
  name: 'state=drag-active',
  args: { state: 'drag-active' },
};
