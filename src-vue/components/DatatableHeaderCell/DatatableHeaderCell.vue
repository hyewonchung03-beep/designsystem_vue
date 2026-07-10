<script lang="ts">
export type DatatableHeaderCellSize = 'sm' | 'md' | 'lg';
export type DatatableHeaderCellPosition = 'left' | 'center' | 'right';

export type DatatableHeaderCellProps = {
  label?: string;
  size?: DatatableHeaderCellSize;
  position?: DatatableHeaderCellPosition;
  showIcon?: boolean;
  showPadding?: boolean;
  className?: string;
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import IcBlank from '../Icon/IcBlank.vue';

const props = withDefaults(defineProps<DatatableHeaderCellProps>(), {
  label: 'Header',
  size: 'sm',
  position: 'left',
  showIcon: true,
  showPadding: false,
});

const emit = defineEmits<{ iconClick: [] }>();

// ── Size config ──────────────────────────────────────────────────────────────

type SizeCfg = {
  cell: string;
  content: string;
  text: string;
  iconSizeLeft: 12 | 14 | 16;
  iconSizeOther: 14 | 16;
  iconBtn: string;
};

const sizeConfig: Record<DatatableHeaderCellSize, SizeCfg> = {
  sm: {
    cell: 'min-h-[24px] py-1',
    content: 'gap-0.5',
    text: 'text-text-xs leading-text-xs font-semibold',
    iconSizeLeft: 12,
    iconSizeOther: 14,
    iconBtn: 'size-5',
  },
  md: {
    cell: 'min-h-[36px] py-2',
    content: 'gap-1',
    text: 'text-text-sm leading-text-sm font-semibold',
    iconSizeLeft: 14,
    iconSizeOther: 14,
    iconBtn: 'size-[22px]',
  },
  lg: {
    cell: 'min-h-[46px] py-3',
    content: 'gap-1.5',
    text: 'text-text-md leading-text-md font-semibold',
    iconSizeLeft: 16,
    iconSizeOther: 16,
    iconBtn: 'size-6',
  },
};

const positionContent: Record<DatatableHeaderCellPosition, string> = {
  left: '',
  center: 'justify-center',
  right: 'justify-end',
};

const cfg = computed(() => sizeConfig[props.size]);
// NOTE: iconBtn 'size-[22px]' (md) has no matching --sol-* token; ported verbatim from React source.
const iconSize = computed(() => (props.position === 'left' ? cfg.value.iconSizeLeft : cfg.value.iconSizeOther));
</script>

<template>
  <div role="columnheader" :class="`flex items-center text-left ${cfg.cell} ${className ?? ''}`">
    <div v-if="showPadding" class="w-2 shrink-0 self-stretch" />

    <div :class="`flex min-w-px flex-1 items-center ${cfg.content} ${positionContent[position]}`">
      <span :class="`shrink-0 whitespace-nowrap text-element-tertiary text-left ${cfg.text}`">
        {{ label }}
      </span>

      <button
        v-if="showIcon"
        type="button"
        :aria-label="`${label} column action`"
        :class="`relative flex ${cfg.iconBtn} shrink-0 items-center justify-center rounded-circle text-element-secondary
          hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
          focus-visible:outline-none focus-visible:shadow-focus-button-ring`"
        @click="emit('iconClick')"
      >
        <IcBlank :size="iconSize" />
      </button>
    </div>

    <div v-if="showPadding" class="w-2 shrink-0 self-stretch" />
  </div>
</template>
