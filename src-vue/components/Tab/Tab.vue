<script lang="ts">
export type TabSize = 'sm' | 'md';

export type TabItemDef = {
  label: string;
  badge?: number;
  dot?: boolean;
  disabled?: boolean;
};
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BadgeCounter from '../Badge/BadgeCounter.vue';

const props = withDefaults(
  defineProps<{
    items: TabItemDef[];
    size?: TabSize;
    defaultIndex?: number;
  }>(),
  {
    size: 'md',
    defaultIndex: 0,
  },
);

const emit = defineEmits<{
  change: [number];
}>();

const TEXT_CLS: Record<TabSize, string> = {
  md: 'text-text-md leading-text-md',
  sm: 'text-text-sm leading-text-sm',
};

const HEIGHT_CLS: Record<TabSize, string> = {
  md: 'h-12',
  sm: 'h-10',
};

// Focus ring extends 5px beyond the tab's left/right edges.
// md: flush to top/bottom (inset: 0 -5px)
// sm: 2px inset top/bottom (inset: 2px -5px)
const FOCUS_RING_INSET: Record<TabSize, string> = {
  md: '[inset:0_-5px]',
  sm: '[inset:2px_-5px]',
};

const selectedIndex = ref(props.defaultIndex);

function handleSelect(index: number) {
  if (props.items[index]?.disabled) return;
  selectedIndex.value = index;
  emit('change', index);
}

function textColor(isDisabled: boolean, isSelected: boolean) {
  if (isDisabled) return 'text-element-disabled';
  if (isSelected) return 'text-element-brand';
  if (props.size === 'sm') {
    // sm 미선택: 키보드 포커스 시에만 tertiary로 변경
    return 'text-element-quaternary focus-visible:text-element-tertiary';
  }
  return 'text-element-quaternary';
}

function indicatorColor(isDisabled: boolean) {
  return isDisabled ? 'bg-fill-disabled' : 'bg-element-brand';
}

const heightCls = computed(() => HEIGHT_CLS[props.size]);
const textCls = computed(() => TEXT_CLS[props.size]);
const focusRingInset = computed(() => FOCUS_RING_INSET[props.size]);
</script>

<template>
  <div class="relative w-full text-left">
    <span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-px bg-border-solid pointer-events-none" />
    <div role="tablist" :class="`flex items-center pl-6 gap-4 ${heightCls}`">
      <button
        v-for="(item, index) in items"
        :key="index"
        role="tab"
        type="button"
        :aria-selected="selectedIndex === index"
        :disabled="item.disabled ?? false"
        :class="`group relative flex items-center gap-1 px-1 h-full shrink-0 focus:outline-none before:content-none ${
          item.disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-interaction-neutral-hover'
        } ${textColor(item.disabled ?? false, selectedIndex === index)}`"
        @click="handleSelect(index)"
      >
        <span :class="`${textCls} ${selectedIndex === index ? 'font-semibold' : 'font-normal'} whitespace-nowrap`">
          {{ item.label }}
        </span>

        <template v-if="item.badge !== undefined">
          <BadgeCounter v-if="selectedIndex === index && !item.disabled" :count="item.badge" />
          <span
            v-else
            class="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-2 px-1 text-text-xs leading-text-xs font-semibold bg-fill-disabled text-element-disabled"
          >
            {{ item.badge }}
          </span>
        </template>

        <span v-if="item.dot" :class="`flex shrink-0 items-start ${size === 'md' ? 'h-[22px]' : 'h-[20px]'}`">
          <span class="size-1.5 rounded-circle bg-error" />
        </span>

        <!-- Bottom indicator -->
        <span
          v-if="selectedIndex === index"
          aria-hidden="true"
          :class="`absolute inset-x-0 bottom-0 h-[2px] ${indicatorColor(item.disabled ?? false)}`"
        />

        <!-- Focus ring: 키보드 포커스(:focus-visible)일 때만 표시 -->
        <span
          aria-hidden="true"
          :class="`absolute border-2 border-element-brand rounded-[3px] pointer-events-none hidden group-focus-visible:block ${focusRingInset}`"
        />
      </button>
    </div>
  </div>
</template>
