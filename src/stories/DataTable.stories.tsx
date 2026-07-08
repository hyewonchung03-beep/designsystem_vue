import { useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DataTable from '../components/DataTable/DataTable';
import type { DataTableColumn } from '../components/DataTable/DataTable';

/* ── Sample data ───────────────────────────────────────────────────────── */

type Row = Record<string, unknown>;

const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status' },
  { key: 'type', header: 'Type' },
  { key: 'date', header: 'Date' },
  { key: 'owner', header: 'Owner' },
];

const sampleData: Row[] = Array.from({ length: 53 }, (_, i) => ({
  name: `Item ${i + 1}`,
  status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Inactive',
  type: i % 2 === 0 ? 'Device' : 'Label',
  date: `2026-06-${String((i % 28) + 1).padStart(2, '0')}`,
  owner: `User ${(i % 5) + 1}`,
}));

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Data table/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    perPage: {
      control: 'select',
      options: [5, 10, 20, 50],
    },
    showToolbar: { control: 'boolean' },
    showPagination: { control: 'boolean' },
    selectable: { control: 'boolean' },
  },
  args: {
    columns,
    data: sampleData,
    perPage: 10,
    showToolbar: true,
    showPagination: true,
    selectable: false,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      const ref = useRef<HTMLDivElement>(null);
      useEffect(() => {
        const content = ref.current?.closest('.storybook-preview-content');
        if (content instanceof HTMLElement) content.style.width = '100%';
      }, []);
      return (
        <div ref={ref} style={{ width: '100%', padding: '24px', boxSizing: 'border-box' }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

/* ── Stories ─────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => (
    <DataTable {...args} columns={columns} data={sampleData} />
  ),
};

export const FewRows: Story = {
  name: 'Few rows (no pagination)',
  render: (args) => (
    <DataTable
      {...args}
      columns={columns}
      data={sampleData.slice(0, 5)}
      perPage={10}
    />
  ),
};

export const WithoutToolbar: Story = {
  name: 'Without toolbar',
  args: { showToolbar: false },
  render: (args) => (
    <DataTable {...args} columns={columns} data={sampleData} />
  ),
};

export const PerPage5: Story = {
  name: '5 per page',
  args: { perPage: 5 },
  render: (args) => (
    <DataTable {...args} columns={columns} data={sampleData} />
  ),
};

export const ThreeColumns: Story = {
  name: 'Three columns',
  render: (args) => (
    <DataTable
      {...args}
      columns={columns.slice(0, 3)}
      data={sampleData}
    />
  ),
};

export const Selectable: Story = {
  name: 'With row selection',
  args: { selectable: true },
  render: (args) => (
    <DataTable {...args} columns={columns} data={sampleData} />
  ),
};
