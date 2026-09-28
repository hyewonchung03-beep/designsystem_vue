<script setup lang="ts">
import type { SideNavItem } from './SideNavigation.vue';

defineProps<{
  item: SideNavItem;
  isActive: boolean;
}>();

defineEmits<{ click: [] }>();
</script>

<template>
  <button
    type="button"
    :disabled="item.disabled"
    class="relative flex h-10 w-full items-center gap-2 overflow-hidden rounded-4 px-2 text-left focus:outline-none"
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
      v-if="item.icon"
      class="flex size-5 shrink-0 items-center justify-center"
      :class="isActive ? 'text-element-brand-variant' : item.disabled ? 'text-element-disabled' : 'text-element-secondary'"
    >
      <component :is="item.icon" />
    </span>
    <span
      class="flex-1 truncate text-left text-text-md leading-text-md"
      :class="
        isActive
          ? 'font-semibold text-element-brand-variant'
          : item.disabled
            ? 'font-regular text-element-disabled'
            : 'font-regular text-element-secondary'
      "
    >
      {{ item.label }}
    </span>
  </button>
</template>
