import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Sidesheet from './Sidesheet.vue';

const meta: Meta<typeof Sidesheet> = {
  title: 'Pilot/Sidesheet/Sidesheet',
  component: Sidesheet,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    showFooter: { control: 'boolean' },
    showCancelBtn: { control: 'boolean' },
    showActionBtn: { control: 'boolean' },
    showHeaderDivider: { control: 'boolean' },
    showFooterDivider: { control: 'boolean' },
    showLeadingIcon: { control: 'boolean' },
    showExtraIcon: { control: 'boolean' },
  },
  args: {
    size: 'sm',
    showFooter: false,
    cancelLabel: 'Cancel',
    actionLabel: 'Action',
    showCancelBtn: true,
    showActionBtn: true,
    showHeaderDivider: false,
    showFooterDivider: false,
    showLeadingIcon: false,
    showExtraIcon: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Sidesheet },
    setup: () => ({ args }),
    template: `
      <Sidesheet v-bind="args">
        <template #title>Sidesheet title</template>
        <p style="font-size: var(--sol-font-size-text-sm); line-height: var(--sol-line-height-text-sm);">
          Sidesheet body content goes here.
        </p>
      </Sidesheet>
    `,
  }),
};

export const WithFooter: Story = {
  args: { showFooter: true },
  render: (args) => ({
    components: { Sidesheet },
    setup: () => ({ args }),
    template: `
      <Sidesheet v-bind="args">
        <template #title>Sidesheet with footer</template>
        <p style="font-size: var(--sol-font-size-text-sm); line-height: var(--sol-line-height-text-sm);">
          Sidesheet body content goes here.
        </p>
      </Sidesheet>
    `,
  }),
};

export const MediumSizeWithFooter: Story = {
  args: { size: 'md', showFooter: true, showHeaderDivider: true, showFooterDivider: true },
  render: (args) => ({
    components: { Sidesheet },
    setup: () => ({ args }),
    template: `
      <Sidesheet v-bind="args">
        <template #title>Medium sidesheet</template>
        <p style="font-size: var(--sol-font-size-text-sm); line-height: var(--sol-line-height-text-sm);">
          Sidesheet body content goes here.
        </p>
      </Sidesheet>
    `,
  }),
};

export const WithLeadingIcon: Story = {
  args: { showLeadingIcon: true },
  render: (args) => ({
    components: { Sidesheet },
    setup: () => ({ args }),
    template: `
      <Sidesheet v-bind="args">
        <template #title>Sidesheet with leading icon</template>
        <template #leadingIcon>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </template>
        <p style="font-size: var(--sol-font-size-text-sm); line-height: var(--sol-line-height-text-sm);">
          Sidesheet body content goes here.
        </p>
      </Sidesheet>
    `,
  }),
};
