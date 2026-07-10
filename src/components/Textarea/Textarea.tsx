import { useState, useRef, useId, useCallback, useEffect, forwardRef } from 'react';
import { TextLabel } from '../TextLabel/TextLabel';
import { TextHelper } from '../TextHelper/TextHelper';

// ── Types ────────────────────────────────────────────────────────────────────

export type TextareaState = 'default' | 'error' | 'disabled' | 'readonly';
export type TextareaSize = 'sm' | 'md';

export type TextareaProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  state?: TextareaState;
  size?: TextareaSize;
  required?: boolean;
  maxLength?: number;
  showCounter?: boolean;
  showResize?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  rows?: number;
  className?: string;
};

// ── Icons ────────────────────────────────────────────────────────────────────

function IcResize() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 1L1 7M7 4L4 7"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Border helper ────────────────────────────────────────────────────────────

function getBorderClass(state: TextareaState, isFocused: boolean) {
  if (state === 'disabled') return 'border-border-normal';
  if (state === 'error') {
    return isFocused
      ? 'border-error-dim shadow-[0_0_0_2px_var(--color-error-dim)]'
      : 'border-error-dim';
  }
  if (state === 'readonly') return 'border-border-normal';
  return isFocused
    ? 'border-border-normal shadow-[0_0_0_2px_var(--color-primary)]'
    : 'border-border-normal';
}

// ── Textarea ─────────────────────────────────────────────────────────────────

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
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
      showCounter = false,
      showResize = true,
      actionLabel,
      onAction,
      rows = 3,
      className,
    },
    ref,
  ) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const textareaId = useId();

    const value =
      controlledValue !== undefined ? controlledValue : internalValue;
    const isDisabled = state === 'disabled';
    const isReadonly = state === 'readonly';

    const bgClass = isDisabled
      ? 'bg-fill-disabled cursor-not-allowed'
      : isReadonly
        ? 'bg-surface-container cursor-default'
        : 'bg-surface-container';

    const borderClass = getBorderClass(state, isFocused);

    const textClass = isDisabled
      ? 'text-element-disabled placeholder:text-element-disabled'
      : 'text-element-primary placeholder:text-element-quaternary';

    const charCount = value.length;
    const showBottomControls = showCounter || !!actionLabel;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startHeight = useRef(0);

    const handleResizePointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (isDisabled || isReadonly) return;
        e.preventDefault();
        isDragging.current = true;
        startY.current = e.clientY;
        const container = containerRef.current;
        if (container) startHeight.current = container.offsetHeight;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      },
      [isDisabled, isReadonly],
    );

    const handleResizePointerMove = useCallback((e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const container = containerRef.current;
      if (!container) return;
      const delta = e.clientY - startY.current;
      const next = Math.max(56, startHeight.current + delta);
      container.style.height = `${next}px`;
    }, []);

    const handleResizePointerUp = useCallback(() => {
      isDragging.current = false;
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      const next = e.target.value;
      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);
    }

    function handleFocus(e: React.FocusEvent<HTMLTextAreaElement>) {
      setIsFocused(true);
      onFocus?.(e);
    }

    function handleBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
      setIsFocused(false);
      onBlur?.(e);
    }

    function setRef(el: HTMLTextAreaElement | null) {
      textareaRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref)
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
    }

    return (
      <div className={`flex flex-col items-start text-left ${className ?? ''}`}>
        {label && <TextLabel label={label} required={required} size={size} />}

        <div
          ref={containerRef}
          className={`relative flex min-h-14 w-full flex-col gap-3 rounded-4 border px-4 py-3 ${bgClass} ${borderClass}`}
          onClick={() => {
            if (!isDisabled && !isReadonly) textareaRef.current?.focus();
          }}
        >
          <textarea
            ref={setRef}
            id={textareaId}
            value={value}
            placeholder={placeholder}
            disabled={isDisabled}
            readOnly={isReadonly}
            required={required}
            maxLength={maxLength}
            rows={rows}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={state === 'error' || undefined}
            aria-describedby={helperText ? `${textareaId}-helper` : undefined}
            className={`min-w-0 flex-1 resize-none bg-transparent text-text-sm leading-text-sm-compact font-regular outline-none ${textClass}`}
          />

          {showBottomControls && (
            <div className="flex h-5 items-center gap-2">
              {showCounter && (
                <span className="flex-1 text-text-xxs leading-text-xxs font-semibold text-element-quaternary">
                  {charCount}
                  {maxLength != null && `/${maxLength}`}
                </span>
              )}
              {!showCounter && <span className="flex-1" />}
              {actionLabel && (
                <button
                  type="button"
                  onClick={onAction}
                  disabled={isDisabled}
                  className="rounded-2 text-text-sm leading-text-sm font-semibold text-primary
                    hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
                    focus-visible:outline-none focus-visible:shadow-focus-button-ring
                    disabled:text-element-disabled disabled:hover:bg-transparent"
                >
                  {actionLabel}
                </button>
              )}
            </div>
          )}

          {showResize && (
            <span
              className="absolute bottom-px right-px cursor-se-resize select-none p-1 text-element-quaternary"
              onPointerDown={handleResizePointerDown}
              onPointerMove={handleResizePointerMove}
              onPointerUp={handleResizePointerUp}
            >
              <IcResize />
            </span>
          )}
        </div>

        {helperText && (
          <TextHelper
            id={`${textareaId}-helper`}
            helperText={helperText}
            type={state === 'error' ? 'error' : 'enabled'}
          />
        )}
      </div>
    );
  },
);

export default Textarea;
