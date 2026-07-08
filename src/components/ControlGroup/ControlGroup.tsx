import type { ReactNode } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

export type ControlGroupProps = {
  legend: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  columns?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
};

// ── ControlGroup ───────────────────────────────────────────────────────────

export default function ControlGroup({
  legend,
  required = false,
  helperText,
  error = false,
  disabled = false,
  orientation = 'vertical',
  columns = 1,
  children,
  className,
}: ControlGroupProps) {
  const gridClass =
    orientation === 'horizontal'
      ? 'flex flex-row flex-wrap gap-x-6 gap-y-2'
      : columns === 1
        ? 'flex flex-col gap-2'
        : columns === 2
          ? 'grid grid-cols-2 gap-x-6 gap-y-2'
          : 'grid grid-cols-3 gap-x-6 gap-y-2';

  return (
    <fieldset
      disabled={disabled}
      className={`m-0 min-w-0 border-0 p-0 text-left ${className ?? ''}`}
      aria-describedby={helperText ? 'cg-helper' : undefined}
    >
      {/* Legend (group label) */}
      <legend className="mb-2 flex items-center gap-1 p-0">
        <span
          className={`text-text-sm font-regular leading-text-sm ${
            disabled ? 'text-element-disabled' : 'text-element-tertiary'
          }`}
        >
          {legend}
        </span>
        {required && (
          <span
            className={`text-text-sm font-regular leading-text-sm ${
              disabled ? 'text-element-disabled' : 'text-error'
            }`}
          >
            *
          </span>
        )}
      </legend>

      {/* Control items */}
      <div className={gridClass}>{children}</div>

      {/* Helper / Error text */}
      {helperText && (
        <p
          id="cg-helper"
          className={`mt-2 text-text-xs font-regular leading-text-xs ${
            error ? 'text-error-dim' : 'text-element-tertiary'
          }`}
          role={error ? 'alert' : undefined}
        >
          {helperText}
        </p>
      )}
    </fieldset>
  );
}
