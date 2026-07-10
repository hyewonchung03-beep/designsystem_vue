import type { Meta, StoryObj } from '@storybook/vue3-vite';
import IconButton from './IconButton.vue';

const meta: Meta<typeof IconButton> = {
  title: 'Pilot/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    buttonStyle: { control: 'select', options: ['square', 'circle'] },
    disabled: { control: 'boolean' },
  },
  args: {
    ariaLabel: 'icon button',
    variant: 'primary',
    size: 'md',
    buttonStyle: 'square',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary' },
};

export const Circle: Story = {
  args: { buttonStyle: 'circle' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithIcon: Story = {
  render: (args) => ({
    components: { IconButton },
    setup: () => ({ args }),
    template: `
      <IconButton v-bind="args">
        <template #icon>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </template>
      </IconButton>
    `,
  }),
};
