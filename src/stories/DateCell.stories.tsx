import type { Meta, StoryObj } from '@storybook/react';
import { DateCell, DateCellRangeItem, DateCellRange } from '../components/DatePicker';
import type { DateCellType } from '../components/DatePicker';

const meta: Meta<typeof DateCell> = {
  title: 'Components/DateCell',
  component: DateCell,
  parameters: { layout: 'centered' },
};
export default meta;

// ── All variants grid ─────────────────────────────────────────────────────────

const TYPES: DateCellType[] = ['day', 'today', 'holiday', 'holiday_today', 'upcoming'];

const COL_LABELS = ['default', 'disabled', 'today', 'disabled', 'selected', 'disabled', 'start', 'end', 'blank'];

export const AllVariants: StoryObj = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col" style={{ gap: 12, padding: 24 }}>
      {/* Header row */}
      <div className="flex items-center" style={{ gap: 0 }}>
        <div style={{ width: 100 }} />
        {COL_LABELS.map((col) => (
          <div
            key={col}
            className="text-text-xxs leading-text-xxs font-regular text-element-tertiary text-center"
            style={{ width: 36 }}
          >
            {col}
          </div>
        ))}
      </div>

      {/* Type rows */}
      {TYPES.map((type) => (
        <div key={type} className="flex items-center" style={{ gap: 0 }}>
          <span
            className="text-text-xxs leading-text-xxs font-regular text-element-tertiary whitespace-nowrap"
            style={{ width: 100 }}
          >
            {type}
          </span>
          {/* default */}
          <DateCell label="0" type={type} state="enabled" />
          {/* disabled */}
          <DateCell label="0" type={type} state="disabled" />
          {/* today border (non-selected) */}
          <DateCell label="0" type={type} state="enabled" selected={false} />
          {/* today border disabled */}
          <DateCell label="0" type={type} state="disabled" selected={false} />
          {/* selected enabled */}
          <DateCell label="0" type={type} state="enabled" selected />
          {/* selected disabled */}
          <DateCell label="0" type={type} state="disabled" selected />
          {/* start (showRange defaults true) */}
          <DateCell label="0" type={type} state="enabled" selected point="start" />
          {/* end (showRange defaults true) */}
          <DateCell label="0" type={type} state="enabled" selected point="end" />
          {/* blank */}
          <DateCell state="blank" />
        </div>
      ))}

      {/* Range row */}
      <div style={{ marginTop: 8 }}>
        <p className="text-text-xxs leading-text-xxs font-semibold text-element-tertiary" style={{ marginBottom: 8 }}>
          date_cell_range (point prop)
        </p>
        <div className="flex items-center" style={{ gap: 0 }}>
          <DateCell label="5" type="day" state="enabled" selected point="start" />
          <DateCell label="6" type="day" state="enabled" showRange />
          <DateCell label="7" type="day" state="enabled" showRange />
          <DateCell label="8" type="holiday" state="enabled" showRange />
          <DateCell label="9" type="day" state="enabled" selected point="end" />
        </div>
      </div>

      {/* DateCellRangeItem */}
      <div style={{ marginTop: 8 }}>
        <p className="text-text-xxs leading-text-xxs font-semibold text-element-tertiary" style={{ marginBottom: 8 }}>
          date_cell_range_item
        </p>
        <div className="flex flex-col" style={{ gap: 8 }}>
          {(['start', 'middle', 'end'] as const).map((pos) => (
            <div key={pos} className="flex items-center" style={{ gap: 8 }}>
              <span className="text-text-xxs text-element-tertiary" style={{ width: 40 }}>{pos}</span>
              <div style={{ width: 36, height: 36, position: 'relative' }}>
                <DateCellRangeItem position={pos} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DateCellRange */}
      <div style={{ marginTop: 8 }}>
        <p className="text-text-xxs leading-text-xxs font-semibold text-element-tertiary" style={{ marginBottom: 8 }}>
          date_cell_range
        </p>
        <div className="flex items-center" style={{ gap: 0 }}>
          <DateCellRange bg position="start" label="0" />
          <DateCellRange bg position="middle" label="0" />
          <DateCellRange bg position="middle" label="0" />
          <DateCellRange bg position="middle" label="0" />
          <DateCellRange bg position="end" label="0" />
        </div>
      </div>
    </div>
  ),
};

// ── Interactive single ────────────────────────────────────────────────────────

export const Interactive: StoryObj<typeof DateCell> = {
  args: {
    label: '15',
    type: 'day',
    state: 'enabled',
    selected: false,
    point: 'none',
    showRange: false,
  },
  argTypes: {
    type: { control: 'radio', options: ['day', 'today', 'holiday', 'holiday_today', 'upcoming', 'blank'] },
    state: { control: 'radio', options: ['enabled', 'disabled', 'blank'] },
    point: { control: 'radio', options: ['none', 'start', 'end'] },
  },
};
