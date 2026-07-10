<!--
  PaginationSearch — 페이지 번호로 바로 이동하는 입력 필드

  React: src/components/Pagination/Pagination.tsx (PaginationSearch)
-->
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  totalPages: number;
}>();

const emit = defineEmits<{
  jump: [page: number];
}>();

const inputRef = ref<HTMLInputElement | null>(null);

function handleKeyDown(e: KeyboardEvent) {
  if (e.key !== 'Enter') return;
  const val = Number(inputRef.value?.value);
  if (!Number.isInteger(val) || val < 1 || val > props.totalPages) return;
  emit('jump', val);
  if (inputRef.value) inputRef.value.value = '';
}
</script>

<template>
  <div class="flex items-center gap-sol-8 shrink-0">
    <input
      ref="inputRef"
      type="text"
      inputmode="numeric"
      aria-label="Go to page"
      class="w-[34px] h-[30px] rounded-4 border border-border-normal
        bg-surface-container text-text-xs leading-text-xs font-regular text-element-primary
        text-center px-sol-4
        focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]
        hover:bg-interaction-neutral-hover"
      @keydown="handleKeyDown"
    />
    <span class="text-text-sm leading-text-sm font-regular text-element-quaternary whitespace-nowrap shrink-0">
      of {{ totalPages }} page
    </span>
  </div>
</template>
