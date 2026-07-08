import { useState, useCallback, type ReactNode } from 'react';
import { IcResponsive } from '../Icon/IcResponsive';

// ── Types ──────────────────────────────────────────────────────────────────

export type ToggleButtonItem = {
  label: string;
  badge?: number;
  showChevron?: boolean;
};

export type ToggleButtonProps = {
  label: string;
  selected?: boolean;
  badge?: number;
  showChevron?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export type ToggleButtonGroupProps = {
  items: ToggleButtonItem[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
};

// ── Chevron Icon (ic_chevron_down_regular) ─────────────────────────────────

function ChevronDownIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z" fill="currentColor" />
    </svg>
  );
}

// ── Badge ──────────────────────────────────────────────────────────────────

function Badge({ count }: { count: number }) {
  return (
    <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-2 bg-secondary-container px-1">
      <span className="whitespace-nowrap text-text-xs leading-text-xs font-semibold text-element-brand-variant">
        {count}
      </span>
    </span>
  );
}

// ── ToggleButton ───────────────────────────────────────────────────────────

export function ToggleButton({
  label,
  selected = false,
  badge,
  showChevron = false,
  disabled = false,
  onClick,
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={onClick}
      className={`group relative flex h-8 shrink-0 items-center justify-center gap-1 overflow-clip rounded-circle px-3 py-2
        ${
          disabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer'
        }
        ${
          selected
            ? 'bg-tertiary text-element-inverse font-semibold'
            : 'bg-surface-container text-element-quaternary font-regular'
        }
        focus:outline-none focus-visible:shadow-focus-button-ring
      `}
    >
      {/* Border for unselected */}
      {!selected && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-circle border border-border-normal"
        />
      )}

      {/* Interaction overlay */}
      {!disabled && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-circle
            bg-interaction-neutral-normal
            group-hover:bg-interaction-neutral-hover
            group-active:bg-interaction-neutral-pressed"
        />
      )}

      {/* Label */}
      <span className="relative whitespace-nowrap text-text-md leading-text-md">
        {label}
      </span>

      {/* Badge */}
      {badge != null && (
        <span className="relative">
          <Badge count={badge} />
        </span>
      )}

      {/* Chevron */}
      {showChevron && (
        <span className="relative flex shrink-0 items-center justify-center" style={{ width: 20, height: 20 }}>
          <ChevronDownIcon />
        </span>
      )}
    </button>
  );
}

// ── ToggleButtonGroup ──────────────────────────────────────────────────────

export default function ToggleButtonGroup({
  items,
  selectedIndex: controlledIndex,
  onSelect,
}: ToggleButtonGroupProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = controlledIndex ?? internalIndex;

  const handleSelect = useCallback(
    (index: number) => {
      if (onSelect) {
        onSelect(index);
      } else {
        setInternalIndex(index);
      }
    },
    [onSelect],
  );

  return (
    <div className="flex items-center gap-2 py-2" role="radiogroup">
      {items.map((item, index) => (
        <ToggleButton
          key={index}
          label={item.label}
          selected={index === activeIndex}
          badge={item.badge}
          showChevron={item.showChevron}
          onClick={() => handleSelect(index)}
        />
      ))}
    </div>
  );
}
