import type { Meta, StoryObj } from '@storybook/vue3-vite';
import StructuredListSelectCell from './StructuredListSelectCell.vue';

const meta: Meta<typeof StructuredListSelectCell> = {
  title: 'Pilot/StructuredList/StructuredListSelectCell',
  component: StructuredListSelectCell,
  tags: ['autodocs'],
  argTypes: {
    condensed: { control: 'boolean' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    condensed: false,
    checked: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Condensed: Story = {
  args: { condensed: true },
};

export const CondensedChecked: Story = {
  args: { condensed: true, checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

export const Interactive: Story = {
  render: (args) => ({
    components: { StructuredListSelectCell },
    setup: () => ({ args }),
    data: () => ({ checked: args.checked ?? false }),
    template: `
      <StructuredListSelectCell
        v-bind="args"
        :checked="checked"
        @change="checked = $event"
      />
    `,
  }),
};
