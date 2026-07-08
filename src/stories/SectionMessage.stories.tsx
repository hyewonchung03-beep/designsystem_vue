import type { Meta, StoryObj } from '@storybook/react';
import SectionMessage from '../components/SectionMessage/SectionMessage';
import type { SectionMessageStatus } from '../components/SectionMessage/SectionMessage';

const meta = {
  title: 'Components/Feedback/SectionMessage',
  component: SectionMessage,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'error', 'brand-light'],
      description: '상태 유형',
    },
    heading:   { control: 'text', description: '헤딩 텍스트' },
    linkLabel: { control: 'text', description: '링크 라벨' },
    showLink:  { control: 'boolean', description: '링크 표시' },
    showClose: { control: 'boolean', description: '닫기 버튼 표시' },
  },
  args: {
    status: 'neutral',
    heading: 'Heading',
    linkLabel: 'Link',
    showLink: true,
    showClose: true,
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-32 items-start p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: { status: 'neutral' },
};

export const Info: Story = {
  args: { status: 'info' },
};

export const Success: Story = {
  args: { status: 'success' },
};

export const Warning: Story = {
  args: { status: 'warning' },
};

export const Error: Story = {
  args: { status: 'error' },
};

export const BrandLight: Story = {
  args: { status: 'brand-light' },
};

export const WithoutActions: Story = {
  args: {
    status: 'info',
    showLink: false,
    showClose: false,
  },
};

const allStatuses: SectionMessageStatus[] = [
  'neutral',
  'info',
  'success',
  'warning',
  'error',
  'brand-light',
];

export const AllStatuses: Story = {
  render: () => (
    <div className="inline-flex w-80 flex-col items-start gap-5 rounded-4 p-5">
      {allStatuses.map((status) => (
        <SectionMessage key={status} status={status} heading="Heading" />
      ))}
    </div>
  ),
};
