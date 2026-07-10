<script lang="ts">
import type {
  OverlayHeaderModalAlign,
  OverlayHeaderModalSize,
  OverlayHeaderModalType,
} from './OverlayHeaderModal.vue';

export type OverlayModalWidth = 360 | 480 | 768 | 1024;
</script>

<script setup lang="ts">
import { computed } from 'vue';
import OverlayHeaderModal from './OverlayHeaderModal.vue';
import OverlayFooterModal from './OverlayFooterModal.vue';

const props = withDefaults(
  defineProps<{
    size?: OverlayHeaderModalSize;
    align?: OverlayHeaderModalAlign;
    type?: OverlayHeaderModalType;
    width?: OverlayModalWidth;
    cancelLabel?: string;
    actionLabel?: string;
    showCancelBtn?: boolean;
    showActionBtn?: boolean;
    showHeaderDivider?: boolean;
    showFooterDivider?: boolean;
    showLeadingIcon?: boolean;
    showExtraIcon?: boolean;
    showLeftAction?: boolean;
    showLinkBtn?: boolean;
    linkLabel?: string;
    showStep?: boolean;
    step?: string;
    class?: string;
  }>(),
  {
    size: 'md',
    align: 'left',
    type: 'web',
    width: 480,
    cancelLabel: 'Cancel',
    actionLabel: 'Action',
    showCancelBtn: true,
    showActionBtn: true,
    showHeaderDivider: false,
    showFooterDivider: false,
    showLeadingIcon: false,
    showExtraIcon: false,
    showLeftAction: false,
    showLinkBtn: false,
    linkLabel: 'label',
    showStep: false,
    step: '1/5',
    class: '',
  },
);

defineEmits<{ close: []; cancel: []; action: []; linkClick: [] }>();

const isMobile = computed(() => props.type === 'mobile');

// NOTE: height/paddingTop/paddingBottom/paddingLeft numbers below mirror the
// React source's inline slotStyle (padding values already use --sol-* tokens;
// `height` has no matching token — ported verbatim, pending a token decision).
const slotStyle = computed(() => ({
  height: isMobile.value ? '80px' : '28px',
  paddingTop: 0,
  paddingRight: 'var(--sol-spacing-24)',
  paddingBottom: 'var(--sol-spacing-8)',
  paddingLeft: 'var(--sol-spacing-24)',
}));

// NOTE: width/maxHeight below have no matching --sol-* token (component-level
// size variants defined directly in the React source) — ported verbatim.
// (Unlike React, Vue's :style binding does not auto-append "px" to numbers,
// so these are bound as px strings to avoid producing invalid CSS.)
const rootStyle = computed(() => ({
  width: `${props.width}px`,
  maxHeight: '660px',
  boxShadow: 'var(--sol-shadow-light)',
}));
</script>

<template>
  <div
    :class="[
      'flex flex-col bg-surface-container-highest text-element-primary border border-border-normal rounded-4 overflow-hidden text-left',
      props.class,
    ]"
    :style="rootStyle"
  >
    <OverlayHeaderModal
      :size="size"
      :align="align"
      :type="type"
      :show-divider="showHeaderDivider"
      :show-leading-icon="showLeadingIcon"
      :show-extra-icon="showExtraIcon"
      @close="$emit('close')"
    >
      <template #title><slot name="title" /></template>
      <template v-if="$slots.leadingIcon" #leadingIcon><slot name="leadingIcon" /></template>
      <template v-if="$slots.extraIcon" #extraIcon><slot name="extraIcon" /></template>
    </OverlayHeaderModal>

    <div v-if="$slots.default" class="flex w-full shrink-0 overflow-y-auto" :style="slotStyle">
      <slot />
    </div>

    <OverlayFooterModal
      :size="size"
      :align="align === 'left' ? 'right' : 'center'"
      :type="type"
      :cancel-label="cancelLabel"
      :action-label="actionLabel"
      :show-cancel-btn="showCancelBtn"
      :show-action-btn="showActionBtn"
      :show-divider="showFooterDivider"
      :show-left-action="showLeftAction"
      :show-link-btn="showLinkBtn"
      :link-label="linkLabel"
      :show-step="showStep"
      :step="step"
      @cancel="$emit('cancel')"
      @action="$emit('action')"
      @link-click="$emit('linkClick')"
    />
  </div>
</template>
