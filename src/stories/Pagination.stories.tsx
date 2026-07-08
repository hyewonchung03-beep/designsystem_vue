import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination, PaginationNav, PaginationSearch } from '../components/Pagination/Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage:      { control: { type: 'number', min: 1 } },
    totalPages:       { control: { type: 'number', min: 1 } },
    showItemsPerPage: { control: 'boolean' },
    showSearch:       { control: 'boolean' },
    itemsPerPage:     { control: { type: 'number' } },
  },
  args: {
    currentPage:      1,
    totalPages:       115,
    showItemsPerPage: false,
    showSearch:       true,
    itemsPerPage:     10,
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled wrapper so navigation buttons actually work
function Controlled(props: React.ComponentProps<typeof Pagination>) {
  const [page, setPage] = useState(props.currentPage);
  const [perPage, setPerPage] = useState(props.itemsPerPage ?? 10);
  return (
    <Pagination
      {...props}
      currentPage={page}
      itemsPerPage={perPage}
      onChange={setPage}
      onItemsPerPageChange={setPerPage}
    />
  );
}

// ── Pagination (composite) stories ────────────────────────────────────────────

export const Default: Story = {
  name: 'page=1 / total=115',
  render: (args) => <Controlled {...args} />,
};

export const MiddlePage: Story = {
  name: 'page=10 / total=115',
  render: (args) => <Controlled {...args} currentPage={10} />,
};

export const LastPage: Story = {
  name: 'page=115 / total=115',
  render: (args) => <Controlled {...args} currentPage={115} />,
};

export const WithItemsPerPage: Story = {
  name: 'showItemsPerPage=true',
  render: (args) => <Controlled {...args} showItemsPerPage={true} />,
};

export const NavOnly: Story = {
  name: 'showSearch=false',
  render: (args) => <Controlled {...args} showSearch={false} />,
};

export const FullOptions: Story = {
  name: 'showItemsPerPage + showSearch',
  render: (args) => (
    <Controlled {...args} showItemsPerPage={true} showSearch={true} currentPage={10} />
  ),
};

// ── PaginationNav only ────────────────────────────────────────────────────────

export const NavVariants: Story = {
  name: 'PaginationNav — all cases',
  render: () => {
    function ControlledNav(props: { currentPage: number; totalPages: number }) {
      const [page, setPage] = useState(props.currentPage);
      return (
        <PaginationNav
          currentPage={page}
          totalPages={props.totalPages}
          onChange={setPage}
        />
      );
    }
    return (
      <div className="flex flex-col gap-4 items-start">
        <span className="text-text-xs text-element-quaternary">page=1 / total=10</span>
        <ControlledNav currentPage={1}  totalPages={10} />
        <span className="text-text-xs text-element-quaternary">page=5 / total=10</span>
        <ControlledNav currentPage={5}  totalPages={10} />
        <span className="text-text-xs text-element-quaternary">page=10 / total=10</span>
        <ControlledNav currentPage={10} totalPages={10} />
        <span className="text-text-xs text-element-quaternary">page=10 / total=115</span>
        <ControlledNav currentPage={10} totalPages={115} />
        <span className="text-text-xs text-element-quaternary">total=5 (no ellipsis)</span>
        <ControlledNav currentPage={3}  totalPages={5} />
      </div>
    );
  },
};

// ── PaginationSearch only ─────────────────────────────────────────────────────

export const SearchOnly: Story = {
  name: 'PaginationSearch standalone',
  render: () => (
    <PaginationSearch totalPages={115} onJump={(p) => alert(`Go to page ${p}`)} />
  ),
};
