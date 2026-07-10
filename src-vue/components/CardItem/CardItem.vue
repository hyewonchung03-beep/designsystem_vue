<script lang="ts">
import type { BadgeOption } from '../Badge/Badge.vue';

export type CardItemType = 'horizontal' | 'vertical';
export type CardItemSize = 'sm' | 'md';
export type CardItemState = 'enabled' | 'disabled';

export type CardItemProps = {
  title: string;
  description?: string;
  thumbnailSrc?: string;
  badgeLabel?: string;
  badgeOption?: BadgeOption;
  dateText?: string;
  type?: CardItemType;
  size?: CardItemSize;
  showThumbnail?: boolean;
  showMeta?: boolean;
  showDescription?: boolean;
  state?: CardItemState;
  class?: string;
};
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import Badge from '../Badge/Badge.vue';
import IcImage from '../Icon/IcImage.vue';

const props = withDefaults(defineProps<CardItemProps>(), {
  badgeOption: 'neutral',
  type: 'horizontal',
  size: 'md',
  showThumbnail: true,
  showMeta: true,
  showDescription: true,
  state: 'enabled',
  class: '',
});

// CardItem은 native <div>이므로, 부모가 @click 리스너를 붙였는지 여부(=인터랙티브 여부)에
// 따라 role/tabindex/cursor 및 Enter/Space 키보드 인터랙션을 조건부로 부여한다.
// (React 원본의 `onClick` prop 존재 여부 분기를 Vue의 fallthrough attrs로 치환)
const attrs = useAttrs();
const isDisabled = computed(() => props.state === 'disabled');
const isInteractive = computed(() => 'onClick' in attrs && !isDisabled.value);
const isVertical = computed(() => props.type === 'vertical');

function handleKeydown(e: KeyboardEvent) {
  if (!isInteractive.value) return;
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    const handler = attrs.onClick as ((ev: Event) => void) | ((ev: Event) => void)[] | undefined;
    if (Array.isArray(handler)) handler.forEach((h) => h(e));
    else handler?.(e);
  }
}

// ── Size / type config ─────────────────────────────────────────────────────

const THUMBNAIL_WIDTH: Record<CardItemSize, string> = {
  sm: 'w-[100px]',
  md: 'w-[124px]',
};

const CONTENT_CLS: Record<CardItemSize, string> = {
  sm: 'gap-2 p-sol-14',
  md: 'gap-3 p-4',
};

const VERTICAL_CONTENT_CLS: Record<CardItemSize, string> = {
  sm: 'gap-2 px-sol-14 pt-sol-14 pb-sol-18',
  md: 'gap-3 px-4 pt-4 pb-5',
};

const TITLE_CLS: Record<CardItemSize, string> = {
  sm: 'text-text-md leading-text-md',
  md: 'text-text-lg leading-text-lg',
};

const DESC_CLS: Record<CardItemSize, string> = {
  sm: 'text-text-sm leading-text-sm-compact',
  md: 'text-text-md leading-text-sm',
};

const rootClass = computed(() => [
  'overflow-clip rounded-4 border border-border-solid bg-surface-container shadow-extralight text-left',
  isVertical.value ? 'flex flex-col items-start' : 'flex items-start',
  isDisabled.value ? 'pointer-events-none opacity-50' : '',
  isInteractive.value ? 'cursor-pointer hover:shadow-light active:shadow-extralight transition-shadow' : '',
  props.class,
]);

const contentPadding = computed(() => (isVertical.value ? VERTICAL_CONTENT_CLS[props.size] : CONTENT_CLS[props.size]));

const contentClass = computed(() => [
  'flex min-w-0 flex-1 flex-col self-stretch',
  contentPadding.value,
  isVertical.value && props.showThumbnail ? 'border-t border-border-solid-variant' : '',
]);

const titleClass = computed(() => `font-semibold text-element-primary text-left ${TITLE_CLS[props.size]}`);
const descClass = computed(() => `font-regular text-element-secondary text-left ${DESC_CLS[props.size]}`);
</script>

<template>
  <div
    :class="rootClass"
    :role="isInteractive ? 'button' : undefined"
    :tabindex="isInteractive ? 0 : undefined"
    @keydown="handleKeydown"
  >
    <template v-if="showThumbnail">
      <div v-if="isVertical" class="relative flex w-full shrink-0 items-center bg-surface-container-low">
        <img v-if="thumbnailSrc" :src="thumbnailSrc" alt="" class="absolute inset-0 size-full object-cover" />
        <div v-else class="absolute inset-0 flex items-center justify-center text-element-quaternary">
          <IcImage :size="32" />
        </div>
        <div class="w-full" style="padding-bottom: 56.25%" />
      </div>
      <div
        v-else
        :class="['relative flex shrink-0 items-center self-stretch bg-surface-container-low', THUMBNAIL_WIDTH[size]]"
      >
        <img v-if="thumbnailSrc" :src="thumbnailSrc" alt="" class="absolute inset-0 size-full object-cover" />
        <div v-else class="absolute inset-0 flex items-center justify-center text-element-quaternary">
          <IcImage :size="32" />
        </div>
      </div>
    </template>

    <div :class="contentClass">
      <div v-if="showMeta && (badgeLabel || dateText)" class="flex w-full items-center gap-2">
        <Badge v-if="badgeLabel" :label="badgeLabel" size="sm" type="solid" :option="badgeOption" />
        <p v-if="dateText" class="min-w-0 flex-1 text-right text-text-xs leading-text-xs font-regular text-element-quaternary">
          {{ dateText }}
        </p>
      </div>

      <div class="flex w-full flex-col gap-0.5">
        <p :class="titleClass">{{ title }}</p>
        <p v-if="showDescription && description" :class="descClass">{{ description }}</p>
      </div>

      <slot />
    </div>
  </div>
</template>
