<script lang="ts">
import type { VNode } from 'vue';
import type { DatatableCellTextType, DatatableCellTextSize } from '../DatatableCell/DatatableCellText.vue';

export type { DatatableCellTextType, DatatableCellTextSize };

export type StructuredListBodyCellAlign = 'left' | 'center' | 'right';
export type StructuredListBodyCellTrendDirection = 'up' | 'down';

// Plain data-shape type (mirrors the React `StructuredListBodyCellProps`).
// Used both as this component's own prop contract and as the element type of
// `StructuredListGrid`'s data-driven `cells` array. `class` is included here
// (rather than declared via defineProps) so it travels through natively via
// Vue's attrs fallthrough when spread onto the component with `v-bind`.
export type StructuredListBodyCellProps = {
  text?: string;
  subText?: string;
  align?: StructuredListBodyCellAlign;
  condensed?: boolean;
  custom?: boolean;
  showText?: boolean;
  showSubText?: boolean;
  showLeftIcon?: boolean;
  leadingIcon?: VNode;
  showTrendIndicator?: boolean;
  trendValue?: string;
  trendDirection?: StructuredListBodyCellTrendDirection;
  textType?: DatatableCellTextType;
  textSize?: DatatableCellTextSize;
  class?: string;
};
</script>

<script setup lang="ts">
import { computed, h } from 'vue';
import IcBlank from '../Icon/IcBlank.vue';
import DatatableCellText from '../DatatableCell/DatatableCellText.vue';

const props = withDefaults(
  defineProps<Omit<StructuredListBodyCellProps, 'class'>>(),
  {
    text: 'Content',
    subText: 'Data',
    align: 'left',
    condensed: false,
    custom: false,
    showText: true,
    showSubText: false,
    showLeftIcon: false,
    showTrendIndicator: false,
    trendValue: 'N%',
    trendDirection: 'up',
    textType: 'regular',
    textSize: 'md',
  },
);

// ── Derived flags ────────────────────────────────────────────────────────────

const isLeft = computed(() => props.align === 'left');
const isCenter = computed(() => props.align === 'center');
const isRight = computed(() => props.align === 'right');
const isNotCustomLeft = computed(() => !props.custom && isLeft.value);
const isCustomCenter = computed(() => props.custom && isCenter.value);

// ── Classes / styles ─────────────────────────────────────────────────────────

const containerClass = computed(() => [
  'flex min-w-[80px] text-left',
  props.condensed ? 'items-center' : 'items-start',
  isRight.value ? 'justify-end' : isCenter.value ? 'justify-center' : '',
]);

const containerStyle = computed(() =>
  props.condensed
    ? {
        minHeight: 'var(--sol-gap-36)',
        paddingTop: 'var(--sol-gap-8)',
        paddingBottom: 'var(--sol-gap-8)',
        gap: props.custom ? 0 : 'var(--sol-gap-6)',
      }
    : {
        minHeight: 'var(--sol-gap-60)',
        paddingTop: 'var(--sol-gap-16)',
        paddingBottom: 'var(--sol-gap-24)',
        gap: props.custom ? 0 : 'var(--sol-gap-6)',
      },
);

// leadingIcon mirrors the React `ReactNode` prop so it can travel through a
// data-driven `cells: StructuredListBodyCellProps[]` array (see
// StructuredListGrid). A named slot can't be threaded per-array-item that
// way, so we accept a pre-built VNode and render it via a functional
// `<component :is>` — falls back to IcBlank per the icon usage rule.
const renderLeadingIcon = computed(() => () => props.leadingIcon ?? h(IcBlank, { size: 16 }));
</script>

