import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Switch from './Switch.vue';

const meta: Meta<typeof Switch> = {
  title: 'Pilot/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    helpIcon: { control: 'boolean' },
  },
  args: {
    label: 'Switch label',
    size: 'sm',
    checked: false,
    disabled: false,
    readonly: false,
    showIcon: false,
    helpIcon: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Medium: Story = {
  args: { size: 'md', checked: true },
};

export const MediumWithIcon: Story = {
  args: { size: 'md', checked: true, showIcon: true },
};

export const MediumWithIconUnchecked: Story = {
  args: { size: 'md', checked: false, showIcon: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

export const Readonly: Story = {
  args: { readonly: true, checked: true },
};

export const WithDescription: Story = {
  args: {
    checked: true,
    description: 'Additional context describing this switch option.',
  },
};

export const WithHelpIcon: Story = {
  args: {
    helpIcon: true,
    helpAriaLabel: '도움말',
  },
};

export const NoLabel: Story = {
  args: { label: undefined, checked: true },
};

export const Uncontrolled: Story = {
  render: (args) => ({
    components: { Switch },
    setup: () => {
      const checked = ref(false);
      return { args, checked };
    },
    template: `<Switch v-bind="args" :checked="checked" @change="checked = $event" />`,
  }),
};
