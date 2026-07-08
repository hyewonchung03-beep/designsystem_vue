import React from 'react';

type ColorPickerDemoProps = {
  label?: string;
  input?: boolean;
  rows?: 1 | 2 | 3;
  disabled?: boolean;
  placeholder?: boolean;
};

type DateRangePickerDemoProps = {
  quick?: boolean;
  time?: boolean;
  footer?: boolean;
  selection?: boolean;
};

type DateSinglePickerDemoProps = {
  selectionPanel?: boolean;
  footer?: boolean;
  disabled?: boolean;
  inForm?: boolean;
};

type TimePickerDemoProps = {
  format?: '12' | '24';
  seconds?: boolean;
  footer?: boolean;
};

const palette = Array.from({length: 12}, (_, index) => index);

function Swatch({index, selected = false, disabled = false}: {index: number; selected?: boolean; disabled?: boolean}): React.ReactElement {
  return <span className={`picker-swatch picker-swatch--${index % 12}${selected ? ' picker-swatch--selected' : ''}${disabled ? ' picker-swatch--disabled' : ''}`} />;
}

export function ColorPickerDemo({label, input = true, rows = 2, disabled = false, placeholder = false}: ColorPickerDemoProps): React.ReactElement {
  const count = rows === 1 ? 6 : rows === 2 ? 12 : 18;
  return (
    <div className={`color-picker-demo color-picker-demo--rows-${rows}${disabled ? ' color-picker-demo--disabled' : ''}`}>
      {label && <span className="color-picker-demo__label">{label}</span>}
      <div className="color-picker-demo__body">
        <div className="color-picker-demo__palette">
          {Array.from({length: count}).map((_, index) => (
            <Swatch key={index} index={palette[index % palette.length]} selected={index === 0} disabled={disabled} />
          ))}
        </div>
        {input && <input value={placeholder ? '' : '#000000'} placeholder="HEX Code" readOnly disabled={disabled} />}
      </div>
    </div>
  );
}

function CalendarMonth({title}: {title: string}): React.ReactElement {
  return (
    <div className="date-range-demo__month">
      <strong>{title}</strong>
      <div className="date-range-demo__weekdays">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}</div>
      <div className="date-range-demo__days">
        {Array.from({length: 35}).map((_, index) => {
          const day = index + 1;
          const range = day >= 10 && day <= 17;
          const endpoint = day === 10 || day === 17;
          return <span className={`${range ? 'date-range-demo__day--range' : ''}${endpoint ? ' date-range-demo__day--selected' : ''}`} key={index}>{day <= 31 ? day : ''}</span>;
        })}
      </div>
    </div>
  );
}

export function DateRangePickerDemo({quick = true, time = true, footer = true, selection = true}: DateRangePickerDemoProps): React.ReactElement {
  return (
    <div className={`date-range-demo${selection ? ' date-range-demo--selection' : ''}`}>
      {quick && (
        <aside className="date-range-demo__quick">
          <strong>Quick select</strong>
          {['Last 1 days', 'Last 7 days', 'Last 30 days', 'Custom'].map((item, index) => <span className={index === 3 ? 'is-active' : ''} key={item}>{item}</span>)}
        </aside>
      )}
      <div className="date-range-demo__main">
        <div className="date-range-demo__months">
          <CalendarMonth title="Dec, 2025" />
          <CalendarMonth title="Jan, 2026" />
        </div>
        {time && (
          <div className="date-range-demo__inputs">
            <label>Label<input value="DEC 10, 2025" readOnly /></label>
            <label>Label<input value="JAN 24, 2026" readOnly /></label>
          </div>
        )}
        {footer && <div className="date-range-demo__footer"><button type="button">Clear all</button><span /><button type="button">Cancel</button><button type="button">Select</button></div>}
      </div>
    </div>
  );
}

export function DateSinglePickerDemo({selectionPanel = true, footer = true, disabled = false, inForm = false}: DateSinglePickerDemoProps): React.ReactElement {
  const panel = (
    <div className={`date-single-demo${disabled ? ' date-single-demo--disabled' : ''}`}>
      <div className="date-single-demo__calendar">
        <div className="date-single-demo__header"><button type="button">‹</button><strong>Jan, 2026</strong><button type="button">›</button></div>
        <div className="date-range-demo__weekdays">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}</div>
        <div className="date-range-demo__days">
          {Array.from({length: 35}).map((_, index) => {
            const day = index + 1;
            return <span className={`${day === 10 ? 'date-range-demo__day--selected' : ''}${day === 31 ? ' date-single-demo__today' : ''}${disabled && day === 20 ? ' date-single-demo__disabled-day' : ''}`} key={index}>{day <= 31 ? day : ''}</span>;
          })}
        </div>
        {footer && <div className="date-single-demo__footer"><button type="button">Cancel</button><button type="button">Select</button></div>}
      </div>
      {selectionPanel && (
        <div className="date-single-demo__selection">
          <div className="date-single-demo__selection-header"><strong>Select Year & Month</strong><button type="button">x</button></div>
          <div className="date-single-demo__years">{['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'].map((year, index) => <span className={index === 0 ? 'is-selected' : ''} key={year}>{year}</span>)}</div>
          {footer && <div className="date-single-demo__footer"><button type="button">Cancel</button><button type="button">Apply</button></div>}
        </div>
      )}
    </div>
  );

  if (!inForm) return panel;

  return (
    <label className="picker-input-demo">
      <span>Date</span>
      <input value="09. 02. 2026" readOnly />
      {panel}
    </label>
  );
}

