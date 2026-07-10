<!--
  DateCellRangeItem — range selection background strip shown inside a day cell.
  position=start:  strip begins here (left edge rounded, extends right)
  position=end:    strip ends here (right edge rounded, comes from left)
  position=middle: full-width strip (no rounding)

  React: src/components/DatePicker/DatePicker.tsx (DateCellRangeItem)
-->
<script lang="ts">
export type DateCellRangeItemPosition = 'start' | 'middle' | 'end';
</script>

<script setup lang="ts">
defineProps<{
  position: DateCellRangeItemPosition;
}>();
</script>

<template>
  <div class="absolute inset-0 pointer-events-none">
    <div
      v-if="position === 'start'"
      class="absolute bg-selected-container-variant rounded-l-4"
      style="top: var(--sol-gap-2); bottom: var(--sol-gap-2); left: var(--sol-gap-2); right: 0"
    />
    <div
      v-else-if="position === 'end'"
      class="absolute bg-selected-container-variant rounded-r-4"
      style="top: var(--sol-gap-2); bottom: var(--sol-gap-2); left: 0; right: var(--sol-gap-2)"
    />
    <div
      v-else
      class="absolute bg-selected-container-variant"
      style="top: var(--sol-gap-2); bottom: var(--sol-gap-2); left: 0; right: 0"
    />
  </div>
</template>
