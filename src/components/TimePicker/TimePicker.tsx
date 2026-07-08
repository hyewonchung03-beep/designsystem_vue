import { useState } from 'react';
import { OverlayHeaderPopover } from '../Popover/OverlayHeaderPopover';

// ── Constants ─────────────────────────────────────────────────────────────────

const HOUR_12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const HOUR_24 = Array.from({ length: 24 }, (_, i) => i);
const MIN_SEC_OPTIONS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const COL_W = 'w-4'; // 16px fixed colon/spacer width (--sol-gap-16 → w-4)

// ── Types ─────────────────────────────────────────────────────────────────────

export type TimePickerFormat = '12hour' | '24hour';

export type TimeValue = {
  hour: number;
  minute: number;
  second: number;
  ampm: 'AM' | 'PM';
};

export type TimePickerProps = {
  format?: TimePickerFormat;
  defaultValue?: Partial<TimeValue>;
  showMinute?: boolean;
  showSecond?: boolean;
  showFooter?: boolean;
  onConfirm?: (value: TimeValue) => void;
  onCancel?: () => void;
  onClose?: () => void;
  className?: string;
};

// ── TimeCell ──────────────────────────────────────────────────────────────────

function TimeCell({
  label,
  selected,
  onClick,
}: {
  label: string | number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex items-center justify-center overflow-hidden w-full shrink-0 py-2 cursor-pointer focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]"
    >
      <span
        className="absolute inset-0 rounded-4"
        style={{ backgroundColor: 'var(--sol-fill-active)', opacity: selected ? 0.12 : 0 }}
      />
      <span className="absolute inset-0 rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
      <span className="relative flex-1 text-text-sm leading-text-sm font-regular text-element-primary text-center overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

// ── AmPmCell ──────────────────────────────────────────────────────────────────
// Same height as TimeCell (py-2). Selected: full-width purple fill (inset 2px).

function AmPmCell({
  label,
  selected,
  onClick,
}: {
  label: 'AM' | 'PM';
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex items-center justify-center overflow-hidden w-full shrink-0 py-2 cursor-pointer focus:outline-none"
    >
      {selected ? (
        <>
          <span
            className="absolute inset-0.5 rounded-4"
            style={{ backgroundColor: 'var(--sol-fill-active)' }}
          />
          <span
            className="absolute inset-0.5 rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
          />
          <span className="relative flex-1 text-text-sm leading-text-sm font-semibold text-static-white text-center">
            {label}
          </span>
        </>
      ) : (
        <>
          <span className="absolute inset-0 rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
          <span className="relative flex-1 text-text-sm leading-text-sm font-regular text-element-primary text-center">
            {label}
          </span>
        </>
      )}
    </button>
  );
}

// ── ColonFixed ────────────────────────────────────────────────────────────────

function ColonFixed() {
  return (
    <div className={`shrink-0 flex items-center justify-center ${COL_W} py-2 text-text-sm leading-text-sm font-regular text-element-primary`}>
      :
    </div>
  );
}

// ── ColonSpacer ───────────────────────────────────────────────────────────────

function ColonSpacer() {
  return <div className={`shrink-0 ${COL_W}`} />;
}

// ── TimePicker ────────────────────────────────────────────────────────────────

export function TimePicker({
  format = '12hour',
  defaultValue,
  showMinute = true,
  showSecond = true,
  showFooter = true,
  onConfirm,
  onCancel,
  onClose,
  className = '',
}: TimePickerProps) {
  const is24Hour = format === '24hour';
  const hourOptions = is24Hour ? HOUR_24 : HOUR_12;

  const [hour, setHour] = useState<number>(
    defaultValue?.hour ?? (is24Hour ? 0 : 12),
  );
  const [minute, setMinute] = useState<number>(defaultValue?.minute ?? 0);
  const [second, setSecond] = useState<number>(defaultValue?.second ?? 0);
  const [ampm, setAmpm] = useState<'AM' | 'PM'>(defaultValue?.ampm ?? 'AM');

  const scrollHours   = hourOptions.filter((h) => h !== hour);
  const scrollMinutes = MIN_SEC_OPTIONS.filter((m) => m !== minute);
  const scrollSeconds = MIN_SEC_OPTIONS.filter((s) => s !== second);

  return (
    <div
      className={`flex flex-col bg-surface-container-high border border-border-solid rounded-4 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.04),0px_2px_6px_0px_rgba(0,0,0,0.08)] overflow-hidden shrink-0 ${className}`}
      style={{ width: 256, height: 360 }}
    >
      <OverlayHeaderPopover
        title="Select time"
        size="lg"
        showNavigation={false}
        showClosedBtn
        onClose={() => onClose?.()}
      />

      {/* Content */}
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden py-2 px-3">
        {/* ── Fixed first row: selected values ── */}
        <div className="flex shrink-0 items-center gap-1">
          <div className="flex-1 px-1">
            <TimeCell label={hour} selected onClick={() => {}} />
          </div>

          {showMinute && (
            <>
              <ColonFixed />
              <div className="flex-1 px-1">
                <TimeCell label={minute} selected onClick={() => {}} />
              </div>
            </>
          )}

          {showSecond && (
            <>
              <ColonFixed />
              <div className="flex-1 px-1">
                <TimeCell label={second} selected onClick={() => {}} />
              </div>
            </>
          )}

          {!is24Hour && (
            <div className="flex-1 px-1">
              <AmPmCell label={ampm} selected onClick={() => {}} />
            </div>
          )}
        </div>

        {/* ── Scrollable rows: remaining options ── */}
        <div className="flex flex-1 min-h-0 overflow-hidden gap-1">
          <div className="flex-1 overflow-y-auto px-1">
            {scrollHours.map((h) => (
              <TimeCell key={h} label={h} selected={false} onClick={() => setHour(h)} />
            ))}
          </div>

          {showMinute && (
            <>
              <ColonSpacer />
              <div className="flex-1 overflow-y-auto px-1">
                {scrollMinutes.map((m) => (
                  <TimeCell key={m} label={m} selected={false} onClick={() => setMinute(m)} />
                ))}
              </div>
            </>
          )}

          {showSecond && (
            <>
              <ColonSpacer />
              <div className="flex-1 overflow-y-auto px-1">
                {scrollSeconds.map((s) => (
                  <TimeCell key={s} label={s} selected={false} onClick={() => setSecond(s)} />
                ))}
              </div>
            </>
          )}

          {!is24Hour && (
            <div className="flex-1 px-1">
              <AmPmCell
                label={ampm === 'AM' ? 'PM' : 'AM'}
                selected={false}
                onClick={() => setAmpm(ampm === 'AM' ? 'PM' : 'AM')}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {showFooter && (
        <div className="shrink-0 w-full">
          <div className="h-px bg-border-solid-variant" />
          <div className="flex items-center justify-end gap-5 py-4 px-5">
            <button
              type="button"
              onClick={onCancel}
              className="group relative flex items-center justify-center cursor-pointer rounded-2 focus:outline-none"
            >
              <span
                className="absolute rounded-2 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
                style={{ inset: 'calc(var(--sol-gap-2) * -1)' }}
              />
              <span className="relative text-text-sm leading-text-sm font-semibold text-element-quaternary whitespace-nowrap">
                Cancel
              </span>
            </button>
            <button
              type="button"
              onClick={() => onConfirm?.({ hour, minute, second, ampm })}
              className="group relative flex items-center justify-center cursor-pointer rounded-2 focus:outline-none"
            >
              <span
                className="absolute rounded-2 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
                style={{ inset: 'calc(var(--sol-gap-2) * -1)' }}
              />
              <span className="relative text-text-sm leading-text-sm font-semibold text-element-brand whitespace-nowrap">
                Select
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
