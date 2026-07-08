import type { Meta, StoryObj } from '@storybook/react';
import { IcResponsive } from '../components/Icon/IcResponsive';
import type { IconSize } from '../components/Icon/IcResponsive';

type DropdownItemType = 'default' | 'radio' | 'checkbox';
type DropdownItemSize = 'sm' | 'md';
type DropdownItemState = 'enabled' | 'focused' | 'disabled';

type DropdownItemProps = {
  type?: DropdownItemType;
  size?: DropdownItemSize;
  state?: DropdownItemState;
  selected?: boolean;
  label?: string;
  showLeadingIcon?: boolean;
  onClick?: () => void;
};

// iconSize: IconSize union으로 제한 — Figma ic_responsive 허용 크기 (12|14|16|20|24|28|32)
const sizeConfig = {
  sm: {
    wrapperClass: 'min-h-sol-24 p-sol-6',
    textClass: 'text-text-xs leading-text-sm-compact',
    iconSize: 14 as IconSize,
  },
  md: {
    wrapperClass: 'min-h-8 py-sol-6 px-sol-8',
    textClass: 'text-text-sm leading-text-sm',
    iconSize: 16 as IconSize,
  },
} satisfies Record<DropdownItemSize, { wrapperClass: string; textClass: string; iconSize: IconSize }>;

function ResponsiveIcon({ size, disabled }: { size: number; disabled?: boolean }) {
  const color = disabled ? 'var(--sol-element-disabled)' : 'var(--sol-element-primary)';

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.16675 11.9993V10.666H3.16675V11.9993C3.16675 12.4596 3.53984 12.8327 4.00008 12.8327H5.33341V13.8327H4.00008C2.98756 13.8327 2.16675 13.0119 2.16675 11.9993ZM9.33342 12.8327V13.8327H6.66675V12.8327H9.33342ZM12.8334 11.9993V10.666H13.8334V11.9993C13.8334 13.0119 13.0126 13.8327 12.0001 13.8327H10.6667V12.8327H12.0001C12.4603 12.8327 12.8334 12.4596 12.8334 11.9993ZM3.16675 6.66602V9.33268H2.16675V6.66602H3.16675ZM13.8334 6.66602V9.33268H12.8334V6.66602H13.8334ZM2.16675 3.99935C2.16675 2.98683 2.98756 2.16602 4.00008 2.16602H5.33341V3.16602H4.00008C3.53984 3.16602 3.16675 3.53911 3.16675 3.99935V5.33268H2.16675V3.99935ZM12.8334 3.99935C12.8334 3.53911 12.4603 3.16602 12.0001 3.16602H10.6667V2.16602H12.0001C13.0126 2.16602 13.8334 2.98683 13.8334 3.99935V5.33268H12.8334V3.99935ZM9.33342 2.16602V3.16602H6.66675V2.16602H9.33342Z"
        fill={color}
      />
    </svg>
  );
}

function CheckIcon({ size, disabled }: { size: number; disabled?: boolean }) {
  const color = disabled ? 'var(--sol-element-disabled)' : 'var(--sol-element-brand)';

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M14.0561 4.7207L6.65698 12.1198C6.36408 12.4126 5.8893 12.4127 5.59644 12.1198L1.94409 8.46745L3.00464 7.4069L6.12638 10.5286L12.9955 3.66016L14.0561 4.7207Z"
        fill={color}
      />
    </svg>
  );
}

