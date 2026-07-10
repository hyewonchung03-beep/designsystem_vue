<script lang="ts">
export type PopoverSize = 'md' | 'lg';
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import Divider from '../Divider/Divider.vue';
import OverlayHeaderPopover from './OverlayHeaderPopover.vue';

const SIZE_CONFIG = {
  md: {
    width: 200,
    maxHeight: 295,
    contentHeight: 81,
    contentPadding: 'var(--sol-spacing-12)',
    headerSize: 'md' as const,
  },
  lg: {
    width: 300,
    maxHeight: 405,
    contentHeight: 93,
    contentPadding: 'var(--sol-spacing-16)',
    headerSize: 'lg' as const,
  },
};

const pointerPositionByPlacement: Record<PopoverPlacement, Record<string, string>> = {
  bottom: {
    top: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  top: {
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%) rotate(180deg)',
  },
  left: {
    top: '50%',
    right: '-8px',
    transform: 'translateY(-50%) rotate(90deg)',
  },
  right: {
    top: '50%',
    left: '-8px',
    transform: 'translateY(-50%) rotate(-90deg)',
  },
};

const props = withDefaults(
  defineProps<{
    size?: PopoverSize;
    placement?: PopoverPlacement;
    showHeader?: boolean;
    showFooter?: boolean;
    showScroll?: boolean;
    showSlot?: boolean;
    cancelLabel?: string;
    actionLabel?: string;
    skipLabel?: string;
    stepLabel?: string;
    class?: string;
  }>(),
  {
    size: 'md',
    placement: 'bottom',
    showHeader: true,
    showFooter: true,
    showScroll: true,
    showSlot: true,
    cancelLabel: 'Cancel',
    actionLabel: 'Action',
    skipLabel: 'Skip',
    stepLabel: '1/5',
    class: '',
  },
);

defineEmits<{ cancel: []; action: []; skip: [] }>();

const config = computed(() => SIZE_CONFIG[props.size]);
const pointerStyle = computed(() => pointerPositionByPlacement[props.placement]);
const showStep = computed(() => props.size === 'lg');
</script>

