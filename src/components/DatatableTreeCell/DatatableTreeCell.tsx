import { useState, useCallback } from 'react';
import { BadgeCounter } from '../Badge/BadgeCounter';

// ── Types ────────────────────────────────────────────────────────────────────

export type DatatableTreeCellProps = {
  label?: string;
  branch?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  tier?: 1 | 2 | 3 | 4;
  showBadge?: boolean;
  badgeText?: string;
  showCounter?: boolean;
  counterCount?: number;
  counterTotal?: number;
  className?: string;
};

// ── Icons (ic_state: 상태 결합형 아이콘 — CLAUDE.md ic_state 예외 적용) ──────

function IcChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15.5303 11.4697C15.8232 11.7626 15.8232 12.2374 15.5303 12.5303L9.53027 18.5303L8.46973 17.4697L13.9395 12L8.46973 6.53027L9.53027 5.46973L15.5303 11.4697Z" fill="currentColor" />
    </svg>
  );
}

function IcChevronUp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11.5264 8.41809C11.8209 8.17778 12.2557 8.19524 12.5303 8.46984L18.5303 14.4698L17.4697 15.5304L12 10.0607L6.53027 15.5304L5.46973 14.4698L11.4697 8.46984L11.5264 8.41809Z" fill="currentColor" />
    </svg>
  );
}

// ── Tier indentation ─────────────────────────────────────────────────────────

// SpacerLevel widths from Figma: level01=14px, level02=42px, level03=86px, level04=120px
const tierPadding: Record<number, string> = {
  1: 'pl-[14px]',
  2: 'pl-[42px]',
  3: 'pl-[86px]',
  4: 'pl-[120px]',
};

// ── DatatableTreeCell ────────────────────────────────────────────────────────

export function DatatableTreeCell({
  label = 'Label',
  branch = true,
  open: controlledOpen,
  defaultOpen = false,
  onToggle,
  tier = 1,
  showBadge = false,
  badgeText = 'Default',
  showCounter = false,
  counterCount = 1,
  counterTotal = 1,
  className,
}: DatatableTreeCellProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleToggle = useCallback(() => {
    if (!branch) return;
    const next = !isOpen;
    if (controlledOpen === undefined) setInternalOpen(next);
    onToggle?.(next);
  }, [branch, isOpen, controlledOpen, onToggle]);

  return (
    <div
      className={`flex h-[52px] items-center py-3 ${tierPadding[tier] ?? tierPadding[1]} ${className ?? ''}`}
    >
      <div className="flex items-center gap-2">
        {branch ? (
          <button
            type="button"
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-label={isOpen ? `Collapse ${label}` : `Expand ${label}`}
            className="flex shrink-0 items-center justify-center rounded-circle text-element-quaternary
              hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
              focus-visible:outline-none focus-visible:shadow-focus-button-ring"
          >
            {isOpen ? <IcChevronUp /> : <IcChevronRight />}
          </button>
        ) : (
          <span className="size-5 shrink-0" />
        )}

        <span className={`truncate text-text-md leading-text-md text-element-secondary ${branch && isOpen ? 'font-semibold' : 'font-regular'}`}>
          {label}
        </span>

        {branch && tier === 1 && showCounter && (
          <BadgeCounter count={counterCount} total={counterTotal} />
        )}

        {branch && tier === 1 && showBadge && (
          <span className="inline-flex shrink-0 items-center justify-center rounded-circle border border-border-normal px-2 py-1 text-text-xs leading-text-xs font-regular text-element-tertiary">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}

export default DatatableTreeCell;
