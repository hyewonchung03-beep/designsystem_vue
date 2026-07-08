import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatatableRow } from '../components/DatatableRow/DatatableRow';
import type { DatatableCellProps } from '../components/DatatableCell/DatatableCell';

/* ── Sample Data ───────────────────────────────────────────────────────── */

const defaultCells: DatatableCellProps[] = [
  { content: 'Content', subText: 'Data' },
  { content: 'Content', subText: 'Data' },
  { content: 'Content', subText: 'Data' },
  { content: 'Content', subText: 'Data' },
  { content: 'Content', subText: 'Data' },
];

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Data table/DataTableRow',
  component: DatatableRow,
  tags: ['autodocs'],
  argTypes: {
    showDivider: { control: 'boolean' },
    showSelect: { control: 'boolean' },
    selectChecked: { control: 'boolean' },
    state: {
      control: 'select',
      options: ['enabled', 'disabled', 'selected'],
    },
  },
  args: {
    cells: defaultCells,
    showDivider: true,
    showSelect: false,
    selectChecked: false,
    state: 'enabled',
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatatableRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Stories ─────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => <DatatableRow {...args} className="w-[1075px]" />,
};

export const NoDivider: Story = {
  name: 'Without Divider',
  args: { showDivider: false },
  render: (args) => <DatatableRow {...args} className="w-[1075px]" />,
};

export const WithSelect: Story = {
  name: 'With Select Checkbox',
  args: { showSelect: true },
  render: (args) => <DatatableRow {...args} className="w-[1075px]" />,
};

export const Selected: Story = {
  name: 'Selected State',
  args: { showSelect: true, selectChecked: true, state: 'selected' },
  render: (args) => <DatatableRow {...args} className="w-[1075px]" />,
};

export const Disabled: Story = {
  name: 'Disabled State',
  args: { state: 'disabled' },
  render: (args) => <DatatableRow {...args} className="w-[1075px]" />,
};

/* ── Three Columns ────────────────────────────────────────────────────── */

const threeCells: DatatableCellProps[] = [
  { content: 'John Doe', subText: 'john@example.com' },
  { content: 'Admin', subText: 'Full access' },
  { content: 'Active', subText: 'Since 2024' },
];

export const ThreeColumns: Story = {
  name: 'Three Columns',
  args: { cells: threeCells },
  render: (args) => <DatatableRow {...args} className="w-[700px]" />,
};

/* ── Interactive ──────────────────────────────────────────────────────── */

export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <DatatableRow
        cells={defaultCells}
        showSelect
        selectChecked={selected}
        onSelectChange={setSelected}
        state={selected ? 'selected' : 'enabled'}
        className="w-[1075px]"
      />
    );
  },
};

/* ── Multiple Rows ────────────────────────────────────────────────────── */

export const MultipleRows: Story = {
  name: 'Multiple Rows',
  render: () => {
    const rows = [
      [
        { content: 'Alice', subText: 'alice@co.com' },
        { content: 'Editor', subText: 'Limited' },
        { content: 'Active', subText: '2024-01' },
      ],
      [
        { content: 'Bob', subText: 'bob@co.com' },
        { content: 'Viewer', subText: 'Read only' },
        { content: 'Inactive', subText: '2023-06' },
      ],
      [
        { content: 'Carol', subText: 'carol@co.com' },
        { content: 'Admin', subText: 'Full access' },
        { content: 'Active', subText: '2024-03' },
      ],
    ];

    return (
      <div className="w-[800px] rounded-4 border border-border-solid-variant bg-surface-container">
        {rows.map((cells, idx) => (
          <DatatableRow
            key={idx}
            cells={cells}
            showDivider={idx < rows.length - 1}
            showSelect
          />
        ))}
      </div>
    );
  },
};
