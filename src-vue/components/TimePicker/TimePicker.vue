<!--
  TimePicker — hour/minute/second/AM-PM 선택 위젯 콘텐츠

  React: src/components/TimePicker/TimePicker.tsx (TimePicker)
  React 원본은 open/close 팝오버 상태를 전혀 관리하지 않는다 (isOpen, aria-haspopup,
  click-outside 없음) — 항상 렌더링되는 위젯 콘텐츠 자체이며, Modal/Popover/DatePicker와
  마찬가지로 소비 앱이 Popover/트리거로 감싸서 사용하는 구조다. 따라서 이 Vue 포팅도
  Headless UI로 감싸지 않고 내부 hour/minute/second/ampm 상태만 plain ref로 포팅한다.

  Controlled value 컨벤션: Select.vue와 동일하게 `modelValue`/`update:modelValue` +
  `defaultValue`(비제어 시 초기값) 조합을 사용한다. React 원본에는 controlled `value`
  prop이 없었지만(오직 defaultValue + onConfirm 콜백뿐), 이 코드베이스의 다른
  "value picker" 계열 컴포넌트와의 일관성을 위해 modelValue를 추가했다 — 각 필드
  (hour/minute/second/ampm)는 Select의 value computed + handleChange 패턴을 그대로
  따라 개별적으로 제어/비제어를 지원한다.

  React의 onConfirm/onCancel/onClose 콜백 props는 OverlayModal.vue/OverlayFooterModal.vue
  선례를 따라 Vue emit(confirm/cancel/close)으로 변환했다. className → class로 변환.
-->
<script lang="ts">
export type TimePickerFormat = '12hour' | '24hour';

export type TimeValue = {
  hour: number;
  minute: number;
  second: number;
  ampm: 'AM' | 'PM';
};

