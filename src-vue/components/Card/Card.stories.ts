import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Card from './Card.vue';

const meta: Meta<typeof Card> = {
  title: 'Pilot/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    thumbnailSrc: { control: 'text' },
    badgeLabel: { control: 'text' },
    showDragHandle: { control: 'boolean' },
  },
  args: {
    title: 'Card title',
    description: 'Card description goes here, up to three lines before it truncates.',
    showDragHandle: false,
  },
  decorators: [
    () => ({
      template: '<div style="width: 240px;"><story /></div>',
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithThumbnail: Story = {
  args: {
    thumbnailSrc: 'https://picsum.photos/seed/solum-card/240/131',
  },
};

export const WithBadge: Story = {
  args: {
    badgeLabel: 'NEW',
  },
};

export const WithDragHandle: Story = {
  args: {
    showDragHandle: true,
  },
};

export const NoDescription: Story = {
  args: {
    description: undefined,
  },
};

export const Clickable: Story = {
  render: (args) => ({
    components: { Card },
    setup: () => ({ args, onClick: () => alert('Card clicked') }),
    template: `<Card v-bind="args" @click="onClick" />`,
  }),
};

export const WithChildren: Story = {
  render: (args) => ({
    components: { Card },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args">
        <span class="text-text-xs leading-text-xs text-element-tertiary">Extra footer content</span>
      </Card>
    `,
  }),
};
