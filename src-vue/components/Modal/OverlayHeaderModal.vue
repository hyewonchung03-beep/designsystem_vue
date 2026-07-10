<script lang="ts">
export type OverlayHeaderModalSize = 'sm' | 'md';
export type OverlayHeaderModalAlign = 'left' | 'center';
export type OverlayHeaderModalType = 'web' | 'mobile';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import IcBlank from '../Icon/IcBlank.vue';
import IcTrigger from '../Icon/IcTrigger.vue';

const props = withDefaults(
  defineProps<{
    size?: OverlayHeaderModalSize;
    align?: OverlayHeaderModalAlign;
    type?: OverlayHeaderModalType;
    showDivider?: boolean;
    showLeadingIcon?: boolean;
    showExtraIcon?: boolean;
    class?: string;
  }>(),
  {
    size: 'md',
    align: 'left',
    type: 'web',
    showDivider: false,
    showLeadingIcon: false,
    showExtraIcon: false,
    class: '',
  },
);

defineEmits<{ close: [] }>();

const isMd = computed(() => props.size === 'md');
const isCenter = computed(() => props.align === 'center');
const isMobile = computed(() => props.type === 'mobile');
const iconSize = computed(() => (isMd.value ? 20 : 16));

const titleStyle = computed(() => ({
  fontSize: isMd.value ? 'var(--sol-font-size-text-lg)' : 'var(--sol-font-size-text-md)',
  lineHeight: isMd.value ? 'var(--sol-line-height-text-lg)' : 'var(--sol-line-height-text-md)',
}));

const paddingStyle = computed(() => {
  if (isMobile.value) {
    return {
      paddingTop: 'var(--sol-spacing-16)',
      paddingBottom: 'var(--sol-spacing-16)',
      paddingLeft: 'var(--sol-spacing-24)',
      paddingRight: 'var(--sol-spacing-24)',
    };
  }
  if (isCenter.value) {
    return {
      paddingTop: 'var(--sol-spacing-24)',
      paddingBottom: 'var(--sol-spacing-16)',
      paddingLeft: 'var(--sol-spacing-24)',
      paddingRight: 'var(--sol-spacing-24)',
    };
  }
  return {
    paddingTop: 'var(--sol-spacing-24)',
    paddingBottom: 'var(--sol-spacing-12)',
    paddingLeft: 'var(--sol-spacing-24)',
    paddingRight: 'var(--sol-spacing-24)',
  };
});

const rootClass = computed(() => [
  'relative flex flex-col w-full shrink-0',
  isMobile.value
    ? 'bg-surface-container-highest items-center'
    : isCenter.value
      ? 'items-center'
      : 'items-start justify-center',
  props.class,
]);
</script>

<template>
  <div :class="rootClass" :style="paddingStyle">
    <template v-if="isCenter">
      <div v-if="!isMobile" class="flex items-start justify-end w-full">
        <IcTrigger :size="iconSize" aria-label="닫기" @click="$emit('close')">
          <span class="inline-flex text-element-quaternary">
            <svg
              :width="iconSize"
              :height="iconSize"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M18.9707 5.91064L12.8809 11.9995L18.9707 18.0894L17.9102 19.1499L11.8203 13.0601L5.73145 19.1499L4.6709 18.0894L10.7598 11.9995L4.6709 5.91064L5.73145 4.8501L11.8203 10.939L17.9102 4.8501L18.9707 5.91064Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </IcTrigger>
      </div>
      <p class="font-semibold text-element-primary text-center w-full" :style="titleStyle">
        <slot name="title" />
      </p>
    </template>

    <div v-else class="flex items-center w-full text-left" style="gap: var(--sol-spacing-8)">
      <span v-if="showLeadingIcon" class="text-element-primary shrink-0">
        <slot name="leadingIcon"><IcBlank :size="iconSize" /></slot>
      </span>
      <p class="flex-1 font-semibold text-element-primary min-w-0 break-words text-left" :style="titleStyle">
        <slot name="title" />
      </p>
      <div
        class="flex items-center shrink-0"
        :style="{ gap: isMd ? 'var(--sol-spacing-20)' : 'var(--sol-spacing-12)' }"
      >
        <span v-if="showExtraIcon" class="text-element-secondary shrink-0">
          <slot name="extraIcon"><IcBlank :size="iconSize" /></slot>
        </span>
        <IcTrigger :size="iconSize" aria-label="닫기" @click="$emit('close')">
          <span class="inline-flex text-element-quaternary">
            <svg
              :width="iconSize"
              :height="iconSize"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M18.9707 5.91064L12.8809 11.9995L18.9707 18.0894L17.9102 19.1499L11.8203 13.0601L5.73145 19.1499L4.6709 18.0894L10.7598 11.9995L4.6709 5.91064L5.73145 4.8501L11.8203 10.939L17.9102 4.8501L18.9707 5.91064Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </IcTrigger>
      </div>
    </div>

    <div v-if="showDivider" class="absolute left-0 right-0 bottom-0 h-px bg-border-solid-variant" />
  </div>
</template>
