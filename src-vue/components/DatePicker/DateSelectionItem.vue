<!--
  DateSelectionItem — the YEAR/MONTH jump panel (a 3-col grid of years, or a
  3-col grid of month abbreviations, toggled by two tab-style triggers up
  top). This is NOT a day-calendar grid — that's CalendarGrid.vue. It does
  not reuse DateCell at all; it has its own year/month button markup.

  Callback props from the React source (onYearChange/onMonthChange/
  onActiveTypeChange/onConfirm/onCancel) become emits here, which is the
  idiomatic Vue equivalent — DateSelectionItemProps below only carries data
  props.

  React: src/components/DatePicker/DatePicker.tsx (DateSelectionItem)
-->
<script lang="ts">
export type DateSelectionItemActiveType = 'year' | 'month';

export type DateSelectionItemProps = {
  year: number;
  month: number;
  activeType?: DateSelectionItemActiveType;
  class?: string;
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import OverlayHeaderPopover from '../Popover/OverlayHeaderPopover.vue';
import DatePickerFooter from './DatePickerFooter.vue';
import { MONTH_SHORT, MONTH_ABBR, PANEL_CLS, PANEL_W, PANEL_H, YEAR_START, YEAR_END } from './dateUtils';

const props = withDefaults(defineProps<DateSelectionItemProps>(), {
  activeType: 'year',
  class: '',
});

const emit = defineEmits<{
  yearChange: [y: number];
  monthChange: [m: number];
  activeTypeChange: [t: DateSelectionItemActiveType];
  confirm: [year: number, month: number];
  cancel: [];
}>();

const selYear = ref(props.year);
const selMonth = ref(props.month);
const activeTab = ref<DateSelectionItemActiveType>(props.activeType);

const years: number[] = [];
for (let y = YEAR_END; y >= YEAR_START; y--) years.push(y);

function handleYearClick(y: number) {
  selYear.value = y;
  emit('yearChange', y);
}

function handleMonthClick(m: number) {
  selMonth.value = m;
  emit('monthChange', m);
}

function switchTab(t: DateSelectionItemActiveType) {
  activeTab.value = t;
  emit('activeTypeChange', t);
}
</script>

<template>
  <div :class="[PANEL_CLS, props.class]" :style="{ width: `${PANEL_W}px`, height: `${PANEL_H}px` }">
    <OverlayHeaderPopover size="lg" :show-navigation="false" show-closed-btn @close="emit('cancel')">
      <template #title>Select year &amp; Month</template>
    </OverlayHeaderPopover>

    <!-- Navigation: year select_trigger + month select_trigger -->
    <div class="flex items-center gap-sol-12 p-sol-16 shrink-0">
      <!-- Year select_trigger -->
      <button
        type="button"
        :class="[
          'relative flex items-center gap-sol-4 rounded-4 cursor-pointer focus:outline-none',
          activeTab === 'year' ? 'shadow-[0_0_0_2px_var(--sol-primary)]' : '',
        ]"
        @click="switchTab('year')"
      >
        <span
          v-if="activeTab !== 'year'"
          class="absolute rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
          style="inset: calc(var(--sol-gap-2) * -1)"
        />
        <span class="relative text-text-sm leading-text-sm font-regular text-element-primary whitespace-nowrap">
          {{ selYear }}
        </span>
        <span class="relative flex items-center justify-center size-3.5 text-element-primary">
          <svg v-if="activeTab === 'year'" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5.46973 14.4697L11.4697 8.46973C11.7626 8.17684 12.2374 8.17684 12.5303 8.46973L18.5303 14.4697L17.4697 15.5303L12 10.0605L6.53027 15.5303L5.46973 14.4697Z"
              fill="currentColor"
            />
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>

      <!-- Month select_trigger -->
      <button
        type="button"
        :class="[
          'relative flex items-center gap-sol-4 rounded-4 cursor-pointer focus:outline-none',
          activeTab === 'month' ? 'shadow-[0_0_0_2px_var(--sol-primary)]' : '',
        ]"
        @click="switchTab('month')"
      >
        <span
          v-if="activeTab !== 'month'"
          class="absolute rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
          style="inset: calc(var(--sol-gap-2) * -1)"
        />
        <span class="relative text-text-sm leading-text-sm font-regular text-element-primary whitespace-nowrap">
          {{ MONTH_SHORT[selMonth] }}
        </span>
        <span class="relative flex items-center justify-center size-3.5 text-element-primary">
          <svg v-if="activeTab === 'month'" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5.46973 14.4697L11.4697 8.46973C11.7626 8.17684 12.2374 8.17684 12.5303 8.46973L18.5303 14.4697L17.4697 15.5303L12 10.0605L6.53027 15.5303L5.46973 14.4697Z"
              fill="currentColor"
            />
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
    </div>

    <!-- Grid (scrollable) — 3-col: each cell 84px × 3 = 252px = panel 276 − padding 12×2 -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden min-h-0 px-3">
      <div class="flex flex-wrap" style="row-gap: var(--sol-gap-2)">
        <template v-if="activeTab === 'year'">
          <button
            v-for="y in years"
            :key="y"
            type="button"
            :class="[
              'group relative flex h-9 items-center justify-center overflow-hidden cursor-pointer focus:outline-none',
              y === selYear ? 'focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]' : '',
            ]"
            style="width: calc(100% / 3)"
            @click="handleYearClick(y)"
          >
            <template v-if="y === selYear">
              <span class="absolute inset-0.5 rounded-4" style="background-color: var(--sol-fill-active)" />
              <span class="absolute inset-0.5 rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
              <span class="relative text-text-sm leading-text-sm font-semibold text-static-white text-center whitespace-nowrap">
                {{ y }}
              </span>
            </template>
            <template v-else>
              <span class="absolute inset-0.5 rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
              <span class="relative text-text-sm leading-text-sm font-regular text-element-primary text-center whitespace-nowrap">
                {{ y }}
              </span>
            </template>
          </button>
        </template>
        <template v-else>
          <button
            v-for="(m, i) in MONTH_ABBR"
            :key="m"
            type="button"
            :class="[
              'group relative flex h-9 items-center justify-center overflow-hidden cursor-pointer focus:outline-none',
              i === selMonth ? 'focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]' : '',
            ]"
            style="width: calc(100% / 3)"
            @click="handleMonthClick(i)"
          >
            <template v-if="i === selMonth">
              <span class="absolute inset-0.5 rounded-4" style="background-color: var(--sol-fill-active)" />
              <span class="absolute inset-0.5 rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
              <span class="relative text-text-sm leading-text-sm font-semibold text-static-white text-center whitespace-nowrap">
                {{ m }}
              </span>
            </template>
            <template v-else>
              <span class="absolute inset-0.5 rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
              <span class="relative text-text-sm leading-text-sm font-regular text-element-primary text-center whitespace-nowrap">
                {{ m }}
              </span>
            </template>
          </button>
        </template>
      </div>
    </div>

    <DatePickerFooter @cancel="emit('cancel')" @confirm="emit('confirm', selYear, selMonth)" />
  </div>
</template>
