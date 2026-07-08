import type { Meta, StoryObj } from '@storybook/react';
import CardWidget from '../components/Card/Card';

const meta = {
  title: 'Components/CardWidget',
  component: CardWidget,
  tags: ['autodocs'],
  argTypes: {
    title:          { control: 'text',    description: '카드 제목' },
    description:    { control: 'text',    description: '카드 설명 텍스트' },
    badgeLabel:     { control: 'text',    description: '뱃지 라벨 (없으면 뱃지 숨김)' },
    showDragHandle: { control: 'boolean', description: '드래그 핸들 표시 여부' },
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <div className="max-w-60">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof CardWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_DESC =
  'Lorem ipsum dolor sit amet consectetur. Eu elementum blandit posuere ac. Fringilla nulla sed vol';

// ── Default ──────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: {
    title: 'Title',
    description: SAMPLE_DESC,
    badgeLabel: 'NEW',
    showDragHandle: true,
  },
};

// ── Without Badge ────────────────────────────────────────────────────────

export const WithoutBadge: Story = {
  name: 'Without Badge',
  args: {
    title: 'Card Title',
    description: SAMPLE_DESC,
    showDragHandle: true,
  },
};

// ── Without DragHandle ───────────────────────────────────────────────────

export const WithoutDragHandle: Story = {
  name: 'Without Drag Handle',
  args: {
    title: 'Card Title',
    description: SAMPLE_DESC,
    badgeLabel: 'NEW',
  },
};

// ── Minimal ──────────────────────────────────────────────────────────────

export const Minimal: Story = {
  name: 'Minimal',
  args: {
    title: 'Title Only',
  },
};

// ── All Variants ─────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  args: { title: '' },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex max-w-60 flex-col gap-2">
        <p className="text-text-sm text-element-secondary">Badge + Drag Handle</p>
        <CardWidget
          title="Title"
          description={SAMPLE_DESC}
          badgeLabel="NEW"
          showDragHandle
        />
      </div>
      <div className="flex max-w-60 flex-col gap-2">
        <p className="text-text-sm text-element-secondary">Badge Only</p>
        <CardWidget
          title="Title"
          description={SAMPLE_DESC}
          badgeLabel="NEW"
        />
      </div>
      <div className="flex max-w-60 flex-col gap-2">
        <p className="text-text-sm text-element-secondary">Drag Handle Only</p>
        <CardWidget
          title="Title"
          description={SAMPLE_DESC}
          showDragHandle
        />
      </div>
      <div className="flex max-w-60 flex-col gap-2">
        <p className="text-text-sm text-element-secondary">Minimal</p>
        <CardWidget title="Title Only" />
      </div>
    </div>
  ),
};
