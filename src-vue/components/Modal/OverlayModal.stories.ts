import type { Meta, StoryObj } from '@storybook/vue3-vite';
import OverlayModal from './OverlayModal.vue';

const meta: Meta<typeof OverlayModal> = {
  title: 'Pilot/Modal/OverlayModal',
  component: OverlayModal,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    align: { control: 'select', options: ['left', 'center'] },
    type: { control: 'select', options: ['web', 'mobile'] },
    width: { control: 'select', options: [360, 480, 768, 1024] },
    showCancelBtn: { control: 'boolean' },
    showActionBtn: { control: 'boolean' },
    showHeaderDivider: { control: 'boolean' },
    showFooterDivider: { control: 'boolean' },
    showLeadingIcon: { control: 'boolean' },
    showExtraIcon: { control: 'boolean' },
    showLeftAction: { control: 'boolean' },
    showLinkBtn: { control: 'boolean' },
    showStep: { control: 'boolean' },
  },
  args: {
    size: 'md',
    align: 'left',
    type: 'web',
    width: 480,
    cancelLabel: 'Cancel',
    actionLabel: 'Action',
    showCancelBtn: true,
    showActionBtn: true,
    showHeaderDivider: false,
    showFooterDivider: false,
    showLeadingIcon: false,
    showExtraIcon: false,
    showLeftAction: false,
    showLinkBtn: false,
    linkLabel: 'label',
    showStep: false,
    step: '1/5',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { OverlayModal },
    setup: () => ({ args }),
    template: `
      <OverlayModal v-bind="args">
        <template #title>Modal title</template>
        <p style="font-size: var(--sol-font-size-text-sm); line-height: var(--sol-line-height-text-sm);">
          Modal body content goes here.
        </p>
      </OverlayModal>
    `,
  }),
};

export const WithoutFooterButtons: Story = {
  args: { showCancelBtn: false, showActionBtn: false },
  render: (args) => ({
    components: { OverlayModal },
    setup: () => ({ args }),
    template: `
      <OverlayModal v-bind="args">
        <template #title>No footer buttons</template>
        <p style="font-size: var(--sol-font-size-text-sm); line-height: var(--sol-line-height-text-sm);">
          Modal body content goes here.
        </p>
      </OverlayModal>
    `,
  }),
};

export const WithLeadingIcon: Story = {
  args: { showLeadingIcon: true, showHeaderDivider: true },
  render: (args) => ({
    components: { OverlayModal },
    setup: () => ({ args }),
    template: `
      <OverlayModal v-bind="args">
        <template #title>Modal with leading icon</template>
        <template #leadingIcon>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </template>
        <p style="font-size: var(--sol-font-size-text-sm); line-height: var(--sol-line-height-text-sm);">
          Modal body content goes here.
        </p>
      </OverlayModal>
    `,
  }),
};

export const CenterAligned: Story = {
  args: { align: 'center' },
  render: (args) => ({
    components: { OverlayModal },
    setup: () => ({ args }),
    template: `
      <OverlayModal v-bind="args">
        <template #title>Center aligned title</template>
        <p style="font-size: var(--sol-font-size-text-sm); line-height: var(--sol-line-height-text-sm); text-align: center;">
          Modal body content goes here.
        </p>
      </OverlayModal>
    `,
  }),
};

export const MobileType: Story = {
  args: { type: 'mobile', width: 360 },
  render: (args) => ({
    components: { OverlayModal },
    setup: () => ({ args }),
    template: `
      <OverlayModal v-bind="args">
        <template #title>Mobile modal</template>
        <p style="font-size: var(--sol-font-size-text-sm); line-height: var(--sol-line-height-text-sm);">
          Modal body content goes here.
        </p>
      </OverlayModal>
    `,
  }),
};

export const WithLinkAndStep: Story = {
  args: { showLeftAction: true, showLinkBtn: true, showStep: true, linkLabel: 'Skip', step: '2/5' },
  render: (args) => ({
    components: { OverlayModal },
    setup: () => ({ args }),
    template: `
      <OverlayModal v-bind="args">
        <template #title>Step modal</template>
        <p style="font-size: var(--sol-font-size-text-sm); line-height: var(--sol-line-height-text-sm);">
          Modal body content goes here.
        </p>
      </OverlayModal>
    `,
  }),
};

export const WideWidth: Story = {
  args: { width: 768 },
  render: (args) => ({
    components: { OverlayModal },
    setup: () => ({ args }),
    template: `
      <OverlayModal v-bind="args">
        <template #title>Wide modal (768px)</template>
        <p style="font-size: var(--sol-font-size-text-sm); line-height: var(--sol-line-height-text-sm);">
          Modal body content goes here.
        </p>
      </OverlayModal>
    `,
  }),
};
