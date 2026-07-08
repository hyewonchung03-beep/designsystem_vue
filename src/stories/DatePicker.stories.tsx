import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  DateSelectionItem,
  DatePickerSingle,
  DatePickerRange,
  DateSelection,
} from '../components/DatePicker';

// ── date_selection_item ───────────────────────────────────────────────────────

const selectionItemMeta: Meta<typeof DateSelectionItem> = {
  title: 'Components/DateSelectionItem',
  component: DateSelectionItem,
  parameters: { layout: 'centered' },
  argTypes: {
    activeType: { control: 'radio', options: ['year', 'month'] },
  },
};
export default selectionItemMeta;

type StorySelItem = StoryObj<typeof DateSelectionItem>;

export const YearView: StorySelItem = {
  args: {
    year: 2026,
    month: 0,
    activeType: 'year',
  },
};

export const MonthView: StorySelItem = {
  args: {
    year: 2026,
    month: 0,
    activeType: 'month',
  },
};

// ── date_selection ────────────────────────────────────────────────────────────

export const DateSelectionStory: StoryObj<typeof DateSelection> = {
  name: 'DateSelection',
  render: () => {
    const today = new Date(2026, 0, 2);
    return (
      <DateSelection
        value={today}
        today={today}
        onConfirm={(d) => console.log('confirm', d)}
        onCancel={() => console.log('cancel')}
      />
    );
  },
};

// ── date_picker (single) ──────────────────────────────────────────────────────

export const SinglePicker: StoryObj<typeof DatePickerSingle> = {
  name: 'DatePickerSingle',
  render: () => {
    const today = new Date(2026, 0, 31);
    const [value, setValue] = useState<Date | null>(new Date(2026, 0, 2));
    return (
      <DatePickerSingle
        value={value}
        today={today}
        onChange={setValue}
        onConfirm={(d) => console.log('confirm', d)}
        onCancel={() => console.log('cancel')}
      />
    );
  },
};

export const SinglePickerNoFooter: StoryObj<typeof DatePickerSingle> = {
  name: 'DatePickerSingle (no footer)',
  render: () => {
    const today = new Date(2026, 0, 31);
    return (
      <DatePickerSingle
        value={today}
        today={today}
        showFooter={false}
      />
    );
  },
};

// today = selected → type='today' + selected=true → 보라색 filled
export const SinglePickerTodaySelected: StoryObj<typeof DatePickerSingle> = {
  name: 'DatePickerSingle (today selected)',
  render: () => {
    const today = new Date(2026, 0, 2);
    const [value, setValue] = useState<Date | null>(today);
    return (
      <DatePickerSingle
        value={value}
        today={today}
        onChange={setValue}
        onConfirm={(d) => console.log('confirm', d)}
        onCancel={() => console.log('cancel')}
      />
    );
  },
};

// ── date_picker (range) ───────────────────────────────────────────────────────

export const RangePicker: StoryObj<typeof DatePickerRange> = {
  name: 'DatePickerRange',
  render: () => {
    const today = new Date(2026, 0, 1);
    const start = new Date(2025, 11, 10);
    return (
      <DatePickerRange
        startDate={start}
        endDate={today}
        today={today}
        onConfirm={(s, e) => console.log('confirm', s, e)}
        onCancel={() => console.log('cancel')}
      />
    );
  },
};

export const RangePickerEmpty: StoryObj<typeof DatePickerRange> = {
  name: 'DatePickerRange (empty)',
  render: () => {
    const today = new Date(2026, 0, 1);
    return (
      <DatePickerRange
        today={today}
        startLabel="Start date"
        endLabel="End date"
        onConfirm={(s, e) => console.log('confirm', s, e)}
        onCancel={() => console.log('cancel')}
      />
    );
  },
};

// ── All variants ──────────────────────────────────────────────────────────────

export const AllVariants: StoryObj = {
  name: 'All Variants',
  render: () => {
    const today = new Date(2026, 0, 2);
    const [single, setSingle] = useState<Date | null>(today);
    return (
      <div className="flex flex-col gap-[40px] p-[40px] bg-surface-variant">
        <div>
          <p className="text-text-xs font-semibold text-element-tertiary mb-[12px]">date_selection</p>
          <DateSelection value={today} today={today} />
        </div>
        <div>
          <p className="text-text-xs font-semibold text-element-tertiary mb-[12px]">date_picker / type=single</p>
          <DatePickerSingle value={single} today={today} onChange={setSingle} />
        </div>
        <div>
          <p className="text-text-xs font-semibold text-element-tertiary mb-[12px]">date_picker / type=range</p>
          <DatePickerRange
            startDate={new Date(2025, 11, 10)}
            endDate={today}
            today={today}
          />
        </div>
      </div>
    );
  },
};
