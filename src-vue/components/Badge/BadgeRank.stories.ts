import type { Meta, StoryObj } from '@storybook/vue3-vite';
import BadgeRank from './BadgeRank.vue';

const meta: Meta<typeof BadgeRank> = {
  title: 'Pilot/Badge/BadgeRank',
  component: BadgeRank,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['gold', 'silver', 'bronze', 'default'] },
    size: { control: 'number' },
  },
  args: {
    type: 'default',
    size: 24,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gold: Story = {
  args: { type: 'gold' },
};

export const Silver: Story = {
  args: { type: 'silver' },
};

export const Bronze: Story = {
  args: { type: 'bronze' },
};

export const AllRanks: Story = {
  render: (args) => ({
    components: { BadgeRank },
    setup: () => ({ args, types: ['gold', 'silver', 'bronze', 'default'] }),
    template: `
      <div class="flex items-center gap-sol-8">
        <BadgeRank v-for="type in types" :key="type" v-bind="args" :type="type" />
      </div>
    `,
  }),
};
