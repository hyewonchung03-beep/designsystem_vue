<script lang="ts">
export type DatatableSelectCellSize = 'sm' | 'lg';

export type DatatableSelectCellProps = {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  size?: DatatableSelectCellSize;
  className?: string;
  ariaLabel?: string;
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import Checkbox from '../Checkbox/Checkbox.vue';
import type { CheckboxSize } from '../Checkbox/Checkbox.vue';

const props = withDefaults(defineProps<DatatableSelectCellProps>(), {
  checked: false,
  indeterminate: false,
  disabled: false,
  size: 'lg',
  ariaLabel: 'Select row',
});

const emit = defineEmits<{ change: [boolean] }>();

// ── Size config ──────────────────────────────────────────────────────────────

const cellConfig: Record<DatatableSelectCellSize, { padding: string; checkboxSize: CheckboxSize }> = {
  sm: { padding: 'py-1', checkboxSize: 'sm' },
  lg: { padding: 'py-3', checkboxSize: 'sm' },
};

const cfg = computed(() => cellConfig[props.size]);

function handleChange(value: boolean) {
  emit('change', value);
}
</script>

<template>
  <div :class="`flex w-14 items-center justify-center text-left ${cfg.padding} ${className ?? ''}`">
    <Checkbox
      :size="cfg.checkboxSize"
      :checked="checked"
      :indeterminate="indeterminate"
      :disabled="disabled"
      :aria-label="ariaLabel"
      @change="handleChange"
    />
  </div>
</template>