export function TimePickerDemo({format = '12', seconds = true, footer = true}: TimePickerDemoProps): React.ReactElement {
  const hours = format === '12' ? ['12', '01', '02', '03', '04', '05', '06'] : ['00', '01', '02', '03', '04', '05', '06'];
  return (
    <div className="time-picker-demo">
      <div className="time-picker-demo__header"><strong>Select Time</strong><button type="button">x</button></div>
      <div className="time-picker-demo__columns">
        <div>{hours.map((item, index) => <span className={index === 0 ? 'is-selected' : ''} key={item}>{item}</span>)}</div>
        <div>{['00', '05', '10', '15', '20', '25', '30'].map((item, index) => <span className={index === 0 ? 'is-selected' : ''} key={item}>{item}</span>)}</div>
        {seconds && <div>{['00', '05', '10', '15', '20', '25', '30'].map((item, index) => <span className={index === 0 ? 'is-selected' : ''} key={item}>{item}</span>)}</div>}
        {format === '12' && <div>{['AM', 'PM'].map((item, index) => <span className={index === 0 ? 'is-selected' : ''} key={item}>{item}</span>)}</div>}
      </div>
      {footer && <div className="time-picker-demo__footer"><button type="button">Cancel</button><button type="button">Apply</button></div>}
    </div>
  );
}

export function BasicColorPickerExample(): React.ReactElement {
  return <ColorPickerDemo />;
}

export function ColorPickerWithLabelExample(): React.ReactElement {
  return <ColorPickerDemo label="Background color" />;
}

export function ColorPickerWithInputExample(): React.ReactElement {
  return <ColorPickerDemo label="Color" input />;
}

export function MultiRowColorPickerExample(): React.ReactElement {
  return <ColorPickerDemo rows={3} />;
}

export function DisabledColorPickerExample(): React.ReactElement {
  return <ColorPickerDemo disabled />;
}

export function BasicDateRangePickerExample(): React.ReactElement {
  return <DateRangePickerDemo quick={false} time={false} footer={false} />;
}

export function DateRangePickerQuickExample(): React.ReactElement {
  return <DateRangePickerDemo />;
}

export function DateRangePickerTimeExample(): React.ReactElement {
  return <DateRangePickerDemo quick={false} time />;
}

export function DateRangePickerFooterExample(): React.ReactElement {
  return <DateRangePickerDemo footer />;
}

export function BasicDateSinglePickerExample(): React.ReactElement {
  return <DateSinglePickerDemo selectionPanel={false} />;
}

export function DateSinglePickerSelectionPanelExample(): React.ReactElement {
  return <DateSinglePickerDemo />;
}

export function DateSinglePickerFooterExample(): React.ReactElement {
  return <DateSinglePickerDemo footer />;
}

export function DisabledDateSinglePickerExample(): React.ReactElement {
  return <DateSinglePickerDemo disabled />;
}

export function DateSinglePickerInFormExample(): React.ReactElement {
  return <DateSinglePickerDemo inForm />;
}

export function BasicTimePickerExample(): React.ReactElement {
  return <TimePickerDemo />;
}

export function TimePicker24HourExample(): React.ReactElement {
  return <TimePickerDemo format="24" seconds={false} />;
}

export function TimePickerSecondsExample(): React.ReactElement {
  return <TimePickerDemo seconds />;
}

export function TimePickerWithoutFooterExample(): React.ReactElement {
  return <TimePickerDemo footer={false} />;
}

export function TimePickerWithDatePickerExample(): React.ReactElement {
  return (
    <div className="time-picker-with-date-demo">
      <DateSinglePickerDemo selectionPanel={false} />
      <TimePickerDemo />
    </div>
  );
}

export const pickerComponentSourceMap = {
  basicColorPicker: `<ColorPicker value="#000000" palette={palette} />`,
  colorPickerLabel: `<ColorPicker label="Background color" value="#000000" palette={palette} />`,
  colorPickerInput: `<ColorPicker label="Color" value="#000000" showInput />`,
  colorPickerMultiRow: `<ColorPicker value="#000000" palette={palette} rows={3} />`,
  colorPickerDisabled: `<ColorPicker value="#000000" palette={palette} disabled />`,
  basicDateRange: `<DateRangePicker value={{startDate, endDate}} />`,
  dateRangeQuick: `<DateRangePicker value={{startDate, endDate}} quickSelectOptions={quickOptions} />`,
  dateRangeTime: `<DateRangePicker value={{startDate, endDate}} showTimeInput />`,
  dateRangeFooter: `<DateRangePicker value={{startDate, endDate}} showFooterActions />`,
  basicDateSingle: `<DateSinglePicker value={selectedDate} />`,
  dateSingleSelectionPanel: `<DateSinglePicker value={selectedDate} showSelectionPanel />`,
  dateSingleFooter: `<DateSinglePicker value={selectedDate} showFooterActions />`,
  disabledDateSingle: `<DateSinglePicker value={selectedDate} disabledDates={disabledDates} />`,
  dateSingleInForm: `<DateSinglePicker label="Date" value={selectedDate} />`,
  basicTime: `<TimePicker value={selectedTime} />`,
  time24Hour: `<TimePicker value={selectedTime} format="24-hour" />`,
  timeSeconds: `<TimePicker value={selectedTime} showSecondColumn />`,
  timeWithoutFooter: `<TimePicker value={selectedTime} showFooter={false} />`,
  timeWithDatePicker: `<DateSinglePicker value={selectedDate} />
<TimePicker value={selectedTime} />`,
};
