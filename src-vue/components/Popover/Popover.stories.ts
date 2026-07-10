import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Popover from './Popover.vue';

const meta: Meta<typeof Popover> = {
  title: 'Pilot/Popover/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['md', 'lg'] },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    showHeader: { control: 'boolean' },
    showFooter: { control: 'boolean' },
    showScroll: { control: 'boolean' },
    showSlot: { control: 'boolean' },
  },
  args: {
    size: 'md',
    placement: 'bottom',
    showHeader: true,
    showFooter: true,
    showScroll: true,
    showSlot: true,
    cancelLabel: 'Cancel',
    actionLabel: 'Action',
    skipLabel: 'Skip',
    stepLabel: '1/5',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LargeWithStep: Story = {
  args: { size: 'lg' },
};

export const WithoutHeader: Story = {
  args: { showHeader: false },
};

export const WithoutFooter: Story = {
  args: { showFooter: false },
};

export const CustomTitleAndContent: Story = {
  render: (args) => ({
    components: { Popover },
    setup: () => ({ args }),
    template: `
      <Popover v-bind="args">
        <template #title>Custom title</template>
        <p style="font-size: var(--sol-font-size-text-xs); line-height: var(--sol-line-height-text-xs);">
          Custom popover content.
        </p>
      </Popover>
    `,
  }),
};

export const PlacementTop: Story = {
  args: { placement: 'top' },
};

export const PlacementLeft: Story = {
  args: { placement: 'left' },
};

export const PlacementRight: Story = {
  args: { placement: 'right' },
};
