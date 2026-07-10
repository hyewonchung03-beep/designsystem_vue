import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CardItem from './CardItem.vue';

const meta: Meta<typeof CardItem> = {
  title: 'Pilot/CardItem',
  component: CardItem,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['horizontal', 'vertical'] },
    size: { control: 'select', options: ['sm', 'md'] },
    state: { control: 'select', options: ['enabled', 'disabled'] },
    badgeOption: {
      control: 'select',
      options: ['red', 'orange', 'yellow', 'green', 'teal', 'lightBlue', 'indigo', 'pink', 'purple', 'neutral'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    thumbnailSrc: { control: 'text' },
    badgeLabel: { control: 'text' },
    dateText: { control: 'text' },
    showThumbnail: { control: 'boolean' },
    showMeta: { control: 'boolean' },
    showDescription: { control: 'boolean' },
  },
  args: {
    title: 'Card item title',
    description: 'Card item description, may span up to a few lines.',
    badgeLabel: 'Label',
    dateText: '2026.07.08',
    type: 'horizontal',
    size: 'md',
    state: 'enabled',
    showThumbnail: true,
    showMeta: true,
    showDescription: true,
  },
  decorators: [
    () => ({
      template: '<div style="width: 360px;"><story /></div>',
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: { type: 'vertical' },
  decorators: [
    () => ({
      template: '<div style="width: 260px;"><story /></div>',
    }),
  ],
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Disabled: Story = {
  args: { state: 'disabled' },
};

export const NoThumbnail: Story = {
  args: { showThumbnail: false },
};

export const WithThumbnail: Story = {
  args: { thumbnailSrc: 'https://picsum.photos/seed/solum-carditem/240/160' },
};

export const NoMeta: Story = {
  args: { showMeta: false },
};

export const NoDescription: Story = {
  args: { showDescription: false },
};

export const Clickable: Story = {
  render: (args) => ({
    components: { CardItem },
    setup: () => ({ args, onClick: () => alert('CardItem clicked') }),
    template: `<CardItem v-bind="args" @click="onClick" />`,
  }),
};

export const VerticalGrid: Story = {
  render: (args) => ({
    components: { CardItem },
    setup: () => ({ args }),
    template: `
      <div class="flex gap-sol-16">
        <div style="width: 200px;"><CardItem v-bind="args" type="vertical" /></div>
        <div style="width: 200px;"><CardItem v-bind="args" type="vertical" size="sm" /></div>
      </div>
    `,
  }),
};
