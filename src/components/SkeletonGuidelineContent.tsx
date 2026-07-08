import React, {useState} from 'react';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {SkeletonDemo, SpinnerDemo} from '@site/src/components/LoadingComponentExamples';

type SkeletonType = 'circle' | 'bar' | 'rectangle';

function Legend({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-anatomy__legend">
      {items.map((item, index) => (
        <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
      ))}
    </div>
  );
}

function LoadingPanel({children}: {children: React.ReactNode}): React.ReactElement {
  return <div className="loading-usage-panel">{children}</div>;
}

function MiniSkeletonLayout({mismatch = false}: {mismatch?: boolean}): React.ReactElement {
  return (
    <div className={`loading-mini-layout${mismatch ? ' loading-mini-layout--mismatch' : ''}`}>
      <span className="loading-mini-layout__title" />
      <div className="loading-mini-layout__body">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default function SkeletonGuidelineContent(): React.ReactElement {
  const [type, setType] = useState<SkeletonType>('circle');

  return (
    <ComponentGuideLayout
        category="Loading"
        title="Skeleton"
        description="전체 페이지 또는 주요 화면 영역의 콘텐츠가 로딩 중일 때 사용하는 컴포넌트로, 실제 콘텐츠가 표시되기 전 화면의 레이아웃과 정보 구조를 자리 표시자 형태로 먼저 보여주어 사용자가 곧 어떤 콘텐츠가 나타날지 예측할 수 있도록 돕습니다."
        className="loading-guide-page skeleton-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy loading-anatomy skeleton-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="loading-anatomy__stage">
                      <div className="loading-skeleton-anatomy-demo">
                        <SkeletonDemo type="circle" />
                        <div>
                          <SkeletonDemo type="bar" />
                          <SkeletonDemo type="bar" />
                        </div>
                      </div>
                      <span className="guide-marker guide-marker--1">1</span>
                    </div>
                  </div>
                  <Legend items={['Container']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer loading-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <SkeletonDemo type={type} />
                  </div>
                  <div className="button-variant-explorer__panel">
                    <div className="button-control-group">
                      <span>Type</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Skeleton type">
                        {(['circle', 'bar', 'rectangle'] as SkeletonType[]).map((item) => (
                          <label className="button-radio-option" key={item}>
                            <input type="radio" name="skeleton-type" checked={type === item} onChange={() => setType(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item[0].toUpperCase() + item.slice(1)}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="component-section-copy">Circle은 avatar, icon, status dot 등 원형 콘텐츠를 대체할 때 사용합니다. Bar는 title, description 등 선형 콘텐츠에, Rectangle은 이미지, 카드, 차트, 큰 콘텐츠 블록에 사용합니다.</p>
              </SectionBlock>

              <SectionBlock title="Placement">
                <div className="button-guide-artwork loading-placement-artwork">
                  <div className="loading-browser-mock loading-browser-mock--skeleton">
                    <div className="loading-browser-mock__chrome" />
                    <div className="loading-browser-mock__body">
                      <span className="loading-browser-mock__rail loading-browser-mock__rail--dark" />
                      <div className="loading-browser-mock__content">
                        <SkeletonDemo type="bar" />
                        <div className="loading-browser-mock__cards">
                          <SkeletonDemo type="rectangle" />
                          <SkeletonDemo type="rectangle" />
                          <SkeletonDemo type="rectangle" />
                          <SkeletonDemo type="rectangle" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="component-section-copy">Skeleton은 실제 콘텐츠가 표시될 위치에 배치하고, 화면의 전체 구조와 정보 위계를 미리 보여주는 방식으로 구성합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="리스트, 카드, 테이블, 상세 페이지처럼 화면 구조와 정보 레이아웃이 명확한 경우 Skeleton을 사용합니다.">
                    <LoadingPanel><MiniSkeletonLayout /></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="dont" title="완료 시점이나 작업 처리 상태를 알려야 하는 경우에는 Skeleton을 사용하지 않습니다.">
                    <LoadingPanel><SpinnerDemo label="Saving Changes..." size="sm" position="right" /></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="do" title="로딩 후 나타날 콘텐츠의 구조와 형태를 예측할 수 있도록 실제 화면의 레이아웃과 유사하게 구성합니다.">
                    <LoadingPanel><div className="loading-skeleton-transform"><MiniSkeletonLayout /><span aria-hidden="true">-&gt;</span><MiniSkeletonLayout /></div></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="dont" title="실제 콘텐츠와 전혀 다른 형태의 placeholder를 사용하지 않습니다.">
                    <LoadingPanel><div className="loading-skeleton-transform"><MiniSkeletonLayout mismatch /><span aria-hidden="true">-&gt;</span><MiniSkeletonLayout /></div></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="do" title="반복되는 콘텐츠나 데이터 리스트의 일부 항목에 사용합니다.">
                    <LoadingPanel><div className="loading-skeleton-list loading-skeleton-list--compact"><SkeletonDemo type="bar" /><SkeletonDemo type="bar" /><SkeletonDemo type="bar" /></div></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="dont" title="팝업과 같은 작은 인터랙션 영역에는 Skeleton을 사용하지 않습니다. 즉각적인 피드백에는 Spinner가 더 적합합니다.">
                    <LoadingPanel><div className="loading-small-dialog"><SkeletonDemo type="bar" /><SkeletonDemo type="bar" /><button type="button">OK</button></div></LoadingPanel>
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Loading/Skeleton"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
