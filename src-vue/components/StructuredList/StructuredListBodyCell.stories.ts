import type { Meta, StoryObj } from '@storybook/vue3-vite';
import StructuredListBodyCell from './StructuredListBodyCell.vue';

const meta: Meta<typeof StructuredListBodyCell> = {
  title: 'Pilot/StructuredList/StructuredListBodyCell',
  component: StructuredListBodyCell,
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'select', options: ['left', 'center', 'right'] },
    condensed: { control: 'boolean' },
    custom: { control: 'boolean' },
    showText: { control: 'boolean' },
    showSubText: { control: 'boolean' },
    showLeftIcon: { control: 'boolean' },
    showTrendIndicator: { control: 'boolean' },
    trendDirection: { control: 'select', options: ['up', 'down'] },
    textType: { control: 'select', options: ['regular', 'semibold', 'null'] },
    textSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    text: 'Content',
    subText: 'Data',
    align: 'left',
    condensed: false,
    custom: false,
    showText: true,
    showSubText: false,
    showLeftIcon: false,
    showTrendIndicator: false,
    trendValue: 'N%',
    trendDirection: 'up',
    textType: 'regular',
    textSize: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {};

export const Center: Story = {
  args: { align: 'center' },
};

export const Right: Story = {
  args: { align: 'right' },
};

export const WithSubText: Story = {
  args: { showSubText: true },
};

export const WithLeadingIcon: Story = {
  args: { showLeftIcon: true },
};

export const WithTrendIndicator: Story = {
  args: { showTrendIndicator: true, trendValue: '12%' },
};

export const Condensed: Story = {
  args: { condensed: true, showSubText: true, showTrendIndicator: true },
};

export const SemiboldLarge: Story = {
  args: { textType: 'semibold', textSize: 'lg' },
};

export const NullValue: Story = {
  args: { textType: 'null' },
};

export const CustomSlot: Story = {
  args: { custom: true, align: 'center' },
  render: (args) => ({
    components: { StructuredListBodyCell },
    setup: () => ({ args }),
    template: `
      <StructuredListBodyCell v-bind="args">
        <div class="flex items-center gap-2">
          <span class="size-2 rounded-full bg-tertiary" />
          <span class="text-text-sm leading-text-sm text-element-primary">Custom content</span>
        </div>
      </StructuredListBodyCell>
    `,
  }),
};
