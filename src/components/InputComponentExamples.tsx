import React from 'react';

type TextInputDemoProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  helper?: string;
  required?: boolean;
  leading?: string;
  trailing?: string;
  state?: 'enabled' | 'focused' | 'done' | 'error' | 'disabled';
  size?: 'sm' | 'md';
  password?: boolean;
};

type TextAreaDemoProps = {
  label?: string;
  value?: string;
  helper?: string;
  required?: boolean;
  counter?: string;
  action?: string;
  copy?: boolean;
  resize?: boolean;
  state?: 'enabled' | 'focused' | 'done' | 'error' | 'disabled' | 'readonly';
  size?: 'sm' | 'md';
};

export function TextInputDemo({
  label,
  value = '',
  placeholder = 'placeholder text',
  helper,
  required = false,
  leading,
  trailing,
  state = 'enabled',
  size = 'md',
  password = false,
}: TextInputDemoProps): React.ReactElement {
  const displayValue = password && value ? '••••••••' : value;
  return (
    <label className={`input-demo-field input-demo-field--${size} input-demo-field--${state}`}>
      {label && <span className="input-demo-label">{label}{required && <b>*</b>}</span>}
      <span className="input-demo-control">
        {leading && <span className="input-demo-leading">{leading}</span>}
        <input value={displayValue} placeholder={placeholder} readOnly disabled={state === 'disabled'} />
        {trailing && <button type="button" className="input-demo-trailing" aria-label={trailing}>{trailing}</button>}
      </span>
      {helper && <span className="input-demo-helper">{helper}</span>}
    </label>
  );
}

export function TextAreaDemo({
  label,
  value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  helper,
  required = false,
  counter,
  action,
  copy = false,
  resize = false,
  state = 'enabled',
  size = 'md',
}: TextAreaDemoProps): React.ReactElement {
  return (
    <label className={`input-demo-field input-demo-textarea input-demo-textarea--${size} input-demo-field--${state}`}>
      {label && <span className="input-demo-label">{label}{required && <b>*</b>}</span>}
      <span className="input-demo-area-control">
        <textarea value={value} readOnly disabled={state === 'disabled'} />
        {(counter || action || copy || resize) && (
          <span className="input-demo-area-footer">
            {counter && <span className="input-demo-counter">{counter}</span>}
            {action && <button type="button" className="input-demo-trailing">{action}</button>}
            {copy && <button type="button" className="input-demo-trailing">Copy</button>}
            {resize && <span className="input-demo-resize" aria-hidden="true" />}
          </span>
        )}
      </span>
      {helper && <span className="input-demo-helper">{helper}</span>}
    </label>
  );
}

export function BasicTextInputExample(): React.ReactElement {
  return <TextInputDemo label="Label" />;
}

export function TextInputWithHelperExample(): React.ReactElement {
  return <TextInputDemo label="Label" helper="Helper text" />;
}

export function RequiredTextInputExample(): React.ReactElement {
  return <TextInputDemo label="Email Address" required placeholder="you@company.com" />;
}

export function TextInputLeadingExample(): React.ReactElement {
  return <TextInputDemo label="Amount" leading="$" placeholder="0.00" />;
}

export function TextInputTrailingExample(): React.ReactElement {
  return <TextInputDemo label="Password" value="password" password trailing="Show" />;
}

export function ErrorTextInputExample(): React.ReactElement {
  return <TextInputDemo label="Email Address" value="wrong value" helper="Helper text" state="error" />;
}

export function DisabledTextInputExample(): React.ReactElement {
  return <TextInputDemo label="Label" value="input" state="disabled" />;
}

export function BasicTextAreaExample(): React.ReactElement {
  return <TextAreaDemo label="Label" />;
}

export function TextAreaWithHelperExample(): React.ReactElement {
  return <TextAreaDemo label="Label" helper="Helper text" />;
}

export function TextAreaCounterExample(): React.ReactElement {
  return <TextAreaDemo label="Label" counter="57/100" />;
}

export function TextAreaActionExample(): React.ReactElement {
  return <TextAreaDemo label="Comment" counter="26/100" action="Submit" />;
}

export function TextAreaCopyExample(): React.ReactElement {
  return <TextAreaDemo label="Generated text" copy />;
}

export function ResizableTextAreaExample(): React.ReactElement {
  return <TextAreaDemo label="Description" counter="295/500" resize size="md" />;
}

export function ErrorTextAreaExample(): React.ReactElement {
  return <TextAreaDemo label="Description" counter="57/100" helper="Helper text" state="error" />;
}

export function DisabledTextAreaExample(): React.ReactElement {
  return <TextAreaDemo label="Description" state="disabled" />;
}

export function ReadOnlyTextAreaExample(): React.ReactElement {
  return <TextAreaDemo label="Description" state="readonly" />;
}

export const inputComponentSourceMap = {
  basicTextInput: `<TextInput label="Label" placeholder="placeholder text" />`,
  textInputHelper: `<TextInput label="Label" placeholder="placeholder text" helperText="Helper text" />`,
  requiredTextInput: `<TextInput label="Email Address" placeholder="you@company.com" required />`,
  textInputLeading: `<TextInput label="Amount" leadingContent="$" placeholder="0.00" />`,
  textInputTrailing: `<TextInput label="Password" type="password" trailingButton="show" />`,
  textInputError: `<TextInput label="Email Address" value="wrong value" helperText="Helper text" state="error" />`,
  textInputDisabled: `<TextInput label="Label" value="input" disabled />`,
  basicTextArea: `<TextArea label="Label" />`,
  textAreaHelper: `<TextArea label="Label" helperText="Helper text" />`,
  textAreaCounter: `<TextArea label="Label" characterCount="57/100" />`,
  textAreaAction: `<TextArea label="Comment" characterCount="26/100" actionLabel="Submit" />`,
  textAreaCopy: `<TextArea label="Generated text" copyAction />`,
  textAreaResizable: `<TextArea label="Description" characterCount="295/500" resizable />`,
  textAreaError: `<TextArea label="Description" characterCount="57/100" helperText="Helper text" state="error" />`,
  textAreaDisabled: `<TextArea label="Description" disabled />`,
  textAreaReadOnly: `<TextArea label="Description" readOnly />`,
};
