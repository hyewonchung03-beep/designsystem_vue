<script lang="ts">
export type ToolbarItemState = 'enabled' | 'focused' | 'disabled';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import IcBlank from '../Icon/IcBlank.vue';

const props = withDefaults(
  defineProps<{
    selected?: boolean;
    state?: ToolbarItemState;
  }>(),
  {
    selected: false,
    state: 'enabled',
  },
);

defineEmits<{ click: [] }>();

// ── Style helpers ─────────────────────────────────────────────────────────

function getVariantCls(selected: boolean, state: ToolbarItemState): string {
  // disabled (selected or not)
  if (state === 'disabled') {
    return 'border border-border-solid bg-fill-disabled shadow-normal cursor-not-allowed';
  }

  // focused + not selected
  if (state === 'focused' && !selected) {
    return 'border border-border-solid bg-surface-bright shadow-focus-button-ring';
  }

  // focused + selected: container = surface-bright + focus ring, inner layer = secondary-container
  if (state === 'focused' && selected) {
    return 'border border-border-solid bg-surface-bright shadow-focus-button-ring';
  }

  // enabled + selected: outside border via ring, no container fill (inner layer provides bg)
  if (selected) {
    return 'ring-1 ring-primary-inverse shadow-normal border-0';
  }

  // enabled + not selected
  return 'border border-border-solid bg-surface-bright shadow-normal';
}

const isDisabled = computed(() => props.state === 'disabled');
const showSelectedBg = computed(() => props.selected && !isDisabled.value);
// selected+focused uses secondary-container, selected+enabled uses selected-container
const selectedBgCls = computed(() => (props.state === 'focused' ? 'bg-secondary-container' : 'bg-selected-container'));
const iconColorCls = computed(() => (isDisabled.value ? 'text-element-disabled' : 'text-element-secondary'));
const variantCls = computed(() => getVariantCls(props.selected, props.state));
</script>

<template>
  <button
    type="button"
    :disabled="isDisabled"
    :class="`group relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-2 p-3 focus-visible:outline-none ${variantCls}`"
    @click="!isDisabled && $emit('click')"
  >
    <div v-if="showSelectedBg" :class="`absolute inset-0 rounded-2 ${selectedBgCls}`" />
    <span v-if="!isDisabled" class="absolute inset-0.5 rounded-2 group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
    <span :class="`relative z-10 flex size-5 shrink-0 items-center justify-center ${iconColorCls}`">
      <slot name="icon">
        <IcBlank :size="20" />
      </slot>
    </span>
  </button>
</template>
