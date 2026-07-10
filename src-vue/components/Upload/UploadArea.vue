<script lang="ts">
export type UploadAreaState = 'default' | 'disabled' | 'drag-active';

export type UploadAreaProps = {
  hint?: string;
  browseLabel?: string;
  showHint?: boolean;
  state?: UploadAreaState;
  class?: string;
};

const STATE_STYLE: Record<UploadAreaState, { wrapper: string; icon: string; text: string; hint: string }> = {
  default: {
    wrapper: 'bg-surface-container',
    icon: 'text-element-quaternary',
    text: 'text-element-tertiary',
    hint: 'text-element-tertiary',
  },
  disabled: {
    wrapper: 'bg-surface-container pointer-events-none',
    icon: 'text-element-disabled',
    text: 'text-element-disabled',
    hint: 'text-element-disabled',
  },
  'drag-active': {
    wrapper: 'bg-tertiary-container',
    icon: 'text-element-quaternary',
    text: 'text-element-tertiary',
    hint: 'text-element-tertiary',
  },
};

const STROKE_VAR: Record<UploadAreaState, string> = {
  default: 'var(--sol-border-normal)',
  disabled: 'var(--sol-border-disabled)',
  'drag-active': 'var(--sol-tertiary)',
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BtnIcon from '../Button/BtnIcon.vue';

const props = withDefaults(
  defineProps<UploadAreaProps>(),
  {
    hint: "'JPG or PNG' image with a size of '240 × 240px', up to '50KB'",
    browseLabel: 'Browse File',
    showHint: true,
    state: 'default',
    class: '',
  },
);

const emit = defineEmits<{ change: [FileList] }>();

const inputRef = ref<HTMLInputElement | null>(null);

const disabled = computed(() => props.state === 'disabled');
const stateStyle = computed(() => STATE_STYLE[props.state]);
const strokeColor = computed(() => STROKE_VAR[props.state]);

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files?.length) emit('change', target.files);
}

function handleDrop(e: DragEvent) {
  e.preventDefault();
  if (disabled.value) return;
  if (e.dataTransfer?.files?.length) emit('change', e.dataTransfer.files);
}

function handleDragOver(e: DragEvent) {
  e.preventDefault();
}

function handleBrowseClick() {
  inputRef.value?.click();
}
</script>

<template>
  <div
    :class="[
      'relative flex w-full flex-col items-center justify-center rounded-4 text-left',
      stateStyle.wrapper,
      props.class,
    ]"
    style="padding: var(--sol-spacing-24)"
    @drop="!disabled && handleDrop($event)"
    @dragover="!disabled && handleDragOver($event)"
  >
    <!-- SVG dashed border — Dash=3, Gap=3, Weight=2, Inside position -->
    <svg class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <rect
        x="1"
        y="1"
        rx="3"
        ry="3"
        fill="none"
        stroke-width="2"
        stroke-dasharray="3 3"
        stroke-linecap="butt"
        :style="{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)', stroke: strokeColor }"
      />
    </svg>

    <!-- Upload cloud icon — gap 6px below via marginBottom -->
    <span
      :class="stateStyle.icon"
      style="display: block; width: 24px; height: 24px; margin-bottom: var(--sol-spacing-6)"
      aria-hidden="true"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M11.5723 13.8105L8.54395 16.8389L7.4834 15.7773L11.791 11.4697L11.9053 11.376C12.0277 11.2943 12.173 11.25 12.3223 11.25C12.521 11.2501 12.712 11.3292 12.8525 11.4697L17.1602 15.7773L16.0996 16.8389L13.0723 13.8115V21.25H11.5723V13.8105ZM2.12695 10.583C2.12713 6.25704 5.63399 2.75018 9.95996 2.75C12.8031 2.75 15.2903 4.26597 16.6621 6.5293C19.9033 6.57779 22.5156 9.21992 22.5156 12.4727C22.5155 14.3187 21.6732 15.9686 20.3545 17.0576L19.3994 15.9014C20.3878 15.0851 21.0155 13.8524 21.0156 12.4727C21.0156 10.0181 19.0259 8.02734 16.5713 8.02734C16.1643 8.02731 15.7752 7.84201 15.5215 7.51953L15.4209 7.37305C14.3185 5.50246 12.285 4.25 9.95996 4.25C6.46242 4.25018 3.62713 7.08546 3.62695 10.583C3.62695 12.3279 4.33156 13.9074 5.47363 15.0537L4.41113 16.1123C3.00037 14.6964 2.12695 12.7407 2.12695 10.583Z"
          fill="currentColor"
        />
      </svg>
    </span>

    <!-- Text group: text+button row and hint, gap 4px between them -->
    <div class="flex flex-col items-center" style="gap: var(--sol-spacing-4)">
      <!-- "Drag & drop..." text + Browse File button, gap 4px -->
      <div class="flex flex-wrap items-center justify-center" style="gap: var(--sol-spacing-4)">
        <span
          :class="stateStyle.text"
          style="font-size: var(--sol-font-size-text-sm); line-height: var(--sol-line-height-text-sm)"
        >
          Drag & drop files here or
        </span>
        <span class="[&>button]:h-auto [&>button]:min-h-0 [&>button]:p-0.5">
          <BtnIcon
            style-type="link"
            type="primary"
            size="md"
            :label="browseLabel"
            :state="disabled ? 'disabled' : 'enabled'"
            :show-left-icon="false"
            @click="handleBrowseClick"
          />
        </span>
      </div>

      <!-- Hint text -->
      <p
        v-if="showHint && hint"
        :class="['text-center', stateStyle.hint]"
        style="font-size: var(--sol-font-size-text-xxs); line-height: var(--sol-line-height-text-xxs)"
      >
        {{ hint }}
      </p>
    </div>

    <input
      ref="inputRef"
      type="file"
      :disabled="disabled"
      class="hidden"
      aria-label="파일 업로드"
      @change="handleChange"
    />
  </div>
</template>
