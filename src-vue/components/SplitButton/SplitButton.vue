<script setup lang="ts">
import IcResponsive from '../Icon/IcResponsive.vue';
import IcBlank from '../Icon/IcBlank.vue';

const props = withDefaults(
  defineProps<{
    label: string;
    showIcon?: boolean;
    disabled?: boolean;
    triggerOpen?: boolean;
    ariaLabel?: string;
  }>(),
  {
    showIcon: true,
    disabled: false,
    triggerOpen: false,
  },
);

defineEmits<{ primaryClick: []; triggerClick: [] }>();

const baseCls = (disabled: boolean) =>
  disabled
    ? 'bg-fill-disabled text-element-disabled cursor-not-allowed'
    : 'bg-primary text-element-inverse cursor-pointer';
</script>

<template>
  <div class="inline-flex items-center text-left" role="group" :aria-label="ariaLabel ?? label">
    <!-- ── Primary action ── -->
    <button
      type="button"
      :disabled="disabled"
      :class="`group/pri relative flex h-9 items-center gap-sol-6 rounded-l-4 pl-sol-14 pr-sol-12 py-sol-10 ${baseCls(disabled)}
        focus:outline-none focus-visible:shadow-focus-button-ring focus-visible:z-10
      `"
      @click="$emit('primaryClick')"
    >
      <IcResponsive v-if="showIcon" :size="16" class="relative z-[1]">
        <slot name="icon"><IcBlank :size="16" /></slot>
      </IcResponsive>
      <span class="relative z-[1] whitespace-nowrap text-text-sm leading-text-sm font-semibold">
        {{ label }}
      </span>

      <span
        v-if="!disabled"
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 rounded-l-4
          bg-interaction-inverse-normal
          group-hover/pri:bg-interaction-inverse-hover
          group-active/pri:bg-interaction-inverse-pressed"
      />
    </button>

    <!-- ── Divider ── -->
    <div class="h-9 w-px bg-border-solid-variant" />

    <!-- ── Trigger (dropdown) ── -->
    <button
      type="button"
      :disabled="disabled"
      :aria-expanded="triggerOpen"
      aria-haspopup="true"
      aria-label="More options"
      :class="`group/trg relative flex size-9 items-center justify-center rounded-r-4 ${baseCls(disabled)}
        focus:outline-none focus-visible:shadow-focus-button-ring focus-visible:z-10
      `"
      @click="$emit('triggerClick')"
    >
      <span class="relative z-[1]">
        <svg
          :width="14"
          :height="14"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          :class="`shrink-0 transition-transform duration-200 ${triggerOpen ? 'rotate-180' : ''}`"
        >
          <path
            d="M6 8L10 12L14 8"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>

      <span
        v-if="!disabled"
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 rounded-r-4
          bg-interaction-inverse-normal
          group-hover/trg:bg-interaction-inverse-hover
          group-active/trg:bg-interaction-inverse-pressed"
      />
    </button>
  </div>
</template>
