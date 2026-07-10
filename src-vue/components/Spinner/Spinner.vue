<script lang="ts">
export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerLabelPosition = 'below' | 'right';
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    size?: SpinnerSize;
    labelPosition?: SpinnerLabelPosition;
    inverse?: boolean;
    showLoaderText?: boolean;
    label?: string;
  }>(),
  {
    size: 'sm',
    labelPosition: 'below',
    inverse: false,
    showLoaderText: true,
    label: 'Loading',
  },
);

// Icon pixel size per labelPosition × size
const ICON_SIZE: Record<SpinnerLabelPosition, Record<SpinnerSize, number>> = {
  below: { sm: 32, md: 64, lg: 96 },
  right: { sm: 16, md: 24, lg: 32 },
};

const LABEL_CLS: Record<SpinnerSize, string> = {
  sm: 'text-text-xs leading-text-xs',
  md: 'text-text-sm leading-text-sm',
  lg: 'text-text-md leading-text-md',
};

const ROW_GAP: Record<SpinnerSize, string> = {
  sm: 'gap-2',
  md: 'gap-2',
  lg: 'gap-3',
};

const iconSize = computed(() => ICON_SIZE[props.labelPosition][props.size]);
const isRow = computed(() => props.labelPosition === 'right');
const colorCls = computed(() => (props.inverse ? 'text-element-inverse' : 'text-element-brand'));
const layoutCls = computed(() => (isRow.value ? `flex-row ${ROW_GAP[props.size]}` : 'flex-col gap-2'));

// Arc: start at top (cx, sw/2), sweep 90° clockwise
const sw = computed(() => iconSize.value / 9.6); // strokeWidth proportional to size
const r = computed(() => (iconSize.value - sw.value) / 2); // radius fills the container
const cx = computed(() => iconSize.value / 2);
const cy = computed(() => iconSize.value / 2);
const arcPath = computed(() => `M${cx.value} ${sw.value / 2} a${r.value} ${r.value} 0 0 1 ${r.value} ${r.value}`);
const strokeOpacity = computed(() => (props.inverse ? 0.35 : 0.18));
</script>

<template>
  <div
    :class="`inline-flex items-center text-center ${layoutCls} ${colorCls}`"
    role="status"
    :aria-label="label"
  >
    <svg
      :width="iconSize"
      :height="iconSize"
      :viewBox="`0 0 ${iconSize} ${iconSize}`"
      fill="none"
      class="animate-spin"
      aria-hidden="true"
    >
      <circle :cx="cx" :cy="cy" :r="r" stroke="currentColor" :stroke-width="sw" :stroke-opacity="strokeOpacity" />
      <path :d="arcPath" stroke="currentColor" :stroke-width="sw" stroke-linecap="butt" />
    </svg>
    <span v-if="showLoaderText" :class="`whitespace-nowrap text-center ${LABEL_CLS[size]}`">
      {{ label }}
    </span>
  </div>
</template>
