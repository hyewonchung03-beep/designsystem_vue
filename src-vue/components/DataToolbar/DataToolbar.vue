<!--
  DataToolbar — DataTable/DatatableTree 상단 툴바 (basic / action 2가지 타입)

  React: src/components/DataToolbar/DataToolbar.tsx

  ── 서브 컴포넌트 분리 기준 ──────────────────────────────────────────────────
  PerPageSelect / ColumnSelect는 React 원본에서 useState(isOpen) + mousedown
  클릭아웃사이드를 수작업 구현한 "독립 드롭다운" 조각이라 Headless UI Listbox로
  교체할 필요가 있어 각각 별도 파일(./PerPageSelect.vue, ./ColumnSelect.vue)로
  분리했다 (Select.vue/MultiSelect.vue와 동일한 패턴).
  ToolbarDivider / SplitButton(로컬) / DownloadIconButton / BasicSearchInput /
  ActionSearchInput은 open 상태가 없는 순수 프레젠테이션 조각이고, 최대 2회만
  반복 사용되는 수준이라 별도 파일로 쪼개지 않고 템플릿에 인라인했다 (분리해도
  재사용 자체 로직이 없어 파일만 늘어나는 오버헤드가 큼 — 참고: 최상위
  src-vue/components/SplitButton/SplitButton.vue는 이 파일의 로컬 SplitButton과
  이름만 같을 뿐 클래스/구조/사이즈가 전혀 다른 별개 컴포넌트이므로 재사용하지
  않았다. 원본 그대로 사이즈 32px/오버레이 없는 버전을 인라인 포팅했다).

  ── controlled / uncontrolled 컨벤션 ────────────────────────────────────────
  React 원본은 "핸들러(onPerPageChange 등)가 전달됐는지"를 controlled 여부의
  기준으로 삼았다. Vue 포팅에서는 Select.vue의 컨벤션(모델 prop이 `undefined`인지
  여부로 controlled/uncontrolled를 가른다)을 그대로 따랐다 — 즉 `perPage`,
  `visibleColumns`, `searchValue` prop 자체가 undefined면 내부 ref로 자체 관리하고,
  값이 주어지면 그 값을 그대로 표시하며 변경은 emit으로만 부모에 알린다. 실사용
  패턴(스토리에서 prop+핸들러를 항상 같이 주거나 둘 다 안 주는 경우)에서는 React
  원본과 동일하게 동작하며, "핸들러만 있고 prop은 없는" 극단적 edge case만 갈린다.

  콜백 prop 이름은 이 코드베이스 컨벤션(SplitButton.vue의 onPrimaryClick→
  primaryClick, Checkbox.vue의 onChange→change 등)을 따라 "on" 접두어를 떼고
  camelCase emit으로 변환했다: onPerPageChange→perPageChange,
  onVisibleColumnsChange→visibleColumnsChange, onSearchChange→searchChange,
  onDownload→download, onAction→action, onActionTrigger→actionTrigger,
  onSubClick→subClick.
-->
<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import PerPageSelect from './PerPageSelect.vue';
import ColumnSelect from './ColumnSelect.vue';

const props = withDefaults(
  defineProps<{
    type?: 'basic' | 'action';
    // basic
    totalCount?: number;
    perPage?: number;
    defaultPerPage?: number;
    perPageOptions?: number[];
    columns?: string[];
    visibleColumns?: string[];
    // action
    showInput?: boolean;
    showAction?: boolean;
    showCount?: boolean;
    selectedCount?: number;
    subLabel?: string;
    showSubButton?: boolean;
    // shared
    searchValue?: string;
    actionLabel?: string;
    class?: string;
  }>(),
  {
    type: 'basic',
    totalCount: 0,
    defaultPerPage: 10,
    perPageOptions: () => [10, 20, 50, 100],
    columns: () => [],
    showInput: true,
    showAction: true,
    showCount: false,
    selectedCount: 0,
    subLabel: 'Sub',
    showSubButton: true,
    actionLabel: 'Action',
    class: '',
  },
);

const emit = defineEmits<{
  perPageChange: [value: number];
  visibleColumnsChange: [columns: string[]];
  searchChange: [value: string];
  download: [];
  action: [];
  actionTrigger: [];
  subClick: [];
}>();

