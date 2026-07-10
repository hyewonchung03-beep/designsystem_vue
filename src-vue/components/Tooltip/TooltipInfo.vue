<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string;
  }>(),
  {
    text: 'text',
  },
);
</script>

<template>
  <!--
    NOTE: max-w-[360px] arbitrary value has no matching --sol-* token.
    CLAUDE.md violation (no hardcoded px) — left as-is pending a token decision.
  -->
  <span class="inline-flex max-w-[360px] flex-col items-start justify-end text-left" role="tooltip">
    <!--
      NOTE: max-width/min-height below have no matching --sol-* token.
      CLAUDE.md violation (no hardcoded px) — left as-is pending a token decision.
    -->
    <span
      class="inline-flex min-w-0 items-center justify-center overflow-hidden"
      style="
        max-width: 360px;
        min-height: 18px;
        padding: var(--sol-spacing-2) var(--sol-spacing-6);
        border-radius: var(--sol-radius-2);
        background: var(--sol-surface-inverse);
        color: var(--sol-element-inverse);
        backdrop-filter: blur(2px);
      "
    >
      <span
        class="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-regular"
        style="font-size: var(--sol-font-size-text-xs); line-height: var(--sol-line-height-text-xs)"
        >{{ text }}</span
      >
    </span>
  </span>
</template>
