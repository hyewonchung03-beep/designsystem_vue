import React, {useState} from 'react';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {SideNavigationDemo} from '@site/src/components/NavigationComponentExamples';

function Legend({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-anatomy__legend">
      {items.map((item, index) => (
        <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
      ))}
    </div>
  );
}

function Marker({index, className}: {index: number; className: string}): React.ReactElement {
  return <span className={`guide-marker ${className}`}>{index}</span>;
}

function SideNavigationVariantExplorer(): React.ReactElement {
  const [type, setType] = useState<'expanded' | 'collapsed'>('expanded');

  return (
    <div className="button-variant-explorer side-navigation-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <SideNavigationDemo collapsed={type === 'collapsed'} />
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Type</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Side navigation type">
            {(['expanded', 'collapsed'] as const).map((value) => (
              <label className="button-radio-option" key={value}>
                <input type="radio" name="side-navigation-type" checked={type === value} onChange={() => setType(value)} />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{value[0].toUpperCase() + value.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowserPlacement(): React.ReactElement {
  return (
    <div className="side-navigation-browser">
      <div className="side-navigation-browser__bar"><span /><span /><span /></div>
      <div className="side-navigation-browser__body">
        <SideNavigationDemo />
        <div className="side-navigation-browser__content">
          {Array.from({length: 8}, (_, index) => <span key={index} />)}
        </div>
      </div>
    </div>
  );
}

function HierarchyPreview(): React.ReactElement {
  return (
    <div className="side-navigation-hierarchy">
      <span>Product-level navigation</span><div><span className="side-nav-demo__icon" /> Product-level</div>
      <span>Section-level navigation</span><div><span className="side-nav-demo__icon" /> Section-level <b>⌄</b></div>
      <span>Nested navigation</span><div className="side-navigation-hierarchy__nested">Nested-level</div>
    </div>
  );
}

function StatePreview(): React.ReactElement {
  const states = ['Enabled', 'Hover', 'Pressed', 'Focused', 'Disabled', 'Active', 'Expanded'];

  return (
    <div className="side-navigation-state-list">
      {states.map((state) => (
        <div className="side-navigation-state-list__row" key={state}>
          <span>{state}</span>
          {state === 'Expanded' ? (
            <SideNavigationDemo active="users" showSubnav />
          ) : (
            <div className={`side-nav-demo__item side-nav-demo__item--state side-nav-demo__item--${state.toLowerCase()}`}>
              <span className="side-nav-demo__icon" />
              <span>Navigation item</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function SideNavigationGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Navigation"
        title="Side navigation"
        description="Side Navigation은 제품의 주요 페이지와 하위 메뉴를 탐색하기 위해 화면 좌측에 고정되어 제공되는 내비게이션 컴포넌트입니다. 사용자가 현재 위치를 파악하고, 관련 메뉴 간 이동을 빠르게 수행할 수 있도록 돕습니다."
        className="side-navigation-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy side-navigation-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="side-navigation-anatomy__stage">
                      <SideNavigationDemo />
                      {Array.from({length: 8}, (_, index) => <Marker key={index} index={index + 1} className={`guide-marker--${index + 1}`} />)}
                    </div>
                  </div>
                  <Legend items={['Container', 'Brand icon', 'Brand name', 'Expand/Collapse button', 'Divider', 'Leading icon', 'Navigation item', 'Sub Navigation item']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <SideNavigationVariantExplorer />
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork side-navigation-size-preview">
                  <SideNavigationDemo />
                  <SideNavigationDemo collapsed />
                </div>
                <p className="component-section-copy">Side Navigation은 제품 내 정보 구조와 선택 가능한 메뉴 수에 따라 expanded 또는 collapsed 형태로 사용할 수 있습니다.</p>
              </SectionBlock>

              <SectionBlock title="Content Overflow">
                <div className="button-guide-artwork side-navigation-content-preview">
                  <SideNavigationDemo />
                  <span className="side-navigation-tooltip">Navigation item with long description label</span>
                </div>
                <p className="component-section-copy">메뉴명이 길어질 경우 주요 텍스트만 유지하고 말줄임을 표시합니다. 필요한 경우 tooltip으로 전체 내용을 제공합니다.</p>
              </SectionBlock>

              <SectionBlock title="Hierarchy">
                <div className="button-guide-artwork side-navigation-hierarchy-preview">
                  <HierarchyPreview />
                </div>
                <p className="component-section-copy">Side Navigation은 탐색 범위에 따라 product-level, section-level, nested navigation으로 구성할 수 있습니다.</p>
              </SectionBlock>

              <SectionBlock title="Placement">
                <div className="button-guide-artwork side-navigation-placement-preview">
                  <BrowserPlacement />
                </div>
                <p className="component-section-copy">Side Navigation은 제품의 좌측 또는 주요 화면 영역의 왼쪽에 고정 배치합니다.</p>
              </SectionBlock>

              <SectionBlock title="State">
                <div className="button-guide-artwork side-navigation-state-preview">
                  <StatePreview />
                </div>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="제품의 주요 페이지 또는 기능 그룹을 계층적으로 명확히 배치합니다.">
                    <BrowserPlacement />
                  </DoDontCard>
                  <DoDontCard type="dont" title="단일 페이지 안에서만 쓰는 콘텐츠 섹션 이동에 사용하지 않습니다.">
                    <BrowserPlacement />
                  </DoDontCard>
                  <DoDontCard type="do" title="하위 메뉴는 상위 항목과 관계가 명확할 때만 사용합니다.">
                    <SideNavigationDemo />
                  </DoDontCard>
                  <DoDontCard type="dont" title="연관성이 낮은 항목을 깊은 단계에 배치하지 않습니다.">
                    <SideNavigationDemo active="users" />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/SideNavigation"]} />}
        />
      </ComponentGuideLayout>
  );
}
