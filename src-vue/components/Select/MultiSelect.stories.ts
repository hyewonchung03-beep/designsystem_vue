import type { Meta, StoryObj } from '@storybook/vue3-vite';
import MultiSelect from './MultiSelect.vue';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Pilot/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['default', 'error', 'disabled', 'readonly'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    options: fruitOptions,
    label: 'Fruits',
    placeholder: 'Select fruits',
    state: 'default',
    size: 'md',
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelection: Story = {
  args: { defaultValue: ['apple', 'banana'] },
};

// 칩이 두 번째 행으로 넘어가는 케이스: chipContainerRef의 offsetTop 비교 로직으로
// "+N more" 텍스트가 나타나는지 확인하기 위해 트리거 폭을 좁게 고정한다.
export const ChipOverflow: Story = {
  name: 'With overflow (+N more)',
  render: (args) => ({
    components: { MultiSelect },
    setup: () => ({ args }),
    template: `<div class="w-64"><MultiSelect v-bind="args" /></div>`,
  }),
  args: { defaultValue: ['apple', 'banana', 'cherry', 'durian', 'elderberry', 'fig'] },
};

export const WithHelperText: Story = {
  args: { defaultValue: ['apple'], helperText: 'Select one or more fruits.' },
};

export const ErrorState: Story = {
  args: { state: 'error', defaultValue: ['apple'], helperText: 'Please pick at least two.' },
};

export const Disabled: Story = {
  args: { state: 'disabled', defaultValue: ['apple', 'banana'] },
};

export const Readonly: Story = {
  args: { state: 'readonly', defaultValue: ['apple', 'banana'] },
};

export const SmallSize: Story = {
  args: { size: 'sm' },
};
