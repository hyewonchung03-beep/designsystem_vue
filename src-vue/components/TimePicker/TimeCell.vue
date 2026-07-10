<!--
  TimeCell — TimePicker 내부 hour/minute/second 셀 (private subcomponent)

  React: src/components/TimePicker/TimePicker.tsx (TimeCell, local function component)
-->
<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string | number;
    selected?: boolean;
  }>(),
  {
    selected: false,
  },
);

defineEmits<{ click: [] }>();
</script>

<template>
  <button
    type="button"
    class="group relative flex items-center justify-center overflow-hidden w-full shrink-0 py-2 cursor-pointer focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]"
    @click="$emit('click')"
  >
    <span
      class="absolute inset-0 rounded-4"
      :style="{ backgroundColor: 'var(--sol-fill-active)', opacity: selected ? 0.12 : 0 }"
    />
    <span class="absolute inset-0 rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
    <span class="relative flex-1 text-text-sm leading-text-sm font-regular text-element-primary text-center overflow-hidden text-ellipsis whitespace-nowrap">
      {{ label }}
    </span>
  </button>
</template>
