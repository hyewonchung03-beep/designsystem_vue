import type { Meta, StoryObj } from '@storybook/react';
import Accordion, { AccordionPanelItem } from '../components/Accordion/Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    size:          { control: 'radio',   options: ['md', 'lg'],  description: '아코디언 크기 (md: 14px / lg: 16px)' },
    showDivider:   { control: 'boolean',                         description: '항목 사이 구분선 표시' },
    allowMultiple: { control: 'boolean',                         description: '여러 항목 동시 열기 허용' },
  },
  decorators: [
    (Story) => (
      <div className="w-[360px] p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Basic ──────────────────────────────────────────────────────────────────

export const Basic: Story = {
  name: 'Basic',
  args: {
    size: 'lg',
    showDivider: true,
    allowMultiple: false,
    items: [
      { label: 'Section 1' },
      { label: 'Section 2' },
      { label: 'Section 3' },
    ],
  },
};

// ── With Content ───────────────────────────────────────────────────────────

export const WithContent: Story = {
  name: 'With Content',
  args: {
    size: 'lg',
    showDivider: true,
    allowMultiple: false,
    items: [
      {
        label: 'Account Settings',
        defaultExpanded: true,
        children: <AccordionPanelItem size="lg">Profile</AccordionPanelItem>,
      },
      {
        label: 'Preferences',
        children: <AccordionPanelItem size="lg">Theme</AccordionPanelItem>,
      },
      { label: 'About' },
    ],
  },
};

// ── Size md ────────────────────────────────────────────────────────────────

export const SizeMd: Story = {
  name: 'Size - md',
  args: {
    size: 'md',
    showDivider: true,
    allowMultiple: false,
    items: [
      {
        label: 'Category A',
        defaultExpanded: true,
        children: <AccordionPanelItem size="md">Item 1</AccordionPanelItem>,
      },
      {
        label: 'Category B',
        children: <AccordionPanelItem size="md">Item 3</AccordionPanelItem>,
      },
    ],
  },
};

// ── Size lg ────────────────────────────────────────────────────────────────

export const SizeLg: Story = {
  name: 'Size - lg',
  args: {
    size: 'lg',
    showDivider: true,
    allowMultiple: false,
    items: [
      {
        label: 'Category A',
        defaultExpanded: true,
        children: <AccordionPanelItem size="lg">Item 1</AccordionPanelItem>,
      },
      {
        label: 'Category B',
        children: <AccordionPanelItem size="lg">Item 3</AccordionPanelItem>,
      },
    ],
  },
};

// ── Allow Multiple ─────────────────────────────────────────────────────────

export const AllowMultiple: Story = {
  name: 'Allow Multiple',
  args: {
    size: 'lg',
    showDivider: true,
    allowMultiple: true,
    items: [
      {
        label: 'Section 1',
        defaultExpanded: true,
        children: <AccordionPanelItem size="lg">Content A</AccordionPanelItem>,
      },
      {
        label: 'Section 2',
        defaultExpanded: true,
        children: <AccordionPanelItem size="lg">Content C</AccordionPanelItem>,
      },
      {
        label: 'Section 3',
        children: <AccordionPanelItem size="lg">Content E</AccordionPanelItem>,
      },
    ],
  },
};

// ── No Divider ─────────────────────────────────────────────────────────────

export const NoDivider: Story = {
  name: 'No Divider',
  args: {
    size: 'lg',
    showDivider: false,
    allowMultiple: false,
    items: [
      {
        label: 'Section 1',
        defaultExpanded: true,
        children: <AccordionPanelItem size="lg">Content A</AccordionPanelItem>,
      },
      { label: 'Section 2' },
      { label: 'Section 3' },
    ],
  },
};

// ── Disabled ───────────────────────────────────────────────────────────────

export const WithDisabled: Story = {
  name: 'With Disabled',
  args: {
    size: 'lg',
    showDivider: true,
    allowMultiple: false,
    items: [
      {
        label: 'Enabled Section',
        children: <AccordionPanelItem size="lg">Content A</AccordionPanelItem>,
      },
      {
        label: 'Disabled Section',
        disabled: true,
        children: <AccordionPanelItem size="lg">Hidden content</AccordionPanelItem>,
      },
      { label: 'Another Section' },
    ],
  },
};

// ── Long Labels ────────────────────────────────────────────────────────────

export const LongLabels: Story = {
  name: 'Long Labels (ellipsis)',
  args: {
    size: 'lg',
    showDivider: true,
    allowMultiple: false,
    items: [
      { label: 'This is a very long accordion header that should be truncated with ellipsis when collapsed' },
      { label: 'Another extremely long section title for testing overflow behavior in the accordion component' },
      { label: 'Short' },
    ],
  },
};
