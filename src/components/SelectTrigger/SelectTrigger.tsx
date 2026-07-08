/**
 * SelectTrigger (select_trigger)
 *
 * Figma: select_trigger (YqKny45xSmjr76WGIXeL7P)
 *   - All variants: node 14372-125525
 *
 * 옵션 목록을 여는 가벼운 트리거 버튼.
 * Toolbar, data table, filter, header 등에서 사용.
 */
import { useState, useRef, useEffect, type ReactNode } from 'react';
// TODO: 드롭다운 패널을 Dropdown 컴포넌트 대신 Menu 컴포넌트로 교체 검토
//       (Toolbar/Filter 컨텍스트에서는 menu_item 기반 패널이 더 적합할 수 있음)
import Dropdown, { DropdownItem } from '../Dropdown/Dropdown';
import type { SelectOption } from '../Select/Select';
import { IcResponsive } from '../Icon/IcResponsive';
import type { IconSize } from '../Icon/IcResponsive';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SelectTriggerState = 'enabled' | 'disabled' | 'error' | 'readonly';
export type SelectTriggerSize = 'sm' | 'md';

export type SelectTriggerProps = {
  options?: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: SelectTriggerSize;
  state?: SelectTriggerState;
  leftIcon?: ReactNode;
  badgeCount?: number;
  className?: string;
};

// ─── Size config ──────────────────────────────────────────────────────────────

const TEXT_CLS: Record<SelectTriggerSize, string> = {
  sm: 'text-text-sm leading-text-sm',
  md: 'text-text-md leading-text-md',
};

const CHEVRON_SIZE: Record<SelectTriggerSize, IconSize> = { sm: 16, md: 20 };
const LEFT_ICON_SIZE: Record<SelectTriggerSize, IconSize> = { sm: 16, md: 20 };

// ─── Icons ────────────────────────────────────────────────────────────────────
// NOTE: ic_chevron_down/up, ic_fill(error) 전용 컴포넌트가 src/components/Icon/에 없어
//       현재 inline SVG로 정의. 추후 IcChevron 컴포넌트를 Icon 폴더로 분리 권장.

function IcChevron({ size, open }: { size: IconSize; open: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-150 ${open ? 'rotate-180' : 'rotate-0'}`}
    >
      <path
        d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ic_fill_error_red (static/img/foundation/iconography/ic_fill_error_red.svg)
function IcErrorIndicator({ size }: { size: IconSize }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" fill="var(--sol-error)" />
      <path
        d="M11.25 14.4004H12.75V15.9375H11.25V14.4004ZM11.25 7H12.75V12.75H11.25V7Z"
        fill="var(--sol-static-white)"
      />
    </svg>
  );
}

// ─── SelectTrigger ────────────────────────────────────────────────────────────

export function SelectTrigger({
  options = [],
  value: controlledValue,
  defaultValue = '',
  onChange,
  placeholder = 'Select',
  size = 'sm',
  state = 'enabled',
  leftIcon,
  badgeCount,
  className = '',
}: SelectTriggerProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isDisabled = state === 'disabled';
  const isReadonly = state === 'readonly';
  const isError = state === 'error';
  const chevronSize = CHEVRON_SIZE[size];
  const leftIconSize = LEFT_ICON_SIZE[size];

  const displayLabel = options.find((o) => o.value === value)?.label ?? placeholder;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  function handleToggle() {
    if (!isDisabled && !isReadonly) setIsOpen((v) => !v);
  }

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

  const textColorCls = isDisabled
    ? 'text-element-disabled'
    : isReadonly
    ? 'text-element-secondary'
    : 'text-element-primary';

  const chevronColorCls =
    isDisabled || isReadonly ? 'text-element-disabled' : 'text-element-primary';

  return (
    <div className={`relative inline-flex text-left ${className}`} ref={containerRef}>
      <button
        type="button"
        disabled={isDisabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={[
          // focus-visible: 키보드 포커스 시 2px 아웃라인 (컴포넌트 상하좌우보다 2px 외부)
          // isOpen:        드롭다운 열린 상태에도 동일한 포커스 링 표시
          'relative inline-flex items-center gap-sol-4 rounded-4 w-full',
          'focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-primary)]',
          isDisabled
            ? 'cursor-not-allowed'
            : isReadonly
            ? 'cursor-default'
            : 'cursor-pointer hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed',
          isOpen ? 'shadow-[0_0_0_2px_var(--color-primary)]' : '',
          textColorCls,
        ].join(' ')}
      >
        {leftIcon && (
          <IcResponsive size={leftIconSize}>{leftIcon}</IcResponsive>
        )}

        <span className={`${TEXT_CLS[size]} font-regular truncate`}>
          {displayLabel}
        </span>

        {badgeCount !== undefined && (
          <span
            className={[
              'inline-flex h-4 min-w-4 items-center justify-center rounded-2 px-sol-4',
              'text-text-xs leading-text-xs font-semibold',
              isDisabled
                ? 'bg-fill-disabled text-element-disabled'
                : 'bg-secondary-container text-element-brand-variant',
            ].join(' ')}
          >
            {badgeCount}
          </span>
        )}

        {isError && (
          <span className="inline-flex shrink-0 items-center justify-center">
            <IcErrorIndicator size={chevronSize} />
          </span>
        )}

        <span className={`inline-flex shrink-0 items-center justify-center ${chevronColorCls}`}>
          <IcChevron size={chevronSize} open={isOpen} />
        </span>
      </button>

      {isOpen && options.length > 0 && (
        <Dropdown
          compact={size === 'sm'}
          className="absolute left-0 top-full z-50 mt-1"
        >
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
    </div>
  );
}
