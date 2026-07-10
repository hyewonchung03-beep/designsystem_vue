<script lang="ts">
export type DatatableCellSize = 'sm' | 'md' | 'lg';
export type DatatableCellAlign = 'left' | 'center' | 'right';

import type { DatatableCellTextType } from './DatatableCellText.vue';

export type { DatatableCellTextType };

export type DatatableCellProps = {
  content?: string;
  subText?: string;
  size?: DatatableCellSize;
  align?: DatatableCellAlign;
  textType?: DatatableCellTextType;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  showSubText?: boolean;
  showTrend?: boolean;
  trendValue?: string;
  trendDirection?: 'up' | 'down';
  className?: string;
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import IcBlank from '../Icon/IcBlank.vue';
import type { IconSize } from '../Icon/IcResponsive.vue';
import DatatableCellText from './DatatableCellText.vue';

const props = withDefaults(defineProps<DatatableCellProps>(), {
  content: 'Content',
  subText: 'Data',
  size: 'lg',
  align: 'left',
  textType: 'regular',
  showLeftIcon: false,
  showRightIcon: false,
  showSubText: false,
  showTrend: false,
  trendValue: 'N',
  trendDirection: 'up',
});

// ── Size config ──────────────────────────────────────────────────────────────

const sizeConfig: Record<
  DatatableCellSize,
  { minH: string; py: string; textClass: string; subTextClass: string; iconSize: IconSize }
> = {
  sm: {
    minH: 'min-h-[34px]',
    py: 'py-2',
    textClass: 'text-text-xs leading-text-xs',
    subTextClass: 'text-text-xxs leading-text-xxs',
    iconSize: 16,
  },
  md: {
    minH: 'min-h-[40px]',
    py: 'py-2.5',
    textClass: 'text-text-sm leading-text-sm',
    subTextClass: 'text-text-xs leading-text-xs',
    iconSize: 20,
  },
  lg: {
    minH: 'min-h-[46px]',
    py: 'py-3',
    textClass: 'text-text-md leading-text-md',
    subTextClass: 'text-text-sm leading-text-sm-compact',
    iconSize: 20,
  },
};

const alignConfig: Record<DatatableCellAlign, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

const cfg = computed(() => sizeConfig[props.size]);
const alignCls = computed(() => alignConfig[props.align]);
</script>

<template>
  <div :class="`flex ${cfg.minH} min-w-20 items-center gap-2 text-left ${cfg.py} ${className ?? ''}`">
    <div :class="`flex min-w-0 flex-1 flex-col gap-1.5 ${alignCls}`">
      <div class="flex w-full items-center gap-1.5">
        <span v-if="showLeftIcon" class="flex shrink-0 items-center justify-center text-element-secondary">
          <slot name="leftIcon">
            <IcBlank :size="cfg.iconSize" />
          </slot>
        </span>

        <div :class="`flex min-w-0 flex-1 flex-col ${alignCls}`">
          <DatatableCellText :text="content" :size="size" :type="textType" />
        </div>

        <span v-if="showRightIcon" class="flex shrink-0 items-center justify-center text-element-secondary">
          <slot name="rightIcon">
            <IcBlank :size="cfg.iconSize" />
          </slot>
        </span>

        <span v-if="showTrend" class="flex shrink-0 items-center gap-0.5 text-success">
          <svg v-if="trendDirection === 'up'" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 4L14 8H6L10 4ZM10 16L6 12H14L10 16Z" fill="currentColor" opacity="0.3" />
            <path d="M10 4L14 8H6L10 4Z" fill="currentColor" />
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 4L14 8H6L10 4ZM10 16L6 12H14L10 16Z" fill="currentColor" opacity="0.3" />
            <path d="M10 16L6 12H14L10 16Z" fill="currentColor" />
          </svg>
          <span :class="`${cfg.textClass} font-regular`">{{ trendValue }}%</span>
        </span>
      </div>

      <span v-if="showSubText" :class="`${cfg.subTextClass} font-regular text-element-quaternary text-left`">
        {{ subText }}
      </span>
    </div>
  </div>
</template>
