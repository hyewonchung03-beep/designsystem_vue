<!--
  DataToolbar ColumnSelect — 컬럼 표시/숨김 다중 토글 드롭다운 (DataToolbar 내부 전용, non-exported)

  React: src/components/DataToolbar/DataToolbar.tsx (ColumnSelect)
  React 원본은 useState(isOpen) + mousedown 클릭아웃사이드 + 수작업 toggleColumn을
  구현했다. MultiSelect.vue와 동일한 패턴으로 Headless UI Listbox의 `multiple` prop
  + 배열 v-model로 대체한다: 옵션 클릭 시 Headless UI가 배열에 값을 add/remove해서
  @update:model-value로 전달해주므로 원본의 수작업 toggleColumn(추가/제거 filter)
  로직이 그대로 필요 없어진다. open 상태/클릭아웃사이드/키보드 내비게이션/
  aria-multiselectable도 전부 Headless UI가 제공한다.

  PerPageSelect.vue와 마찬가지로 순수 controlled 프레젠테이션 조각이라 modelValue/
  defaultValue 이원화는 필요 없다.
-->
<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import BadgeCounter from '../Badge/BadgeCounter.vue';

defineProps<{
  columns: string[];
  visibleColumns: string[];
}>();

const emit = defineEmits<{ change: [columns: string[]] }>();
</script>

<template>
  <Listbox
    as="div"
    multiple
    class="relative text-left"
    :model-value="visibleColumns"
    @update:model-value="(cols: string[]) => emit('change', cols)"
  >
    <ListboxButton
      class="flex items-center gap-1 rounded-4 text-text-md leading-text-md font-regular text-element-primary
        hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
        focus-visible:outline-none focus-visible:shadow-focus-button-ring"
    >
      <span class="flex size-5 shrink-0 items-center justify-center text-element-primary">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M19.5 18.5V20H4.5V18.5H19.5ZM19.5 5.5H4.5V20L4.34668 19.9922C3.59028 19.9154 3 19.2767 3 18.5V5.5C3 4.67157 3.67157 4 4.5 4H19.5C20.3284 4 21 4.67157 21 5.5V18.5C21 19.2767 20.4097 19.9154 19.6533 19.9922L19.5 20V5.5Z"
            fill="currentColor"
          />
          <path d="M10 18.9248H8.5L8.5 5.27148L10 5.27148L10 18.9248Z" fill="currentColor" />
          <path d="M15.5 18.9248H14L14 5.27148L15.5 5.27148L15.5 18.9248Z" fill="currentColor" />
        </svg>
      </span>
      <span class="truncate">Column</span>
      <BadgeCounter :count="visibleColumns.length" />
      <span class="flex size-4 shrink-0 items-center justify-center text-element-primary">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </ListboxButton>

    <ListboxOptions
      class="absolute left-0 top-full z-50 mt-1 min-w-40 rounded-4 bg-surface-container-high p-1 shadow-normal"
    >
      <ListboxOption
        v-for="col in columns"
        :key="col"
        :value="col"
        as="template"
        v-slot="{ selected }"
      >
        <button
          type="button"
          :class="[
            'flex h-[30px] w-full items-center gap-1.5 rounded-2 px-2 text-left text-text-sm leading-text-sm font-regular text-element-primary focus:outline-none',
            selected ? 'bg-selected-container' : 'hover:bg-interaction-neutral-hover',
          ]"
        >
          <span class="flex size-3.5 shrink-0 items-center justify-center">
            <svg v-if="selected" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="0.5" y="0.5" width="13" height="13" rx="2.5" fill="currentColor" class="text-element-brand" />
              <path
                d="M12.299 4.131L5.824 10.606C5.568 10.861 5.148 10.859 4.902 10.606L1.701 7.409L2.629 6.477L5.36 9.215L11.371 3.203Z"
                class="fill-static-white"
              />
            </svg>
            <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.25" class="text-border-solid" />
            </svg>
          </span>
          {{ col }}
        </button>
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>
