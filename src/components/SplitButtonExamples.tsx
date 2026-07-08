import React, {type ReactElement} from 'react';

type SplitButtonSize = 'sm' | 'md' | 'lg';
type SplitButtonState = 'enabled' | 'hover' | 'focused' | 'pressed' | 'disabled';
type SplitButtonFocusTarget = 'main' | 'trigger';

type SplitButtonDemoProps = {
  size?: SplitButtonSize;
  state?: SplitButtonState;
  showIcon?: boolean;
  label?: string;
  menuOpen?: boolean;
  focusTarget?: SplitButtonFocusTarget;
};

const menuItems = ['Select Item', 'Select Item', 'Select Item', 'Select Item'];

export function SplitButtonIcon(): ReactElement {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5.25 14.75V12.75H6.75V14.75C6.75 15.03 6.97 15.25 7.25 15.25H9.25V16.75H7.25C6.15 16.75 5.25 15.85 5.25 14.75ZM12.75 15.25V16.75H10.75V15.25H12.75ZM15.25 12.75H16.75V14.75C16.75 15.85 15.85 16.75 14.75 16.75H14.25V15.25H14.75C15.03 15.25 15.25 15.03 15.25 14.75V12.75ZM6.75 9.25V10.75H5.25V9.25H6.75ZM16.75 9.25V10.75H15.25V9.25H16.75ZM5.25 5.25C5.25 4.15 6.15 3.25 7.25 3.25H9.25V4.75H7.25C6.97 4.75 6.75 4.97 6.75 5.25V7.25H5.25V5.25ZM15.25 5.25C15.25 4.97 15.03 4.75 14.75 4.75H14.25V3.25H14.75C15.85 3.25 16.75 4.15 16.75 5.25V7.25H15.25V5.25ZM12.75 3.25V4.75H10.75V3.25H12.75Z" fill="currentColor" />
    </svg>
  );
}

function ChevronDown(): ReactElement {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.5 6.25L8 9.75L11.5 6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SplitButtonMenu({items = menuItems}: {items?: string[]}): ReactElement {
  return (
    <div className="split-button-menu" role="menu">
      {items.map((item, index) => (
        <div className="split-button-menu__item" role="menuitem" key={`${item}-${index}`}>
          {item}
        </div>
      ))}
    </div>
  );
}

export function SplitButtonDemo({
  size = 'md',
  state = 'enabled',
  showIcon = true,
  label = 'Label',
  menuOpen = false,
  focusTarget = 'main',
}: SplitButtonDemoProps): ReactElement {
  const isDisabled = state === 'disabled';

  return (
    <div className={`split-button-demo-wrap${menuOpen ? ' split-button-demo-wrap--open' : ''}`}>
      <div className={`split-button-demo split-button-demo--${size} split-button-demo--${state} split-button-demo--focus-${focusTarget}`}>
        <button type="button" className="split-button-demo__main" disabled={isDisabled}>
          {showIcon && <span className="split-button-demo__icon"><SplitButtonIcon /></span>}
          <span>{label}</span>
        </button>
        <button type="button" className="split-button-demo__trigger" aria-label={`${label} options`} disabled={isDisabled}>
          <ChevronDown />
        </button>
      </div>
      {menuOpen && <SplitButtonMenu />}
    </div>
  );
}

export function BasicSplitButtonExample(): ReactElement {
  return <SplitButtonDemo label="Add Member" menuOpen />;
}

export function SplitButtonWithIconExample(): ReactElement {
  return <SplitButtonDemo label="Add Member" showIcon menuOpen />;
}

export function SplitButtonSizesExample(): ReactElement {
  return (
    <div className="split-button-example-row">
      <SplitButtonDemo size="sm" label="Label" />
      <SplitButtonDemo size="md" label="Label" />
      <SplitButtonDemo size="lg" label="Label" />
    </div>
  );
}

export function SplitButtonStatesExample(): ReactElement {
  const states: SplitButtonState[] = ['enabled', 'hover', 'focused', 'pressed', 'disabled'];

  return (
    <div className="split-button-example-state-grid">
      <div className="split-button-example-state-group">
        <strong>Main action button</strong>
        {states.map((state) => (
          <div className="split-button-example-state-row" key={`main-${state}`}>
            <span>{state.charAt(0).toUpperCase() + state.slice(1)}</span>
            <SplitButtonDemo state={state} focusTarget="main" />
          </div>
        ))}
      </div>
      <div className="split-button-example-state-group">
        <strong>Dropdown menu icon button</strong>
        {states.map((state) => (
          <div className="split-button-example-state-row" key={`trigger-${state}`}>
            <span>{state.charAt(0).toUpperCase() + state.slice(1)}</span>
            <SplitButtonDemo state={state} focusTarget="trigger" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SplitButtonMenuExample(): ReactElement {
  return <SplitButtonDemo label="Export" showIcon menuOpen />;
}

export const splitButtonSourceMap = {
  basic: `import {SplitButtonDemo} from '@site/src/components/SplitButtonExamples';

<SplitButtonDemo label="Add Member" menuOpen />`,
  withIcon: `import {SplitButtonDemo} from '@site/src/components/SplitButtonExamples';

<SplitButtonDemo label="Add Member" showIcon menuOpen />`,
  sizes: `import {SplitButtonDemo} from '@site/src/components/SplitButtonExamples';

<div className="split-button-example-row">
  <SplitButtonDemo size="sm" label="Label" />
  <SplitButtonDemo size="md" label="Label" />
  <SplitButtonDemo size="lg" label="Label" />
</div>`,
  states: `import {SplitButtonDemo} from '@site/src/components/SplitButtonExamples';

const states = ['enabled', 'hover', 'focused', 'pressed', 'disabled'];

<div className="split-button-example-state-grid">
  <div className="split-button-example-state-group">
    <strong>Main action button</strong>
    {states.map((state) => (
      <div className="split-button-example-state-row" key={\`main-\${state}\`}>
        <span>{state.charAt(0).toUpperCase() + state.slice(1)}</span>
        <SplitButtonDemo state={state} focusTarget="main" />
      </div>
    ))}
  </div>
  <div className="split-button-example-state-group">
    <strong>Dropdown menu icon button</strong>
    {states.map((state) => (
      <div className="split-button-example-state-row" key={\`trigger-\${state}\`}>
        <span>{state.charAt(0).toUpperCase() + state.slice(1)}</span>
        <SplitButtonDemo state={state} focusTarget="trigger" />
      </div>
    ))}
  </div>
</div>`,
  menu: `import {SplitButtonDemo} from '@site/src/components/SplitButtonExamples';

<SplitButtonDemo label="Export" showIcon menuOpen />`,
};
