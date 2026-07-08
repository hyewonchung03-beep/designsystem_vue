import { useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Banner from '../components/Banner/Banner';
import type { BannerColor } from '../components/Banner/Banner';

const meta = {
  title: 'Components/Feedback/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['error', 'warning', 'brand', 'announcement'],
      description: '배너 색상 유형',
    },
    heading:     { control: 'text', description: '헤딩 텍스트' },
    actionLabel: { control: 'text', description: '액션 버튼 라벨' },
    showIcon:    { control: 'boolean', description: '아이콘 표시' },
    showAction:  { control: 'boolean', description: '액션 버튼 표시' },
    showClose:   { control: 'boolean', description: '닫기 버튼 표시' },
  },
  args: {
    color: 'error',
    heading: 'Heading',
    actionLabel: 'Button',
    showIcon: true,
    showAction: true,
    showClose: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      const ref = useRef<HTMLDivElement>(null);
      useEffect(() => {
        const content = ref.current?.closest('.storybook-preview-content');
        if (content instanceof HTMLElement) content.style.width = '100%';
      }, []);
      return (
        <div ref={ref} style={{ width: '100%' }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: { color: 'error' },
};

export const Warning: Story = {
  args: { color: 'warning' },
};

export const Brand: Story = {
  args: { color: 'brand' },
};

export const Announcement: Story = {
  args: { color: 'announcement', showIcon: false },
};

export const WithoutAction: Story = {
  args: { color: 'brand', showAction: false },
};

const colors: BannerColor[] = ['error', 'warning', 'brand', 'announcement'];

export const AllColors: Story = {
  render: () => (
    <div className="inline-flex w-72 flex-col items-start gap-5 overflow-hidden rounded-4 p-5">
      {colors.map((color) => (
        <Banner key={color} color={color} showIcon={color !== 'announcement'} />
      ))}
    </div>
  ),
};
