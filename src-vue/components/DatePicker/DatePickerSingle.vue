<!--
  DatePickerSingle — complete single-date picker widget (top-level). Like
  the React source, this component owns no open/close/popover state — it's
  always-rendered calendar content meant to be composed inside a Popover /
  trigger by the consuming app (same pattern as Modal/Popover/Sidesheet).

  React: src/components/DatePicker/DatePicker.tsx (DatePickerSingle)
-->
<script lang="ts">
export type DatePickerSingleProps = {
  value?: Date | null;
  today?: Date;
  showFooter?: boolean;
  class?: string;
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import CalendarHeader from './CalendarHeader.vue';
import CalendarGrid from './CalendarGrid.vue';
import DatePickerFooter from './DatePickerFooter.vue';
import DateSelectionItem from './DateSelectionItem.vue';
import { PANEL_CLS, PANEL_W, PANEL_H, shiftMonth } from './dateUtils';

const props = withDefaults(defineProps<DatePickerSingleProps>(), {
  value: null,
  today: () => new Date(),
  showFooter: true,
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
const showYMPicker = ref(false);

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

function handleYMConfirm(y: number, m: number) {
  viewYear.value = y; viewMonth.value = m;
  showYMPicker.value = false;
}
</script>

<template>
  <div :class="`relative flex items-start ${props.class}`">
    <!-- Calendar panel -->
    <div :class="PANEL_CLS" :style="{ width: `${PANEL_W}px`, height: `${PANEL_H}px` }">
      <CalendarHeader
        :year="viewYear"
        :month="viewMonth"
        @prev="handlePrev"
        @next="handleNext"
        @label-click="showYMPicker = !showYMPicker"
      />
      <div class="flex-1 overflow-hidden pb-sol-16">
        <CalendarGrid
          :year="viewYear"
          :month="viewMonth"
          :selected="selected"
          :today="today"
          @day-click="handleDayClick"
        />
      </div>
      <DatePickerFooter v-if="showFooter" @cancel="emit('cancel')" @confirm="emit('confirm', selected)" />
    </div>

    <!-- Year/month picker overlay -->
    <div v-if="showYMPicker" class="absolute left-full top-0 ml-sol-8 z-50">
      <DateSelectionItem :year="viewYear" :month="viewMonth" @confirm="handleYMConfirm" @cancel="showYMPicker = false" />
    </div>
  </div>
</template>
