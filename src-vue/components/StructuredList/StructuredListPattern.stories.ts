import type { Meta, StoryObj } from '@storybook/vue3-vite';
import StructuredListPattern from './StructuredListPattern.vue';
import type { StructuredListGridProps } from './StructuredListGrid.vue';

const columnGrids: StructuredListGridProps[] = [
  {
    type: 'column',
    cells: [
      { text: 'Label', subText: 'Description', showSubText: true },
      { text: 'Content', align: 'right' },
    ],
  },
];

const rowGrids: StructuredListGridProps[] = [
  {
    type: 'row',
    showSelectCell: true,
    cells: [{ text: 'Column A' }, { text: 'Column B', align: 'center' }, { text: 'Column C', align: 'right' }],
  },
  {
    type: 'row',
    showSelectCell: true,
    cells: [{ text: 'Row 2A' }, { text: 'Row 2B', align: 'center' }, { text: 'Row 2C', align: 'right' }],
  },
];

const meta: Meta<typeof StructuredListPattern> = {
  title: 'Pilot/StructuredList/StructuredListPattern',
  component: StructuredListPattern,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    showHeader: { control: 'boolean' },
    title: { control: 'text' },
  },
  args: {
    orientation: 'horizontal',
    title: 'Section Header',
    showHeader: true,
    grids: columnGrids,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical', title: 'Details' },
};

export const NoHeader: Story = {
  args: { showHeader: false },
};

export const RowGrids: Story = {
  args: { title: 'Selectable rows', grids: rowGrids },
};

export const Interactive: Story = {
  args: { title: 'Selectable rows' },
  render: (args) => ({
    components: { StructuredListPattern },
    setup: () => ({ args }),
    data: () => ({
      checked: [false, false],
    }),
    computed: {
      grids(): StructuredListGridProps[] {
        return rowGrids.map((grid, i) => ({
          ...grid,
          selectCellChecked: this.checked[i],
          onSelectChange: (value: boolean) => {
            this.checked[i] = value;
          },
        }));
      },
    },
    template: `<StructuredListPattern v-bind="args" :grids="grids" />`,
  }),
};
