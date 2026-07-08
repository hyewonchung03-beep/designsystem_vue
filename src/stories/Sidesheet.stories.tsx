import type { Meta, StoryObj } from '@storybook/react';
import { Sidesheet } from '../components/Sidesheet/Sidesheet';
import { StorySlot } from './_StorySlot';

const meta = {
  title: 'Components/Sidesheet',
  component: Sidesheet,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    title: { control: 'text' },
    cancelLabel: { control: 'text' },
    actionLabel: { control: 'text' },
  },
  args: {
    title: 'Title',
    size: 'sm',
    showFooter: false,
    cancelLabel: 'Cancel',
    actionLabel: 'Action',
    showCancelBtn: true,
    showActionBtn: true,
    showHeaderDivider: false,
    showFooterDivider: false,
  },
  decorators: [
    (Story: React.FC) => (
      <div
        className="flex items-stretch justify-end"
        style={{
          width: '100%',
          height: '100vh',
          background: 'var(--sol-surface-container-low)',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidesheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const SlotContent = <StorySlot />;

/* ── overlay_footer_modal 없는 케이스 ───────────────────────────────────── */

export const WithoutFooterSm: Story = {
  name: 'Without footer — sm (360)',
  args: {
    title: 'Title',
    size: 'sm',
    showFooter: false,
    children: SlotContent,
  },
};

export const WithoutFooterMd: Story = {
  name: 'Without footer — md (480)',
  args: {
    title: 'Title',
    size: 'md',
    showFooter: false,
    children: SlotContent,
  },
};

/* ── overlay_footer_modal 있는 케이스 ───────────────────────────────────── */

export const WithFooterSm: Story = {
  name: 'With footer — sm (360)',
  args: {
    title: 'Title',
    size: 'sm',
    showFooter: true,
    cancelLabel: 'Cancel',
    actionLabel: 'Save',
    children: SlotContent,
  },
};

export const WithFooterMd: Story = {
  name: 'With footer — md (480)',
  args: {
    title: 'Title',
    size: 'md',
    showFooter: true,
    cancelLabel: 'Cancel',
    actionLabel: 'Save',
    children: SlotContent,
  },
};

/* ── modal=true (scrim 포함) ────────────────────────────────────────────── */

export const ModalWithScrim: Story = {
  name: 'modal=true — with scrim',
  render: (args) => (
    <div
      className="flex items-stretch justify-end"
      style={{
        width: '100%',
        height: '100vh',
        background: 'var(--sol-surface-container-low)',
        position: 'relative',
      }}
    >
      {/* Scrim: position fixed로 뷰포트 전체 커버 */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--sol-scrim)',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', height: '100%' }}>
        <Sidesheet {...args} />
      </div>
    </div>
  ),
  args: {
    title: 'Title',
    size: 'md',
    showFooter: true,
    cancelLabel: 'Cancel',
    actionLabel: 'Save',
    children: SlotContent,
  },
  decorators: [],
};
