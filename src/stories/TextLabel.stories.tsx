/**
 * TextLabel stories
 *
 * Figma: text_label (YqKny45xSmjr76WGIXeL7P)
 *   - md: node 13706-121864
 *   - sm: node 13579-132833
 */
import type { Meta, StoryObj } from '@storybook/react';
import { TextLabel } from '../components/TextLabel/TextLabel';

const meta = {
  title: 'Components/Input/TextLabel',
  component: TextLabel,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['md', 'sm'] },
    required: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    label: 'Label',
    required: false,
    size: 'md',
  },
  decorators: [
    (Story: React.FC) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── md ────────────────────────────────────────────────────────────────────────

export const Md: Story = {
  name: 'md',
  args: { size: 'md' },
};

export const MdRequired: Story = {
  name: 'md — Required',
  args: { size: 'md', required: true },
};

// ── sm ────────────────────────────────────────────────────────────────────────

export const Sm: Story = {
  name: 'sm',
  args: { size: 'sm' },
};

export const SmRequired: Story = {
  name: 'sm — Required',
  args: { size: 'sm', required: true },
};

// ── All Variants ──────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="inline-flex flex-col gap-8 rounded-[5px] p-6">
      {(['md', 'sm'] as const).map((size) => (
        <div key={size} className="flex flex-col gap-4">
          <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
            {size}
          </span>
          <div className="flex gap-10">
            <div className="flex flex-col gap-1">
              <span className="text-text-xs leading-text-xs font-regular text-element-quaternary">default</span>
              <TextLabel label="Label" size={size} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-xs leading-text-xs font-regular text-element-quaternary">required</span>
              <TextLabel label="Label" size={size} required />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
