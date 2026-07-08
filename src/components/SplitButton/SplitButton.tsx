import { type ReactNode } from 'react';
import { IcResponsive } from '../Icon/IcResponsive';
import { IcBlank } from '../Icon/IcBlank';

// ── Types ──────────────────────────────────────────────────────────────────

export type SplitButtonProps = {
  label: string;
  icon?: ReactNode;
  showIcon?: boolean;
  disabled?: boolean;
  triggerOpen?: boolean;
  onPrimaryClick?: () => void;
  onTriggerClick?: () => void;
  'aria-label'?: string;
};

// ── Chevron Icon ───────────────────────────────────────────────────────────

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path
        d="M6 8L10 12L14 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Component ──────────────────────────────────────────────────────────────

export default function SplitButton({
  label,
  icon,
  showIcon = true,
  disabled = false,
  triggerOpen = false,
  onPrimaryClick,
  onTriggerClick,
  ...rest
}: SplitButtonProps) {
  const baseCls = disabled
    ? 'bg-fill-disabled text-element-disabled cursor-not-allowed'
    : 'bg-primary text-element-inverse cursor-pointer';

  return (
    <div
      className="inline-flex items-center"
      role="group"
      aria-label={rest['aria-label'] ?? label}
    >
      {/* ── Primary action ── */}
      <button
        type="button"
        disabled={disabled}
        onClick={onPrimaryClick}
        className={`group/pri relative flex h-9 items-center gap-sol-6 rounded-l-4 pl-sol-14 pr-sol-12 py-sol-10 ${baseCls}
          focus:outline-none focus-visible:shadow-focus-button-ring focus-visible:z-10
        `}
      >
        {showIcon && (
          <IcResponsive size={16} className="relative z-[1]">
            {icon ?? <IcBlank size={16} />}
          </IcResponsive>
        )}
        <span className="relative z-[1] whitespace-nowrap text-text-sm leading-text-sm font-semibold">
          {label}
        </span>

        {!disabled && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-l-4
              bg-interaction-inverse-normal
              group-hover/pri:bg-interaction-inverse-hover
              group-active/pri:bg-interaction-inverse-pressed"
          />
        )}
      </button>

      {/* ── Divider ── */}
      <div className="h-9 w-px bg-border-solid-variant" />

      {/* ── Trigger (dropdown) ── */}
      <button
        type="button"
        disabled={disabled}
        onClick={onTriggerClick}
        aria-expanded={triggerOpen}
        aria-haspopup="true"
        aria-label="More options"
        className={`group/trg relative flex size-9 items-center justify-center rounded-r-4 ${baseCls}
          focus:outline-none focus-visible:shadow-focus-button-ring focus-visible:z-10
        `}
      >
        <span className="relative z-[1]">
          <ChevronDownIcon open={triggerOpen} />
        </span>

        {!disabled && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-r-4
              bg-interaction-inverse-normal
              group-hover/trg:bg-interaction-inverse-hover
              group-active/trg:bg-interaction-inverse-pressed"
          />
        )}
      </button>
    </div>
  );
}
