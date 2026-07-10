import { useState } from 'react';
import { OverlayHeaderPopover } from '../Popover/OverlayHeaderPopover';
import { MenuItem } from '../MenuItem/MenuItem';

// ── Utilities ─────────────────────────────────────────────────────────────────

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay(); // 0 = Sunday
}

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_ABBR  = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DOW_LABELS  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatMonthYear(year: number, month: number): string {
  return `${MONTH_SHORT[month]}, ${year}`;
}

function isSameDay(a?: Date | null, b?: Date | null): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

function isStrictlyBetween(d: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const t = d.setHours(0, 0, 0, 0);
  return t > start.setHours(0, 0, 0, 0) && t < end.setHours(0, 0, 0, 0);
}

function shiftMonth(year: number, month: number, delta: number): [number, number] {
  let m = month + delta;
  let y = year;
  while (m < 0)  { m += 12; y--; }
  while (m > 11) { m -= 12; y++; }
  return [y, m];
}

const PANEL_CLS = [
  'flex flex-col',
  'bg-surface-container-high border border-border-solid rounded-4',
  'shadow-[0px_0px_1px_0px_rgba(0,0,0,0.04),0px_2px_6px_0px_rgba(0,0,0,0.08)]',
  'overflow-hidden shrink-0',
].join(' ');

const PANEL_W = 276;
const PANEL_H = 360;

// ── Icons ─────────────────────────────────────────────────────────────────────

function IcChevronLeft({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15.5302 6.53027L10.0605 12L15.5302 17.4697L14.4697 18.5303L8.46967 12.5303C8.17678 12.2374 8.17678 11.7626 8.46967 11.4697L14.4697 5.46973L15.5302 6.53027Z" fill="currentColor"/>
    </svg>
  );
}

function IcChevronRight({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15.5303 11.4697C15.8232 11.7626 15.8232 12.2374 15.5303 12.5303L9.53027 18.5303L8.46973 17.4697L13.9395 12L8.46973 6.53027L9.53027 5.46973L15.5303 11.4697Z" fill="currentColor"/>
    </svg>
  );
}

function IcClock({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19.75 12C19.75 7.71979 16.2802 4.25 12 4.25C7.71979 4.25 4.25 7.71979 4.25 12C4.25 16.2802 7.71979 19.75 12 19.75C16.2802 19.75 19.75 16.2802 19.75 12ZM12.75 8.62012V12.5215L15.4248 13.4131L14.9502 14.8369L11.7627 13.7744C11.4564 13.6723 11.25 13.3853 11.25 13.0625V8.62012H12.75ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" fill="currentColor"/>
    </svg>
  );
}

