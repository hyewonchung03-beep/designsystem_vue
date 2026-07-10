import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SectionMessage from './SectionMessage.vue';

const meta: Meta<typeof SectionMessage> = {
  title: 'Pilot/SectionMessage',
  component: SectionMessage,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'error', 'brand-light'] },
    showLink: { control: 'boolean' },
    showClose: { control: 'boolean' },
  },
  args: {
    status: 'neutral',
    heading: 'Heading',
    linkLabel: 'Link',
    showLink: true,
    showClose: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

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

export const NoLink: Story = {
  args: { showLink: false },
};

export const NoClose: Story = {
  args: { showClose: false },
};

export const HeadingOnly: Story = {
  args: { showLink: false, showClose: false },
};
