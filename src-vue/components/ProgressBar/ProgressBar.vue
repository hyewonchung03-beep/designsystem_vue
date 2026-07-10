<script lang="ts">
export type ProgressBarSize = 'sm' | 'md';
export type ProgressBarState = 'normal' | 'info' | 'success' | 'warning' | 'error';
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    value?: number;
    size?: ProgressBarSize;
    state?: ProgressBarState;
    label?: string;
    showLabel?: boolean;
    showValue?: boolean;
  }>(),
  {
    value: 50,
    size: 'sm',
    state: 'normal',
    label: 'Label',
    showLabel: true,
    showValue: true,
  },
);

const STATE_FILL: Record<ProgressBarState, string> = {
  normal: 'bg-tertiary',
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
};

const clamped = computed(() => Math.min(100, Math.max(0, props.value)));
const trackHeight = computed(() => (props.size === 'md' ? 'h-2' : 'h-1'));
</script>

<template>
  <div :class="`flex w-full flex-col items-start text-left${size === 'md' ? ' gap-1' : ''}`">
    <p v-if="showLabel" class="w-full text-left text-text-sm leading-text-sm text-element-tertiary">
      {{ label }}
    </p>
    <div class="flex w-full items-center gap-2">
      <div :class="`relative ${trackHeight} min-w-0 flex-1 bg-fill-subtle`">
        <div :class="`absolute inset-y-0 left-0 ${STATE_FILL[state]}`" :style="{ width: `${clamped}%` }" />
      </div>
      <div v-if="showValue" class="w-10 shrink-0 text-right">
        <span class="text-text-sm leading-text-sm font-semibold text-element-secondary">{{ clamped }}%</span>
      </div>
    </div>
  </div>
</template>
