<!--
  SelectTrigger (select_trigger)

  React: src/components/SelectTrigger/SelectTrigger.tsx
  옵션 목록을 여는 가벼운 트리거 버튼. Toolbar, data table, filter, header 등에서
  사용. Select.vue와 동일하게 Headless UI Listbox로 open/click-outside/keyboard를
  대체하고, 패널(ListboxOptions)/옵션(ListboxOption)은 Dropdown/DropdownItem의
  클래스·컴포넌트를 재사용한다.

  TODO(원본 주석 유지): 드롭다운 패널을 Dropdown 컴포넌트 대신 Menu 컴포넌트로
  교체 검토 (Toolbar/Filter 컨텍스트에서는 menu_item 기반 패널이 더 적합할 수 있음)

  leftIcon: React는 `leftIcon?: ReactNode` prop이었으나 Vue에서는 IconButton.vue와
  동일한 관례로 named slot(#leftIcon)을 사용한다. 아이콘 표시 여부는
  `$slots.leftIcon` 존재 여부로 판단한다.
-->
<script lang="ts">
export type SelectTriggerState = 'enabled' | 'disabled' | 'error' | 'readonly';
export type SelectTriggerSize = 'sm' | 'md';
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import DropdownItem from '../Dropdown/DropdownItem.vue';
import type { SelectOption } from '../Select/Select.vue';
import IcResponsive, { type IconSize } from '../Icon/IcResponsive.vue';

const props = withDefaults(
  defineProps<{
    options?: SelectOption[];
    modelValue?: string;
    defaultValue?: string;
    placeholder?: string;
    size?: SelectTriggerSize;
    state?: SelectTriggerState;
    badgeCount?: number;
    class?: string;
  }>(),
  {
    options: () => [],
    defaultValue: '',
    placeholder: 'Select',
    size: 'sm',
    state: 'enabled',
    class: '',
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const internalValue = ref(props.defaultValue);

const value = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalValue.value,
);
const isDisabled = computed(() => props.state === 'disabled');
const isReadonly = computed(() => props.state === 'readonly');
const isInteractionDisabled = computed(() => isDisabled.value || isReadonly.value);
const isError = computed(() => props.state === 'error');

const TEXT_CLS: Record<SelectTriggerSize, string> = {
  sm: 'text-text-sm leading-text-sm',
  md: 'text-text-md leading-text-md',
};
const CHEVRON_SIZE: Record<SelectTriggerSize, IconSize> = { sm: 16, md: 20 };
const LEFT_ICON_SIZE: Record<SelectTriggerSize, IconSize> = { sm: 16, md: 20 };

const chevronSize = computed(() => CHEVRON_SIZE[props.size]);
const leftIconSize = computed(() => LEFT_ICON_SIZE[props.size]);

const displayLabel = computed(
  () => props.options.find((o) => o.value === value.value)?.label ?? props.placeholder,
);

const textColorClass = computed(() => {
  if (isDisabled.value) return 'text-element-disabled';
  if (isReadonly.value) return 'text-element-secondary';
  return 'text-element-primary';
});

const chevronColorClass = computed(() =>
  isDisabled.value || isReadonly.value ? 'text-element-disabled' : 'text-element-primary',
);

// Dropdown.vue의 compact prop과 동일한 규칙: sm → max-h-60, md → max-h-80
const panelMaxHeightClass = computed(() => (props.size === 'sm' ? 'max-h-60' : 'max-h-80'));

function handleChange(next: string) {
  if (props.modelValue === undefined) internalValue.value = next;
  emit('update:modelValue', next);
}
</script>

<template>
  <Listbox
    as="div"
    :model-value="value"
    :disabled="isInteractionDisabled"
    :class="`relative inline-flex text-left ${props.class}`"
    @update:model-value="handleChange"
    v-slot="{ open }"
  >
    <ListboxButton
      :class="[
        'relative inline-flex items-center gap-sol-4 rounded-4 w-full',
        'focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-primary)]',
        isDisabled
          ? 'cursor-not-allowed'
          : isReadonly
            ? 'cursor-default'
            : 'cursor-pointer hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed',
        open ? 'shadow-[0_0_0_2px_var(--color-primary)]' : '',
        textColorClass,
      ]"
    >
      <IcResponsive v-if="$slots.leftIcon" :size="leftIconSize">
        <slot name="leftIcon" />
      </IcResponsive>

      <span :class="`${TEXT_CLS[size]} font-regular truncate`">
        {{ displayLabel }}
      </span>

      <span
        v-if="badgeCount !== undefined"
        :class="[
          'inline-flex h-4 min-w-4 items-center justify-center rounded-2 px-sol-4',
          'text-text-xs leading-text-xs font-semibold',
          isDisabled ? 'bg-fill-disabled text-element-disabled' : 'bg-secondary-container text-element-brand-variant',
        ]"
      >
        {{ badgeCount }}
      </span>

      <span v-if="isError" class="inline-flex shrink-0 items-center justify-center">
        <svg :width="chevronSize" :height="chevronSize" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.25" fill="var(--sol-error)" />
          <path
            d="M11.25 14.4004H12.75V15.9375H11.25V14.4004ZM11.25 7H12.75V12.75H11.25V7Z"
            fill="var(--sol-static-white)"
          />
        </svg>
      </span>

      <span :class="`inline-flex shrink-0 items-center justify-center ${chevronColorClass}`">
        <svg
          :width="chevronSize"
          :height="chevronSize"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          :class="`transition-transform duration-150 ${open ? 'rotate-180' : 'rotate-0'}`"
        >
          <path
            d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </ListboxButton>

    <ListboxOptions
      v-if="options.length > 0"
      as="div"
      class="absolute left-0 top-full z-50 mt-1 min-w-40 overflow-hidden rounded-4 bg-surface-container-high p-1 shadow-normal"
    >
      <div :class="`overflow-y-auto ${panelMaxHeightClass}`">
        <ListboxOption
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          as="template"
          v-slot="{ selected }"
        >
          <DropdownItem :label="option.label" :selected="selected" />
        </ListboxOption>
      </div>
    </ListboxOptions>
  </Listbox>
</template>
