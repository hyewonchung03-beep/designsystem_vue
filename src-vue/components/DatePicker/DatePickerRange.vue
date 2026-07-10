<!--
  DatePickerRange — complete date-range picker widget (top-level): quick
  select sidebar (MenuItem list) + dual calendars (CalendarGrid ×2, sharing
  rangeStart/rangeEnd) + start/end date input row (DateInputGroup) + footer
  with Clear all.

  This component does NOT reuse CalendarHeader.vue — its per-calendar header
  is simpler (label is a plain span, not a clickable button; only one
  NavButton per side, with a `size-5` spacer div standing in for the
  missing one to keep the label centered) and is ported inline here exactly
  as it's structured in the React source.

  React: src/components/DatePicker/DatePicker.tsx (DatePickerRange)
-->
<script lang="ts">
export type QuickOption = 'last7' | 'last14' | 'last30' | 'custom';

export type DatePickerRangeProps = {
  startDate?: Date | null;
  endDate?: Date | null;
  today?: Date;
  startLabel?: string;
  endLabel?: string;
  class?: string;
};

const QUICK_OPTIONS: { key: QuickOption; label: string }[] = [
  { key: 'last7',  label: 'Last 7 days'  },
  { key: 'last14', label: 'Last 14 days' },
  { key: 'last30', label: 'Last 30 days' },
  { key: 'custom', label: 'Custom'       },
];
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import NavButton from './NavButton.vue';
import CalendarGrid from './CalendarGrid.vue';
import DatePickerFooter from './DatePickerFooter.vue';
import DateInputGroup from './DateInputGroup.vue';
import MenuItem from '../MenuItem/MenuItem.vue';
import { PANEL_W, formatMonthYear, formatInputDate, shiftMonth } from './dateUtils';

const props = withDefaults(defineProps<DatePickerRangeProps>(), {
  startDate: null,
  endDate: null,
  today: () => new Date(),
  startLabel: 'Label',
  endLabel: 'Label',
  class: '',
});

const emit = defineEmits<{
  change: [start: Date | null, end: Date | null];
  confirm: [start: Date | null, end: Date | null];
  cancel: [];
  clearAll: [];
}>();

const rangeStart = ref<Date | null>(props.startDate);
const rangeEnd = ref<Date | null>(props.endDate);
const quickOpt = ref<QuickOption>('custom');

// NOTE: computed once at setup (component-mount equivalent of the React
// source's per-render IIFE, whose result only ever seeds useState's
// *initial* value anyway — so behavior is equivalent).
const initLeft = (() => {
  const base = props.startDate ?? props.today;
  return [base.getFullYear(), base.getMonth()] as [number, number];
})();

// Fixed: previously stayed on the start date's own month when that month
// was January (didn't wrap to December of the previous year like every
// other month does). Now uses shiftMonth for a consistent "one month
// before the start date" left-calendar seed regardless of month.
const initLeftShifted = shiftMonth(initLeft[0], initLeft[1], -1);
const leftYear = ref(initLeftShifted[0]);
const leftMonth = ref(initLeftShifted[1]);

const rightYearMonth = computed(() => shiftMonth(leftYear.value, leftMonth.value, 1));
const rightYear = computed(() => rightYearMonth.value[0]);
const rightMonth = computed(() => rightYearMonth.value[1]);

function handleDayClick(date: Date) {
  // Fixed: previously emitted the PRE-click rangeStart/rangeEnd (a stale
  // value one click behind), mirroring a React state-batching artifact in
  // the source that doesn't apply to Vue's synchronous refs. Now computes
  // and emits the actual new range.
  let newStart = rangeStart.value;
  let newEnd = rangeEnd.value;

  if (!rangeStart.value || (rangeStart.value && rangeEnd.value)) {
    newStart = date;
    newEnd = null;
    rangeStart.value = date;
    rangeEnd.value = null;
    quickOpt.value = 'custom';
  } else {
    if (date.getTime() < rangeStart.value.getTime()) {
      newEnd = rangeStart.value;
      newStart = date;
      rangeEnd.value = rangeStart.value;
      rangeStart.value = date;
    } else {
      newEnd = date;
      rangeEnd.value = date;
    }
    quickOpt.value = 'custom';
  }
  emit('change', newStart, newEnd);
}

