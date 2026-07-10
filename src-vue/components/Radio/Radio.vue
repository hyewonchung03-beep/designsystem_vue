<script lang="ts">
export type RadioSize = 'sm' | 'md';
</script>

<script setup lang="ts">
import { computed, inject, useId } from 'vue';
import IcTrigger from '../Icon/IcTrigger.vue';
import IcHelp from '../Icon/IcHelp.vue';
import { RadioContextKey, type RadioContextValue } from './RadioGroup.vue';

const props = withDefaults(
  defineProps<{
    value: string;
    label?: string;
    description?: string;
    required?: boolean;
    error?: boolean;
    disabled?: boolean;
    size?: RadioSize;
    helpIcon?: boolean;
    helpAriaLabel?: string;
    id?: string;
  }>(),
  {
    required: false,
    error: false,
    disabled: false,
    size: 'sm',
    helpIcon: false,
    helpAriaLabel: '도움말',
  },
);

const emit = defineEmits<{
  helpClick: [];
}>();

// ── Size configs ───────────────────────────────────────────────────────────

type SizeCfg = {
  hit: string;
  ring: string;
  dot: string;
  title: string;
  description: string;
  helpIconSize: 14 | 16;
};

const sizeConfig: Record<RadioSize, SizeCfg> = {
  sm: {
    hit: 'size-6',
    ring: 'size-4',
    dot: 'size-2',
    title: 'text-text-xs leading-text-xs',
    description: 'text-text-xxs leading-text-xxs',
    helpIconSize: 14,
  },
  md: {
    hit: 'size-7',
    ring: 'size-5',
    dot: 'size-2.5',
    title: 'text-text-sm leading-text-sm',
    description: 'text-text-xs leading-text-xs',
    helpIconSize: 16,
  },
};

const autoId = useId();
const id = computed(() => props.id ?? autoId);
const cfg = computed(() => sizeConfig[props.size]);

// RadioGroup is the intended parent (translated from React's RadioContext via
// provide/inject), but Radio degrades gracefully to an unnamed/unchecked
// input if used standalone.
const ctx = inject<RadioContextValue | null>(RadioContextKey, null);

const name = computed(() => ctx?.name ?? '');
const checked = computed(() => ctx?.value === props.value);
const disabled = computed(() => props.disabled || ctx?.disabled || false);

function handleChange() {
  if (!disabled.value) ctx?.onChange?.(props.value);
}
</script>

<template>
  <label
    :for="id"
    :class="`group inline-flex items-start gap-1.5 text-left ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`"
  >
    <!-- Hidden native input -->
    <input
      :id="id"
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      :aria-invalid="error || undefined"
      class="peer sr-only"
      @change="handleChange"
    />

    <!-- Visual radio -->
    <span
      aria-hidden="true"
      :class="`relative inline-flex ${cfg.hit} shrink-0 items-center justify-center
        peer-focus-visible:shadow-focus-button-ring peer-focus-visible:rounded-circle`"
    >
      <span
        :class="`relative inline-flex ${cfg.ring} items-center justify-center overflow-clip rounded-circle
          ${
            checked
              ? disabled
                ? 'bg-fill-disabled'
                : error
                  ? 'bg-error'
                  : 'bg-tertiary'
              : disabled
                ? 'border border-border-disabled'
                : error
                  ? 'border border-error-dim'
                  : 'border border-element-quaternary'
          }`"
      >
        <!-- Inner dot -->
        <span
          v-if="checked"
          :class="`${cfg.dot} rounded-circle ${disabled ? 'bg-element-disabled' : 'bg-element-inverse'}`"
        />

        <!-- Interaction overlay -->
        <span
          v-if="!disabled"
          class="pointer-events-none absolute inset-0 rounded-circle
            bg-interaction-inverse-normal
            group-hover:bg-interaction-inverse-hover
            group-active:bg-interaction-inverse-pressed"
        />
      </span>
    </span>

    <!-- Label -->
    <span v-if="label" class="flex min-w-0 flex-1 flex-col justify-center gap-0.5 text-left">
      <span class="flex items-center gap-0.5">
        <span :class="`${cfg.title} ${disabled ? 'text-element-disabled' : 'text-element-primary'}`">
          {{ label }}
        </span>
        <IcTrigger
          v-if="helpIcon"
          :size="cfg.helpIconSize"
          :aria-label="helpAriaLabel"
          :disabled="disabled"
          @click="emit('helpClick')"
        >
          <IcHelp :size="cfg.helpIconSize" />
        </IcTrigger>
        <span v-if="required" :class="`${cfg.title} text-error`">*</span>
      </span>
      <span v-if="description" :class="`${cfg.description} text-element-tertiary`">{{ description }}</span>
    </span>
  </label>
</template>
