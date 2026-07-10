import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Accordion from './Accordion.vue';
import AccordionPanelItem from './AccordionPanelItem.vue';

const meta: Meta<typeof Accordion> = {
  title: 'Pilot/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleExpand: Story = {
  render: () => ({
    components: { Accordion, AccordionPanelItem },
    setup: () => ({
      items: [
        { label: 'First item', defaultExpanded: true },
        { label: 'Second item' },
        { label: 'Disabled item', disabled: true },
      ],
    }),
    template: `
      <Accordion :items="items">
        <template #item-0><AccordionPanelItem>Content for the first item.</AccordionPanelItem></template>
        <template #item-1><AccordionPanelItem>Content for the second item.</AccordionPanelItem></template>
      </Accordion>
    `,
  }),
};

export const AllowMultiple: Story = {
  render: () => ({
    components: { Accordion, AccordionPanelItem },
    setup: () => ({
      items: [
        { label: 'Alpha', defaultExpanded: true },
        { label: 'Beta', defaultExpanded: true },
        { label: 'Gamma' },
      ],
    }),
    template: `
      <Accordion :items="items" allow-multiple>
        <template #item-0><AccordionPanelItem>Alpha content.</AccordionPanelItem></template>
        <template #item-1><AccordionPanelItem>Beta content.</AccordionPanelItem></template>
        <template #item-2><AccordionPanelItem>Gamma content.</AccordionPanelItem></template>
      </Accordion>
    `,
  }),
};
