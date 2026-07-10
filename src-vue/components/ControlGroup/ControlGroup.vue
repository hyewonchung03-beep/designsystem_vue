<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    legend: string;
    required?: boolean;
    helperText?: string;
    error?: boolean;
    disabled?: boolean;
    orientation?: 'vertical' | 'horizontal';
    columns?: 1 | 2 | 3;
  }>(),
  {
    required: false,
    error: false,
    disabled: false,
    orientation: 'vertical',
    columns: 1,
  },
);

const gridClass = computed(() => {
  if (props.orientation === 'horizontal') return 'flex flex-row flex-wrap gap-x-6 gap-y-2';
  if (props.columns === 1) return 'flex flex-col gap-2';
  if (props.columns === 2) return 'grid grid-cols-2 gap-x-6 gap-y-2';
  return 'grid grid-cols-3 gap-x-6 gap-y-2';
});
</script>

<template>
  <fieldset
    :disabled="disabled"
    class="m-0 min-w-0 border-0 p-0 text-left"
    :aria-describedby="helperText ? 'cg-helper' : undefined"
  >
    <!-- Legend (group label) -->
    <legend class="mb-2 flex items-center gap-1 p-0 text-left">
      <span
        :class="`text-text-sm font-regular leading-text-sm ${disabled ? 'text-element-disabled' : 'text-element-tertiary'}`"
      >
        {{ legend }}
      </span>
      <span
        v-if="required"
        :class="`text-text-sm font-regular leading-text-sm ${disabled ? 'text-element-disabled' : 'text-error'}`"
      >
        *
      </span>
    </legend>

    <!-- Control items -->
    <div :class="gridClass">
      <slot />
    </div>

    <!-- Helper / Error text -->
    <p
      v-if="helperText"
      id="cg-helper"
      :class="`mt-2 text-left text-text-xs font-regular leading-text-xs ${error ? 'text-error-dim' : 'text-element-tertiary'}`"
      :role="error ? 'alert' : undefined"
    >
      {{ helperText }}
    </p>
  </fieldset>
</template>
