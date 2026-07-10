import type { Meta, StoryObj } from '@storybook/vue3-vite';
import BtnIcon from './BtnIcon.vue';

const meta: Meta<typeof BtnIcon> = {
  title: 'Pilot/BtnIcon',
  component: BtnIcon,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'white'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    styleType: { control: 'select', options: ['solid', 'outline', 'ghost', 'link', 'danger', 'text'] },
    state: { control: 'select', options: ['enabled', 'hover', 'focused', 'pressed', 'disabled', 'loading'] },
    showLabel: { control: 'boolean' },
    showLeftIcon: { control: 'boolean' },
    showRightIcon: { control: 'boolean' },
    showLoading: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    type: 'primary',
    size: 'lg',
    styleType: 'solid',
    state: 'enabled',
    showLabel: true,
    showLeftIcon: true,
    showRightIcon: false,
    showLoading: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ── Basic ────────────────────────────────────────────────────────────────

export const Primary: Story = {};

export const Secondary: Story = {
  args: { type: 'secondary' },
};

export const Tertiary: Story = {
  args: { type: 'tertiary' },
};

export const White: Story = {
  args: { type: 'white' },
  render: (args) => ({
    components: { BtnIcon },
    setup: () => ({ args }),
    template: `<div style="background: var(--sol-primary); padding: 16px; display: inline-flex;"><BtnIcon v-bind="args" /></div>`,
  }),
};

// ── Style types ──────────────────────────────────────────────────────────

export const Outline: Story = {
  args: { styleType: 'outline' },
};

export const Ghost: Story = {
  args: { styleType: 'ghost' },
};

export const Link: Story = {
  args: { styleType: 'link', showLeftIcon: false },
};

export const Danger: Story = {
  args: { styleType: 'danger' },
};

export const Text: Story = {
  args: { styleType: 'text' },
};

// ── Sizes ────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

// ── States ───────────────────────────────────────────────────────────────

export const Hover: Story = {
  args: { state: 'hover' },
};

export const Focused: Story = {
  args: { state: 'focused' },
};

export const Pressed: Story = {
  args: { state: 'pressed' },
};

export const Disabled: Story = {
  args: { state: 'disabled' },
};

export const Loading: Story = {
  args: { showLoading: true },
};

// ── Icon slots ───────────────────────────────────────────────────────────

export const NoLeftIcon: Story = {
  args: { showLeftIcon: false },
};

export const WithRightIcon: Story = {
  args: { showRightIcon: true },
};

export const IconOnly: Story = {
  args: { showLabel: false, showLeftIcon: true },
};

// ── Matrix — all type × styleType combinations ──────────────────────────

export const AllTypesAndStyles: Story = {
  render: () => ({
    components: { BtnIcon },
    setup: () => ({
      types: ['primary', 'secondary', 'tertiary', 'white'] as const,
      styles: ['solid', 'outline', 'ghost', 'link', 'danger', 'text'] as const,
    }),
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; background: var(--sol-primary); padding: 16px;">
        <div v-for="styleType in styles" :key="styleType" style="display: flex; gap: 12px; align-items: center;">
          <BtnIcon
            v-for="type in types"
            :key="type"
            :type="type"
            :style-type="styleType"
            :label="\`\${type} / \${styleType}\`"
          />
        </div>
      </div>
    `,
  }),
};

// ── Matrix — all states per styleType ───────────────────────────────────

export const AllStates: Story = {
  render: () => ({
    components: { BtnIcon },
    setup: () => ({
      states: ['enabled', 'hover', 'focused', 'pressed', 'disabled', 'loading'] as const,
    }),
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <BtnIcon v-for="state in states" :key="state" :state="state" :label="state" />
      </div>
    `,
  }),
};
