import React, {useState} from 'react';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {StructuredListDemo} from '@site/src/components/StructuredListComponentExamples';

type RowVariant = 'row' | 'checkbox' | 'icon' | 'text' | 'action';

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

function GuidePanel({children, copy}: {children: React.ReactNode; copy: string[]}): React.ReactElement {
  return (
    <div className="data-table-guide-panel structured-list-guide-panel">
      <div className="button-guide-artwork">{children}</div>
      <ul>{copy.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

export default function StructuredListGuidelineContent(): React.ReactElement {
  const [variant, setVariant] = useState<RowVariant>('checkbox');

  return (
    <ComponentGuideLayout
        category="Component"
        title="Structured list"
        description="Structured List는 행과 열 구조로 정보를 정리해 보여주는 리스트 컴포넌트입니다. 테이블보다 가볍게 정보를 비교하거나 선택, 상태 확인, 간단한 액션이 필요한 목록에 사용합니다."
        className="structured-list-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy structured-list-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="structured-list-anatomy__stage">
                      <StructuredListDemo checkbox rows={3} />
                      {[1, 2, 3, 4].map((item) => <span className={`guide-marker guide-marker--${item}`} key={item}>{item}</span>)}
                    </div>
                  </div>
                  <Legend items={['Selection header', 'Select', 'Header cell', 'Body cell']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer structured-list-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <StructuredListDemo
                      checkbox={variant === 'checkbox'}
                      icon={variant === 'icon'}
                      status={variant === 'text'}
                      action={variant === 'action'}
                      rows={3}
                    />
                  </div>
                  <div className="button-variant-explorer__panel">
                    <div className="button-control-group">
                      <span>Row type</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Row type">
                        {(['row', 'checkbox', 'icon', 'text', 'action'] as RowVariant[]).map((item) => (
                          <label className="button-radio-option" key={item}>
                            <input type="radio" name="structured-list-row" checked={variant === item} onChange={() => setVariant(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item === 'row' ? 'Row only' : item === 'checkbox' ? 'Row with checkbox' : item === 'icon' ? 'Row with icon' : item === 'text' ? 'Row with text' : 'Row with action'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="component-section-copy">Row only는 단순 정보 표시용으로 사용합니다. Checkbox, icon, text, action은 선택, 유형 구분, 복합 정보 표시, 항목별 동작이 필요한 경우에만 사용합니다.</p>
              </SectionBlock>

              <SectionBlock title="Header & Cell size">
                <GuidePanel copy={['Header와 cell은 동일한 column 기준으로 정렬되어야 합니다.', 'Checkbox, icon, status, action 영역은 고정 폭을 사용하고 주요 텍스트 영역은 유동 폭을 사용할 수 있습니다.', '행 높이는 정보 밀도와 사용 맥락에 맞춰 선택합니다.', '긴 텍스트가 들어가는 cell은 줄바꿈, 말줄임, tooltip 정책을 명확히 정해야 합니다.']}>
                  <StructuredListDemo checkbox status action rows={3} />
                </GuidePanel>
              </SectionBlock>

              <SectionBlock title="Header & Cell">
                <GuidePanel copy={['Text cell은 기본 정보 표시용으로 사용합니다.', 'Checkbox cell은 개별 row 선택에 사용합니다.', 'Status cell은 상태값을 badge 또는 text로 표시합니다.', 'Action cell은 row 단위 동작을 제공합니다.', 'Icon cell은 항목의 유형 또는 상태를 보조적으로 표시합니다.', 'Select cell은 row 안에서 값을 변경해야 하는 경우 제한적으로 사용합니다.']}>
                  <StructuredListDemo checkbox icon status action rows={3} />
                </GuidePanel>
              </SectionBlock>

              <SectionBlock title="Selection">
                <GuidePanel copy={['선택 가능한 Structured List는 header와 row의 선택 상태가 일관되어야 합니다.', '전체 선택, 일부 선택, 선택 해제 상태를 명확히 구분합니다.', '선택된 row는 배경 또는 checkbox 상태로 인지할 수 있어야 합니다.', '선택 기능이 없는 목록에는 checkbox를 노출하지 않습니다.']}>
                  <StructuredListDemo checkbox selected rows={3} />
                </GuidePanel>
              </SectionBlock>

              <SectionBlock title="Direction / Layout">
                <GuidePanel copy={['Horizontal은 여러 column을 한 행에 나란히 배치하는 기본 구조입니다.', 'Vertical은 좁은 영역에서 label과 value를 세로로 쌓아 보여줄 때 사용합니다.', 'Overflow는 화면 너비보다 많은 column이 필요한 경우 scroll 또는 overflow 영역으로 처리합니다.', 'Overflow가 있는 경우 주요 정보와 액션이 가려지지 않도록 우선순위를 정합니다.']}>
                  <div className="structured-list-layout-stack">
                    <StructuredListDemo status rows={2} />
                    <StructuredListDemo vertical rows={2} />
                    <StructuredListDemo overflow status action rows={2} />
                  </div>
                </GuidePanel>
              </SectionBlock>

              <SectionBlock title="Align">
                <GuidePanel copy={['동일한 column 안의 header와 body cell은 같은 기준선으로 정렬합니다.', '숫자, 날짜, 상태, 액션은 데이터 성격에 맞는 정렬 기준을 사용합니다.', '계층 구조가 있는 경우 들여쓰기를 통해 depth를 표현합니다.', '들여쓰기와 텍스트 길이가 함께 길어질 경우 column 폭과 overflow 정책을 함께 고려합니다.']}>
                  <StructuredListDemo checkbox status action rows={4} />
                </GuidePanel>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="Structured List는 주요 정보를 column 기준으로 정렬해 빠르게 비교할 수 있도록 구성합니다."><StructuredListDemo rows={3} /></DoDontCard>
                  <DoDontCard type="dont" title="row마다 서로 다른 기준으로 정보를 배치해 비교가 어렵게 만들지 않습니다."><StructuredListDemo vertical rows={3} /></DoDontCard>
                  <DoDontCard type="do" title="핵심 정보는 짧고 명확하게 표시하고, 부가 정보는 보조 텍스트나 tooltip로 분리합니다."><StructuredListDemo status rows={3} /></DoDontCard>
                  <DoDontCard type="dont" title="하나의 cell에 긴 문장을 모두 노출해 row 높이가 과도하게 늘어나게 하지 않습니다."><StructuredListDemo overflow rows={3} /></DoDontCard>
                  <DoDontCard type="do" title="사용자가 가장 먼저 확인해야 하는 정보는 왼쪽 또는 첫 번째 주요 column에 배치합니다."><StructuredListDemo icon status rows={3} /></DoDontCard>
                  <DoDontCard type="dont" title="중요도가 낮은 정보가 주요 column을 차지해 핵심 정보를 찾기 어렵게 하지 않습니다."><StructuredListDemo action rows={3} /></DoDontCard>
                  <DoDontCard type="do" title="선택 가능한 row는 checkbox와 selected 상태를 명확히 제공합니다."><StructuredListDemo checkbox selected rows={3} /></DoDontCard>
                  <DoDontCard type="dont" title="선택 기능이 없는 목록에 checkbox를 표시하거나, 선택 상태를 불명확하게 표현하지 않습니다."><StructuredListDemo checkbox rows={3} /></DoDontCard>
                  <DoDontCard type="do" title="row 단위 액션은 우측 끝 또는 일관된 위치에 배치합니다."><StructuredListDemo action rows={3} /></DoDontCard>
                  <DoDontCard type="dont" title="row마다 액션 위치가 달라 사용자가 반복 작업을 하기 어렵게 만들지 않습니다."><StructuredListDemo action vertical rows={3} /></DoDontCard>
                </div>
              </SectionBlock>

              <SectionBlock title="Accessibility">
                <TextList items={['Structured List는 row와 column의 관계를 스크린 리더가 이해할 수 있도록 의미 있는 구조를 가져야 합니다.', '선택 가능한 row는 checkbox의 label 또는 accessible name을 제공해야 합니다.', 'Focus 이동 순서는 header, row, action 흐름이 자연스러워야 합니다.', '선택 상태, disabled 상태, error 상태는 색상 외에도 텍스트 또는 상태 속성으로 전달해야 합니다.', 'Overflow 영역이 있는 경우 키보드로 가로 스크롤 또는 숨겨진 액션에 접근할 수 있어야 합니다.', 'Row action은 아이콘만 사용하지 말고 접근 가능한 이름을 제공해야 합니다.']} />
              </SectionBlock>

              <SectionBlock title="Content Guidelines">
                <TextList items={['Header label은 짧은 명사형으로 작성합니다.', '동일한 column의 값은 동일한 포맷을 유지합니다.', '날짜, 숫자, 상태값은 제품 전체의 표기 규칙을 따릅니다.', 'Empty 값은 빈칸으로 두지 말고 -, N/A 등 시스템 기준에 맞춰 표시합니다.', 'Row action label은 사용자가 실행 결과를 예측할 수 있도록 동사형으로 작성합니다.', '긴 텍스트는 말줄임 처리하고 필요한 경우 tooltip 또는 detail view에서 전체 내용을 제공합니다.']} />
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/StructuredList","Components/StructuredListCell"]} />}
        />
      </ComponentGuideLayout>
  );
}
