/**
 * BadgeRank stories
 *
 * Figma: badge_rank (YqKny45xSmjr76WGIXeL7P)
 *   - node 130-38898
 */
import type { Meta, StoryObj } from '@storybook/react';
import { BadgeRank } from '../components/Badge/BadgeRank';
import type { BadgeRankType } from '../components/Badge/BadgeRank';

const meta = {
  title: 'Components/Status indicator/BadgeRank',
  component: BadgeRank,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['gold', 'silver', 'bronze', 'default'] satisfies BadgeRankType[] },
    size: { control: 'number' },
  },
  args: { type: 'gold', size: 24 },
  decorators: [
    (Story: React.FC) => (
      <div className="flex flex-wrap items-center gap-6 p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BadgeRank>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gold: Story = { args: { type: 'gold' } };
export const Silver: Story = { args: { type: 'silver' } };
export const Bronze: Story = { args: { type: 'bronze' } };
export const Default: Story = { args: { type: 'default' } };

const TYPES: BadgeRankType[] = ['gold', 'silver', 'bronze', 'default'];
const SIZES = [16, 24, 32] as const;

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <table className="border-separate border-spacing-0 rounded-4 bg-surface-default text-left">
      <thead>
        <tr>
          <th className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-tertiary w-16" />
          {TYPES.map((t) => (
            <th key={t} className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-tertiary">
              {t}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {SIZES.map((size, i) => (
          <tr key={size} className={i % 2 === 0 ? 'bg-surface-container-lowest' : ''}>
            <td className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-quaternary">
              {size}px
            </td>
            {TYPES.map((t) => (
              <td key={t} className="px-4 py-3">
                <BadgeRank type={t} size={size} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
