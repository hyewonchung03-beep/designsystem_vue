import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from '../components/Dropdown/Dropdown';
import { DropdownItem, DropdownGroupLabel, DropdownFooter } from '../components/Dropdown/Dropdown';

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Dropdown/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    compact: {
      control: 'boolean',
      description: 'compact(sm) / non-compact(md) 사이즈',
    },
  },
  args: {
    compact: true,
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-80 items-start p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

/* ── Items helper ───────────────────────────────────────────────────────── */

const items = Array.from({ length: 8 }, (_, i) => `Dropdown Item ${i + 1}`);

/* ── Stories ─────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => (
    <Dropdown {...args} className="w-48">
      {items.map((item, i) => (
        <DropdownItem key={item} label={item} compact={args.compact} />
      ))}
    </Dropdown>
  ),
};

export const WithSelectedItem: Story = {
  name: 'Selected item',
  render: (args) => (
    <Dropdown {...args} className="w-48">
      {items.map((item, i) => (
        <DropdownItem
          key={item}
          label={item}
          compact={args.compact}
          selected={i === 2}
        />
      ))}
    </Dropdown>
  ),
};

export const WithDisabledItem: Story = {
  name: 'Disabled items',
  render: (args) => (
    <Dropdown {...args} className="w-48">
      {items.map((item, i) => (
        <DropdownItem
          key={item}
          label={item}
          compact={args.compact}
          disabled={i === 3 || i === 5}
        />
      ))}
    </Dropdown>
  ),
};

export const NonCompact: Story = {
  name: 'Non-compact (md)',
  args: { compact: false },
  render: (args) => (
    <Dropdown {...args} className="w-48">
      {items.map((item) => (
        <DropdownItem key={item} label={item} compact={false} />
      ))}
    </Dropdown>
  ),
};

export const CheckboxType: Story = {
  name: 'Checkbox type',
  render: (args) => (
    <Dropdown {...args} className="w-48">
      {items.slice(0, 6).map((item, i) => (
        <DropdownItem
          key={item}
          label={`Select Item ${i + 1}`}
          type="checkbox"
          compact={args.compact}
          selected={i === 1 || i === 4}
        />
      ))}
    </Dropdown>
  ),
};

export const WithDescription: Story = {
  name: 'With description',
  args: { compact: false },
  render: (args) => (
    <Dropdown {...args} className="w-72">
      {items.slice(0, 5).map((item, i) => (
        <DropdownItem
          key={item}
          label={item}
          description="Description text"
          compact={false}
          selected={i === 1}
        />
      ))}
    </Dropdown>
  ),
};

export const WithGroupLabels: Story = {
  name: 'Group labels',
  render: (args) => (
    <Dropdown {...args} className="w-72">
      <DropdownGroupLabel label="Group A" compact={args.compact} />
      <DropdownItem label="Item A-1" compact={args.compact} />
      <DropdownItem label="Item A-2" compact={args.compact} />
      <DropdownItem label="Item A-3" compact={args.compact} />
      <DropdownGroupLabel label="Group B" compact={args.compact} />
      <DropdownItem label="Item B-1" compact={args.compact} />
      <DropdownItem label="Item B-2" compact={args.compact} />
    </Dropdown>
  ),
};

export const ControlFooter: Story = {
  name: 'With control footer',
  render: (args) => (
    <Dropdown {...args} className="w-72">
      {items.slice(0, 5).map((item, i) => (
        <DropdownItem
          key={item}
          label={item}
          type="checkbox"
          compact={args.compact}
          selected={i === 0 || i === 2}
        />
      ))}
      <DropdownFooter variant="control" />
    </Dropdown>
  ),
};

export const AddFooter: Story = {
  name: 'With add footer',
  render: (args) => (
    <Dropdown {...args} className="w-48">
      {items.slice(0, 4).map((item) => (
        <DropdownItem key={item} label={item} compact={args.compact} />
      ))}
      <DropdownFooter variant="add" addLabel="Add" />
    </Dropdown>
  ),
};

/* ── All Item States ────────────────────────────────────────────────────── */

export const AllItemStates: Story = {
  name: 'All item states',
  render: () => (
    <div className="flex flex-col gap-8 rounded-4 p-6">
      {/* Default type — compact */}
      <div>
        <p className="mb-3 text-text-xs font-semibold uppercase text-element-tertiary">
          Default type · Compact
        </p>
        <div className="flex items-start gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">Enabled</span>
            <div className="w-44 rounded-4 bg-surface-container-high p-1 shadow-normal">
              <DropdownItem label="Dropdown Item" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">Selected</span>
            <div className="w-44 rounded-4 bg-surface-container-high p-1 shadow-normal">
              <DropdownItem label="Dropdown Item" selected />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">Disabled</span>
            <div className="w-44 rounded-4 bg-surface-container-high p-1 shadow-normal">
              <DropdownItem label="Dropdown Item" disabled />
            </div>
          </div>
        </div>
      </div>

      {/* Default type — non-compact */}
      <div>
        <p className="mb-3 text-text-xs font-semibold uppercase text-element-tertiary">
          Default type · Non-compact
        </p>
        <div className="flex items-start gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">Enabled</span>
            <div className="w-44 rounded-4 bg-surface-container-high p-1 shadow-normal">
              <DropdownItem label="Dropdown Item" compact={false} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">Selected</span>
            <div className="w-44 rounded-4 bg-surface-container-high p-1 shadow-normal">
              <DropdownItem label="Dropdown Item" compact={false} selected />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">Disabled</span>
            <div className="w-44 rounded-4 bg-surface-container-high p-1 shadow-normal">
              <DropdownItem label="Dropdown Item" compact={false} disabled />
            </div>
          </div>
        </div>
      </div>

      {/* Checkbox type */}
      <div>
        <p className="mb-3 text-text-xs font-semibold uppercase text-element-tertiary">
          Checkbox type · Compact
        </p>
        <div className="flex items-start gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">Unchecked</span>
            <div className="w-44 rounded-4 bg-surface-container-high p-1 shadow-normal">
              <DropdownItem label="Select Item" type="checkbox" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">Checked</span>
            <div className="w-44 rounded-4 bg-surface-container-high p-1 shadow-normal">
              <DropdownItem label="Select Item" type="checkbox" selected />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">Disabled</span>
            <div className="w-44 rounded-4 bg-surface-container-high p-1 shadow-normal">
              <DropdownItem label="Select Item" type="checkbox" disabled />
            </div>
          </div>
        </div>
      </div>

      {/* Footers */}
      <div>
        <p className="mb-3 text-text-xs font-semibold uppercase text-element-tertiary">
          Footers
        </p>
        <div className="flex items-start gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">Control</span>
            <div className="w-56 rounded-4 bg-surface-container-high shadow-normal">
              <DropdownFooter variant="control" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-text-xxs text-element-quaternary">Add</span>
            <div className="w-56 rounded-4 bg-surface-container-high shadow-normal">
              <DropdownFooter variant="add" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
