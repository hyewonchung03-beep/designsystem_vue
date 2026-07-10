<script lang="ts">
export type TextLabelSize = 'md' | 'sm';
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    label: string;
    required?: boolean;
    size?: TextLabelSize;
  }>(),
  {
    required: false,
    size: 'md',
  },
);

const isMd = computed(() => props.size === 'md');

const rootClass = computed(() => [
  'flex items-center gap-1 text-left',
  isMd.value ? 'mb-2' : 'mb-1',
]);

const textSizeClass = computed(() =>
  isMd.value ? 'text-text-sm leading-text-sm' : 'text-text-xs leading-text-xs',
);
</script>

<template>
  <div :class="rootClass">
    <span :class="['font-regular text-element-tertiary', textSizeClass]">{{ label }}</span>
    <span v-if="required" :class="['font-regular text-error', textSizeClass]">*</span>
  </div>
</template>
