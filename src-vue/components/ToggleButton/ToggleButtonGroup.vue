<script lang="ts">
export type ToggleButtonItem = {
  label: string;
  badge?: number;
  showChevron?: boolean;
};
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ToggleButton from './ToggleButton.vue';

const props = defineProps<{
  items: ToggleButtonItem[];
  selectedIndex?: number;
}>();

const emit = defineEmits<{ select: [number] }>();

const internalIndex = ref(0);
const activeIndex = computed(() => props.selectedIndex ?? internalIndex.value);

function handleSelect(index: number) {
  emit('select', index);
  if (props.selectedIndex === undefined) {
    internalIndex.value = index;
  }
}
</script>

<template>
  <div class="flex items-center gap-2 py-2" role="radiogroup">
    <ToggleButton
      v-for="(item, index) in items"
      :key="index"
      :label="item.label"
      :selected="index === activeIndex"
      :badge="item.badge"
      :show-chevron="item.showChevron"
      @click="handleSelect(index)"
    />
  </div>
</template>
