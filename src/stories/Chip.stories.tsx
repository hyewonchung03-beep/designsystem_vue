/**
 * Chip stories
 *
 * Figma: combo_chip (YqKny45xSmjr76WGIXeL7P)
 *   - All variants: node 969-214498
 *   - sm selected:  node 6032-86810
 *   - md selected:  node 6032-89899
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../components/Chip/Chip';
import { IcBlank } from '../components/Icon/IcBlank';
import type { ChipSize, ChipState } from '../components/Chip/Chip';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Status indicator/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    state: { control: 'select', options: ['enabled', 'disabled', 'error'] },
    selected: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    label: 'Chip',
    size: 'md',
    state: 'enabled',
    selected: false,
  },
  decorators: [
    (Story: React.FC) => (
      <div className="flex flex-wrap gap-4 p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── sm ────────────────────────────────────────────────────────────────────────

export const SmSelected: Story = {
  name: 'sm — selected',
  args: { size: 'sm', selected: true, leftIcon: <IcBlank size={14} />, rightIcon: <IcBlank size={14} /> },
};

export const SmDefault: Story = {
  name: 'sm — default',
  args: { size: 'sm', selected: false, leftIcon: <IcBlank size={14} />, rightIcon: <IcBlank size={14} /> },
};

// ── md ────────────────────────────────────────────────────────────────────────

export const MdSelected: Story = {
  name: 'md — selected',
  args: { size: 'md', selected: true, leftIcon: <IcBlank size={16} />, rightIcon: <IcBlank size={16} /> },
};

export const MdDefault: Story = {
  name: 'md — default',
  args: { size: 'md', selected: false, leftIcon: <IcBlank size={16} />, rightIcon: <IcBlank size={16} /> },
};

// ── All Variants ──────────────────────────────────────────────────────────────

const states: ChipState[] = ['enabled', 'disabled', 'error'];
const sizes: ChipSize[] = ['sm', 'md'];

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="inline-flex flex-col gap-8 rounded-[5px] p-6">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-4">
          <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
            {size}
          </span>
          <div className="grid grid-cols-3 gap-6">
            {states.map((state) => (
              <div key={state} className="flex flex-col gap-3">
                <span className="text-text-xs leading-text-xs font-regular text-element-quaternary">
                  {state}
                </span>
                <div className="flex flex-col gap-2 items-start">
                  <Chip
                    label="Chip"
                    size={size}
                    state={state}
                    selected
                    leftIcon={<IcBlank size={size === 'sm' ? 14 : 16} />}
                    rightIcon={<IcBlank size={size === 'sm' ? 14 : 16} />}
                  />
                  <Chip
                    label="Chip"
                    size={size}
                    state={state}
                    selected={false}
                    leftIcon={<IcBlank size={size === 'sm' ? 14 : 16} />}
                    rightIcon={<IcBlank size={size === 'sm' ? 14 : 16} />}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── Icon variants ─────────────────────────────────────────────────────────────

export const IconVariants: Story = {
  name: 'Icon Variants',
  render: () => (
    <div className="inline-flex flex-col gap-4 rounded-[5px] p-6">
      <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
        icon 조합
      </span>
      <div className="flex flex-wrap gap-3 items-start">
        <Chip label="Both icons" selected leftIcon={<IcBlank size={16} />} rightIcon={<IcBlank size={16} />} />
        <Chip label="Left only" selected leftIcon={<IcBlank size={16} />} />
        <Chip label="Right only" selected rightIcon={<IcBlank size={16} />} />
        <Chip label="No icon" selected />
      </div>
    </div>
  ),
};
