import React from 'react';

type ControlKind = 'checkbox' | 'radio' | 'switch';
type ControlSize = 'sm' | 'md';
type ControlState = 'enabled' | 'hover' | 'pressed' | 'focused' | 'error' | 'readonly' | 'disabled';

type ControlOptionProps = {
  kind: ControlKind;
  label?: string;
  description?: string;
  checked?: boolean;
  indeterminate?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  state?: ControlState;
  size?: ControlSize;
};

export function ControlMark({
  kind,
  checked = false,
  indeterminate = false,
  disabled = false,
  readOnly = false,
  state = 'enabled',
  size = 'md',
}: Pick<ControlOptionProps, 'kind' | 'checked' | 'indeterminate' | 'disabled' | 'readOnly' | 'state' | 'size'>): React.ReactElement {
  if (kind === 'switch') {
    return (
      <span
        className={[
          'control-doc-switch',
          `control-doc-switch--${size}`,
          checked ? 'control-doc-switch--on' : '',
          disabled ? 'control-doc-switch--disabled' : '',
          readOnly ? 'control-doc-switch--readonly' : '',
          state === 'focused' ? 'control-doc-switch--focused' : '',
        ].filter(Boolean).join(' ')}
        aria-hidden="true"
      >
        <span className="control-doc-switch__thumb" />
      </span>
    );
  }

  return (
    <span
      className={[
        'control-doc-mark',
        `control-doc-mark--${kind}`,
        `control-doc-mark--${size}`,
        checked ? 'control-doc-mark--checked' : '',
        indeterminate ? 'control-doc-mark--indeterminate' : '',
        disabled ? 'control-doc-mark--disabled' : '',
        readOnly ? 'control-doc-mark--readonly' : '',
        state === 'hover' ? 'control-doc-mark--hover' : '',
        state === 'pressed' ? 'control-doc-mark--pressed' : '',
        state === 'focused' ? 'control-doc-mark--focused' : '',
        state === 'error' ? 'control-doc-mark--error' : '',
      ].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {kind === 'checkbox' && checked && !indeterminate && (
        <svg viewBox="0 0 12 10" fill="none">
          <path d="M1.5 5L4.5 8L10.5 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {kind === 'checkbox' && indeterminate && <span />}
      {kind === 'radio' && checked && <span />}
    </span>
  );
}

export function ControlOption({
  kind,
  label = 'Option',
  description,
  checked = false,
  indeterminate = false,
  required = false,
  disabled = false,
  readOnly = false,
  state = 'enabled',
  size = 'md',
}: ControlOptionProps): React.ReactElement {
  return (
    <div className={[
      'control-doc-option',
      `control-doc-option--${kind}`,
      disabled ? 'control-doc-option--disabled' : '',
    ].filter(Boolean).join(' ')}>
      <ControlMark
        kind={kind}
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        readOnly={readOnly}
        state={state}
        size={size}
      />
      <span className="control-doc-option__text">
        <span className="control-doc-option__label">
          {label}
          {required && <span className="control-doc-required">*</span>}
        </span>
        {description && <span className="control-doc-option__description">{description}</span>}
      </span>
    </div>
  );
}

export function ControlGroupDemo({
  kind = 'checkbox',
  label = 'Group Label',
  options = ['Option', 'Option', 'Option'],
  description = false,
  required = false,
  error,
  columns = 1,
}: {
  kind?: ControlKind;
  label?: string;
  options?: string[];
  description?: boolean;
  required?: boolean;
  error?: string;
  columns?: 1 | 2 | 3;
}): React.ReactElement {
  return (
    <div className={`control-doc-group control-doc-group--cols-${columns}`}>
      <div className="control-doc-group__label">
        {label}
        {required && <span className="control-doc-required">*</span>}
      </div>
      <div className="control-doc-group__options">
        {options.map((option, index) => (
          <ControlOption
            key={`${option}-${index}`}
            kind={kind}
            label={option}
            checked={kind === 'radio' ? index === 0 : index % 2 === 0}
            description={description ? 'Description' : undefined}
            state={error ? 'error' : 'enabled'}
          />
        ))}
      </div>
      {error && <div className="control-doc-error">{error}</div>}
    </div>
  );
}

function ExampleWrap({children}: {children: React.ReactNode}): React.ReactElement {
  return <div className="control-example-wrap">{children}</div>;
}

export function BasicCheckboxExample(): React.ReactElement {
  return <ExampleWrap><ControlOption kind="checkbox" checked /></ExampleWrap>;
}

export function CheckboxWithDescriptionExample(): React.ReactElement {
  return <ExampleWrap><ControlOption kind="checkbox" checked label="Email" description="Receive updates by email." /></ExampleWrap>;
}

export function CheckboxGroupExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="checkbox" label="Notification" options={['Email', 'SMS', 'Push']} /></ExampleWrap>;
}

export function RequiredCheckboxGroupExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="checkbox" label="Permission" required options={['View', 'Edit', 'Delete']} /></ExampleWrap>;
}

export function ErrorCheckboxGroupExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="checkbox" label="Label" required error="Helper text" options={['Option', 'Option', 'Option']} /></ExampleWrap>;
}

