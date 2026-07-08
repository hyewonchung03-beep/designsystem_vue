import React from 'react';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {BreadcrumbDemo} from '@site/src/components/NavigationComponentExamples';

function Legend({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-anatomy__legend">
      {items.map((item, index) => (
        <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
      ))}
    </div>
  );
}

function BreadcrumbMini({long = false, hiddenContext = false}: {long?: boolean; hiddenContext?: boolean}): React.ReactElement {
  return (
    <div className={`breadcrumb-guide-mini${long ? ' breadcrumb-guide-mini--long' : ''}`}>
      <span>Home</span><i>›</i>
      {long && !hiddenContext && <><span>SOLUM</span><i>›</i><span>My project</span><i>›</i></>}
      {long && hiddenContext && <><button type="button">...</button><i>›</i></>}
      <strong>{long ? 'Issue #7123' : 'New York'}</strong>
    </div>
  );
}

export default function BreadcrumbGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Navigation"
        title="Breadcrumb"
        description="사용자가 현재 위치와 상위 구조를 이해하고, 상위 단계로 쉽게 이동할 수 있도록 돕는 내비게이션 컴포넌트입니다."
        className="breadcrumb-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy breadcrumb-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="breadcrumb-anatomy__stage">
                      <BreadcrumbDemo overflow />
                      <span className="guide-marker guide-marker--1">1</span>
                      <span className="guide-marker guide-marker--2">2</span>
                      <span className="guide-marker guide-marker--3">3</span>
                      <span className="guide-marker guide-marker--4">4</span>
                      <span className="guide-marker guide-marker--5">5</span>
                    </div>
                  </div>
                  <Legend items={['Parent label', 'Chevron icon', 'Overflow trigger', 'Overflow menu', 'Current label']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork breadcrumb-size-artwork">
                  <BreadcrumbDemo overflow />
                  <div className="size-callout size-callout--text">4</div>
                  <div className="size-callout size-callout--chevron">4</div>
                  <div className="size-callout size-callout--trigger">24</div>
                </div>
                <p className="component-section-copy">기본 breadcrumb 텍스트와 chevron은 4px 간격을 유지합니다. Overflow trigger는 24px 영역 안에 배치하고, dropdown menu는 trigger 아래에서 경로 흐름과 정렬합니다.</p>
              </SectionBlock>

              <SectionBlock title="State">
                <div className="button-state-table breadcrumb-state-table">
                  {['Enabled', 'Hover', 'Pressed', 'Focused'].map((state) => (
                    <div className="button-state-table__row" key={state}>
                      <span>{state}</span>
                      <div className="breadcrumb-state-table__items">
                        <span className={`breadcrumb-link-state breadcrumb-link-state--${state.toLowerCase()}`}>Link Label</span>
                        <span className={`breadcrumb-current-state breadcrumb-current-state--${state.toLowerCase()}`}>Link Label</span>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              <SectionBlock title="Overflow">
                <div className="button-guide-artwork breadcrumb-overflow-artwork">
                  <BreadcrumbDemo overflow />
                  <BreadcrumbDemo overflow currentOnly={false} />
                </div>
                <p className="component-section-copy">Breadcrumb 항목이 길어질 경우 중간 항목을 overflow menu로 축약합니다. 현재 페이지와 중요한 상위 경로는 유지하고, overflow menu를 통해 숨겨진 경로에 접근할 수 있어야 합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="사용자가 전체 위치를 쉽게 파악할 수 있도록 중요한 계층을 제공합니다.">
                    <BreadcrumbMini />
                  </DoDontCard>
                  <DoDontCard type="dont" title="상위 경로가 없는 단일 페이지에는 사용하지 않습니다.">
                    <BreadcrumbMini />
                  </DoDontCard>
                  <DoDontCard type="do" title="breadcrumb는 최대 노출 개수를 제한하고, 필요한 경우 overflow를 사용합니다.">
                    <BreadcrumbMini long hiddenContext />
                  </DoDontCard>
                  <DoDontCard type="dont" title="경로가 길어져도 모든 항목을 화면에 노출하지 않습니다.">
                    <BreadcrumbMini long />
                  </DoDontCard>
                  <DoDontCard type="do" title="경로가 길거나 화면 너비가 충분하지 않은 경우, 현재 위치와 가까운 상위 경로를 일부 노출하고 나머지는 overflow 메뉴로 축약합니다.">
                    <BreadcrumbMini long hiddenContext />
                  </DoDontCard>
                  <DoDontCard type="dont" title="사용자가 현재 위치의 맥락을 쉽게 이해할 수 없도록 중요 경로를 숨기지 않습니다.">
                    <div className="breadcrumb-menu-only">
                      <button type="button">...</button>
                      <strong>Issue #7123</strong>
                    </div>
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Breadcrumb"]} />}
        />
      </ComponentGuideLayout>
  );
}
