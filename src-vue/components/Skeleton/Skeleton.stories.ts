import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Skeleton from './Skeleton.vue';
import SkeletonItem from './SkeletonItem.vue';

const meta: Meta<typeof Skeleton> = {
  title: 'Pilot/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['card', 'text', 'bar'] },
  },
  args: {
    variant: 'card',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {};

export const Text: Story = {
  args: { variant: 'text' },
};

export const Bar: Story = {
  args: { variant: 'bar' },
};

export const ItemTypes: Story = {
  render: () => ({
    components: { SkeletonItem },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <SkeletonItem type="bar" item-class="w-[120px]" />
        <SkeletonItem type="rectangle" />
        <SkeletonItem type="circle" />
      </div>
    `,
  }),
};
