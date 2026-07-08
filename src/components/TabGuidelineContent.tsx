import React, {useState} from 'react';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {TabDemo} from '@site/src/components/NavigationComponentExamples';

function Legend({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-anatomy__legend">
      {items.map((item, index) => (
        <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
      ))}
    </div>
  );
}

function TextList({items}: {items: string[]}): React.ReactElement {
  return <div className="data-table-text-list"><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

function TabAnatomy(): React.ReactElement {
  return (
    <div className="button-anatomy">
      <div className="button-guide-artwork button-anatomy__preview">
        <div className="select-anatomy__stage">
          <TabDemo />
          <span className="guide-marker guide-marker--1">1</span>
          <span className="guide-marker guide-marker--2">2</span>
          <span className="guide-marker guide-marker--3">3</span>
        </div>
      </div>
      <Legend items={['Tab label', 'Selected indicator', 'Tab divider']} />
    </div>
  );
}

function TabStateRows(): React.ReactElement {
  return (
    <div className="select-state-table">
      <div className="button-state-table__row">
        <span>Enabled</span>
        <TabDemo />
      </div>
      <div className="button-state-table__row">
        <span>Focused</span>
        <div className="doc-tablist" role="tablist" aria-label="Focused tab demo">
          <button type="button" role="tab" aria-selected="false" className="doc-tab button-doc-demo--focused"><span>Tab</span></button>
          <button type="button" role="tab" aria-selected="true" className="doc-tab doc-tab--selected button-doc-demo--focused"><span>Tab</span><span className="doc-tab-indicator" aria-hidden="true" /></button>
        </div>
      </div>
      <div className="button-state-table__row">
        <span>Disabled</span>
        <TabDemo disabled />
      </div>
    </div>
  );
}

export default function TabGuidelineContent(): React.ReactElement {
  const [padded, setPadded] = useState(false);

  return (
    <ComponentGuideLayout
        category="Navigation"
        title="Tab"
        description="Tab은 동일한 레벨의 콘텐츠를 카테고리별로 전환해 탐색할 수 있도록 제공하는 내비게이션 컴포넌트입니다."
        className="tab-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <TabAnatomy />
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <TabDemo padded={padded} />
                  </div>
                  <div className="button-variant-explorer__panel">
                    <div className="button-control-group">
                      <span>Horizontal padding</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Horizontal padding">
                        {[false, true].map((value) => (
                          <label className="button-radio-option" key={String(value)}>
                            <input type="radio" name="tab-horizontal-padding" checked={padded === value} onChange={() => setPadded(value)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{value ? 'True' : 'False'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork select-size-artwork">
                  <TabDemo padded />
                  <TabDemo />
                  <span className="size-callout size-callout--select-md">48</span>
                  <span className="size-callout size-callout--select-sm">40</span>
                </div>
              </SectionBlock>

              <SectionBlock title="State">
                <TabStateRows />
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="카테고리가 같은 레벨일 때 tab을 사용합니다."><TabDemo /></DoDontCard>
                  <DoDontCard type="dont" title="계층이 다른 메뉴를 tab으로 표현하지 않습니다."><TabDemo sectionTitle /></DoDontCard>
                  <DoDontCard type="do" title="Label은 한 줄로 간결하게 제공합니다."><TabDemo count /></DoDontCard>
                  <DoDontCard type="dont" title="Label이 두 줄로 표시되거나 지나치게 길어지지 않도록 합니다."><TabDemo count padded /></DoDontCard>
                  <DoDontCard type="do" title="Tab 위에 보조 설명을 제공해 맥락을 설명할 수 있습니다."><TabDemo count sectionTitle /></DoDontCard>
                  <DoDontCard type="dont" title="Tab 내부에 과도한 설명을 넣어 탐색 구조를 복잡하게 만들지 않습니다."><TabDemo count sectionTitle padded /></DoDontCard>
                </div>
              </SectionBlock>

              <SectionBlock title="Accessibility">
                <TextList items={['Tab은 키보드로 이동할 수 있어야 합니다.', '선택된 tab은 시각적 indicator와 접근성 속성으로 함께 전달되어야 합니다.', 'Focused 상태는 명확한 focus ring으로 표시해야 합니다.', 'Disabled tab은 선택되지 않아야 하며, 비활성 상태가 명확히 구분되어야 합니다.', 'Tab label만으로 전환되는 콘텐츠의 의미를 이해할 수 있어야 합니다.']} />
              </SectionBlock>

              <SectionBlock title="Content Guidelines">
                <TextList items={['Tab label은 짧고 명확한 명사형으로 작성합니다.', '동일한 tab group 안에서는 label의 길이와 표현 방식을 최대한 일관되게 유지합니다.', 'Count가 필요한 경우 label 뒤에 괄호로 표시합니다. 예: ESL (3)', 'Tab label에는 문장형 설명을 넣지 않습니다.', '선택된 tab과 콘텐츠 title이 중복될 경우, 콘텐츠 title은 보조 설명 역할로만 사용합니다.']} />
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Tabs"]} />}
        />
      </ComponentGuideLayout>
  );
}
