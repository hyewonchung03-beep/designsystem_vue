import type { Meta, StoryObj } from '@storybook/vue3-vite';
import MenuItem from './MenuItem.vue';

const meta: Meta<typeof MenuItem> = {
  title: 'Pilot/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'danger'] },
    selected: { control: 'boolean' },
  },
  args: {
    label: 'Menu item',
    variant: 'default',
    selected: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const Danger: Story = {
  args: { variant: 'danger', label: 'Delete' },
};

export const WithSublabel: Story = {
  args: { sublabel: '⌘K' },
};

export const WithLeadingIcon: Story = {
  render: (args) => ({
    components: { MenuItem },
    setup: () => ({ args }),
    template: `
      <MenuItem v-bind="args">
        <template #leadingIcon>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </template>
      </MenuItem>
    `,
  }),
};
