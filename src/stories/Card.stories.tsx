import type { Meta, StoryObj } from '@storybook/react';
import Card from '../components/CardItem/CardItem';

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    thumbnailSrc: { control: 'text' },
    badgeLabel: { control: 'text' },
    badgeOption: {
      control: 'select',
      options: [
        'red', 'orange', 'yellow', 'green', 'teal',
        'lightBlue', 'indigo', 'pink', 'purple', 'neutral',
      ],
    },
    dateText: { control: 'text' },
    type: { control: 'select', options: ['horizontal', 'vertical'] },
    size: { control: 'select', options: ['sm', 'md'] },
    showThumbnail: { control: 'boolean' },
    showMeta: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    state: { control: 'select', options: ['enabled', 'disabled'] },
  },
  args: {
    title: 'Card title',
    description: 'Card description text here',
    badgeLabel: 'Badge',
    badgeOption: 'neutral',
    dateText: 'Updated Ndays ago',
    type: 'horizontal',
    size: 'md',
    showThumbnail: true,
    showMeta: true,
    showDescription: true,
    state: 'enabled',
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-40 items-start p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Horizontal ─────────────────────────────────────────────────────────── */

export const HorizontalMd: Story = {
  name: 'Horizontal — md',
  args: { type: 'horizontal', size: 'md' },
  render: (args) => <Card {...args} className="w-[420px]" />,
};

export const HorizontalSm: Story = {
  name: 'Horizontal — sm',
  args: { type: 'horizontal', size: 'sm' },
  render: (args) => <Card {...args} className="w-[360px]" />,
};

/* ── Vertical ───────────────────────────────────────────────────────────── */

export const VerticalSm: Story = {
  name: 'Vertical — sm',
  args: { type: 'vertical', size: 'sm' },
  render: (args) => <Card {...args} className="w-[240px]" />,
};

export const VerticalMd: Story = {
  name: 'Vertical — md',
  args: { type: 'vertical', size: 'md' },
  render: (args) => <Card {...args} className="w-[288px]" />,
};

/* ── Variants ───────────────────────────────────────────────────────────── */

export const WithThumbnailImage: Story = {
  name: 'With thumbnail image',
  args: { thumbnailSrc: 'https://placehold.co/248x200/e8e8e8/999?text=Image' },
  render: (args) => <Card {...args} className="w-[420px]" />,
};

export const WithoutThumbnail: Story = {
  name: 'Without thumbnail',
  args: { showThumbnail: false },
  render: (args) => <Card {...args} className="w-[420px]" />,
};

export const WithoutMeta: Story = {
  name: 'Without meta',
  args: { showMeta: false },
  render: (args) => <Card {...args} className="w-[420px]" />,
};

export const WithoutDescription: Story = {
  name: 'Without description',
  args: { showDescription: false },
  render: (args) => <Card {...args} className="w-[420px]" />,
};

export const TitleOnly: Story = {
  name: 'Title only',
  args: { showThumbnail: false, showMeta: false, showDescription: false },
  render: (args) => <Card {...args} className="w-[420px]" />,
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { state: 'disabled' },
  render: (args) => <Card {...args} className="w-[420px]" />,
};

/* ── All Variants ──────────────────────────────────────────────────────── */

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-col gap-10 p-6">
      {/* Horizontal md */}
      <div className="flex flex-col gap-2">
        <p className="text-text-xs font-semibold uppercase tracking-wide text-element-tertiary">
          Horizontal — md
        </p>
        <Card
          title="Card title"
          description="Card description text here"
          badgeLabel="Badge"
          dateText="Updated 3days ago"
          type="horizontal"
          size="md"
          className="w-[420px]"
        />
      </div>

      {/* Horizontal sm */}
      <div className="flex flex-col gap-2">
        <p className="text-text-xs font-semibold uppercase tracking-wide text-element-tertiary">
          Horizontal — sm
        </p>
        <Card
          title="Card title"
          description="Card description text here"
          badgeLabel="Badge"
          dateText="Updated 3days ago"
          type="horizontal"
          size="sm"
          className="w-[360px]"
        />
      </div>

      {/* Vertical sm */}
      <div className="flex flex-col gap-2">
        <p className="text-text-xs font-semibold uppercase tracking-wide text-element-tertiary">
          Vertical — sm
        </p>
        <Card
          title="Card title"
          description="Card description text here"
          badgeLabel="Badge"
          dateText="Updated 3days ago"
          type="vertical"
          size="sm"
          className="w-[240px]"
        />
      </div>

      {/* Vertical md */}
      <div className="flex flex-col gap-2">
        <p className="text-text-xs font-semibold uppercase tracking-wide text-element-tertiary">
          Vertical — md
        </p>
        <Card
          title="Card title"
          description="Card description text here"
          badgeLabel="Badge"
          dateText="Updated 3days ago"
          type="vertical"
          size="md"
          className="w-[288px]"
        />
      </div>

      {/* Without thumbnail */}
      <div className="flex flex-col gap-2">
        <p className="text-text-xs font-semibold uppercase tracking-wide text-element-tertiary">
          Without thumbnail (horizontal md)
        </p>
        <Card
          title="Card title"
          description="Card description text here"
          badgeLabel="Badge"
          dateText="Updated 3days ago"
          showThumbnail={false}
          className="w-[420px]"
        />
      </div>

      {/* Without meta */}
      <div className="flex flex-col gap-2">
        <p className="text-text-xs font-semibold uppercase tracking-wide text-element-tertiary">
          Without meta (vertical sm)
        </p>
        <Card
          title="Card title"
          description="Card description text here"
          type="vertical"
          size="sm"
          showMeta={false}
          className="w-[240px]"
        />
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-2">
        <p className="text-text-xs font-semibold uppercase tracking-wide text-element-tertiary">
          Disabled
        </p>
        <Card
          title="Card title"
          description="Card description text here"
          badgeLabel="Badge"
          dateText="Updated 3days ago"
          state="disabled"
          className="w-[420px]"
        />
      </div>
    </div>
  ),
};
