import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import TableProgressBar from '../components/ProgressBar/TableProgressBar';
import type { ProgressBarState } from '../components/ProgressBar/ProgressBar';
import type { TableProgressBarSize } from '../components/ProgressBar/TableProgressBar';

// ── ProgressBar ────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Loading/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, description: '진행률 (0–100)' },
    size:  { control: 'select', options: ['sm', 'md'],                          description: '바 높이 (sm: 4px / md: 8px)' },
    state: { control: 'select', options: ['normal', 'info', 'success', 'warning', 'error'], description: '상태별 색상' },
    label:     { control: 'text',    description: '상단 레이블 텍스트' },
    showLabel: { control: 'boolean', description: '레이블 표시 여부' },
    showValue: { control: 'boolean', description: '퍼센트 표시 여부' },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  name: 'Size - sm',
  args: { value: 50, size: 'sm', state: 'normal', label: 'Label', showLabel: true, showValue: true },
  decorators: [(Story) => <div className="w-[392px]"><Story /></div>],
  parameters: { docs: { source: { code: `<ProgressBar value={50} size="sm" label="Label" />`, language: 'tsx' } } },
};

export const Medium: Story = {
  name: 'Size - md',
  args: { value: 50, size: 'md', state: 'normal', label: 'Label', showLabel: true, showValue: true },
  decorators: [(Story) => <div className="w-[392px]"><Story /></div>],
  parameters: { docs: { source: { code: `<ProgressBar value={50} size="md" label="Label" />`, language: 'tsx' } } },
};

export const States: Story = {
  name: 'States',
  render: () => {
    const states: Array<{ state: ProgressBarState; label: string }> = [
      { state: 'normal',  label: 'Normal' },
      { state: 'info',    label: 'Info' },
      { state: 'success', label: 'Success' },
      { state: 'warning', label: 'Warning' },
      { state: 'error',   label: 'Error' },
    ];
    return (
      <div className="flex w-[392px] flex-col gap-4">
        {states.map(({ state, label }) => (
          <ProgressBar key={state} value={50} state={state} label={label} />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<ProgressBar value={50} state="normal"  label="Normal" />
<ProgressBar value={50} state="info"    label="Info" />
<ProgressBar value={50} state="success" label="Success" />
<ProgressBar value={50} state="warning" label="Warning" />
<ProgressBar value={50} state="error"   label="Error" />`,
        language: 'tsx',
      },
    },
  },
};

export const NoLabel: Story = {
  name: 'No Label',
  args: { value: 50, size: 'sm', showLabel: false, showValue: true },
  decorators: [(Story) => <div className="w-[392px]"><Story /></div>],
  parameters: { docs: { source: { code: `<ProgressBar value={50} showLabel={false} />`, language: 'tsx' } } },
};

export const NoValue: Story = {
  name: 'No Value',
  args: { value: 50, size: 'sm', label: 'Label', showLabel: true, showValue: false },
  decorators: [(Story) => <div className="w-[392px]"><Story /></div>],
  parameters: { docs: { source: { code: `<ProgressBar value={50} showValue={false} />`, language: 'tsx' } } },
};

// ── TableProgressBar ───────────────────────────────────────────────────────

export const TableSizes: Story = {
  name: 'Data table - Sizes',
  render: () => {
    const sizes: Array<{ size: TableProgressBarSize; label: string }> = [
      { size: 'xs', label: 'xs (4px)' },
      { size: 'sm', label: 'sm (5px)' },
      { size: 'md', label: 'md (6px)' },
    ];
    return (
      <div className="flex w-[200px] flex-col gap-6">
        {sizes.map(({ size, label }) => (
          <div key={size} className="flex flex-col gap-1">
            <p className="text-text-xs leading-text-xs text-element-tertiary">{label}</p>
            <TableProgressBar value={50} size={size} showValue />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<TableProgressBar value={50} size="xs" showValue />
<TableProgressBar value={50} size="sm" showValue />
<TableProgressBar value={50} size="md" showValue />`,
        language: 'tsx',
      },
    },
  },
};

export const TableWithNumber: Story = {
  name: 'Data table - With Number',
  render: () => (
    <div className="flex w-[200px] flex-col gap-6">
      <TableProgressBar value={50} size="xs" showValue showNumber currentNumber="5" totalNumber="10" />
      <TableProgressBar value={50} size="sm" showValue showNumber currentNumber="5" totalNumber="10" />
      <TableProgressBar value={50} size="md" showValue showNumber currentNumber="5" totalNumber="10" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<TableProgressBar value={50} size="xs" showValue showNumber currentNumber="5" totalNumber="10" />
<TableProgressBar value={50} size="sm" showValue showNumber currentNumber="5" totalNumber="10" />
<TableProgressBar value={50} size="md" showValue showNumber currentNumber="5" totalNumber="10" />`,
        language: 'tsx',
      },
    },
  },
};

export const TableValues: Story = {
  name: 'Data table - Values',
  render: () => (
    <div className="flex w-[200px] flex-col gap-3">
      {[0, 25, 50, 75, 100].map((v) => (
        <TableProgressBar key={v} value={v} size="xs" showValue />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<TableProgressBar value={0}   size="xs" showValue />
<TableProgressBar value={25}  size="xs" showValue />
<TableProgressBar value={50}  size="xs" showValue />
<TableProgressBar value={75}  size="xs" showValue />
<TableProgressBar value={100} size="xs" showValue />`,
        language: 'tsx',
      },
    },
  },
};
