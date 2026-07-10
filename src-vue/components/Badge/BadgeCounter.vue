<!--
  BadgeCounter (badge_counter)

  Figma: badge_counter (YqKny45xSmjr76WGIXeL7P)
    - node 5919-78872

  읽지 않은 수 또는 현재/전체 카운트를 표시하는 배지.
-->
<script setup lang="ts">
withDefaults(
  defineProps<{
    /** 표시할 숫자 */
    count?: number;
    /** 전체 수. 제공 시 "count/total" 형식으로 표시 */
    total?: number;
  }>(),
  {
    count: 1,
  },
);
</script>

<template>
  <span
    class="inline-flex shrink-0 items-center justify-center bg-secondary-container text-element-brand-variant rounded-2 px-sol-4 whitespace-nowrap text-left"
    :style="{
      height: 'var(--sol-gap-16)',
      minWidth: 'var(--sol-gap-16)',
      fontSize: 'var(--sol-font-size-text-xs)',
      lineHeight: 'var(--sol-line-height-text-xs)',
    }"
  >
    <span class="font-semibold">{{ count }}</span>
    <span v-if="total !== undefined" class="font-regular">/{{ total }}</span>
  </span>
</template>
