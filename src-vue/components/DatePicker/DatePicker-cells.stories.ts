// Shared demo file for the smaller DatePicker leaf components that aren't
// meaningfully demoable as top-level Storybook subjects on their own:
// DateCell, DateCellRangeItem, DateCellRange.
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DateCell from './DateCell.vue';
import DateCellRangeItem from './DateCellRangeItem.vue';
import DateCellRange from './DateCellRange.vue';

const meta: Meta<typeof DateCell> = {
  title: 'Pilot/DatePicker/Cells',
  component: DateCell,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DayDefault: Story = {
  render: () => ({
    components: { DateCell },
    template: `<DateCell label="14" type="day" />`,
  }),
};

export const Today: Story = {
  render: () => ({
    components: { DateCell },
    template: `<DateCell label="9" type="today" />`,
  }),
};

export const Selected: Story = {
  render: () => ({
    components: { DateCell },
    template: `<DateCell label="14" type="day" :selected="true" />`,
  }),
};

// type=holiday is what CalendarGrid assigns automatically to every Sunday
// (getDay() === 0) — this story demos the cell variant directly rather than
// via a full calendar.
export const Holiday: Story = {
  render: () => ({
    components: { DateCell },
    template: `<DateCell label="5" type="holiday" />`,
  }),
};

export const HolidayToday: Story = {
  render: () => ({
    components: { DateCell },
    template: `<DateCell label="5" type="holiday_today" />`,
  }),
};

// NOTE: type="upcoming" is a valid DateCellType but CalendarGrid's internal
// getDayItemProps() never assigns it (it only ever produces day/holiday/
// today/holiday_today) — so this state can't be reached through
// DatePickerSingle/DatePickerRange as ported, only via DateCell directly,
// exactly matching what's true of the React source too.
export const Upcoming: Story = {
  render: () => ({
    components: { DateCell },
    template: `<DateCell label="20" type="upcoming" />`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { DateCell },
    template: `<DateCell label="3" type="day" state="disabled" />`,
  }),
};

export const RangeStart: Story = {
  render: () => ({
    components: { DateCell },
    template: `<DateCell label="6" type="day" :selected="true" point="start" />`,
  }),
};

export const RangeMiddle: Story = {
  render: () => ({
    components: { DateCell },
    template: `<DateCell label="7" type="day" :show-range="true" />`,
  }),
};

export const RangeEnd: Story = {
  render: () => ({
    components: { DateCell },
    template: `<DateCell label="8" type="day" :selected="true" point="end" />`,
  }),
};

export const Blank: Story = {
  render: () => ({
    components: { DateCell },
    template: `<DateCell type="blank" />`,
  }),
};

export const RangeItemStrip: Story = {
  render: () => ({
    components: { DateCellRangeItem },
    template: `
      <div style="display:flex; position:relative; width: 108px; height: 36px;">
        <DateCellRangeItem position="start" />
        <DateCellRangeItem position="middle" />
        <DateCellRangeItem position="end" />
      </div>
    `,
  }),
};

export const RangeCellSingle: Story = {
  render: () => ({
    components: { DateCellRange },
    template: `<DateCellRange :bg="true" position="single" label="12" />`,
  }),
};

export const RangeCellSpan: Story = {
  render: () => ({
    components: { DateCellRange },
    template: `
      <div style="display:flex;">
        <DateCellRange :bg="true" position="start" label="6" />
        <DateCellRange :bg="true" position="middle" label="7" />
        <DateCellRange :bg="true" position="end" label="8" />
      </div>
    `,
  }),
};
