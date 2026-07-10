<script setup lang="ts">
import IcPlus from '../Icon/IcPlus.vue';
import IcMinus from '../Icon/IcMinus.vue';
import ToolbarZoomItem from './ToolbarZoomItem.vue';

withDefaults(
  defineProps<{
    disabledIn?: boolean;
    disabledOut?: boolean;
  }>(),
  {
    disabledIn: false,
    disabledOut: false,
  },
);

const emit = defineEmits<{
  zoomIn: [];
  zoomOut: [];
}>();
</script>

<template>
  <div class="flex w-9 flex-col overflow-hidden rounded-2 ring-1 ring-border-solid bg-surface-container-high shadow-normal">
    <ToolbarZoomItem
      type="icon"
      :state="disabledIn ? 'disabled' : 'enabled'"
      @click="emit('zoomIn')"
    >
      <template #icon>
        <IcPlus :size="20" />
      </template>
    </ToolbarZoomItem>
    <ToolbarZoomItem
      type="icon"
      :state="disabledOut ? 'disabled' : 'enabled'"
      @click="emit('zoomOut')"
    >
      <template #icon>
        <IcMinus :size="20" />
      </template>
    </ToolbarZoomItem>
  </div>
</template>
