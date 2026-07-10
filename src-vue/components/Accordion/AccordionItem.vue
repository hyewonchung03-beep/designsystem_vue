<script setup lang="ts">
import { ref, watch } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import type { AccordionSize } from './Accordion.vue';

const props = withDefaults(
  defineProps<{
    label: string;
    disabled?: boolean;
    defaultExpanded?: boolean;
    size: AccordionSize;
    showDivider: boolean;
  }>(),
  { disabled: false, defaultExpanded: false },
);

const emit = defineEmits<{ open: [] }>();

const ICON_SIZE: Record<AccordionSize, string> = { sm: 'size-5', md: 'size-5', lg: 'size-5' };
const ICON_PX: Record<AccordionSize, number> = { sm: 20, md: 20, lg: 20 };
const TEXT_CLS: Record<AccordionSize, string> = {
  sm: 'text-text-sm leading-text-sm',
  md: 'text-text-sm leading-text-sm',
  lg: 'text-text-md leading-text-md',
};

const isOpen = ref(props.defaultExpanded);
const closeFn = ref<(() => void) | null>(null);

// Disclosure는 open 상태를 controlled prop으로 받지 않으므로, v-slot이 매 렌더마다
// 넘겨주는 open/close를 이 함수를 통해 상위 스코프(ref)로 끌어올려 부모가
// 다른 아이템을 닫을 때(single-expand 모드) closeFn을 호출할 수 있게 한다.
function syncDisclosureState(open: boolean, close: () => void) {
  isOpen.value = open;
  closeFn.value = close;
  return '';
}

watch(isOpen, (open) => {
  if (open) emit('open');
});

defineExpose({
  close: () => closeFn.value?.(),
});
</script>

<template>
  <Disclosure v-slot="{ open, close }" :default-open="defaultExpanded" as="div" class="flex w-full flex-col">
    <span class="hidden">{{ syncDisclosureState(open, close) }}</span>

    <!-- ── Trigger (parent row) ── -->
    <DisclosureButton
      :disabled="disabled"
      :class="[
        'group relative flex w-full items-center gap-2 px-4 py-3 text-left',
        'focus:outline-none focus-visible:outline-none',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      ]"
    >
      <!-- Chevron icon with interaction circle -->
      <span :class="`relative flex shrink-0 items-center justify-center text-element-quaternary ${ICON_SIZE[size]}`">
        <span
          v-if="!disabled"
          aria-hidden="true"
          class="pointer-events-none absolute -inset-1 rounded-circle bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
        />
        <span
          aria-hidden="true"
          class="shrink-0 transition-transform duration-200"
          :class="open ? 'rotate-90' : 'rotate-0'"
          :style="{ display: 'block', width: `${ICON_PX[size]}px`, height: `${ICON_PX[size]}px` }"
        >
          <svg :width="ICON_PX[size]" :height="ICON_PX[size]" viewBox="0 0 24 24" fill="none">
            <path
              d="M15.5303 11.4697C15.8232 11.7626 15.8232 12.2374 15.5303 12.5303L9.53027 18.5303L8.46973 17.4697L13.9395 12L8.46973 6.53027L9.53027 5.46973L15.5303 11.4697Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </span>

      <!-- Label -->
      <span
        :class="`relative min-w-0 flex-1 ${TEXT_CLS[size]} ${
          open ? 'font-semibold text-element-brand-variant' : 'font-normal text-element-primary truncate'
        }`"
      >
        {{ label }}
      </span>

      <!-- Focus ring -->
      <span
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 hidden rounded-1 border-2 border-element-brand group-focus-visible:block"
      />
    </DisclosureButton>

    <!-- ── Divider ── -->
    <div v-if="showDivider" class="h-px w-full bg-border-solid-variant" />

    <!-- ── Panel (child content) ── -->
    <DisclosurePanel v-if="$slots.default" class="flex w-full flex-col bg-surface-container-low">
      <slot />
    </DisclosurePanel>
  </Disclosure>
</template>
