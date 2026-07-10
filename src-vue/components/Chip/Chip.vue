<!--
  Chip (combo_chip)

  Figma: combo_chip (YqKny45xSmjr76WGIXeL7P)
    - All variants: node 969-214498
    - sm selected:  node 6032-86810
    - md selected:  node 6032-89899
-->
<script lang="ts">
export type ChipSize = 'sm' | 'md';
export type ChipState = 'enabled' | 'disabled' | 'error';
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import IcResponsive, { type IconSize } from '../Icon/IcResponsive.vue';

const props = withDefaults(
  defineProps<{
    label: string;
    size?: ChipSize;
    state?: ChipState;
    selected?: boolean;
  }>(),
  {
    size: 'md',
    state: 'enabled',
    selected: false,
  },
);

defineEmits<{ click: [MouseEvent] }>();

const slots = useSlots();

// ── Icon size mapping (Figma: ic_responsive 허용 크기만 사용) ────────────────

const iconSizeMap: Record<ChipSize, IconSize> = { sm: 14, md: 16 };

// ── Style helpers ─────────────────────────────────────────────────────────

function getBgClass(selected: boolean, state: ChipState): string {
  if (state === 'disabled') return 'bg-fill-disabled';
  if (state === 'error') return selected ? 'bg-error-container' : '';
  return selected ? 'bg-secondary-container' : 'bg-surface-container';
}

function getBorderClass(state: ChipState): string {
  return state === 'error' ? 'border-error-variant' : 'border-border-normal';
}

function getTextClass(selected: boolean, state: ChipState): string {
  if (state === 'disabled') return 'text-element-disabled';
  if (state === 'error') return 'text-error-dim';
  return selected ? 'text-element-brand-variant' : 'text-element-tertiary';
}

const isDisabled = computed(() => props.state === 'disabled');
const isSm = computed(() => props.size === 'sm');
const iconSize = computed(() => iconSizeMap[props.size]);

const chipClass = computed(() => [
  'relative inline-flex w-fit items-center overflow-hidden border font-regular whitespace-nowrap text-left',
  isSm.value ? 'h-5 gap-sol-2 px-sol-4 py-sol-2 rounded-2' : 'gap-sol-4 px-sol-6 py-sol-4 rounded-4',
  getBgClass(props.selected, props.state),
  getBorderClass(props.state),
  getTextClass(props.selected, props.state),
  isDisabled.value ? 'cursor-not-allowed' : 'cursor-pointer',
]);

const labelClass = computed(() => (isSm.value ? 'text-text-xs leading-text-xs' : 'text-text-sm leading-text-sm'));
</script>

<template>
  <button type="button" :disabled="isDisabled" :class="chipClass" @click="!isDisabled && $emit('click', $event)">
    <IcResponsive v-if="slots.leftIcon" :size="iconSize">
      <slot name="leftIcon" />
    </IcResponsive>
    <span :class="labelClass">{{ label }}</span>
    <IcResponsive v-if="slots.rightIcon" :size="iconSize">
      <slot name="rightIcon" />
    </IcResponsive>
  </button>
</template>
