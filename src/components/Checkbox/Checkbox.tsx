import { useId, type InputHTMLAttributes } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

export type CheckboxSize = 'sm' | 'md' | 'lg';

export type CheckboxProps = {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  size?: CheckboxSize;
  onChange?: (checked: boolean) => void;
  className?: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'checked' | 'disabled' | 'onChange' | 'className' | 'size'
>;

// ── Size config ────────────────────────────────────────────────────────────

const sizeConfig: Record<CheckboxSize, { outer: string; box: string; checkW: number; checkH: number }> = {
  sm: { outer: 'size-5',  box: 'size-3.5', checkW: 10.598, checkH: 7.594   },
  md: { outer: 'size-6',  box: 'size-4',   checkW: 12.112, checkH: 8.67927 },
  lg: { outer: 'size-7',  box: 'size-5',   checkW: 15.14,  checkH: 10.849  },
};

// ── Icons ──────────────────────────────────────────────────────────────────

function CheckIcon({ w, h }: { w: number; h: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 12.112 8.67927" fill="none" aria-hidden="true">
      <path d="M12.112 1.06055L4.71289 8.45964C4.41999 8.75245 3.94521 8.7525 3.65234 8.45964L0 4.80729L1.06055 3.74674L4.18229 6.86849L11.0514 0L12.112 1.06055Z" fill="currentColor" />
    </svg>
  );
}

function IndeterminateIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-full">
      <path d="M20.25 11.25V12.75H3.75V11.25H20.25Z" fill="currentColor" />
    </svg>
  );
}

// ── Checkbox ───────────────────────────────────────────────────────────────

export default function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  label,
  size = 'md',
  onChange,
  className,
  id: externalId,
  ...rest
}: CheckboxProps) {
  const autoId = useId();
  const id = externalId ?? autoId;
  const isFilled = checked || indeterminate;
  const cfg = sizeConfig[size];

  return (
    <label
      htmlFor={id}
      className={`group inline-flex items-center gap-1.5
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className ?? ''}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-checked={indeterminate ? 'mixed' : checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="peer sr-only"
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
        }}
        {...rest}
      />

      <span
        aria-hidden="true"
        className={`relative inline-flex ${cfg.outer} shrink-0 items-center justify-center
          focus-visible:shadow-focus-button-ring
          peer-focus-visible:shadow-focus-button-ring`}
      >
        <span
          className={`relative inline-flex ${cfg.box} items-center justify-center overflow-clip rounded-2
            ${
              isFilled
                ? disabled ? 'bg-fill-disabled' : 'bg-tertiary'
                : disabled ? 'border border-border-disabled bg-fill-disabled' : 'border border-element-quaternary'
            }`}
        >
          {isFilled && (
            <span className="text-element-inverse">
              {indeterminate ? <IndeterminateIcon /> : <CheckIcon w={cfg.checkW} h={cfg.checkH} />}
            </span>
          )}

          {!disabled && (
            <span
              className="pointer-events-none absolute inset-0
                bg-interaction-inverse-normal
                group-hover:bg-interaction-inverse-hover
                group-active:bg-interaction-inverse-pressed"
            />
          )}
        </span>
      </span>

      {label && (
        <span
          className={`text-text-sm leading-text-sm
            ${disabled ? 'text-element-disabled' : 'text-element-primary'}`}
        >
          {label}
        </span>
      )}
    </label>
  );
}
