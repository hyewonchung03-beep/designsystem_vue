<!--
  TreeRow — DatatableTree의 재귀적 행 렌더링 (non-exported, private)

  React: src/components/DatatableTree/DatatableTree.tsx (TreeRow)
  React는 <><TreeRow/>...{children.map(<TreeRow/>)}</> 형태의 재귀 컴포넌트였다.
  Vue SFC는 파일명으로 자기 자신을 암묵적으로 재귀 참조할 수 있어(공식 문서:
  "single-file components can implicitly refer to themselves via their
  filename") 별도 import/등록 없이 템플릿에서 <TreeRow .../>를 재귀 호출한다.
  React의 Fragment(<>...</>)는 Vue 3의 멀티 루트 템플릿으로 그대로 대응된다.
-->
<script setup lang="ts">
import { computed } from 'vue';
import type { DatatableTreeColumn, DatatableTreeRow } from './DatatableTree.vue';

const props = defineProps<{
  row: DatatableTreeRow;
  columns: DatatableTreeColumn[];
  tier: number;
  expandedIds: Set<string>;
}>();

const emit = defineEmits<{ toggle: [id: string] }>();

const tierIndent: Record<number, string> = {
  1: 'pl-3',
  2: 'pl-7',
  3: 'pl-[42px]',
  4: 'pl-14',
};

const isOpen = computed(() => props.expandedIds.has(props.row.id));
const hasChildren = computed(() => !!props.row.children && props.row.children.length > 0);
const indent = computed(() => tierIndent[Math.min(props.tier, 4)] ?? 'pl-14');
const restColumns = computed(() => props.columns.slice(1));
</script>

<template>
  <div class="flex items-center border-b border-border-solid-variant last:border-b-0 hover:bg-interaction-neutral-hover">
    <!-- Tree cell (first column) -->
    <div :class="`flex min-h-9 min-w-0 flex-1 items-center py-3 ${indent}`">
      <div class="flex min-w-0 flex-1 items-center gap-2">
        <button
          v-if="hasChildren"
          type="button"
          :aria-expanded="isOpen"
          :aria-label="isOpen ? `Collapse ${row.label}` : `Expand ${row.label}`"
          class="flex shrink-0 items-center justify-center rounded-circle text-element-secondary hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed focus-visible:outline-none focus-visible:shadow-focus-button-ring"
          @click="emit('toggle', row.id)"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            :class="`transition-transform duration-150 ${isOpen ? 'rotate-90' : ''}`"
          >
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <span v-else class="size-5 shrink-0" />
        <span class="truncate text-text-md leading-text-md font-regular text-element-secondary text-left">{{ row.label }}</span>
        <span
          v-if="row.badge"
          class="inline-flex shrink-0 items-center rounded-circle border border-border-normal px-2 py-1 text-text-xs leading-text-xs font-regular text-element-tertiary"
        >
          {{ row.badge }}
        </span>
      </div>
      <div class="w-2 shrink-0" />
    </div>

    <!-- Data cells -->
    <div v-for="col in restColumns" :key="col.key" class="flex min-h-9 min-w-0 flex-1 items-center py-3">
      <div class="w-2 shrink-0" />
      <div v-if="row.cells[col.key]" class="flex min-w-0 flex-1 items-center gap-1.5">
        <span class="flex shrink-0 items-center justify-center text-element-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3.25 18V16H4.75V18C4.75 18.69 5.31 19.25 6 19.25H8V20.75H6C4.48 20.75 3.25 19.52 3.25 18ZM14 19.25V20.75H10V19.25H14ZM19.25 18V16H20.75V18C20.75 19.52 19.52 20.75 18 20.75H16V19.25H18C18.69 19.25 19.25 18.69 19.25 18ZM4.75 10V14H3.25V10H4.75ZM20.75 10V14H19.25V10H20.75ZM3.25 6C3.25 4.48 4.48 3.25 6 3.25H8V4.75H6C5.31 4.75 4.75 5.31 4.75 6V8H3.25V6ZM19.25 6C19.25 5.31 18.69 4.75 18 4.75H16V3.25H18C19.52 3.25 20.75 4.48 20.75 6V8H19.25V6ZM14 3.25V4.75H10V3.25H14Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <div class="flex min-w-0 flex-1 flex-col">
          <span class="text-text-md leading-text-md font-regular text-element-secondary text-left">{{ row.cells[col.key].content }}</span>
          <span v-if="row.cells[col.key].subText" class="text-text-sm leading-text-sm-compact font-regular text-element-quaternary text-left">
            {{ row.cells[col.key].subText }}
          </span>
        </div>
      </div>
      <div v-else class="flex-1" />
      <div class="w-2 shrink-0" />
    </div>
  </div>

  <template v-if="isOpen">
    <TreeRow
      v-for="child in row.children"
      :key="child.id"
      :row="child"
      :columns="columns"
      :tier="tier + 1"
      :expanded-ids="expandedIds"
      @toggle="(id) => emit('toggle', id)"
    />
  </template>
</template>
