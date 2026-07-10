import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue';
import DropdownGroupLabel from './DropdownGroupLabel.vue';
import DropdownFooter from './DropdownFooter.vue';

const meta: Meta<typeof Dropdown> = {
  title: 'Pilot/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    compact: { control: 'boolean' },
  },
  args: {
    compact: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Dropdown, DropdownItem },
    setup: () => ({ args }),
    template: `
      <Dropdown v-bind="args">
        <DropdownItem label="Option one" />
        <DropdownItem label="Option two" selected />
        <DropdownItem label="Option three" />
        <DropdownItem label="Disabled option" disabled />
      </Dropdown>
    `,
  }),
};

export const WithDescription: Story = {
  render: (args) => ({
    components: { Dropdown, DropdownItem },
    setup: () => ({ args }),
    template: `
      <Dropdown v-bind="args">
        <DropdownItem label="Owner" description="Full access to this workspace" selected />
        <DropdownItem label="Editor" description="Can edit but not manage members" />
        <DropdownItem label="Viewer" description="Read-only access" />
      </Dropdown>
    `,
  }),
};

export const CheckboxType: Story = {
  render: (args) => ({
    components: { Dropdown, DropdownItem },
    setup: () => ({ args }),
    template: `
      <Dropdown v-bind="args">
        <DropdownItem type="checkbox" label="Apples" selected />
        <DropdownItem type="checkbox" label="Bananas" selected />
        <DropdownItem type="checkbox" label="Cherries" />
      </Dropdown>
    `,
  }),
};

export const WithGroupLabel: Story = {
  render: (args) => ({
    components: { Dropdown, DropdownItem, DropdownGroupLabel },
    setup: () => ({ args }),
    template: `
      <Dropdown v-bind="args">
        <DropdownGroupLabel label="Fruits" :compact="args.compact" />
        <DropdownItem label="Apples" />
        <DropdownItem label="Bananas" />
        <DropdownGroupLabel label="Vegetables" :compact="args.compact" />
        <DropdownItem label="Carrots" />
        <DropdownItem label="Peas" />
      </Dropdown>
    `,
  }),
};

export const WithFooterControl: Story = {
  render: (args) => ({
    components: { Dropdown, DropdownItem, DropdownFooter },
    setup: () => ({ args }),
    template: `
      <div>
        <Dropdown v-bind="args">
          <DropdownItem label="Option one" selected />
          <DropdownItem label="Option two" />
        </Dropdown>
        <DropdownFooter />
      </div>
    `,
  }),
};

export const WithFooterAdd: Story = {
  render: () => ({
    components: { Dropdown, DropdownItem, DropdownFooter },
    template: `
      <div>
        <Dropdown :compact="false">
          <DropdownItem label="Option one" />
          <DropdownItem label="Option two" />
        </Dropdown>
        <DropdownFooter variant="add" add-label="Add new item" />
      </div>
    `,
  }),
};
