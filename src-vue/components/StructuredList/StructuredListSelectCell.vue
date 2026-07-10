<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    condensed?: boolean;
    checked?: boolean;
    disabled?: boolean;
  }>(),
  {
    condensed: false,
    checked: false,
    disabled: false,
  },
);

const emit = defineEmits<{ change: [boolean] }>();

function handleClick() {
  if (!props.disabled) emit('change', !props.checked);
}

// ── Classes ──────────────────────────────────────────────────────────────────

const containerClass = computed(() => [
  'flex min-w-8 w-14 shrink-0 flex-col items-center justify-center text-left',
  props.condensed ? 'min-h-8 pt-2 pb-2' : 'min-h-14 pt-4 pb-6',
]);

const buttonClass = computed(() => [
  'group relative flex size-5 shrink-0 items-center justify-center rounded-full text-left',
  'focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]',
  props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
]);

const radioCircleClass = computed(() => [
  'absolute inset-[16.67%] flex items-center justify-center rounded-full',
  props.checked
    ? props.disabled
      ? 'bg-fill-disabled'
      : 'bg-tertiary'
    : props.disabled
      ? 'border border-border-disabled bg-surface-container'
      : 'border border-border-normal bg-surface-container',
]);

const innerDotClass = computed(() => [
  'size-1.5 rounded-full',
  props.disabled ? 'bg-element-disabled' : 'bg-element-inverse',
]);
</script>

<template>
  <div :class="containerClass">
    <button
      type="button"
      role="radio"
      :aria-checked="checked"
      :disabled="disabled"
      :class="buttonClass"
      @click="handleClick"
    >
      <!-- Interaction overlay (full 20px area) -->
      <span
        v-if="!disabled"
        aria-hidden="true"
        class="absolute inset-0 rounded-full bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
      />

      <!-- Radio circle (inset ~16.67%) -->
      <span :class="radioCircleClass">
        <!-- Inner dot -->
        <span v-if="checked" :class="innerDotClass" />
      </span>
    </button>
  </div>
</template>