function handleQuickSelect(key: QuickOption) {
  quickOpt.value = key;
  const now = new Date(props.today);
  now.setHours(0, 0, 0, 0);
  if (key === 'last7') {
    const s = new Date(now); s.setDate(s.getDate() - 6);
    rangeStart.value = s; rangeEnd.value = new Date(now);
  } else if (key === 'last14') {
    const s = new Date(now); s.setDate(s.getDate() - 13);
    rangeStart.value = s; rangeEnd.value = new Date(now);
  } else if (key === 'last30') {
    const s = new Date(now); s.setDate(s.getDate() - 29);
    rangeStart.value = s; rangeEnd.value = new Date(now);
  }
}

function handleClearAll() {
  rangeStart.value = null;
  rangeEnd.value = null;
  quickOpt.value = 'custom';
  emit('clearAll');
}

function handlePrev() {
  const [y, m] = shiftMonth(leftYear.value, leftMonth.value, -1);
  leftYear.value = y; leftMonth.value = m;
}

function handleNext() {
  const [y, m] = shiftMonth(leftYear.value, leftMonth.value, 1);
  leftYear.value = y; leftMonth.value = m;
}
</script>

<template>
  <div
    :class="[
      'flex flex-col bg-surface-container-high border border-border-solid rounded-4',
      'shadow-[0px_0px_1px_0px_rgba(0,0,0,0.04),0px_2px_6px_0px_rgba(0,0,0,0.08)]',
      'overflow-hidden',
      props.class,
    ]"
  >
    <div class="flex">
      <!-- Quick select sidebar -->
      <!-- NOTE: width:148px below has no matching --sol-* token (pre-existing in the React source). -->
      <div class="flex flex-col shrink-0 border-r border-border-solid-variant" style="width: 148px">
        <div class="px-sol-16 py-sol-12">
          <span class="text-text-sm leading-text-sm font-semibold text-element-primary"> Quick select </span>
        </div>
        <div class="flex flex-col p-2">
          <MenuItem
            v-for="{ key, label } in QUICK_OPTIONS"
            :key="key"
            :label="label"
            :selected="quickOpt === key"
            @click="handleQuickSelect(key)"
          />
        </div>
      </div>

      <!-- Dual calendars -->
      <div class="flex flex-col shrink-0" :style="{ width: `${PANEL_W * 2}px` }">
        <div class="flex">
          <!-- Left calendar -->
          <div class="flex flex-col shrink-0 border-r border-border-solid-variant" :style="{ width: `${PANEL_W}px` }">
            <div
              class="flex items-center justify-between border-b border-border-solid-variant shrink-0"
              style="padding: var(--sol-gap-12) var(--sol-gap-16) var(--sol-gap-10)"
            >
              <NavButton icon="prev" @click="handlePrev" />
              <span class="text-text-sm leading-text-sm font-regular text-element-primary">
                {{ formatMonthYear(leftYear, leftMonth) }}
              </span>
              <div class="size-5" />
            </div>
            <div class="pb-sol-8">
              <CalendarGrid
                :year="leftYear"
                :month="leftMonth"
                :range-start="rangeStart"
                :range-end="rangeEnd"
                :today="today"
                @day-click="handleDayClick"
              />
            </div>
          </div>

          <!-- Right calendar -->
          <div class="flex flex-col shrink-0" :style="{ width: `${PANEL_W}px` }">
            <div
              class="flex items-center justify-between border-b border-border-solid-variant shrink-0"
              style="padding: var(--sol-gap-12) var(--sol-gap-16) var(--sol-gap-10)"
            >
              <div class="size-5" />
              <span class="text-text-sm leading-text-sm font-regular text-element-primary">
                {{ formatMonthYear(rightYear, rightMonth) }}
              </span>
              <NavButton icon="next" @click="handleNext" />
            </div>
            <div class="pb-sol-8">
              <CalendarGrid
                :year="rightYear"
                :month="rightMonth"
                :range-start="rangeStart"
                :range-end="rangeEnd"
                :today="today"
                @day-click="handleDayClick"
              />
            </div>
          </div>
        </div>

        <!-- Date / time input row -->
        <div class="flex items-end border-t border-border-solid-variant gap-3 p-4">
          <DateInputGroup :label="startLabel" :value="formatInputDate(rangeStart)" />
          <!-- NOTE: padding-bottom:5px below has no matching --sol-* token (pre-existing in the React source). -->
          <span class="text-text-sm leading-text-sm font-regular text-element-quaternary shrink-0" style="padding-bottom: 5px">
            —
          </span>
          <DateInputGroup :label="endLabel" :value="formatInputDate(rangeEnd)" />
        </div>
      </div>
    </div>

    <DatePickerFooter show-clear-all @cancel="emit('cancel')" @confirm="emit('confirm', rangeStart, rangeEnd)" @clear-all="handleClearAll" />
  </div>
</template>
