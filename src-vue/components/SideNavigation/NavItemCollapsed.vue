<script setup lang="ts">
import type { SideNavItem } from './SideNavigation.vue';

defineProps<{
  item: SideNavItem;
  isActive: boolean;
}>();

defineEmits<{ click: [] }>();
</script>

<template>
  <div class="group relative">
    <button
      type="button"
      :disabled="item.disabled"
      :title="item.label"
      class="relative flex size-10 items-center justify-center rounded-4 focus:outline-none"
      :class="
        item.disabled
          ? 'cursor-not-allowed'
          : isActive
            ? 'cursor-pointer bg-selected-container'
            : 'cursor-pointer hover:bg-interaction-neutral-hover'
      "
      @click="$emit('click')"
    >
      <span
        class="flex size-5 items-center justify-center"
        :class="isActive ? 'text-element-brand-variant' : item.disabled ? 'text-element-disabled' : 'text-element-secondary'"
      >
        <component :is="item.icon" v-if="item.icon" />
      </span>
    </button>
    <div class="pointer-events-none absolute left-full top-1/2 z-50 ml-2 hidden -translate-y-1/2 items-center group-hover:flex">
      <div class="whitespace-nowrap rounded-2 bg-surface-inverse px-1.5 py-0.5 text-text-xs leading-text-xs text-element-inverse">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
