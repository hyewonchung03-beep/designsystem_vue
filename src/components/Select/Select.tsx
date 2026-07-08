/**
 * Select / MultiSelect
 *
 * Figma: Select_field (YqKny45xSmjr76WGIXeL7P)
 *   - Trigger:      node 5732-79784
 *   - Dropdown:     node 13579-132834  (Select_field_dropdown)
 *   - text_label:   node 13579-132833 / 13706-121864
 *   - text_helper:  node 13569-87212
 */
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { TextLabel } from '../TextLabel/TextLabel';
import { TextHelper } from '../TextHelper/TextHelper';
import Dropdown, { DropdownItem } from '../Dropdown/Dropdown';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectState = 'default' | 'error' | 'disabled' | 'readonly';
export type SelectSize = 'sm' | 'md';

// ─── Size config ──────────────────────────────────────────────────────────────

const sizeConfig = {
  sm: { triggerHeight: 'h-[30px]', minTriggerHeight: 'min-h-[30px]' },
  md: { triggerHeight: 'h-9',     minTriggerHeight: 'min-h-9' },
} satisfies Record<SelectSize, { triggerHeight: string; minTriggerHeight: string }>;

// ─── Icons ────────────────────────────────────────────────────────────────────

function IcChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IcChevronUp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z"
        fill="currentColor"
        transform="rotate(180 12 12)"
      />
    </svg>
  );
}

function IcChipClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IcClear() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Shared Helpers ───────────────────────────────────────────────────────────

function getTriggerBorderClass(state: SelectState, isOpen: boolean) {
  if (state === 'disabled') return 'border-border-normal';
  if (state === 'error') {
    return isOpen
      ? 'border-error-dim shadow-[0_0_0_2px_var(--color-error-dim)]'
      : 'border-error-dim';
  }
  if (state === 'readonly') return 'border-border-normal';
  return isOpen
    ? 'border-border-normal shadow-[0_0_0_2px_var(--color-primary)]'
    : 'border-border-normal';
}


// ─── Select_field_dropdown (node 13579-132834) ────────────────────────────────

// ─── Select (Single) ──────────────────────────────────────────────────────────

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  state?: SelectState;
  size?: SelectSize;
  required?: boolean;
  className?: string;
};

