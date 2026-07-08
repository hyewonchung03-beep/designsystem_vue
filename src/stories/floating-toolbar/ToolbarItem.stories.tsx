import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToolbarItem } from '../../components/FloatingToolbar/ToolbarItem';
import type { ToolbarItemState } from '../../components/FloatingToolbar/ToolbarItem';

const meta: Meta<typeof ToolbarItem> = {
  title: 'Components/Floating Toolbar/ToolbarItem',
  component: ToolbarItem,
  parameters: { layout: 'centered' },
  argTypes: {
    selected: { control: 'boolean' },
    state: { control: 'radio', options: ['enabled', 'focused', 'disabled'] },
  },
  args: {
    selected: false,
    state: 'enabled',
  },
};
export default meta;

// ── Interactive ───────────────────────────────────────────────────────────────

export const Interactive: StoryObj<typeof ToolbarItem> = {
  render: (args) => <ToolbarItem {...args} />,
};

// ── All Variants ──────────────────────────────────────────────────────────────

const states: ToolbarItemState[] = ['enabled', 'focused', 'disabled'];

export const AllVariants: StoryObj<typeof ToolbarItem> = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-6 p-6 bg-surface-default rounded-4">
      <div className="flex gap-8 items-end">
        <span className="w-16 text-text-xs leading-text-xs text-element-quaternary" />
        <span className="w-9 text-center text-text-xs leading-text-xs text-element-quaternary">not selected</span>
        <span className="w-9 text-center text-text-xs leading-text-xs text-element-quaternary">selected</span>
      </div>
      {states.map((state) => (
        <div key={state} className="flex gap-8 items-center">
          <span className="w-16 text-text-xs leading-text-xs text-element-quaternary">{state}</span>
          <ToolbarItem state={state} selected={false} />
          <ToolbarItem state={state} selected={true} />
        </div>
      ))}
    </div>
  ),
};

// ── Toggle ────────────────────────────────────────────────────────────────────

export const Toggle: StoryObj<typeof ToolbarItem> = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <div className="flex flex-col items-center gap-3 p-6">
        <ToolbarItem
          selected={selected}
          state="enabled"
          onClick={() => setSelected((v) => !v)}
        />
        <span className="text-text-xs leading-text-xs text-element-quaternary">
          {selected ? 'selected' : 'not selected'}
        </span>
      </div>
    );
  },
};
