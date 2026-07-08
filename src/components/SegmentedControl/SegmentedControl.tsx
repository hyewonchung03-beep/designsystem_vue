import { useState, useCallback } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

export type SegmentedControlItem = {
  label: string;
};

export type SegmentedControlType = 'outlined' | 'solid';

export type SegmentedControlProps = {
  items: SegmentedControlItem[];
  type?: SegmentedControlType;
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  disabled?: boolean;
  className?: string;
};

// ── SegmentedControl ───────────────────────────────────────────────────────

export default function SegmentedControl({
  items,
  type = 'outlined',
  selectedIndex: controlledIndex,
  onSelect,
  disabled = false,
  className,
}: SegmentedControlProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = controlledIndex ?? internalIndex;

  const handleSelect = useCallback(
    (index: number) => {
      if (disabled) return;
      if (onSelect) {
        onSelect(index);
      } else {
        setInternalIndex(index);
      }
    },
    [onSelect, disabled],
  );

  const count = items.length;
  const isSolid = type === 'solid';

  return (
    <div
      role="tablist"
      className={`relative flex h-8 w-full items-center overflow-clip rounded-4
        ${isSolid ? 'bg-surface-container-low p-[3px]' : ''}
        ${className ?? ''}`}
    >
      {/* Outer border (outlined only) */}
      {!isSolid && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-4 border border-border-normal"
        />
      )}

      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const isFirst = index === 0;
        const isLast = index === count - 1;

        const outlinedRounding = isFirst
          ? 'rounded-l-4'
          : isLast
            ? 'rounded-r-4'
            : '';

        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => handleSelect(index)}
            className={`group relative flex h-full flex-1 items-center justify-center overflow-clip
              ${isSolid ? 'rounded-2' : outlinedRounding}
              ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
              focus:outline-none focus-visible:shadow-focus-button-ring
            `}
          >
            {/* ── Solid active: white bg + shadow ── */}
            {isSolid && isActive && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2 bg-secondary shadow-extralight"
              />
            )}

            {/* ── Outlined active: tertiary bg + border ── */}
            {!isSolid && isActive && (
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 bg-tertiary-container border border-tertiary ${outlinedRounding}`}
              />
            )}

            {/* Right divider for inactive outlined segments */}
            {!isSolid && !isActive && !isLast && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 border-r border-border-normal"
              />
            )}

            {/* Interaction overlay */}
            {!disabled && (
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0
                  ${isSolid ? 'rounded-2' : outlinedRounding}
                  bg-interaction-neutral-normal
                  group-hover:bg-interaction-neutral-hover
                  group-active:bg-interaction-neutral-pressed`}
              />
            )}

            {/* Label */}
            <span
              className={`relative whitespace-nowrap font-semibold
                ${isSolid ? 'px-sol-12 text-text-xs leading-text-xs' : 'px-sol-8 text-text-xs leading-text-xs'}
                ${isSolid
                  ? (isActive ? 'text-element-primary' : 'text-element-quaternary')
                  : (isActive ? 'text-element-brand-variant' : 'text-element-quaternary')
                }
                ${disabled ? 'opacity-50' : ''}
              `}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
