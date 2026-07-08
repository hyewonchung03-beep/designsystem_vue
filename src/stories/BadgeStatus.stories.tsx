/**
 * BadgeStatus stories
 *
 * Figma: badge_status (YqKny45xSmjr76WGIXeL7P)
 *   - node 1920-114195
 */
import type { Meta, StoryObj } from '@storybook/react';
import { BadgeStatus } from '../components/Badge/BadgeStatus';
import type { BadgeStatusType, BadgeStatusSize } from '../components/Badge/BadgeStatus';

const meta = {
  title: 'Components/Status indicator/BadgeStatus',
  component: BadgeStatus,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['dot', 'number', 'new'] satisfies BadgeStatusType[] },
    size: { control: 'select', options: ['sm', 'md'] satisfies BadgeStatusSize[] },
    count: { control: 'number' },
    showBox: { control: 'boolean' },
  },
  args: { type: 'number', size: 'md', count: 3, showBox: true },
  decorators: [
    (Story: React.FC) => (
      <div className="flex flex-wrap items-center gap-6 p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BadgeStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Individual stories ───────────────────────────────────────────────────────

export const Number: Story = { args: { type: 'number', count: 3 } };
export const Dot: Story = { args: { type: 'dot' } };
export const New: Story = { args: { type: 'new' } };

export const WithBox: Story = {
  name: 'With Box (Overlay)',
  args: { type: 'number', size: 'md', count: 5, showBox: true },
};

export const CountOverflow: Story = {
  name: 'Count > 99',
  args: { type: 'number', size: 'md', count: 120, showBox: true },
};

// ─── AllVariants ──────────────────────────────────────────────────────────────

const TYPES: BadgeStatusType[] = ['dot', 'number', 'new'];
const SIZES: BadgeStatusSize[] = ['sm', 'md'];

type RowDef = {
  label: string;
  size: BadgeStatusSize;
  showBox: boolean;
};

const ROWS: RowDef[] = [
  { label: 'sm · box', size: 'sm', showBox: true },
  { label: 'md · box', size: 'md', showBox: true },
  { label: 'sm · standalone', size: 'sm', showBox: false },
  { label: 'md · standalone', size: 'md', showBox: false },
];

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <table className="border-separate border-spacing-0 rounded-4 bg-surface-default text-left">
      <thead>
        <tr>
          <th className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-tertiary w-36" />
          {TYPES.map((t) => (
            <th key={t} className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-tertiary">
              {t}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ROWS.map(({ label, size, showBox }, i) => (
          <tr key={label} className={i % 2 === 0 ? 'bg-surface-container-lowest' : ''}>
            <td className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-quaternary">
              {label}
            </td>
            {TYPES.map((type) => (
              <td key={type} className="px-4 py-3">
                <BadgeStatus type={type} size={size} count={3} showBox={showBox} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
