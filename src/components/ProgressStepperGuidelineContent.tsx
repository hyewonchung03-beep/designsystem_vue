import React from 'react';
import {ExampleCard} from '@site/src/components/ExampleCard';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {ProgressStepperDemo} from '@site/src/components/NavigationComponentExamples';

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

export default function ProgressStepperGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Navigation"
        title="Progress stepper"
        description="Progress Stepper는 여러 단계로 구성된 작업 흐름에서 현재 위치와 진행 상태를 표시하고, 사용자가 단계 간 이동을 이해하거나 제어할 수 있도록 돕는 내비게이션 컴포넌트입니다."
        className="progress-stepper-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy progress-stepper-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="progress-stepper-anatomy__stage">
                      <ProgressStepperDemo completed={[0]} activeIndex={1} />
                      {[1, 2, 3].map((item) => <span className={`guide-marker guide-marker--${item}`} key={item}>{item}</span>)}
                    </div>
                  </div>
                  <Legend items={['Step label / icon', 'Stepper label', 'Container']} />
                </div>
                <TextList items={['Step label / icon은 각 단계의 순서와 상태를 시각적으로 구분합니다.', 'Stepper label은 각 단계에서 수행해야 하는 작업을 짧고 명확하게 설명합니다.', 'Container는 단계 간 연결 관계와 전체 진행 흐름을 보여줍니다.']} />
              </SectionBlock>

              <SectionBlock title="State">
                <div className="button-guide-artwork progress-stepper-state-table">
                  <div><span>Active</span><ProgressStepperDemo steps={['Sign Up']} activeIndex={0} /></div>
                  <div><span>Inactive</span><ProgressStepperDemo steps={['Sign Up']} activeIndex={1} /></div>
                  <div><span>Completed</span><ProgressStepperDemo steps={['Sign Up']} activeIndex={1} completed={[0]} /></div>
                  <div><span>Error</span><ProgressStepperDemo steps={['Sign Up']} activeIndex={0} errorIndex={0} /></div>
                </div>
                <TextList items={['Active는 사용자가 현재 진행 중인 단계를 나타냅니다.', 'Inactive는 아직 도달하지 않았거나 선택되지 않은 단계를 나타냅니다.', 'Completed는 사용자가 이미 완료한 단계를 나타냅니다.', 'Error는 해당 단계에서 문제가 발생했거나 수정이 필요한 상태를 나타냅니다.']} />
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="단계명을 짧고 명확하게 작성합니다."><ProgressStepperDemo steps={['Create', 'Review', 'Submit']} activeIndex={0} /></DoDontCard>
                  <DoDontCard type="dont" title="한 화면에 과도한 Step을 노출하지 않습니다."><ProgressStepperDemo steps={['Setup', 'Verify', 'Details', 'Options', 'Preference', 'Review', 'Submit', 'Complete']} activeIndex={1} completed={[0]} /></DoDontCard>
                  <DoDontCard type="do" title="순차적인 프로세스 흐름에 사용합니다."><ProgressStepperDemo steps={['Setup', 'Verify', 'Complete']} activeIndex={1} completed={[0]} /></DoDontCard>
                  <DoDontCard type="dont" title="카테고리 전환이나 메뉴 탐색 용도로 사용하지 않습니다."><ProgressStepperDemo steps={['Clothing', 'Shoes', 'Bags', 'Sale']} activeIndex={0} /></DoDontCard>
                </div>
              </SectionBlock>

              <SectionBlock title="Accessibility">
                <TextList items={['현재 단계는 시각적 스타일뿐 아니라 텍스트 또는 aria-current 속성으로도 구분될 수 있어야 합니다.', '완료, 오류, 비활성 상태는 색상만으로 구분하지 않고 icon 또는 label을 함께 사용합니다.', '키보드로 단계 간 이동이 가능한 경우 focus 상태가 명확하게 표시되어야 합니다.', '클릭 가능한 step과 단순 상태 표시용 step을 명확히 구분합니다.', '오류 단계가 있는 경우 스크린 리더가 오류 상태를 인식할 수 있도록 적절한 label을 제공합니다.']} />
              </SectionBlock>

              <SectionBlock title="Content Guidelines">
                <TextList items={['Step label은 1~2개의 짧은 단어로 작성합니다.', '단계명은 사용자가 수행해야 하는 작업 중심으로 작성합니다.', '동일한 stepper 안에서는 명사형 또는 동사형 표현을 일관되게 사용합니다.', '너무 긴 문장이나 설명형 label은 사용하지 않습니다.', '단계 수가 많은 경우 label을 축약하거나 다른 진행 표시 방식을 검토합니다.', '좋은 예: Create, Review, Submit, Setup, Verify, Complete', '피해야 할 예: Please enter all required information, Check every detail before moving to the next page, Choose your preferred product category']} />
              </SectionBlock>
          </>}
          example={<>
              <ExampleCard title="Basic Progress Stepper" storyId="components-progress-stepper--basic" />
              <ExampleCard title="Completed Progress Stepper" storyId="components-progress-stepper--completed" />
              <ExampleCard title="Error Progress Stepper" storyId="components-progress-stepper--error" />
              <ExampleCard title="Multi Step Process" storyId="components-progress-stepper--multi-step" />
          </>}
        />
      </ComponentGuideLayout>
  );
}
