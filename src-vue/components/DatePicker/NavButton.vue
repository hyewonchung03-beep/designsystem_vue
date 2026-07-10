<!--
  NavButton — internal helper (not exported from index.ts / React source
  either). ic_trigger: 20px chevron icon + -4px inset hit/hover circle.

  React: src/components/DatePicker/DatePicker.tsx (NavButton, local function)
-->
<script lang="ts">
export type NavButtonIcon = 'prev' | 'next';
</script>

<script setup lang="ts">
defineProps<{
  icon: NavButtonIcon;
}>();

defineEmits<{ click: [] }>();
</script>

<template>
  <div class="flex items-center justify-center size-5 shrink-0">
    <button
      type="button"
      class="group relative flex items-center justify-center size-5 cursor-pointer text-element-quaternary focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]"
      @click="$emit('click')"
    >
      <span
        class="absolute rounded-full bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
        style="inset: calc(var(--sol-gap-4) * -1)"
      />
      <span class="relative">
        <svg v-if="icon === 'prev'" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15.5302 6.53027L10.0605 12L15.5302 17.4697L14.4697 18.5303L8.46967 12.5303C8.17678 12.2374 8.17678 11.7626 8.46967 11.4697L14.4697 5.46973L15.5302 6.53027Z"
            fill="currentColor"
          />
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15.5303 11.4697C15.8232 11.7626 15.8232 12.2374 15.5303 12.5303L9.53027 18.5303L8.46973 17.4697L13.9395 12L8.46973 6.53027L9.53027 5.46973L15.5303 11.4697Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </button>
  </div>
</template>
