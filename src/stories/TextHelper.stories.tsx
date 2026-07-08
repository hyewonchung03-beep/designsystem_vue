/**
 * TextHelper stories
 *
 * Figma: text_helper (YqKny45xSmjr76WGIXeL7P)
 *   - default: node 106-13839
 *   - error:   node 107-13841
 */
import type { Meta, StoryObj } from '@storybook/react';
import { TextHelper } from '../components/TextHelper/TextHelper';

const meta = {
  title: 'Components/Input/TextHelper',
  component: TextHelper,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['enabled', 'error'] },
    helperText: { control: 'text' },
  },
  args: {
    helperText: 'Helper text',
    type: 'enabled',
  },
  decorators: [
    (Story: React.FC) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextHelper>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'default',
  args: { type: 'enabled' },
};

// ── error ─────────────────────────────────────────────────────────────────────

export const Error: Story = {
  name: 'error',
  args: { type: 'error' },
};

// ── All Variants ──────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="inline-flex flex-col gap-2 rounded-[5px] p-6">
      {(['enabled', 'error'] as const).map((type) => (
        <div key={type} className="flex flex-col">
          <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
            {type}
          </span>
          <TextHelper helperText="Helper text" type={type} />
        </div>
      ))}
    </div>
  ),
};
