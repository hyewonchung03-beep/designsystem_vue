import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SplitButton from './SplitButton.vue';

const meta: Meta<typeof SplitButton> = {
  title: 'Pilot/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  argTypes: {
    showIcon: { control: 'boolean' },
    disabled: { control: 'boolean' },
    triggerOpen: { control: 'boolean' },
  },
  args: {
    label: 'Split button',
    showIcon: true,
    disabled: false,
    triggerOpen: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TriggerOpen: Story = {
  args: { triggerOpen: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithoutIcon: Story = {
  args: { showIcon: false },
};

export const WithIcon: Story = {
  render: (args) => ({
    components: { SplitButton },
    setup: () => ({ args }),
    template: `
      <SplitButton v-bind="args">
        <template #icon>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </template>
      </SplitButton>
    `,
  }),
};
