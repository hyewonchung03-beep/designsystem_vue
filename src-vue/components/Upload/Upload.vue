<script lang="ts">
import type { UploadAreaState } from './UploadArea.vue';
import type { UploadItemState } from './UploadItem.vue';

export type UploadFileItem = {
  id: string;
  fileName: string;
  fileSize: string;
  timeLeft?: string;
  showSubtext?: boolean;
  value: number;
  state: UploadItemState;
  onPause?: () => void;
  onRemove?: () => void;
};

export type UploadProps = {
  hint?: string;
  browseLabel?: string;
  barState?: UploadAreaState;
  files?: UploadFileItem[];
  class?: string;
};
</script>

<script setup lang="ts">
import UploadArea from './UploadArea.vue';
import UploadItem from './UploadItem.vue';

const props = withDefaults(defineProps<UploadProps>(), {
  barState: 'default',
  files: () => [],
  class: '',
});

const emit = defineEmits<{ change: [FileList] }>();
</script>

<template>
  <div :class="['flex w-full flex-col text-left', props.class]" style="gap: var(--sol-spacing-8)">
    <UploadArea :hint="hint" :browse-label="browseLabel" :state="barState" @change="emit('change', $event)" />
    <div v-if="files.length > 0" class="flex w-full flex-col" style="gap: var(--sol-spacing-8)">
      <UploadItem
        v-for="file in files"
        :key="file.id"
        :file-name="file.fileName"
        :file-size="file.fileSize"
        :time-left="file.timeLeft"
        :show-subtext="file.showSubtext"
        :value="file.value"
        :state="file.state"
        @pause="file.onPause?.()"
        @remove="file.onRemove?.()"
      />
    </div>
  </div>
</template>
