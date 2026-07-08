import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ControlGroup from '../components/ControlGroup/ControlGroup';
import Checkbox from '../components/Checkbox/Checkbox';
import RadioGroup, { Radio } from '../components/Radio/Radio';
import Switch from '../components/Switch/Switch';

const meta = {
  title: 'Components/Controls/ControlGroup',
  component: ControlGroup,
  tags: ['autodocs'],
  argTypes: {
    legend:      { control: 'text', description: '그룹 라벨' },
    required:    { control: 'boolean', description: '필수 표시 (*)' },
    helperText:  { control: 'text', description: '도움말 / 에러 텍스트' },
    error:       { control: 'boolean', description: '에러 상태' },
    disabled:    { control: 'boolean', description: '전체 비활성화' },
    orientation: { control: 'radio', options: ['vertical', 'horizontal'], description: '레이아웃 방향' },
    columns:     { control: 'radio', options: [1, 2, 3], description: '컬럼 수 (vertical만)' },
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ControlGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default (Checkbox Group) ───────────────────────────────────────────

export const Default: Story = {
  name: 'Default (Checkbox Group)',
  args: {
    legend: 'Notification',
    children: null,
  },
  render: (args) => {
    const [values, setValues] = useState<Record<string, boolean>>({
      email: true,
      sms: false,
      push: true,
    });
    const toggle = (key: string) =>
      setValues((prev) => ({ ...prev, [key]: !prev[key] }));
    return (
      <ControlGroup {...args}>
        <Checkbox checked={values.email} onChange={() => toggle('email')} label="Email" />
        <Checkbox checked={values.sms} onChange={() => toggle('sms')} label="SMS" />
        <Checkbox checked={values.push} onChange={() => toggle('push')} label="Push" />
      </ControlGroup>
    );
  },
};

// ── Radio Group ────────────────────────────────────────────────────────

export const RadioGroupExample: Story = {
  name: 'Radio Group',
  args: {
    legend: 'User Role',
    children: null,
  },
  render: (args) => {
    const [value, setValue] = useState('admin');
    return (
      <ControlGroup {...args}>
        <RadioGroup value={value} onChange={setValue}>
          <Radio value="admin" label="Admin" />
          <Radio value="editor" label="Editor" />
          <Radio value="viewer" label="Viewer" />
        </RadioGroup>
      </ControlGroup>
    );
  },
};

// ── Switch Group ───────────────────────────────────────────────────────

export const SwitchGroupExample: Story = {
  name: 'Switch Group',
  args: {
    legend: 'Features',
    children: null,
  },
  render: (args) => {
    const [values, setValues] = useState<Record<string, boolean>>({
      gateway: true,
      ble: false,
      private: true,
    });
    const toggle = (key: string) =>
      setValues((prev) => ({ ...prev, [key]: !prev[key] }));
    return (
      <ControlGroup {...args}>
        <Switch checked={values.gateway} onChange={() => toggle('gateway')} label="Gateway" />
        <Switch checked={values.ble} onChange={() => toggle('ble')} label="BLE" />
        <Switch checked={values.private} onChange={() => toggle('private')} label="Private Mode" />
      </ControlGroup>
    );
  },
};

// ── Required ───────────────────────────────────────────────────────────

export const Required: Story = {
  name: 'Required',
  args: {
    legend: 'Permission',
    required: true,
    children: null,
  },
  render: (args) => (
    <ControlGroup {...args}>
      <Checkbox label="View" />
      <Checkbox label="Edit" />
      <Checkbox label="Delete" />
    </ControlGroup>
  ),
};

// ── Error ──────────────────────────────────────────────────────────────

export const Error: Story = {
  name: 'Error',
  args: {
    legend: 'Label',
    required: true,
    error: true,
    helperText: 'Helper text',
    children: null,
  },
  render: (args) => (
    <ControlGroup {...args}>
      <Checkbox label="Option" />
      <Checkbox label="Option" />
      <Checkbox label="Option" />
    </ControlGroup>
  ),
};

// ── Disabled ───────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    legend: 'Notification',
    disabled: true,
    children: null,
  },
  render: (args) => (
    <ControlGroup {...args}>
      <Checkbox checked label="Email" disabled />
      <Checkbox label="SMS" disabled />
      <Checkbox label="Push" disabled />
    </ControlGroup>
  ),
};

// ── Horizontal ─────────────────────────────────────────────────────────

