import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatatableHeader } from '../components/DatatableHeader/DatatableHeader';
import type { DatatableHeaderColumn } from '../components/DatatableHeader/DatatableHeader';

/* ── Sample Data ───────────────────────────────────────────────────────── */

const defaultColumns: DatatableHeaderColumn[] = [
  { key: 'name', label: 'Header', icon: 'sort' },
  { key: 'col2', label: 'Header' },
  { key: 'col3', label: 'Header' },
  { key: 'col4', label: 'Header' },
  { key: 'col5', label: 'Header', icon: 'help' },
];

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Data table/DataTableHeader',
  component: DatatableHeader,
  tags: ['autodocs'],
  argTypes: {
    showSelect: { control: 'boolean' },
    selectChecked: { control: 'boolean' },
    selectIndeterminate: { control: 'boolean' },
  },
  args: {
    columns: defaultColumns,
    showSelect: false,
    selectChecked: false,
    selectIndeterminate: false,
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatatableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Stories ─────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => <DatatableHeader {...args} className="w-[1075px]" />,
};

export const WithSelect: Story = {
  name: 'With Select Checkbox',
  args: { showSelect: true },
  render: (args) => <DatatableHeader {...args} className="w-[1075px]" />,
};

export const SelectChecked: Story = {
  name: 'Select — Checked',
  args: { showSelect: true, selectChecked: true },
  render: (args) => <DatatableHeader {...args} className="w-[1075px]" />,
};

export const SelectIndeterminate: Story = {
  name: 'Select — Indeterminate',
  args: { showSelect: true, selectIndeterminate: true },
  render: (args) => <DatatableHeader {...args} className="w-[1075px]" />,
};

/* ── Icon Variants ────────────────────────────────────────────────────── */

const iconColumns: DatatableHeaderColumn[] = [
  { key: 'c1', label: 'Sort Icon', icon: 'sort' },
  { key: 'c2', label: 'Blank Icon', icon: 'blank' },
  { key: 'c3', label: 'Help Icon', icon: 'help' },
  { key: 'c4', label: 'No Icon', icon: 'none' },
  { key: 'c5', label: 'Default' },
];

export const IconVariants: Story = {
  name: 'Icon Variants',
  args: { columns: iconColumns },
  render: (args) => <DatatableHeader {...args} className="w-[1075px]" />,
};

/* ── Three Columns ────────────────────────────────────────────────────── */

const threeColumns: DatatableHeaderColumn[] = [
  { key: 'name', label: 'Name', icon: 'sort' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions', icon: 'help' },
];

export const ThreeColumns: Story = {
  name: 'Three Columns',
  args: { columns: threeColumns },
  render: (args) => <DatatableHeader {...args} className="w-[700px]" />,
};

/* ── Interactive ──────────────────────────────────────────────────────── */

export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const [checked, setChecked] = useState(false);
    const columns: DatatableHeaderColumn[] = [
      { key: 'name', label: 'Name', icon: 'sort' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'status', label: 'Status', icon: 'help' },
    ];

    return (
      <div className="w-[900px]">
        <DatatableHeader
          columns={columns}
          showSelect
          selectChecked={checked}
          onSelectChange={setChecked}
        />
        <div className="border-x border-b border-border-solid-variant bg-surface-container px-4 py-3">
          <span className="text-text-sm leading-text-sm font-regular text-element-quaternary">
            {checked ? 'All rows selected' : 'No rows selected'}
          </span>
        </div>
      </div>
    );
  },
};

/* ── In Data table Context ─────────────────────────────────────────────────── */

export const InTableContext: Story = {
  name: 'In Data table Context',
  render: () => {
    const columns: DatatableHeaderColumn[] = [
      { key: 'name', label: 'Header', icon: 'sort' },
      { key: 'col2', label: 'Header' },
      { key: 'col3', label: 'Header' },
      { key: 'col4', label: 'Header' },
      { key: 'col5', label: 'Header', icon: 'help' },
    ];

    return (
      <div className="w-[1075px] rounded-4 border border-border-solid-variant bg-surface-container">
        <DatatableHeader columns={columns} showSelect className="rounded-t-4" />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center border-b border-border-solid-variant px-4 py-3 last:border-b-0"
          >
            <span className="text-text-md leading-text-md font-regular text-element-secondary">
              Row {i} content
            </span>
          </div>
        ))}
      </div>
    );
  },
};
