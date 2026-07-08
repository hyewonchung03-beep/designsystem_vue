import type { Meta, StoryObj } from '@storybook/react';
import IconButton from '../components/IconButton/IconButton';

const meta = {
  title: 'Components/Button/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    buttonStyle: {
      control: 'radio',
      options: ['square', 'circle'],
      description: '버튼 모양 (square: 기본)',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary'],
      description: '색상 타입',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기 (sm: 32px / md: 36px / lg: 42px)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
  },
  args: {
    'aria-label': 'Icon button',
  },
  decorators: [
    (Story) => (
      <div className="flex items-center gap-4 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default (square + primary + md) ───────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: {
    buttonStyle: 'square',
    variant: 'primary',
    size: 'md',
  },
};

// ── Variants ──────────────────────────────────────────────────────────────

export const Primary: Story = {
  name: 'Primary',
  args: {
    buttonStyle: 'square',
    variant: 'primary',
    size: 'lg',
  },
};

export const Secondary: Story = {
  name: 'Secondary',
  args: {
    buttonStyle: 'square',
    variant: 'secondary',
    size: 'lg',
  },
};

export const Tertiary: Story = {
  name: 'Tertiary',
  args: {
    buttonStyle: 'square',
    variant: 'tertiary',
    size: 'lg',
  },
};

// ── Styles ────────────────────────────────────────────────────────────────

export const Circle: Story = {
  name: 'Circle',
  args: {
    buttonStyle: 'circle',
    variant: 'primary',
    size: 'lg',
  },
};

export const Square: Story = {
  name: 'Square',
  args: {
    buttonStyle: 'square',
    variant: 'primary',
    size: 'lg',
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────

export const SizeSm: Story = {
  name: 'Size - sm',
  args: {
    buttonStyle: 'square',
    variant: 'primary',
    size: 'sm',
  },
};

export const SizeMd: Story = {
  name: 'Size - md',
  args: {
    buttonStyle: 'square',
    variant: 'primary',
    size: 'md',
  },
};

export const SizeLg: Story = {
  name: 'Size - lg',
  args: {
    buttonStyle: 'square',
    variant: 'primary',
    size: 'lg',
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    buttonStyle: 'square',
    variant: 'primary',
    size: 'lg',
    disabled: true,
  },
};

// ── All Variants Grid ─────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Square */}
      <div>
        <p className="mb-2 text-text-sm text-element-secondary">Square</p>
        <div className="flex items-end gap-3">
          <IconButton aria-label="primary sm" buttonStyle="square" variant="primary" size="sm" />
          <IconButton aria-label="primary md" buttonStyle="square" variant="primary" size="md" />
          <IconButton aria-label="primary lg" buttonStyle="square" variant="primary" size="lg" />
          <IconButton aria-label="secondary lg" buttonStyle="square" variant="secondary" size="lg" />
          <IconButton aria-label="tertiary lg" buttonStyle="square" variant="tertiary" size="lg" />
          <IconButton aria-label="disabled lg" buttonStyle="square" variant="primary" size="lg" disabled />
        </div>
      </div>

      {/* Circle */}
      <div>
        <p className="mb-2 text-text-sm text-element-secondary">Circle</p>
        <div className="flex items-end gap-3">
          <IconButton aria-label="primary sm" buttonStyle="circle" variant="primary" size="sm" />
          <IconButton aria-label="primary md" buttonStyle="circle" variant="primary" size="md" />
          <IconButton aria-label="primary lg" buttonStyle="circle" variant="primary" size="lg" />
          <IconButton aria-label="secondary lg" buttonStyle="circle" variant="secondary" size="lg" />
          <IconButton aria-label="tertiary lg" buttonStyle="circle" variant="tertiary" size="lg" />
          <IconButton aria-label="disabled lg" buttonStyle="circle" variant="primary" size="lg" disabled />
        </div>
      </div>
    </div>
  ),
};
