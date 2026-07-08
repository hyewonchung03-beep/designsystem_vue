import React from 'react';
import {Select, MultiSelect} from '@site/src/components/Select/Select';

type SelectState = 'enabled' | 'focused' | 'done' | 'error' | 'disabled' | 'readonly' | 'selected';

type SelectDemoProps = {
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  state?: SelectState;
  size?: 'sm' | 'md';
  text?: boolean;
  counter?: string;
  chips?: string[];
  open?: boolean;
  multiple?: boolean;
};

const selectOptions = [
  {value: 'opt1', label: 'Option 1'},
  {value: 'opt2', label: 'Option 2'},
  {value: 'opt3', label: 'Option 3'},
  {value: 'opt4', label: 'Option 4'},
  {value: 'opt5', label: 'Option 5'},
];

export function SelectDemo({
  label,
  placeholder = 'Select option',
  helper,
  value,
  state = 'enabled',
  size = 'md',
  text = false,
  counter,
  chips,
  open = false,
  multiple = false,
}: SelectDemoProps): React.ReactElement {
  const displayChips = chips ?? (multiple ? ['Device 01', 'Device 02'] : undefined);
  const componentState = state === 'error' || state === 'disabled' || state === 'readonly' ? state : 'default';
  const selectedValue = value || state === 'done' || state === 'selected' || state === 'focused' ? 'opt1' : undefined;
  const selectedValues = displayChips ? displayChips.map((_, index) => `opt${Math.min(index + 1, selectOptions.length)}`) : [];

  return (
    <div className={`select-demo select-demo--${size} select-demo--${state}${text ? ' select-demo--text' : ''}`}>
      {displayChips ? (
        <MultiSelect
          options={selectOptions}
          label={label}
          helperText={helper}
          placeholder={placeholder}
          defaultValue={selectedValues}
          state={componentState}
          size={size}
        />
      ) : (
        <Select
          options={selectOptions}
          label={label}
          helperText={helper}
          placeholder={value ?? placeholder}
          defaultValue={selectedValue}
          state={componentState}
          size={size}
        />
      )}
      {counter && <span className="select-demo__counter">{counter}</span>}
      {open && <span className="select-demo__open-note" aria-hidden="true" />}
    </div>
  );
}

export function BasicSelectExample(): React.ReactElement {
  return <SelectDemo />;
}

export function SelectWithLabelHelperExample(): React.ReactElement {
  return <SelectDemo label="Label" helper="Helper text" />;
}

export function TextSelectExample(): React.ReactElement {
  return <SelectDemo value="Device" text />;
}

export function SingleSelectStatesExample(): React.ReactElement {
  return (
    <div className="select-demo-state-grid">
      {(['enabled', 'focused', 'done', 'error', 'disabled', 'readonly', 'selected'] as SelectState[]).map((state) => (
        <div key={state}>
          <span>{state[0].toUpperCase() + state.slice(1)}</span>
          <SelectDemo value={state === 'enabled' ? undefined : 'Device'} state={state} helper={state === 'error' ? 'Select one option.' : undefined} />
        </div>
      ))}
    </div>
  );
}

export function MultiSelectExample(): React.ReactElement {
  return <SelectDemo multiple chips={['Device 01', 'Device 02', 'Device 03']} />;
}

export function MultiSelectStatesExample(): React.ReactElement {
  return (
    <div className="select-demo-state-grid">
      {(['enabled', 'focused', 'done', 'error', 'disabled', 'readonly', 'selected'] as SelectState[]).map((state) => (
        <div key={state}>
          <span>{state[0].toUpperCase() + state.slice(1)}</span>
          <SelectDemo multiple state={state} chips={['Chip 1', 'Chip 2', 'Chip 3']} helper={state === 'error' ? 'Remove one item.' : undefined} />
        </div>
      ))}
    </div>
  );
}

export function SelectWithErrorExample(): React.ReactElement {
  return <SelectDemo label="Label" value="Device" state="error" helper="Select an available device." />;
}

export function SelectWithCounterBadgeExample(): React.ReactElement {
  return <SelectDemo label="Device" multiple chips={['Device 01', 'Device 02', 'Device 03', 'Device 04']} counter="4" helper="Up to 5 devices." />;
}

export const selectionComponentSourceMap = {
  basicSelect: `<Select placeholder="Select option" />`,
  selectLabelHelper: `<Select label="Label" placeholder="Select option" helperText="Helper text" />`,
  textSelect: `<Select variant="text" value="Device" />`,
  singleSelectStates: `<Select state="focused" value="Device" />`,
  multiSelect: `<Select multiple value={['Device 01', 'Device 02', 'Device 03']} />`,
  multiSelectStates: `<Select multiple state="focused" value={selectedDevices} />`,
  selectError: `<Select label="Label" value="Device" state="error" helperText="Select an available device." />`,
  selectCounter: `<Select label="Device" multiple value={selectedDevices} counterBadge="4" helperText="Up to 5 devices." />`,
};
