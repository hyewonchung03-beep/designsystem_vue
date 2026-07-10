import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DatePickerSingle from './DatePickerSingle.vue';
import DateSelectionItem from './DateSelectionItem.vue';

const meta: Meta<typeof DatePickerSingle> = {
  title: 'Pilot/DatePicker/DatePickerSingle',
  component: DatePickerSingle,
  tags: ['autodocs'],
  argTypes: {
    showFooter: { control: 'boolean' },
  },
  args: {
    showFooter: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default: opens on the current month, today highlighted (no explicit
// `today` prop passed → defaults to `new Date()`), nothing selected yet.
export const Default: Story = {};

// A Sunday in the currently-displayed month will always render with holiday
// (red) styling — CalendarGrid treats getDay() === 0 as a holiday. No extra
// prop needed to demo this; it's visible in every story that shows a full month.
export const WithSelectedDate: Story = {
  render: (args) => ({
    components: { DatePickerSingle },
    setup: () => ({ args }),
    template: `<DatePickerSingle v-bind="args" :value="new Date(2026, 6, 15)" :today="new Date(2026, 6, 9)" />`,
  }),
};

export const NoFooter: Story = {
  args: { showFooter: false },
};

// The year/month sub-picker (DateSelectionItem) is internal ref state inside
// DatePickerSingle (opened by clicking the month/year label) and isn't
// prop-controllable from the outside. Demoing DateSelectionItem directly
// here shows that view in isolation.
export const YearMonthPickerView: Story = {
  render: () => ({
    components: { DateSelectionItem },
    template: `<DateSelectionItem :year="2026" :month="6" active-type="year" />`,
  }),
};

export const YearMonthPickerMonthTab: Story = {
  render: () => ({
    components: { DateSelectionItem },
    template: `<DateSelectionItem :year="2026" :month="6" active-type="month" />`,
  }),
};
