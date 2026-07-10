<script lang="ts">
export type EmptyStateType = 'widget' | 'data' | 'event' | 'store';
</script>

<script setup lang="ts">
import IcBlank from '../Icon/IcBlank.vue';

withDefaults(
  defineProps<{
    /** 아이콘 종류 */
    type?: EmptyStateType;
  }>(),
  { type: 'widget' },
);
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center" :style="{ padding: 'var(--sol-spacing-24)', gap: 'var(--sol-spacing-4)' }">
    <span class="shrink-0 text-element-quaternary">
      <IcBlank :size="32" />
    </span>
    <p
      v-if="$slots.default"
      class="text-center font-regular text-element-disabled [&_strong]:font-semibold"
      :style="{
        fontSize: 'var(--sol-font-size-text-sm)',
        lineHeight: 'var(--sol-line-height-text-xs-2line)',
      }"
    >
      <slot />
    </p>
    <div v-if="$slots.action" class="mt-2">
      <slot name="action" />
    </div>
  </div>
</template>
