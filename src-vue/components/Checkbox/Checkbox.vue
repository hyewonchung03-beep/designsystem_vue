<script lang="ts">
export type CheckboxSize = 'sm' | 'md' | 'lg';
</script>

<script setup lang="ts">
import { computed, useId } from 'vue';

const props = withDefaults(
  defineProps<{
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    label?: string;
    size?: CheckboxSize;
    id?: string;
    ariaLabel?: string;
  }>(),
  {
    checked: false,
    indeterminate: false,
    disabled: false,
    size: 'md',
  },
);

const emit = defineEmits<{ change: [boolean] }>();

// ── Size config ────────────────────────────────────────────────────────────

const sizeConfig: Record<CheckboxSize, { outer: string; box: string; checkW: number; checkH: number }> = {
  sm: { outer: 'size-5', box: 'size-3.5', checkW: 10.598, checkH: 7.594 },
  md: { outer: 'size-6', box: 'size-4', checkW: 12.112, checkH: 8.67927 },
  lg: { outer: 'size-7', box: 'size-5', checkW: 15.14, checkH: 10.849 },
};

const autoId = useId();
const id = computed(() => props.id ?? autoId);
const isFilled = computed(() => props.checked || props.indeterminate);
const cfg = computed(() => sizeConfig[props.size]);

function handleChange(e: Event) {
  emit('change', (e.target as HTMLInputElement).checked);
}
</script>

<template>
  <label
    :for="id"
    :class="`group inline-flex items-center gap-1.5 text-left ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`"
  >
    <input
      :id="id"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      :indeterminate="indeterminate"
      :aria-checked="indeterminate ? 'mixed' : checked"
      :aria-label="ariaLabel"
      class="peer sr-only"
      @change="handleChange"
    />

    <span
      aria-hidden="true"
      :class="`relative inline-flex ${cfg.outer} shrink-0 items-center justify-center
        focus-visible:shadow-focus-button-ring
        peer-focus-visible:shadow-focus-button-ring`"
    >
      <span
        :class="`relative inline-flex ${cfg.box} items-center justify-center overflow-clip rounded-2
          ${
            isFilled
              ? disabled
                ? 'bg-fill-disabled'
                : 'bg-tertiary'
              : disabled
                ? 'border border-border-disabled bg-fill-disabled'
                : 'border border-element-quaternary'
          }`"
      >
        <span v-if="isFilled" class="text-element-inverse">
          <svg v-if="indeterminate" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="size-full">
            <path d="M20.25 11.25V12.75H3.75V11.25H20.25Z" fill="currentColor" />
          </svg>
          <svg v-else :width="cfg.checkW" :height="cfg.checkH" viewBox="0 0 12.112 8.67927" fill="none" aria-hidden="true">
            <path
              d="M12.112 1.06055L4.71289 8.45964C4.41999 8.75245 3.94521 8.7525 3.65234 8.45964L0 4.80729L1.06055 3.74674L4.18229 6.86849L11.0514 0L12.112 1.06055Z"
              fill="currentColor"
            />
          </svg>
        </span>

        <span
          v-if="!disabled"
          class="pointer-events-none absolute inset-0
            bg-interaction-inverse-normal
            group-hover:bg-interaction-inverse-hover
            group-active:bg-interaction-inverse-pressed"
        />
      </span>
    </span>

    <span v-if="label" :class="`text-text-sm leading-text-sm ${disabled ? 'text-element-disabled' : 'text-element-primary'}`">
      {{ label }}
    </span>
  </label>
</template>