function IcChevronDown({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18.5303 9.53027L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46973 9.53027L6.53027 8.46973L12 13.9395L17.4697 8.46973L18.5303 9.53027Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IcChevronUp({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5.46973 14.4697L11.4697 8.46973C11.7626 8.17684 12.2374 8.17684 12.5303 8.46973L18.5303 14.4697L17.4697 15.5303L12 10.0605L6.53027 15.5303L5.46973 14.4697Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ── NavButton (ic_trigger: 20px icon + -4px inset circle) ────────────────────

function NavButton({ icon, onClick }: { icon: 'prev' | 'next'; onClick: () => void }) {
  return (
    <div className="flex items-center justify-center size-5 shrink-0">
      <button
        type="button"
        onClick={onClick}
        className="group relative flex items-center justify-center size-5 cursor-pointer text-element-quaternary focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]"
      >
        <span
          className="absolute rounded-full bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
          style={{ inset: 'calc(var(--sol-gap-4) * -1)' }}
        />
        <span className="relative">
          {icon === 'prev' ? <IcChevronLeft size={20} /> : <IcChevronRight size={20} />}
        </span>
      </button>
    </div>
  );
}

// ── DateCellRangeItem ───────────────────────────────────────────────────────────
// Range selection background strip shown inside a day cell.
// position=start: strip begins here (left edge is rounded, extends right)
// position=end:   strip ends here (right edge is rounded, comes from left)
// position=middle: full-width strip (no rounding)

export type DateCellRangeItemPosition = 'start' | 'middle' | 'end';

export function DateCellRangeItem({ position }: { position: DateCellRangeItemPosition }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {position === 'start' ? (
        <div
          className="absolute bg-selected-container-variant rounded-l-4"
          style={{ top: 'var(--sol-gap-2)', bottom: 'var(--sol-gap-2)', left: 'var(--sol-gap-2)', right: 0 }}
        />
      ) : position === 'end' ? (
        <div
          className="absolute bg-selected-container-variant rounded-r-4"
          style={{ top: 'var(--sol-gap-2)', bottom: 'var(--sol-gap-2)', left: 0, right: 'var(--sol-gap-2)' }}
        />
      ) : (
        <div
          className="absolute bg-selected-container-variant"
          style={{ top: 'var(--sol-gap-2)', bottom: 'var(--sol-gap-2)', left: 0, right: 0 }}
        />
      )}
    </div>
  );
}

// ── DateCellRange ────────────────────────────────────────────────────────────
// Calendar cell with optional range background. Used for blank/spacer cells
// that fall within a date range, and for standalone range-strip visualization.

export type DateCellRangePosition = 'start' | 'end' | 'middle' | 'none' | 'single';

export type DateCellRangeProps = {
  bg?: boolean;
  position?: DateCellRangePosition;
  label?: string | number;
  className?: string;
};

export function DateCellRange({
  bg = false,
  position = 'none',
  label,
  className = '',
}: DateCellRangeProps) {
  const bgColor = position === 'start' ? 'bg-tertiary-container' : 'bg-selected-container-variant';

  const bgCls =
    position === 'start'  ? 'inset-y-0 left-0 right-0 rounded-l-4' :
    position === 'end'    ? 'inset-y-0 left-0 right-0 rounded-r-4' :
    position === 'single' ? 'rounded-4' :
                            'inset-0';

  return (
    <div className={`relative size-9 shrink-0 flex items-center justify-center overflow-hidden ${className}`}>
      {bg && (
        <div
          className={`absolute ${bgCls} ${bgColor}`}
          style={
            position === 'start'  ? { left: 'var(--sol-gap-2)' } :
            position === 'end'    ? { right: 'var(--sol-gap-2)' } :
            position === 'single' ? { inset: 'var(--sol-gap-2)' } :
            undefined
          }
        />
      )}
      {label !== undefined && (
        <span className="relative text-text-sm leading-text-sm font-regular text-element-primary text-center">
          {label}
        </span>
      )}
    </div>
  );
}

// ── DateCell ────────────────────────────────────────────────────────────────
// Full-featured calendar day cell. Handles all type/state/selection/range variants.
// Figma: node 5370-80086

export type DateCellType = 'day' | 'holiday' | 'today' | 'holiday_today' | 'upcoming' | 'blank';
export type DateCellPoint = 'none' | 'start' | 'end';

export type DateCellProps = {
  label?: string | number;
  type?: DateCellType;
  state?: 'enabled' | 'disabled' | 'blank';
  selected?: boolean;
  point?: DateCellPoint;
  showRange?: boolean;
  onClick?: () => void;
  className?: string;
};

export function DateCell({
  label = '',
  type = 'day',
  state = 'enabled',
  selected = false,
  point = 'none',
  showRange,
  onClick,
  className = '',
}: DateCellProps) {
  const effectiveShowRange = showRange ?? (point !== 'none');
  // Blank spacer (type=blank or state=blank)
  if (type === 'blank' || state === 'blank') {
    return <div className={`size-9 shrink-0 ${className}`} />;
  }

  const isEnabled = state === 'enabled';
  const isHoliday = type === 'holiday' || type === 'holiday_today';
  const isToday   = type === 'today' || type === 'holiday_today';

  // ── Text color ───────────────────────────────────────────────────────────────
  // disabled: error-variant (holiday selected) or disabled
  // selected: inverse-variant (upcoming), error (holiday), white (day/today)
  // normal:   error (holiday), quaternary (upcoming), primary (day/today)
  const textColor =
    !isEnabled
      ? (selected && isHoliday ? 'text-error-variant' : 'text-element-disabled')
      : selected
        ? type === 'upcoming' ? 'text-element-inverse-variant'
          : isHoliday         ? 'text-error'
          :                     'text-static-white'
      : isHoliday           ? 'text-error'
      : type === 'upcoming' ? 'text-element-quaternary'
      :                       'text-element-primary';


  // ── Selected background ──────────────────────────────────────────────────────
  // point=none  → rounded-4 (full circle look)
  // point=start → rounded-l-4 (left rounded, right square — connects range on right)
  // point=end   → rounded-r-4 (right rounded, left square — connects range on left)
  const selRounding =
    point === 'start' ? 'rounded-l-4' :
    point === 'end'   ? 'rounded-r-4' :
                        'rounded-4';
  const selBgColor = isEnabled ? 'var(--sol-fill-active)' : 'var(--sol-fill-disabled)';

  // ── Today border ─────────────────────────────────────────────────────────────
  // enabled today → border-tertiary (brand color)
  // disabled today → border-border-normal (gray)
  const todayBorderCls = isEnabled ? 'border-tertiary' : 'border-border-normal';

  return (
    <div className={`group relative size-9 shrink-0 overflow-hidden ${className}`}>
      {/* Range background strip: 32px tall (2px top/bottom inset), width by point */}
      {effectiveShowRange && (
        <div
          className="absolute bg-selected-container-variant"
          style={
            point === 'start' ? { top: 'var(--sol-gap-2)', bottom: 'var(--sol-gap-2)', left: 'var(--sol-gap-2)', right: 0, borderTopLeftRadius: 'var(--sol-radius-4)', borderBottomLeftRadius: 'var(--sol-radius-4)' } :
            point === 'end'   ? { top: 'var(--sol-gap-2)', bottom: 'var(--sol-gap-2)', left: 0, right: 'var(--sol-gap-2)', borderTopRightRadius: 'var(--sol-radius-4)', borderBottomRightRadius: 'var(--sol-radius-4)' } :
                                { top: 'var(--sol-gap-2)', bottom: 'var(--sol-gap-2)', left: 0, right: 0 }
          }
        />
      )}
      {/* Selected background: 32×32 box with 2px inset */}
      {selected && (
        <div
          className={`absolute inset-0.5 ${selRounding}`}
          style={{ backgroundColor: selBgColor }}
        />
      )}
      {/* Today border: 32×32 outline box (non-selected only) */}
      {isToday && !selected && (
        <div className={`absolute inset-0.5 rounded-4 border ${todayBorderCls}`} />
      )}
      {/* Hover overlay — group-hover so inline style on button doesn't block it */}
      {!selected && isEnabled && (
        <div className="absolute inset-0 rounded-4 group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
      )}
      {/* Button: inline style guarantees transparent (overrides browser buttonface default) */}
      <button
        type="button"
        disabled={!isEnabled}
        onClick={isEnabled ? onClick : undefined}
        style={{ background: 'transparent' }}
        className={[
          'absolute inset-0 flex items-center justify-center rounded-4',
          'focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]',
          !isEnabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <span className={`text-text-sm leading-text-sm ${selected ? 'font-semibold' : 'font-regular'} ${textColor}`}>
          {label}
        </span>
      </button>
    </div>
  );
}

// ── CalendarGrid ──────────────────────────────────────────────────────────────

function CalendarGrid({ year, month, selected, rangeStart, rangeEnd, today, onDayClick }: {
  year: number;
  month: number;
  selected?: Date | null;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  today: Date;
  onDayClick: (date: Date) => void;
}) {
  const firstDay  = firstDayOfWeek(year, month);
  const totalDays = daysInMonth(year, month);

  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= totalDays; d++) {
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  function getDayItemProps(date: Date): {
    type: 'day' | 'holiday' | 'today' | 'holiday_today';
    selected: boolean;
    point: DateCellPoint;
    showRange: boolean;
  } {
    const dow          = date.getDay();
    const isHoliday    = dow === 0;
    const isTodayDate  = isSameDay(date, today);
    const isRangeStart = isSameDay(date, rangeStart ?? null);
    const isRangeEnd   = isSameDay(date, rangeEnd   ?? null);
    const isInRange    = isStrictlyBetween(date, rangeStart ?? null, rangeEnd ?? null);
    const isSel        = isSameDay(date, selected ?? null);

    const type =
      isHoliday && isTodayDate ? 'holiday_today' :
      isHoliday                ? 'holiday' :
      isTodayDate              ? 'today' :
                                 'day';

    const isSelected = isSel || isRangeStart || isRangeEnd;
    const point: DateCellPoint =
      isRangeStart && isRangeEnd ? 'none' :
      isRangeStart               ? 'start' :
      isRangeEnd                 ? 'end' :
                                   'none';

    return { type, selected: isSelected, point, showRange: isInRange || isRangeStart || isRangeEnd };
  }

  return (
    <>
      {/* Day-of-week header — 36×37px per cell (py:12 + text:13 + py:12) */}
      <div className="flex items-center px-3">
        {DOW_LABELS.map((d, i) => (
          <div
            key={d}
            className="flex flex-1 items-center justify-center overflow-clip py-3"
          >
            <span className={[
              'flex-1 text-text-xxs leading-text-xxs font-regular text-center',
              i === 0 ? 'text-error' : 'text-element-tertiary',
            ].join(' ')}>
              {d}
            </span>
          </div>
        ))}
      </div>

      {/* Date rows — gap:2 between rows, px:12 horizontal, py:2 top/bottom */}
      <div className="flex flex-col gap-0.5 py-0.5 px-3">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex items-center">
            {week.map((day, di) => {
              if (day === null) return <div key={di} className="size-9 shrink-0" />;
              const date = new Date(year, month, day);
              return (
                <DateCell
                  key={di}
                  label={day}
                  {...getDayItemProps(date)}
                  onClick={() => onDayClick(date)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

// ── OverlayFooter ─────────────────────────────────────────────────────────────

function OverlayFooter({ onCancel, onConfirm, onClearAll }: {
  onCancel: () => void;
  onConfirm: () => void;
  onClearAll?: () => void;
}) {
  return (
    <div className="shrink-0 w-full">
      <div className="h-px bg-border-solid-variant" />
      <div className="flex items-center justify-end gap-5 py-4 px-5">
        {onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className="group relative flex flex-1 items-center gap-sol-6 cursor-pointer rounded-2 focus:outline-none"
          >
            <span
              className="absolute rounded-2 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
              style={{ inset: 'calc(var(--sol-gap-2) * -1)' }}
            />
            <span className="relative text-text-sm leading-text-sm font-semibold text-element-quaternary whitespace-nowrap">
              Clear all
            </span>
          </button>
        )}
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
          onClick={onConfirm}
          className="group relative flex items-center justify-end cursor-pointer rounded-2 focus:outline-none"
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
  );
}

// ── CalendarHeader (shared) ───────────────────────────────────────────────────

function CalendarHeader({ year, month, onPrev, onNext, onLabelClick }: {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onLabelClick?: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border-solid-variant shrink-0" style={{ padding: 'var(--sol-gap-12) var(--sol-gap-16) var(--sol-gap-10)' }}>
      <NavButton icon="prev" onClick={onPrev} />
      <button
        type="button"
        onClick={onLabelClick}
        className={[
          'group relative flex items-center gap-sol-4 rounded-4 text-element-primary shrink-0',
          'focus:outline-none',
          onLabelClick ? 'cursor-pointer' : 'cursor-default',
        ].join(' ')}
      >
        {onLabelClick && (
          <span
            className="absolute rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
            style={{ inset: 'calc(var(--sol-gap-2) * -1)' }}
          />
        )}
        <span className="relative text-text-sm leading-text-sm font-regular whitespace-nowrap overflow-hidden text-ellipsis">
          {formatMonthYear(year, month)}
        </span>
        {onLabelClick && (
          <span className="relative flex items-center justify-center size-3.5">
            <IcChevronDown size={16} />
          </span>
        )}
      </button>
      <NavButton icon="next" onClick={onNext} />
    </div>
  );
}

// ── DateSelectionItem ─────────────────────────────────────────────────────────

export type DateSelectionItemProps = {
  year: number;
  month: number;
  activeType?: 'year' | 'month';
  onYearChange?: (y: number) => void;
  onMonthChange?: (m: number) => void;
  onActiveTypeChange?: (t: 'year' | 'month') => void;
  onConfirm?: (year: number, month: number) => void;
  onCancel?: () => void;
  className?: string;
};

const YEAR_END   = new Date().getFullYear() + 10;
const YEAR_START = 2000;

export function DateSelectionItem({
  year,
  month,
  activeType = 'year',
  onYearChange,
  onMonthChange,
  onActiveTypeChange,
  onConfirm,
  onCancel,
  className = '',
}: DateSelectionItemProps) {
  const [selYear, setSelYear]   = useState(year);
  const [selMonth, setSelMonth] = useState(month);
  const [activeTab, setActiveTab] = useState<'year' | 'month'>(activeType);

  const years: number[] = [];
  for (let y = YEAR_END; y >= YEAR_START; y--) years.push(y);

  function handleYearClick(y: number) {
    setSelYear(y);
    onYearChange?.(y);
  }

  function handleMonthClick(m: number) {
    setSelMonth(m);
    onMonthChange?.(m);
  }

  function switchTab(t: 'year' | 'month') {
    setActiveTab(t);
    onActiveTypeChange?.(t);
  }

  return (
    <div className={`${PANEL_CLS} ${className}`} style={{ width: PANEL_W, height: PANEL_H }}>
      <OverlayHeaderPopover
        title="Select year & Month"
        size="lg"
        showNavigation={false}
        showClosedBtn={true}
        onClose={() => onCancel?.()}
      />

      {/* Navigation: year select_trigger + month select_trigger */}
      <div className="flex items-center gap-sol-12 p-sol-16 shrink-0">
        {/* Year select_trigger */}
        <button
          type="button"
          onClick={() => switchTab('year')}
          className={[
            'relative flex items-center gap-sol-4 rounded-4 cursor-pointer focus:outline-none',
            activeTab === 'year'
              ? 'shadow-[0_0_0_2px_var(--sol-primary)]'
              : '',
          ].join(' ')}
        >
          {activeTab !== 'year' && (
            <span className="absolute rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" style={{ inset: 'calc(var(--sol-gap-2) * -1)' }} />
          )}
          <span className="relative text-text-sm leading-text-sm font-regular text-element-primary whitespace-nowrap">
            {selYear}
          </span>
          <span className="relative flex items-center justify-center size-3.5 text-element-primary">
            {activeTab === 'year' ? <IcChevronUp size={16} /> : <IcChevronDown size={16} />}
          </span>
        </button>

        {/* Month select_trigger */}
        <button
          type="button"
          onClick={() => switchTab('month')}
          className={[
            'relative flex items-center gap-sol-4 rounded-4 cursor-pointer focus:outline-none',
            activeTab === 'month'
              ? 'shadow-[0_0_0_2px_var(--sol-primary)]'
              : '',
          ].join(' ')}
        >
          {activeTab !== 'month' && (
            <span className="absolute rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" style={{ inset: 'calc(var(--sol-gap-2) * -1)' }} />
          )}
          <span className="relative text-text-sm leading-text-sm font-regular text-element-primary whitespace-nowrap">
            {MONTH_SHORT[selMonth]}
          </span>
          <span className="relative flex items-center justify-center size-3.5 text-element-primary">
            {activeTab === 'month' ? <IcChevronUp size={16} /> : <IcChevronDown size={16} />}
          </span>
        </button>
      </div>

      {/* Grid (scrollable) — 3-col: each cell 84px × 3 = 252px = panel 276 − padding 12×2 */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 px-3">
        <div className="flex flex-wrap" style={{ rowGap: 'var(--sol-gap-2)' }}>
          {activeTab === 'year'
            ? years.map((y) => {
                const isSelected = y === selYear;
                if (isSelected) {
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => handleYearClick(y)}
                      className="group relative flex h-9 items-center justify-center overflow-hidden cursor-pointer focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]"
                      style={{ width: 'calc(100% / 3)' }}
                    >
                      <span
                        className="absolute inset-0.5 rounded-4"
                        style={{ backgroundColor: 'var(--sol-fill-active)' }}
                      />
                      <span
                        className="absolute inset-0.5 rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
                      />
                      <span className="relative text-text-sm leading-text-sm font-semibold text-static-white text-center whitespace-nowrap">
                        {y}
                      </span>
                    </button>
                  );
                }
                return (
                  <button
                    key={y}
                    type="button"
                    onClick={() => handleYearClick(y)}
                    className="group relative flex h-9 items-center justify-center overflow-hidden cursor-pointer focus:outline-none"
                    style={{ width: 'calc(100% / 3)' }}
                  >
                    <span
                      className="absolute inset-0.5 rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
                    />
                    <span className="relative text-text-sm leading-text-sm font-regular text-element-primary text-center whitespace-nowrap">
                      {y}
                    </span>
                  </button>
                );
              })
            : MONTH_ABBR.map((m, i) => {
                const isSelected = i === selMonth;
                if (isSelected) {
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleMonthClick(i)}
                      className="group relative flex h-9 items-center justify-center overflow-hidden cursor-pointer focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--sol-primary)]"
                      style={{ width: 'calc(100% / 3)' }}
                    >
                      <span
                        className="absolute inset-0.5 rounded-4"
                        style={{ backgroundColor: 'var(--sol-fill-active)' }}
                      />
                      <span
                        className="absolute inset-0.5 rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
                      />
                      <span className="relative text-text-sm leading-text-sm font-semibold text-static-white text-center whitespace-nowrap">
                        {m}
                      </span>
                    </button>
                  );
                }
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleMonthClick(i)}
                    className="group relative flex h-9 items-center justify-center overflow-hidden cursor-pointer focus:outline-none"
                    style={{ width: 'calc(100% / 3)' }}
                  >
                    <span
                      className="absolute inset-0.5 rounded-4 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
                    />
                    <span className="relative text-text-sm leading-text-sm font-regular text-element-primary text-center whitespace-nowrap">
                      {m}
                    </span>
                  </button>
                );
              })
          }
        </div>
      </div>

      <OverlayFooter
        onCancel={() => onCancel?.()}
        onConfirm={() => onConfirm?.(selYear, selMonth)}
      />
    </div>
  );
}

// ── DatePickerSingle ──────────────────────────────────────────────────────────

export type DatePickerSingleProps = {
  value?: Date | null;
  today?: Date;
  showFooter?: boolean;
  onChange?: (date: Date) => void;
  onConfirm?: (date: Date | null) => void;
  onCancel?: () => void;
  className?: string;
};

export function DatePickerSingle({
  value = null,
  today = new Date(),
  showFooter = true,
  onChange,
  onConfirm,
  onCancel,
  className = '',
}: DatePickerSingleProps) {
  const [selected, setSelected] = useState<Date | null>(value);
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? today.getMonth());
  const [showYMPicker, setShowYMPicker] = useState(false);

  function handleDayClick(date: Date) {
    setSelected(date);
    onChange?.(date);
  }

  function handlePrev() {
    const [y, m] = shiftMonth(viewYear, viewMonth, -1);
    setViewYear(y); setViewMonth(m);
  }

  function handleNext() {
    const [y, m] = shiftMonth(viewYear, viewMonth, 1);
    setViewYear(y); setViewMonth(m);
  }

  function handleYMConfirm(y: number, m: number) {
    setViewYear(y); setViewMonth(m);
    setShowYMPicker(false);
  }

  return (
    <div className={`relative flex items-start ${className}`}>
      {/* Calendar panel */}
      <div className={PANEL_CLS} style={{ width: PANEL_W, height: PANEL_H }}>
        <CalendarHeader
          year={viewYear}
          month={viewMonth}
          onPrev={handlePrev}
          onNext={handleNext}
          onLabelClick={() => setShowYMPicker((v) => !v)}
        />
        <div className="flex-1 overflow-hidden pb-sol-16">
          <CalendarGrid
            year={viewYear}
            month={viewMonth}
            selected={selected}
            today={today}
            onDayClick={handleDayClick}
          />
        </div>
        {showFooter && (
          <OverlayFooter
            onCancel={() => onCancel?.()}
            onConfirm={() => onConfirm?.(selected)}
          />
        )}
      </div>

      {/* Year/month picker overlay */}
      {showYMPicker && (
        <div className="absolute left-full top-0 ml-sol-8 z-50">
          <DateSelectionItem
            year={viewYear}
            month={viewMonth}
            onConfirm={handleYMConfirm}
            onCancel={() => setShowYMPicker(false)}
          />
        </div>
      )}
    </div>
  );
}

// ── DateSelection ─────────────────────────────────────────────────────────────
// Calendar + DateSelectionItem side by side (as shown in Figma date_selection)

export type DateSelectionProps = {
  value?: Date | null;
  today?: Date;
  onChange?: (date: Date) => void;
  onConfirm?: (date: Date | null) => void;
  onCancel?: () => void;
  className?: string;
};

export function DateSelection({
  value = null,
  today = new Date(),
  onChange,
  onConfirm,
  onCancel,
  className = '',
}: DateSelectionProps) {
  const [selected, setSelected]     = useState<Date | null>(value);
  const [viewYear, setViewYear]     = useState(value?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth]   = useState(value?.getMonth() ?? today.getMonth());
  const [itemYear, setItemYear]     = useState(viewYear);
  const [itemMonth, setItemMonth]   = useState(viewMonth);
  const [activeTab, setActiveTab]   = useState<'year' | 'month'>('year');

  function handleDayClick(date: Date) {
    setSelected(date);
    onChange?.(date);
  }

  function handlePrev() {
    const [y, m] = shiftMonth(viewYear, viewMonth, -1);
    setViewYear(y); setViewMonth(m);
  }

  function handleNext() {
    const [y, m] = shiftMonth(viewYear, viewMonth, 1);
    setViewYear(y); setViewMonth(m);
  }

  function handleItemConfirm(y: number, m: number) {
    setViewYear(y); setViewMonth(m);
    setItemYear(y); setItemMonth(m);
  }

  return (
    <div className={`flex gap-sol-8 items-start ${className}`}>
      {/* Calendar */}
      <div className={PANEL_CLS} style={{ width: PANEL_W, height: PANEL_H }}>
        <CalendarHeader
          year={viewYear}
          month={viewMonth}
          onPrev={handlePrev}
          onNext={handleNext}
          onLabelClick={undefined}
        />
        <div className="flex-1 overflow-hidden pb-sol-16">
          <CalendarGrid
            year={viewYear}
            month={viewMonth}
            selected={selected}
            today={today}
            onDayClick={handleDayClick}
          />
        </div>
        <OverlayFooter
          onCancel={() => onCancel?.()}
          onConfirm={() => onConfirm?.(selected)}
        />
      </div>

      {/* Year/month selection panel */}
      <DateSelectionItem
        year={itemYear}
        month={itemMonth}
        activeType={activeTab}
        onYearChange={setItemYear}
        onMonthChange={setItemMonth}
        onActiveTypeChange={setActiveTab}
        onConfirm={handleItemConfirm}
        onCancel={() => onCancel?.()}
      />
    </div>
  );
}

// ── DateInputGroup ────────────────────────────────────────────────────────────
// TODO: TextInput 컴포넌트 구현 완료 시 해당 컴포넌트로 교체 예정

function DateInputGroup({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col flex-1 min-w-0 gap-1">
      <span className="text-text-xs leading-text-xs font-regular text-element-tertiary">
        {label}
      </span>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          readOnly
          placeholder="Text"
          style={{ height: 30 }}
          className={[
            'flex-1 min-w-0 px-sol-8 rounded-4',
            'border border-border-normal bg-surface-container',
            'text-text-xs leading-text-xs font-regular text-element-primary',
            'focus:outline-none placeholder:text-element-quaternary',
          ].join(' ')}
        />
        <div className="relative flex-1" style={{ height: 30 }}>
          <input
            type="text"
            readOnly
            placeholder="Text"
            className={[
              'w-full h-full pl-sol-8 rounded-4',
              'border border-border-normal bg-surface-container',
              'text-text-xs leading-text-xs font-regular text-element-primary',
              'focus:outline-none placeholder:text-element-quaternary',
            ].join(' ')}
            style={{ paddingRight: 26 }}
          />
          <span className="absolute right-sol-8 top-1/2 -translate-y-1/2 text-element-tertiary pointer-events-none">
            <IcClock size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}

// ── DatePickerRange ───────────────────────────────────────────────────────────

type QuickOption = 'last7' | 'last14' | 'last30' | 'custom';

const QUICK_OPTIONS: { key: QuickOption; label: string }[] = [
  { key: 'last7',  label: 'Last 7 days'  },
  { key: 'last14', label: 'Last 14 days' },
  { key: 'last30', label: 'Last 30 days' },
  { key: 'custom', label: 'Custom'       },
];

function formatInputDate(d: Date | null): string {
  if (!d) return '';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export type DatePickerRangeProps = {
  startDate?: Date | null;
  endDate?: Date | null;
  today?: Date;
  startLabel?: string;
  endLabel?: string;
  onChange?: (start: Date | null, end: Date | null) => void;
  onConfirm?: (start: Date | null, end: Date | null) => void;
  onCancel?: () => void;
  onClearAll?: () => void;
  className?: string;
};

export function DatePickerRange({
  startDate = null,
  endDate = null,
  today = new Date(),
  startLabel = 'Label',
  endLabel = 'Label',
  onChange,
  onConfirm,
  onCancel,
  onClearAll,
  className = '',
}: DatePickerRangeProps) {
  const [rangeStart, setRangeStart] = useState<Date | null>(startDate);
  const [rangeEnd,   setRangeEnd]   = useState<Date | null>(endDate);
  const [quickOpt,   setQuickOpt]   = useState<QuickOption>('custom');

  const initLeft = (() => {
    const base = startDate ?? today;
    return [base.getFullYear(), base.getMonth()] as [number, number];
  })();
  const initLeftShifted = shiftMonth(initLeft[0], initLeft[1], -1);
  const [leftYear,  setLeftYear]  = useState(initLeftShifted[0]);
  const [leftMonth, setLeftMonth] = useState(initLeftShifted[1]);
  const [rightYear, rightMonth] = shiftMonth(leftYear, leftMonth, 1);

  function handleDayClick(date: Date) {
    let newStart = rangeStart;
    let newEnd = rangeEnd;
    if (!rangeStart || (rangeStart && rangeEnd)) {
      newStart = date; newEnd = null;
      setRangeStart(date); setRangeEnd(null); setQuickOpt('custom');
    } else {
      if (date.getTime() < rangeStart.getTime()) {
        newEnd = rangeStart; newStart = date;
        setRangeEnd(rangeStart); setRangeStart(date);
      } else {
        newEnd = date;
        setRangeEnd(date);
      }
      setQuickOpt('custom');
    }
    onChange?.(newStart, newEnd);
  }

  function handleQuickSelect(key: QuickOption) {
    setQuickOpt(key);
    const now = new Date(today);
    now.setHours(0, 0, 0, 0);
    if (key === 'last7') {
      const s = new Date(now); s.setDate(s.getDate() - 6);
      setRangeStart(s); setRangeEnd(new Date(now));
    } else if (key === 'last14') {
      const s = new Date(now); s.setDate(s.getDate() - 13);
      setRangeStart(s); setRangeEnd(new Date(now));
    } else if (key === 'last30') {
      const s = new Date(now); s.setDate(s.getDate() - 29);
      setRangeStart(s); setRangeEnd(new Date(now));
    }
  }

  function handleClearAll() {
    setRangeStart(null); setRangeEnd(null); setQuickOpt('custom');
    onClearAll?.();
  }

  function handlePrev() {
    const [y, m] = shiftMonth(leftYear, leftMonth, -1);
    setLeftYear(y); setLeftMonth(m);
  }

  function handleNext() {
    const [y, m] = shiftMonth(leftYear, leftMonth, 1);
    setLeftYear(y); setLeftMonth(m);
  }

  return (
    <div className={[
      'flex flex-col bg-surface-container-high border border-border-solid rounded-4',
      'shadow-[0px_0px_1px_0px_rgba(0,0,0,0.04),0px_2px_6px_0px_rgba(0,0,0,0.08)]',
      'overflow-hidden',
      className,
    ].join(' ')}>
      <div className="flex">
        {/* Quick select sidebar */}
        <div className="flex flex-col shrink-0 border-r border-border-solid-variant" style={{ width: 148 }}>
          <div className="px-sol-16 py-sol-12">
            <span className="text-text-sm leading-text-sm font-semibold text-element-primary">
              Quick select
            </span>
          </div>
          <div className="flex flex-col p-2">
            {QUICK_OPTIONS.map(({ key, label }) => (
              <MenuItem
                key={key}
                label={label}
                selected={quickOpt === key}
                onClick={() => handleQuickSelect(key)}
              />
            ))}
          </div>
        </div>

        {/* Dual calendars */}
        <div className="flex flex-col shrink-0" style={{ width: PANEL_W * 2 }}>
          <div className="flex">
            {/* Left calendar */}
            <div className="flex flex-col shrink-0 border-r border-border-solid-variant" style={{ width: PANEL_W }}>
              <div className="flex items-center justify-between border-b border-border-solid-variant shrink-0" style={{ padding: 'var(--sol-gap-12) var(--sol-gap-16) var(--sol-gap-10)' }}>
                <NavButton icon="prev" onClick={handlePrev} />
                <span className="text-text-sm leading-text-sm font-regular text-element-primary">
                  {formatMonthYear(leftYear, leftMonth)}
                </span>
                <div className="size-5" />
              </div>
              <div className="pb-sol-8">
                <CalendarGrid
                  year={leftYear}
                  month={leftMonth}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                  today={today}
                  onDayClick={handleDayClick}
                />
              </div>
            </div>

            {/* Right calendar */}
            <div className="flex flex-col shrink-0" style={{ width: PANEL_W }}>
              <div className="flex items-center justify-between border-b border-border-solid-variant shrink-0" style={{ padding: 'var(--sol-gap-12) var(--sol-gap-16) var(--sol-gap-10)' }}>
                <div className="size-5" />
                <span className="text-text-sm leading-text-sm font-regular text-element-primary">
                  {formatMonthYear(rightYear, rightMonth)}
                </span>
                <NavButton icon="next" onClick={handleNext} />
              </div>
              <div className="pb-sol-8">
                <CalendarGrid
                  year={rightYear}
                  month={rightMonth}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                  today={today}
                  onDayClick={handleDayClick}
                />
              </div>
            </div>
          </div>

          {/* Date / time input row */}
          <div
            className="flex items-end border-t border-border-solid-variant gap-3 p-4"
          >
            <DateInputGroup label={startLabel} value={formatInputDate(rangeStart)} />
            <span
              className="text-text-sm leading-text-sm font-regular text-element-quaternary shrink-0"
              style={{ paddingBottom: 5 }}
            >
              —
            </span>
            <DateInputGroup label={endLabel} value={formatInputDate(rangeEnd)} />
          </div>
        </div>
      </div>

      <OverlayFooter
        onCancel={() => onCancel?.()}
        onConfirm={() => onConfirm?.(rangeStart, rangeEnd)}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