<template>
  <div
    :class="['relative flex flex-col overflow-visible bg-surface-container text-element-primary text-left', props.class]"
    :style="{
      width: `${config.width}px`,
      maxHeight: `${config.maxHeight}px`,
      border: '1px solid var(--sol-border-solid)',
      borderRadius: 'var(--sol-radius-4)',
      boxShadow: 'var(--sol-shadow-light)',
    }"
  >
    <span class="pointer-events-none absolute flex items-center justify-center" :style="pointerStyle" aria-hidden="true">
      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" aria-hidden="true">
        <path d="M0.75 8L7.45 1.3Q8 0.75 8.55 1.3L15.25 8" fill="var(--sol-surface-container)" />
        <path
          d="M0.75 8L7.45 1.3Q8 0.75 8.55 1.3L15.25 8"
          stroke="var(--sol-border-solid)"
          stroke-width="1"
          stroke-linejoin="round"
        />
      </svg>
    </span>

    <div class="flex flex-col overflow-hidden rounded-[inherit]">
      <!-- NOTE: React source doesn't wire OverlayHeaderPopover's onClose here — the
           header close button is inert by design (matches OverlayHeaderPopover
           usage in Popover.tsx, which passes no onClose). -->
      <OverlayHeaderPopover
        v-if="showHeader"
        :size="config.headerSize"
        :show-navigation="false"
        show-closed-btn
        show-divider
      >
        <template #title><slot name="title">Header</slot></template>
      </OverlayHeaderPopover>

      <div
        class="relative w-full shrink-0 overflow-hidden"
        :style="{ height: `${config.contentHeight}px`, maxHeight: size === 'md' ? '200px' : '300px' }"
      >
        <div
          class="flex size-full flex-col items-start overflow-hidden rounded-[inherit] text-left"
          :style="{ gap: 'var(--sol-spacing-12)', padding: config.contentPadding }"
        >
          <template v-if="showSlot">
            <slot>
              <div
                class="flex w-full flex-col items-start rounded-2"
                style="
                  gap: var(--sol-spacing-4);
                  padding: var(--sol-spacing-10);
                  border: 1px solid var(--color-pink);
                  background: var(--color-pink-container);
                  color: var(--color-pink);
                "
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6.2 12.2C6.2 8.99 8.8 6.4 12 6.4C13.68 6.4 15.19 7.11 16.25 8.25L18 6.5V11.5H13L15.18 9.32C14.39 8.44 13.26 7.9 12 7.9C9.63 7.9 7.7 9.83 7.7 12.2H6.2ZM17.8 11.8C17.8 15.01 15.2 17.6 12 17.6C10.32 17.6 8.81 16.89 7.75 15.75L6 17.5V12.5H11L8.82 14.68C9.61 15.56 10.74 16.1 12 16.1C14.37 16.1 16.3 14.17 16.3 11.8H17.8Z"
                    fill="currentColor"
                  />
                </svg>
                <span class="font-regular underline text-text-xxs leading-text-xxs">ⓘ 슬롯 기능 유의사항</span>
              </div>
            </slot>
          </template>
        </div>
        <span
          v-if="showScroll"
          class="absolute bottom-0 right-0 top-0 flex items-center justify-center"
          style="width: 12px; padding: var(--sol-spacing-4) 3px"
          aria-hidden="true"
        >
          <span class="relative h-full w-[4px] overflow-hidden rounded-full">
            <span
              class="absolute left-0 right-0 top-0 rounded-full"
              style="bottom: 50%; background: var(--sol-border-solid)"
            />
          </span>
        </span>
      </div>

      <div v-if="showFooter" class="flex w-full flex-col">
        <Divider type="horizontal" color="G100" solid class="shrink-0" />
        <div
          :class="['flex w-full items-center', showStep ? 'justify-between' : 'justify-end']"
          :style="{
            minHeight: size === 'lg' ? '57px' : '56px',
            padding: size === 'lg' ? 'var(--sol-spacing-12) var(--sol-spacing-16)' : 'var(--sol-spacing-12)',
          }"
        >
          <div v-if="showStep" class="flex shrink-0 items-center" style="gap: var(--sol-spacing-8)">
            <button
              type="button"
              class="font-semibold underline"
              style="
                color: var(--sol-element-brand-variant);
                font-size: var(--sol-font-size-text-sm);
                line-height: var(--sol-line-height-text-sm);
              "
              @click="$emit('skip')"
            >
              {{ skipLabel }}
            </button>
            <span
              class="font-regular text-element-tertiary"
              style="font-size: var(--sol-font-size-text-sm); line-height: var(--sol-line-height-text-sm)"
            >
              {{ stepLabel }}
            </span>
          </div>
          <div class="flex shrink-0 items-center" style="gap: var(--sol-spacing-8)">
            <button
              type="button"
              class="inline-flex shrink-0 items-center justify-center whitespace-nowrap font-semibold"
              style="
                min-width: 68px;
                height: 32px;
                padding: 0 var(--sol-spacing-16);
                border-radius: var(--sol-radius-4);
                border: 1px solid var(--sol-border-solid);
                background: var(--sol-surface-container);
                color: var(--sol-element-brand-variant);
                font-size: var(--sol-font-size-text-sm);
                line-height: var(--sol-line-height-text-sm);
              "
              @click="$emit('cancel')"
            >
              {{ cancelLabel }}
            </button>
            <button
              type="button"
              class="inline-flex shrink-0 items-center justify-center whitespace-nowrap font-semibold"
              style="
                min-width: 68px;
                height: 32px;
                padding: 0 var(--sol-spacing-16);
                border-radius: var(--sol-radius-4);
                border: 1px solid var(--sol-primary);
                background: var(--sol-primary);
                color: var(--sol-element-inverse);
                font-size: var(--sol-font-size-text-sm);
                line-height: var(--sol-line-height-text-sm);
              "
              @click="$emit('action')"
            >
              {{ actionLabel }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
