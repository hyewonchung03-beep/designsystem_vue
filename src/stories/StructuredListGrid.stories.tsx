import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StructuredListGrid } from '../components/StructuredList/StructuredListGrid';

const meta: Meta<typeof StructuredListGrid> = {
  title: 'Components/Structured list/StructuredListGrid',
  component: StructuredListGrid,
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'radio', options: ['column', 'row'] },
    showDivider: { control: 'boolean' },
    showSelectCell: { control: 'boolean' },
    condensed: { control: 'boolean' },
  },
};
export default meta;

// ── Column ────────────────────────────────────────────────────────────────────

export const Column: StoryObj<typeof StructuredListGrid> = {
  args: {
    type: 'column',
    showDivider: true,
  },
  render: ({ showDivider }) => (
    <StructuredListGrid
      type="column"
      showDivider={showDivider}
      style={{ width: 160 }}
      cells={[
        { text: 'Content 1' },
        { text: 'Content 2' },
        { text: 'Content 3' },
        { text: 'Content 4' },
        { text: 'Content 5' },
      ]}
    />
  ),
};

// ── Row ───────────────────────────────────────────────────────────────────────

export const Row: StoryObj<typeof StructuredListGrid> = {
  args: {
    type: 'row',
    showDivider: true,
  },
  render: ({ showDivider }) => (
    <div style={{ width: 388 }}>
      <StructuredListGrid
        type="row"
        showDivider={showDivider}
        cells={[
          { text: 'Content' },
          { text: 'Content' },
        ]}
      />
    </div>
  ),
};

// ── Row with select cell ──────────────────────────────────────────────────────

export const RowWithSelectCell: StoryObj<typeof StructuredListGrid> = {
  args: {
    type: 'row',
    showDivider: true,
    showSelectCell: true,
  },
  render: ({ showDivider, showSelectCell }) => {
    const [selected, setSelected] = useState<number | null>(null);
    return (
      <div style={{ width: 388 }}>
        {[0, 1, 2].map((i) => (
          <StructuredListGrid
            key={i}
            type="row"
            showSelectCell={showSelectCell}
            selectCellChecked={selected === i}
            onSelectChange={() => setSelected(i)}
            showDivider={i < 2 ? showDivider : false}
            cells={[
              { text: `Item ${i + 1}` },
              { text: `${(i + 1) * 100}`, align: 'right' },
            ]}
          />
        ))}
      </div>
    );
  },
};
