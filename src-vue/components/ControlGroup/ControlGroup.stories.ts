import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ControlGroup from './ControlGroup.vue';
import Checkbox from '../Checkbox/Checkbox.vue';

const meta: Meta<typeof ControlGroup> = {
  title: 'Pilot/ControlGroup',
  component: ControlGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    columns: { control: 'select', options: [1, 2, 3] },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    legend: 'Legend',
    required: false,
    error: false,
    disabled: false,
    orientation: 'vertical',
    columns: 1,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const withCheckboxes = (args: Record<string, unknown>) => ({
  components: { ControlGroup, Checkbox },
  setup: () => ({ args }),
  template: `
    <ControlGroup v-bind="args">
      <Checkbox label="Option A" />
      <Checkbox label="Option B" />
      <Checkbox label="Option C" />
    </ControlGroup>
  `,
});

export const Vertical: Story = {
  render: withCheckboxes,
};

export const Required: Story = {
  args: { required: true },
  render: withCheckboxes,
};

export const HorizontalLayout: Story = {
  args: { orientation: 'horizontal' },
  render: withCheckboxes,
};

export const TwoColumns: Story = {
  args: { columns: 2 },
  render: withCheckboxes,
};

export const ThreeColumns: Story = {
  args: { columns: 3 },
  render: withCheckboxes,
};

export const WithHelperText: Story = {
  args: { helperText: 'Select at least one option.' },
  render: withCheckboxes,
};

export const ErrorState: Story = {
  args: { error: true, helperText: 'This field is required.' },
  render: withCheckboxes,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: withCheckboxes,
};
