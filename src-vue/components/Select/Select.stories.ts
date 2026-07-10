import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Select from './Select.vue';

// NOTE: Select의 open 상태는 이제 Headless UI Listbox 내부 상태로 관리되며
// controlled `open` prop이 외부로 노출되지 않는다 (Listbox는 v-model을 지원하는
// controlled component라 Accordion/Disclosure 때와 달리 별도 workaround가
// 필요 없다). 이 프로젝트에 play function(testing-library) 의존성이 없어
// "초기부터 열린 패널" 스토리는 제공하지 않으며, Storybook 캔버스에서 트리거를
// 클릭해 open 상태(포커스 링, chevron 반전, 패널 표시)를 직접 확인한다.

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian' },
  { value: 'elderberry', label: 'Elderberry' },
];

const meta: Meta<typeof Select> = {
  title: 'Pilot/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['default', 'error', 'disabled', 'readonly'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    options: fruitOptions,
    label: 'Fruit',
    placeholder: 'Select a fruit',
    state: 'default',
    size: 'md',
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: 'banana' },
};

export const WithHelperText: Story = {
  args: { helperText: 'Choose your favorite fruit.' },
};

export const Required: Story = {
  args: { required: true },
};

export const ErrorState: Story = {
  args: { state: 'error', defaultValue: 'apple', helperText: 'Please pick a valid option.' },
};

export const Disabled: Story = {
  args: { state: 'disabled', defaultValue: 'apple' },
};

export const Readonly: Story = {
  args: { state: 'readonly', defaultValue: 'apple' },
};

export const SmallSize: Story = {
  args: { size: 'sm' },
};
