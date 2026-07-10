<!--
  DropdownItem — Dropdown 패널 내부의 선택 가능한 옵션 행

  React: src/components/Dropdown/Dropdown.tsx (DropdownItem)
-->
<script lang="ts">
export type DropdownItemType = 'default' | 'checkbox';
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    label?: string;
    description?: string;
    type?: DropdownItemType;
    compact?: boolean;
    selected?: boolean;
    disabled?: boolean;
    class?: string;
  }>(),
  {
    label: 'Dropdown Item',
    type: 'default',
    compact: true,
    selected: false,
    disabled: false,
    class: '',
  },
);

defineEmits<{ click: [MouseEvent] }>();

const heightClass = computed(() => (props.compact ? 'min-h-[30px]' : 'min-h-9'));
const textColorClass = computed(() =>
  props.disabled ? 'text-element-disabled' : 'text-element-primary',
);
const fontWeightClass = computed(() =>
  props.selected && props.type === 'default' ? 'font-semibold' : 'font-regular',
);

const buttonClass = computed(
  () => `relative flex w-full items-center gap-1.5 overflow-hidden rounded-2 px-2 py-1.5
    ${heightClass.value}
    ${props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    focus-visible:outline-none focus-visible:shadow-focus-button-ring
    ${!props.disabled && !props.selected ? 'hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed' : ''}
    ${props.selected ? 'bg-selected-container' : ''}
    ${props.class}`,
);
</script>

<template>
  <button
    type="button"
    role="option"
    :aria-selected="selected"
    :aria-disabled="disabled"
    :disabled="disabled"
    :class="buttonClass"
    @click="!disabled && $emit('click', $event)"
  >
    <span v-if="type === 'checkbox'" class="flex size-3.5 shrink-0 items-center justify-center">
      <svg v-if="selected" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="13" height="13" rx="2.5" fill="currentColor" class="text-element-brand" />
        <path
          d="M12.299 4.131L5.824 10.606C5.568 10.861 5.148 10.859 4.902 10.606L1.701 7.409L2.629 6.477L5.36 9.215L11.371 3.203Z"
          class="fill-static-white"
        />
      </svg>
      <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.25" class="text-border-solid" />
      </svg>
    </span>

    <span :class="`flex min-w-0 flex-1 flex-col gap-0.5 text-left ${textColorClass}`">
      <span :class="`truncate text-text-sm leading-text-sm ${fontWeightClass}`">
        {{ label }}
      </span>
      <span v-if="description" class="truncate text-text-xxs leading-text-xxs text-element-tertiary">
        {{ description }}
      </span>
    </span>

    <span v-if="type === 'default' && selected" class="flex size-3.5 shrink-0 items-center justify-center text-element-brand">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M11.0833 4.08301L5.54163 9.62467L2.91663 6.99967L3.6213 6.29501L5.54163 8.21534L10.3786 3.37834L11.0833 4.08301Z"
          fill="currentColor"
        />
      </svg>
    </span>
  </button>
</template>