export type TimePickerProps = {
  format?: TimePickerFormat;
  modelValue?: Partial<TimeValue>;
  defaultValue?: Partial<TimeValue>;
  showMinute?: boolean;
  showSecond?: boolean;
  showFooter?: boolean;
  class?: string;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const HOUR_12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const HOUR_24 = Array.from({ length: 24 }, (_, i) => i);
const MIN_SEC_OPTIONS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const COL_W = 'w-4'; // 16px fixed colon/spacer width (--sol-gap-16 → w-4)
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import OverlayHeaderPopover from '../Popover/OverlayHeaderPopover.vue';
import TimeCell from './TimeCell.vue';
import AmPmCell from './AmPmCell.vue';

const props = withDefaults(defineProps<TimePickerProps>(), {
  format: '12hour',
  showMinute: true,
  showSecond: true,
  showFooter: true,
  class: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: TimeValue];
  confirm: [value: TimeValue];
  cancel: [];
  close: [];
}>();

const is24Hour = computed(() => props.format === '24hour');
const hourOptions = computed(() => (is24Hour.value ? HOUR_24 : HOUR_12));

// Initial values only ever read once at setup time — mirrors React's
// useState(initializer) semantics (defaultValue/format are not reactive here).
const internalHour = ref<number>(props.defaultValue?.hour ?? (is24Hour.value ? 0 : 12));
const internalMinute = ref<number>(props.defaultValue?.minute ?? 0);
const internalSecond = ref<number>(props.defaultValue?.second ?? 0);
const internalAmpm = ref<'AM' | 'PM'>(props.defaultValue?.ampm ?? 'AM');

const hour = computed(() => props.modelValue?.hour ?? internalHour.value);
const minute = computed(() => props.modelValue?.minute ?? internalMinute.value);
const second = computed(() => props.modelValue?.second ?? internalSecond.value);
const ampm = computed(() => props.modelValue?.ampm ?? internalAmpm.value);

const currentValue = computed<TimeValue>(() => ({
  hour: hour.value,
  minute: minute.value,
  second: second.value,
  ampm: ampm.value,
}));

function setHour(h: number) {
  if (props.modelValue?.hour === undefined) internalHour.value = h;
  emit('update:modelValue', { ...currentValue.value, hour: h });
}

function setMinute(m: number) {
  if (props.modelValue?.minute === undefined) internalMinute.value = m;
  emit('update:modelValue', { ...currentValue.value, minute: m });
}

function setSecond(s: number) {
  if (props.modelValue?.second === undefined) internalSecond.value = s;
  emit('update:modelValue', { ...currentValue.value, second: s });
}

function toggleAmpm() {
  const next: 'AM' | 'PM' = ampm.value === 'AM' ? 'PM' : 'AM';
  if (props.modelValue?.ampm === undefined) internalAmpm.value = next;
  emit('update:modelValue', { ...currentValue.value, ampm: next });
}

const scrollHours = computed(() => hourOptions.value.filter((h) => h !== hour.value));
const scrollMinutes = computed(() => MIN_SEC_OPTIONS.filter((m) => m !== minute.value));
const scrollSeconds = computed(() => MIN_SEC_OPTIONS.filter((s) => s !== second.value));
</script>

<template>
  <!--
    NOTE: width:256px/height:360px below have no matching --sol-* token
    (ported verbatim from React's style={{ width: 256, height: 360 }}).
    CLAUDE.md violation (no hardcoded px) — left as-is pending a token decision.
  -->
  <div
    :class="`flex flex-col bg-surface-container-high border border-border-solid rounded-4 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.04),0px_2px_6px_0px_rgba(0,0,0,0.08)] overflow-hidden shrink-0 ${props.class}`"
    style="width: 256px; height: 360px"
  >
    <OverlayHeaderPopover
      size="lg"
      :show-navigation="false"
      show-closed-btn
      @close="$emit('close')"
    >
      <template #title>Select time</template>
    </OverlayHeaderPopover>

    <!-- Content -->
    <div class="flex flex-col flex-1 min-h-0 overflow-hidden py-2 px-3">
      <!-- ── Fixed first row: selected values ── -->
      <div class="flex shrink-0 items-center gap-1">
        <div class="flex-1 px-1">
          <TimeCell :label="hour" selected />
        </div>

        <template v-if="showMinute">
          <div :class="`shrink-0 flex items-center justify-center ${COL_W} py-2 text-text-sm leading-text-sm font-regular text-element-primary`">
            :
          </div>
          <div class="flex-1 px-1">
            <TimeCell :label="minute" selected />
          </div>
        </template>

        <template v-if="showSecond">
          <div :class="`shrink-0 flex items-center justify-center ${COL_W} py-2 text-text-sm leading-text-sm font-regular text-element-primary`">
            :
          </div>
          <div class="flex-1 px-1">
            <TimeCell :label="second" selected />
          </div>
        </template>

        <div v-if="!is24Hour" class="flex-1 px-1">
          <AmPmCell :label="ampm" selected />
        </div>
      </div>

      <!-- ── Scrollable rows: remaining options ── -->
      <div class="flex flex-1 min-h-0 overflow-hidden gap-1">
        <div class="flex-1 overflow-y-auto px-1">
          <TimeCell v-for="h in scrollHours" :key="h" :label="h" :selected="false" @click="setHour(h)" />
        </div>

        <template v-if="showMinute">
          <div :class="`shrink-0 ${COL_W}`" />
          <div class="flex-1 overflow-y-auto px-1">
            <TimeCell v-for="m in scrollMinutes" :key="m" :label="m" :selected="false" @click="setMinute(m)" />
          </div>
        </template>

        <template v-if="showSecond">
          <div :class="`shrink-0 ${COL_W}`" />
          <div class="flex-1 overflow-y-auto px-1">
            <TimeCell v-for="s in scrollSeconds" :key="s" :label="s" :selected="false" @click="setSecond(s)" />
          </div>
        </template>

        <div v-if="!is24Hour" class="flex-1 px-1">
          <AmPmCell :label="ampm === 'AM' ? 'PM' : 'AM'" :selected="false" @click="toggleAmpm" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div v-if="showFooter" class="shrink-0 w-full">
      <div class="h-px bg-border-solid-variant" />
      <div class="flex items-center justify-end gap-5 py-4 px-5">
        <button
          type="button"
          class="group relative flex items-center justify-center cursor-pointer rounded-2 focus:outline-none"
          @click="$emit('cancel')"
        >
          <span
            class="absolute rounded-2 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
            style="inset: calc(var(--sol-gap-2) * -1)"
          />
          <span class="relative text-text-sm leading-text-sm font-semibold text-element-quaternary whitespace-nowrap">
            Cancel
          </span>
        </button>
        <button
          type="button"
          class="group relative flex items-center justify-center cursor-pointer rounded-2 focus:outline-none"
          @click="$emit('confirm', currentValue)"
        >
          <span
            class="absolute rounded-2 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
            style="inset: calc(var(--sol-gap-2) * -1)"
          />
          <span class="relative text-text-sm leading-text-sm font-semibold text-element-brand whitespace-nowrap">
            Select
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
