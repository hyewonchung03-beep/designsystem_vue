/**
 * Badge stories
 *
 * Figma: badge (YqKny45xSmjr76WGIXeL7P)
 *   - All variants: node 194-3971
 *   - Badge frame: node 1025-494154
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge/Badge';
import { IcBlank } from '../components/Icon/IcBlank';
import type { BadgeOption, BadgeType, BadgeSize } from '../components/Badge/Badge';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Status indicator/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] satisfies BadgeSize[] },
    type: { control: 'radio', options: ['outlined', 'solid'] satisfies BadgeType[] },
    option: {
      control: 'select',
      options: ['red', 'orange', 'yellow', 'green', 'teal', 'lightBlue', 'indigo', 'pink', 'purple', 'neutral'] satisfies BadgeOption[],
    },
    label: { control: 'text' },
    showLeftIndicator: { control: 'boolean' },
  },
  args: {
    label: 'Badge',
    size: 'sm',
    type: 'outlined',
    option: 'red',
  },
  decorators: [
    (Story: React.FC) => (
      <div className="flex flex-wrap items-start gap-6 p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Single stories ─────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'sm — outlined — red',
};

export const Solid: Story = {
  name: 'sm — solid — red',
  args: { type: 'solid' },
};

export const SizeMd: Story = {
  name: 'md — outlined — red',
  args: { size: 'md' },
};

export const WithLeftIndicator: Story = {
  name: 'With left indicator',
  args: { showLeftIndicator: true },
};

export const WithLeftIcon: Story = {
  name: 'With left icon',
  args: { leftIcon: <IcBlank size={16} /> },
};

export const WithRightIcon: Story = {
  name: 'With right icon',
  args: { rightIcon: <IcBlank size={16} /> },
};

// ── All Variants ───────────────────────────────────────────────────────────────

const OPTIONS: BadgeOption[] = [
  'red', 'orange', 'yellow', 'green', 'teal',
  'lightBlue', 'indigo', 'pink', 'purple', 'neutral',
];

const SIZES: BadgeSize[] = ['sm', 'md'];
const TYPES: BadgeType[] = ['outlined', 'solid'];

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <table className="border-separate border-spacing-0 rounded-4 bg-surface-default text-left">
      <thead>
        <tr>
          <th className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-tertiary w-20" />
          {OPTIONS.map((opt) => (
            <th
              key={opt}
              className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-tertiary capitalize"
            >
              {opt}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {SIZES.flatMap((size, si) =>
          TYPES.map((type, ti) => {
            const rowIdx = si * 2 + ti;
            return (
              <tr key={`${size}-${type}`} className={rowIdx % 2 === 0 ? 'bg-surface-container-lowest' : ''}>
                <td className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-quaternary whitespace-nowrap">
                  {size} / {type}
                </td>
                {OPTIONS.map((option) => (
                  <td key={option} className="px-4 py-3">
                    <Badge size={size} type={type} option={option} label="Badge" />
                  </td>
                ))}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  ),
};
