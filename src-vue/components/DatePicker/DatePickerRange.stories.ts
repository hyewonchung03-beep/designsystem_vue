import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DatePickerRange from './DatePickerRange.vue';

const meta: Meta<typeof DatePickerRange> = {
  title: 'Pilot/DatePicker/DatePickerRange',
  component: DatePickerRange,
  tags: ['autodocs'],
  args: {
    startLabel: 'Start date',
    endLabel: 'End date',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default: no range selected yet. The "Quick select" sidebar (Last 7/14/30
// days, Custom) is part of every render — click any option in the canvas to
// see the range presets apply live (setting props alone can't preset the
// internal `quickOpt` ref, since that's owned by the component, not a prop —
// same "widget owns its own interaction state" shape as the rest of this
// batch's port).
export const Default: Story = {};

export const WithSelectedRange: Story = {
  render: (args) => ({
    components: { DatePickerRange },
    setup: () => ({ args }),
    template: `
      <DatePickerRange
        v-bind="args"
        :start-date="new Date(2026, 6, 6)"
        :end-date="new Date(2026, 6, 15)"
        :today="new Date(2026, 6, 9)"
      />
    `,
  }),
};

// Start date falls on a Sunday (holiday styling) to show range endpoints
// combined with the holiday-red text color.
export const RangeStartingOnHoliday: Story = {
  render: (args) => ({
    components: { DatePickerRange },
    setup: () => ({ args }),
    template: `
      <DatePickerRange
        v-bind="args"
        :start-date="new Date(2026, 6, 5)"
        :end-date="new Date(2026, 6, 12)"
        :today="new Date(2026, 6, 9)"
      />
    `,
  }),
};

export const CustomLabels: Story = {
  args: {
    startLabel: 'From',
    endLabel: 'To',
  },
};
