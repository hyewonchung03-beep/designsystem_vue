import type { Meta, StoryObj } from '@storybook/vue3-vite';
import StructuredListGrid from './StructuredListGrid.vue';
import type { StructuredListBodyCellProps } from './StructuredListBodyCell.vue';

const columnCells: StructuredListBodyCellProps[] = [
  { text: 'Label', subText: 'Description', showSubText: true },
  { text: 'Content', align: 'right' },
  { text: '128', align: 'right', showTrendIndicator: true, trendValue: '12%' },
];

const rowCells: StructuredListBodyCellProps[] = [
  { text: 'Column A' },
  { text: 'Column B', align: 'center' },
  { text: 'Column C', align: 'right' },
];

const meta: Meta<typeof StructuredListGrid> = {
  title: 'Pilot/StructuredList/StructuredListGrid',
  component: StructuredListGrid,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['column', 'row'] },
    showDivider: { control: 'boolean' },
    showSelectCell: { control: 'boolean' },
    selectCellChecked: { control: 'boolean' },
    condensed: { control: 'boolean' },
  },
  args: {
    type: 'column',
    showDivider: true,
    showSelectCell: false,
    selectCellChecked: false,
    condensed: false,
    cells: columnCells,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Column: Story = {};

export const ColumnNoDivider: Story = {
  args: { showDivider: false },
};

export const Row: Story = {
  args: { type: 'row', cells: rowCells },
};

export const RowWithSelectCell: Story = {
  args: { type: 'row', cells: rowCells, showSelectCell: true },
};

export const RowSelectCellChecked: Story = {
  args: { type: 'row', cells: rowCells, showSelectCell: true, selectCellChecked: true },
};

export const RowCondensedWithSelectCell: Story = {
  args: { type: 'row', cells: rowCells, showSelectCell: true, condensed: true },
};

export const Interactive: Story = {
  args: { type: 'row', cells: rowCells, showSelectCell: true },
  render: (args) => ({
    components: { StructuredListGrid },
    setup: () => ({ args }),
    data: () => ({ checked: args.selectCellChecked ?? false }),
    template: `
      <StructuredListGrid
        v-bind="args"
        :select-cell-checked="checked"
        @select-change="checked = $event"
      />
    `,
  }),
};
