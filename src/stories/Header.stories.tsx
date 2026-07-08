import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components/Header/Header';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 1000 }}>{children}</div>
);

const STORE_OPTIONS = [
  { value: 'store-a', label: 'Newyork > Walmart Store A' },
  { value: 'store-b', label: 'LA > Walmart Store B' },
  { value: 'store-c', label: 'Chicago > Walmart Store C' },
];

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    type:          { control: 'radio', options: ['default', 'edit'] },
    showSelect:    { control: 'boolean' },
    showNavigator: { control: 'boolean' },
    showText:      { control: 'boolean' },
    storeName:     { control: 'text' },
    text:          { control: 'text' },
    badgeCount:      { control: 'number' },
    profileVariant:  { control: 'select', options: ['empty', 'user1', 'user2', 'upload'] },
  },
  args: {
    type:           'default',
    storeName:      '',
    storeOptions:   STORE_OPTIONS,
    showSelect:     true,
    showNavigator:  true,
    showText:       true,
    text:           'Mar 25, 2025(Tue) 14:00 saved',
    badgeCount:     24,
    profileVariant: 'user1',
  },
  decorators: [
    (Story: React.FC) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'type=default',
  args: { type: 'default' },
};

export const DefaultWithStore: Story = {
  name: 'type=default, storeName set',
  args: { type: 'default', storeName: 'Newyork > Walmart Store A' },
};

export const DefaultNoBadge: Story = {
  name: 'type=default, no badge',
  args: { type: 'default', badgeCount: undefined },
};

export const Edit: Story = {
  name: 'type=edit',
  args: {
    type:      'edit',
    storeName: 'Newyork > Walmart Store A',
  },
};

export const EditNoNavigator: Story = {
  name: 'type=edit, showNavigator=false',
  args: {
    type:          'edit',
    storeName:     'Newyork > Walmart Store A',
    showNavigator: false,
  },
};

export const EditNoText: Story = {
  name: 'type=edit, showText=false',
  args: {
    type:      'edit',
    storeName: 'Newyork > Walmart Store A',
    showText:  false,
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <Wrapper>
      <Header
        type="default"
        storeName="Newyork > Walmart Store A"
        storeOptions={STORE_OPTIONS}
        badgeCount={24}
      />
      <Header
        type="edit"
        storeName="Newyork > Walmart Store A"
        text="Mar 25, 2025(Tue) 14:00 saved"
      />
    </Wrapper>
  ),
};
