<script setup lang="ts">
import type { SideNavItem } from './SideNavigation.vue';

defineProps<{
  item: SideNavItem;
  isExpanded: boolean;
  hasActiveChild: boolean;
  activeId: string;
}>();

const emit = defineEmits<{ toggle: []; select: [id: string] }>();
</script>

<template>
  <div class="flex flex-col gap-1">
    <button
      type="button"
      :disabled="item.disabled"
      class="relative flex h-10 w-full items-center gap-2 overflow-hidden rounded-4 px-2 text-left focus:outline-none"
      :class="item.disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-interaction-neutral-hover'"
      @click="$emit('toggle')"
    >
      <span
        v-if="item.icon"
        class="flex size-5 shrink-0 items-center justify-center"
        :class="
          hasActiveChild ? 'text-element-brand-variant' : item.disabled ? 'text-element-disabled' : 'text-element-secondary'
        "
      >
        <component :is="item.icon" />
      </span>
      <span
        class="flex-1 truncate text-left text-text-md leading-text-md"
        :class="
          hasActiveChild
            ? 'font-semibold text-element-brand-variant'
            : item.disabled
              ? 'font-regular text-element-disabled'
              : 'font-regular text-element-secondary'
        "
      >
        {{ item.label }}
      </span>
      <!-- ic_state: 그룹 펼침/접힘 상태와 1:1로 매핑되는 chevron (Accordion과 동일한 예외 패턴) -->
      <span
        class="shrink-0"
        :class="
          hasActiveChild ? 'text-element-brand-variant' : item.disabled ? 'text-element-disabled' : 'text-element-secondary'
        "
      >
        <svg v-if="isExpanded" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 10L8 6L12 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </button>

    <div v-if="isExpanded && item.children" class="flex flex-col gap-1">
      <button
        v-for="sub in item.children"
        :key="sub.id"
        type="button"
        :disabled="sub.disabled"
        class="relative flex h-10 w-full items-center overflow-hidden rounded-4 pl-9 pr-2 text-left focus:outline-none"
        :class="
          sub.disabled
            ? 'cursor-not-allowed'
            : sub.id === activeId
              ? 'cursor-pointer bg-selected-container'
              : 'cursor-pointer hover:bg-interaction-neutral-hover'
        "
        @click="!sub.disabled && emit('select', sub.id)"
      >
        <span
          class="flex-1 truncate text-left text-text-md leading-text-md"
          :class="
            sub.id === activeId
              ? 'font-semibold text-element-brand-variant'
              : sub.disabled
                ? 'font-regular text-element-disabled'
                : 'font-regular text-element-secondary'
          "
        >
          {{ sub.label }}
        </span>
      </button>
    </div>
  </div>
</template>
