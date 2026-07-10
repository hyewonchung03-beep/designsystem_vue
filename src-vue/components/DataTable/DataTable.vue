<!--
  DataTable — 정렬/페이지네이션/컬럼 토글/행 선택을 지원하는 데이터 테이블

  React: src/components/DataTable/DataTable.tsx

  ── 제네릭 단순화 ────────────────────────────────────────────────────────────
  React 원본은 `DataTable<T extends Record<string, unknown>>`로 제네릭이었다.
  이 코드베이스에는 아직 `<script setup generic="...">` 패턴 선례가 없고, 이
  컴포넌트가 Storybook 데모 용도로 쓰이는 한 제네릭 타입 안정성의 실익이 크지
  않다고 판단해 `Record<string, unknown>` 고정 타입으로 단순화했다. 필요해지면
  Vue 3.5의 `generic` 속성으로 나중에 승격 가능.

  ── render prop 이식 ─────────────────────────────────────────────────────────
  React의 `render?: (value, row) => ReactNode`를 Vue 템플릿에서 그대로 쓰기
  위해 `<component :is="() => col.render(...)" />` 패턴(함수를 함수형 컴포넌트로
  취급하는 Vue 3 트릭)을 사용했다. 문자열과 VNode 반환 모두 지원된다.

  ── Pagination ───────────────────────────────────────────────────────────────
  DataTable 전용 내부 Pagination은 ./DataTablePagination.vue로 분리했다 (React
  원본에서도 파일 내부 전용 함수였고, DatatableTree의 것과 클래스/알고리즘이
  거의 동일하지만 원본 자체가 공유하지 않으므로 포팅 시에도 공유하지 않았다 —
  DataTablePagination.vue 상단 주석 참고).

  ── DatatableHeader / DatatableSelectCell 연동 ──────────────────────────────
  다른 에이전트가 포팅한 실제 Vue 버전을 확인해 prop 이름을 그대로 맞췄다:
  DatatableHeader는 `class-name`(className, `class`가 아님) prop과 `selectChange`
  /`sortChange` emit을 쓴다. DatatableSelectCell은 `ariaLabel` prop과 `change`
  emit(boolean)을 쓴다.
-->
<script lang="ts">
import type { SortDirection } from '../DatatableHeader/DatatableHeader.vue';

export type { SortDirection };

export type DataTableColumn = {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: unknown, row: Record<string, unknown>) => unknown;
};
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import DataToolbar from '../DataToolbar/DataToolbar.vue';
import DatatableHeader from '../DatatableHeader/DatatableHeader.vue';
import type { DatatableHeaderColumn } from '../DatatableHeader/DatatableHeader.vue';
import DatatableSelectCell from '../DatatableSelectCell/DatatableSelectCell.vue';
import DataTablePagination from './DataTablePagination.vue';
// NOTE: SortDirection / DataTableColumn are declared in the plain <script> block
// above and are available here — Vue SFCs share module scope across <script> and
// <script setup> (this codebase's established convention for type exports, see
// IconButton.vue / Select.vue / DatatableHeader.vue).

const props = withDefaults(
  defineProps<{
    columns: DataTableColumn[];
    data: Record<string, unknown>[];
    perPage?: number;
    showToolbar?: boolean;
    showPagination?: boolean;
    selectable?: boolean;
    class?: string;
  }>(),
  {
    perPage: 10,
    showToolbar: true,
    showPagination: true,
    selectable: false,
    class: '',
  },
);

// ── State ────────────────────────────────────────────────────────────────

const currentPage = ref(1);
const perPageState = ref(props.perPage);
const sortKey = ref<string | null>(null);
const sortDir = ref<SortDirection | null>(null);
const selectedRows = ref<Set<number>>(new Set());
const visibleColumnHeaders = ref<string[]>(props.columns.map((c) => c.header));

// React 원본의 `useEffect(() => { setPerPage(initialPerPage); setCurrentPage(1) }, [initialPerPage])`
// 를 미러링: perPage prop이 나중에 바뀌면 내부 상태를 재시드한다.
watch(
  () => props.perPage,
  (next) => {
    perPageState.value = next;
    currentPage.value = 1;
  },
);

// ── Derived ──────────────────────────────────────────────────────────────

const visibleCols = computed(() =>
  props.columns.filter((c) => visibleColumnHeaders.value.includes(c.header)),
);

const headerColumns = computed<DatatableHeaderColumn[]>(() =>
  visibleCols.value.map((col) => ({
    key: col.key,
    label: col.header,
    icon: col.sortable !== false ? 'sort' : 'none',
  })),
);

const sorted = computed(() => {
  if (!sortKey.value || !sortDir.value) return props.data;
  const key = sortKey.value;
  const dir = sortDir.value;
  return [...props.data].sort((a, b) => {
    const av = String(a[key] ?? '');
    const bv = String(b[key] ?? '');
    const cmp = av.localeCompare(bv);
    return dir === 'desc' ? -cmp : cmp;
  });
});

