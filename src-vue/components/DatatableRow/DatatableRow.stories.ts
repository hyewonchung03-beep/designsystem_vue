import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DatatableRow from './DatatableRow.vue';
import type { DatatableCellProps } from '../DatatableCell/DatatableCell.vue';

const baseCells: DatatableCellProps[] = [
  { content: 'Widget A', subText: 'SKU-1001', showSubText: true },
  { content: '42', align: 'right' },
  { content: 'Active', textType: 'semibold' },
  { content: '', textType: 'null' },
];

const meta: Meta<typeof DatatableRow> = {
  title: 'Pilot/DatatableRow',
  component: DatatableRow,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['enabled', 'disabled', 'selected'] },
    showDivider: { control: 'boolean' },
    showSelect: { control: 'boolean' },
    selectChecked: { control: 'boolean' },
  },
  args: {
    cells: baseCells,
    state: 'enabled',
    showDivider: true,
    showSelect: false,
    selectChecked: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {};

export const Disabled: Story = {
  args: { state: 'disabled' },
};

export const Selected: Story = {
  args: { state: 'selected', showSelect: true, selectChecked: true },
};

export const WithSelect: Story = {
  args: { showSelect: true },
};

export const NoDivider: Story = {
  args: { showDivider: false },
};

export const WithTrendCells: Story = {
  args: {
    cells: [
      { content: 'Revenue', showSubText: true, subText: 'This month' },
      { content: '128', showTrend: true, trendDirection: 'up', trendValue: '12', align: 'right' },
      { content: '96', showTrend: true, trendDirection: 'down', trendValue: '4', align: 'right' },
    ],
  },
};

export const MultipleRows: Story = {
  render: (args) => ({
    components: { DatatableRow },
    setup: () => ({ args, baseCells }),
    template: `
      <div>
        <DatatableRow v-bind="args" :cells="baseCells" />
        <DatatableRow v-bind="args" :cells="baseCells" state="selected" show-select :select-checked="true" />
        <DatatableRow v-bind="args" :cells="baseCells" state="disabled" :show-divider="false" />
      </div>
    `,
  }),
};
