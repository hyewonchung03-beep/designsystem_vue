<script lang="ts">
export type TextInputState = 'default' | 'error' | 'disabled' | 'readonly';
export type TextInputSize = 'sm' | 'md';
</script>

<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import TextLabel from '../TextLabel/TextLabel.vue';
import TextHelper from '../TextHelper/TextHelper.vue';
import IcResponsive from '../Icon/IcResponsive.vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    defaultValue?: string;
    placeholder?: string;
    label?: string;
    helperText?: string;
    state?: TextInputState;
    size?: TextInputSize;
    required?: boolean;
    maxLength?: number;
    showLeadingIcon?: boolean;
    showTrailingIcon?: boolean;
    showClearButton?: boolean;
    autoFocus?: boolean;
    type?: string;
  }>(),
  {
    defaultValue: '',
    placeholder: 'Placeholder',
    state: 'default',
    size: 'md',
    required: false,
    showLeadingIcon: false,
    showTrailingIcon: false,
    showClearButton: false,
    autoFocus: false,
    type: 'text',
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  trailingIconClick: [];
}>();

const inputId = useId();
const inputRef = ref<HTMLInputElement | null>(null);
const internalValue = ref(props.defaultValue);
const isFocused = ref(false);

const value = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalValue.value,
);
const isDisabled = computed(() => props.state === 'disabled');
const isReadonly = computed(() => props.state === 'readonly');
const iconSize = computed<14 | 16>(() => (props.size === 'sm' ? 14 : 16));
const showClear = computed(
  () =>
    props.showClearButton &&
    isFocused.value &&
    value.value.length > 0 &&
    !isDisabled.value &&
    !isReadonly.value,
);

// ── Style helpers ────────────────────────────────────────────────────────

const wrapperClass = computed(() => {
  const sizeCls = props.size === 'sm' ? 'h-7.5 px-2.5' : 'h-9 px-3';

  const stateCls = (() => {
    if (isDisabled.value || isReadonly.value) return 'bg-fill-disabled border-border-normal';
    if (props.state === 'error')
      return isFocused.value
        ? 'bg-surface-container border-error-dim shadow-[0_0_0_2px_var(--color-error-dim)]'
        : 'bg-surface-container border-error-dim';
    return isFocused.value
      ? 'bg-surface-container border-border-normal shadow-[0_0_0_2px_var(--color-primary)]'
      : 'bg-surface-container border-border-normal';
  })();

  return `flex items-center gap-1 overflow-hidden rounded-4 border shrink-0 w-full ${sizeCls} ${stateCls}`;
});

const inputClass = computed(() => {
  const sizeCls =
    props.size === 'sm' ? 'text-text-xs leading-text-xs' : 'text-text-sm leading-text-xs-2line';

  const colorCls = isDisabled.value
    ? 'text-element-disabled placeholder:text-element-disabled cursor-not-allowed'
    : 'text-element-primary placeholder:text-element-quaternary';

  return `min-w-0 flex-1 bg-transparent outline-none font-regular overflow-hidden text-ellipsis whitespace-nowrap ${sizeCls} ${colorCls}`;
});

const leadingIconWrapperClass = computed(() =>
  isDisabled.value ? 'text-element-disabled' : 'text-element-secondary',
);

const trailingIconBtnClass = computed(() => [
  'shrink-0 flex items-center justify-center rounded-circle focus:outline-none',
  isDisabled.value ? 'text-element-disabled cursor-not-allowed' : 'text-element-primary',
]);

// ── Handlers ─────────────────────────────────────────────────────────────

function handleInput(e: Event) {
  const next = (e.target as HTMLInputElement).value;
  if (props.modelValue === undefined) internalValue.value = next;
  emit('update:modelValue', next);
}

function handleFocus(e: FocusEvent) {
  isFocused.value = true;
  emit('focus', e);
}

function handleBlur(e: FocusEvent) {
  isFocused.value = false;
  emit('blur', e);
}

function handleClear() {
  if (props.modelValue === undefined) internalValue.value = '';
  emit('update:modelValue', '');
}

defineExpose({ inputRef });
</script>

<template>
  <div class="flex flex-col text-left">
    <TextLabel v-if="label" :label="label" :required="required" :size="size" />

    <div :class="wrapperClass">
      <!-- Leading icon -->
      <IcResponsive
        v-if="showLeadingIcon"
        :size="iconSize"
        :class="leadingIconWrapperClass"
      >
        <slot name="leadingIcon" />
      </IcResponsive>

      <!-- Input -->
      <input
        ref="inputRef"
        :id="inputId"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :readonly="isReadonly"
        :required="required"
        :maxlength="maxLength"
        :autofocus="autoFocus"
        :aria-invalid="state === 'error' ? true : undefined"
        :class="inputClass"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Clear button — shown when focused and has value -->
      <button
        v-if="showClear"
        type="button"
        tabindex="-1"
        class="shrink-0 flex items-center justify-center rounded-circle text-element-quaternary hover:text-element-primary focus:outline-none"
        :class="iconSize === 14 ? 'size-icon-14' : 'size-icon-16'"
        aria-label="Clear"
        @mousedown.prevent="handleClear"
      >
        <svg :width="iconSize" :height="iconSize" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="8" fill="currentColor" />
          <path
            d="M10.5 5.5L5.5 10.5M5.5 5.5L10.5 10.5"
            stroke="white"
            stroke-width="1.4"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <!-- Trailing icon -->
      <button
        v-if="showTrailingIcon && !showClear"
        type="button"
        tabindex="-1"
        :disabled="isDisabled"
        :class="trailingIconBtnClass"
        @click="!isDisabled && emit('trailingIconClick')"
      >
        <IcResponsive :size="iconSize">
          <slot name="trailingIcon" />
        </IcResponsive>
      </button>
    </div>

    <TextHelper
      v-if="helperText"
      :helper-text="helperText"
      :type="state === 'error' ? 'error' : 'enabled'"
    />
  </div>
</template>
