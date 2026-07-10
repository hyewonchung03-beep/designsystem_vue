<!--
  DropdownGroupLabel — Dropdown 패널 내부 섹션 구분용 라벨

  React: src/components/Dropdown/Dropdown.tsx (DropdownGroupLabel)
-->
<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    label: string;
    compact?: boolean;
  }>(),
  { compact: true },
);

const heightClass = computed(() => (props.compact ? 'min-h-[30px]' : 'min-h-8'));
</script>

<template>
  <div role="presentation" :class="`flex items-center px-3 py-2 ${heightClass}`">
    <span class="truncate text-text-xs font-semibold leading-text-xs text-element-tertiary">
      {{ label }}
    </span>
  </div>
</template>
