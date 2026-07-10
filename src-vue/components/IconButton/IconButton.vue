<script lang="ts">
export type IconButtonStyle = 'square' | 'circle';
export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type IconButtonSize = 'sm' | 'md' | 'lg';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import IcResponsive, { type IconSize } from '../Icon/IcResponsive.vue';

const props = withDefaults(
  defineProps<{
    buttonStyle?: IconButtonStyle;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    disabled?: boolean;
    ariaLabel: string;
  }>(),
  {
    buttonStyle: 'square',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
);

defineEmits<{ click: [MouseEvent] }>();

// ── Size tokens ────────────────────────────────────────────────────────────

const CONTAINER_SIZE: Record<IconButtonSize, string> = {
  sm: 'size-8',
  md: 'size-9',
  lg: 'size-sol-42',
};

const ICON_SIZE_MAP: Record<IconButtonSize, IconSize> = {
  sm: 16,
  md: 20,
  lg: 24,
};

// ── Style tokens ───────────────────────────────────────────────────────────

const RADIUS: Record<IconButtonStyle, string> = {
  circle: 'rounded-circle',
  square: 'rounded-4',
};

const VARIANT_CLS: Record<IconButtonVariant, string> = {
  primary: 'bg-primary text-element-inverse',
  secondary: 'bg-secondary border border-border-normal text-element-primary',
  tertiary: 'bg-tertiary text-element-inverse',
};

const INTERACTION_CLS: Record<IconButtonVariant, string> = {
  primary:
    'bg-interaction-inverse-normal group-hover/btn:bg-interaction-inverse-hover group-active/btn:bg-interaction-inverse-pressed',
  secondary:
    'bg-interaction-neutral-normal group-hover/btn:bg-interaction-neutral-hover group-active/btn:bg-interaction-neutral-pressed',
  tertiary:
    'bg-interaction-inverse-normal group-hover/btn:bg-interaction-inverse-hover group-active/btn:bg-interaction-inverse-pressed',
};

const radius = computed(() => RADIUS[props.buttonStyle]);

const buttonClass = computed(() => [
  'group/btn relative inline-flex items-center justify-center overflow-clip',
  CONTAINER_SIZE[props.size],
  radius.value,
  props.disabled
    ? 'bg-fill-disabled text-element-disabled cursor-not-allowed'
    : `${VARIANT_CLS[props.variant]} cursor-pointer`,
  'focus:outline-none focus-visible:shadow-focus-button-ring',
]);

const interactionClass = computed(() => [
  'pointer-events-none absolute',
  props.variant === 'secondary' ? '-inset-px' : 'inset-0',
  radius.value,
  INTERACTION_CLS[props.variant],
]);
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :class="buttonClass"
    @click="!disabled && $emit('click', $event)"
  >
    <IcResponsive :size="ICON_SIZE_MAP[size]">
      <slot name="icon" />
    </IcResponsive>

    <span v-if="!disabled" aria-hidden="true" :class="interactionClass" />
  </button>
</template>
