<script lang="ts">
export type BannerColor = 'error' | 'warning' | 'brand' | 'announcement';
</script>

<script setup lang="ts">
import { ref, computed, useId } from 'vue';

const props = withDefaults(
  defineProps<{
    color?: BannerColor;
    heading?: string;
    actionLabel?: string;
    showIcon?: boolean;
    showAction?: boolean;
    showClose?: boolean;
  }>(),
  {
    color: 'error',
    heading: 'Heading',
    actionLabel: 'Button',
    showIcon: true,
    showAction: true,
    showClose: true,
  },
);

const emit = defineEmits<{ action: []; close: [] }>();

// ── Color config (Tailwind class lookup) ───────────────────────────────────

const bannerConfig: Record<
  BannerColor,
  { bg: string; fg: string; closeFg: string; icon: 'error' | 'warning' | 'responsive' | 'none' }
> = {
  error: { bg: 'bg-error', fg: 'text-element-inverse', closeFg: 'text-element-inverse-variant', icon: 'error' },
  warning: { bg: 'bg-warning', fg: 'text-element-primary', closeFg: 'text-element-primary', icon: 'warning' },
  brand: {
    bg: 'bg-element-brand-variant',
    fg: 'text-element-inverse',
    closeFg: 'text-element-inverse-variant',
    icon: 'responsive',
  },
  announcement: {
    bg: 'bg-surface-inverse',
    fg: 'text-element-inverse',
    closeFg: 'text-element-inverse-variant',
    icon: 'none',
  },
};

const visible = ref(true);
const labelId = useId();
const config = computed(() => bannerConfig[props.color]);
const isAlert = computed(() => props.color === 'error' || props.color === 'warning');

function handleClose() {
  visible.value = false;
  emit('close');
}
</script>

<template>
  <aside
    v-if="visible"
    :class="`flex w-full items-center justify-between overflow-hidden px-2.5 py-2 text-left ${config.bg} ${config.fg}`"
    :role="isAlert ? 'alert' : 'status'"
    :aria-labelledby="labelId"
  >
    <span class="size-4 shrink-0" aria-hidden="true" />

    <div class="flex min-w-0 items-center gap-2">
      <span v-if="showIcon && config.icon !== 'none'" class="flex size-5 shrink-0 items-center justify-center">
        <svg v-if="config.icon === 'responsive'" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M2.70801 15.0007V13.334H3.95801V15.0007C3.95801 15.5759 4.42438 16.0423 4.99967 16.0423H6.66634V17.2923H4.99967C3.73402 17.2923 2.70801 16.2663 2.70801 15.0007ZM11.6663 16.0423V17.2923H8.33301V16.0423H11.6663ZM16.0413 15.0007V13.334H17.2913V15.0007C17.2913 16.2663 16.2653 17.2923 14.9997 17.2923H13.333V16.0423H14.9997C15.575 16.0423 16.0413 15.5759 16.0413 15.0007ZM3.95801 8.33398V11.6673H2.70801V8.33398H3.95801ZM17.2913 8.33398V11.6673H16.0413V8.33398H17.2913ZM2.70801 5.00065C2.70801 3.735 3.73402 2.70898 4.99967 2.70898H6.66634V3.95898H4.99967C4.42438 3.95898 3.95801 4.42535 3.95801 5.00065V6.66732H2.70801V5.00065ZM16.0413 5.00065C16.0413 4.42535 15.575 3.95898 14.9997 3.95898H13.333V2.70898H14.9997C16.2653 2.70898 17.2913 3.735 17.2913 5.00065V6.66732H16.0413V5.00065ZM11.6663 2.70898V3.95898H8.33301V2.70898H11.6663Z"
            fill="currentColor"
          />
        </svg>
        <svg v-else-if="config.icon === 'warning'" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M7.05315 4.27375C8.36187 2.1444 11.398 2.07748 12.8149 4.07356L12.9467 4.27375L12.9622 4.30061L17.6871 12.9269C17.9921 13.432 18.2626 14.1372 18.0476 14.8784C17.6296 16.3196 16.3017 17.3752 14.7249 17.3752H5.27499C3.69817 17.3752 2.37021 16.3196 1.95224 14.8784C1.73729 14.1372 2.00779 13.432 2.31275 12.9269L7.03768 4.30061L7.05315 4.27375ZM11.8725 4.91421C11.0074 3.52893 8.99148 3.52869 8.12655 4.91421L3.40894 13.5275C3.40394 13.5366 3.39812 13.5455 3.39266 13.5544C3.15428 13.9422 3.07887 14.2755 3.15259 14.5301L3.20956 14.7002C3.52705 15.534 4.333 16.1252 5.27499 16.1252H14.7249C15.7296 16.1252 16.5798 15.4524 16.8473 14.5301C16.921 14.2755 16.8456 13.9422 16.6072 13.5544C16.6017 13.5455 16.5959 13.5366 16.5909 13.5275L11.8725 4.91421ZM9.37492 12.9399H10.6249V14.2233H9.37492V12.9399ZM9.37492 6.34976H10.6249V11.3848H9.37492V6.34976Z"
            fill="currentColor"
          />
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M16.4587 9.99935C16.4587 6.43251 13.5672 3.54102 10.0003 3.54102C6.43349 3.54102 3.54199 6.43251 3.54199 9.99935C3.54199 13.5662 6.43349 16.4577 10.0003 16.4577C13.5672 16.4577 16.4587 13.5662 16.4587 9.99935ZM9.37533 11.9997H10.6253V13.2806H9.37533V11.9997ZM9.37533 5.83268H10.6253V10.6243H9.37533V5.83268ZM17.7087 9.99935C17.7087 14.2565 14.2575 17.7077 10.0003 17.7077C5.74313 17.7077 2.29199 14.2565 2.29199 9.99935C2.29199 5.74215 5.74313 2.29102 10.0003 2.29102C14.2575 2.29102 17.7087 5.74215 17.7087 9.99935Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <strong :id="labelId" class="truncate text-left text-text-sm font-semibold leading-text-sm">
        {{ heading }}
      </strong>
      <button
        v-if="showAction"
        type="button"
        class="group relative shrink-0 text-text-sm font-semibold leading-text-sm underline
          focus-visible:outline-none focus-visible:shadow-focus-button-ring"
        @click="emit('action')"
      >
        <span class="absolute -inset-0.5 rounded-2 bg-interaction-inverse-normal group-hover:bg-interaction-inverse-hover group-active:bg-interaction-inverse-pressed" />
        <span class="relative">{{ actionLabel }}</span>
      </button>
    </div>

    <button
      v-if="showClose"
      type="button"
      :class="`flex size-4 shrink-0 items-center justify-center rounded-circle ${config.closeFg}
        focus-visible:outline-none focus-visible:shadow-focus-button-ring`"
      aria-label="Close banner"
      @click="handleClose"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M13.1201 3.93945L9.06087 7.9987L13.1201 12.0586L12.0596 13.1191L7.99967 9.0599L3.94043 13.1191L2.87988 12.0586L6.93848 7.9987L2.87988 3.93945L3.94043 2.87891L7.99967 6.9375L12.0596 2.87891L13.1201 3.93945Z"
          fill="currentColor"
        />
      </svg>
    </button>
    <span v-else class="size-4 shrink-0" aria-hidden="true" />
  </aside>
</template>