<template>
  <div :class="containerClass" :style="containerStyle">
    <!-- ── Trend indicator: RIGHT / CENTER (left of text) ── -->
    <div
      v-if="!custom && (isRight || isCenter) && showTrendIndicator"
      class="flex items-center shrink-0 text-success gap-0.5"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M19.75 12C19.75 7.71979 16.2802 4.25 12 4.25C7.71979 4.25 4.25 7.71979 4.25 12C4.25 16.2802 7.71979 19.75 12 19.75C16.2802 19.75 19.75 16.2802 19.75 12ZM11.25 10.4102L8.59961 13.0605L7.53906 12L11.4697 8.06934L11.5264 8.01855C11.8209 7.77806 12.2556 7.79483 12.5303 8.06934L16.4609 12L15.4004 13.0605L12.75 10.4102V16.1504H11.25V10.4102ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
          fill="currentColor"
        />
      </svg>
      <span class="text-text-sm leading-text-sm font-regular whitespace-nowrap">{{ trendValue }}</span>
    </div>

    <!-- ── Right-aligned text ── -->
    <div v-if="!custom && isRight && showText" class="flex flex-1 flex-col items-end min-w-0 gap-1 text-left">
      <div class="flex items-center justify-end w-full shrink-0 gap-1">
        <span v-if="showLeftIcon" class="shrink-0 text-element-secondary">
          <component :is="renderLeadingIcon" />
        </span>
        <DatatableCellText :text="text" :size="textSize" :type="textType" class="text-right shrink-0" />
      </div>
      <span
        v-if="showSubText"
        class="text-text-xs leading-text-xs font-regular text-element-quaternary text-right w-full shrink-0"
      >
        {{ subText }}
      </span>
    </div>

    <!-- ── Center-aligned text ── -->
    <div v-if="!custom && isCenter && showText" class="flex flex-1 flex-col items-center min-w-0 gap-1 text-left">
      <div class="flex items-center justify-center w-full shrink-0 gap-1">
        <span v-if="showLeftIcon" class="shrink-0 text-element-secondary">
          <component :is="renderLeadingIcon" />
        </span>
        <DatatableCellText :text="text" :size="textSize" :type="textType" class="text-center shrink-0" />
      </div>
      <span
        v-if="showSubText"
        class="text-text-xs leading-text-xs font-regular text-element-quaternary text-center w-full shrink-0"
      >
        {{ subText }}
      </span>
    </div>

    <!-- ── Custom center slot ── -->
    <div v-if="isCustomCenter" class="flex flex-1 flex-col items-start min-w-0 text-left">
      <slot />
    </div>

    <!-- ── Left-aligned text ── -->
    <div v-if="isNotCustomLeft && showText" class="flex flex-1 flex-col items-start min-w-0 gap-1 text-left">
      <div class="flex items-center w-full shrink-0 gap-1.5">
        <span v-if="showLeftIcon" class="shrink-0 text-element-secondary">
          <component :is="renderLeadingIcon" />
        </span>
        <DatatableCellText :text="text" :size="textSize" :type="textType" />
      </div>
      <span v-if="showSubText" class="text-text-sm leading-text-xs-2line font-regular text-element-quaternary w-full shrink-0 text-left">
        {{ subText }}
      </span>
    </div>

    <!-- ── Trend indicator: LEFT align (right of text) ── -->
    <div v-if="isNotCustomLeft && showTrendIndicator" class="flex items-center shrink-0 text-success gap-0.5">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M19.75 12C19.75 7.71979 16.2802 4.25 12 4.25C7.71979 4.25 4.25 7.71979 4.25 12C4.25 16.2802 7.71979 19.75 12 19.75C16.2802 19.75 19.75 16.2802 19.75 12ZM11.25 10.4102L8.59961 13.0605L7.53906 12L11.4697 8.06934L11.5264 8.01855C11.8209 7.77806 12.2556 7.79483 12.5303 8.06934L16.4609 12L15.4004 13.0605L12.75 10.4102V16.1504H11.25V10.4102ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
          fill="currentColor"
        />
      </svg>
      <span class="text-text-sm leading-text-sm font-regular whitespace-nowrap">{{ trendValue }}</span>
    </div>
  </div>
</template>
