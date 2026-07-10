<script lang="ts">
export type SegmentedControlItem = {
  label: string;
};

export type SegmentedControlType = 'outlined' | 'solid';
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = withDefaults(
  defineProps<{
    items: SegmentedControlItem[];
    type?: SegmentedControlType;
    selectedIndex?: number;
    disabled?: boolean;
  }>(),
  {
    type: 'outlined',
    disabled: false,
  },
);

const emit = defineEmits<{ select: [number] }>();

const internalIndex = ref(0);
const activeIndex = computed(() => props.selectedIndex ?? internalIndex.value);
const isSolid = computed(() => props.type === 'solid');

function handleSelect(index: number) {
  if (props.disabled) return;
  emit('select', index);
  if (props.selectedIndex === undefined) {
    internalIndex.value = index;
  }
}

function outlinedRounding(index: number) {
  if (index === 0) return 'rounded-l-4';
  if (index === props.items.length - 1) return 'rounded-r-4';
  return '';
}
</script>

<template>
  <div
    role="tablist"
    :class="`relative flex h-8 w-full items-center overflow-clip rounded-4 text-left ${isSolid ? 'bg-surface-container-low p-[3px]' : ''}`"
  >
    <!-- Outer border (outlined only) -->
    <span
      v-if="!isSolid"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded-4 border border-border-normal"
    />

    <button
      v-for="(item, index) in items"
      :key="index"
      type="button"
      role="tab"
      :aria-selected="index === activeIndex"
      :disabled="disabled"
      :class="`group relative flex h-full flex-1 items-center justify-center overflow-clip
        ${isSolid ? 'rounded-2' : outlinedRounding(index)}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        focus:outline-none focus-visible:shadow-focus-button-ring`"
      @click="handleSelect(index)"
    >
      <!-- ── Solid active: white bg + shadow ── -->
      <span
        v-if="isSolid && index === activeIndex"
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 rounded-2 bg-secondary shadow-extralight"
      />

      <!-- ── Outlined active: tertiary bg + border ── -->
      <span
        v-if="!isSolid && index === activeIndex"
        aria-hidden="true"
        :class="`pointer-events-none absolute inset-0 bg-tertiary-container border border-tertiary ${outlinedRounding(index)}`"
      />

      <!-- Right divider for inactive outlined segments -->
      <span
        v-if="!isSolid && index !== activeIndex && index !== items.length - 1"
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 border-r border-border-normal"
      />

      <!-- Interaction overlay -->
      <span
        v-if="!disabled"
        aria-hidden="true"
        :class="`pointer-events-none absolute inset-0
          ${isSolid ? 'rounded-2' : outlinedRounding(index)}
          bg-interaction-neutral-normal
          group-hover:bg-interaction-neutral-hover
          group-active:bg-interaction-neutral-pressed`"
      />

      <!-- Label -->
      <span
        :class="`relative whitespace-nowrap text-left font-semibold
          ${isSolid ? 'px-sol-12 text-text-xs leading-text-xs' : 'px-sol-8 text-text-xs leading-text-xs'}
          ${
            isSolid
              ? index === activeIndex
                ? 'text-element-primary'
                : 'text-element-quaternary'
              : index === activeIndex
                ? 'text-element-brand-variant'
                : 'text-element-quaternary'
          }
          ${disabled ? 'opacity-50' : ''}`"
      >
        {{ item.label }}
      </span>
    </button>
  </div>
</template>
