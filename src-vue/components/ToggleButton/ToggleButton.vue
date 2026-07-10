<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    selected?: boolean;
    badge?: number;
    showChevron?: boolean;
    disabled?: boolean;
  }>(),
  {
    selected: false,
    showChevron: false,
    disabled: false,
  },
);

defineEmits<{ click: [] }>();
</script>

<template>
  <button
    type="button"
    role="radio"
    :aria-checked="selected"
    :disabled="disabled"
    :class="`group relative flex h-8 shrink-0 items-center justify-center gap-1 overflow-clip rounded-circle px-3 py-2
      ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      ${
        selected
          ? 'bg-tertiary text-element-inverse font-semibold'
          : 'bg-surface-container text-element-quaternary font-regular'
      }
      focus:outline-none focus-visible:shadow-focus-button-ring`"
    @click="!disabled && $emit('click')"
  >
    <!-- Border for unselected -->
    <span v-if="!selected" aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-circle border border-border-normal" />

    <!-- Interaction overlay -->
    <span
      v-if="!disabled"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded-circle
        bg-interaction-neutral-normal
        group-hover:bg-interaction-neutral-hover
        group-active:bg-interaction-neutral-pressed"
    />

    <!-- Label -->
    <span class="relative whitespace-nowrap text-text-md leading-text-md">
      {{ label }}
    </span>

    <!-- Badge -->
    <span v-if="badge != null" class="relative">
      <span class="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-2 bg-secondary-container px-1">
        <span class="whitespace-nowrap text-text-xs leading-text-xs font-semibold text-element-brand-variant">
          {{ badge }}
        </span>
      </span>
    </span>

    <!-- Chevron -->
    <span v-if="showChevron" class="relative flex shrink-0 items-center justify-center size-icon-20">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z"
          fill="currentColor"
        />
      </svg>
    </span>
  </button>
</template>
