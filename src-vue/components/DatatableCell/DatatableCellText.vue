<script lang="ts">
export type DatatableCellTextSize = 'sm' | 'md' | 'lg';
export type DatatableCellTextType = 'regular' | 'semibold' | 'null';

export type DatatableCellTextProps = {
  text?: string;
  size?: DatatableCellTextSize;
  type?: DatatableCellTextType;
  className?: string;
};
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<DatatableCellTextProps>(), {
  text: 'Content',
  size: 'sm',
  type: 'regular',
  className: '',
});

// ── Size → text token ────────────────────────────────────────────────────────

const sizeTextClass: Record<DatatableCellTextSize, string> = {
  sm: 'text-text-xs leading-text-xs',
  md: 'text-text-sm leading-text-sm',
  lg: 'text-text-md leading-text-md',
};

const isNull = computed(() => props.type === 'null');
const colorCls = computed(() => (isNull.value ? 'text-element-disabled' : 'text-element-secondary'));
const fontCls = computed(() => (props.type === 'semibold' ? 'font-semibold' : 'font-regular'));
</script>

<template>
  <span :class="`${sizeTextClass[size]} ${fontCls} ${colorCls} whitespace-nowrap text-left ${className}`">
    {{ isNull ? '-' : text }}
  </span>
</template>
