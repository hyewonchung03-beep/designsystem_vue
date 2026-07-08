import type { Meta, StoryObj } from '@storybook/react';
import { DatatableTree } from '../components/DatatableTree/DatatableTree';
import type { DatatableTreeColumn, DatatableTreeRow } from '../components/DatatableTree/DatatableTree';

/* ── Sample Data ───────────────────────────────────────────────────────── */

const columns: DatatableTreeColumn[] = [
  { key: 'name', header: 'Header', sortable: true },
  { key: 'data1', header: 'Header', sortable: true },
  { key: 'data2', header: 'Header', sortable: true },
];

const rows: DatatableTreeRow[] = [
  {
    id: '1',
    label: 'Label',
    badge: 'Default',
    cells: {
      data1: { content: 'Content', subText: 'Data' },
      data2: { content: 'Content', subText: 'Data' },
    },
    children: [
      {
        id: '1-1',
        label: 'Label',
        cells: {
          data1: { content: 'Content', subText: 'Data' },
          data2: { content: 'Content', subText: 'Data' },
        },
        children: [
          {
            id: '1-1-1',
            label: 'Label',
            cells: {
              data1: { content: 'Content', subText: 'Data' },
              data2: { content: 'Content', subText: 'Data' },
            },
          },
          {
            id: '1-1-2',
            label: 'Label',
            cells: {
              data1: { content: 'Content', subText: 'Data' },
              data2: { content: 'Content', subText: 'Data' },
            },
          },
        ],
      },
      {
        id: '1-2',
        label: 'Label',
        cells: {
          data1: { content: 'Content', subText: 'Data' },
          data2: { content: 'Content', subText: 'Data' },
        },
      },
    ],
  },
  {
    id: '2',
    label: 'Label',
    cells: {
      data1: { content: 'Content', subText: 'Data' },
      data2: { content: 'Content', subText: 'Data' },
    },
    children: [
      {
        id: '2-1',
        label: 'Label',
        cells: {
          data1: { content: 'Content', subText: 'Data' },
          data2: { content: 'Content', subText: 'Data' },
        },
      },
    ],
  },
  {
    id: '3',
    label: 'Label',
    badge: 'Default',
    cells: {
      data1: { content: 'Content', subText: 'Data' },
      data2: { content: 'Content', subText: 'Data' },
    },
  },
  {
    id: '4',
    label: 'Label',
    cells: {
      data1: { content: 'Content', subText: 'Data' },
      data2: { content: 'Content', subText: 'Data' },
    },
  },
  {
    id: '5',
    label: 'Label',
    cells: {
      data1: { content: 'Content', subText: 'Data' },
      data2: { content: 'Content', subText: 'Data' },
    },
  },
];

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Data table/DataTableTree',
  component: DatatableTree,
  tags: ['autodocs'],
  argTypes: {
    showSearch: { control: 'boolean' },
    showPagination: { control: 'boolean' },
    perPage: { control: 'number' },
    searchPlaceholder: { control: 'text' },
  },
  args: {
    columns,
    rows,
    showSearch: true,
    showPagination: true,
    perPage: 10,
    searchPlaceholder: 'Placeholder name',
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatatableTree>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Stories ─────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => <DatatableTree {...args} className="w-[900px]" />,
};

export const WithActions: Story = {
  name: 'With Action Buttons',
  args: {
    primaryAction: { label: 'Main Button' },
    secondaryAction: { label: 'Sub Button' },
  },
  render: (args) => <DatatableTree {...args} className="w-[900px]" />,
};

export const NoSearch: Story = {
  name: 'Without Search',
  args: { showSearch: false },
  render: (args) => <DatatableTree {...args} className="w-[900px]" />,
};

export const NoPagination: Story = {
  name: 'Without Pagination',
  args: { showPagination: false },
  render: (args) => <DatatableTree {...args} className="w-[900px]" />,
};

/* ── Expanded Example ─────────────────────────────────────────────────── */

export const ExpandedTree: Story = {
  name: 'Expanded Tree',
  render: () => {
    const treeColumns: DatatableTreeColumn[] = [
      { key: 'name', header: 'Header', sortable: true },
      { key: 'status', header: 'Header', sortable: true },
      { key: 'value', header: 'Header', sortable: true },
    ];

    const treeRows: DatatableTreeRow[] = [
      {
        id: 'root-1',
        label: 'Label',
        badge: 'Default',
        cells: {
          status: { content: 'Content', subText: 'Data' },
          value: { content: 'Content', subText: 'Data' },
        },
        children: [
          {
            id: 'child-1',
            label: 'Label',
            cells: {
              status: { content: 'Content', subText: 'Data' },
              value: { content: 'Content', subText: 'Data' },
            },
            children: [
              {
                id: 'grandchild-1',
                label: 'Label',
                cells: {
                  status: { content: 'Content', subText: 'Data' },
                  value: { content: 'Content', subText: 'Data' },
                },
              },
            ],
          },
          {
            id: 'child-2',
            label: 'Label',
            cells: {
              status: { content: 'Content', subText: 'Data' },
              value: { content: 'Content', subText: 'Data' },
            },
          },
        ],
      },
      {
        id: 'root-2',
        label: 'Label',
        cells: {
          status: { content: 'Content', subText: 'Data' },
          value: { content: 'Content', subText: 'Data' },
        },
      },
    ];

    return (
      <DatatableTree
        columns={treeColumns}
        rows={treeRows}
        primaryAction={{ label: 'Main Button' }}
        secondaryAction={{ label: 'Sub Button' }}
        className="w-[900px]"
      />
    );
  },
};

/* ── Paginated ─────────────────────────────────────────────────────────── */

const manyRows: DatatableTreeRow[] = Array.from({ length: 25 }, (_, i) => ({
  id: `row-${i + 1}`,
  label: `Label ${i + 1}`,
  cells: {
    data1: { content: 'Content', subText: 'Data' },
    data2: { content: 'Content', subText: 'Data' },
  },
  ...(i % 3 === 0
    ? {
        children: [
          {
            id: `row-${i + 1}-child`,
            label: 'Label',
            cells: {
              data1: { content: 'Content', subText: 'Data' },
              data2: { content: 'Content', subText: 'Data' },
            },
          },
        ],
      }
    : {}),
}));

export const Paginated: Story = {
  name: 'With Pagination (25 rows)',
  args: {
    rows: manyRows,
    perPage: 5,
    primaryAction: { label: 'Main Button' },
    secondaryAction: { label: 'Sub Button' },
  },
  render: (args) => <DatatableTree {...args} className="w-[900px]" />,
};
