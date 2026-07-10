<!--
  Badge (badge)

  Figma: badge (YqKny45xSmjr76WGIXeL7P)
    - All variants: node 194-3971
    - Badge frame: node 1025-494154

  Pill형 라벨 컴포넌트. outlined 타입이 기본.
-->
<script lang="ts">
export type BadgeOption =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'lightBlue'
  | 'indigo'
  | 'pink'
  | 'purple'
  | 'neutral';

export type BadgeType = 'outlined' | 'solid';
export type BadgeSize = 'sm' | 'md';
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import IcResponsive, { type IconSize } from '../Icon/IcResponsive.vue';

const props = withDefaults(
  defineProps<{
    label: string;
    size?: BadgeSize;
    type?: BadgeType;
    option?: BadgeOption;
    showLeftIndicator?: boolean;
  }>(),
  {
    size: 'sm',
    type: 'outlined',
    option: 'red',
    showLeftIndicator: false,
  },
);

const slots = useSlots();

// ── Size tokens ────────────────────────────────────────────────────────────

const TEXT_CLS: Record<BadgeSize, string> = {
  sm: 'text-text-xs leading-text-xs',
  md: 'text-text-sm leading-text-sm',
};

const ICON_SIZE: Record<BadgeSize, IconSize> = {
  sm: 16,
  md: 20,
};

// indicator: sm=7px(no token), md=8px(size-2=sol-gap-8)
const INDICATOR_CLS: Record<BadgeSize, string> = {
  sm: 'size-[7px]',
  md: 'size-2',
};

// ── Color config ───────────────────────────────────────────────────────────
// outlined border: -200 primitive tokens (no --sol-* semantic equivalent exists)
// solid bg: -container tokens registered in @theme

type ColorConfig = {
  text: string;
  border: string;
  bg: string;
};

const COLOR_CONFIG: Record<BadgeOption, ColorConfig> = {
  red: { text: 'text-error', border: 'border-error-variant', bg: 'bg-error-container' },
  orange: { text: 'text-orange', border: 'border-orange-surface-outline', bg: 'bg-orange-container' },
  yellow: { text: 'text-yellow', border: 'border-yellow-surface-outline', bg: 'bg-yellow-container' },
  green: { text: 'text-green', border: 'border-green-surface-outline', bg: 'bg-green-container' },
  teal: { text: 'text-teal', border: 'border-teal-surface-outline', bg: 'bg-teal-container' },
  lightBlue: {
    text: 'text-light-blue',
    border: 'border-light-blue-surface-outline',
    bg: 'bg-light-blue-container',
  },
  indigo: { text: 'text-indigo', border: 'border-indigo-surface-outline', bg: 'bg-indigo-container' },
  pink: { text: 'text-pink', border: 'border-pink-surface-outline', bg: 'bg-pink-container' },
  purple: { text: 'text-purple', border: 'border-purple-surface-outline', bg: 'bg-purple-container' },
  // Figma: Extended/neutral → Border/normal + Surface/surface-container-low
  neutral: { text: 'text-element-tertiary', border: 'border-border-normal', bg: 'bg-surface-container-low' },
};

const badgeClass = computed(() => {
  const { text, border, bg } = COLOR_CONFIG[props.option];
  return [
    'inline-flex items-center gap-sol-4',
    'px-sol-8 py-sol-4',
    'rounded-circle whitespace-nowrap',
    'font-regular text-left',
    TEXT_CLS[props.size],
    text,
    props.type === 'outlined' ? `border ${border}` : bg,
  ];
});

const iconSize = computed(() => ICON_SIZE[props.size]);
</script>

<template>
  <span :class="badgeClass">
    <span
      v-if="showLeftIndicator"
      aria-hidden="true"
      :class="['shrink-0 rounded-full bg-current', INDICATOR_CLS[size]]"
    />
    <IcResponsive v-if="slots.leftIcon" :size="iconSize">
      <slot name="leftIcon" />
    </IcResponsive>
    {{ label }}
    <IcResponsive v-if="slots.rightIcon" :size="iconSize">
      <slot name="rightIcon" />
    </IcResponsive>
  </span>
</template>
