<!--
  DataToolbar PerPageSelect — 페이지당 표시 개수 선택 드롭다운 (DataToolbar 내부 전용, non-exported)

  React: src/components/DataToolbar/DataToolbar.tsx (PerPageSelect)
  React 원본은 useState(isOpen) + mousedown 클릭아웃사이드를 수작업으로 구현했다.
  Batch 2에서 Select.vue/MultiSelect.vue에 적용한 것과 동일한 패턴으로, Headless UI
  Vue의 Listbox/ListboxButton/ListboxOptions/ListboxOption으로 대체해 open 상태,
  클릭아웃사이드, 키보드 내비게이션, ARIA(aria-haspopup/aria-expanded/role=listbox 등)를
  전부 무료로 얻는다. 트리거/옵션의 Tailwind 클래스는 원본 그대로 유지해 픽셀을
  동일하게 유지했다.

  이 컴포넌트는 항상 부모(DataToolbar)로부터 제어되는 순수 controlled 프레젠테이션
  조각이라 Select.vue식 modelValue/defaultValue 이원화는 필요 없다 (React 원본도
  PerPageSelect 자체는 value/onChange만 받는 순수 controlled 컴포넌트였다).
-->
<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';

defineProps<{
  value: number;
  options: number[];
}>();

const emit = defineEmits<{ change: [value: number] }>();
</script>

<template>
  <Listbox
    as="div"
    class="relative text-left"
    :model-value="value"
    @update:model-value="(v: number) => emit('change', v)"
  >
    <ListboxButton
      class="flex items-center gap-1 rounded-4 text-text-md leading-text-md font-regular text-element-primary
        hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
        focus-visible:outline-none focus-visible:shadow-focus-button-ring"
    >
      <span class="truncate">{{ value }} per page</span>
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
      class="absolute left-0 top-full z-50 mt-1 min-w-28 rounded-4 bg-surface-container-high p-1 shadow-normal"
    >
      <ListboxOption
        v-for="opt in options"
        :key="opt"
        :value="opt"
        as="template"
        v-slot="{ selected }"
      >
        <button
          type="button"
          :class="[
            'flex h-[30px] w-full items-center rounded-2 px-2 text-left text-text-sm leading-text-sm font-regular text-element-primary focus:outline-none',
            selected ? 'bg-selected-container font-semibold' : 'hover:bg-interaction-neutral-hover',
          ]"
        >
          {{ opt }} per page
        </button>
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>
