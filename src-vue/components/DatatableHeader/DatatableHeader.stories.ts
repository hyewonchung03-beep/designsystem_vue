import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import DatatableHeader from './DatatableHeader.vue';
import type { DatatableHeaderColumn } from './DatatableHeader.vue';

const baseColumns: DatatableHeaderColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'status', label: 'Status', icon: 'help' },
  { key: 'value', label: 'Value', icon: 'blank' },
  { key: 'updated', label: 'Updated' },
];

const meta: Meta<typeof DatatableHeader> = {
  title: 'Pilot/DatatableHeader',
  component: DatatableHeader,
  tags: ['autodocs'],
  argTypes: {
    showSelect: { control: 'boolean' },
    selectChecked: { control: 'boolean' },
    selectIndeterminate: { control: 'boolean' },
  },
  args: {
    columns: baseColumns,
    showSelect: false,
    selectChecked: false,
    selectIndeterminate: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sortable: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'value', label: 'Value', sortable: true },
    ],
  },
};

export const WithSelectAll: Story = {
  args: { showSelect: true },
};

export const WithSelectAllIndeterminate: Story = {
  args: { showSelect: true, selectIndeterminate: true },
};

export const WithSelectAllChecked: Story = {
  args: { showSelect: true, selectChecked: true },
};

export const WithHelpAndBlankIcons: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'status', label: 'Status', icon: 'help' },
      { key: 'value', label: 'Value', icon: 'blank' },
    ],
  },
};

export const InteractiveSort: Story = {
  render: (args) => ({
    components: { DatatableHeader },
    setup: () => {
      const lastSort = ref('none');
      return { args, lastSort };
    },
    template: `
      <div>
        <DatatableHeader v-bind="args" @sortChange="(key, dir) => (lastSort = key + ':' + dir)" />
        <p class="mt-2 text-text-xs leading-text-xs text-element-secondary">Last sort: {{ lastSort }}</p>
      </div>
    `,
  }),
};
