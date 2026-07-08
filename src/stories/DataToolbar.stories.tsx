import { useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DataToolbar from '../components/DataToolbar/DataToolbar';

/* ── Meta ───────────────────────────────────────────────────────────────── */

const sampleColumns = ['Name', 'Status', 'Type', 'Date', 'Owner', 'Size', 'Tags'];

const meta = {
  title: 'Components/Data table/DataTableToolbar',
  component: DataToolbar,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['basic', 'action'] },
    totalCount: { control: 'number' },
    perPage: { control: 'select', options: [10, 20, 50, 100] },
    actionLabel: { control: 'text' },
    showInput: { control: 'boolean' },
    showAction: { control: 'boolean' },
    showCount: { control: 'boolean' },
    selectedCount: { control: 'number' },
    showSubButton: { control: 'boolean' },
    subLabel: { control: 'text' },
  },
  args: {
    type: 'basic',
    totalCount: 128,
    perPage: 10,
    perPageOptions: [10, 20, 50, 100],
    columns: sampleColumns,
    visibleColumns: sampleColumns.slice(0, 5),
    actionLabel: 'Action',
    showInput: true,
    showAction: true,
    showCount: false,
    selectedCount: 0,
    showSubButton: true,
    subLabel: 'Sub',
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
} satisfies Meta<typeof DataToolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

/* ── Basic stories ───────────────────────────────────────────────────────── */

export const BasicDefault: Story = {
  name: 'Basic (default)',
  args: { type: 'basic' },
};

export const BasicWithoutColumns: Story = {
  name: 'Basic — without column selector',
  args: { type: 'basic', columns: [] },
};

export const BasicLargeCount: Story = {
  name: 'Basic — large total count',
  args: { type: 'basic', totalCount: 12450, perPage: 50 },
};

/* ── Action stories ──────────────────────────────────────────────────────── */

export const ActionDefault: Story = {
  name: 'Action (default)',
  args: {
    type: 'action',
    showInput: true,
    showAction: true,
    showCount: false,
    showSubButton: true,
  },
};

export const ActionWithCount: Story = {
  name: 'Action — with selected count',
  args: {
    type: 'action',
    showInput: true,
    showAction: true,
    showCount: true,
    selectedCount: 12,
    showSubButton: true,
  },
};

export const ActionWithoutSub: Story = {
  name: 'Action — without sub button',
  args: {
    type: 'action',
    showInput: true,
    showAction: true,
    showCount: false,
    showSubButton: false,
  },
};

export const ActionInputOnly: Story = {
  name: 'Action — search only',
  args: {
    type: 'action',
    showInput: true,
    showAction: false,
    showCount: false,
  },
};
