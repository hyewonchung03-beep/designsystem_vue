import { useId, createContext, useContext, type InputHTMLAttributes } from 'react';
import { IcTrigger } from '../Icon/IcTrigger';
import { IcHelp } from '../Icon/IcHelp';

// ── Types ──────────────────────────────────────────────────────────────────

export type RadioSize = 'sm' | 'md';

export type RadioProps = {
  value: string;
  label?: string;
  description?: string;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  size?: RadioSize;
  helpIcon?: boolean;
  helpAriaLabel?: string;
  onHelpClick?: () => void;
  className?: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'disabled' | 'onChange' | 'className' | 'checked' | 'size'
>;

export type RadioGroupProps = {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

// ── Context ────────────────────────────────────────────────────────────────

type RadioContextValue = {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

const RadioContext = createContext<RadioContextValue | null>(null);

// ── Size configs ───────────────────────────────────────────────────────────

const sizeConfig = {
  sm: {
    hit: 'size-6',
    ring: 'size-4',
    dot: 'size-2',
    title: 'text-text-xs leading-text-xs',
    description: 'text-text-xxs leading-text-xxs',
    helpIconSize: 14,
  },
  md: {
    hit: 'size-7',
    ring: 'size-5',
    dot: 'size-2.5',
    title: 'text-text-sm leading-text-sm',
    description: 'text-text-xs leading-text-xs',
    helpIconSize: 16,
  },
} as const;

// ── Radio ──────────────────────────────────────────────────────────────────

export function Radio({
  value,
  label,
  description,
  required = false,
  error = false,
  disabled: disabledProp = false,
  size = 'sm',
  helpIcon = false,
  helpAriaLabel = '도움말',
  onHelpClick,
  className,
  id: externalId,
  ...rest
}: RadioProps) {
  const autoId = useId();
  const id = externalId ?? autoId;
  const ctx = useContext(RadioContext);

  const name = ctx?.name ?? '';
  const checked = ctx?.value === value;
  const disabled = disabledProp || ctx?.disabled || false;
  const cfg = sizeConfig[size];

  const handleChange = () => {
    if (!disabled) ctx?.onChange?.(value);
  };

  return (
    <label
      htmlFor={id}
      className={`group inline-flex items-start gap-1.5
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className ?? ''}`}
    >
      {/* Hidden native input */}
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        aria-invalid={error || undefined}
        className="peer sr-only"
        {...rest}
      />

      {/* Visual radio */}
      <span
        aria-hidden="true"
        className={`relative inline-flex ${cfg.hit} shrink-0 items-center justify-center
          peer-focus-visible:shadow-focus-button-ring peer-focus-visible:rounded-circle`}
      >
        <span
          className={`relative inline-flex ${cfg.ring} items-center justify-center overflow-clip rounded-circle
            ${
              checked
                ? disabled
                  ? 'bg-fill-disabled'
                  : error
                    ? 'bg-error'
                    : 'bg-tertiary'
                : disabled
                  ? 'border border-border-disabled'
                  : error
                    ? 'border border-error-dim'
                    : 'border border-element-quaternary'
            }
          `}
        >
          {/* Inner dot */}
          {checked && (
            <span className={`${cfg.dot} rounded-circle ${disabled ? 'bg-element-disabled' : 'bg-element-inverse'}`} />
          )}

          {/* Interaction overlay */}
          {!disabled && (
            <span
              className="pointer-events-none absolute inset-0 rounded-circle
                bg-interaction-inverse-normal
                group-hover:bg-interaction-inverse-hover
                group-active:bg-interaction-inverse-pressed"
            />
          )}
        </span>
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
            {required && <span className={`${cfg.title} text-error`}>*</span>}
          </span>
          {description && (
            <span className={`${cfg.description} text-element-tertiary`}>{description}</span>
          )}
        </span>
      )}
    </label>
  );
}

// ── RadioGroup ─────────────────────────────────────────────────────────────

export default function RadioGroup({
  name: nameProp,
  value,
  onChange,
  disabled = false,
  children,
  className,
}: RadioGroupProps) {
  const autoName = useId();
  const name = nameProp ?? autoName;

  return (
    <RadioContext.Provider value={{ name, value, onChange, disabled }}>
      <div role="radiogroup" className={`flex flex-col gap-2 ${className ?? ''}`}>
        {children}
      </div>
    </RadioContext.Provider>
  );
}
