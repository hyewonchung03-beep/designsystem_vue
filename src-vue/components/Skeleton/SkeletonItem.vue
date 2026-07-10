<script lang="ts">
export type SkeletonType = 'bar' | 'rectangle' | 'circle';
</script>

<script setup lang="ts">
withDefaults(defineProps<{ type?: SkeletonType; itemClass?: string }>(), {
  type: 'bar',
});

const SHIMMER =
  "after:absolute after:inset-0 after:content-[''] after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:animate-sol-shimmer";
const BASE = `relative overflow-hidden bg-fill-disabled ${SHIMMER}`;
</script>

<template>
  <div v-if="type === 'bar'" :class="`h-[22px] py-0.5 ${itemClass ?? 'w-full'}`">
    <div :class="`${BASE} h-full rounded-[3px]`" />
  </div>

  <div v-else-if="type === 'circle'" :class="`${BASE} shrink-0 rounded-full ${itemClass ?? 'size-16'}`" />

  <div v-else :class="`${BASE} shrink-0 rounded-[3px] ${itemClass ?? 'size-16'}`" />
</template>
