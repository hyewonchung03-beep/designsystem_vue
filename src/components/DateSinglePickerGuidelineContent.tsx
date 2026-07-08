import React, {useState} from 'react';
import {ExampleCard} from '@site/src/components/ExampleCard';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {DateSinglePickerDemo} from '@site/src/components/PickerComponentExamples';

function Legend({items}: {items: string[]}): React.ReactElement {
  return <div className="button-anatomy__legend">{items.map((item, index) => <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>)}</div>;
}

function TextList({items}: {items: string[]}): React.ReactElement {
  return <div className="data-table-text-list"><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

function DateStateTable(): React.ReactElement {
  return (
    <div className="picker-state-table date-picker-state-table date-single-state-table">
      {['Day', 'Holiday'].map((row) => (
        <div className="date-picker-state-table__row" key={row}>
          <span>{row}</span>
          <span>2</span>
          <span className="date-state-cell--range">2</span>
          <span className="date-state-cell--selected">2</span>
          <span className="date-single-demo__disabled-day">2</span>
        </div>
      ))}
    </div>
  );
}

export default function DateSinglePickerGuidelineContent(): React.ReactElement {
  const [selectionPanel, setSelectionPanel] = useState(true);
  const [footer, setFooter] = useState(true);

  return (
    <ComponentGuideLayout
        category="Picker"
        title="Date single picker"
        description="Date Single Picker는 사용자가 하나의 날짜를 선택할 수 있도록 제공하는 컴포넌트입니다. 달력과 선택 패널을 통해 월, 연도, 날짜를 탐색하고 선택할 수 있습니다."
        className="picker-guide-page date-single-picker-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy date-single-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="picker-anatomy__stage date-single-anatomy__stage">
                      <DateSinglePickerDemo />
                      {Array.from({length: 14}).map((_, index) => <span className={`guide-marker guide-marker--${index + 1}`} key={index}>{index + 1}</span>)}
                    </div>
                  </div>
                  <Legend items={['Navigation', 'Date select', 'Month/Year select trigger', 'Selected date', 'Calendar', 'Today', 'Selection panel', 'Panel header', 'Close button', 'Panel select trigger', 'Option list', 'Year / Month range', 'Upward tab', 'Selected option']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer picker-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <DateSinglePickerDemo selectionPanel={selectionPanel} footer={footer} />
                  </div>
                  <div className="button-variant-explorer__panel">
                    {[
                      ['Selection panel', [true, false], selectionPanel, setSelectionPanel],
                      ['Footer', [true, false], footer, setFooter],
                    ].map(([name, values, current, setter]) => (
                      <div className="button-control-group" key={name as string}>
                        <span>{name as string}</span>
                        <div className="button-radio-list" role="radiogroup" aria-label={name as string}>
                          {(values as boolean[]).map((value) => (
                            <label className="button-radio-option" key={String(value)}>
                              <input type="radio" name={`date-single-${name}`} checked={current === value} onChange={() => (setter as (value: boolean) => void)(value)} />
                              <span className="button-radio-indicator" aria-hidden="true" />
                              <span>{value ? 'True' : 'False'}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="component-section-copy">Date Single Picker는 사용 목적에 따라 selection panel과 footer 표시 여부를 조정할 수 있습니다. 날짜만 빠르게 선택하는 경우 footer를 생략할 수 있고, 연도나 월 이동이 필요한 경우 selection panel을 함께 제공합니다.</p>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork picker-size-artwork date-single-size-artwork">
                  <DateSinglePickerDemo />
                  <span className="size-callout size-callout--date-single-height">360</span>
                </div>
                <p className="component-section-copy">Date Single Picker는 달력 영역과 selection panel이 함께 사용될 수 있으므로, 표시 영역이 잘리지 않도록 충분한 높이를 확보해야 합니다.</p>
              </SectionBlock>

              <SectionBlock title="Date picker State">
                <DateStateTable />
                <p className="component-section-copy">날짜 상태는 기본 날짜, 오늘 날짜, 선택된 날짜, 비활성 날짜를 명확하게 구분해야 합니다. 휴일은 일반 날짜와 다른 색상 기준을 적용하되, 선택 상태와 충돌하지 않도록 표현합니다.</p>
              </SectionBlock>

              <SectionBlock title="Selection panel">
                <div className="button-guide-artwork picker-selection-panel-artwork">
                  <DateSinglePickerDemo selectionPanel footer />
                  <DateSinglePickerDemo selectionPanel={false} footer />
                </div>
                <p className="component-section-copy">Selection panel은 사용자가 월과 연도를 빠르게 이동해야 할 때 사용합니다. 선택 가능한 옵션은 명확한 단위로 그룹화하고, 현재 선택된 값은 selected 상태로 강조합니다.</p>
              </SectionBlock>

              <SectionBlock title="Placement">
                <div className="button-guide-artwork picker-placement-artwork">
                  <div className="picker-browser-mock"><div className="picker-browser-mock__chrome" /><div className="picker-browser-mock__body"><DateSinglePickerDemo inForm /></div></div>
                </div>
                <p className="component-section-copy">Date Single Picker는 연결된 input field를 기준으로 가까운 위치에 표시합니다. 화면 공간이 부족한 경우 picker가 잘리지 않도록 방향과 위치를 조정합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="하나의 날짜를 선택해야 하는 경우 Date Single Picker를 사용합니다."><DateSinglePickerDemo selectionPanel={false} /></DoDontCard>
                  <DoDontCard type="dont" title="시작일과 종료일을 함께 선택해야 하는 경우 Date Single Picker 두 개를 나란히 사용하지 않습니다."><div className="picker-card-stack"><DateSinglePickerDemo selectionPanel={false} /><DateSinglePickerDemo selectionPanel={false} /></div></DoDontCard>
                  <DoDontCard type="do" title="월이나 연도 이동이 필요한 경우 selection panel을 함께 제공합니다."><DateSinglePickerDemo /></DoDontCard>
                  <DoDontCard type="dont" title="사용자가 먼 날짜로 이동해야 하는 상황에서 월 단위 navigation만 제공하지 않습니다."><DateSinglePickerDemo selectionPanel={false} /></DoDontCard>
                  <DoDontCard type="do" title="선택된 날짜와 오늘 날짜를 시각적으로 구분합니다."><DateSinglePickerDemo /></DoDontCard>
                  <DoDontCard type="dont" title="오늘 날짜와 선택된 날짜가 동일한 스타일로 보이게 하지 않습니다."><DateSinglePickerDemo /></DoDontCard>
                  <DoDontCard type="do" title="날짜 포맷은 서비스 기준에 맞게 일관되게 표시합니다."><DateSinglePickerDemo inForm /></DoDontCard>
                  <DoDontCard type="dont" title="동일한 화면 안에서 서로 다른 날짜 포맷을 혼용하지 않습니다."><DateSinglePickerDemo inForm /></DoDontCard>
                </div>
              </SectionBlock>

              <SectionBlock title="Accessibility">
                <TextList items={['input field와 calendar popup은 키보드로 접근 가능해야 합니다.', 'Tab 키로 picker 내부 요소를 순차적으로 이동할 수 있어야 합니다.', 'Enter 또는 Space 키로 날짜를 선택할 수 있어야 합니다.', 'Esc 키로 picker를 닫을 수 있어야 합니다.', '선택된 날짜, 오늘 날짜, 비활성 날짜는 스크린 리더에서 구분될 수 있도록 상태 정보를 제공해야 합니다.', '색상만으로 상태를 구분하지 말고 selected, disabled 등의 상태를 명확히 전달해야 합니다.']} />
              </SectionBlock>

              <SectionBlock title="Content Guidelines">
                <TextList items={['input label은 선택해야 하는 날짜의 목적을 명확하게 작성합니다.', 'placeholder는 날짜 포맷을 예측할 수 있도록 작성합니다. 예: YYYY.MM.DD', '버튼 문구는 Cancel, Select 또는 Apply처럼 사용자의 행동을 명확하게 표현합니다.', '에러 메시지는 어떤 날짜 조건을 만족하지 못했는지 구체적으로 안내합니다.', '날짜 포맷은 한 화면 안에서 동일하게 유지합니다.']} />
              </SectionBlock>
          </>}
          example={<>
              <ExampleCard title="Basic date single picker" storyId="components-date-single-picker--basic" />
              <ExampleCard title="Date single picker with selection panel" storyId="components-date-single-picker--selection-panel" />
              <ExampleCard title="Date single picker with footer" storyId="components-date-single-picker--footer" />
              <ExampleCard title="Disabled date" storyId="components-date-single-picker--disabled-date" />
              <ExampleCard title="Date single picker in form" storyId="components-date-single-picker--in-form" />
          </>}
        />
      </ComponentGuideLayout>
  );
}
