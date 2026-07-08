import React from 'react';
import {ExampleCard} from '@site/src/components/ExampleCard';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {IndicatorDemo} from '@site/src/components/NavigationComponentExamples';

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

export default function IndicatorGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Navigation"
        title="Indicator"
        description="Indicator는 여러 페이지, 슬라이드 또는 콘텐츠 그룹 중 사용자의 현재 위치를 간단히 표시하는 내비게이션 컴포넌트입니다."
        className="indicator-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="select-anatomy__stage">
                      <IndicatorDemo total={3} active={0} />
                      <span className="guide-marker guide-marker--1">1</span>
                      <span className="guide-marker guide-marker--2">2</span>
                    </div>
                  </div>
                  <Legend items={['Activated indicator', 'Inactive indicator']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork select-size-artwork">
                  <IndicatorDemo total={3} active={0} />
                  <IndicatorDemo total={3} active={0} />
                  <span className="size-callout size-callout--select-sm">8</span>
                  <span className="size-callout size-callout--select-md">12</span>
                </div>
                <p className="component-section-copy">작은 콘텐츠 그룹이나 기본 carousel에는 작은 indicator를 사용합니다. 터치 조작이 필요하거나 강조가 필요한 경우 더 큰 indicator를 사용할 수 있으며, 동일한 indicator group 안에서는 동일한 size를 유지합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="현재 위치를 명확하게 표시합니다."><IndicatorDemo total={3} active={0} /></DoDontCard>
                  <DoDontCard type="dont" title="활성 상태와 비활성 상태를 유사하게 표현하지 않습니다."><IndicatorDemo total={3} active={0} disabled /></DoDontCard>
                  <DoDontCard type="do" title="적은 수의 페이지나 슬라이드에 사용합니다."><IndicatorDemo carousel total={3} active={0} /></DoDontCard>
                  <DoDontCard type="dont" title="많은 페이지를 표시하기 위한 탐색 수단으로 사용하지 않습니다."><IndicatorDemo carousel total={10} active={5} /></DoDontCard>
                  <DoDontCard type="do" title="보조적인 위치 표시로 사용합니다."><IndicatorDemo interactive total={4} active={1} /></DoDontCard>
                  <DoDontCard type="dont" title="복잡한 페이지 이동이나 주요 내비게이션을 indicator만으로 처리하지 않습니다."><IndicatorDemo interactive total={8} active={3} /></DoDontCard>
                </div>
              </SectionBlock>

              <SectionBlock title="Accessibility">
                <TextList items={['Indicator가 탐색 가능한 요소라면 키보드로 focus 및 선택할 수 있어야 합니다.', '현재 활성 indicator는 시각적 상태뿐 아니라 접근성 속성으로 전달되어야 합니다.', '색상만으로 활성 상태를 구분하지 않고 크기, 형태, 명도 차이 등을 함께 사용합니다.', 'Indicator가 단순 위치 표시용이라면 스크린 리더에서 불필요하게 반복 읽히지 않도록 처리합니다.', 'Indicator가 버튼 역할을 하는 경우 각 항목은 이동 대상의 의미를 포함한 accessible label을 가져야 합니다.']} />
              </SectionBlock>

              <SectionBlock title="Content Guidelines">
                <TextList items={['Indicator는 일반적으로 텍스트 label 없이 사용합니다.', '접근성 label이 필요한 경우 “Go to slide 1”, “Current slide 2 of 4”처럼 목적과 현재 위치를 명확하게 작성합니다.', '전체 개수가 많아질 경우 Indicator 대신 Pagination 또는 Tab 사용을 검토합니다.', '동일한 콘텐츠 그룹 안에서는 indicator의 형태와 간격을 일관되게 유지합니다.']} />
              </SectionBlock>
          </>}
          example={<>
              <ExampleCard title="Basic indicator" storyId="components-indicator--basic" />
              <ExampleCard title="Indicator size" storyId="components-indicator--size" />
              <ExampleCard title="Indicator in carousel" storyId="components-indicator--carousel" />
              <ExampleCard title="Interactive indicator" storyId="components-indicator--interactive" />
              <ExampleCard title="Disabled or inactive indicator group" storyId="components-indicator--disabled" />
          </>}
        />
      </ComponentGuideLayout>
  );
}