export const Horizontal: Story = {
  name: 'Horizontal',
  args: {
    legend: 'Select Option',
    orientation: 'horizontal',
    children: null,
  },
  render: (args) => {
    const [value, setValue] = useState('a');
    return (
      <ControlGroup {...args}>
        <RadioGroup value={value} onChange={setValue}>
          <div className="flex flex-row gap-6">
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
            <Radio value="c" label="Option C" />
          </div>
        </RadioGroup>
      </ControlGroup>
    );
  },
};

// ── Multi Column ───────────────────────────────────────────────────────

export const MultiColumn: Story = {
  name: 'Multi Column (2 cols)',
  args: {
    legend: 'Multifunction',
    columns: 2,
    children: null,
  },
  render: (args) => (
    <ControlGroup {...args}>
      <Checkbox label="Option" />
      <Checkbox label="Option" />
      <Checkbox label="Option" />
      <Checkbox label="Option" />
    </ControlGroup>
  ),
};

// ── Three Column ───────────────────────────────────────────────────────

export const ThreeColumn: Story = {
  name: 'Multi Column (3 cols)',
  args: {
    legend: 'Select Option',
    columns: 3,
    children: null,
  },
  render: (args) => (
    <ControlGroup {...args}>
      <Checkbox label="Option" />
      <Checkbox label="Option" />
      <Checkbox label="Option" />
      <Checkbox label="Option" />
      <Checkbox label="Option" />
      <Checkbox label="Option" />
    </ControlGroup>
  ),
};

// ── With Helper Text ───────────────────────────────────────────────────

export const WithHelperText: Story = {
  name: 'With Helper Text',
  args: {
    legend: 'Notification',
    helperText: 'Select at least one notification method.',
    children: null,
  },
  render: (args) => (
    <ControlGroup {...args}>
      <Checkbox checked label="Email" />
      <Checkbox label="SMS" />
      <Checkbox label="Push" />
    </ControlGroup>
  ),
};

// ── All Control Types ──────────────────────────────────────────────────

export const AllControlTypes: Story = {
  name: 'All Control Types',
  args: {
    legend: '',
    children: null,
  },
  render: () => {
    const [radioValue, setRadioValue] = useState('email');
    const [checks, setChecks] = useState({ a: true, b: false, c: true });
    const [switches, setSwitches] = useState({ x: true, y: false, z: false });
    const toggleCheck = (k: string) =>
      setChecks((p) => ({ ...p, [k]: !p[k as keyof typeof p] }));
    const toggleSwitch = (k: string) =>
      setSwitches((p) => ({ ...p, [k]: !p[k as keyof typeof p] }));

    return (
      <div className="flex flex-col gap-8">
        {/* Checkbox */}
        <ControlGroup legend="Checkbox Group">
          <Checkbox checked={checks.a} onChange={() => toggleCheck('a')} label="Email" />
          <Checkbox checked={checks.b} onChange={() => toggleCheck('b')} label="SMS" />
          <Checkbox checked={checks.c} onChange={() => toggleCheck('c')} label="Push" />
        </ControlGroup>

        {/* Radio */}
        <ControlGroup legend="Radio Group">
          <RadioGroup value={radioValue} onChange={setRadioValue}>
            <Radio value="email" label="Email" />
            <Radio value="notification" label="Notification" />
            <Radio value="option" label="Option" />
          </RadioGroup>
        </ControlGroup>

        {/* Switch */}
        <ControlGroup legend="Switch Group">
          <Switch checked={switches.x} onChange={() => toggleSwitch('x')} label="Gateway" />
          <Switch checked={switches.y} onChange={() => toggleSwitch('y')} label="BLE" />
          <Switch checked={switches.z} onChange={() => toggleSwitch('z')} label="Private Mode" />
        </ControlGroup>

        {/* Required + Error */}
        <ControlGroup legend="Required + Error" required error helperText="Please select an option.">
          <Checkbox label="Option" />
          <Checkbox label="Option" />
          <Checkbox label="Option" />
        </ControlGroup>

        {/* Disabled */}
        <ControlGroup legend="Disabled Group" disabled>
          <Checkbox checked label="Option A" disabled />
          <Checkbox label="Option B" disabled />
        </ControlGroup>

        {/* Multi Column */}
        <ControlGroup legend="Multi Column (3 cols)" columns={3}>
          <Checkbox label="Option" />
          <Checkbox label="Option" />
          <Checkbox label="Option" />
          <Checkbox label="Option" />
          <Checkbox label="Option" />
          <Checkbox label="Option" />
        </ControlGroup>
      </div>
    );
  },
};
