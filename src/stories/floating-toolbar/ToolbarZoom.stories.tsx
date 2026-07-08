import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToolbarZoom } from '../../components/FloatingToolbar/ToolbarZoom';

const meta: Meta<typeof ToolbarZoom> = {
  title: 'Components/Floating Toolbar/ToolbarZoom',
  component: ToolbarZoom,
  parameters: { layout: 'centered' },
  argTypes: {
    disabledIn: { control: 'boolean' },
    disabledOut: { control: 'boolean' },
  },
  args: {
    disabledIn: false,
    disabledOut: false,
  },
};
export default meta;

// ── Interactive ───────────────────────────────────────────────────────────────

export const Interactive: StoryObj<typeof ToolbarZoom> = {
  render: (args) => <ToolbarZoom {...args} />,
};

// ── With Zoom State ───────────────────────────────────────────────────────────

const MIN_ZOOM = 10;
const MAX_ZOOM = 200;

export const WithZoomState: StoryObj<typeof ToolbarZoom> = {
  name: 'With Zoom State',
  render: () => {
    const [zoom, setZoom] = useState(100);

    return (
      <div className="p-6">
        <ToolbarZoom
          onZoomIn={() => setZoom((v) => Math.min(v + 10, MAX_ZOOM))}
          onZoomOut={() => setZoom((v) => Math.max(v - 10, MIN_ZOOM))}
          disabledIn={zoom >= MAX_ZOOM}
          disabledOut={zoom <= MIN_ZOOM}
        />
      </div>
    );
  },
};

// ── All States ────────────────────────────────────────────────────────────────

export const AllStates: StoryObj<typeof ToolbarZoom> = {
  name: 'All States',
  render: () => (
    <div className="flex gap-8 items-start p-6 bg-surface-default rounded-4">
      <div className="flex flex-col items-center gap-2">
        <ToolbarZoom />
        <span className="text-text-xs leading-text-xs text-element-quaternary">enabled</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ToolbarZoom disabledIn />
        <span className="text-text-xs leading-text-xs text-element-quaternary">+ disabled</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ToolbarZoom disabledOut />
        <span className="text-text-xs leading-text-xs text-element-quaternary">- disabled</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ToolbarZoom disabledIn disabledOut />
        <span className="text-text-xs leading-text-xs text-element-quaternary">all disabled</span>
      </div>
    </div>
  ),
};
