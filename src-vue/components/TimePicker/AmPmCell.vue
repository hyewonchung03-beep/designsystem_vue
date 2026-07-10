<!--
  AmPmCell — TimePicker 내부 AM/PM 셀 (private subcomponent)
  TimeCell과 동일한 높이(py-2). Selected: 전체 폭 보라색 채움(inset 2px).

  React: src/components/TimePicker/TimePicker.tsx (AmPmCell, local function component)
-->
<script setup lang="ts">
withDefaults(
  defineProps<{
    label: 'AM' | 'PM';
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
    class="group relative flex items-center justify-center overflow-hidden w-full shrink-0 py-2 cursor-pointer focus:outline-none"
    @click="$emit('click')"
  >
    <template v-if="selected">
      <span
        class="absolute inset-0.5 rounded-4"
        :style="{ backgroundColor: 'var(--sol-fill-active)' }"
      />
      <span class="absolute inset-0.5 rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
      <span class="relative flex-1 text-text-sm leading-text-sm font-semibold text-static-white text-center">
        {{ label }}
      </span>
    </template>
    <template v-else>
      <span class="absolute inset-0 rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
      <span class="relative flex-1 text-text-sm leading-text-sm font-regular text-element-primary text-center">
        {{ label }}
      </span>
    </template>
  </button>
</template>
