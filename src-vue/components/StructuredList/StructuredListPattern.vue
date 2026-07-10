<script lang="ts">
import type { StructuredListGridProps } from './StructuredListGrid.vue';

export type StructuredListPatternOrientation = 'horizontal' | 'vertical';

export type StructuredListPatternProps = {
  orientation?: StructuredListPatternOrientation;
  title?: string;
  showHeader?: boolean;
  grids: StructuredListGridProps[];
  class?: string;
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import StructuredListGrid from './StructuredListGrid.vue';

const props = withDefaults(defineProps<Omit<StructuredListPatternProps, 'class'>>(), {
  orientation: 'horizontal',
  title: 'Section Header',
  showHeader: true,
});

const isHorizontal = computed(() => props.orientation === 'horizontal');
const headerTextClass = computed(() =>
  isHorizontal.value ? 'text-text-lg leading-text-lg' : 'text-text-md leading-text-md',
);
</script>

<template>
  <div class="flex flex-col items-start w-full text-left">
    <!-- ── Section header ── -->
    <div v-if="showHeader" class="flex flex-col items-start shrink-0 w-full text-left">
      <span :class="[headerTextClass, 'font-semibold text-element-primary whitespace-nowrap text-left']">
        {{ title }}
      </span>
      <div class="shrink-0 w-full h-2" />
    </div>

    <!-- ── Grids ── -->
    <div :class="['flex items-start shrink-0 w-full', isHorizontal ? 'flex-col' : 'flex-row']">
      <StructuredListGrid v-for="(gridProps, i) in grids" :key="i" v-bind="gridProps" />
    </div>
  </div>
</template>
