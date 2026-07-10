<script setup lang="ts">
import IconButton from './components/IconButton/IconButton.vue';
import Accordion from './components/Accordion/Accordion.vue';
import AccordionPanelItem from './components/Accordion/AccordionPanelItem.vue';
import type { AccordionItemDef } from './components/Accordion/Accordion.vue';

const singleExpandItems: AccordionItemDef[] = [
  { label: 'First item', defaultExpanded: true },
  { label: 'Second item' },
  { label: 'Disabled item', disabled: true },
];

const multiExpandItems: AccordionItemDef[] = [
  { label: 'Alpha', defaultExpanded: true },
  { label: 'Beta', defaultExpanded: true },
  { label: 'Gamma' },
];
</script>

<template>
  <div class="mx-auto flex max-w-xl flex-col gap-10 p-8">
    <section class="flex flex-col gap-4">
      <h2 class="text-headline-sm font-semibold">IconButton pilot</h2>
      <div class="flex flex-wrap items-center gap-3">
        <IconButton size="sm" variant="primary" aria-label="primary sm">
          <template #icon>
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </template>
        </IconButton>
        <IconButton size="md" variant="secondary" button-style="circle" aria-label="secondary md circle" />
        <IconButton size="lg" variant="tertiary" aria-label="tertiary lg" />
        <IconButton size="md" variant="primary" disabled aria-label="disabled" />
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-headline-sm font-semibold">Accordion pilot — single expand</h2>
      <Accordion :items="singleExpandItems">
        <template #item-0><AccordionPanelItem>Content for the first item.</AccordionPanelItem></template>
        <template #item-1><AccordionPanelItem>Content for the second item.</AccordionPanelItem></template>
      </Accordion>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-headline-sm font-semibold">Accordion pilot — allow multiple</h2>
      <Accordion :items="multiExpandItems" allow-multiple>
        <template #item-0><AccordionPanelItem>Alpha content.</AccordionPanelItem></template>
        <template #item-1><AccordionPanelItem>Beta content.</AccordionPanelItem></template>
        <template #item-2><AccordionPanelItem>Gamma content.</AccordionPanelItem></template>
      </Accordion>
    </section>
  </div>
</template>
