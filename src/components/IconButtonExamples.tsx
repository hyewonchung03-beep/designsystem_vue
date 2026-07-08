import React, {type ReactElement} from 'react';

type IconButtonStyle = 'filled' | 'ghost' | 'link';
type IconButtonType = 'primary' | 'secondary' | 'tertiary';
type IconButtonSize = 'sm' | 'md' | 'lg';
type IconButtonState = 'enabled' | 'hover' | 'focused' | 'pressed' | 'disabled';
type IconName = 'download' | 'refresh' | 'star' | 'share' | 'bookmark' | 'plus';

export type IconButtonDemoProps = {
  styleType?: IconButtonStyle;
  type?: IconButtonType;
  size?: IconButtonSize;
  state?: IconButtonState;
  icon?: IconName;
  shape?: 'square' | 'circle' | 'pill';
  label?: string;
};

export function IconGlyph({name = 'download'}: {name?: IconName}): ReactElement {
  if (name === 'refresh') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M15.5 6.5A6 6 0 1 0 16 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M15.5 3.5V6.5H12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === 'star') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 3.25L11.9 7.15L16.25 7.78L13.1 10.82L13.85 15.15L10 13.1L6.15 15.15L6.9 10.82L3.75 7.78L8.1 7.15L10 3.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === 'share') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M7.6 11.1L12.4 13.9M12.4 6.1L7.6 8.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="5.6" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14.4" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14.4" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (name === 'bookmark') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M6 4.25H14V15.75L10 13.25L6 15.75V4.25Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === 'plus') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 4.5V15.5M4.5 10H15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3.5V12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6.75 9.25L10 12.5L13.25 9.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 15.5H15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconButtonDemo({
  styleType = 'filled',
  type = 'primary',
  size = 'md',
  state = 'enabled',
  icon = 'download',
  shape = 'square',
  label,
}: IconButtonDemoProps): ReactElement {
  return (
    <button
      type="button"
      className={[
        'icon-button-doc-demo',
        `icon-button-doc-demo--${styleType}`,
        `icon-button-doc-demo--${type}`,
        `icon-button-doc-demo--${size}`,
        `icon-button-doc-demo--${state}`,
        shape === 'circle' ? 'icon-button-doc-demo--circle' : '',
        shape === 'pill' ? 'icon-button-doc-demo--pill' : '',
      ].filter(Boolean).join(' ')}
      aria-label={label ?? icon}
      disabled={state === 'disabled'}
    >
      <IconGlyph name={icon} />
    </button>
  );
}

export function LabeledAction({icon = 'download', children}: {icon?: IconName; children: React.ReactNode}): ReactElement {
  return (
    <button type="button" className="icon-button-labeled-action">
      <IconGlyph name={icon} />
      <span>{children}</span>
    </button>
  );
}

export function BasicIconButtonExample(): ReactElement {
  return (
    <IconButtonDemo icon="download" label="Download" />
  );
}

export function IconButtonVariantsExample(): ReactElement {
  return (
    <div className="icon-button-example-row">
      <IconButtonDemo styleType="filled" type="primary" icon="download" label="Download" />
      <IconButtonDemo styleType="ghost" type="primary" icon="refresh" label="Refresh" />
      <IconButtonDemo styleType="link" type="tertiary" icon="share" label="Share" />
    </div>
  );
}

export function IconButtonSizesExample(): ReactElement {
  return (
    <div className="icon-button-example-row">
      <IconButtonDemo size="sm" icon="download" label="Small download" />
      <IconButtonDemo size="md" icon="download" label="Medium download" />
      <IconButtonDemo size="lg" icon="download" label="Large download" />
    </div>
  );
}

export function IconButtonStatesExample(): ReactElement {
  const states: IconButtonState[] = ['enabled', 'hover', 'focused', 'pressed', 'disabled'];

  return (
    <div className="icon-button-example-state-list">
      {states.map((state) => (
        <div className="icon-button-example-state-list__row" key={state}>
          <span>{state.charAt(0).toUpperCase() + state.slice(1)}</span>
          <div className="icon-button-example-row">
            <IconButtonDemo state={state} icon="download" label={`${state} filled`} />
            <IconButtonDemo styleType="ghost" state={state} icon="refresh" label={`${state} ghost`} />
            <IconButtonDemo styleType="link" type="tertiary" state={state} icon="share" label={`${state} link`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function IconButtonGroupExample(): ReactElement {
  return (
    <div className="icon-button-example-row">
      <IconButtonDemo styleType="ghost" icon="download" label="Download" />
      <IconButtonDemo styleType="ghost" icon="refresh" label="Refresh" />
      <IconButtonDemo styleType="ghost" icon="star" label="Favorite" />
    </div>
  );
}

export const iconButtonSourceMap = {
  basic: `import {IconButtonDemo} from '@site/src/components/IconButtonExamples';

<IconButtonDemo icon="download" label="Download" />`,
  variants: `import {IconButtonDemo} from '@site/src/components/IconButtonExamples';

<div className="icon-button-example-row">
  <IconButtonDemo styleType="filled" type="primary" icon="download" label="Download" />
  <IconButtonDemo styleType="ghost" type="primary" icon="refresh" label="Refresh" />
  <IconButtonDemo styleType="link" type="tertiary" icon="share" label="Share" />
</div>`,
  sizes: `import {IconButtonDemo} from '@site/src/components/IconButtonExamples';

<div className="icon-button-example-row">
  <IconButtonDemo size="sm" icon="download" label="Small download" />
  <IconButtonDemo size="md" icon="download" label="Medium download" />
  <IconButtonDemo size="lg" icon="download" label="Large download" />
</div>`,
  states: `import {IconButtonDemo} from '@site/src/components/IconButtonExamples';

const states = ['enabled', 'hover', 'focused', 'pressed', 'disabled'];

<div className="icon-button-example-state-list">
  {states.map((state) => (
    <div className="icon-button-example-state-list__row" key={state}>
      <span>{state.charAt(0).toUpperCase() + state.slice(1)}</span>
      <div className="icon-button-example-row">
        <IconButtonDemo state={state} icon="download" label={\`\${state} filled\`} />
        <IconButtonDemo styleType="ghost" state={state} icon="refresh" label={\`\${state} ghost\`} />
        <IconButtonDemo styleType="link" type="tertiary" state={state} icon="share" label={\`\${state} link\`} />
      </div>
    </div>
  ))}
</div>`,
  group: `import {IconButtonDemo} from '@site/src/components/IconButtonExamples';

<div className="icon-button-example-row">
  <IconButtonDemo styleType="ghost" icon="download" label="Download" />
  <IconButtonDemo styleType="ghost" icon="refresh" label="Refresh" />
  <IconButtonDemo styleType="ghost" icon="star" label="Favorite" />
</div>`,
};