export function DisabledCheckboxExample(): React.ReactElement {
  return <ExampleWrap><ControlOption kind="checkbox" label="Option" disabled /></ExampleWrap>;
}

export function ReadOnlyCheckboxExample(): React.ReactElement {
  return <ExampleWrap><ControlOption kind="checkbox" label="Option" checked readOnly /></ExampleWrap>;
}

export function IndeterminateCheckboxExample(): React.ReactElement {
  return <ExampleWrap><ControlOption kind="checkbox" label="All" indeterminate checked /></ExampleWrap>;
}

export function BasicRadioExample(): React.ReactElement {
  return <ExampleWrap><ControlOption kind="radio" checked /></ExampleWrap>;
}

export function RadioWithDescriptionExample(): React.ReactElement {
  return <ExampleWrap><ControlOption kind="radio" checked label="Gateway" description="Use gateway connection." /></ExampleWrap>;
}

export function RadioGroupExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="radio" label="System Notification" options={['Email', 'Notification', 'Option']} /></ExampleWrap>;
}

export function RequiredRadioGroupExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="radio" label="User Role" required options={['Admin', 'Editor', 'Viewer']} /></ExampleWrap>;
}

export function ErrorRadioGroupExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="radio" label="Group label" required error="Please select an option." options={['Option', 'Option', 'Option']} /></ExampleWrap>;
}

export function DisabledRadioExample(): React.ReactElement {
  return <ExampleWrap><ControlOption kind="radio" label="Option" disabled /></ExampleWrap>;
}

export function HorizontalRadioGroupExample(): React.ReactElement {
  return <ExampleWrap><div className="control-doc-inline"><ControlOption kind="radio" label="Option 1" checked /><ControlOption kind="radio" label="Option 2" /></div></ExampleWrap>;
}

export function RadioControlGroupExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="radio" label="Notification" options={['Option', 'Option', 'Option']} /></ExampleWrap>;
}

export function CheckboxControlGroupExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="checkbox" label="Multifunction" columns={2} options={['Option', 'Option', 'Option', 'Option']} /></ExampleWrap>;
}

export function SwitchControlGroupExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="switch" label="Features" options={['Gateway', 'BLE', 'Private Mode']} /></ExampleWrap>;
}

export function ControlGroupWithDescriptionExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="radio" label="User Role" description options={['Admin', 'Editor', 'Viewer']} /></ExampleWrap>;
}

export function RequiredControlGroupExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="radio" label="User Role" required options={['Admin', 'Editor', 'Viewer']} /></ExampleWrap>;
}

export function ErrorControlGroupExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="radio" label="User Role" required error="This option is not available for your current plan." options={['Admin', 'Editor', 'Viewer']} /></ExampleWrap>;
}

export function MultiColumnControlGroupExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="checkbox" label="Select Option" columns={3} options={['Option', 'Option', 'Option', 'Option', 'Option', 'Option']} /></ExampleWrap>;
}

export function BasicSwitchExample(): React.ReactElement {
  return <ExampleWrap><ControlOption kind="switch" label="Gateway" checked /></ExampleWrap>;
}

export function SwitchWithDescriptionExample(): React.ReactElement {
  return <ExampleWrap><ControlOption kind="switch" label="User Management" description="Allow admins to invite, edit, and remove users." checked /></ExampleWrap>;
}

export function SwitchGroupExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="switch" label="Notification" options={['Email', 'SMS', 'Message']} /></ExampleWrap>;
}

export function DisabledSwitchExample(): React.ReactElement {
  return <ExampleWrap><ControlOption kind="switch" label="Gateway" disabled /></ExampleWrap>;
}

