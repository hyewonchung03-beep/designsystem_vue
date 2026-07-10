import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Spinner from './Spinner.vue';

const meta: Meta<typeof Spinner> = {
  title: 'Pilot/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    labelPosition: { control: 'select', options: ['below', 'right'] },
    inverse: { control: 'boolean' },
    showLoaderText: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    size: 'sm',
    labelPosition: 'below',
    inverse: false,
    showLoaderText: true,
    label: 'Loading',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const LabelRight: Story = {
  args: { labelPosition: 'right' },
};

export const NoLabel: Story = {
  args: { showLoaderText: false },
};

export const Inverse: Story = {
  args: { inverse: true },
  render: (args) => ({
    components: { Spinner },
    setup: () => ({ args }),
    template: `<div style="background: var(--sol-surface-inverse, #1b1b1f); padding: 16px; display: inline-flex;"><Spinner v-bind="args" /></div>`,
  }),
};
