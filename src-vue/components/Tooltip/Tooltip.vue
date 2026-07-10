<script lang="ts">
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

// NOTE: raw px offsets below (-8px, -64px) have no matching --sol-* token.
// CLAUDE.md violation (no hardcoded px) — left as-is pending a token decision.
const pointerPositionByPlacement: Record<TooltipPlacement, Record<string, string>> = {
  top: {
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%) rotate(180deg)',
    transformOrigin: 'center',
  },
  bottom: {
    top: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    transformOrigin: 'center',
  },
  left: {
    top: '50%',
    right: '-64px',
    transform: 'translateY(-50%) rotate(90deg)',
    transformOrigin: 'center',
  },
  right: {
    top: '50%',
    left: '-64px',
    transform: 'translateY(-50%) rotate(-90deg)',
    transformOrigin: 'center',
  },
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import IcResponsive from '../Icon/IcResponsive.vue';
import TooltipPointer from './TooltipPointer.vue';

const props = withDefaults(
  defineProps<{
    placement?: TooltipPlacement;
    showLeadingIcon?: boolean;
    showTrailingIcon?: boolean;
    text?: string;
  }>(),
  {
    placement: 'bottom',
    showLeadingIcon: true,
    showTrailingIcon: true,
    text: 'text',
  },
);

const pointerStyle = computed(() => pointerPositionByPlacement[props.placement]);
</script>

<template>
  <!--
    NOTE: max-w-[360px] arbitrary value has no matching --sol-* token.
    CLAUDE.md violation (no hardcoded px) — left as-is pending a token decision.
  -->
  <span
    class="relative inline-flex max-w-[360px] items-center text-left text-element-inverse"
    role="tooltip"
  >
    <!--
      NOTE: max-width/min-height below have no matching --sol-* token.
      CLAUDE.md violation (no hardcoded px) — left as-is pending a token decision.
    -->
    <span
      class="inline-flex min-w-0 items-center justify-center overflow-hidden bg-surface-inverse text-element-inverse"
      style="
        gap: var(--sol-spacing-4);
        max-width: 360px;
        min-height: 24px;
        padding: var(--sol-spacing-4) var(--sol-spacing-8);
        border-radius: var(--sol-radius-4);
        backdrop-filter: blur(2px);
      "
    >
      <IcResponsive v-if="showLeadingIcon" :size="14" class="text-element-inverse">
        <slot name="leadingIcon" />
      </IcResponsive>
      <span
        class="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-regular"
        style="font-size: var(--sol-font-size-text-sm); line-height: var(--sol-line-height-text-xs-2line)"
        >{{ text }}</span
      >
      <IcResponsive v-if="showTrailingIcon" :size="14" class="text-element-inverse">
        <slot name="trailingIcon" />
      </IcResponsive>
    </span>
    <span
      class="pointer-events-none absolute flex items-center justify-center"
      :style="pointerStyle"
      aria-hidden="true"
    >
      <TooltipPointer color="black" size="sm" placement="center" fill="var(--sol-surface-inverse)" />
    </span>
  </span>
</template>
