import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DatatableTree from './DatatableTree.vue';
import type { DatatableTreeColumn, DatatableTreeRow } from './DatatableTree.vue';

const columns: DatatableTreeColumn[] = [
  { key: 'name', header: 'Name' },
  { key: 'type', header: 'Type' },
  { key: 'size', header: 'Size' },
];

const rows: DatatableTreeRow[] = [
  {
    id: '1',
    label: 'Marketing',
    badge: 'Folder',
    cells: {
      type: { content: 'Folder' },
      size: { content: '12 items' },
    },
    children: [
      {
        id: '1-1',
        label: 'Campaigns',
        cells: {
          type: { content: 'Folder' },
          size: { content: '4 items' },
        },
        children: [
          {
            id: '1-1-1',
            label: 'Q3 Launch',
            cells: {
              type: { content: 'Document', subText: 'Google Doc' },
              size: { content: '2.1 MB' },
            },
          },
          {
            id: '1-1-2',
            label: 'Q4 Roadmap',
            cells: {
              type: { content: 'Spreadsheet', subText: 'Excel' },
              size: { content: '850 KB' },
            },
          },
        ],
      },
      {
        id: '1-2',
        label: 'Assets',
        cells: {
          type: { content: 'Folder' },
          size: { content: '8 items' },
        },
      },
    ],
  },
  {
    id: '2',
    label: 'Engineering',
    badge: 'Folder',
    cells: {
      type: { content: 'Folder' },
      size: { content: '30 items' },
    },
    children: [
      {
        id: '2-1',
        label: 'API Spec',
        cells: {
          type: { content: 'Document', subText: 'Markdown' },
          size: { content: '120 KB' },
        },
      },
    ],
  },
  {
    id: '3',
    label: 'README.md',
    cells: {
      type: { content: 'Document', subText: 'Markdown' },
      size: { content: '4 KB' },
    },
  },
];

const meta: Meta<typeof DatatableTree> = {
  title: 'Pilot/DatatableTree',
  component: DatatableTree,
  tags: ['autodocs'],
  args: {
    columns,
    rows,
    perPage: 10,
    showSearch: true,
    showPagination: true,
    searchPlaceholder: 'Search files',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    primaryAction: { label: 'New folder' },
    secondaryAction: { label: 'Import' },
  },
};

export const WithoutSearch: Story = {
  args: { showSearch: false },
};

export const SortableHeader: Story = {
  name: 'Sortable header (click a column sort icon)',
  args: { columns },
};

export const ManyRowsPaginated: Story = {
  args: {
    perPage: 2,
    rows,
  },
  name: 'Paginated (perPage=2)',
};
