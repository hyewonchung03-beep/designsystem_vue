import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Radio from './Radio.vue';
import RadioGroup from './RadioGroup.vue';

const meta: Meta<typeof RadioGroup> = {
  title: 'Pilot/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Radio, RadioGroup },
    setup: () => {
      const value = ref('apple');
      return { value };
    },
    template: `
      <RadioGroup :value="value" @change="value = $event">
        <Radio value="apple" label="Apple" />
        <Radio value="banana" label="Banana" />
        <Radio value="cherry" label="Cherry" />
      </RadioGroup>
    `,
  }),
};

export const WithDescriptions: Story = {
  render: () => ({
    components: { Radio, RadioGroup },
    setup: () => {
      const value = ref('basic');
      return { value };
    },
    template: `
      <RadioGroup :value="value" @change="value = $event">
        <Radio value="basic" label="Basic plan" description="For individuals getting started." />
        <Radio value="pro" label="Pro plan" description="For growing teams." />
        <Radio value="enterprise" label="Enterprise plan" description="For large organizations." />
      </RadioGroup>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Radio, RadioGroup },
    setup: () => {
      const value = ref('apple');
      return { value };
    },
    template: `
      <RadioGroup :value="value" disabled @change="value = $event">
        <Radio value="apple" label="Apple" />
        <Radio value="banana" label="Banana" />
        <Radio value="cherry" label="Cherry" />
      </RadioGroup>
    `,
  }),
};

export const DisabledSingleOption: Story = {
  render: () => ({
    components: { Radio, RadioGroup },
    setup: () => {
      const value = ref('apple');
      return { value };
    },
    template: `
      <RadioGroup :value="value" @change="value = $event">
        <Radio value="apple" label="Apple" />
        <Radio value="banana" label="Banana (out of stock)" disabled />
        <Radio value="cherry" label="Cherry" />
      </RadioGroup>
    `,
  }),
};

export const Error: Story = {
  render: () => ({
    components: { Radio, RadioGroup },
    setup: () => {
      const value = ref('');
      return { value };
    },
    template: `
      <RadioGroup :value="value" @change="value = $event">
        <Radio value="apple" label="Apple" error required />
        <Radio value="banana" label="Banana" error required />
        <Radio value="cherry" label="Cherry" error required />
      </RadioGroup>
    `,
  }),
};

export const WithHelpIcon: Story = {
  render: () => ({
    components: { Radio, RadioGroup },
    setup: () => {
      const value = ref('apple');
      return { value };
    },
    template: `
      <RadioGroup :value="value" @change="value = $event">
        <Radio value="apple" label="Apple" help-icon />
        <Radio value="banana" label="Banana" help-icon />
      </RadioGroup>
    `,
  }),
};

export const MediumSize: Story = {
  render: () => ({
    components: { Radio, RadioGroup },
    setup: () => {
      const value = ref('apple');
      return { value };
    },
    template: `
      <RadioGroup :value="value" @change="value = $event">
        <Radio value="apple" label="Apple" size="md" />
        <Radio value="banana" label="Banana" size="md" />
        <Radio value="cherry" label="Cherry" size="md" />
      </RadioGroup>
    `,
  }),
};
