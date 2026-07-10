<!--
  PaginationNav — 페이지 번호 네비게이션 (first/prev · page numbers · next/last)

  React: src/components/Pagination/Pagination.tsx (PaginationNav, NavButton, PageItem, EllipsisItem)
  NavButton/PageItem/EllipsisItem은 React 원본에서도 export되지 않는 내부 전용
  서브 컴포넌트라 별도 .vue 파일로 분리하지 않고 이 템플릿 안에 인라인으로
  포팅했다 (index.ts가 Pagination/PaginationNav/PaginationSearch만 export).
-->
<script lang="ts">
type PageEntry = number | 'ellipsis';

type NavIcon = 'first' | 'prev' | 'next' | 'last';

// ── Page range algorithm (React 원본과 동일) ──────────────────────────────
// 1. 첫 페이지와 마지막 페이지는 항상 표시
// 2. 현재 페이지 기준 ±2 페이지 표시
// 3. 생략 페이지 2개 이상 → ellipsis
// 4. 생략 페이지 1개 → 해당 페이지 번호 직접 표시
// 5. 전체가 표시 범위 이내 → ellipsis 없이 모두 표시
function getPageEntries(current: number, total: number): PageEntry[] {
  const wStart = Math.max(1, current - 2);
  const wEnd = Math.min(total, current + 2);

  const entries: PageEntry[] = [];

  if (wStart > 1) {
    entries.push(1);
    const leftGap = wStart - 2;
    if (leftGap >= 2) entries.push('ellipsis');
    else if (leftGap === 1) entries.push(2);
  }

  for (let i = wStart; i <= wEnd; i++) entries.push(i);

  if (wEnd < total) {
    const rightGap = total - 1 - wEnd;
    if (rightGap >= 2) entries.push('ellipsis');
    else if (rightGap === 1) entries.push(wEnd + 1);
    entries.push(total);
  }

  return entries;
}

const NAV_ICON_PATH: Record<NavIcon, string> = {
  first: 'M11.5302 7.53027L7.06049 12L11.5302 16.4697L10.4697 17.5303L5.46967 12.5303C5.17678 12.2374 5.17678 11.7626 5.46967 11.4697L10.4697 6.46973L11.5302 7.53027ZM18.5302 7.53027L14.0605 12L18.5302 16.4697L17.4697 17.5303L12.4697 12.5303C12.1768 12.2374 12.1768 11.7626 12.4697 11.4697L17.4697 6.46973L18.5302 7.53027Z',
  prev: 'M15.5302 6.53027L10.0605 12L15.5302 17.4697L14.4697 18.5303L8.46967 12.5303C8.17678 12.2374 8.17678 11.7626 8.46967 11.4697L14.4697 5.46973L15.5302 6.53027Z',
  next: 'M15.5303 11.4697C15.8232 11.7626 15.8232 12.2374 15.5303 12.5303L9.53027 18.5303L8.46973 17.4697L13.9395 12L8.46973 6.53027L9.53027 5.46973L15.5303 11.4697Z',
  last: 'M11.5303 11.4697L11.582 11.5264C11.8063 11.8013 11.8063 12.1987 11.582 12.4736L11.5303 12.5303L6.53027 17.5303L5.46973 16.4697L9.93945 12L5.46973 7.53027L6.53027 6.46973L11.5303 11.4697ZM18.5303 11.4697L18.582 11.5264C18.8063 11.8013 18.8063 12.1987 18.582 12.4736L18.5303 12.5303L13.5303 17.5303L12.4697 16.4697L16.9395 12L12.4697 7.53027L13.5303 6.46973L18.5303 11.4697Z',
};
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    currentPage: number;
    totalPages: number;
    class?: string;
  }>(),
  { class: '' },
);

const emit = defineEmits<{
  change: [page: number];
}>();

const entries = computed(() => getPageEntries(props.currentPage, props.totalPages));

function go(page: number) {
  if (page < 1 || page > props.totalPages || page === props.currentPage) return;
  emit('change', page);
}

const navButtons = computed(() => [
  { icon: 'first' as NavIcon, disabled: props.currentPage <= 1, onClick: () => go(1) },
  { icon: 'prev' as NavIcon, disabled: props.currentPage <= 1, onClick: () => go(props.currentPage - 1) },
]);

const navButtonsEnd = computed(() => [
  { icon: 'next' as NavIcon, disabled: props.currentPage >= props.totalPages, onClick: () => go(props.currentPage + 1) },
  { icon: 'last' as NavIcon, disabled: props.currentPage >= props.totalPages, onClick: () => go(props.totalPages) },
]);
</script>

<template>
  <div :class="`flex items-center ${props.class}`">
    <div v-for="btn in navButtons" :key="btn.icon" class="flex items-center justify-center size-9 shrink-0">
      <button
        type="button"
        :disabled="btn.disabled"
        :class="[
          'group relative flex items-center justify-center size-5 rounded-full',
          'focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]',
          btn.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ]"
        @click="btn.onClick"
      >
        <span
          class="absolute rounded-full transition-colors duration-150 -inset-1"
          :class="[
            btn.disabled
              ? 'bg-interaction-neutral-normal'
              : 'bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed',
          ]"
        />
        <span :class="`relative ${btn.disabled ? 'text-element-disabled' : 'text-element-primary'}`">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path :d="NAV_ICON_PATH[btn.icon]" fill="currentColor" />
          </svg>
        </span>
      </button>
    </div>

    <template v-for="(entry, i) in entries" :key="entry === 'ellipsis' ? `e-${i}` : entry">
      <div
        v-if="entry === 'ellipsis'"
        class="flex items-center justify-center size-9 text-text-sm leading-text-sm font-regular text-element-quaternary select-none"
      >
        ...
      </div>
      <button
        v-else
        type="button"
        :class="[
          'relative flex items-center justify-center size-9 rounded-4',
          'text-text-sm leading-text-sm',
          'focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]',
          entry === currentPage
            ? 'font-semibold text-element-brand cursor-default'
            : 'font-regular text-element-quaternary cursor-pointer hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed',
        ]"
        @click="go(entry)"
      >
        {{ entry }}
        <span v-if="entry === currentPage" class="absolute bottom-0 h-[3px] bg-element-brand inset-x-3" />
      </button>
    </template>

    <div v-for="btn in navButtonsEnd" :key="btn.icon" class="flex items-center justify-center size-9 shrink-0">
      <button
        type="button"
        :disabled="btn.disabled"
        :class="[
          'group relative flex items-center justify-center size-5 rounded-full',
          'focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]',
          btn.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ]"
        @click="btn.onClick"
      >
        <span
          class="absolute rounded-full transition-colors duration-150 -inset-1"
          :class="[
            btn.disabled
              ? 'bg-interaction-neutral-normal'
              : 'bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed',
          ]"
        />
        <span :class="`relative ${btn.disabled ? 'text-element-disabled' : 'text-element-primary'}`">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path :d="NAV_ICON_PATH[btn.icon]" fill="currentColor" />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>
