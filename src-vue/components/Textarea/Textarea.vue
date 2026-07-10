<script lang="ts">
export type TextareaState = 'default' | 'error' | 'disabled' | 'readonly';
export type TextareaSize = 'sm' | 'md';
</script>

<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import TextLabel from '../TextLabel/TextLabel.vue';
import TextHelper from '../TextHelper/TextHelper.vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    defaultValue?: string;
    placeholder?: string;
    label?: string;
    helperText?: string;
    state?: TextareaState;
    size?: TextareaSize;
    required?: boolean;
    maxLength?: number;
    showCounter?: boolean;
    showResize?: boolean;
    actionLabel?: string;
    rows?: number;
  }>(),
  {
    defaultValue: '',
    placeholder: 'Placeholder',
    state: 'default',
    size: 'md',
    required: false,
    showCounter: false,
    showResize: true,
    rows: 3,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  action: [];
}>();

const textareaId = useId();
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
const internalValue = ref(props.defaultValue);
const isFocused = ref(false);

const value = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalValue.value,
);
const isDisabled = computed(() => props.state === 'disabled');
const isReadonly = computed(() => props.state === 'readonly');
const charCount = computed(() => value.value.length);
const showBottomControls = computed(() => props.showCounter || !!props.actionLabel);

// ── Style helpers ────────────────────────────────────────────────────────

const bgClass = computed(() => {
  if (isDisabled.value) return 'bg-fill-disabled cursor-not-allowed';
  if (isReadonly.value) return 'bg-surface-container cursor-default';
  return 'bg-surface-container';
});

const borderClass = computed(() => {
  if (props.state === 'disabled') return 'border-border-normal';
  if (props.state === 'error') {
    return isFocused.value
      ? 'border-error-dim shadow-[0_0_0_2px_var(--color-error-dim)]'
      : 'border-error-dim';
  }
  if (props.state === 'readonly') return 'border-border-normal';
  return isFocused.value
    ? 'border-border-normal shadow-[0_0_0_2px_var(--color-primary)]'
    : 'border-border-normal';
});

const textClass = computed(() =>
  isDisabled.value
    ? 'text-element-disabled placeholder:text-element-disabled'
    : 'text-element-primary placeholder:text-element-quaternary',
);

// ── Resize drag (mirrors React's imperative ref-based drag) ──────────────

let isDragging = false;
let startY = 0;
let startHeight = 0;

function handleResizePointerDown(e: PointerEvent) {
  if (isDisabled.value || isReadonly.value) return;
  e.preventDefault();
  isDragging = true;
  startY = e.clientY;
  if (containerRef.value) startHeight = containerRef.value.offsetHeight;
  (e.target as HTMLElement).setPointerCapture(e.pointerId);
}

function handleResizePointerMove(e: PointerEvent) {
  if (!isDragging) return;
  const container = containerRef.value;
  if (!container) return;
  const delta = e.clientY - startY;
  const next = Math.max(56, startHeight + delta);
  container.style.height = `${next}px`;
}

function handleResizePointerUp() {
  isDragging = false;
}

// ── Handlers ─────────────────────────────────────────────────────────────

function handleInput(e: Event) {
  const next = (e.target as HTMLTextAreaElement).value;
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

function handleContainerClick() {
  if (!isDisabled.value && !isReadonly.value) textareaRef.value?.focus();
}

defineExpose({ textareaRef });
</script>

<template>
  <div class="flex flex-col items-start text-left">
    <TextLabel v-if="label" :label="label" :required="required" :size="size" />

    <div
      ref="containerRef"
      :class="`relative flex min-h-14 w-full flex-col gap-3 rounded-4 border px-4 py-3 ${bgClass} ${borderClass}`"
      @click="handleContainerClick"
    >
      <textarea
        ref="textareaRef"
        :id="textareaId"
        :value="value"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :readonly="isReadonly"
        :required="required"
        :maxlength="maxLength"
        :rows="rows"
        :aria-invalid="state === 'error' ? true : undefined"
        :aria-describedby="helperText ? `${textareaId}-helper` : undefined"
        :class="`min-w-0 flex-1 resize-none bg-transparent text-text-sm leading-text-sm-compact font-regular outline-none ${textClass}`"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <div v-if="showBottomControls" class="flex h-5 items-center gap-2">
        <span
          v-if="showCounter"
          class="flex-1 text-text-xxs leading-text-xxs font-semibold text-element-quaternary"
        >
          {{ charCount }}<template v-if="maxLength != null">/{{ maxLength }}</template>
        </span>
        <span v-else class="flex-1" />
        <button
          v-if="actionLabel"
          type="button"
          :disabled="isDisabled"
          class="rounded-2 text-text-sm leading-text-sm font-semibold text-primary
            hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
            focus-visible:outline-none focus-visible:shadow-focus-button-ring
            disabled:text-element-disabled disabled:hover:bg-transparent"
          @click="emit('action')"
        >
          {{ actionLabel }}
        </button>
      </div>

      <span
        v-if="showResize"
        class="absolute bottom-px right-px cursor-se-resize select-none p-1 text-element-quaternary"
        @pointerdown="handleResizePointerDown"
        @pointermove="handleResizePointerMove"
        @pointerup="handleResizePointerUp"
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
          <path
            d="M7 1L1 7M7 4L4 7"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </div>

    <TextHelper
      v-if="helperText"
      :id="`${textareaId}-helper`"
      :helper-text="helperText"
      :type="state === 'error' ? 'error' : 'enabled'"
    />
  </div>
</template>
