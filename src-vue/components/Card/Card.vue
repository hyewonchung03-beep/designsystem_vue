<script lang="ts">
export type CardProps = {
  title: string;
  description?: string;
  thumbnailSrc?: string;
  badgeLabel?: string;
  showDragHandle?: boolean;
  class?: string;
};
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import IcTrigger from '../Icon/IcTrigger.vue';
import IcImage from '../Icon/IcImage.vue';

const props = withDefaults(defineProps<CardProps>(), {
  showDragHandle: false,
  class: '',
});

// Card는 native <div>이므로, 부모가 @click 리스너를 붙였는지 여부(=클릭 가능 여부)에
// 따라 role/tabindex/cursor 및 Enter/Space 키보드 인터랙션을 조건부로 부여한다.
// (React 원본의 `onClick` prop 존재 여부 분기를 Vue의 fallthrough attrs로 치환)
const attrs = useAttrs();
const isClickable = computed(() => 'onClick' in attrs);

function handleKeydown(e: KeyboardEvent) {
  if (!isClickable.value) return;
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    const handler = attrs.onClick as ((ev: Event) => void) | ((ev: Event) => void)[] | undefined;
    if (Array.isArray(handler)) handler.forEach((h) => h(e));
    else handler?.(e);
  }
}

const rootClass = computed(() => [
  'relative flex flex-col overflow-clip rounded-4 border border-border-solid bg-surface-container text-element-primary shadow-extralight text-left',
  isClickable.value ? 'cursor-pointer' : '',
  props.class,
]);
</script>

<template>
  <div
    :class="rootClass"
    :role="isClickable ? 'button' : undefined"
    :tabindex="isClickable ? 0 : undefined"
    @keydown="handleKeydown"
  >
    <!-- Thumbnail -->
    <div class="relative flex h-[131px] w-full shrink-0 items-center justify-center bg-surface-container-low">
      <img v-if="thumbnailSrc" :src="thumbnailSrc" alt="" class="absolute inset-0 size-full object-cover" />
      <span v-else class="text-element-quaternary">
        <IcImage :size="32" />
      </span>
    </div>

    <!-- Badge -->
    <div
      v-if="badgeLabel"
      class="absolute right-[-1px] top-[-1px] flex items-center gap-1 overflow-clip rounded-bl-2 bg-element-brand-variant px-sol-8 py-sol-4"
    >
      <span class="whitespace-nowrap text-text-xs leading-text-xxs font-semibold text-element-inverse">
        {{ badgeLabel }}
      </span>
    </div>

    <!-- Drag handle -->
    <div v-if="showDragHandle" class="absolute left-0.5 top-0">
      <IcTrigger :size="12" ratio="1:2" aria-label="드래그 핸들" />
    </div>

    <!-- Contents -->
    <div class="flex flex-col gap-1 border-t border-border-solid-variant px-sol-16 pb-sol-16 pt-sol-14">
      <p class="text-text-sm leading-text-sm font-semibold text-element-primary text-left">
        {{ title }}
      </p>
      <p v-if="description" class="line-clamp-3 text-text-xs leading-text-xs font-regular text-element-secondary text-left">
        {{ description }}
      </p>
      <slot />
    </div>
  </div>
</template>
