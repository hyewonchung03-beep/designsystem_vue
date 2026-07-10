<!--
  Pagination — 페이지네이션 컴포지트 (items-per-page selector + nav + jump search)

  React: src/components/Pagination/Pagination.tsx (Pagination)
  페이지 크기 선택자는 방금 포팅한 SelectTrigger.vue를 그대로 재사용한다.
-->
<script lang="ts">
const DEFAULT_PER_PAGE_OPTIONS = [10, 20, 50, 100];
</script>

<script setup lang="ts">
import { computed } from 'vue';
import PaginationNav from './PaginationNav.vue';
import PaginationSearch from './PaginationSearch.vue';
import SelectTrigger from '../SelectTrigger/SelectTrigger.vue';

const props = withDefaults(
  defineProps<{
    currentPage: number;
    totalPages: number;
    showItemsPerPage?: boolean;
    itemsPerPage?: number;
    itemsPerPageOptions?: number[];
    showSearch?: boolean;
    class?: string;
  }>(),
  {
    showItemsPerPage: false,
    itemsPerPage: 10,
    itemsPerPageOptions: () => DEFAULT_PER_PAGE_OPTIONS,
    showSearch: true,
    class: '',
  },
);

const emit = defineEmits<{
  change: [page: number];
  itemsPerPageChange: [n: number];
}>();

function handleChange(page: number) {
  emit('change', page);
}

const perPageSelectOptions = computed(() =>
  props.itemsPerPageOptions.map((n) => ({ value: String(n), label: String(n) })),
);
</script>

<template>
  <div :class="`flex items-center gap-sol-12 ${props.class}`">
    <div v-if="showItemsPerPage" class="flex items-center gap-sol-8 shrink-0">
      <SelectTrigger
        class="w-[61px]"
        :options="perPageSelectOptions"
        :model-value="String(itemsPerPage)"
        size="sm"
        @update:model-value="(v) => emit('itemsPerPageChange', Number(v))"
      />
      <span class="text-text-sm leading-text-sm font-regular text-element-quaternary whitespace-nowrap shrink-0">
        Items per page
      </span>
    </div>

    <PaginationNav :current-page="currentPage" :total-pages="totalPages" @change="handleChange" />

    <PaginationSearch v-if="showSearch" :total-pages="totalPages" @jump="handleChange" />
  </div>
</template>
