import type { Meta, StoryObj } from '@storybook/react';
import { StructuredListPattern } from '../components/StructuredList/StructuredListPattern';

const meta: Meta<typeof StructuredListPattern> = {
  title: 'Components/Structured list/StructuredListPattern',
  component: StructuredListPattern,
  parameters: { layout: 'centered' },
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    showHeader: { control: 'boolean' },
  },
};
export default meta;

const BODY_CELLS = [
  { text: 'Content' },
  { text: 'Content' },
  { text: 'Content' },
  { text: 'Content' },
];

const COLUMN_CELLS = [
  { text: 'Content' },
  { text: 'Content' },
  { text: 'Content' },
  { text: 'Content' },
  { text: 'Content' },
];

// ── Horizontal ────────────────────────────────────────────────────────────────

export const Horizontal: StoryObj<typeof StructuredListPattern> = {
  args: { orientation: 'horizontal', showHeader: true, title: 'Section Header' },
  render: ({ orientation, showHeader, title }) => (
    <div style={{ width: 577 }}>
      <StructuredListPattern
        orientation={orientation}
        showHeader={showHeader}
        title={title}
        grids={[
          { type: 'row', showDivider: true, cells: BODY_CELLS.map((c) => ({ ...c, condensed: true, textType: 'semibold' as const })) },
          { type: 'row', showDivider: true,  cells: BODY_CELLS },
          { type: 'row', showDivider: true,  cells: BODY_CELLS },
          { type: 'row', showDivider: true,  cells: BODY_CELLS },
          { type: 'row', showDivider: true,  cells: BODY_CELLS },
          { type: 'row', showDivider: false, cells: BODY_CELLS },
        ]}
      />
    </div>
  ),
};

// ── Vertical ──────────────────────────────────────────────────────────────────

export const Vertical: StoryObj<typeof StructuredListPattern> = {
  args: { orientation: 'vertical', showHeader: true, title: 'Section Header' },
  render: ({ orientation, showHeader, title }) => (
    <div style={{ width: 427 }}>
      <StructuredListPattern
        orientation={orientation}
        showHeader={showHeader}
        title={title}
        grids={[
          { type: 'column', showDivider: false, style: { width: 160 }, cells: COLUMN_CELLS },
          { type: 'column', showDivider: false, style: { flex: 1 },    cells: COLUMN_CELLS },
        ]}
      />
    </div>
  ),
};
