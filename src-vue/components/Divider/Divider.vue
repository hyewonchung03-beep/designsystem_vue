<script lang="ts">
export type DividerType = 'horizontal' | 'vertical';
export type DividerCap = 'round' | 'square';
export type DividerColor = 'G150' | 'G100';
export type DividerSpacing = '0' | '12' | '24';
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: DividerType;
    cap?: DividerCap;
    color?: DividerColor;
    solid?: boolean;
    spacing?: DividerSpacing;
  }>(),
  {
    type: 'horizontal',
    cap: 'square',
    color: 'G100',
    solid: true,
    spacing: '0',
  },
);

// ── Color mapping ────────────────────────────────────────────────────────────

const colorClass = computed(() => {
  if (!props.solid) return 'bg-border-normal-variant';
  return props.color === 'G150' ? 'bg-border-solid' : 'bg-border-solid-variant';
});

const roundedClass = computed(() => (props.cap === 'round' ? 'rounded-2' : ''));

const paddingClass = computed(() => (props.spacing === '12' ? 'px-3' : 'px-6'));
</script>

<template>
  <div
    v-if="type === 'horizontal' && spacing !== '0'"
    role="separator"
    aria-orientation="horizontal"
    :class="`flex w-full flex-col items-start ${paddingClass}`"
  >
    <div :class="`h-px w-full ${colorClass}`" />
  </div>

  <div
    v-else-if="type === 'horizontal'"
    role="separator"
    aria-orientation="horizontal"
    :class="`h-px w-full overflow-hidden ${colorClass} ${roundedClass}`"
  />

  <div
    v-else
    role="separator"
    aria-orientation="vertical"
    :class="`w-px self-stretch overflow-hidden ${colorClass} ${roundedClass}`"
  />
</template>
