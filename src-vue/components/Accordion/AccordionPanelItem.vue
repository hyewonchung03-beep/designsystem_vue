<script setup lang="ts">
import type { AccordionSize } from './Accordion.vue';

withDefaults(defineProps<{ size?: AccordionSize }>(), { size: 'lg' });

const TEXT_CLS: Record<AccordionSize, string> = {
  sm: 'text-text-sm leading-text-sm',
  md: 'text-text-sm leading-text-sm',
  lg: 'text-text-md leading-text-md',
};

const SPACER_W: Record<AccordionSize, string> = { sm: 'w-6', md: 'w-6', lg: 'w-7' };

const PANEL_PADDING: Record<AccordionSize, string> = {
  sm: 'pt-2 pb-6',
  md: 'pt-2 pb-6',
  lg: 'pt-3 pb-9',
};
</script>

<template>
  <div :class="`flex w-full items-center px-4 ${PANEL_PADDING[size]}`">
    <div :class="`shrink-0 ${SPACER_W[size]}`" />
    <div :class="`min-w-0 flex-1 text-element-secondary ${TEXT_CLS[size]}`">
      <slot />
    </div>
  </div>
</template>
