import { useState, useId, useCallback, type ReactNode, type KeyboardEvent } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

export type AccordionSize = 'sm' | 'md' | 'lg';

export type AccordionItemDef = {
  label: string;
  children?: ReactNode;
  defaultExpanded?: boolean;
  disabled?: boolean;
};

export type AccordionProps = {
  items: AccordionItemDef[];
  size?: AccordionSize;
  showDivider?: boolean;
  allowMultiple?: boolean;
};

// ── Size tokens ────────────────────────────────────────────────────────────

const ICON_SIZE: Record<AccordionSize, string> = {
  sm: 'size-5',
  md: 'size-5',
  lg: 'size-5',
};

const ICON_PX: Record<AccordionSize, number> = {
  sm: 20,
  md: 20,
  lg: 20,
};

const TEXT_CLS: Record<AccordionSize, string> = {
  sm: 'text-text-sm leading-text-sm',
  md: 'text-text-sm leading-text-sm',
  lg: 'text-text-md leading-text-md',
};

const SPACER_W: Record<AccordionSize, string> = {
  sm: 'w-6',
  md: 'w-6',
  lg: 'w-7',
};

const PANEL_PADDING: Record<AccordionSize, string> = {
  sm: 'pt-2 pb-6',
  md: 'pt-2 pb-6',
  lg: 'pt-3 pb-9',
};

// ── Icons ──────────────────────────────────────────────────────────────────

function ChevronIcon({ open, size }: { open: boolean; size: number }) {
  return (
    <span
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`}
      style={{ display: 'block', width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M15.5303 11.4697C15.8232 11.7626 15.8232 12.2374 15.5303 12.5303L9.53027 18.5303L8.46973 17.4697L13.9395 12L8.46973 6.53027L9.53027 5.46973L15.5303 11.4697Z" fill="currentColor" />
      </svg>
    </span>
  );
}

// ── AccordionItem (internal) ───────────────────────────────────────────────

type AccordionItemProps = {
  label: string;
  children?: ReactNode;
  expanded: boolean;
  disabled?: boolean;
  size: AccordionSize;
  showDivider: boolean;
  onToggle: () => void;
};

function AccordionItem({
  label,
  children,
  expanded,
  disabled = false,
  size,
  showDivider,
  onToggle,
}: AccordionItemProps) {
  const id = useId();
  const triggerId = `accordion-trigger-${id}`;
  const panelId = `accordion-panel-${id}`;

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  }

  return (
    <div className="flex w-full flex-col">
      {/* ── Trigger (parent row) ── */}
      <button
        id={triggerId}
        type="button"
        role="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        className={`group relative flex w-full items-center gap-2 px-4 py-3 text-left
          focus:outline-none focus-visible:outline-none
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        `}
      >
        {/* Chevron icon with interaction circle */}
        <span
          className={`relative flex shrink-0 items-center justify-center text-element-quaternary ${ICON_SIZE[size]}`}
        >
          {!disabled && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1 rounded-circle bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
            />
          )}
          <ChevronIcon open={expanded} size={ICON_PX[size]} />
        </span>

        {/* Label */}
        <span
          className={`relative min-w-0 flex-1 ${TEXT_CLS[size]} ${
            expanded
              ? 'font-semibold text-element-brand-variant'
              : 'font-normal text-element-primary truncate'
          }`}
        >
          {label}
        </span>

        {/* Focus ring */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden rounded-1 border-2 border-element-brand group-focus-visible:block"
        />
      </button>

      {/* ── Divider ── */}
      {showDivider && <div className="h-px w-full bg-border-solid-variant" />}

      {/* ── Panel (child content) ── */}
      {expanded && children && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className="flex w-full flex-col bg-surface-container-low"
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ── AccordionPanel (child row) ─────────────────────────────────────────────

export type AccordionPanelItemProps = {
  children: ReactNode;
  size?: AccordionSize;
};

export function AccordionPanelItem({ children, size = 'lg' }: AccordionPanelItemProps) {
  return (
    <div className={`flex w-full items-center px-4 ${PANEL_PADDING[size]}`}>
      <div className={`shrink-0 ${SPACER_W[size]}`} />
      <div className={`min-w-0 flex-1 text-element-secondary ${TEXT_CLS[size]}`}>
        {children}
      </div>
    </div>
  );
}

// ── Accordion (root) ───────────────────────────────────────────────────────

export default function Accordion({
  items,
  size = 'lg',
  showDivider = true,
  allowMultiple = false,
}: AccordionProps) {
  const [expandedSet, setExpandedSet] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    items.forEach((item, i) => {
      if (item.defaultExpanded) initial.add(i);
    });
    return initial;
  });

  const toggle = useCallback(
    (index: number) => {
      setExpandedSet((prev) => {
        const next = new Set(allowMultiple ? prev : []);
        if (prev.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    },
    [allowMultiple],
  );

  return (
    <div className="flex w-full flex-col" role="group">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          label={item.label}
          expanded={expandedSet.has(index)}
          disabled={item.disabled}
          size={size}
          showDivider={showDivider}
          onToggle={() => toggle(index)}
        >
          {item.children}
        </AccordionItem>
      ))}
    </div>
  );
}
