import React from 'react';
import {ExampleCard} from '@site/src/components/ExampleCard';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {PaginationDemo} from '@site/src/components/NavigationComponentExamples';

function PaginationUsage({dense = false, missingFirst = false, compact = false}: {dense?: boolean; missingFirst?: boolean; compact?: boolean}): React.ReactElement {
  return (
    <PaginationDemo page={compact ? 10 : dense ? 9 : 1} compact={compact || missingFirst} />
  );
}

export default function PaginationGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Navigation"
        title="Pagination"
        description="여러 페이지로 나뉜 콘텐츠를 탐색하며 페이지 간 이동을 제어할 수 있도록 돕는 내비게이션 컴포넌트입니다."
        className="pagination-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy pagination-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <PaginationDemo withInput />
                    <span className="guide-marker guide-marker--1">1</span>
                    <span className="guide-marker guide-marker--2">2</span>
                    <span className="guide-marker guide-marker--3">3</span>
                    <span className="guide-marker guide-marker--4">4</span>
                    <span className="guide-marker guide-marker--5">5</span>
                    <span className="guide-marker guide-marker--6">6</span>
                  </div>
                  <div className="button-anatomy__legend">
                    <span className="button-anatomy__legend-item"><b>1</b> First page icon</span>
                    <span className="button-anatomy__legend-item"><b>2</b> Previous page icon</span>
                    <span className="button-anatomy__legend-item"><b>3</b> Current page indicator</span>
                    <span className="button-anatomy__legend-item"><b>4</b> Page number</span>
                    <span className="button-anatomy__legend-item"><b>5</b> Page input field</span>
                    <span className="button-anatomy__legend-item"><b>6</b> Total page label</span>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork pagination-size-artwork">
                  <PaginationDemo withInput />
                  <span className="size-callout size-callout--pagination">36</span>
                </div>
              </SectionBlock>

              <SectionBlock title="State">
                <div className="button-state-table pagination-state-table">
                  {['Enabled', 'Focused', 'Disabled'].map((state) => (
                    <div className="button-state-table__row" key={state}>
                      <span>{state}</span>
                      <div className="pagination-state-table__items">
                        <span className={`pagination-state pagination-state--${state.toLowerCase()}`}>NN</span>
                        <span className={`pagination-state pagination-state--${state.toLowerCase()} pagination-state--active`}>NN</span>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="사용 가능한 화면 크기에 따라 노출되는 페이지 개수를 조정합니다.">
                    <PaginationUsage />
                  </DoDontCard>
                  <DoDontCard type="dont" title="모든 페이지 번호를 한 번에 노출하지 않습니다.">
                    <PaginationUsage dense />
                  </DoDontCard>
                  <DoDontCard type="do" title="페이지 수가 많을 경우 줄임표(...)를 사용하고, 첫 페이지는 항상 노출합니다.">
                    <PaginationUsage compact />
                  </DoDontCard>
                  <DoDontCard type="dont" title="첫 페이지를 생략하여 탐색 범위의 시작점을 알 수 없게 만들지 않습니다.">
                    <PaginationUsage missingFirst />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<>
              <ExampleCard title="Pagination basic" storyId="components-pagination--basic" />
              <ExampleCard title="Pagination with input" storyId="components-pagination--with-input" />
              <ExampleCard title="Pagination compact" storyId="components-pagination--compact" />
          </>}
        />
      </ComponentGuideLayout>
  );
}
