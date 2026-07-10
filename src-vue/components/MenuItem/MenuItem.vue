<script lang="ts">
export type MenuItemVariant = 'default' | 'danger';
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    label: string;
    sublabel?: string;
    variant?: MenuItemVariant;
    selected?: boolean;
    class?: string;
  }>(),
  {
    variant: 'default',
    selected: false,
    class: '',
  },
);

defineEmits<{ click: [MouseEvent] }>();

const isDanger = computed(() => props.variant === 'danger');

const labelColor = computed(() =>
  props.selected ? 'text-element-brand' : isDanger.value ? 'text-error' : 'text-element-primary',
);

const labelWeight = computed(() => (props.selected ? 'font-semibold' : 'font-regular'));
</script>

<template>
  <button
    type="button"
    :class="[
      'group relative flex items-center w-full min-h-8 rounded-2 cursor-pointer focus:outline-none text-left',
      props.class,
    ]"
    @click="$emit('click', $event)"
  >
    <span
      class="absolute inset-0 rounded-2 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
    />
    <span class="relative flex flex-1 items-center gap-1.5 py-1.5 px-2">
      <span v-if="$slots.leadingIcon" class="shrink-0 flex items-center justify-center size-4 text-element-quaternary">
        <slot name="leadingIcon" />
      </span>
      <span
        :class="`flex-1 min-w-0 text-text-sm leading-text-sm ${labelWeight} ${labelColor} text-left overflow-hidden text-ellipsis whitespace-nowrap`"
      >
        {{ label }}
      </span>
      <span
        v-if="sublabel && !selected"
        class="text-text-xs leading-text-xs font-regular text-element-tertiary text-left overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {{ sublabel }}
      </span>
      <span v-if="selected && !isDanger" class="shrink-0 flex items-center justify-center size-3.5 text-element-brand">
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21.0537 7.00391L10.2207 17.8369C9.92781 18.1298 9.45305 18.1298 9.16016 17.8369L3.94629 12.624L5.00684 11.5635L9.68945 16.2461L19.9932 5.94336L21.0537 7.00391Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </span>
  </button>
</template>
