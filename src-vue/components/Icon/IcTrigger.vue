<!--
  IcTrigger — 독립 인터랙션을 가지는 아이콘 버튼 (ic_trigger)

  아이콘 자체가 독립 인터랙션을 가지는 경우 사용 (예: 닫기 버튼의 X 아이콘,
  Card의 드래그 핸들). 인터랙션(hover/active/focus)을 자체 소유한다.
-->
<script lang="ts">
export type IcTriggerSize = 12 | 14 | 16 | 20 | 24;
export type IcTriggerRatio = '1:1' | '1:2';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import IcResponsive from './IcResponsive.vue';

const props = withDefaults(
  defineProps<{
    size: IcTriggerSize;
    ratio?: IcTriggerRatio;
    inverse?: boolean;
    disabled?: boolean;
    ariaLabel: string;
  }>(),
  {
    ratio: '1:1',
    inverse: false,
    disabled: false,
  },
);

defineEmits<{ click: [MouseEvent] }>();

// ── Size tokens ────────────────────────────────────────────────────────────

const SIZE_1_2: Record<IcTriggerSize, string> = {
  12: 'w-icon-12 h-icon-24',
  14: 'w-icon-14 h-icon-28',
  16: 'w-icon-16 h-icon-32',
  20: 'w-icon-20 h-[40px]',
  24: 'w-icon-24 h-[48px]',
};

const is1to2 = computed(() => props.ratio === '1:2');

const colorCls = computed(() =>
  props.disabled
    ? 'cursor-not-allowed text-element-disabled'
    : `cursor-pointer ${props.inverse ? 'text-element-inverse' : 'text-element-primary'}`,
);

const overlayCls = computed(() => (is1to2.value ? 'inset-x-[-1px] inset-y-[2px] rounded-2' : '-inset-1 rounded-circle'));

const buttonClass = computed(() => [
  'group relative inline-flex items-center justify-center',
  colorCls.value,
  'focus:outline-none focus-visible:shadow-focus-button-ring',
  is1to2.value ? 'focus-visible:rounded-2' : 'focus-visible:rounded-circle',
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
    <span v-if="is1to2" :class="['relative z-[1] inline-flex shrink-0 items-center justify-center', SIZE_1_2[size]]">
      <slot />
    </span>
    <IcResponsive v-else :size="size" class="relative z-[1]">
      <slot />
    </IcResponsive>

    <span
      v-if="!disabled"
      aria-hidden="true"
      :class="[
        'pointer-events-none absolute',
        overlayCls,
        'bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed transition-colors duration-150',
      ]"
    />
  </button>
</template>