const totalPages = computed(() => Math.max(1, Math.ceil(props.data.length / perPageState.value)));

const pageData = computed(() =>
  sorted.value.slice(
    (currentPage.value - 1) * perPageState.value,
    currentPage.value * perPageState.value,
  ),
);

const allPageSelected = computed(
  () =>
    props.selectable &&
    pageData.value.length > 0 &&
    pageData.value.every((_, i) =>
      selectedRows.value.has((currentPage.value - 1) * perPageState.value + i),
    ),
);

const somePageSelected = computed(
  () =>
    props.selectable &&
    !allPageSelected.value &&
    pageData.value.some((_, i) =>
      selectedRows.value.has((currentPage.value - 1) * perPageState.value + i),
    ),
);

// ── Handlers ─────────────────────────────────────────────────────────────

function handleSortChange(key: string, direction: SortDirection) {
  sortKey.value = key;
  sortDir.value = direction;
  currentPage.value = 1;
}

function handlePerPageChange(value: number) {
  perPageState.value = value;
  currentPage.value = 1;
}

function handleVisibleColumnsChange(cols: string[]) {
  visibleColumnHeaders.value = cols;
  currentPage.value = 1;
}

function handleSelectAll(checked: boolean) {
  const next = new Set(selectedRows.value);
  pageData.value.forEach((_, i) => {
    const idx = (currentPage.value - 1) * perPageState.value + i;
    if (checked) next.add(idx);
    else next.delete(idx);
  });
  selectedRows.value = next;
}

function handleSelectRow(absoluteIdx: number, checked: boolean) {
  const next = new Set(selectedRows.value);
  if (checked) next.add(absoluteIdx);
  else next.delete(absoluteIdx);
  selectedRows.value = next;
}

function handlePageChange(page: number) {
  currentPage.value = Math.max(1, Math.min(page, totalPages.value));
}

function isRowSelected(absoluteIdx: number) {
  return props.selectable && selectedRows.value.has(absoluteIdx);
}

// `render` prop 포팅: React의 `render?: (value, row) => ReactNode`를 Vue에서
// 그대로 쓰기 위해 함수를 함수형 컴포넌트로 취급하는 `<component :is="fn" />`
// 트릭을 쓴다 (문자열/VNode 반환 모두 지원). optional chaining으로 non-null
// assertion 없이 안전하게 처리한다.
function cellRenderFn(col: DataTableColumn, row: Record<string, unknown>) {
  return () => col.render?.(row[col.key], row);
}
</script>

<template>
  <div :class="`flex flex-col gap-5 overflow-hidden text-left ${props.class}`">
    <div class="overflow-hidden rounded-4 border border-border-solid-variant bg-surface-container">
      <DataToolbar
        v-if="showToolbar"
        :total-count="data.length"
        :per-page="perPageState"
        :per-page-options="[10, 20, 50, 100]"
        :columns="columns.map((c) => c.header)"
        :visible-columns="visibleColumnHeaders"
        @per-page-change="handlePerPageChange"
        @visible-columns-change="handleVisibleColumnsChange"
      />

      <DatatableHeader
        :columns="headerColumns"
        :show-select="selectable"
        :select-checked="allPageSelected"
        :select-indeterminate="somePageSelected"
        @select-change="handleSelectAll"
        @sort-change="handleSortChange"
      />

      <div>
        <div
          v-for="(row, rowIdx) in pageData"
          :key="rowIdx"
          :class="[
            'flex items-center border-b border-border-solid-variant last:border-b-0',
            'hover:bg-interaction-neutral-hover',
            isRowSelected((currentPage - 1) * perPageState + rowIdx) ? 'bg-selected-container-variant' : '',
          ]"
        >
          <DatatableSelectCell
            v-if="selectable"
            size="lg"
            :checked="isRowSelected((currentPage - 1) * perPageState + rowIdx)"
            :aria-label="`Select row ${(currentPage - 1) * perPageState + rowIdx + 1}`"
            @change="(checked) => handleSelectRow((currentPage - 1) * perPageState + rowIdx, checked)"
          />
          <div class="flex min-w-0 flex-1">
            <div v-for="col in visibleCols" :key="col.key" class="flex min-h-9 min-w-0 flex-1 items-center py-3">
              <div class="w-2 shrink-0" />
              <span class="min-w-0 flex-1 truncate text-text-md leading-text-md font-regular text-element-secondary text-left">
                <component v-if="col.render" :is="cellRenderFn(col, row)" />
                <template v-else>{{ String(row[col.key] ?? '') }}</template>
              </span>
              <div class="w-2 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <DataTablePagination
      v-if="showPagination && totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @change="handlePageChange"
    />
  </div>
</template>
