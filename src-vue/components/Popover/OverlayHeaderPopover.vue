<script lang="ts">
export type OverlayHeaderPopoverSize = 'sm' | 'md' | 'lg';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import Divider from '../Divider/Divider.vue';
import IcBlank from '../Icon/IcBlank.vue';
import IcTrigger from '../Icon/IcTrigger.vue';
import BadgeCounter from '../Badge/BadgeCounter.vue';

const SIZE_STYLES = {
  lg: {
    padding: {
      paddingTop: 'var(--sol-spacing-10)',
      paddingBottom: 'var(--sol-spacing-10)',
      paddingLeft: 'var(--sol-spacing-16)',
      paddingRight: 'var(--sol-spacing-16)',
    },
    gap: 'var(--sol-spacing-10)',
    navIconSize: 20 as const,
    closeIconSize: 20 as const,
    titleStyle: {
      fontSize: 'var(--sol-font-size-text-md)',
      lineHeight: 'var(--sol-line-height-text-md)',
    },
    descStyle: {
      fontSize: 'var(--sol-font-size-text-xs)',
      lineHeight: 'var(--sol-line-height-text-xs)',
    },
  },
  md: {
    padding: {
      paddingTop: 'var(--sol-spacing-8)',
      paddingBottom: 'var(--sol-spacing-8)',
      paddingLeft: 'var(--sol-spacing-12)',
      paddingRight: 'var(--sol-spacing-12)',
    },
    gap: 'var(--sol-spacing-8)',
    navIconSize: 16 as const,
    closeIconSize: 16 as const,
    titleStyle: {
      fontSize: 'var(--sol-font-size-text-sm)',
      lineHeight: 'var(--sol-line-height-text-sm)',
    },
    descStyle: {
      fontSize: 'var(--sol-font-size-text-xxs)',
      lineHeight: 'var(--sol-line-height-text-xxs)',
    },
  },
  sm: {
    padding: {
      paddingTop: 'var(--sol-spacing-6)',
      paddingBottom: 'var(--sol-spacing-6)',
      paddingLeft: 'var(--sol-spacing-12)',
      paddingRight: 'var(--sol-spacing-12)',
    },
    gap: 'var(--sol-spacing-6)',
    navIconSize: 14 as const,
    closeIconSize: 16 as const,
    titleStyle: {
      fontSize: 'var(--sol-font-size-text-xs)',
      lineHeight: 'var(--sol-line-height-text-xs)',
    },
    descStyle: {
      fontSize: 'var(--sol-font-size-text-xxs)',
      lineHeight: 'var(--sol-line-height-text-xxs)',
    },
  },
} as const;

const props = withDefaults(
  defineProps<{
    size?: OverlayHeaderPopoverSize;
    showNavigation?: boolean;
    showLeadingIcon?: boolean;
    showDescription?: boolean;
    showNumber?: boolean;
    count?: number;
    showClosedBtn?: boolean;
    showLinkBtn?: boolean;
    linkLabel?: string;
    showBadge?: boolean;
    badgeLabel?: string;
    showDivider?: boolean;
    class?: string;
  }>(),
  {
    size: 'lg',
    showNavigation: true,
    showLeadingIcon: false,
    showDescription: false,
    showNumber: false,
    count: 1,
    showClosedBtn: true,
    showLinkBtn: false,
    linkLabel: 'Clear',
    showBadge: false,
    badgeLabel: 'OOS',
    showDivider: true,
    class: '',
  },
);

defineEmits<{ navigate: []; close: []; linkClick: [] }>();

const s = computed(() => SIZE_STYLES[props.size]);
</script>

<template>
  <div :class="['flex flex-col w-full text-left', props.class]">
    <div class="flex items-center w-full" :style="{ ...s.padding, gap: s.gap }">
      <!-- 뒤로가기 네비게이션 -->
      <div v-if="showNavigation" class="shrink-0 flex items-center">
        <IcTrigger :size="s.navIconSize" aria-label="뒤로" @click="$emit('navigate')">
          <span class="text-element-quaternary inline-flex">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15.5302 6.53027L10.0605 12L15.5302 17.4697L14.4697 18.5303L8.46967 12.5303C8.17678 12.2374 8.17678 11.7626 8.46967 11.4697L14.4697 5.46973L15.5302 6.53027Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </IcTrigger>
      </div>

      <!-- 선택적 leading icon -->
      <span v-if="showLeadingIcon" class="shrink-0" style="width: 16px; height: 16px">
        <slot name="leadingIcon"><IcBlank :size="16" /></slot>
      </span>

      <!-- 타이틀 + 배지 + 설명 -->
      <div class="flex flex-1 flex-col min-w-0 text-left" style="gap: var(--sol-spacing-2)">
        <div class="flex items-center" style="gap: var(--sol-spacing-4)">
          <!-- sm 전용 OOS 배지 -->
          <span
            v-if="size === 'sm' && showBadge"
            class="flex items-center justify-center rounded-full bg-error-container shrink-0 font-semibold"
            style="
              padding: var(--sol-spacing-4) var(--sol-spacing-8);
              font-size: var(--sol-font-size-text-xxs);
              line-height: var(--sol-line-height-text-xxs);
              color: var(--sol-error);
            "
          >
            {{ badgeLabel }}
          </span>
          <p
            class="font-semibold text-element-primary overflow-hidden text-ellipsis whitespace-nowrap text-left"
            :style="s.titleStyle"
          >
            <slot name="title" />
          </p>
          <span v-if="showNumber" class="shrink-0">
            <BadgeCounter :count="count" />
          </span>
        </div>
        <p
          v-if="showDescription && $slots.description"
          class="text-element-tertiary font-regular overflow-hidden text-ellipsis whitespace-nowrap w-full text-left"
          :style="s.descStyle"
        >
          <slot name="description" />
        </p>
      </div>

      <!-- 우측 컨트롤: sm은 링크버튼 + 닫기, lg/md는 닫기만 -->
      <div
        class="flex items-center shrink-0"
        :style="{ gap: size === 'sm' ? 'var(--sol-spacing-8)' : 'var(--sol-spacing-12)' }"
      >
        <button
          v-if="size === 'sm' && showLinkBtn"
          type="button"
          class="font-semibold text-primary underline whitespace-nowrap"
          :style="s.titleStyle"
          @click="$emit('linkClick')"
        >
          {{ linkLabel }}
        </button>
        <div v-if="showClosedBtn" class="shrink-0 flex items-center">
          <IcTrigger :size="s.closeIconSize" aria-label="닫기" @click="$emit('close')">
            <span class="text-element-quaternary inline-flex">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M18.9707 5.91064L12.8809 11.9995L18.9707 18.0894L17.9102 19.1499L11.8203 13.0601L5.73145 19.1499L4.6709 18.0894L10.7598 11.9995L4.6709 5.91064L5.73145 4.8501L11.8203 10.939L17.9102 4.8501L18.9707 5.91064Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </IcTrigger>
        </div>
      </div>
    </div>

    <Divider v-if="showDivider" type="horizontal" color="G100" solid class="shrink-0" />
  </div>
</template>
