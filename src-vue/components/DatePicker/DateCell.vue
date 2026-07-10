<!--
  DateCell — full-featured calendar day cell. Handles all type/state/
  selection/range variants. Figma: node 5370-80086

  React: src/components/DatePicker/DatePicker.tsx (DateCell)
-->
<script lang="ts">
export type DateCellType = 'day' | 'holiday' | 'today' | 'holiday_today' | 'upcoming' | 'blank';
export type DateCellPoint = 'none' | 'start' | 'end';

export type DateCellProps = {
  label?: string | number;
  type?: DateCellType;
  state?: 'enabled' | 'disabled' | 'blank';
  selected?: boolean;
  point?: DateCellPoint;
  showRange?: boolean;
  class?: string;
};
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<DateCellProps>(), {
  label: '',
  type: 'day',
  state: 'enabled',
  selected: false,
  point: 'none',
  class: '',
});

defineEmits<{ click: [] }>();

const isBlank = computed(() => props.type === 'blank' || props.state === 'blank');
const effectiveShowRange = computed(() => props.showRange ?? props.point !== 'none');
const isEnabled = computed(() => props.state === 'enabled');
const isHoliday = computed(() => props.type === 'holiday' || props.type === 'holiday_today');
const isToday = computed(() => props.type === 'today' || props.type === 'holiday_today');

// ── Text color ─────────────────────────────────────────────────────────────
// disabled: error-variant (holiday selected) or disabled
// selected: inverse-variant (upcoming), error (holiday), white (day/today)
// normal:   error (holiday), quaternary (upcoming), primary (day/today)
const textColor = computed(() => {
  if (!isEnabled.value) {
    return props.selected && isHoliday.value ? 'text-error-variant' : 'text-element-disabled';
  }
  if (props.selected) {
    if (props.type === 'upcoming') return 'text-element-inverse-variant';
    if (isHoliday.value) return 'text-error';
    return 'text-static-white';
  }
  if (isHoliday.value) return 'text-error';
  if (props.type === 'upcoming') return 'text-element-quaternary';
  return 'text-element-primary';
});

// ── Selected background ──────────────────────────────────────────────────
// point=none  → rounded-4 (full circle look)
// point=start → rounded-l-4 (left rounded, right square — connects range on right)
// point=end   → rounded-r-4 (right rounded, left square — connects range on left)
const selRounding = computed(() => {
  if (props.point === 'start') return 'rounded-l-4';
  if (props.point === 'end') return 'rounded-r-4';
  return 'rounded-4';
});
const selBgColor = computed(() => (isEnabled.value ? 'var(--sol-fill-active)' : 'var(--sol-fill-disabled)'));

// ── Today border ──────────────────────────────────────────────────────────
// enabled today → border-tertiary (brand color)
// disabled today → border-border-normal (gray)
const todayBorderCls = computed(() => (isEnabled.value ? 'border-tertiary' : 'border-border-normal'));

// Range background strip: 32px tall (2px top/bottom inset), width by point
const rangeStripStyle = computed(() => {
  if (props.point === 'start') {
    return {
      top: 'var(--sol-gap-2)', bottom: 'var(--sol-gap-2)', left: 'var(--sol-gap-2)', right: '0',
      borderTopLeftRadius: 'var(--sol-radius-4)', borderBottomLeftRadius: 'var(--sol-radius-4)',
    };
  }
  if (props.point === 'end') {
    return {
      top: 'var(--sol-gap-2)', bottom: 'var(--sol-gap-2)', left: '0', right: 'var(--sol-gap-2)',
      borderTopRightRadius: 'var(--sol-radius-4)', borderBottomRightRadius: 'var(--sol-radius-4)',
    };
  }
  return { top: 'var(--sol-gap-2)', bottom: 'var(--sol-gap-2)', left: '0', right: '0' };
});
</script>

<template>
  <!-- Blank spacer (type=blank or state=blank) -->
  <div v-if="isBlank" :class="`size-9 shrink-0 ${props.class}`" />
  <div v-else :class="`group relative size-9 shrink-0 overflow-hidden ${props.class}`">
    <!-- Range background strip -->
    <div v-if="effectiveShowRange" class="absolute bg-selected-container-variant" :style="rangeStripStyle" />
    <!-- Selected background: 32×32 box with 2px inset -->
    <div v-if="selected" :class="`absolute inset-0.5 ${selRounding}`" :style="{ backgroundColor: selBgColor }" />
    <!-- Today border: 32×32 outline box (non-selected only) -->
    <div v-if="isToday && !selected" :class="`absolute inset-0.5 rounded-4 border ${todayBorderCls}`" />
    <!-- Hover overlay — group-hover so inline style on button doesn't block it -->
    <div
      v-if="!selected && isEnabled"
      class="absolute inset-0 rounded-4 group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
    />
    <!-- Button: inline style guarantees transparent (overrides browser buttonface default) -->
    <button
      type="button"
      :disabled="!isEnabled"
      style="background: transparent"
      :class="[
        'absolute inset-0 flex items-center justify-center rounded-4',
        'focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]',
        !isEnabled ? 'cursor-not-allowed' : 'cursor-pointer',
      ]"
      @click="isEnabled && $emit('click')"
    >
      <span :class="`text-text-sm leading-text-sm ${selected ? 'font-semibold' : 'font-regular'} ${textColor}`">
        {{ label }}
      </span>
    </button>
  </div>
</template>
