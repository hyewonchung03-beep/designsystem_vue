<!--
  CalendarHeader — internal helper shared by DatePickerSingle and
  DateSelection (DatePickerRange has its own simpler inline header markup,
  ported directly in DatePickerRange.vue, since it never shows the month/year
  as a clickable label — matches the React source's structure).

  `labelInteractive` replaces the React source's presence-check on the
  `onLabelClick` prop (`onLabelClick && (...)"`): DatePickerSingle passes an
  always-defined handler (interactive), DateSelection passes `undefined`
  (non-interactive, no chevron, no hover, cursor-default).

  React: src/components/DatePicker/DatePicker.tsx (CalendarHeader, local function)
-->
<script setup lang="ts">
import { formatMonthYear } from './dateUtils';
import NavButton from './NavButton.vue';

withDefaults(
  defineProps<{
    year: number;
    month: number;
    labelInteractive?: boolean;
  }>(),
  {
    labelInteractive: true,
  },
);

defineEmits<{ prev: []; next: []; labelClick: [] }>();
</script>

<template>
  <div
    class="flex items-center justify-between border-b border-border-solid-variant shrink-0"
    style="padding: var(--sol-gap-12) var(--sol-gap-16) var(--sol-gap-10)"
  >
    <NavButton icon="prev" @click="$emit('prev')" />
    <button
      type="button"
      :class="[
        'group relative flex items-center gap-sol-4 rounded-4 text-element-primary shrink-0',
        'focus:outline-none',
        labelInteractive ? 'cursor-pointer' : 'cursor-default',
      ]"
      @click="labelInteractive && $emit('labelClick')"
    >
      <span
        v-if="labelInteractive"
        class="absolute rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
        style="inset: calc(var(--sol-gap-2) * -1)"
      />
      <span class="relative text-text-sm leading-text-sm font-regular whitespace-nowrap overflow-hidden text-ellipsis">
        {{ formatMonthYear(year, month) }}
      </span>
      <span v-if="labelInteractive" class="relative flex items-center justify-center size-3.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </button>
    <NavButton icon="next" @click="$emit('next')" />
  </div>
</template>