export function Select({
  options,
  value: controlledValue,
  defaultValue = '',
  onChange,
  placeholder = 'placeholder',
  label,
  helperText,
  state = 'default',
  size = 'md',
  required = false,
  className = '',
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isDisabled = state === 'disabled';
  const isReadonly = state === 'readonly';
  const selectedLabel = options.find((o) => o.value === value)?.label;
  const { triggerHeight } = sizeConfig[size];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  function handleSelect(option: SelectOption) {
    if (controlledValue === undefined) setInternalValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (isDisabled || isReadonly) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((v) => !v);
    }
    if (e.key === 'Escape') setIsOpen(false);
  }

  const bgClass = isDisabled
    ? 'bg-fill-disabled cursor-not-allowed'
    : isReadonly
    ? 'bg-surface-container cursor-default'
    : isOpen
    ? 'bg-surface cursor-pointer'
    : 'bg-surface-container cursor-pointer hover:bg-interaction-neutral-hover';

  const borderClass = getTriggerBorderClass(state, isOpen);

  return (
    <div className={`relative flex flex-col items-start ${className}`} ref={containerRef}>
      {label && <TextLabel label={label} required={required} size={size} />}

      <button
        type="button"
        className={`relative flex ${triggerHeight} w-full items-center gap-1 overflow-hidden rounded-4 border pt-sol-8 pb-sol-8 pl-sol-12 pr-sol-8 focus:outline-none ${bgClass} ${borderClass}`}
        onClick={() => {
          if (!isDisabled && !isReadonly) setIsOpen((v) => !v);
        }}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 min-w-0 truncate text-left text-text-sm leading-text-sm-compact font-regular ${
            selectedLabel
              ? isDisabled
                ? 'text-element-disabled'
                : 'text-element-primary'
              : isDisabled
              ? 'text-element-disabled'
              : 'text-element-quaternary'
          }`}
        >
          {selectedLabel ?? placeholder}
        </span>
        <span
          className={`flex shrink-0 size-4 items-center justify-center ${
            isDisabled ? 'text-element-disabled' : 'text-element-quaternary'
          }`}
        >
          {isOpen ? <IcChevronUp /> : <IcChevronDown />}
        </span>
      </button>

      {isOpen && (
        <Dropdown compact={false} className="absolute left-0 right-0 top-full z-50 mt-1">
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              label={option.label}
              selected={value === option.value}
              onClick={() => handleSelect(option)}
            />
          ))}
        </Dropdown>
      )}

      {helperText && (
        <TextHelper helperText={helperText} type={state === 'error' ? 'error' : 'enabled'} />
      )}
    </div>
  );
}

// ─── MultiSelect ──────────────────────────────────────────────────────────────

export type MultiSelectProps = {
  options: SelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  state?: SelectState;
  size?: SelectSize;
  required?: boolean;
};

export function MultiSelect({
  options,
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = 'placeholder',
  label,
  helperText,
  state = 'default',
  size = 'md',
  required = false,
}: MultiSelectProps) {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isDisabled = state === 'disabled';
  const isReadonly = state === 'readonly';
  const { minTriggerHeight } = sizeConfig[size];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  function handleSelect(option: SelectOption) {
    const next = value.includes(option.value)
      ? value.filter((v) => v !== option.value)
      : [...value, option.value];
    if (controlledValue === undefined) setInternalValue(next);
    onChange?.(next);
  }

  function handleRemoveChip(val: string, e: React.MouseEvent) {
    e.stopPropagation();
    const next = value.filter((v) => v !== val);
    if (controlledValue === undefined) setInternalValue(next);
    onChange?.(next);
  }

  function handleClearAll(e: React.MouseEvent) {
    e.stopPropagation();
    if (controlledValue === undefined) setInternalValue([]);
    onChange?.([]);
  }

  const hasValues = value.length > 0;

  // +N more 측정: 칩 컨테이너에서 두 번째 행 이상으로 밀린 칩 수 계산
  const chipContainerRef = useRef<HTMLDivElement>(null);
  const [hiddenCount, setHiddenCount] = useState(0);

  useLayoutEffect(() => {
    const container = chipContainerRef.current;
    if (!container || value.length === 0) {
      setHiddenCount(0);
      return;
    }
    const chips = Array.from(container.children) as HTMLElement[];
    if (chips.length === 0) return;
    const firstRowTop = chips[0].offsetTop;
    setHiddenCount(chips.filter((c) => c.offsetTop > firstRowTop).length);
  }, [value]);

  const bgClass = isDisabled
    ? 'bg-fill-disabled cursor-not-allowed'
    : isReadonly
    ? 'bg-surface-container cursor-default'
    : isOpen
    ? 'bg-surface cursor-pointer'
    : 'bg-surface-container cursor-pointer hover:bg-interaction-neutral-hover';

  const borderClass = getTriggerBorderClass(state, isOpen);

  return (
    <div className="relative flex flex-col items-start" ref={containerRef}>
      {label && <TextLabel label={label} required={required} size={size} />}

      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => {
          if (!isDisabled && !isReadonly) setIsOpen((v) => !v);
        }}
        className={`relative flex ${minTriggerHeight} w-full items-start gap-1 overflow-hidden rounded-4 border pt-sol-8 pb-sol-8 pl-sol-12 pr-sol-8 ${bgClass} ${borderClass}`}
      >
        {/* Chips + placeholder */}
        <div className="flex flex-1 min-w-0 flex-col gap-1 overflow-hidden">
          {hasValues ? (
            <>
              {/* 단일 행 칩 영역: 넘치는 칩은 overflow-hidden으로 숨김 */}
              <div
                ref={chipContainerRef}
                className="flex flex-wrap gap-1 overflow-hidden max-h-5"
              >
                {value.map((v) => {
                  const opt = options.find((o) => o.value === v);
                  if (!opt) return null;
                  return (
                    <span
                      key={v}
                      className="inline-flex h-5 shrink-0 items-center gap-0.5 rounded-2 border border-border-normal bg-selected-container px-[5px] py-[3px]"
                    >
                      <span className="text-text-xs leading-text-xs font-regular text-element-brand-variant">
                        {opt.label}
                      </span>
                      {!isDisabled && !isReadonly && (
                        <button
                          type="button"
                          onClick={(e) => handleRemoveChip(v, e)}
                          className="flex shrink-0 items-center justify-center text-element-brand-variant focus:outline-none"
                          aria-label={`Remove ${opt.label}`}
                        >
                          <IcChipClose />
                        </button>
                      )}
                    </span>
                  );
                })}
              </div>
              {/* +N more */}
              {hiddenCount > 0 && (
                <span className="text-text-xs leading-text-xs font-regular text-element-tertiary">
                  +{hiddenCount} more
                </span>
              )}
            </>
          ) : (
            <span
              className={`text-text-sm leading-text-sm-compact font-regular ${
                isDisabled ? 'text-element-disabled' : 'text-element-quaternary'
              }`}
            >
              {placeholder}
            </span>
          )}
        </div>

        {/* Right icons */}
        <div className="flex shrink-0 items-center gap-2">
          {hasValues && !isDisabled && !isReadonly && (
            <button
              type="button"
              onClick={handleClearAll}
              className="flex size-4 items-center justify-center text-element-quaternary focus:outline-none"
              aria-label="Clear all"
            >
              <IcClear />
            </button>
          )}
          <span
            className={`flex size-4 items-center justify-center ${
              isDisabled ? 'text-element-disabled' : 'text-element-quaternary'
            }`}
          >
            {isOpen ? <IcChevronUp /> : <IcChevronDown />}
          </span>
        </div>
      </div>

      {isOpen && (
        <Dropdown compact={false} className="absolute left-0 right-0 top-full z-50 mt-1">
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              label={option.label}
              selected={value.includes(option.value)}
              type="checkbox"
              onClick={() => handleSelect(option)}
            />
          ))}
        </Dropdown>
      )}

      {helperText && (
        <TextHelper helperText={helperText} type={state === 'error' ? 'error' : 'enabled'} />
      )}
    </div>
  );
}
