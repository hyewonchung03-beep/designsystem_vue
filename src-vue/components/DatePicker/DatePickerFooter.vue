<!--
  DatePickerFooter — internal helper (not exported). Named "DatePickerFooter"
  rather than the React source's local name "OverlayFooter" to avoid reading
  as the same component as OverlayFooterPopover / OverlayFooterModal
  elsewhere in the codebase — this one is DatePicker-specific and has a
  different layout (Cancel/Select + optional "Clear all", no step/mobile
  variants).

  `showClearAll` replaces the React source's presence-check on the optional
  `onClearAll` prop (`{onClearAll && (...)}"`).

  React: src/components/DatePicker/DatePicker.tsx (OverlayFooter, local function)
-->
<script setup lang="ts">
withDefaults(
  defineProps<{
    showClearAll?: boolean;
  }>(),
  {
    showClearAll: false,
  },
);

defineEmits<{ cancel: []; confirm: []; clearAll: [] }>();
</script>

<template>
  <div class="shrink-0 w-full">
    <div class="h-px bg-border-solid-variant" />
    <div class="flex items-center justify-end gap-5 py-4 px-5">
      <button
        v-if="showClearAll"
        type="button"
        class="group relative flex flex-1 items-center gap-sol-6 cursor-pointer rounded-2 focus:outline-none"
        @click="$emit('clearAll')"
      >
        <span
          class="absolute rounded-2 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
          style="inset: calc(var(--sol-gap-2) * -1)"
        />
        <span class="relative text-text-sm leading-text-sm font-semibold text-element-quaternary whitespace-nowrap">
          Clear all
        </span>
      </button>
      <button
        type="button"
        class="group relative flex items-center justify-center cursor-pointer rounded-2 focus:outline-none"
        @click="$emit('cancel')"
      >
        <span
          class="absolute rounded-2 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
          style="inset: calc(var(--sol-gap-2) * -1)"
        />
        <span class="relative text-text-sm leading-text-sm font-semibold text-element-quaternary whitespace-nowrap">
          Cancel
        </span>
      </button>
      <button
        type="button"
        class="group relative flex items-center justify-end cursor-pointer rounded-2 focus:outline-none"
        @click="$emit('confirm')"
      >
        <span
          class="absolute rounded-2 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
          style="inset: calc(var(--sol-gap-2) * -1)"
        />
        <span class="relative text-text-sm leading-text-sm font-semibold text-element-brand whitespace-nowrap">
          Select
        </span>
      </button>
    </div>
  </div>
</template>
