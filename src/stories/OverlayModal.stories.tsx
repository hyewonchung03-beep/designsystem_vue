import type { Meta, StoryObj } from '@storybook/react';
import { OverlayModal } from '../components/Modal/OverlayModal';
import { OverlayHeaderModal } from '../components/Modal/OverlayHeaderModal';
import { OverlayFooterModal } from '../components/Modal/OverlayFooterModal';
import { StorySlot } from './_StorySlot';

const meta = {
  title: 'Components/Overlaying surface/Modal',
  component: OverlayModal,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    align: { control: 'radio', options: ['left', 'center'] },
    type: { control: 'radio', options: ['web', 'mobile'] },
    width: { control: 'radio', options: [360, 480, 768, 1024] },
    title: { control: 'text' },
    cancelLabel: { control: 'text' },
    actionLabel: { control: 'text' },
  },
  args: {
    title: 'Title',
    size: 'md',
    align: 'left',
    type: 'web',
    width: 480,
    cancelLabel: 'Cancel',
    actionLabel: 'Action',
    showCancelBtn: true,
    showActionBtn: true,
  },
  decorators: [
    (Story: React.FC) => (
      <div className="flex items-center justify-center p-12">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OverlayModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── overlay_modal ─────────────────────────────────────────────── */

export const Default: Story = {
  name: 'size=md, align=left (web)',
  args: {
    title: 'Title',
    size: 'md',
    align: 'left',
    width: 480,
    children: <StorySlot />,
  },
};

export const SmLeft: Story = {
  name: 'size=sm, align=left (web)',
  args: {
    title: 'Title',
    size: 'sm',
    align: 'left',
    width: 360,
    children: <StorySlot />,
  },
};

export const MdCenter: Story = {
  name: 'size=md, align=center (web)',
  args: {
    title: 'Title',
    size: 'md',
    align: 'center',
    width: 480,
    children: <StorySlot />,
  },
};

export const SmCenter: Story = {
  name: 'size=sm, align=center (web)',
  args: {
    title: 'Title',
    size: 'sm',
    align: 'center',
    width: 360,
    children: <StorySlot />,
  },
};

export const Mobile: Story = {
  name: 'size=md, align=center (mobile)',
  args: {
    title: 'Title',
    size: 'md',
    align: 'center',
    type: 'mobile',
    width: 360,
    showCancelBtn: false,
    children: <StorySlot />,
  },
};

export const WithDivider: Story = {
  name: 'With Divider',
  args: {
    title: 'Title',
    size: 'md',
    align: 'left',
    width: 480,
    showHeaderDivider: true,
    showFooterDivider: true,
    children: <StorySlot />,
  },
};

export const WithLeftAction: Story = {
  name: 'With Left Action (link + step)',
  args: {
    title: 'Title',
    size: 'md',
    align: 'left',
    width: 480,
    showLeftAction: true,
    showLinkBtn: true,
    linkLabel: 'label',
    showStep: true,
    step: '1/5',
    children: <StorySlot />,
  },
};

/* ── Utilities ─────────────────────────────────────────────────── */

export const HeaderVariants: Story = {
  name: 'Header — All Variants',
  render: () => (
    <div className="flex flex-col" style={{ gap: 'var(--sol-spacing-4)', width: 480 }}>
      {(['md', 'sm'] as const).map((size) =>
        (['left', 'center'] as const).map((align) => (
          <div key={`${size}-${align}`}>
            <OverlayHeaderModal
              title="Title"
              size={size}
              align={align}
              type="web"
              onClose={() => {}}
            />
          </div>
        )),
      )}
    </div>
  ),
};

export const FooterVariants: Story = {
  name: 'Footer — All Variants',
  render: () => (
    <div className="flex flex-col" style={{ gap: 'var(--sol-spacing-4)', width: 480 }}>
      {(['md', 'sm'] as const).map((size) =>
        (['right', 'center'] as const).map((align) => (
          <div key={`${size}-${align}`}>
            <OverlayFooterModal size={size} align={align} type="web" />
          </div>
        )),
      )}
      <div>
        <OverlayFooterModal size="md" align="center" type="mobile" />
      </div>
    </div>
  ),
};