function RadioControl({ selected, disabled, size }: { selected?: boolean; disabled?: boolean; size: number }) {
  const outer = size;
  const inner = size === 14 ? 10 : 11;
  const dot = size === 14 ? 5 : 6;

  if (disabled) {
    return (
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-full"
        style={{
          width: outer,
          height: outer,
          background: 'var(--sol-fill-disabled)',
          border: '1px solid var(--sol-surface-variant)',
        }}
      />
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center justify-center" style={{ width: outer, height: outer }}>
      <span
        className="inline-flex items-center justify-center rounded-full"
        style={{
          width: inner,
          height: inner,
          background: selected ? 'var(--sol-element-brand)' : 'var(--sol-surface)',
          border: selected ? 'none' : '1px solid var(--sol-border-normal)',
        }}
      >
        {selected && (
          <span
            className="rounded-full bg-static-white"
            style={{
              width: dot,
              height: dot,
            }}
          />
        )}
      </span>
    </span>
  );
}

function CheckboxControl({ selected, disabled, size }: { selected?: boolean; disabled?: boolean; size: number }) {
  const box = size === 14 ? 10 : 11;

  if (disabled) {
    return (
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-[3px]"
        style={{
          width: size,
          height: size,
          background: 'var(--sol-fill-disabled)',
          border: '1px solid var(--sol-surface-variant)',
        }}
      />
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <span
        className="inline-flex items-center justify-center rounded-[3px]"
        style={{
          width: box,
          height: box,
          background: selected ? 'var(--sol-element-brand)' : 'var(--sol-surface)',
          border: selected ? 'none' : '1px solid var(--sol-border-normal)',
        }}
      >
        {selected && (
          <svg width={box} height={box} viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path
              d="M8.19935 2.75342L3.88322 7.06955C3.71236 7.24036 3.43541 7.24039 3.26457 7.06955L1.13403 4.93902L1.75269 4.32037L3.5737 6.14138L7.5807 2.13477L8.19935 2.75342Z"
              fill="var(--sol-static-white)"
            />
          </svg>
        )}
      </span>
    </span>
  );
}

function DropdownItem({
  type = 'default',
  size = 'md',
  state = 'enabled',
  selected = false,
  label = 'Select Item',
  showLeadingIcon = true,
  onClick,
}: DropdownItemProps) {
  const isDisabled = state === 'disabled';
  const isFocused = state === 'focused';
  const { wrapperClass, textClass, iconSize } = sizeConfig[size];

  const itemStyle = {
    background: selected ? 'var(--sol-selected-container)' : 'transparent',
    color: isDisabled ? 'var(--sol-element-disabled)' : 'var(--sol-element-primary)',
    outline: isFocused ? '2px solid var(--sol-element-brand-variant)' : 'none',
    outlineOffset: '-2px',
  };

  return (
    <button
      type="button"
      className={`relative inline-flex w-44 items-center rounded-sm text-left font-['Pretendard'] ${wrapperClass}`}
      style={itemStyle}
      disabled={isDisabled}
      onClick={onClick}
    >
      {type === 'default' && showLeadingIcon && (
        <IcResponsive size={iconSize}>
          <ResponsiveIcon size={iconSize} disabled={isDisabled} />
        </IcResponsive>
      )}

      {type === 'radio' && (
        <RadioControl selected={selected} disabled={isDisabled} size={iconSize} />
      )}

      {type === 'checkbox' && (
        <CheckboxControl selected={selected} disabled={isDisabled} size={iconSize} />
      )}

      <span className="min-w-0 flex-1 px-1">
        <span
          className={`block truncate ${textClass} ${selected && !isDisabled ? 'font-semibold' : 'font-regular'}`}
        >
          {label}
        </span>
      </span>

      {type === 'default' && (
        <IcResponsive size={iconSize}>
          <CheckIcon size={iconSize} disabled={isDisabled} />
        </IcResponsive>
      )}
    </button>
  );
}

const meta = {
  title: 'Components/Dropdown/DropdownItem',
  component: DropdownItem,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['default', 'radio', 'checkbox'] },
    size: { control: 'select', options: ['sm', 'md'] },
    state: { control: 'select', options: ['enabled', 'focused', 'disabled'] },
    selected: { control: 'boolean' },
    label: { control: 'text' },
    showLeadingIcon: { control: 'boolean' },
  },
  args: {
    type: 'default',
    size: 'md',
    state: 'enabled',
    selected: false,
    label: 'Select Item',
    showLeadingIcon: true,
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-32 items-start p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const Focused: Story = {
  args: { state: 'focused' },
};

export const Disabled: Story = {
  args: { state: 'disabled' },
};

export const Radio: Story = {
  args: { type: 'radio', selected: true },
};

export const Checkbox: Story = {
  args: { type: 'checkbox', selected: true },
};

const sizes: DropdownItemSize[] = ['sm', 'md'];
const states: DropdownItemState[] = ['enabled', 'focused', 'disabled'];
const types: DropdownItemType[] = ['default', 'radio', 'checkbox'];

export const AllVariants: Story = {
  render: () => (
    <div className="grid w-[623px] grid-cols-3 gap-x-5 gap-y-6 rounded-[5px] border border-surface-default p-6">
      {sizes.map((size) =>
        types.map((type) =>
          [false, true].map((selected) =>
            states.map((state) => (
              <DropdownItem
                key={`${size}-${type}-${selected}-${state}`}
                type={type}
                size={size}
                state={state}
                selected={selected}
              />
            )),
          ),
        ),
      )}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
