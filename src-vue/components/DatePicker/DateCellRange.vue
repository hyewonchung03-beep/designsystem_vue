<!--
  DateCellRange — calendar cell with optional range background. Used for
  blank/spacer cells that fall within a date range, and for standalone
  range-strip visualization.

  React: src/components/DatePicker/DatePicker.tsx (DateCellRange)
  NOTE: this component is exported from the React index.ts but is not
  actually used anywhere else inside DatePicker.tsx itself (CalendarGrid
  renders DateCell, not DateCellRange). Ported anyway since it's part of the
  public surface.
-->
<script lang="ts">
export type DateCellRangePosition = 'start' | 'end' | 'middle' | 'none' | 'single';

export type DateCellRangeProps = {
  bg?: boolean;
  position?: DateCellRangePosition;
  label?: string | number;
  class?: string;
};
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<DateCellRangeProps>(), {
  bg: false,
  position: 'none',
  class: '',
});

const bgColor = computed(() =>
  props.position === 'start' ? 'bg-tertiary-container' : 'bg-selected-container-variant',
);

const bgCls = computed(() => {
  switch (props.position) {
    case 'start':  return 'inset-y-0 left-0 right-0 rounded-l-4';
    case 'end':    return 'inset-y-0 left-0 right-0 rounded-r-4';
    case 'single': return 'rounded-4';
    default:       return 'inset-0';
  }
});

const bgStyle = computed(() => {
  if (props.position === 'start')  return { left: 'var(--sol-gap-2)' };
  if (props.position === 'end')    return { right: 'var(--sol-gap-2)' };
  if (props.position === 'single') return { inset: 'var(--sol-gap-2)' };
  return undefined;
});
</script>

<template>
  <div :class="`relative size-9 shrink-0 flex items-center justify-center overflow-hidden ${props.class}`">
    <div v-if="bg" :class="`absolute ${bgCls} ${bgColor}`" :style="bgStyle" />
    <span
      v-if="label !== undefined"
      class="relative text-text-sm leading-text-sm font-regular text-element-primary text-center"
    >
      {{ label }}
    </span>
  </div>
</template>
