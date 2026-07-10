<!--
  MultiSelect — multi-value select field with chips

  React: src/components/Select/Select.tsx (MultiSelect)
  Select.vue와 동일하게 Headless UI Listbox를 사용하되 `multiple` prop으로 배열
  v-model을 사용한다. 칩 제거/전체 지우기는 ListboxOption 클릭 경로를 타지 않는
  독립 버튼이라 원본처럼 handleChange()를 직접 호출해 배열을 갱신하고, 트리거
  내부 버튼 클릭이 상위 ListboxButton의 open toggle로 버블링되지 않도록
  @click.stop을 유지한다.

  칩 2행 오버플로 카운트(+N more)는 offsetTop 비교 로직을 그대로 이식했고,
  React의 useLayoutEffect 대신 watch(value, ..., {flush:'post'})로 DOM 갱신 직후
  측정한다. 최초 마운트 시점은 watch(immediate)만으로는 레이아웃이 아직 반영되기
  전에 측정되는 경우가 있어(스토리에 defaultValue로 넘긴 초기 선택값에서 재현),
  onMounted + nextTick으로 별도 처리한다.
-->
<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import TextLabel from '../TextLabel/TextLabel.vue';
import TextHelper from '../TextHelper/TextHelper.vue';
import DropdownItem from '../Dropdown/DropdownItem.vue';
import type { SelectOption, SelectState, SelectSize } from './Select.vue';

const props = withDefaults(
  defineProps<{
    options: SelectOption[];
    modelValue?: string[];
    defaultValue?: string[];
    placeholder?: string;
    label?: string;
    helperText?: string;
    state?: SelectState;
    size?: SelectSize;
    required?: boolean;
  }>(),
  {
    defaultValue: () => [],
    placeholder: 'placeholder',
    state: 'default',
    size: 'md',
    required: false,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string[]];
}>();

const internalValue = ref<string[]>(props.defaultValue);

const value = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalValue.value,
);
const isDisabled = computed(() => props.state === 'disabled');
const isReadonly = computed(() => props.state === 'readonly');
const isInteractionDisabled = computed(() => isDisabled.value || isReadonly.value);
const hasValues = computed(() => value.value.length > 0);

const MIN_TRIGGER_HEIGHT: Record<SelectSize, string> = { sm: 'min-h-[30px]', md: 'min-h-9' };

function handleChange(next: string[]) {
  if (props.modelValue === undefined) internalValue.value = next;
  emit('update:modelValue', next);
}

function handleRemoveChip(val: string, e: MouseEvent) {
  e.stopPropagation();
  handleChange(value.value.filter((v) => v !== val));
}

function handleClearAll(e: MouseEvent) {
  e.stopPropagation();
  handleChange([]);
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

// ── +N more 오버플로 측정 ────────────────────────────────────────────────
const chipContainerRef = ref<HTMLDivElement | null>(null);
const hiddenCount = ref(0);

function measureChipOverflow() {
  const container = chipContainerRef.value;
  if (!container || value.value.length === 0) {
    hiddenCount.value = 0;
    return;
  }
  const chips = Array.from(container.children) as HTMLElement[];
  if (chips.length === 0) return;
  const firstRowTop = chips[0].offsetTop;
  hiddenCount.value = chips.filter((c) => c.offsetTop > firstRowTop).length;
}

watch(value, measureChipOverflow, { flush: 'post' });
onMounted(() => nextTick(measureChipOverflow));
</script>

<template>
  <Listbox
    as="div"
    multiple
    :model-value="value"
    :disabled="isInteractionDisabled"
    class="relative flex flex-col items-start"
    @update:model-value="handleChange"
    v-slot="{ open }"
  >
    <TextLabel v-if="label" :label="label" :required="required" :size="size" />

    <ListboxButton
      as="div"
      role="combobox"
      :class="[
        'relative flex w-full items-start gap-1 overflow-hidden rounded-4 border pt-sol-8 pb-sol-8 pl-sol-12 pr-sol-8',
        MIN_TRIGGER_HEIGHT[size],
        getBgClass(open),
        getTriggerBorderClass(open),
      ]"
    >
      <!-- Chips + placeholder -->
      <div class="flex flex-1 min-w-0 flex-col gap-1 overflow-hidden">
        <template v-if="hasValues">
          <div ref="chipContainerRef" class="flex flex-wrap gap-1 overflow-hidden max-h-5">
            <span
              v-for="v in value"
              :key="v"
              class="inline-flex h-5 shrink-0 items-center gap-0.5 rounded-2 border border-border-normal bg-selected-container px-[5px] py-[3px]"
            >
              <span class="text-text-xs leading-text-xs font-regular text-element-brand-variant">
                {{ options.find((o) => o.value === v)?.label }}
              </span>
              <button
                v-if="!isDisabled && !isReadonly"
                type="button"
                :aria-label="`Remove ${options.find((o) => o.value === v)?.label}`"
                class="flex shrink-0 items-center justify-center text-element-brand-variant focus:outline-none"
                @click="(e) => handleRemoveChip(v, e)"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                </svg>
              </button>
            </span>
          </div>
          <span v-if="hiddenCount > 0" class="text-text-xs leading-text-xs font-regular text-element-tertiary">
            +{{ hiddenCount }} more
          </span>
        </template>
        <span
          v-else
          :class="[
            'text-text-sm leading-text-sm-compact font-regular',
            isDisabled ? 'text-element-disabled' : 'text-element-quaternary',
          ]"
        >
          {{ placeholder }}
        </span>
      </div>

      <!-- Right icons -->
      <div class="flex shrink-0 items-center gap-2">
        <button
          v-if="hasValues && !isDisabled && !isReadonly"
          type="button"
          aria-label="Clear all"
          class="flex size-4 items-center justify-center text-element-quaternary focus:outline-none"
          @click="handleClearAll"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>
        <span
          :class="[
            'flex size-4 items-center justify-center',
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
      </div>
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
          <DropdownItem :label="option.label" :selected="selected" type="checkbox" />
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
