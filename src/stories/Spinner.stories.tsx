import type { Meta, StoryObj, Decorator } from '@storybook/react';
import Spinner from '../components/Spinner/Spinner';
import type { SpinnerSize } from '../components/Spinner/Spinner';

const meta = {
  title: 'Components/Loading/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size:           { control: 'select',  options: ['sm', 'md', 'lg'],       description: '스피너 크기' },
    labelPosition:  { control: 'select',  options: ['below', 'right'],        description: '레이블 위치' },
    inverse:        { control: 'boolean',                                      description: '다크 배경용 inverse 모드' },
    showLoaderText: { control: 'boolean',                                      description: '로딩 텍스트 표시 여부' },
    label:          { control: 'text',                                         description: '로딩 텍스트' },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

const inverseCanvas: Decorator = (Story) => (
  <div className="flex min-h-[160px] w-full items-center justify-center p-8">
    <Story />
  </div>
);

// ── Label Position - Below ─────────────────────────────────────────────────

export const BelowSm: Story = {
  name: 'Below / sm',
  args: { size: 'sm', labelPosition: 'below', inverse: false, showLoaderText: true, label: 'Loading' },
  parameters: { docs: { source: { code: `<Spinner size="sm" labelPosition="below" />`, language: 'tsx' } } },
};

export const BelowMd: Story = {
  name: 'Below / md',
  args: { size: 'md', labelPosition: 'below', inverse: false, showLoaderText: true, label: 'Loading' },
  parameters: { docs: { source: { code: `<Spinner size="md" labelPosition="below" />`, language: 'tsx' } } },
};

export const BelowLg: Story = {
  name: 'Below / lg',
  args: { size: 'lg', labelPosition: 'below', inverse: false, showLoaderText: true, label: 'Loading' },
  parameters: { docs: { source: { code: `<Spinner size="lg" labelPosition="below" />`, language: 'tsx' } } },
};

// ── Label Position - Right ─────────────────────────────────────────────────

export const RightSm: Story = {
  name: 'Right / sm',
  args: { size: 'sm', labelPosition: 'right', inverse: false, showLoaderText: true, label: 'Loading' },
  parameters: { docs: { source: { code: `<Spinner size="sm" labelPosition="right" />`, language: 'tsx' } } },
};

export const RightMd: Story = {
  name: 'Right / md',
  args: { size: 'md', labelPosition: 'right', inverse: false, showLoaderText: true, label: 'Loading' },
  parameters: { docs: { source: { code: `<Spinner size="md" labelPosition="right" />`, language: 'tsx' } } },
};

export const RightLg: Story = {
  name: 'Right / lg',
  args: { size: 'lg', labelPosition: 'right', inverse: false, showLoaderText: true, label: 'Loading' },
  parameters: { docs: { source: { code: `<Spinner size="lg" labelPosition="right" />`, language: 'tsx' } } },
};

// ── Sizes overview ─────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  render: () => {
    const sizes: SpinnerSize[] = ['sm', 'md', 'lg'];
    return (
      <div className="flex items-end gap-12">
        {sizes.map((size) => (
          <Spinner key={size} size={size} labelPosition="below" />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<Spinner size="sm" labelPosition="below" />
<Spinner size="md" labelPosition="below" />
<Spinner size="lg" labelPosition="below" />`,
        language: 'tsx',
      },
    },
  },
};

// ── Inverse ────────────────────────────────────────────────────────────────

export const Inverse: Story = {
  name: 'Inverse',
  decorators: [inverseCanvas],
  render: () => (
    <div className="flex items-end gap-12">
      <Spinner size="sm" labelPosition="below" inverse />
      <Spinner size="md" labelPosition="below" inverse />
      <Spinner size="lg" labelPosition="below" inverse />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Spinner size="sm" labelPosition="below" inverse />
<Spinner size="md" labelPosition="below" inverse />
<Spinner size="lg" labelPosition="below" inverse />`,
        language: 'tsx',
      },
    },
  },
};

// ── No Label ───────────────────────────────────────────────────────────────

export const NoLabel: Story = {
  name: 'No Label',
  render: () => (
    <div className="flex items-center gap-8">
      <Spinner size="sm" showLoaderText={false} />
      <Spinner size="md" showLoaderText={false} />
      <Spinner size="lg" showLoaderText={false} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Spinner size="sm" showLoaderText={false} />
<Spinner size="md" showLoaderText={false} />
<Spinner size="lg" showLoaderText={false} />`,
        language: 'tsx',
      },
    },
  },
};
