<!--
  Select — single-value select field

  React: src/components/Select/Select.tsx (Select)
  React 원본은 useState(isOpen) + mousedown 클릭아웃사이드 + Enter/Space/Escape
  keydown을 수작업으로 구현했다. Vue 포팅에서는 이를 Headless UI Vue의
  Listbox/ListboxButton/ListboxOptions/ListboxOption으로 대체한다:
  open 상태, 클릭아웃사이드, 키보드 내비게이션(Home/End/화살표/타이핑 검색 포함),
  ARIA(role/aria-haspopup/aria-expanded/aria-selected 등)가 모두 Headless UI에서
  무료로 제공된다.

  Controlled value 컨벤션: TextInput.vue와 동일하게 `modelValue`/`update:modelValue`
  + `defaultValue`(비제어 시 초기값) 조합을 사용한다 (React의
  value/defaultValue/onChange 패턴을 그대로 미러링).

  패널(ListboxOptions) 클래스는 Dropdown.vue의 컨테이너 클래스를 그대로 재사용하고,
  옵션(ListboxOption)은 `as="template"`으로 렌더링해 DropdownItem 컴포넌트를 그대로
  감싸서 사용한다 — Headless UI가 클릭/키보드/ARIA props를 DropdownItem의 루트
  <button>에 자동으로 병합(fallthrough)해주므로 별도 어댑터 코드 없이 픽셀이
  동일하게 유지된다.
-->
<script lang="ts">
export type SelectOption = {
  value: string;
  label: string;
};

export type SelectState = 'default' | 'error' | 'disabled' | 'readonly';
export type SelectSize = 'sm' | 'md';
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import TextLabel from '../TextLabel/TextLabel.vue';
import TextHelper from '../TextHelper/TextHelper.vue';
import DropdownItem from '../Dropdown/DropdownItem.vue';

const props = withDefaults(
  defineProps<{
    options: SelectOption[];
    modelValue?: string;
    defaultValue?: string;
    placeholder?: string;
    label?: string;
    helperText?: string;
    state?: SelectState;
    size?: SelectSize;
    required?: boolean;
    class?: string;
  }>(),
  {
    defaultValue: '',
    placeholder: 'placeholder',
    state: 'default',
    size: 'md',
    required: false,
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
// NOTE: readonly는 원본에서 포커스는 가능하되 클릭/키다운 핸들러 내부에서
// open을 막는 방식이었다. Headless UI의 Listbox disabled는 포커스까지 막는
// 단일 스위치라 완전히 동일하진 않지만, "패널이 열리지 않는다"는 핵심 동작은
// disabled와 readonly 모두 :disabled="isDisabled || isReadonly"로 재현했다.
const isInteractionDisabled = computed(() => isDisabled.value || isReadonly.value);
const selectedLabel = computed(
  () => props.options.find((o) => o.value === value.value)?.label,
);

const TRIGGER_HEIGHT: Record<SelectSize, string> = { sm: 'h-[30px]', md: 'h-9' };

function handleChange(next: string) {
  if (props.modelValue === undefined) internalValue.value = next;
  emit('update:modelValue', next);
}

function getTriggerBorderClass(open: boolean) {
  if (props.state === 'disabled') return 'border-border-normal';
  if (props.state === 'error') {
    return open
      ? 'border-error-dim shadow-[0_0_0_2px_var(--color-error-dim)]'
      : 'border-error-dim';
  }
  if (props.state === 'readonly') return 'border-border-normal';
  return open
    ? 'border-border-normal shadow-[0_0_0_2px_var(--color-primary)]'
    : 'border-border-normal';
}

function getBgClass(open: boolean) {
  if (isDisabled.value) return 'bg-fill-disabled cursor-not-allowed';
  if (isReadonly.value) return 'bg-surface-container cursor-default';
  if (open) return 'bg-surface cursor-pointer';
  return 'bg-surface-container cursor-pointer hover:bg-interaction-neutral-hover';
}
</script>

<template>
  <Listbox
    as="div"
    :model-value="value"
    :disabled="isInteractionDisabled"
    :class="`relative flex flex-col items-start ${props.class}`"
    @update:model-value="handleChange"
    v-slot="{ open }"
  >
    <TextLabel v-if="label" :label="label" :required="required" :size="size" />

    <ListboxButton
      :class="[
        'relative flex w-full items-center gap-1 overflow-hidden rounded-4 border pt-sol-8 pb-sol-8 pl-sol-12 pr-sol-8 focus:outline-none',
        TRIGGER_HEIGHT[size],
        getBgClass(open),
        getTriggerBorderClass(open),
      ]"
    >
      <span
        :class="[
          'flex-1 min-w-0 truncate text-left text-text-sm leading-text-sm-compact font-regular',
          selectedLabel
            ? (isDisabled ? 'text-element-disabled' : 'text-element-primary')
            : (isDisabled ? 'text-element-disabled' : 'text-element-quaternary'),
        ]"
      >
        {{ selectedLabel ?? placeholder }}
      </span>
      <span
        :class="[
          'flex shrink-0 size-4 items-center justify-center',
          isDisabled ? 'text-element-disabled' : 'text-element-quaternary',
        ]"
      >
        <svg v-if="open" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z"
            fill="currentColor"
            transform="rotate(180 12 12)"
          />
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </ListboxButton>

    <ListboxOptions
      as="div"
      class="absolute left-0 right-0 top-full z-50 mt-1 min-w-40 overflow-hidden rounded-4 bg-surface-container-high p-1 shadow-normal"
    >
      <div class="overflow-y-auto max-h-80">
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

    <TextHelper
      v-if="helperText"
      :helper-text="helperText"
      :type="state === 'error' ? 'error' : 'enabled'"
    />
  </Listbox>
</template>
