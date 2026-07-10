<!--
  DataTable Pagination — DataTable 전용 내부 페이지네이션 (non-exported, private)

  React: src/components/DataTable/DataTable.tsx (Pagination, 파일 내부 전용 함수)
  주의: 최상위 src-vue/components/Pagination/Pagination.vue(+PaginationNav/
  PaginationSearch)와는 완전히 다른 별개 구현이다 — 클래스, 아이콘, 페이지 범위
  알고리즘(ellipsis 없는 단순 5개 슬라이딩 윈도우)이 전혀 다르므로 재사용하지
  않고 React 원본을 그대로 포팅했다. DatatableTree.tsx에도 거의 동일한 내부
  Pagination이 있지만 React 원본에서도 서로 다른 파일에 각자 독립적으로 중복
  구현되어 있어(공유 컴포넌트로 추출되어 있지 않음), 이식 시에도 동일하게
  DatatableTree 쪽에 별도 파일(DatatableTree/DatatableTreePagination.vue)로
  중복 포팅했다 — 원본 구조를 그대로 유지하기 위함이다.

  inputValue는 React 원본과 동일하게 mount 시 1회만 currentPage로 시드되고,
  이후 currentPage가 버튼 클릭 등으로 바뀌어도 자동 동기화되지 않는다(사용자가
  직접 입력한 값만 반영). 버그처럼 보일 수 있으나 원본 동작을 그대로 유지했다.
-->
<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{ change: [page: number] }>();

const inputValue = ref(String(props.currentPage));

function getVisiblePages(current: number, total: number): number[] {
  const maxVisible = 5;
  if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);

  let start = current - Math.floor(maxVisible / 2);
  let end = start + maxVisible - 1;

  if (start < 1) { start = 1; end = maxVisible; }
  if (end > total) { end = total; start = total - maxVisible + 1; }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const pages = computed(() => getVisiblePages(props.currentPage, props.totalPages));

function handleInputSubmit(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    const page = parseInt(inputValue.value, 10);
    if (page >= 1 && page <= props.totalPages) emit('change', page);
  }
}
</script>

<template>
  <nav aria-label="Pagination" class="flex items-center justify-center gap-3 text-left">
    <div class="flex items-start">
      <button
        type="button"
        aria-label="First page"
        :disabled="currentPage === 1"
        class="flex size-9 items-center justify-center rounded-circle text-element-primary disabled:text-element-disabled
          hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
          focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        @click="emit('change', 1)"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M11 15L6 10L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M15 15L10 10L15 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Previous page"
        :disabled="currentPage === 1"
        class="flex size-9 items-center justify-center rounded-circle text-element-primary disabled:text-element-disabled
          hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
          focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        @click="emit('change', currentPage - 1)"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="flex items-center">
        <button
          v-for="p in pages"
          :key="p"
          type="button"
          :aria-current="p === currentPage ? 'page' : undefined"
          :class="[
            'relative flex size-9 flex-col items-center justify-center text-text-sm leading-text-sm',
            'hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed',
            'focus-visible:outline-none focus-visible:shadow-focus-button-ring',
            p === currentPage ? 'font-semibold text-element-brand' : 'font-regular text-element-quaternary',
          ]"
          @click="emit('change', p)"
        >
          {{ p }}
          <span v-if="p === currentPage" class="absolute bottom-0 left-3 right-3 h-[3px] rounded-1 bg-element-brand" />
        </button>
      </div>

      <button
        type="button"
        aria-label="Next page"
        :disabled="currentPage === totalPages"
        class="flex size-9 items-center justify-center rounded-circle text-element-primary disabled:text-element-disabled
          hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
          focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        @click="emit('change', currentPage + 1)"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Last page"
        :disabled="currentPage === totalPages"
        class="flex size-9 items-center justify-center rounded-circle text-element-primary disabled:text-element-disabled
          hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
          focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        @click="emit('change', totalPages)"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M5 15L10 10L5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M9 15L14 10L9 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <div class="flex items-center gap-2">
      <input
        v-model="inputValue"
        type="text"
        aria-label="Go to page"
        class="h-[30px] w-[34px] rounded-4 border border-border-normal bg-surface-container px-2.5 py-2 text-center text-text-xs leading-text-xs font-regular text-element-quaternary outline-none
          focus:shadow-[0_0_0_2px_var(--color-primary)]"
        @keydown="handleInputSubmit"
      />
      <span class="text-text-sm leading-text-sm font-regular text-element-quaternary">
        of {{ totalPages }} page
      </span>
    </div>
  </nav>
</template>
