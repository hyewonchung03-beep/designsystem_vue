<script lang="ts">
export type TooltipPointerColor = 'black' | 'white';
export type TooltipPointerSize = 'sm' | 'xs';
export type TooltipPointerPlacement = 'start' | 'center' | 'end';
export type TooltipPointerVariant = 'filled' | 'outline';

const pointerFillByColor: Record<TooltipPointerColor, string> = {
  black: 'var(--sol-surface-inverse)',
  white: 'var(--sol-surface-container-highest)',
};
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    color?: TooltipPointerColor;
    size?: TooltipPointerSize;
    placement?: TooltipPointerPlacement;
    variant?: TooltipPointerVariant;
    fill?: string;
  }>(),
  {
    color: 'black',
    size: 'sm',
    placement: 'start',
    variant: 'filled',
  },
);

const alignClass = computed(() =>
  props.placement === 'center'
    ? 'items-center'
    : props.placement === 'end'
      ? 'items-end'
      : 'items-start',
);

const resolvedFill = computed(() => props.fill ?? pointerFillByColor[props.color]);

const arrowSmOutlinePath = 'M5 7.6L11.45 1.2Q12 0.65 12.55 1.2L19 7.6H17.1L12 2.55L6.9 7.6H5Z';
const arrowSmFilledPath: Record<TooltipPointerColor, string> = {
  black: 'M5 8L11.45 1.35Q12 0.8 12.55 1.35L19 8H5Z',
  white: 'M6.4 7.6L11.55 2.25Q12 1.8 12.45 2.25L17.6 7.6H6.4Z',
};

const arrowXsOutlinePath = 'M4 4.3L6.2 1.2Q6.5 0.8 6.8 1.2L9 4.3H7.8L6.5 2.45L5.2 4.3H4Z';
const arrowXsFilledPath = 'M4 4L6.2 1.25Q6.5 0.85 6.8 1.25L9 4H4Z';
</script>

<template>
  <!--
    NOTE: width: 120px has no matching --sol-* token.
    CLAUDE.md violation (no hardcoded px) — left as-is pending a token decision.
  -->
  <div
    class="flex flex-col justify-center"
    :class="[alignClass]"
    style="padding-left: var(--sol-spacing-6); padding-right: var(--sol-spacing-6); width: 120px"
  >
    <svg
      v-if="size === 'sm'"
      width="24"
      height="8"
      viewBox="0 0 24 8"
      fill="none"
      aria-hidden="true"
    >
      <path
        v-if="variant === 'outline'"
        :d="arrowSmOutlinePath"
        fill="var(--sol-border-solid)"
      />
      <path v-else :d="arrowSmFilledPath[color]" :fill="resolvedFill" />
    </svg>
    <svg v-else width="13" height="5" viewBox="0 0 13 5" fill="none" aria-hidden="true">
      <path
        v-if="variant === 'outline'"
        :d="arrowXsOutlinePath"
        fill="var(--sol-border-solid)"
      />
      <path v-else :d="arrowXsFilledPath" :fill="resolvedFill" />
    </svg>
  </div>
</template>
