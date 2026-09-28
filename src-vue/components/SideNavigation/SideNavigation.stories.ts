import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SideNavigation from './SideNavigation.vue';
import { IcDashboard01, IcHeadquarter, IcUserProfile, IcPipeline, ImgSolum } from './icons';

const sampleItems = [
  { id: 'dashboard', label: 'Dashboard', icon: IcDashboard01 },
  { id: 'company', label: 'Company management', icon: IcHeadquarter },
  {
    id: 'users',
    label: 'User management',
    icon: IcUserProfile,
    children: [
      { id: 'users-list', label: 'Users' },
      { id: 'si-partner', label: 'SI Partner' },
      { id: 'access-control', label: 'Access Control' },
    ],
  },
  {
    id: 'data',
    label: 'Data management',
    icon: IcPipeline,
    children: [
      { id: 'data-ingestion', label: 'Data Ingestion' },
      { id: 'data-pipeline', label: 'Pipeline' },
    ],
  },
];

const meta: Meta<typeof SideNavigation> = {
  title: 'Pilot/SideNavigation',
  component: SideNavigation,
  tags: ['autodocs'],
  argTypes: {
    defaultCollapsed: { control: 'boolean', description: '초기 접힘 상태' },
    profileName: { control: 'text', description: '프로필 회사명' },
    defaultActiveId: { control: 'text', description: '초기 선택 항목 ID' },
  },
  decorators: [
    () => ({
      template: '<div class="h-[600px] flex"><story /></div>',
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
  name: 'Expanded — submenu open',
  render: () => ({
    components: { SideNavigation },
    setup: () => ({ ImgSolum, items: sampleItems }),
    template: `
      <SideNavigation
        profile-name="SOLUM"
        :profile-logo="ImgSolum"
        default-active-id="users-list"
        :items="items"
      />
    `,
  }),
};

export const ExpandedFlat: Story = {
  name: 'Expanded — flat items',
  render: () => ({
    components: { SideNavigation },
    setup: () => ({
      ImgSolum,
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: IcDashboard01 },
        { id: 'company', label: 'Company management', icon: IcHeadquarter },
        { id: 'users', label: 'User management', icon: IcUserProfile },
        { id: 'data', label: 'Data management', icon: IcPipeline },
      ],
    }),
    template: `
      <SideNavigation
        profile-name="SOLUM"
        :profile-logo="ImgSolum"
        default-active-id="dashboard"
        :items="items"
      />
    `,
  }),
};

export const Collapsed: Story = {
  name: 'Collapsed — icon only',
  render: () => ({
    components: { SideNavigation },
    setup: () => ({ ImgSolum, items: sampleItems }),
    template: `
      <SideNavigation
        profile-name="SOLUM"
        :profile-logo="ImgSolum"
        default-active-id="users-list"
        default-collapsed
        :items="items"
      />
    `,
  }),
};

export const WithDisabled: Story = {
  name: 'With Disabled Items',
  render: () => ({
    components: { SideNavigation },
    setup: () => ({
      ImgSolum,
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: IcDashboard01 },
        { id: 'company', label: 'Company management', icon: IcHeadquarter, disabled: true },
        {
          id: 'users',
          label: 'User management',
          icon: IcUserProfile,
          children: [
            { id: 'users-list', label: 'Users' },
            { id: 'si-partner', label: 'SI Partner', disabled: true },
            { id: 'access-control', label: 'Access Control' },
          ],
        },
        { id: 'data', label: 'Data management', icon: IcPipeline, disabled: true },
      ],
    }),
    template: `
      <SideNavigation
        profile-name="SOLUM"
        :profile-logo="ImgSolum"
        default-active-id="dashboard"
        :items="items"
      />
    `,
  }),
};

export const MultipleGroups: Story = {
  name: 'Multiple Groups',
  render: () => ({
    components: { SideNavigation },
    setup: () => ({ ImgSolum, items: sampleItems }),
    template: `
      <SideNavigation
        profile-name="SOLUM"
        :profile-logo="ImgSolum"
        default-active-id="data-ingestion"
        :items="items"
      />
    `,
  }),
};
