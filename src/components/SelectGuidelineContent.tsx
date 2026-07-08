import React, {useState} from 'react';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {SelectDemo} from '@site/src/components/SelectionComponentExamples';

type SelectVariant = 'field' | 'trigger';

function Legend({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-anatomy__legend">
      {items.map((item, index) => (
        <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
      ))}
    </div>
  );
}

export default function SelectGuidelineContent(): React.ReactElement {
  const [variant, setVariant] = useState<SelectVariant>('field');
  const [label, setLabel] = useState(true);
  const [helper, setHelper] = useState(true);

  return (
    <ComponentGuideLayout
        category="Select"
        title="Select"
        description="Select는 사용자가 정해진 옵션 목록에서 하나 또는 여러 값을 선택할 때 사용하는 컴포넌트입니다."
        className="select-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy select-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="select-anatomy__stage">
                      <SelectDemo label="Label" helper="Helper text" multiple chips={['Chip 1', 'Chip 2', 'Chip 3', 'Chip 4']} counter="4" />
                      {[1, 2, 3, 4, 5, 6, 7].map((item) => <span className={`guide-marker guide-marker--${item}`} key={item}>{item}</span>)}
                    </div>
                  </div>
                  <Legend items={['Select field', 'Label', 'Dropdown icon', 'Multi selected chip', 'More link', 'Delete all', 'Counter badge']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer select-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <SelectDemo
                      text={variant === 'trigger'}
                      label={label ? 'Label' : undefined}
                      helper={helper ? 'Helper text' : undefined}
                      value={variant === 'trigger' ? 'Device' : undefined}
                    />
                  </div>
                  <div className="button-variant-explorer__panel">
                    {[
                      ['Type', ['field', 'trigger'], variant, setVariant],
                      ['Label', [true, false], label, setLabel],
                      ['Helper text', [true, false], helper, setHelper],
                    ].map(([name, values, current, setter]) => (
                      <div className="button-control-group" key={name as string}>
                        <span>{name as string}</span>
                        <div className="button-radio-list" role="radiogroup" aria-label={name as string}>
                          {(values as Array<string | boolean>).map((value) => (
                            <label className="button-radio-option" key={String(value)}>
                              <input type="radio" name={`select-${name}`} checked={current === value} onChange={() => (setter as (value: never) => void)(value as never)} />
                              <span className="button-radio-indicator" aria-hidden="true" />
                              <span>{typeof value === 'boolean' ? (value ? 'True' : 'False') : value === 'field' ? 'Select field' : 'Select trigger'}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="component-section-copy">Select field는 폼 영역에서 값을 선택할 때 사용하고, Select trigger는 툴바나 좁은 영역에서 선택 메뉴를 여는 간결한 액션으로 사용합니다.</p>
              </SectionBlock>

              <SectionBlock title="State">
                <div className="select-state-table">
                  {(['enabled', 'focused', 'done', 'error', 'disabled', 'readonly'] as const).map((state) => (
                    <div className="button-state-table__row" key={state}>
                      <span>{state[0].toUpperCase() + state.slice(1)}</span>
                      <SelectDemo value={state === 'enabled' ? undefined : 'Device'} state={state} helper={state === 'error' ? 'Select one option.' : undefined} />
                      <SelectDemo multiple chips={['Chip 1', 'Chip 2', 'Chip 3']} state={state} helper={state === 'error' ? 'Remove one item.' : undefined} />
                      <SelectDemo text value="Device" state={state} open={state === 'focused'} />
                    </div>
                  ))}
                </div>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork select-size-artwork">
                  <SelectDemo size="sm" placeholder="Small" open />
                  <SelectDemo size="md" placeholder="Medium" open />
                  <SelectDemo multiple chips={['Selected 01', 'Selected 02', 'Selected 03', 'Selected 04']} counter="4" open />
                  <SelectDemo text value="Text" counter="3" open />
                  <span className="size-callout size-callout--select-sm">30</span>
                  <span className="size-callout size-callout--select-md">36</span>
                </div>
                <p className="component-section-copy">Select의 너비는 사용 맥락에 맞춰 지정합니다. Form 영역에서는 Field를, 툴바와 필터처럼 공간이 제한된 영역에서는 Text select를 사용합니다.</p>
              </SectionBlock>

              <SectionBlock title="Patterns">
                <div className="select-pattern-grid">
                  <div className="select-pattern-row">
                    <span>Single</span>
                    <SelectDemo label="Label" value="Selected option" open />
                    <SelectDemo text value="10 rows per page" open />
                  </div>
                  <div className="select-pattern-row">
                    <span>Multi</span>
                    <SelectDemo label="Label" multiple chips={['Selected option', 'Selected option']} counter="2" open />
                    <SelectDemo text value="Filter" counter="3" open />
                  </div>
                  <div className="select-pattern-row">
                    <span>Searchable list</span>
                    <SelectDemo label="Company" placeholder="Search store" open />
                    <SelectDemo label="Store" multiple chips={['Selected 01', 'Selected 02']} counter="4" open />
                  </div>
                  <div className="select-pattern-row">
                    <span>Search with action</span>
                    <SelectDemo label="Team" placeholder="Search team" open />
                    <SelectDemo label="Devices" multiple chips={['Selected 01', 'Selected 02', 'Selected 03']} counter="6" open />
                  </div>
                </div>
                <p className="component-section-copy">Select는 선택 목적과 옵션 수에 따라 single, multi, searchable list, action이 포함된 패턴으로 구성합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="선택 목적이 명확히 이해되도록 label을 제공합니다."><SelectDemo label="Label" /></DoDontCard>
                  <DoDontCard type="dont" title="선택 필드만 배치해 사용자가 무엇을 선택해야 하는지 알 수 없게 하지 않습니다."><SelectDemo /></DoDontCard>
                  <DoDontCard type="do" title="여러 항목이 선택된 경우 chip으로 선택 값을 명확히 표시합니다."><SelectDemo multiple chips={['Device 01', 'Device 02', 'Device 03']} /></DoDontCard>
                  <DoDontCard type="dont" title="선택된 항목을 숨기거나 사용자가 선택 상태를 확인할 수 없게 하지 않습니다."><SelectDemo value="Multiple selected" /></DoDontCard>
                  <DoDontCard type="do" title="옵션에 계층이 있는 경우 들여쓰기나 그룹 구조로 관계를 명확히 표현합니다."><SelectDemo multiple chips={['1 Depth', '2 Depth']} open /></DoDontCard>
                  <DoDontCard type="dont" title="서로 다른 depth의 옵션을 동일한 레벨처럼 보여주지 않습니다."><SelectDemo value="Category" open /></DoDontCard>
                  <DoDontCard type="do" title="선택 항목이 많을 경우 일부 항목과 count badge를 함께 표시해 영역을 효율적으로 사용합니다."><SelectDemo multiple chips={['Device 01', 'Device 02', 'Device 03', 'Device 04', 'Device 05']} /></DoDontCard>
                  <DoDontCard type="dont" title="chip이 한 줄을 과도하게 차지해 레이아웃을 깨뜨리지 않도록 합니다."><SelectDemo multiple chips={['Chip 1', 'Chip 2', 'Chip 3', 'Chip 4', 'Chip 5', 'Chip 6']} /></DoDontCard>
                  <DoDontCard type="do" title="선택 조건, 제한 수량, 오류 원인을 helper text로 안내합니다."><SelectDemo label="Label" multiple chips={['Device 01', 'Device 02']} helper="Up to 5 devices." /></DoDontCard>
                  <DoDontCard type="dont" title="오류 상태만 표시하고 사용자가 어떻게 수정해야 하는지 안내하지 않습니다."><SelectDemo value="Error" state="error" /></DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Select"]} />}
        />
      </ComponentGuideLayout>
  );
}
