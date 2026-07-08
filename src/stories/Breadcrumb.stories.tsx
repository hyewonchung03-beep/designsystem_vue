import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

const meta = {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    maxItems: { control: { type: 'number', min: 1 }, description: '접기 전 표시할 최대 링크 수 (미설정 시 전체 표시)' },
  },
  decorators: [
    (Story) => (
      <div className="pb-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default (3단계) ───────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: {
    items: [
      { label: 'Home',     href: '#' },
      { label: 'Category', href: '#' },
      { label: 'Current Page' },
    ],
  },
  parameters: {
    docs: {
      source: {
        code: `<Breadcrumb
  items={[
    { label: 'Home',     href: '#' },
    { label: 'Category', href: '#' },
    { label: 'Current Page' },
  ]}
/>`,
        language: 'tsx',
      },
    },
  },
};

// ── 긴 경로 (5단계) ──────────────────────────────────────────────────────────

export const Deep: Story = {
  name: 'Deep Path',
  args: {
    items: [
      { label: 'Home',        href: '#' },
      { label: 'Category',    href: '#' },
      { label: 'Subcategory', href: '#' },
      { label: 'Section',     href: '#' },
      { label: 'Current Page' },
    ],
  },
  parameters: {
    docs: {
      source: {
        code: `<Breadcrumb
  items={[
    { label: 'Home',        href: '#' },
    { label: 'Category',    href: '#' },
    { label: 'Subcategory', href: '#' },
    { label: 'Section',     href: '#' },
    { label: 'Current Page' },
  ]}
/>`,
        language: 'tsx',
      },
    },
  },
};

// ── Overflow 접힘 ─────────────────────────────────────────────────────────────

export const Collapsed: Story = {
  name: 'Collapsed (maxItems)',
  args: {
    items: [
      { label: 'Home',        href: '#' },
      { label: 'Category',    href: '#' },
      { label: 'Subcategory', href: '#' },
      { label: 'Section',     href: '#' },
      { label: 'Current Page' },
    ],
    maxItems: 2,
  },
  parameters: {
    docs: {
      source: {
        code: `<Breadcrumb
  maxItems={2}
  items={[
    { label: 'Home',        href: '#' },
    { label: 'Category',    href: '#' },
    { label: 'Subcategory', href: '#' },
    { label: 'Section',     href: '#' },
    { label: 'Current Page' },
  ]}
/>`,
        language: 'tsx',
      },
    },
  },
};

// ── 2단계 (최소) ──────────────────────────────────────────────────────────────

export const Minimal: Story = {
  name: 'Minimal (2 items)',
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Current Page' },
    ],
  },
  parameters: {
    docs: {
      source: {
        code: `<Breadcrumb
  items={[
    { label: 'Home', href: '#' },
    { label: 'Current Page' },
  ]}
/>`,
        language: 'tsx',
      },
    },
  },
};

// ── 긴 레이블 (말줄임) ────────────────────────────────────────────────────────

export const LongLabels: Story = {
  name: 'Long Labels (ellipsis)',
  args: {
    items: [
      { label: 'Very Long Category Name', href: '#' },
      { label: 'Another Very Long Section Name', href: '#' },
      { label: 'Current Page with Long Title' },
    ],
  },
  parameters: {
    docs: {
      source: {
        code: `<Breadcrumb
  items={[
    { label: 'Very Long Category Name',       href: '#' },
    { label: 'Another Very Long Section Name', href: '#' },
    { label: 'Current Page with Long Title' },
  ]}
/>`,
        language: 'tsx',
      },
    },
  },
};
