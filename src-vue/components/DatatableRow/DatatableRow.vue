<script lang="ts">
import type { DatatableCellProps } from '../DatatableCell/DatatableCell.vue';

export type DatatableRowState = 'enabled' | 'disabled' | 'selected';

export type DatatableRowProps = {
  cells?: DatatableCellProps[];
  showDivider?: boolean;
  showSelect?: boolean;
  selectChecked?: boolean;
  state?: DatatableRowState;
  className?: string;
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import DatatableCell from '../DatatableCell/DatatableCell.vue';
import DatatableSelectCell from '../DatatableSelectCell/DatatableSelectCell.vue';

const props = withDefaults(defineProps<DatatableRowProps>(), {
  showDivider: true,
  showSelect: false,
  selectChecked: false,
  state: 'enabled',
});

const emit = defineEmits<{ selectChange: [boolean] }>();

const isDisabled = computed(() => props.state === 'disabled');
const isSelected = computed(() => props.state === 'selected');

function handleSelectChange(checked: boolean) {
  emit('selectChange', checked);
}
</script>

<template>
  <div role="row" :class="`relative flex flex-col items-start text-left ${className ?? ''}`">
    <!-- Selected state background -->
    <span
      v-if="isSelected"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 overflow-clip bg-selected-container-variant"
    />

    <!-- Interaction overlay — hover/active only for non-disabled rows -->
    <span
      aria-hidden="true"
      :class="`pointer-events-none absolute inset-0 overflow-clip bg-interaction-neutral-normal${
        !isDisabled ? ' hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed' : ''
      }`"
    />

    <!-- Cells -->
    <div class="relative flex w-full shrink-0 items-center overflow-clip">
      <DatatableSelectCell
        v-if="showSelect"
        :checked="selectChecked"
        size="lg"
        aria-label="Select row"
        @change="handleSelectChange"
      />

      <!-- Data cells — dimmed for disabled state -->
      <div :class="`flex min-w-0 flex-1 items-center overflow-clip${isDisabled ? ' opacity-[0.36]' : ''}`">
        <slot>
          <DatatableCell
            v-for="(cellProps, idx) in cells"
            :key="idx"
            show-left-icon
            show-sub-text
            size="lg"
            v-bind="cellProps"
            :class-name="`flex-1 px-2 ${cellProps.className ?? ''}`"
          />
        </slot>
      </div>
    </div>

    <!-- Bottom divider -->
    <div v-if="showDivider" class="h-px w-full shrink-0 rounded-2 bg-border-solid-variant" />
  </div>
</template>
