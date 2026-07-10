<!--
  Dropdown — 순수 프레젠테이셔널 패널 컨테이너

  React: src/components/Dropdown/Dropdown.tsx
  open/close 상태를 갖지 않는다. 상위(Select, SelectTrigger 등)가 v-if 또는
  Headless UI ListboxOptions 등으로 표시 여부를 제어하고, 이 컴포넌트는
  패널의 시각적 껍데기(배경/라운드/그림자/스크롤 영역)만 담당한다.
-->
<script setup lang="ts">
import { computed, useId } from 'vue';

const props = withDefaults(
  defineProps<{
    compact?: boolean;
    class?: string;
  }>(),
  {
    compact: true,
    class: '',
  },
);

const listId = useId();

const maxHeightClass = computed(() => (props.compact ? 'max-h-60' : 'max-h-80'));
</script>

<template>
  <div
    role="listbox"
    :id="listId"
    :class="`min-w-40 overflow-hidden rounded-4 bg-surface-container-high p-1 shadow-normal ${props.class}`"
  >
    <div :class="`overflow-y-auto ${maxHeightClass}`">
      <slot />
    </div>
  </div>
</template>
