// dateUtils.ts — shared calendar math / formatting helpers for the DatePicker
// component family (DateCell, CalendarGrid, DateSelectionItem, DatePickerSingle,
// DateSelection, DatePickerRange).
//
// Ported 1:1 from the module-scope helpers in
// src/components/DatePicker/DatePicker.tsx. Pulled into a shared file here
// because the Vue port splits that single React file into many .vue files
// (see DatePicker.vue-port README notes) that all need the same date math.

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function firstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay(); // 0 = Sunday
}

export const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONTH_ABBR  = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
export const DOW_LABELS  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function formatMonthYear(year: number, month: number): string {
  return `${MONTH_SHORT[month]}, ${year}`;
}

export function isSameDay(a?: Date | null, b?: Date | null): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

// NOTE: mirrors the React source exactly, including its side effect —
// `setHours(0,0,0,0)` mutates the `start`/`end` Date objects in place
// (these are usually the live rangeStart/rangeEnd state refs). Harmless in
// practice since only hours/min/sec/ms are zeroed (year/month/date are
// untouched), but flagging since it's a bit surprising for a "pure" helper.
export function isStrictlyBetween(d: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const t = d.setHours(0, 0, 0, 0);
  return t > start.setHours(0, 0, 0, 0) && t < end.setHours(0, 0, 0, 0);
}

export function shiftMonth(year: number, month: number, delta: number): [number, number] {
  let m = month + delta;
  let y = year;
  while (m < 0)  { m += 12; y--; }
  while (m > 11) { m -= 12; y++; }
  return [y, m];
}

export function formatInputDate(d: Date | null): string {
  if (!d) return '';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const PANEL_CLS = [
  'flex flex-col',
  'bg-surface-container-high border border-border-solid rounded-4',
  'shadow-[0px_0px_1px_0px_rgba(0,0,0,0.04),0px_2px_6px_0px_rgba(0,0,0,0.08)]',
  'overflow-hidden shrink-0',
].join(' ');

export const PANEL_W = 276;
export const PANEL_H = 360;

export const YEAR_START = 2000;
export const YEAR_END = new Date().getFullYear() + 10;
