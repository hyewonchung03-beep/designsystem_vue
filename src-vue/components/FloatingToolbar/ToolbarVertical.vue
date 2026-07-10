<script setup lang="ts">
import ToolbarZoom from './ToolbarZoom.vue';

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
  <div class="flex flex-col items-start gap-2">
    <slot />
    <ToolbarZoom
      :disabled-in="disabledIn"
      :disabled-out="disabledOut"
      @zoom-in="emit('zoomIn')"
      @zoom-out="emit('zoomOut')"
    />
  </div>
</template>
