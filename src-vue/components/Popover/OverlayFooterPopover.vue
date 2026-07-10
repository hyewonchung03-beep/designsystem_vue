<script setup lang="ts">
import Divider from '../Divider/Divider.vue';

const props = withDefaults(
  defineProps<{
    cancelLabel?: string;
    selectLabel?: string;
    showRefresh?: boolean;
    clearAllLabel?: string;
    class?: string;
  }>(),
  {
    cancelLabel: 'Cancel',
    selectLabel: 'Select',
    showRefresh: false,
    clearAllLabel: 'Clear all',
    class: '',
  },
);

defineEmits<{ cancel: []; select: []; clearAll: [] }>();

const textStyle = {
  fontSize: 'var(--sol-font-size-text-sm)',
  lineHeight: 'var(--sol-line-height-text-sm)',
};
</script>

<template>
  <div :class="['flex flex-col w-full text-left', props.class]">
    <Divider type="horizontal" color="G100" solid class="shrink-0" />
    <div
      :class="['flex items-center w-full', showRefresh ? 'justify-between' : 'justify-end']"
      style="
        padding-top: var(--sol-spacing-16);
        padding-bottom: var(--sol-spacing-16);
        padding-left: var(--sol-spacing-20);
        padding-right: var(--sol-spacing-20);
      "
    >
      <button
        v-if="showRefresh"
        type="button"
        class="font-semibold text-element-quaternary whitespace-nowrap shrink-0"
        :style="textStyle"
        @click="$emit('clearAll')"
      >
        {{ clearAllLabel }}
      </button>

      <div class="flex items-center shrink-0" style="gap: var(--sol-spacing-20)">
        <button
          type="button"
          class="font-semibold text-element-quaternary whitespace-nowrap"
          :style="textStyle"
          @click="$emit('cancel')"
        >
          {{ cancelLabel }}
        </button>
        <button
          type="button"
          class="font-semibold text-element-brand whitespace-nowrap"
          :style="textStyle"
          @click="$emit('select')"
        >
          {{ selectLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
