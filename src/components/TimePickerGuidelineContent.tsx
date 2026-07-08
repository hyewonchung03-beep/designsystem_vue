import React, {useState} from 'react';
import {ExampleCard} from '@site/src/components/ExampleCard';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {DateSinglePickerDemo, TimePickerDemo} from '@site/src/components/PickerComponentExamples';

function Legend({items}: {items: string[]}): React.ReactElement {
  return <div className="button-anatomy__legend">{items.map((item, index) => <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>)}</div>;
}

function TextList({items}: {items: string[]}): React.ReactElement {
  return <div className="data-table-text-list"><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

export default function TimePickerGuidelineContent(): React.ReactElement {
  const [format, setFormat] = useState<'12' | '24'>('12');
  const [seconds, setSeconds] = useState(true);
  const [footer, setFooter] = useState(true);

  return (
    <ComponentGuideLayout
        category="Picker"
        title="Time picker"
        description="Time Picker는 사용자가 특정 시간을 선택할 수 있도록 제공하는 컴포넌트입니다. 독립적으로 사용 가능하며, Date Range Picker와 조합해 날짜와 시간을 함께 선택할 수 있습니다."
        className="picker-guide-page time-picker-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy time-picker-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="picker-anatomy__stage time-picker-anatomy__stage">
                      <TimePickerDemo />
                      {Array.from({length: 10}).map((_, index) => <span className={`guide-marker guide-marker--${index + 1}`} key={index}>{index + 1}</span>)}
                    </div>
                  </div>
                  <Legend items={['Panel container', 'Panel header', 'AM/PM format', 'Hour column', 'Minute column', 'Second column', 'Selected container', 'Close button', 'Divider', 'Footer']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer picker-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <TimePickerDemo format={format} seconds={seconds} footer={footer} />
                  </div>
                  <div className="button-variant-explorer__panel">
                    {[
                      ['Format', ['12', '24'], format, setFormat],
                      ['Second column', [true, false], seconds, setSeconds],
                      ['Footer', [true, false], footer, setFooter],
                    ].map(([name, values, current, setter]) => (
                      <div className="button-control-group" key={name as string}>
                        <span>{name as string}</span>
                        <div className="button-radio-list" role="radiogroup" aria-label={name as string}>
                          {(values as Array<string | boolean>).map((value) => (
                            <label className="button-radio-option" key={String(value)}>
                              <input type="radio" name={`time-${name}`} checked={current === value} onChange={() => (setter as (value: never) => void)(value as never)} />
                              <span className="button-radio-indicator" aria-hidden="true" />
                              <span>{value === '12' ? '12-hour' : value === '24' ? '24-hour' : value ? 'True' : 'False'}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="component-section-copy">Time Picker는 서비스의 시간 표시 정책에 따라 12-hour 또는 24-hour 형식을 사용할 수 있습니다. 초 단위 선택이 필요한 경우에만 second column을 제공합니다.</p>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork picker-size-artwork time-picker-size-artwork">
                  <TimePickerDemo />
                  <span className="size-callout size-callout--time-height">360</span>
                </div>
                <p className="component-section-copy">Time Picker는 시간 column을 스크롤하거나 선택해야 하므로, 각 column의 항목이 잘리지 않도록 충분한 높이를 확보해야 합니다.</p>
              </SectionBlock>

              <SectionBlock title="Placement">
                <div className="button-guide-artwork picker-placement-artwork time-picker-placement-artwork">
                  <div className="time-picker-with-date-demo"><DateSinglePickerDemo selectionPanel={false} /><TimePickerDemo /></div>
                </div>
                <p className="component-section-copy">Time Picker는 연결된 time input을 기준으로 가까운 위치에 표시합니다. Date Picker와 함께 사용할 경우 두 picker가 서로 겹치거나 주요 입력 영역을 가리지 않도록 배치합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="정확한 시작 시간이나 종료 시간을 선택해야 하는 경우 Time Picker를 사용합니다."><TimePickerDemo /></DoDontCard>
                  <DoDontCard type="dont" title="기간이나 소요 시간을 선택해야 하는 경우 Time Picker를 사용하지 않습니다."><TimePickerDemo /></DoDontCard>
                  <DoDontCard type="do" title="서비스 기준에 맞는 시간 형식을 일관되게 사용합니다."><TimePickerDemo format="12" /></DoDontCard>
                  <DoDontCard type="dont" title="동일한 화면 안에서 12-hour와 24-hour 형식을 혼용하지 않습니다."><div className="picker-card-stack"><TimePickerDemo format="12" /><TimePickerDemo format="24" /></div></DoDontCard>
                  <DoDontCard type="do" title="초 단위 선택이 필요한 경우에만 second column을 표시합니다."><TimePickerDemo seconds /></DoDontCard>
                  <DoDontCard type="dont" title="사용하지 않는 초 단위 column을 기본으로 노출하지 않습니다."><TimePickerDemo seconds /></DoDontCard>
                  <DoDontCard type="do" title="Date Picker와 함께 사용할 때는 날짜와 시간이 연결된 입력 흐름으로 보이게 구성합니다."><div className="time-picker-with-date-demo"><DateSinglePickerDemo selectionPanel={false} /><TimePickerDemo /></div></DoDontCard>
                  <DoDontCard type="dont" title="날짜와 시간 picker가 서로 독립된 기능처럼 보이도록 분리하지 않습니다."><div className="picker-card-stack"><DateSinglePickerDemo selectionPanel={false} /><TimePickerDemo /></div></DoDontCard>
                </div>
              </SectionBlock>

              <SectionBlock title="Accessibility">
                <TextList items={['Time Picker는 키보드로 열고 닫을 수 있어야 합니다.', 'Tab 키로 header, hour, minute, second, footer button에 접근할 수 있어야 합니다.', 'Arrow key로 시간 option을 이동할 수 있어야 합니다.', 'Enter 또는 Space 키로 시간을 선택할 수 있어야 합니다.', 'Esc 키로 picker를 닫을 수 있어야 합니다.', '선택된 시간 값은 스크린 리더에서 selected 상태로 전달되어야 합니다.', 'AM/PM, hour, minute, second column은 각각의 의미가 보조 기술에 전달되어야 합니다.']} />
              </SectionBlock>

              <SectionBlock title="Content Guidelines">
                <TextList items={['input label은 선택해야 하는 시간의 목적을 명확하게 작성합니다.', 'placeholder는 시간 포맷을 예측할 수 있도록 작성합니다. 예: HH:MM 또는 HH:MM:SS', '12-hour 형식을 사용하는 경우 AM/PM 표시를 명확하게 제공합니다.', '버튼 문구는 Cancel, Apply처럼 사용자의 행동을 명확하게 표현합니다.', '에러 메시지는 선택 가능한 시간 범위나 제한 조건을 구체적으로 안내합니다.']} />
              </SectionBlock>
          </>}
          example={<>
              <ExampleCard title="Basic time picker" storyId="components-time-picker--basic" />
              <ExampleCard title="24-hour time picker" storyId="components-time-picker--24-hour" />
              <ExampleCard title="Time picker with seconds" storyId="components-time-picker--seconds" />
              <ExampleCard title="Time picker without footer" storyId="components-time-picker--without-footer" />
              <ExampleCard title="Time picker with date picker" storyId="components-time-picker--with-date-picker" />
          </>}
        />
      </ComponentGuideLayout>
  );
}
