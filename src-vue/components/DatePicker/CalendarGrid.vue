<!--
  CalendarGrid — internal helper (not exported from index.ts / React source
  either), the actual single-month day grid. Reused by DatePickerSingle,
  DateSelection, AND DatePickerRange (all three top-level pickers depend on
  this). Renders the day-of-week header row + week rows of DateCell.

  This is distinct from DateSelectionItem, which is the YEAR/MONTH jump
  panel (grid of years or months for navigation), not a day grid.

  React: src/components/DatePicker/DatePicker.tsx (CalendarGrid, local function)
-->
<script setup lang="ts">
import { computed } from 'vue';
import DateCell, { type DateCellPoint } from './DateCell.vue';
import { daysInMonth, firstDayOfWeek, isSameDay, isStrictlyBetween, DOW_LABELS } from './dateUtils';

const props = withDefaults(
  defineProps<{
    year: number;
    month: number;
    selected?: Date | null;
    rangeStart?: Date | null;
    rangeEnd?: Date | null;
    today: Date;
  }>(),
  {
    selected: null,
    rangeStart: null,
    rangeEnd: null,
  },
);

const emit = defineEmits<{ dayClick: [date: Date] }>();

type GridCell = {
  day: number;
  date: Date;
  cellProps: ReturnType<typeof getDayItemProps>;
};

// Builds the week grid with the Date object created exactly once per cell
// (mirrors the React source's `const date = new Date(year, month, day)`
// which is reused for both the DateCell props spread and the click
// handler — computing it once here, in script, rather than twice in the
// template as `new Date(...)` calls).
const weeks = computed<(GridCell | null)[][]>(() => {
  const firstDay = firstDayOfWeek(props.year, props.month);
  const totalDays = daysInMonth(props.year, props.month);

  const result: (GridCell | null)[][] = [];
  let week: (GridCell | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(props.year, props.month, d);
    week.push({ day: d, date, cellProps: getDayItemProps(date) });
    if (week.length === 7) { result.push(week); week = []; }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    result.push(week);
  }
  return result;
});

function getDayItemProps(date: Date): {
  type: 'day' | 'holiday' | 'today' | 'holiday_today';
  selected: boolean;
  point: DateCellPoint;
  showRange: boolean;
} {
  const dow          = date.getDay();
  const isHoliday    = dow === 0;
  const isTodayDate  = isSameDay(date, props.today);
  const isRangeStart = isSameDay(date, props.rangeStart ?? null);
  const isRangeEnd   = isSameDay(date, props.rangeEnd ?? null);
  const isInRange    = isStrictlyBetween(date, props.rangeStart ?? null, props.rangeEnd ?? null);
  const isSel        = isSameDay(date, props.selected ?? null);

  const type =
    isHoliday && isTodayDate ? 'holiday_today' :
    isHoliday                ? 'holiday' :
    isTodayDate              ? 'today' :
                               'day';

  const isSelected = isSel || isRangeStart || isRangeEnd;
  const point: DateCellPoint =
    isRangeStart && isRangeEnd ? 'none' :
    isRangeStart               ? 'start' :
    isRangeEnd                 ? 'end' :
                                 'none';

  return { type, selected: isSelected, point, showRange: isInRange || isRangeStart || isRangeEnd };
}
</script>

<template>
  <!-- Day-of-week header — 36×37px per cell (py:12 + text:13 + py:12) -->
  <div class="flex items-center px-3">
    <div v-for="(d, i) in DOW_LABELS" :key="d" class="flex flex-1 items-center justify-center overflow-clip py-3">
      <span
        :class="[
          'flex-1 text-text-xxs leading-text-xxs font-regular text-center',
          i === 0 ? 'text-error' : 'text-element-tertiary',
        ]"
      >
        {{ d }}
      </span>
    </div>
  </div>

  <!-- Date rows — gap:2 between rows, px:12 horizontal, py:2 top/bottom -->
  <div class="flex flex-col gap-0.5 py-0.5 px-3">
    <div v-for="(week, wi) in weeks" :key="wi" class="flex items-center">
      <template v-for="(cell, di) in week" :key="di">
        <div v-if="cell === null" class="size-9 shrink-0" />
        <DateCell
          v-else
          :label="cell.day"
          v-bind="cell.cellProps"
          @click="emit('dayClick', cell.date)"
        />
      </template>
    </div>
  </div>
</template>
