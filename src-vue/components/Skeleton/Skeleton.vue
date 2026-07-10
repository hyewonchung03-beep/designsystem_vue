<script lang="ts">
export type SkeletonVariant = 'card' | 'text' | 'bar';
</script>

<script setup lang="ts">
import SkeletonItem from './SkeletonItem.vue';

withDefaults(defineProps<{ variant?: SkeletonVariant }>(), {
  variant: 'card',
});
</script>

<template>
  <div class="w-full rounded-4">
    <!-- Card variant -->
    <div v-if="variant === 'card'" class="flex items-center gap-4">
      <!-- Rectangle thumbnail -->
      <SkeletonItem type="rectangle" item-class="size-[82px] rounded-[3px]" />
      <!-- Text bars -->
      <div class="flex flex-1 flex-col gap-2">
        <SkeletonItem item-class="w-full" />
        <SkeletonItem item-class="w-[85px]" />
        <SkeletonItem item-class="w-[85px]" />
      </div>
    </div>

    <!-- Text variant -->
    <div v-else-if="variant === 'text'" class="flex flex-col gap-4">
      <!-- Header row: circle + bar -->
      <div class="flex items-center gap-2">
        <SkeletonItem type="circle" item-class="size-9" />
        <SkeletonItem item-class="w-[120px]" />
      </div>
      <!-- Two columns of bars -->
      <div class="flex items-start justify-between gap-8">
        <div class="flex flex-1 flex-col gap-2">
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </div>
      </div>
    </div>

    <!-- Bar variant -->
    <SkeletonItem v-else-if="variant === 'bar'" type="bar" item-class="w-full" />
  </div>
</template>
