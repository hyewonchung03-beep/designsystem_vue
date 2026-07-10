<script lang="ts">
export type OverlayFooterModalSize = 'sm' | 'md';
export type OverlayFooterModalAlign = 'right' | 'center';
export type OverlayFooterModalType = 'web' | 'mobile';
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    size?: OverlayFooterModalSize;
    align?: OverlayFooterModalAlign;
    type?: OverlayFooterModalType;
    cancelLabel?: string;
    actionLabel?: string;
    showCancelBtn?: boolean;
    showActionBtn?: boolean;
    showDivider?: boolean;
    showLeftAction?: boolean;
    showLinkBtn?: boolean;
    linkLabel?: string;
    showStep?: boolean;
    step?: string;
    class?: string;
  }>(),
  {
    size: 'md',
    align: 'right',
    type: 'web',
    cancelLabel: 'Cancel',
    actionLabel: 'Action',
    showCancelBtn: true,
    showActionBtn: true,
    showDivider: false,
    showLeftAction: false,
    showLinkBtn: false,
    linkLabel: 'label',
    showStep: false,
    step: '1/5',
    class: '',
  },
);

defineEmits<{ cancel: []; action: []; linkClick: [] }>();

const isMd = computed(() => props.size === 'md');
const isMobile = computed(() => props.type === 'mobile');
const isCenter = computed(() => props.align === 'center');

const btnTextStyle = computed(() => ({
  fontSize: isMd.value ? 'var(--sol-font-size-text-sm)' : 'var(--sol-font-size-text-xs)',
  lineHeight: isMd.value ? 'var(--sol-line-height-text-sm)' : 'var(--sol-line-height-text-xs-2line)',
}));

const btnPaddingStyle = {
  paddingTop: 'var(--sol-spacing-8)',
  paddingBottom: 'var(--sol-spacing-8)',
  paddingLeft: 'var(--sol-spacing-12)',
  paddingRight: 'var(--sol-spacing-12)',
};

const containerPaddingStyle = computed(() =>
  isMd.value
    ? { padding: 'var(--sol-spacing-24)' }
    : {
        paddingTop: 'var(--sol-spacing-20)',
        paddingBottom: 'var(--sol-spacing-20)',
        paddingLeft: 'var(--sol-spacing-24)',
        paddingRight: 'var(--sol-spacing-24)',
      },
);
</script>

<template>
  <!-- Mobile: full-width docked Action button -->
  <div
    v-if="isMobile"
    :class="['relative flex flex-col w-full shrink-0 text-left', props.class]"
    style="padding-top: var(--sol-spacing-16); padding-bottom: var(--sol-spacing-16)"
  >
    <div
      class="flex flex-col w-full"
      style="padding-left: var(--sol-spacing-16); padding-right: var(--sol-spacing-16)"
    >
      <button
        v-if="showActionBtn"
        type="button"
        class="flex items-center justify-center w-full bg-primary text-element-inverse font-semibold rounded-4"
        :style="{
          ...btnTextStyle,
          paddingTop: 'var(--sol-spacing-10)',
          paddingBottom: 'var(--sol-spacing-10)',
          paddingLeft: 'var(--sol-spacing-16)',
          paddingRight: 'var(--sol-spacing-16)',
        }"
        @click="$emit('action')"
      >
        {{ actionLabel }}
      </button>
    </div>
    <div v-if="showDivider" class="absolute top-0 left-0 right-0 h-px bg-border-solid-variant" />
  </div>

  <div
    v-else
    :class="[
      'relative flex items-center w-full shrink-0 text-left',
      isCenter ? 'justify-center' : 'justify-end',
      props.class,
    ]"
    :style="{ ...containerPaddingStyle, gap: 'var(--sol-spacing-8)' }"
  >
    <!-- Left area: link button + step indicator -->
    <div
      v-if="!isCenter && showLeftAction"
      class="flex flex-1 items-center min-w-0"
      :style="{ gap: isMd ? 'var(--sol-spacing-8)' : 'var(--sol-spacing-6)' }"
    >
      <button
        v-if="showLinkBtn"
        type="button"
        class="font-semibold text-primary underline shrink-0"
        :style="btnTextStyle"
        @click="$emit('linkClick')"
      >
        {{ linkLabel }}
      </button>
      <span
        v-if="showStep"
        class="font-regular text-element-quaternary whitespace-nowrap shrink-0"
        :style="btnTextStyle"
      >
        {{ step }}
      </span>
    </div>

    <button
      v-if="showCancelBtn"
      type="button"
      class="flex items-center justify-center border border-border-normal rounded-4 font-semibold text-element-brand whitespace-nowrap shrink-0"
      :style="{
        ...btnPaddingStyle,
        ...btnTextStyle,
        backgroundColor: 'var(--sol-surface-container-highest)',
        gap: 'var(--sol-spacing-6)',
      }"
      @click="$emit('cancel')"
    >
      {{ cancelLabel }}
    </button>

    <button
      v-if="showActionBtn"
      type="button"
      class="flex items-center justify-center bg-primary rounded-4 font-semibold text-element-inverse whitespace-nowrap shrink-0"
      :style="{
        ...btnPaddingStyle,
        ...btnTextStyle,
        gap: 'var(--sol-spacing-6)',
      }"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </button>

    <div v-if="showDivider" class="absolute top-0 left-0 right-0 h-px bg-border-solid-variant" />
  </div>
</template>
