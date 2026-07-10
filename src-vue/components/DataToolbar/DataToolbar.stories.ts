import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DataToolbar from './DataToolbar.vue';

// NOTE: PerPageSelect/ColumnSelect의 open 상태는 Headless UI Listbox 내부 상태로
// 관리되며 controlled `open` prop이 외부로 노출되지 않는다. 이 프로젝트에
// play function(testing-library) 의존성이 없어(Select.stories.ts와 동일한 이유)
// "초기부터 열린 패널" 스토리는 제공하지 않는다 — Storybook 캔버스에서 "10 per page"
// 또는 "Column" 트리거를 직접 클릭해 open 상태(패널 표시, 체크마크, 포커스 링)를
// 확인한다.

const sampleColumns = ['Name', 'Status', 'Owner', 'Updated'];

const meta: Meta<typeof DataToolbar> = {
  title: 'Pilot/DataToolbar',
  component: DataToolbar,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['basic', 'action'] },
  },
  args: {
    type: 'basic',
    totalCount: 128,
    perPage: 10,
    perPageOptions: [10, 20, 50, 100],
    columns: sampleColumns,
    visibleColumns: sampleColumns,
    actionLabel: 'Action',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const BasicWithoutColumns: Story = {
  args: { columns: [], visibleColumns: [] },
};

export const WithSearchValue: Story = {
  args: { searchValue: 'quarterly report' },
};

export const ColumnToggleAvailable: Story = {
  args: { visibleColumns: ['Name', 'Status'] },
  name: 'Column toggle (click "Column" to open)',
};

export const PerPageAvailable: Story = {
  args: { perPage: 20 },
  name: 'Per-page select (click "20 per page" to open)',
};

export const ActionType: Story = {
  args: {
    type: 'action',
    showInput: true,
    showAction: true,
    showCount: false,
    showSubButton: true,
    subLabel: 'Sub',
  },
};

export const ActionWithSelectedCount: Story = {
  args: {
    type: 'action',
    showCount: true,
    selectedCount: 5,
  },
};

export const ActionWithoutSubButton: Story = {
  args: {
    type: 'action',
    showSubButton: false,
  },
};
