<script lang="ts">
import type { OverlayHeaderModalSize } from '../Modal/OverlayHeaderModal.vue';

export type SidesheetSize = 'sm' | 'md';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import OverlayHeaderModal from '../Modal/OverlayHeaderModal.vue';
import OverlayFooterModal from '../Modal/OverlayFooterModal.vue';

const SIZE_WIDTH: Record<SidesheetSize, number> = {
  sm: 360,
  md: 480,
};

const SIZE_HEADER: Record<SidesheetSize, OverlayHeaderModalSize> = {
  sm: 'sm',
  md: 'md',
};

const props = withDefaults(
  defineProps<{
    size?: SidesheetSize;
    showFooter?: boolean;
    cancelLabel?: string;
    actionLabel?: string;
    showCancelBtn?: boolean;
    showActionBtn?: boolean;
    showHeaderDivider?: boolean;
    showFooterDivider?: boolean;
    showLeadingIcon?: boolean;
    showExtraIcon?: boolean;
    class?: string;
  }>(),
  {
    size: 'sm',
    showFooter: false,
    cancelLabel: 'Cancel',
    actionLabel: 'Action',
    showCancelBtn: true,
    showActionBtn: true,
    showHeaderDivider: false,
    showFooterDivider: false,
    showLeadingIcon: false,
    showExtraIcon: false,
    class: '',
  },
);

defineEmits<{ close: []; cancel: []; action: [] }>();

const headerSize = computed(() => SIZE_HEADER[props.size]);

// NOTE: width below has no matching --sol-* token (component-level size
// variant defined directly in the React source) — ported verbatim.
const rootStyle = computed(() => ({
  width: SIZE_WIDTH[props.size],
  boxShadow: 'var(--sol-shadow-light)',
}));
</script>

<template>
  <div
    :class="[
      'flex flex-col h-full bg-surface-container-highest text-element-primary overflow-hidden text-left',
      props.class,
    ]"
    :style="rootStyle"
  >
    <!-- overlay_header_modal -->
    <OverlayHeaderModal
      :size="headerSize"
      align="left"
      type="web"
      :show-divider="showHeaderDivider"
      :show-leading-icon="showLeadingIcon"
      :show-extra-icon="showExtraIcon"
      @close="$emit('close')"
    >
      <template #title><slot name="title" /></template>
      <template v-if="$slots.leadingIcon" #leadingIcon><slot name="leadingIcon" /></template>
      <template v-if="$slots.extraIcon" #extraIcon><slot name="extraIcon" /></template>
    </OverlayHeaderModal>

    <!-- slot -->
    <div
      class="flex flex-1 flex-col overflow-y-auto w-full text-left"
      style="padding: var(--sol-spacing-16) var(--sol-spacing-24)"
    >
      <slot />
    </div>

    <!-- overlay_footer_modal -->
    <OverlayFooterModal
      v-if="showFooter"
      :size="headerSize"
      align="right"
      type="web"
      :cancel-label="cancelLabel"
      :action-label="actionLabel"
      :show-cancel-btn="showCancelBtn"
      :show-action-btn="showActionBtn"
      :show-divider="showFooterDivider"
      @cancel="$emit('cancel')"
      @action="$emit('action')"
    />
  </div>
</template>
