import type { Meta, StoryObj } from '@storybook/react';
import { OverlayHeaderPopover } from '../components/Popover/OverlayHeaderPopover';
import { OverlayFooterPopover } from '../components/Popover/OverlayFooterPopover';

const meta = {
  title: 'Components/Overlaying surface/Utilities',
  component: OverlayHeaderPopover,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    title: { control: 'text' },
  },
  args: {
    title: 'Header',
    size: 'lg',
    showNavigation: true,
    showClosedBtn: true,
    showDivider: true,
  },
  decorators: [
    (Story: React.FC) => (
      <div className="flex items-center justify-center p-8">
        <div style={{ width: 320 }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof OverlayHeaderPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── overlay_header_popover ───────────────────────────────────── */

export const HeaderLg: Story = {
  name: 'Header — lg',
  args: { size: 'lg', title: 'Header' },
};

export const HeaderMd: Story = {
  name: 'Header — md',
  args: { size: 'md', title: 'Header' },
};

export const HeaderSm: Story = {
  name: 'Header — sm',
  args: { size: 'sm', title: 'Header' },
};

export const HeaderWithDescription: Story = {
  name: 'Header — with description',
  args: { size: 'lg', title: 'Header', showDescription: true, description: 'Description text here' },
};

export const HeaderWithNumber: Story = {
  name: 'Header — with badge count',
  args: { size: 'lg', title: 'Header', showNumber: true, count: 5 },
};

export const HeaderAllVariants: Story = {
  name: 'Header — All Variants',
  render: () => (
    <div className="flex flex-col" style={{ gap: 'var(--sol-spacing-4)', width: 320 }}>
      {(['lg', 'md', 'sm'] as const).map((size) => (
        <div key={size}>
          <OverlayHeaderPopover title="Header" size={size} />
        </div>
      ))}
    </div>
  ),
};

/* ── overlay_footer_popover ───────────────────────────────────── */

export const FooterDefault: Story = {
  name: 'Footer — default',
  render: () => (
    <div style={{ width: 276 }}>
      <OverlayFooterPopover />
    </div>
  ),
};

export const FooterWithRefresh: Story = {
  name: 'Footer — with Clear all',
  render: () => (
    <div style={{ width: 276 }}>
      <OverlayFooterPopover showRefresh />
    </div>
  ),
};
