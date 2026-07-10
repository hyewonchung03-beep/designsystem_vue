<!--
  DatatableTree — 트리 구조(확장/축소) 데이터 테이블

  React: src/components/DatatableTree/DatatableTree.tsx
  DataTable과 달리 open/close/popover 상태를 관리하지 않는다 — 여기서 다루는
  useState(pagination input, search query, sort key/dir, expanded-row-ids)는
  전부 평범한 위젯 상태라 Headless UI로 바꿀 이유가 없다 (project brief 참고).

  행 렌더링은 재귀 컴포넌트라 ./TreeRow.vue로 분리했고, 페이지네이션은 React
  원본처럼 파일 전용 사설 구현이라 ./DatatableTreePagination.vue로 분리했다
  (DataTable/DataTablePagination.vue와 중복이지만 원본 구조를 그대로 유지).
-->
<script lang="ts">
import type { SortDirection } from '../DatatableHeader/DatatableHeader.vue';

export type { SortDirection };

export type DatatableTreeColumn = {
  key: string;
  header: string;
  sortable?: boolean;
};

export type DatatableTreeRow = {
  id: string;
  label: string;
  cells: Record<string, { content: string; subText?: string }>;
  children?: DatatableTreeRow[];
  badge?: string;
};
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DatatableHeader from '../DatatableHeader/DatatableHeader.vue';
import type { DatatableHeaderColumn } from '../DatatableHeader/DatatableHeader.vue';
import TreeRow from './TreeRow.vue';
import DatatableTreePagination from './DatatableTreePagination.vue';
// NOTE: SortDirection / DatatableTreeColumn / DatatableTreeRow are declared in
// the plain <script> block above and shared into this scope (see DataTable.vue
// for the same convention).

const props = withDefaults(
  defineProps<{
    columns: DatatableTreeColumn[];
    rows: DatatableTreeRow[];
    perPage?: number;
    showSearch?: boolean;
    showPagination?: boolean;
    primaryAction?: { label: string; onClick?: () => void };
    secondaryAction?: { label: string; onClick?: () => void };
    searchPlaceholder?: string;
    class?: string;
  }>(),
  {
    perPage: 10,
    showSearch: true,
    showPagination: true,
    searchPlaceholder: 'Placeholder name',
    class: '',
  },
);

// ── State ────────────────────────────────────────────────────────────────

const currentPage = ref(1);
const searchQuery = ref('');
const expandedIds = ref<Set<string>>(new Set());
const sortKey = ref<string | null>(null);
const sortDir = ref<SortDirection | null>(null);

function handleToggle(id: string) {
  const next = new Set(expandedIds.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  expandedIds.value = next;
}

function handleSortChange(key: string, direction: SortDirection) {
  sortKey.value = key;
  sortDir.value = direction;
  currentPage.value = 1;
}

function handlePageChange(page: number) {
  currentPage.value = Math.max(1, Math.min(page, totalPages.value));
}

// ── Derived ──────────────────────────────────────────────────────────────

const headerColumns = computed<DatatableHeaderColumn[]>(() =>
  props.columns.map((col) => ({
    key: col.key,
    label: col.header,
    icon: col.sortable !== false ? 'sort' : 'none',
  })),
);

const totalPages = computed(() => Math.max(1, Math.ceil(props.rows.length / props.perPage)));

const pageRows = computed(() =>
  props.rows.slice((currentPage.value - 1) * props.perPage, currentPage.value * props.perPage),
);

const showToolbar = computed(() => props.showSearch || !!props.primaryAction || !!props.secondaryAction);
</script>

<template>
  <div :class="`flex flex-col gap-5 text-left ${props.class}`">
    <div class="overflow-hidden rounded-4 border border-border-solid-variant bg-surface-container">
      <!-- Toolbar -->
      <div v-if="showToolbar" class="flex items-center gap-3 px-4 py-3">
        <div v-if="showSearch" class="relative flex-1">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-element-quaternary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="searchPlaceholder"
            class="h-9 w-full rounded-4 border border-border-normal bg-surface-container pl-9 pr-3 text-text-sm leading-text-sm font-regular text-element-primary placeholder:text-element-quaternary outline-none focus:shadow-[0_0_0_2px_var(--color-primary)]"
          />
        </div>
        <div class="flex shrink-0 items-center gap-2">
          <button
            v-if="secondaryAction"
            type="button"
            class="inline-flex h-9 items-center justify-center rounded-4 border border-border-normal px-4 text-text-sm leading-text-sm font-semibold text-element-primary hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed focus-visible:outline-none focus-visible:shadow-focus-button-ring"
            @click="secondaryAction.onClick?.()"
          >
            {{ secondaryAction.label }}
          </button>
          <button
            v-if="primaryAction"
            type="button"
            class="inline-flex h-9 items-center justify-center rounded-4 bg-primary px-4 text-text-sm leading-text-sm font-semibold text-element-inverse hover:opacity-90 active:opacity-80 focus-visible:outline-none focus-visible:shadow-focus-button-ring"
            @click="primaryAction.onClick?.()"
          >
            {{ primaryAction.label }}
          </button>
        </div>
      </div>

      <DatatableHeader :columns="headerColumns" @sort-change="handleSortChange" />

      <div>
        <TreeRow
          v-for="row in pageRows"
          :key="row.id"
          :row="row"
          :columns="columns"
          :tier="1"
          :expanded-ids="expandedIds"
          @toggle="handleToggle"
        />
      </div>
    </div>

    <DatatableTreePagination
      v-if="showPagination && totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @change="handlePageChange"
    />
  </div>
</template>
