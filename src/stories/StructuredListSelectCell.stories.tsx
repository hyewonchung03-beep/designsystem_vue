import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StructuredListSelectCell } from '../components/StructuredList/StructuredListSelectCell';

const meta: Meta<typeof StructuredListSelectCell> = {
  title: 'Components/Structured list/StructuredListSelectCell',
  component: StructuredListSelectCell,
  parameters: { layout: 'centered' },
};
export default meta;

export const AllVariants: StoryObj = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 11, color: '#888' }}>unchecked</span>
        <StructuredListSelectCell checked={false} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 11, color: '#888' }}>checked</span>
        <StructuredListSelectCell checked />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 11, color: '#888' }}>disabled</span>
        <StructuredListSelectCell disabled />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 11, color: '#888' }}>disabled checked</span>
        <StructuredListSelectCell checked disabled />
      </div>
    </div>
  ),
};

export const Condensed: StoryObj = {
  name: 'Condensed',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 11, color: '#888' }}>unchecked</span>
        <StructuredListSelectCell condensed checked={false} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 11, color: '#888' }}>checked</span>
        <StructuredListSelectCell condensed checked />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 11, color: '#888' }}>disabled</span>
        <StructuredListSelectCell condensed disabled />
      </div>
    </div>
  ),
};

export const Interactive: StoryObj = {
  name: 'Interactive (radio group)',
  render: () => {
    const [selected, setSelected] = useState<number | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <StructuredListSelectCell
              checked={selected === i}
              onChange={() => setSelected(i)}
            />
            <span style={{ fontSize: 14 }}>Row {i + 1}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const ControlledArgs: StoryObj<typeof StructuredListSelectCell> = {
  args: {
    checked: false,
    condensed: false,
    disabled: false,
  },
};
