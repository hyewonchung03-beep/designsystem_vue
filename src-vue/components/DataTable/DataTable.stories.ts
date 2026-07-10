import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DataTable from './DataTable.vue';
import type { DataTableColumn } from './DataTable.vue';

const columns: DataTableColumn[] = [
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status' },
  { key: 'owner', header: 'Owner' },
  { key: 'updated', header: 'Updated' },
];

function makeRows(count: number) {
  const statuses = ['Active', 'Paused', 'Draft'];
  const owners = ['Alex Kim', 'Jamie Lee', 'Sam Park', 'Taylor Cho'];
  return Array.from({ length: count }, (_, i) => ({
    name: `Item ${i + 1}`,
    status: statuses[i % statuses.length],
    owner: owners[i % owners.length],
    updated: `2026-0${(i % 9) + 1}-1${i % 9}`,
  }));
}

const meta: Meta<typeof DataTable> = {
  title: 'Pilot/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  args: {
    columns,
    data: makeRows(24),
    perPage: 10,
    showToolbar: true,
    showPagination: true,
    selectable: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selectable: Story = {
  args: { selectable: true },
};

export const SmallDataset: Story = {
  args: { data: makeRows(5), showPagination: true },
  name: 'Small dataset (single page, pagination hidden)',
};

export const WithoutToolbar: Story = {
  args: { showToolbar: false },
};

export const WithCustomRender: Story = {
  args: {
    columns: [
      ...columns,
      {
        key: 'status',
        header: 'Status Badge',
        render: (value) => `[${String(value)}]`,
      },
    ],
    data: makeRows(12),
  },
  name: 'With render prop (custom cell content)',
};
