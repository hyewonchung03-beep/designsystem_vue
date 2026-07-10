<!--
  DatatableTreeCell — 트리 셀 (expand/collapse chevron + label + badge/counter)

  React: src/components/DatatableTreeCell/DatatableTreeCell.tsx
  아이콘은 ic_state(상태 결합형 아이콘) 카테고리 — open/close 상태와 1:1로
  매핑되는 chevron으로, React 원본 주석에도 "CLAUDE.md ic_state 예외 적용"이라고
  명시돼 있어 IcBlank 대신 SVG를 직접 포팅했다(사용자 확인 불필요, 원본이 이미
  예외 적용 결정을 문서화함).

  controlled/uncontrolled open은 Select.vue 컨벤션을 따라 `open`(undefined=
  uncontrolled) + `defaultOpen` 조합으로 이식했다. React의 onToggle → toggle
  emit(코드베이스 전역 컨벤션: on 접두어 제거 + camelCase).
-->
<script lang="ts">
export type DatatableTreeCellTier = 1 | 2 | 3 | 4;
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BadgeCounter from '../Badge/BadgeCounter.vue';

const props = withDefaults(
  defineProps<{
    label?: string;
    branch?: boolean;
    open?: boolean;
    defaultOpen?: boolean;
    tier?: DatatableTreeCellTier;
    showBadge?: boolean;
    badgeText?: string;
    showCounter?: boolean;
    counterCount?: number;
    counterTotal?: number;
    class?: string;
  }>(),
  {
    label: 'Label',
    branch: true,
    defaultOpen: false,
    tier: 1,
    showBadge: false,
    badgeText: 'Default',
    showCounter: false,
    counterCount: 1,
    counterTotal: 1,
    class: '',
  },
);

const emit = defineEmits<{ toggle: [open: boolean] }>();

const internalOpen = ref(props.defaultOpen);
const isOpen = computed(() => (props.open !== undefined ? props.open : internalOpen.value));

const tierPadding: Record<DatatableTreeCellTier, string> = {
  1: 'pl-[14px]',
  2: 'pl-[42px]',
  3: 'pl-[86px]',
  4: 'pl-[120px]',
};

function handleToggle() {
  if (!props.branch) return;
  const next = !isOpen.value;
  if (props.open === undefined) internalOpen.value = next;
  emit('toggle', next);
}
</script>

<template>
  <div :class="`flex h-[52px] items-center py-3 text-left ${tierPadding[tier] ?? tierPadding[1]} ${props.class}`">
    <div class="flex items-center gap-2">
      <button
        v-if="branch"
        type="button"
        :aria-expanded="isOpen"
        :aria-label="isOpen ? `Collapse ${label}` : `Expand ${label}`"
        class="flex shrink-0 items-center justify-center rounded-circle text-element-quaternary
          hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
          focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        @click="handleToggle"
      >
        <svg v-if="isOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M11.5264 8.41809C11.8209 8.17778 12.2557 8.19524 12.5303 8.46984L18.5303 14.4698L17.4697 15.5304L12 10.0607L6.53027 15.5304L5.46973 14.4698L11.4697 8.46984L11.5264 8.41809Z"
            fill="currentColor"
          />
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15.5303 11.4697C15.8232 11.7626 15.8232 12.2374 15.5303 12.5303L9.53027 18.5303L8.46973 17.4697L13.9395 12L8.46973 6.53027L9.53027 5.46973L15.5303 11.4697Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <span v-else class="size-5 shrink-0" />

      <span
        :class="`truncate text-text-md leading-text-md text-element-secondary text-left ${branch && isOpen ? 'font-semibold' : 'font-regular'}`"
      >
        {{ label }}
      </span>

      <BadgeCounter v-if="branch && tier === 1 && showCounter" :count="counterCount" :total="counterTotal" />

      <span
        v-if="branch && tier === 1 && showBadge"
        class="inline-flex shrink-0 items-center justify-center rounded-circle border border-border-normal px-2 py-1 text-text-xs leading-text-xs font-regular text-element-tertiary"
      >
        {{ badgeText }}
      </span>
    </div>
  </div>
</template>
