import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Header from './Header.vue';

const STORE_OPTIONS = [
  { value: 'store-1', label: 'Gangnam Flagship Store' },
  { value: 'store-2', label: 'Hongdae Branch' },
  { value: 'store-3', label: 'Jamsil Branch' },
];

const meta: Meta<typeof Header> = {
  title: 'Pilot/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['default', 'edit'] },
    storeName: { control: 'text' },
    showSelect: { control: 'boolean' },
    showNavigator: { control: 'boolean' },
    showText: { control: 'boolean' },
    text: { control: 'text' },
    badgeCount: { control: 'number' },
    profileVariant: { control: 'select', options: ['empty', 'user1', 'user2', 'upload'] },
    profileSrc: { control: 'text' },
  },
  args: {
    type: 'default',
    storeName: '',
    storeOptions: STORE_OPTIONS,
    showSelect: true,
    showNavigator: true,
    showText: true,
    text: 'Mar 25, 2025(Tue) 14:00 saved',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelectedStore: Story = {
  args: { storeName: 'store-1' },
};

export const WithoutSelect: Story = {
  args: { showSelect: false },
};

export const WithNotificationBadge: Story = {
  args: { badgeCount: 3 },
};

export const WithNotificationBadgeOverflow: Story = {
  args: { badgeCount: 128 },
};

export const NoBadge: Story = {
  args: { badgeCount: undefined },
};

export const WithProfileImage: Story = {
  args: {
    profileSrc: 'https://i.pravatar.cc/64',
  },
};

export const EditMode: Story = {
  args: {
    type: 'edit',
    storeName: 'Dashboard / Widgets / Edit Layout',
  },
};

export const EditModeWithoutNavigator: Story = {
  args: {
    type: 'edit',
    storeName: 'Dashboard / Widgets / Edit Layout',
    showNavigator: false,
  },
};

export const EditModeWithoutText: Story = {
  args: {
    type: 'edit',
    storeName: 'Dashboard / Widgets / Edit Layout',
    showText: false,
  },
};

export const EditModeMinimal: Story = {
  args: {
    type: 'edit',
    storeName: 'Dashboard / Widgets / Edit Layout',
    showNavigator: false,
    showText: false,
  },
};
