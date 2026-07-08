import React, {useState} from 'react';
import {ExampleCard} from '@site/src/components/ExampleCard';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {DateRangePickerDemo} from '@site/src/components/PickerComponentExamples';

type PickerStyle = 'basic' | 'selection';

function Legend({items}: {items: string[]}): React.ReactElement {
  return <div className="button-anatomy__legend">{items.map((item, index) => <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>)}</div>;
}

function TextList({items}: {items: string[]}): React.ReactElement {
  return <div className="data-table-text-list"><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

function StateCell({children, selected = false, range = false}: {children: string; selected?: boolean; range?: boolean}): React.ReactElement {
  return <span className={`${range ? 'date-state-cell--range' : ''}${selected ? ' date-state-cell--selected' : ''}`}>{children}</span>;
}

export default function DateRangePickerGuidelineContent(): React.ReactElement {
  const [style, setStyle] = useState<PickerStyle>('basic');
  const [quick, setQuick] = useState(true);
  const [advanced, setAdvanced] = useState(true);
  const [footer, setFooter] = useState(true);

  return (
    <ComponentGuideLayout
        category="Picker"
        title="Date range picker"
        description="Date Range Picker는 사용자가 시작일과 종료일을 선택하여 특정 기간 데이터를 조회하거나 필터링할 수 있도록 돕는 컴포넌트입니다. 단일 날짜가 아닌 기간 비교, 리포트 조회, 예약 기간 설정 등 시작일과 종료일이 함께 필요한 상황에서 사용합니다."
        className="picker-guide-page date-range-picker-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy date-range-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="picker-anatomy__stage date-range-anatomy__stage">
                      <DateRangePickerDemo />
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => <span className={`guide-marker guide-marker--${item}`} key={item}>{item}</span>)}
                    </div>
                  </div>
                  <Legend items={['Quick select', 'Custom option', 'Start date', 'Duration', 'End date', 'Advanced filter', 'Time input', 'Footer']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer picker-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <DateRangePickerDemo quick={quick} time={advanced} footer={footer} selection={style === 'selection'} />
                  </div>
                  <div className="button-variant-explorer__panel">
                    {[
                      ['Style', ['basic', 'selection'], style, setStyle],
                      ['Quick select option', [true, false], quick, setQuick],
                      ['Advanced filter', [true, false], advanced, setAdvanced],
                      ['Footer', [true, false], footer, setFooter],
                    ].map(([name, values, current, setter]) => (
                      <div className="button-control-group" key={name as string}>
                        <span>{name as string}</span>
                        <div className="button-radio-list" role="radiogroup" aria-label={name as string}>
                          {(values as Array<string | boolean>).map((value) => (
                            <label className="button-radio-option" key={String(value)}>
                              <input type="radio" name={`date-range-${name}`} checked={current === value} onChange={() => (setter as (value: never) => void)(value as never)} />
                              <span className="button-radio-indicator" aria-hidden="true" />
                              <span>{typeof value === 'boolean' ? (value ? 'True' : 'False') : value[0].toUpperCase() + value.slice(1)}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="component-section-copy">Basic은 기본적인 날짜 범위 선택에 사용하고 Selection은 선택된 기간을 더 명확하게 강조해야 할 때 사용합니다. Quick select, advanced filter, footer는 선택 맥락에 맞춰 제공합니다.</p>
              </SectionBlock>

              <SectionBlock title="Date Picker State">
                <div className="picker-state-table date-picker-state-table">
                  {['Start date', 'Range', 'End date'].map((row, rowIndex) => (
                    <div className="date-picker-state-table__row" key={row}>
                      <span>{row}</span>
                      <StateCell selected={rowIndex === 0}>2</StateCell>
                      <StateCell range={rowIndex === 1}>2</StateCell>
                      <StateCell selected={rowIndex === 2}>3</StateCell>
                    </div>
                  ))}
                </div>
                <p className="component-section-copy">Start date와 End date는 선택 범위의 양 끝을 표시하고, Range는 사이 기간을 보여줍니다. Today와 Holiday는 일반 날짜와 구분될 수 있어야 합니다.</p>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork picker-size-artwork">
                  <DateRangePickerDemo />
                  <span className="size-callout size-callout--date-range-width">550</span>
                </div>
                <p className="component-section-copy">Date Range Picker의 크기는 연결된 입력 필드, 선택 옵션, footer 액션이 모두 명확하게 보이는 범위 안에서 설정합니다.</p>
              </SectionBlock>

              <SectionBlock title="Placement">
                <div className="button-guide-artwork picker-placement-artwork">
                  <div className="picker-browser-mock">
                    <div className="picker-browser-mock__chrome" />
                    <div className="picker-browser-mock__body">
                      <label>Start and end date<input value="09. 02. 2026" readOnly /></label>
                      <div className="picker-placement-panel"><DateRangePickerDemo /></div>
                    </div>
                  </div>
                </div>
                <p className="component-section-copy">Date Range Picker는 기준이 되는 input과 가까운 위치에 표시하여 사용자가 어떤 값에 대한 선택 패널인지 쉽게 이해할 수 있도록 합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="시작일과 종료일을 동시에 선택해야 하는 경우 Date Range Picker를 사용합니다."><DateRangePickerDemo /></DoDontCard>
                  <DoDontCard type="dont" title="하나의 날짜만 선택하는 경우 Date Range Picker를 사용하지 않습니다."><DateRangePickerDemo quick={false} /></DoDontCard>
                  <DoDontCard type="do" title="자주 사용하는 기간은 Quick select 옵션으로 제공합니다."><DateRangePickerDemo /></DoDontCard>
                  <DoDontCard type="dont" title="모든 기간 선택을 사용자가 직접 달력에서만 선택하도록 만들지 않습니다."><DateRangePickerDemo quick={false} /></DoDontCard>
                  <DoDontCard type="do" title="Custom option을 제공하여 사용자가 직접 원하는 기간을 설정할 수 있게 합니다."><DateRangePickerDemo /></DoDontCard>
                  <DoDontCard type="dont" title="정해진 빠른 선택 옵션만 제공하고 직접 선택할 수 없게 제한하지 않습니다."><DateRangePickerDemo /></DoDontCard>
                  <DoDontCard type="do" title="시간 설정이 필요한 경우 날짜 선택과 함께 Time input을 제공합니다."><DateRangePickerDemo time /></DoDontCard>
                  <DoDontCard type="dont" title="시간 설정이 필요한 상황에서 날짜만 선택하게 하여 추가 조건을 이해하기 어렵게 만들지 않습니다."><DateRangePickerDemo time={false} /></DoDontCard>
                  <DoDontCard type="do" title="선택 완료가 필요한 경우 footer에 Select, Cancel, Clear all 액션을 제공합니다."><DateRangePickerDemo footer /></DoDontCard>
                  <DoDontCard type="dont" title="사용자가 선택을 완료했는지 취소했는지 알 수 없는 구조로 만들지 않습니다."><DateRangePickerDemo footer={false} /></DoDontCard>
                </div>
              </SectionBlock>

              <SectionBlock title="Accessibility">
                <TextList items={['Date Range Picker는 keyboard로 날짜 이동, 선택, 취소, 적용이 가능해야 합니다.', 'focus 상태는 날짜 셀, quick select option, input, footer button에서 명확하게 보여야 합니다.', '선택된 시작일, 종료일, 범위는 스크린 리더가 이해할 수 있는 상태 정보로 제공해야 합니다.', '날짜 형식은 사용자의 locale 기준을 따르며 필요한 경우 명확한 format hint를 제공합니다.', 'panel이 열렸을 때 focus가 panel 내부로 이동하고, 닫히면 trigger로 돌아와야 합니다.']} />
              </SectionBlock>

              <SectionBlock title="Content Guideline">
                <TextList items={['Quick select label은 Last 1 days, Last 7 days, Last 30 days, Custom처럼 짧고 명확하게 작성합니다.', 'Date input label은 Start date, End date처럼 역할이 명확해야 합니다.', 'footer action label은 Cancel, Select, Clear all처럼 동작을 직접적으로 설명해야 합니다.', '날짜 format은 제품 내에서 일관되게 유지합니다.', '기간 선택의 결과가 데이터 조회에 영향을 주는 경우 적용 전후 상태를 명확하게 제공합니다.']} />
              </SectionBlock>
          </>}
          example={<>
              <ExampleCard title="Basic Date Range Picker" storyId="components-date-range-picker--basic" />
              <ExampleCard title="Date Range Picker with Quick Select" storyId="components-date-range-picker--quick-select" />
              <ExampleCard title="Date Range Picker with Time Input" storyId="components-date-range-picker--time-input" />
              <ExampleCard title="Date Range Picker with Footer Actions" storyId="components-date-range-picker--footer-actions" />
          </>}
        />
      </ComponentGuideLayout>
  );
}
