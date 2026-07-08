import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToolbarZoomItem } from '../../components/FloatingToolbar/ToolbarZoomItem';

const meta: Meta<typeof ToolbarZoomItem> = {
  title: 'Components/Floating Toolbar/ToolbarZoomItem',
  component: ToolbarZoomItem,
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'radio', options: ['icon', 'value'] },
    state: { control: 'radio', options: ['enabled', 'disabled'] },
    value: { control: 'text' },
  },
  args: {
    type: 'icon',
    state: 'enabled',
    value: '100%',
  },
};
export default meta;

// ── Interactive ───────────────────────────────────────────────────────────────

export const Interactive: StoryObj<typeof ToolbarZoomItem> = {
  render: (args) => <ToolbarZoomItem {...args} />,
};

// ── All Variants ──────────────────────────────────────────────────────────────

const states = ['enabled', 'disabled'] as const;

export const AllVariants: StoryObj<typeof ToolbarZoomItem> = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-6 p-6 bg-surface-default rounded-4">
      <div className="flex gap-8 items-end">
        <span className="w-16 text-text-xs leading-text-xs text-element-quaternary" />
        <span className="w-9 text-center text-text-xs leading-text-xs text-element-quaternary">icon</span>
        <span className="w-9 text-center text-text-xs leading-text-xs text-element-quaternary">value</span>
      </div>
      {states.map((state) => (
        <div key={state} className="flex gap-8 items-center">
          <span className="w-16 text-text-xs leading-text-xs text-element-quaternary">{state}</span>
          <ToolbarZoomItem type="icon" state={state} />
          <ToolbarZoomItem type="value" state={state} value="100%" />
        </div>
      ))}
    </div>
  ),
};

// ── Zoom Control ──────────────────────────────────────────────────────────────

export const ZoomControl: StoryObj<typeof ToolbarZoomItem> = {
  name: 'Zoom Control (composed)',
  render: () => {
    const [zoom, setZoom] = useState(100);

    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <div className="flex">
          <ToolbarZoomItem type="icon" onClick={() => setZoom((v) => Math.min(v + 10, 200))} className="rounded-r-none border-r-0" />
          <ToolbarZoomItem type="value" value={`${zoom}%`} onClick={() => setZoom(100)} className="rounded-none border-x-0" />
          <ToolbarZoomItem type="icon" onClick={() => setZoom((v) => Math.max(v - 10, 10))} className="rounded-l-none border-l-0" />
        </div>
        <span className="text-text-xs leading-text-xs text-element-quaternary">
          클릭해서 확인 (value 클릭 시 100% 초기화)
        </span>
      </div>
    );
  },
};
