import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Pagination from './Pagination.vue';
import PaginationNav from './PaginationNav.vue';
import PaginationSearch from './PaginationSearch.vue';

const meta: Meta<typeof Pagination> = {
  title: 'Pilot/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Pagination },
    setup: () => ({ page: ref(1) }),
    template: `<Pagination :current-page="page" :total-pages="12" @change="(p) => (page = p)" />`,
  }),
};

export const ManyPages: Story = {
  name: 'Many pages (ellipsis truncation)',
  render: () => ({
    components: { Pagination },
    setup: () => ({ page: ref(42) }),
    template: `<Pagination :current-page="page" :total-pages="120" @change="(p) => (page = p)" />`,
  }),
};

export const WithItemsPerPage: Story = {
  render: () => ({
    components: { Pagination },
    setup: () => ({ page: ref(3), perPage: ref(20) }),
    template: `
      <Pagination
        :current-page="page"
        :total-pages="30"
        show-items-per-page
        :items-per-page="perPage"
        @change="(p) => (page = p)"
        @items-per-page-change="(n) => (perPage = n)"
      />
    `,
  }),
};

export const NoSearch: Story = {
  render: () => ({
    components: { Pagination },
    setup: () => ({ page: ref(1) }),
    template: `<Pagination :current-page="page" :total-pages="8" :show-search="false" @change="(p) => (page = p)" />`,
  }),
};

export const FirstPage: Story = {
  render: () => ({
    components: { Pagination },
    setup: () => ({ page: ref(1) }),
    template: `<Pagination :current-page="page" :total-pages="10" @change="(p) => (page = p)" />`,
  }),
};

export const LastPage: Story = {
  render: () => ({
    components: { Pagination },
    setup: () => ({ page: ref(10) }),
    template: `<Pagination :current-page="page" :total-pages="10" @change="(p) => (page = p)" />`,
  }),
};

// ── PaginationNav ────────────────────────────────────────────────────────

export const NavOnly: Story = {
  render: () => ({
    components: { PaginationNav },
    setup: () => ({ page: ref(5) }),
    template: `<PaginationNav :current-page="page" :total-pages="9" @change="(p) => (page = p)" />`,
  }),
};

// ── PaginationSearch ─────────────────────────────────────────────────────

export const SearchOnly: Story = {
  render: () => ({
    components: { PaginationSearch },
    setup: () => ({ page: ref(1) }),
    template: `<PaginationSearch :total-pages="50" @jump="(p) => (page = p)" />`,
  }),
};