export function ReadOnlySwitchExample(): React.ReactElement {
  return <ExampleWrap><ControlOption kind="switch" label="Gateway" checked readOnly /></ExampleWrap>;
}

export function SettingsListSwitchExample(): React.ReactElement {
  return <ExampleWrap><ControlGroupDemo kind="switch" label="User Management" description options={['User Management', 'Auto Backup', 'Private Mode']} /></ExampleWrap>;
}

const controlCode = {
  checkboxBasic: `<Checkbox label="Option" checked />`,
  checkboxDescription: `<Checkbox
  label="Email"
  description="Receive updates by email."
  checked
/>`,
  checkboxGroup: `<CheckboxGroup label="Notification">
  <Checkbox value="email">Email</Checkbox>
  <Checkbox value="sms">SMS</Checkbox>
  <Checkbox value="push">Push</Checkbox>
</CheckboxGroup>`,
  checkboxRequired: `<CheckboxGroup label="Permission" required>
  <Checkbox value="view">View</Checkbox>
  <Checkbox value="edit">Edit</Checkbox>
  <Checkbox value="delete">Delete</Checkbox>
</CheckboxGroup>`,
  checkboxError: `<CheckboxGroup label="Label" required errorMessage="Helper text">
  <Checkbox value="a">Option</Checkbox>
  <Checkbox value="b">Option</Checkbox>
  <Checkbox value="c">Option</Checkbox>
</CheckboxGroup>`,
  checkboxDisabled: `<Checkbox label="Option" disabled />`,
  checkboxReadOnly: `<Checkbox label="Option" checked readOnly />`,
  checkboxIndeterminate: `<Checkbox label="All" indeterminate />`,
  radioBasic: `<Radio label="Option" checked />`,
  radioDescription: `<Radio
  label="Gateway"
  description="Use gateway connection."
  checked
/>`,
  radioGroup: `<RadioGroup label="System Notification" value="email">
  <Radio value="email">Email</Radio>
  <Radio value="notification">Notification</Radio>
  <Radio value="option">Option</Radio>
</RadioGroup>`,
  radioRequired: `<RadioGroup label="User Role" required value="admin">
  <Radio value="admin">Admin</Radio>
  <Radio value="editor">Editor</Radio>
  <Radio value="viewer">Viewer</Radio>
</RadioGroup>`,
  radioError: `<RadioGroup label="Group label" required errorMessage="Please select an option.">
  <Radio value="a">Option</Radio>
  <Radio value="b">Option</Radio>
  <Radio value="c">Option</Radio>
</RadioGroup>`,
  radioDisabled: `<Radio label="Option" disabled />`,
  radioHorizontal: `<RadioGroup orientation="horizontal" value="option-1">
  <Radio value="option-1">Option 1</Radio>
  <Radio value="option-2">Option 2</Radio>
</RadioGroup>`,
  controlRadio: `<ControlGroup type="radio" label="Notification" options={options} />`,
  controlCheckbox: `<ControlGroup type="checkbox" label="Multifunction" options={options} />`,
  controlSwitch: `<ControlGroup type="switch" label="Features" options={options} />`,
  controlDescription: `<ControlGroup type="radio" label="User Role" description options={options} />`,
  controlRequired: `<ControlGroup type="radio" label="User Role" required options={options} />`,
  controlError: `<ControlGroup
  type="radio"
  label="User Role"
  required
  errorMessage="This option is not available for your current plan."
  options={options}
/>`,
  controlMultiColumn: `<ControlGroup type="checkbox" label="Select Option" columns={3} options={options} />`,
  switchBasic: `<Switch label="Gateway" checked />`,
  switchDescription: `<Switch
  label="User Management"
  description="Allow admins to invite, edit, and remove users."
  checked
/>`,
  switchGroup: `<SwitchGroup label="Notification">
  <Switch label="Email" />
  <Switch label="SMS" />
  <Switch label="Message" />
</SwitchGroup>`,
  switchDisabled: `<Switch label="Gateway" disabled />`,
  switchReadOnly: `<Switch label="Gateway" checked readOnly />`,
  switchSettings: `<SwitchGroup label="User Management" description>
  <Switch label="User Management" />
  <Switch label="Auto Backup" />
  <Switch label="Private Mode" />
</SwitchGroup>`,
};

export const controlSourceMap = controlCode;