// ── controlled/uncontrolled fallback state (Select.vue 컨벤션) ─────────────

const internalPerPage = ref(props.defaultPerPage);
const internalVisible = ref<string[]>(props.visibleColumns ?? props.columns);
const internalSearch = ref('');

const currentPerPage = computed(() =>
  props.perPage !== undefined ? props.perPage : internalPerPage.value,
);
const currentVisible = computed(() =>
  props.visibleColumns !== undefined ? props.visibleColumns : internalVisible.value,
);
const currentSearch = computed(() =>
  props.searchValue !== undefined ? props.searchValue : internalSearch.value,
);

function handlePerPageChange(v: number) {
  if (props.perPage === undefined) internalPerPage.value = v;
  emit('perPageChange', v);
}

function handleVisibleChange(cols: string[]) {
  if (props.visibleColumns === undefined) internalVisible.value = cols;
  emit('visibleColumnsChange', cols);
}

function handleSearchChange(v: string) {
  if (props.searchValue === undefined) internalSearch.value = v;
  emit('searchChange', v);
}

// ── ids for search inputs (basic / action variants each render one) ────────

const basicSearchId = useId();
const actionSearchId = useId();
</script>

<template>
  <!-- ═══ type: action ═══ -->
  <div
    v-if="type === 'action'"
    role="toolbar"
    aria-label="Data table action toolbar"
    :class="`flex h-[52px] items-center justify-between gap-3 px-3 py-2 text-left ${props.class}`"
  >
    <!-- Left: search -->
    <div v-if="showInput" class="flex max-w-[300px] flex-1 flex-col items-start">
      <div class="flex h-[36px] w-full items-center gap-1 overflow-hidden rounded-4 border border-border-normal bg-surface-container pl-3 pr-3 py-2.5">
        <label :for="actionSearchId" class="flex size-4 shrink-0 items-center justify-center text-element-quaternary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20.2217 11.4502C20.2216 13.5376 19.4624 15.4466 18.208 16.9209L21.6318 20.2324L20.5889 21.3105L17.1406 17.9746C15.6808 19.1773 13.8106 19.9003 11.7715 19.9004C7.10474 19.9004 3.32139 16.1169 3.32129 11.4502C3.32129 6.78339 7.10468 3 11.7715 3C16.4382 3.00011 20.2217 6.78345 20.2217 11.4502ZM18.7217 11.4502C18.7217 7.61188 15.6098 4.50011 11.7715 4.5C7.93311 4.5 4.82129 7.61182 4.82129 11.4502C4.82139 15.2885 7.93317 18.4004 11.7715 18.4004C15.6097 18.4003 18.7216 15.2884 18.7217 11.4502Z"
              fill="currentColor"
            />
          </svg>
        </label>
        <input
          :id="actionSearchId"
          type="search"
          :value="currentSearch"
          placeholder="Search"
          class="min-w-0 flex-1 truncate border-none bg-transparent text-text-sm leading-text-xs font-regular text-element-primary placeholder:text-element-quaternary outline-none"
          @input="handleSearchChange(($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <!-- Middle: selected count -->
    <span v-if="showCount" class="flex shrink-0 items-center gap-1.5 text-text-xs leading-text-xs font-semibold">
      <span class="text-element-tertiary">Selected</span>
      <span class="text-element-tertiary">{{ selectedCount }}</span>
    </span>

    <!-- Right: actions -->
    <div v-if="showAction" class="flex shrink-0 items-center gap-2">
      <button
        type="button"
        aria-label="Download"
        class="relative flex size-[32px] shrink-0 items-center justify-center overflow-hidden rounded-4 border border-border-normal bg-secondary
          hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
          focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        @click="emit('download')"
      >
        <span class="flex size-4 items-center justify-center text-element-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3.3213 18.7832V15.833H4.8213V18.7832C4.8213 19.0522 4.82166 19.209 4.83106 19.3242C4.83516 19.3744 4.84008 19.4019 4.84278 19.4141C4.85767 19.4408 4.87962 19.4624 4.90626 19.4775C4.91786 19.4802 4.94528 19.486 4.99708 19.4902C5.1123 19.4996 5.26913 19.5 5.5381 19.5H19.1045C19.3735 19.5 19.5303 19.4996 19.6455 19.4902C19.696 19.4861 19.7233 19.4802 19.7354 19.4775C19.7622 19.4625 19.7838 19.4409 19.7988 19.4141C19.8015 19.402 19.8074 19.3747 19.8115 19.3242C19.8209 19.209 19.8213 19.0522 19.8213 18.7832V15.833H21.3213V18.7832C21.3213 19.0274 21.3222 19.2558 21.3067 19.4463C21.2944 19.5957 21.2698 19.7585 21.2109 19.9238L21.1397 20.0898C20.9999 20.3641 20.7873 20.5938 20.5264 20.7539L20.4111 20.8184C20.1898 20.9311 19.9668 20.9691 19.7676 20.9854C19.5771 21.0009 19.3487 21 19.1045 21H5.5381C5.29387 21 5.06545 21.0009 4.87501 20.9854C4.72564 20.9731 4.56283 20.9485 4.39747 20.8896L4.23145 20.8184C3.91785 20.6586 3.66273 20.4034 3.50294 20.0898C3.39018 19.8685 3.35222 19.6455 3.33595 19.4463C3.3204 19.2558 3.3213 19.0274 3.3213 18.7832ZM11.5713 3H13.0713V14.7725L17.8213 10.0225L18.8818 11.083L12.8516 17.1133C12.5587 17.4062 12.0839 17.4062 11.791 17.1133L5.76075 11.083L6.8213 10.0225L11.5713 14.7725V3Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>

      <button
        v-if="showSubButton"
        type="button"
        class="relative flex h-[32px] min-w-[64px] items-center justify-center gap-1 overflow-hidden rounded-4 border border-border-normal bg-secondary px-3 py-2
          hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
          focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        @click="emit('subClick')"
      >
        <span class="text-text-xs leading-text-xs font-semibold text-element-brand">
          {{ subLabel }}
        </span>
      </button>

      <div class="flex h-[32px] items-center overflow-hidden rounded-4">
        <button
          type="button"
          class="flex h-full items-center pl-3 pr-2.5 bg-primary text-text-xs leading-text-xs font-semibold text-element-inverse
            hover:bg-interaction-inverse-hover active:bg-interaction-inverse-pressed
            focus-visible:outline-none"
          @click="emit('action')"
        >
          {{ actionLabel }}
        </button>
        <div aria-hidden="true" class="h-full w-px shrink-0 bg-border-solid-variant" />
        <button
          type="button"
          aria-label="More actions"
          class="flex size-[32px] shrink-0 items-center justify-center bg-primary text-element-inverse
            hover:bg-interaction-inverse-hover active:bg-interaction-inverse-pressed
            focus-visible:outline-none"
          @click="emit('actionTrigger')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- ═══ type: basic ═══ -->
  <div
    v-else
    role="toolbar"
    aria-label="Data table toolbar"
    :class="`flex h-[52px] items-center justify-between px-3 py-2 text-left ${props.class}`"
  >
    <!-- Left section -->
    <div class="flex min-w-0 flex-1 items-center gap-3">
      <span class="flex shrink-0 items-center gap-1.5 text-text-md leading-text-md font-semibold">
        <span class="text-element-tertiary">All</span>
        <span class="text-element-brand">{{ totalCount }}</span>
      </span>

      <div role="separator" aria-orientation="vertical" class="h-3 w-px shrink-0 rounded-2 bg-border-solid" />

      <PerPageSelect
        :value="currentPerPage"
        :options="perPageOptions"
        @change="handlePerPageChange"
      />

      <template v-if="columns.length > 0">
        <div role="separator" aria-orientation="vertical" class="h-3 w-px shrink-0 rounded-2 bg-border-solid" />
        <ColumnSelect
          :columns="columns"
          :visible-columns="currentVisible"
          @change="handleVisibleChange"
        />
      </template>
    </div>

    <!-- Right section -->
    <div class="flex shrink-0 items-center gap-2">
      <div class="flex w-[200px] flex-col items-start">
        <div class="flex h-[30px] w-full items-center gap-1 overflow-hidden rounded-4 border border-border-normal bg-surface-container pl-2.5 pr-3">
          <label :for="basicSearchId" class="flex size-3.5 shrink-0 items-center justify-center text-element-quaternary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M20.2217 11.4502C20.2216 13.5376 19.4624 15.4466 18.208 16.9209L21.6318 20.2324L20.5889 21.3105L17.1406 17.9746C15.6808 19.1773 13.8106 19.9003 11.7715 19.9004C7.10474 19.9004 3.32139 16.1169 3.32129 11.4502C3.32129 6.78339 7.10468 3 11.7715 3C16.4382 3.00011 20.2217 6.78345 20.2217 11.4502ZM18.7217 11.4502C18.7217 7.61188 15.6098 4.50011 11.7715 4.5C7.93311 4.5 4.82129 7.61182 4.82129 11.4502C4.82139 15.2885 7.93317 18.4004 11.7715 18.4004C15.6097 18.4003 18.7216 15.2884 18.7217 11.4502Z"
                fill="currentColor"
              />
            </svg>
          </label>
          <input
            :id="basicSearchId"
            type="search"
            :value="currentSearch"
            placeholder="Search"
            class="min-w-0 flex-1 truncate border-none bg-transparent text-text-sm leading-text-xs font-regular text-element-primary placeholder:text-element-quaternary outline-none"
            @input="handleSearchChange(($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>

      <button
        type="button"
        aria-label="Download"
        class="relative flex size-[32px] shrink-0 items-center justify-center overflow-hidden rounded-4 border border-border-normal bg-secondary
          hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
          focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        @click="emit('download')"
      >
        <span class="flex size-4 items-center justify-center text-element-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3.3213 18.7832V15.833H4.8213V18.7832C4.8213 19.0522 4.82166 19.209 4.83106 19.3242C4.83516 19.3744 4.84008 19.4019 4.84278 19.4141C4.85767 19.4408 4.87962 19.4624 4.90626 19.4775C4.91786 19.4802 4.94528 19.486 4.99708 19.4902C5.1123 19.4996 5.26913 19.5 5.5381 19.5H19.1045C19.3735 19.5 19.5303 19.4996 19.6455 19.4902C19.696 19.4861 19.7233 19.4802 19.7354 19.4775C19.7622 19.4625 19.7838 19.4409 19.7988 19.4141C19.8015 19.402 19.8074 19.3747 19.8115 19.3242C19.8209 19.209 19.8213 19.0522 19.8213 18.7832V15.833H21.3213V18.7832C21.3213 19.0274 21.3222 19.2558 21.3067 19.4463C21.2944 19.5957 21.2698 19.7585 21.2109 19.9238L21.1397 20.0898C20.9999 20.3641 20.7873 20.5938 20.5264 20.7539L20.4111 20.8184C20.1898 20.9311 19.9668 20.9691 19.7676 20.9854C19.5771 21.0009 19.3487 21 19.1045 21H5.5381C5.29387 21 5.06545 21.0009 4.87501 20.9854C4.72564 20.9731 4.56283 20.9485 4.39747 20.8896L4.23145 20.8184C3.91785 20.6586 3.66273 20.4034 3.50294 20.0898C3.39018 19.8685 3.35222 19.6455 3.33595 19.4463C3.3204 19.2558 3.3213 19.0274 3.3213 18.7832ZM11.5713 3H13.0713V14.7725L17.8213 10.0225L18.8818 11.083L12.8516 17.1133C12.5587 17.4062 12.0839 17.4062 11.791 17.1133L5.76075 11.083L6.8213 10.0225L11.5713 14.7725V3Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>

      <div class="flex h-[32px] items-center overflow-hidden rounded-4">
        <button
          type="button"
          class="flex h-full items-center pl-3 pr-2.5 bg-primary text-text-xs leading-text-xs font-semibold text-element-inverse
            hover:bg-interaction-inverse-hover active:bg-interaction-inverse-pressed
            focus-visible:outline-none"
          @click="emit('action')"
        >
          {{ actionLabel }}
        </button>
        <div aria-hidden="true" class="h-full w-px shrink-0 bg-border-solid-variant" />
        <button
          type="button"
          aria-label="More actions"
          class="flex size-[32px] shrink-0 items-center justify-center bg-primary text-element-inverse
            hover:bg-interaction-inverse-hover active:bg-interaction-inverse-pressed
            focus-visible:outline-none"
          @click="emit('actionTrigger')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
