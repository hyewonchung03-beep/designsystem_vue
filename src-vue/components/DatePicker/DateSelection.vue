<!--
  DateSelection — calendar + DateSelectionItem side by side (as shown in
  Figma date_selection). Non-interactive month/year label in the calendar
  header (year/month is switched via the always-visible DateSelectionItem
  panel on the right, not by clicking the calendar label).

  React: src/components/DatePicker/DatePicker.tsx (DateSelection)
-->
<script lang="ts">
export type DateSelectionProps = {
  value?: Date | null;
  today?: Date;
  class?: string;
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import CalendarHeader from './CalendarHeader.vue';
import CalendarGrid from './CalendarGrid.vue';
import DatePickerFooter from './DatePickerFooter.vue';
import DateSelectionItem, { type DateSelectionItemActiveType } from './DateSelectionItem.vue';
import { PANEL_CLS, PANEL_W, PANEL_H, shiftMonth } from './dateUtils';

const props = withDefaults(defineProps<DateSelectionProps>(), {
  value: null,
  today: () => new Date(),
  class: '',
});

const emit = defineEmits<{
  change: [date: Date];
  confirm: [date: Date | null];
  cancel: [];
}>();

const selected = ref<Date | null>(props.value);
const viewYear = ref(props.value?.getFullYear() ?? props.today.getFullYear());
const viewMonth = ref(props.value?.getMonth() ?? props.today.getMonth());
const itemYear = ref(viewYear.value);
const itemMonth = ref(viewMonth.value);
const activeTab = ref<DateSelectionItemActiveType>('year');

function handleDayClick(date: Date) {
  selected.value = date;
  emit('change', date);
}

function handlePrev() {
  const [y, m] = shiftMonth(viewYear.value, viewMonth.value, -1);
  viewYear.value = y; viewMonth.value = m;
}

function handleNext() {
  const [y, m] = shiftMonth(viewYear.value, viewMonth.value, 1);
  viewYear.value = y; viewMonth.value = m;
}

function handleItemConfirm(y: number, m: number) {
  viewYear.value = y; viewMonth.value = m;
  itemYear.value = y; itemMonth.value = m;
}
</script>

<template>
  <div :class="`flex gap-sol-8 items-start ${props.class}`">
    <!-- Calendar -->
    <div :class="PANEL_CLS" :style="{ width: `${PANEL_W}px`, height: `${PANEL_H}px` }">
      <CalendarHeader :year="viewYear" :month="viewMonth" :label-interactive="false" @prev="handlePrev" @next="handleNext" />
      <div class="flex-1 overflow-hidden pb-sol-16">
        <CalendarGrid
          :year="viewYear"
          :month="viewMonth"
          :selected="selected"
          :today="today"
          @day-click="handleDayClick"
        />
      </div>
      <DatePickerFooter @cancel="emit('cancel')" @confirm="emit('confirm', selected)" />
    </div>

    <!-- Year/month selection panel -->
    <DateSelectionItem
      :year="itemYear"
      :month="itemMonth"
      :active-type="activeTab"
      @year-change="itemYear = $event"
      @month-change="itemMonth = $event"
      @active-type-change="activeTab = $event"
      @confirm="handleItemConfirm"
      @cancel="emit('cancel')"
    />
  </div>
</template>
