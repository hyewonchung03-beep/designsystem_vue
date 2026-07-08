import { useId, type InputHTMLAttributes } from 'react';
import { IcTrigger } from '../Icon/IcTrigger';
import { IcHelp } from '../Icon/IcHelp';

// ── Types ──────────────────────────────────────────────────────────────────

export type SwitchSize = 'sm' | 'md';

export type SwitchProps = {
  checked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  size?: SwitchSize;
  showIcon?: boolean;
  label?: string;
  description?: string;
  helpIcon?: boolean;
  helpAriaLabel?: string;
  onHelpClick?: () => void;
  onChange?: (checked: boolean) => void;
  className?: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'checked' | 'disabled' | 'readOnly' | 'onChange' | 'size' | 'className'
>;

// ── Icons (md handle only) ─────────────────────────────────────────────────

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6.5 11.5L3 8l1-1 2.5 2.5L12 4l1 1-6.5 6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 5l6 6M11 5l-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Size configs ───────────────────────────────────────────────────────────

const sizeConfig = {
  sm: {
    track: 'w-[30px] h-[20px]',
    handle: 'size-[14px]',
    handleOn: 'left-[13px]',
    handleOff: 'left-[3px]',
    padding: 'top-[3px]',
    gap: 'gap-1.5',
    title: 'text-text-xs leading-text-xs',
    description: 'text-text-xxs leading-text-xxs',
    helpIconSize: 14,
  },
  md: {
    track: 'w-[52px] h-[32px]',
    handle: 'size-[26px]',
    handleOn: 'left-[23px]',
    handleOff: 'left-[3px]',
    padding: 'top-[3px]',
    gap: 'gap-3',
    title: 'text-text-sm leading-text-sm',
    description: 'text-text-xs leading-text-xs',
    helpIconSize: 16,
  },
} as const;

// ── Switch ─────────────────────────────────────────────────────────────────

export default function Switch({
  checked = false,
  disabled = false,
  readOnly = false,
  size = 'sm',
  showIcon = false,
  label,
  description,
  helpIcon = false,
  helpAriaLabel = '도움말',
  onHelpClick,
  onChange,
  className,
  id: externalId,
  ...rest
}: SwitchProps) {
  const autoId = useId();
  const id = externalId ?? autoId;
  const cfg = sizeConfig[size];

  const handleChange = () => {
    if (!disabled && !readOnly) onChange?.(!checked);
  };

  const trackBg = disabled
    ? 'bg-fill-disabled'
    : readOnly
      ? 'border border-border-normal-variant'
      : checked
        ? 'bg-tertiary'
        : 'bg-fill-inactive';

  const handleBg = disabled
    ? 'bg-fill-inactive'
    : readOnly
      ? 'bg-element-tertiary'
      : 'bg-static-white';

  const handleIconColor = disabled
    ? 'text-element-disabled'
    : readOnly
      ? 'text-static-white'
      : checked
        ? 'text-tertiary'
        : 'text-element-quaternary';

  return (
    <label
      htmlFor={id}
      className={`group inline-flex items-center ${cfg.gap}
        ${disabled ? 'cursor-not-allowed' : readOnly ? 'cursor-default' : 'cursor-pointer'}
        ${className ?? ''}`}
    >
      {/* Hidden native input */}
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        aria-checked={checked}
        className="peer sr-only"
        {...rest}
      />

      {/* Visual track */}
      <span
        aria-hidden="true"
        className={`relative inline-block shrink-0 rounded-circle ${cfg.track} ${trackBg}
          peer-focus-visible:shadow-focus-button-ring`}
      >
        {/* Handle */}
        <span
          className={`absolute ${cfg.padding} ${checked ? cfg.handleOn : cfg.handleOff}
            ${cfg.handle} rounded-circle ${handleBg}
            flex items-center justify-center
            transition-[left] duration-150 ease-in-out`}
        >
          {/* Icon inside handle (md only) */}
          {size === 'md' && showIcon && (
            checked ? (
              <CheckIcon className={handleIconColor} />
            ) : (
              <CloseIcon className={handleIconColor} />
            )
          )}
        </span>

        {/* Interaction overlay */}
        {!disabled && !readOnly && (
          <span
            className="pointer-events-none absolute inset-0 rounded-circle
              bg-interaction-neutral-normal
              group-hover:bg-interaction-neutral-hover
              group-active:bg-interaction-neutral-pressed"
          />
        )}
      </span>

      {/* Label */}
      {label && (
        <span className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
          <span className="flex items-center gap-0.5">
            <span className={`${cfg.title} ${disabled ? 'text-element-disabled' : 'text-element-primary'}`}>
              {label}
            </span>
            {helpIcon && (
              <IcTrigger
                size={cfg.helpIconSize}
                aria-label={helpAriaLabel}
                disabled={disabled}
                onClick={onHelpClick}
              >
                <IcHelp size={cfg.helpIconSize} />
              </IcTrigger>
            )}
          </span>
          {description && (
            <span className={`${cfg.description} text-element-tertiary`}>{description}</span>
          )}
        </span>
      )}
    </label>
  );
}
