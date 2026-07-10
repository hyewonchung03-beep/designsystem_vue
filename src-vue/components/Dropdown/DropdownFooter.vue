<!--
  DropdownFooter — Dropdown 패널 하단 액션 바 (control | add)

  React: src/components/Dropdown/Dropdown.tsx (DropdownFooter)
-->
<script lang="ts">
export type DropdownFooterVariant = 'control' | 'add';
</script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: DropdownFooterVariant;
    addLabel?: string;
    showRefresh?: boolean;
  }>(),
  {
    variant: 'control',
    addLabel: 'Add',
    showRefresh: true,
  },
);

defineEmits<{
  add: [];
  refresh: [];
  cancel: [];
  apply: [];
}>();
</script>

<template>
  <div v-if="variant === 'add'" class="flex items-center justify-center border-t border-border-solid p-3">
    <button
      type="button"
      class="flex items-center gap-1 rounded-2 text-text-xs font-semibold leading-text-xs text-primary
        hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
        focus-visible:outline-none focus-visible:shadow-focus-button-ring"
      @click="$emit('add')"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M7.625 3.5H6.375V6.375H3.5V7.625H6.375V10.5H7.625V7.625H10.5V6.375H7.625V3.5Z"
          fill="currentColor"
        />
      </svg>
      {{ addLabel }}
    </button>
  </div>

  <div v-else class="flex items-center justify-end gap-3 border-t border-border-solid p-3">
    <div class="flex min-w-0 flex-1 items-center">
      <button
        v-if="showRefresh"
        type="button"
        class="flex items-center gap-1 rounded-2 text-text-xs font-semibold leading-text-xs text-element-quaternary
          hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
          focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        @click="$emit('refresh')"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M11.6667 7.00033C11.6667 9.57767 9.57767 11.6667 7.00033 11.6667C4.42299 11.6667 2.33366 9.57767 2.33366 7.00033C2.33366 4.42299 4.42299 2.33366 7.00033 2.33366C8.55249 2.33366 9.93109 3.08539 10.7917 4.24251V2.91699H11.6667V5.83366H8.75033V4.95866H10.0921C9.37776 3.86636 8.27036 3.20866 7.00033 3.20866C4.90599 3.20866 3.20866 4.90599 3.20866 7.00033C3.20866 9.09466 4.90599 10.7917 7.00033 10.7917C9.09466 10.7917 10.7917 9.09466 10.7917 7.00033H11.6667Z"
            fill="currentColor"
          />
        </svg>
        Refresh
      </button>
    </div>
    <div class="flex shrink-0 items-center gap-3">
      <button
        type="button"
        class="rounded-2 text-text-xs font-semibold leading-text-xs text-element-quaternary
          hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
          focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        @click="$emit('cancel')"
      >
        Cancel
      </button>
      <button
        type="button"
        class="rounded-2 text-text-xs font-semibold leading-text-xs text-primary
          hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
          focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        @click="$emit('apply')"
      >
        Apply
      </button>
    </div>
  </div>
</template>
