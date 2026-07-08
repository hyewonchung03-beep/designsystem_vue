import type { Meta, StoryObj } from '@storybook/react';
import { Select, MultiSelect } from '../components/Select/Select';
import type { SelectSize } from '../components/Select/Select';

// ─── Sample Options ───────────────────────────────────────────────────────────

const basicOptions = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
  { value: 'opt3', label: 'Option 3' },
  { value: 'opt4', label: 'Option 4' },
  { value: 'opt5', label: 'Option 5' },
];

const countryOptions = [
  { value: 'kr', label: 'South Korea' },
  { value: 'us', label: 'United States' },
  { value: 'jp', label: 'Japan' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'cn', label: 'China' },
  { value: 'au', label: 'Australia' },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Select/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'error', 'disabled', 'readonly'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
  },
  args: {
    options: basicOptions,
    placeholder: 'placeholder',
    label: 'Label',
    state: 'default',
    size: 'md',
    required: false,
  },
  decorators: [
    (Story: React.FC) => (
      <div className="flex min-h-64 items-start p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Single: Placeholder ────────────────────────────────────────────────────────

export const Placeholder: Story = {
  name: 'Single — Placeholder',
  args: { label: 'Label', placeholder: 'placeholder' },
};

// ── Single: Done (selected) ────────────────────────────────────────────────────

export const Done: Story = {
  name: 'Single — Done',
  args: { label: 'Label', defaultValue: 'opt1' },
};

// ── Single: Error ──────────────────────────────────────────────────────────────

export const Error: Story = {
  name: 'Single — Error',
  args: {
    label: 'Label',
    defaultValue: 'opt1',
    state: 'error',
    helperText: 'Helper text',
  },
};

// ── Single: Disabled ───────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Single — Disabled',
  args: { label: 'Label', defaultValue: 'opt1', state: 'disabled' },
};

// ── Single: Readonly ───────────────────────────────────────────────────────────

export const Readonly: Story = {
  name: 'Single — Readonly',
  args: { label: 'Label', defaultValue: 'opt1', state: 'readonly' },
};

// ── Single: With Helper Text ───────────────────────────────────────────────────

export const WithHelperText: Story = {
  name: 'Single — With Helper Text',
  args: { label: 'Label', helperText: 'Helper text' },
};

// ── Single: Required ───────────────────────────────────────────────────────────

export const Required: Story = {
  name: 'Single — Required',
  args: { label: 'Label', required: true, placeholder: 'Select an option' },
};

// ── All States ─────────────────────────────────────────────────────────────────

const states = ['default', 'error', 'disabled', 'readonly'] as const;
const stateLabels = {
  default: 'Default',
  error: 'Error',
  disabled: 'Disabled',
  readonly: 'Readonly',
};

export const AllStates: Story = {
  name: 'All Single States',
  render: () => (
    <div className="inline-flex flex-col gap-6 rounded-[5px] p-6">
      <div className="grid grid-cols-4 gap-4">
        {states.map((state) => (
          <div key={state} className="flex flex-col">
            <span className="mb-3 text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
              {stateLabels[state]}
            </span>
            <Select
              options={basicOptions}
              label="Label"
              placeholder="placeholder"
              state={state}
              helperText={state === 'error' ? 'Helper text' : undefined}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {states.map((state) => (
          <div key={state} className="flex flex-col">
            <span className="mb-3 text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
              {stateLabels[state]} (done)
            </span>
            <Select
              options={basicOptions}
              label="Label"
              defaultValue="opt1"
              state={state}
              helperText={state === 'error' ? 'Helper text' : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Multi Select Stories ─────────────────────────────────────────────────────

export const MultiPlaceholder: Story = {
  name: 'Multi — Placeholder',
  render: () => (
    <div className="w-[360px]">
      <MultiSelect
        options={basicOptions}
        label="Label"
        placeholder="placeholder"
      />
    </div>
  ),
};

export const MultiDone: Story = {
  name: 'Multi — Done (chips)',
  render: () => (
    <div className="w-[360px]">
      <MultiSelect
        options={basicOptions}
        label="Label"
        defaultValue={['opt1', 'opt2', 'opt3']}
      />
    </div>
  ),
};

export const MultiError: Story = {
  name: 'Multi — Error',
  render: () => (
    <div className="w-[360px]">
      <MultiSelect
        options={basicOptions}
        label="Label"
        defaultValue={['opt1', 'opt2']}
        state="error"
        helperText="Helper text"
      />
    </div>
  ),
};

export const MultiDisabled: Story = {
  name: 'Multi — Disabled',
  render: () => (
    <div className="w-[360px]">
      <MultiSelect
        options={basicOptions}
        label="Label"
        defaultValue={['opt1', 'opt2', 'opt3']}
        state="disabled"
      />
    </div>
  ),
};

export const AllMultiStates: Story = {
  name: 'All Multi States',
  render: () => (
    <div className="inline-flex flex-col gap-6 rounded-[5px] p-6">
      {states.map((state) => (
        <div key={state} className="flex flex-col gap-2">
          <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
            {stateLabels[state]}
          </span>
          <div className="grid grid-cols-2 gap-4">
            <MultiSelect
              options={basicOptions}
              label="Label"
              placeholder="placeholder"
              state={state}
              helperText={state === 'error' ? 'Helper text' : undefined}
            />
            <MultiSelect
              options={basicOptions}
              label="Label"
              defaultValue={['opt1', 'opt2', 'opt3']}
              state={state}
              helperText={state === 'error' ? 'Helper text' : undefined}
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const WithLongOptions: Story = {
  name: 'With Long Options',
  render: () => (
    <div className="w-[240px]">
      <Select
        options={countryOptions}
        label="Country"
        placeholder="Select a country"
        helperText="Choose your country of residence"
      />
    </div>
  ),
};

const sizes: SelectSize[] = ['sm', 'md'];
const sizeHeightLabel: Record<SelectSize, string> = { sm: 'sm (30px)', md: 'md (36px)' };

export const SmVsMd: Story = {
  name: 'Size — sm vs md',
  render: () => (
    <div className="inline-flex flex-col gap-6 rounded-[5px] p-6">
      <div className="grid grid-cols-2 gap-6">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
              {sizeHeightLabel[size]}
            </span>
            <Select options={basicOptions} label="Label" placeholder="placeholder" size={size} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
              {sizeHeightLabel[size]} (done)
            </span>
            <Select options={basicOptions} label="Label" defaultValue="opt1" size={size} />
          </div>
        ))}
      </div>
    </div>
  ),
};
