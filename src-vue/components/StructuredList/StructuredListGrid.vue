<script lang="ts">
import type { StyleValue } from 'vue';
import type { StructuredListBodyCellProps } from './StructuredListBodyCell.vue';

export type StructuredListGridType = 'column' | 'row';

export type StructuredListGridProps = {
  type?: StructuredListGridType;
  showDivider?: boolean;
  showSelectCell?: boolean;
  selectCellChecked?: boolean;
  condensed?: boolean;
  // Optional callback form of the `selectChange` emit — Vue treats an
  // `onXxx`-named field as an event-listener attr automatically, so this
  // keeps `StructuredListPattern`'s `grids: StructuredListGridProps[]` array
  // able to wire a per-grid handler the same way the React `onSelectChange`
  // prop did, without StructuredListPattern needing to forward anything.
  onSelectChange?: (checked: boolean) => void;
  cells: StructuredListBodyCellProps[];
  class?: string;
  style?: StyleValue;
};
</script>

<script setup lang="ts">
import StructuredListBodyCell from './StructuredListBodyCell.vue';
import StructuredListSelectCell from './StructuredListSelectCell.vue';

withDefaults(defineProps<Omit<StructuredListGridProps, 'class'>>(), {
  type: 'column',
  showDivider: true,
  showSelectCell: false,
  selectCellChecked: false,
  condensed: false,
});

defineEmits<{ selectChange: [boolean] }>();
</script>

<template>
  <!-- ── Column type ── -->
  <div v-if="type === 'column'" class="flex items-start overflow-hidden text-left" :style="style">
    <div class="flex flex-1 flex-col min-w-0 self-stretch">
      <template v-for="(cellProps, i) in cells" :key="i">
        <StructuredListBodyCell v-bind="cellProps" />
        <div v-if="i < cells.length - 1" class="h-px w-full shrink-0 bg-border-solid-variant" />
      </template>
    </div>

    <div v-if="showDivider" class="w-px self-stretch shrink-0 bg-border-solid-variant" />
  </div>

  <!-- ── Row type ── -->
  <div v-else class="flex flex-col overflow-hidden w-full text-left" :style="style">
    <div class="flex items-start w-full shrink-0">
      <StructuredListSelectCell
        v-if="showSelectCell"
        :condensed="condensed"
        :checked="selectCellChecked"
        @change="$emit('selectChange', $event)"
      />
      <div class="flex flex-1 min-w-0 items-start">
        <StructuredListBodyCell
          v-for="(cellProps, i) in cells"
          :key="i"
          class="flex-1"
          v-bind="cellProps"
        />
      </div>
    </div>

    <div v-if="showDivider" class="h-px w-full shrink-0 bg-border-solid-variant" />
  </div>
</template>
