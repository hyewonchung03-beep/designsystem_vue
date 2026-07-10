<script lang="ts">
export type SwitchSize = 'sm' | 'md';
</script>

<script setup lang="ts">
import { computed, useId } from 'vue';
import IcTrigger from '../Icon/IcTrigger.vue';
import IcHelp from '../Icon/IcHelp.vue';

const props = withDefaults(
  defineProps<{
    checked?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    size?: SwitchSize;
    showIcon?: boolean;
    label?: string;
    description?: string;
    helpIcon?: boolean;
    helpAriaLabel?: string;
    id?: string;
  }>(),
  {
    checked: false,
    disabled: false,
    readonly: false,
    size: 'sm',
    showIcon: false,
    helpIcon: false,
    helpAriaLabel: '도움말',
  },
);

const emit = defineEmits<{
  change: [boolean];
  helpClick: [];
}>();

// ── Size configs ───────────────────────────────────────────────────────────

type SizeCfg = {
  track: string;
  handle: string;
  handleOn: string;
  handleOff: string;
  padding: string;
  gap: string;
  title: string;
  description: string;
  helpIconSize: 14 | 16;
};

const sizeConfig: Record<SwitchSize, SizeCfg> = {
  sm: {
    track: 'w-[30px] h-[20px]',
    handle: 'size-[14px]',
    handleOn: 'left-[13px]',
    handleOff: 'left-[3px]',
    padding: 'top-[3px]',
    gap: 'gap-1.5',
    title: 'text-text-xs leading-text-xs',
    description: 'text-text-xxs leading-text-xxs',
    helpIconSize: 14,
  },
  md: {
    track: 'w-[52px] h-[32px]',
    handle: 'size-[26px]',
    handleOn: 'left-[23px]',
    handleOff: 'left-[3px]',
    padding: 'top-[3px]',
    gap: 'gap-3',
    title: 'text-text-sm leading-text-sm',
    description: 'text-text-xs leading-text-xs',
    helpIconSize: 16,
  },
};

const autoId = useId();
const id = computed(() => props.id ?? autoId);
const cfg = computed(() => sizeConfig[props.size]);

function handleChange() {
  if (!props.disabled && !props.readonly) emit('change', !props.checked);
}

const trackBg = computed(() =>
  props.disabled
    ? 'bg-fill-disabled'
    : props.readonly
      ? 'border border-border-normal-variant'
      : props.checked
        ? 'bg-tertiary'
        : 'bg-fill-inactive',
);

const handleBg = computed(() =>
  props.disabled ? 'bg-fill-inactive' : props.readonly ? 'bg-element-tertiary' : 'bg-static-white',
);

const handleIconColor = computed(() =>
  props.disabled
    ? 'text-element-disabled'
    : props.readonly
      ? 'text-static-white'
      : props.checked
        ? 'text-tertiary'
        : 'text-element-quaternary',
);
</script>

<template>
  <label
    :for="id"
    :class="`group inline-flex items-center text-left ${cfg.gap}
      ${disabled ? 'cursor-not-allowed' : readonly ? 'cursor-default' : 'cursor-pointer'}`"
  >
    <!-- Hidden native input -->
    <input
      :id="id"
      type="checkbox"
      role="switch"
      :checked="checked"
      :disabled="disabled"
      :readonly="readonly"
      :aria-checked="checked"
      class="peer sr-only"
      @change="handleChange"
    />

    <!-- Visual track -->
    <span
      aria-hidden="true"
      :class="`relative inline-block shrink-0 rounded-circle ${cfg.track} ${trackBg}
        peer-focus-visible:shadow-focus-button-ring`"
    >
      <!-- Handle -->
      <span
        :class="`absolute ${cfg.padding} ${checked ? cfg.handleOn : cfg.handleOff}
          ${cfg.handle} rounded-circle ${handleBg}
          flex items-center justify-center
          transition-[left] duration-150 ease-in-out`"
      >
        <!-- Icon inside handle (md only) -->
        <template v-if="size === 'md' && showIcon">
          <svg
            v-if="checked"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            :class="handleIconColor"
            aria-hidden="true"
          >
            <path d="M6.5 11.5L3 8l1-1 2.5 2.5L12 4l1 1-6.5 6.5Z" fill="currentColor" />
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" :class="handleIconColor" aria-hidden="true">
            <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </template>
      </span>

      <!-- Interaction overlay -->
      <span
        v-if="!disabled && !readonly"
        class="pointer-events-none absolute inset-0 rounded-circle
          bg-interaction-neutral-normal
          group-hover:bg-interaction-neutral-hover
          group-active:bg-interaction-neutral-pressed"
      />
    </span>

    <!-- Label -->
    <span v-if="label" class="flex min-w-0 flex-1 flex-col justify-center gap-0.5 text-left">
      <span class="flex items-center gap-0.5">
        <span :class="`${cfg.title} ${disabled ? 'text-element-disabled' : 'text-element-primary'}`">
          {{ label }}
        </span>
        <IcTrigger
          v-if="helpIcon"
          :size="cfg.helpIconSize"
          :aria-label="helpAriaLabel"
          :disabled="disabled"
          @click="emit('helpClick')"
        >
          <IcHelp :size="cfg.helpIconSize" />
        </IcTrigger>
      </span>
      <span v-if="description" :class="`${cfg.description} text-element-tertiary`">{{ description }}</span>
    </span>
  </label>
</template>
