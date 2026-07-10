<script lang="ts">
export type TextHelperType = 'enabled' | 'error';
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    helperText: string;
    type?: TextHelperType;
    id?: string;
  }>(),
  {
    type: 'enabled',
  },
);

const rootClass = computed(() => [
  'mt-2 text-left text-text-xs leading-text-xs font-regular',
  props.type === 'error' ? 'text-error-dim' : 'text-element-tertiary',
]);
</script>

<template>
  <p :id="id" :class="rootClass">{{ helperText }}</p>
</template>
