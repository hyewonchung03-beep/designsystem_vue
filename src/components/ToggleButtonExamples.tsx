import React from 'react';

type ToggleButtonSize = 'sm' | 'md';
type ToggleButtonState = 'enabled' | 'selected' | 'disabled';

export function ToggleBtn({
  size = 'md',
  state = 'enabled',
  badge,
  children = 'label',
}: {
  size?: ToggleButtonSize;
  state?: ToggleButtonState;
  badge?: number;
  children?: React.ReactNode;
}) {
  return (
    <div className={`toggle-button-demo toggle-button-demo--${size} toggle-button-demo--${state}`}>
      <span className="toggle-button-demo__label">{children}</span>
      {badge !== undefined && (
        <span className="toggle-button-demo__badge">{badge}</span>
      )}
      <span className="toggle-button-demo__chevron" aria-hidden="true">
        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4.5L6 7.5L10 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}

export function BasicToggleButtonExample() {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'32px',gap:'12px'}}>
      <ToggleBtn>label</ToggleBtn>
    </div>
  );
}

export function ToggleButtonWithBadgeExample() {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'32px',gap:'12px'}}>
      <ToggleBtn state="selected" badge={1}>label</ToggleBtn>
      <ToggleBtn badge={3}>label</ToggleBtn>
    </div>
  );
}

export function ToggleButtonGroupExample() {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'32px',gap:'8px',flexWrap:'wrap'}}>
      <ToggleBtn state="selected">All</ToggleBtn>
      <ToggleBtn>ESL</ToggleBtn>
      <ToggleBtn>Gateway</ToggleBtn>
      <ToggleBtn>Power Rail</ToggleBtn>
      <ToggleBtn>Newton Eye</ToggleBtn>
    </div>
  );
}

export function ToggleButtonSizesExample() {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'32px',gap:'16px',flexWrap:'wrap'}}>
      <ToggleBtn size="sm" state="selected" badge={4}>Small</ToggleBtn>
      <ToggleBtn size="md" state="selected" badge={88}>Medium</ToggleBtn>
    </div>
  );
}

export function ToggleButtonStatesExample() {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'32px',gap:'12px',flexWrap:'wrap'}}>
      <ToggleBtn>Enabled</ToggleBtn>
      <ToggleBtn state="selected">Selected</ToggleBtn>
      <ToggleBtn state="disabled">Disabled</ToggleBtn>
    </div>
  );
}

export const toggleButtonSourceMap = {
  basic: `<ToggleButton>label</ToggleButton>`,
  withBadge: `<ToggleButton badge={1} selected>label</ToggleButton>
<ToggleButton badge={3}>label</ToggleButton>`,
  group: `<ToggleButtonGroup>
  <ToggleButton selected>All</ToggleButton>
  <ToggleButton>ESL</ToggleButton>
  <ToggleButton>Gateway</ToggleButton>
  <ToggleButton>Power Rail</ToggleButton>
  <ToggleButton>Newton Eye</ToggleButton>
</ToggleButtonGroup>`,
  sizes: `<ToggleButton size="sm" badge={4}>Small</ToggleButton>
<ToggleButton size="md" badge={88}>Medium</ToggleButton>`,
  states: `<ToggleButton>Enabled</ToggleButton>
<ToggleButton selected>Selected</ToggleButton>
<ToggleButton disabled>Disabled</ToggleButton>`,
};
