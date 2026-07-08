import type { Meta, StoryObj } from '@storybook/react';
import SideNavigation from '../components/SideNavigation/SideNavigation';
import {
  IcDashboard01,
  IcHeadquarter,
  IcUserProfile,
  IcPipeline,
  ImgSolum,
} from '../components/SideNavigation/icons';

// ─── Sample Items ─────────────────────────────────────────────────────────────

const sampleItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <IcDashboard01 /> },
  { id: 'company', label: 'Company management', icon: <IcHeadquarter /> },
  {
    id: 'users',
    label: 'User management',
    icon: <IcUserProfile />,
    children: [
      { id: 'users-list', label: 'Users' },
      { id: 'si-partner', label: 'SI Partner' },
      { id: 'access-control', label: 'Access Control' },
    ],
  },
  {
    id: 'data',
    label: 'Data management',
    icon: <IcPipeline />,
    children: [
      { id: 'data-ingestion', label: 'Data Ingestion' },
      { id: 'data-pipeline', label: 'Pipeline' },
    ],
  },
];

const SolumLogo = () => <ImgSolum size={36} />;

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Navigation/SideNavigation',
  component: SideNavigation,
  tags: ['autodocs'],
  argTypes: {
    defaultCollapsed: { control: 'boolean', description: '초기 접힘 상태' },
    profileName: { control: 'text', description: '프로필 회사명' },
    defaultActiveId: { control: 'text', description: '초기 선택 항목 ID' },
  },
  decorators: [
    (Story) => (
      <div className="h-[600px] flex">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SideNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Expanded (submenu open) ───────────────────────────────────────────────────

export const Expanded: Story = {
  name: 'Expanded — submenu open',
  args: {
    profileName: 'SOLUM',
    profileLogo: <SolumLogo />,
    defaultActiveId: 'users-list',
    defaultCollapsed: false,
    items: sampleItems,
  },
};

// ── Expanded (flat, no groups) ────────────────────────────────────────────────

export const ExpandedFlat: Story = {
  name: 'Expanded — flat items',
  args: {
    profileName: 'SOLUM',
    profileLogo: <SolumLogo />,
    defaultActiveId: 'dashboard',
    defaultCollapsed: false,
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <IcDashboard01 /> },
      { id: 'company', label: 'Company management', icon: <IcHeadquarter /> },
      { id: 'users', label: 'User management', icon: <IcUserProfile /> },
      { id: 'data', label: 'Data management', icon: <IcPipeline /> },
    ],
  },
};

// ── Collapsed ─────────────────────────────────────────────────────────────────

export const Collapsed: Story = {
  name: 'Collapsed — icon only',
  args: {
    profileName: 'SOLUM',
    profileLogo: <SolumLogo />,
    defaultActiveId: 'users-list',
    defaultCollapsed: true,
    items: sampleItems,
  },
};

// ── With Disabled ─────────────────────────────────────────────────────────────

export const WithDisabled: Story = {
  name: 'With Disabled Items',
  args: {
    profileName: 'SOLUM',
    profileLogo: <SolumLogo />,
    defaultActiveId: 'dashboard',
    defaultCollapsed: false,
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <IcDashboard01 /> },
      { id: 'company', label: 'Company management', icon: <IcHeadquarter />, disabled: true },
      {
        id: 'users',
        label: 'User management',
        icon: <IcUserProfile />,
        children: [
          { id: 'users-list', label: 'Users' },
          { id: 'si-partner', label: 'SI Partner', disabled: true },
          { id: 'access-control', label: 'Access Control' },
        ],
      },
      { id: 'data', label: 'Data management', icon: <IcPipeline />, disabled: true },
    ],
  },
};

// ── Multiple Groups ───────────────────────────────────────────────────────────

export const MultipleGroups: Story = {
  name: 'Multiple Groups',
  args: {
    profileName: 'SOLUM',
    profileLogo: <SolumLogo />,
    defaultActiveId: 'data-ingestion',
    defaultCollapsed: false,
    items: sampleItems,
  },
};
