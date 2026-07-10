<script lang="ts">
export type ToolbarZoomItemType = 'icon' | 'value';
export type ToolbarZoomItemState = 'enabled' | 'disabled';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import IcPlus from '../Icon/IcPlus.vue';

const props = withDefaults(
  defineProps<{
    type?: ToolbarZoomItemType;
    state?: ToolbarZoomItemState;
    value?: string;
  }>(),
  {
    type: 'icon',
    state: 'enabled',
    value: '100%',
  },
);

defineEmits<{ click: [] }>();

const isDisabled = computed(() => props.state === 'disabled');
const isIcon = computed(() => props.type === 'icon');
const contentColorCls = computed(() => (isDisabled.value ? 'text-element-disabled' : 'text-element-secondary'));
const containerCls = computed(() => (isDisabled.value ? 'cursor-not-allowed' : ''));
</script>

<template>
  <button
    type="button"
    :disabled="isDisabled"
    :class="`group relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-2 focus-visible:outline-none ${containerCls}`"
    @click="!isDisabled && $emit('click')"
  >
    <span v-if="!isDisabled" class="absolute inset-0.5 rounded-2 group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />

    <span v-if="isIcon" :class="`relative z-10 flex size-5 shrink-0 items-center justify-center ${contentColorCls}`">
      <slot name="icon">
        <IcPlus :size="20" />
      </slot>
    </span>
    <template v-else>
      <span :class="`relative z-10 text-text-xxs leading-text-xxs font-regular text-center ${contentColorCls}`">
        {{ value }}
      </span>
      <span class="absolute bottom-0 left-1 right-1 h-px rounded-2 bg-border-solid" />
    </template>
  </button>
</template>
