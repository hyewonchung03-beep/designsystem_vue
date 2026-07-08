import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToolbarVertical } from '../../components/FloatingToolbar/ToolbarVertical';
import { ToolbarItem } from '../../components/FloatingToolbar/ToolbarItem';

const meta: Meta<typeof ToolbarVertical> = {
  title: 'Components/Floating Toolbar/ToolbarVertical',
  component: ToolbarVertical,
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

export const Interactive: StoryObj<typeof ToolbarVertical> = {
  render: (args) => (
    <ToolbarVertical {...args}>
      <ToolbarItem />
    </ToolbarVertical>
  ),
};

// ── With Zoom State ───────────────────────────────────────────────────────────

const MIN_ZOOM = 10;
const MAX_ZOOM = 200;

export const WithZoomState: StoryObj<typeof ToolbarVertical> = {
  name: 'With Zoom State',
  render: () => {
    const [zoom, setZoom] = useState(100);

    return (
      <div className="p-6">
        <ToolbarVertical
          onZoomIn={() => setZoom((v) => Math.min(v + 10, MAX_ZOOM))}
          onZoomOut={() => setZoom((v) => Math.max(v - 10, MIN_ZOOM))}
          disabledIn={zoom >= MAX_ZOOM}
          disabledOut={zoom <= MIN_ZOOM}
        >
          <ToolbarItem />
        </ToolbarVertical>
      </div>
    );
  },
};
