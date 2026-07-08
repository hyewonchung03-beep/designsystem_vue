/**
 * BadgeCounter stories
 *
 * Figma: badge_counter (YqKny45xSmjr76WGIXeL7P)
 *   - node 5919-78872
 */
import type { Meta, StoryObj } from '@storybook/react';
import { BadgeCounter } from '../components/Badge/BadgeCounter';

const meta = {
  title: 'Components/Status indicator/BadgeCounter',
  component: BadgeCounter,
  tags: ['autodocs'],
  argTypes: {
    count: { control: 'number' },
    total: { control: 'number' },
  },
  args: { count: 1 },
  decorators: [
    (Story: React.FC) => (
      <div className="flex flex-wrap items-center gap-6 p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BadgeCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { count: 1 } };
export const WithTotal: Story = { args: { count: 3, total: 10 } };
export const LargeCount: Story = { args: { count: 99 } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <table className="border-separate border-spacing-0 rounded-4 bg-surface-default text-left">
      <thead>
        <tr>
          <th className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-tertiary w-36" />
          <th className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-tertiary">count only</th>
          <th className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-tertiary">count / total</th>
        </tr>
      </thead>
      <tbody>
        {[1, 3, 10, 99].map((n, i) => (
          <tr key={n} className={i % 2 === 0 ? 'bg-surface-container-lowest' : ''}>
            <td className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-quaternary">
              count={n}
            </td>
            <td className="px-4 py-3">
              <BadgeCounter count={n} />
            </td>
            <td className="px-4 py-3">
              <BadgeCounter count={n} total={100} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
