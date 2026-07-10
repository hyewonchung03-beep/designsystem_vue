<script lang="ts">
export type AccordionSize = 'sm' | 'md' | 'lg';

export type AccordionItemDef = {
  label: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import AccordionItem from './AccordionItem.vue';

withDefaults(
  defineProps<{
    items: AccordionItemDef[];
    size?: AccordionSize;
    showDivider?: boolean;
    allowMultiple?: boolean;
  }>(),
  { size: 'lg', showDivider: true, allowMultiple: false },
);

const itemRefs = ref<(InstanceType<typeof AccordionItem> | null)[]>([]);

function handleOpen(index: number, allowMultiple: boolean) {
  if (allowMultiple) return;
  itemRefs.value.forEach((item, i) => {
    if (i !== index) item?.close();
  });
}
</script>

<template>
  <div class="flex w-full flex-col" role="group">
    <AccordionItem
      v-for="(item, index) in items"
      :key="item.label + index"
      :ref="(el) => (itemRefs[index] = el as InstanceType<typeof AccordionItem> | null)"
      :label="item.label"
      :disabled="item.disabled"
      :default-expanded="item.defaultExpanded"
      :size="size"
      :show-divider="showDivider"
      @open="handleOpen(index, allowMultiple)"
    >
      <slot :name="`item-${index}`" />
    </AccordionItem>
  </div>
</template>
