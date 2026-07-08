import { useState, useId, forwardRef } from 'react';
import { TextLabel } from '../TextLabel/TextLabel';
import { TextHelper } from '../TextHelper/TextHelper';
import { IcBlank } from '../Icon/IcBlank';

// ── Types ────────────────────────────────────────────────────────────────────

export type TextInputState = 'default' | 'error' | 'disabled' | 'readonly';
export type TextInputSize = 'sm' | 'md';

export type TextInputProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  state?: TextInputState;
  size?: TextInputSize;
  required?: boolean;
  maxLength?: number;
  leadingIcon?: React.ReactNode;
  showLeadingIcon?: boolean;
  trailingIcon?: React.ReactNode;
  showTrailingIcon?: boolean;
  onTrailingIconClick?: () => void;
  showClearButton?: boolean;
  autoFocus?: boolean;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
};

// ── Close icon (filled circle + white ×) ─────────────────────────────────────

function IcClose({ size }: { size: 12 | 14 | 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        d="M10.5 5.5L5.5 10.5M5.5 5.5L10.5 10.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Style helpers ─────────────────────────────────────────────────────────────

function getWrapperCls(
  state: TextInputState,
  isFocused: boolean,
  size: TextInputSize,
): string {
  const sizeCls = size === 'sm' ? 'h-7.5 px-2.5' : 'h-9 px-3';

  const stateCls = (() => {
    if (state === 'disabled' || state === 'readonly')
      return 'bg-fill-disabled border-border-normal';
    if (state === 'error')
      return isFocused
        ? 'bg-surface-container border-error-dim shadow-[0_0_0_2px_var(--color-error-dim)]'
        : 'bg-surface-container border-error-dim';
    return isFocused
      ? 'bg-surface-container border-border-normal shadow-[0_0_0_2px_var(--color-primary)]'
      : 'bg-surface-container border-border-normal';
  })();

  return `flex items-center gap-1 overflow-hidden rounded-4 border shrink-0 w-full ${sizeCls} ${stateCls}`;
}

function getInputCls(state: TextInputState, size: TextInputSize): string {
  const sizeCls =
    size === 'sm'
      ? 'text-text-xs leading-text-xs'
      : 'text-text-sm leading-text-xs-2line';

  const colorCls =
    state === 'disabled'
      ? 'text-element-disabled placeholder:text-element-disabled cursor-not-allowed'
      : 'text-element-primary placeholder:text-element-quaternary';

  return `min-w-0 flex-1 bg-transparent outline-none font-regular overflow-hidden text-ellipsis whitespace-nowrap ${sizeCls} ${colorCls}`;
}

// ── TextInput ─────────────────────────────────────────────────────────────────

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      value: controlledValue,
      defaultValue = '',
      onChange,
      onFocus,
      onBlur,
      placeholder = 'Placeholder',
      label,
      helperText,
      state = 'default',
      size = 'md',
      required = false,
      maxLength,
      leadingIcon,
      showLeadingIcon = false,
      trailingIcon,
      showTrailingIcon = false,
      onTrailingIconClick,
      showClearButton = false,
      autoFocus = false,
      type = 'text',
      className,
    },
    ref,
  ) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const inputId = useId();

    const value =
      controlledValue !== undefined ? controlledValue : internalValue;
    const isDisabled = state === 'disabled';
    const isReadonly = state === 'readonly';
    const iconSize = size === 'sm' ? 14 : 16;
    const showClear =
      showClearButton && isFocused && value.length > 0 && !isDisabled && !isReadonly;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const next = e.target.value;
      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      setIsFocused(true);
      onFocus?.(e);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      setIsFocused(false);
      onBlur?.(e);
    }

    function handleClear() {
      if (controlledValue === undefined) setInternalValue('');
      onChange?.('');
    }

    return (
      <div className={`flex flex-col text-left ${className ?? ''}`}>
        {label && (
          <TextLabel label={label} required={required} size={size} />
        )}

        <div className={getWrapperCls(state, isFocused, size)}>
          {/* Leading icon */}
          {showLeadingIcon && (
            <span
              className={`shrink-0 flex items-center justify-center ${isDisabled ? 'text-element-disabled' : 'text-element-secondary'}`}
              style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
            >
              {leadingIcon ?? <IcBlank size={iconSize as 14 | 16} />}
            </span>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={isDisabled}
            readOnly={isReadonly}
            required={required}
            maxLength={maxLength}
            autoFocus={autoFocus}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={state === 'error' || undefined}
            className={getInputCls(state, size)}
          />

          {/* Clear button — shown when focused and has value */}
          {showClear && (
            <button
              type="button"
              tabIndex={-1}
              onMouseDown={(e) => {
                e.preventDefault();
                handleClear();
              }}
              className="shrink-0 flex items-center justify-center rounded-circle text-element-quaternary hover:text-element-primary focus:outline-none"
              style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
              aria-label="Clear"
            >
              <IcClose size={iconSize as 14 | 16} />
            </button>
          )}

          {/* Trailing icon */}
          {showTrailingIcon && !showClear && (
            <button
              type="button"
              tabIndex={-1}
              onClick={onTrailingIconClick}
              disabled={isDisabled}
              className={`shrink-0 flex items-center justify-center rounded-circle focus:outline-none ${isDisabled ? 'text-element-disabled cursor-not-allowed' : 'text-element-primary'}`}
              style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
            >
              {trailingIcon ?? <IcBlank size={iconSize as 14 | 16} />}
            </button>
          )}
        </div>

        {helperText && (
          <TextHelper
            helperText={helperText}
            type={state === 'error' ? 'error' : 'enabled'}
          />
        )}
      </div>
    );
  },
);

export default TextInput;
