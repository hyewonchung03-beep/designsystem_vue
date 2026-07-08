import React, {type ReactNode, useState} from 'react';
import {ExampleCard} from '@site/src/components/ExampleCard';
import {ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {TreeMenuDemo} from '@site/src/components/TreeMenuExamples';

type TreeMenuStyle = 'base' | 'selection';
type LeadingIconOption = 'true' | 'false';
type FloatingOption = 'true' | 'false';

function SectionBlock({title, children, className}: {title: string; children: ReactNode; className?: string}): React.ReactElement {
  return (
    <section className={`button-guide-section${className ? ` ${className}` : ''}`}>
      <h2>{title}</h2>
      <div className="button-guide-section__content">{children}</div>
    </section>
  );
}

function DontExampleHeader(): React.ReactElement {
  return (
    <div className="button-example-header button-example-header--dont" data-type="red">
      <div className="button-example-header__row">
        <span className="button-example-header__icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.75 12C19.75 7.71979 16.2802 4.25 12 4.25C7.71979 4.25 4.25 7.71979 4.25 12C4.25 16.2802 7.71979 19.75 12 19.75C16.2802 19.75 19.75 16.2802 19.75 12ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" />
            <path d="M16.0609 8.99995L9.00044 16.0605L7.93988 15L15.0004 7.9394L16.0609 8.99995Z" />
          </svg>
        </span>
        <span className="button-example-header__text">Don&apos;t</span>
      </div>
      <div className="button-example-header__divider" />
    </div>
  );
}

function DoExampleHeader(): React.ReactElement {
  return (
    <div className="button-example-header button-example-header--do" data-type="green">
      <div className="button-example-header__row">
        <span className="button-example-header__icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 4.25C7.71979 4.25 4.25 7.71979 4.25 12C4.25 16.2802 7.71979 19.75 12 19.75C16.2802 19.75 19.75 16.2802 19.75 12C19.75 7.71979 16.2802 4.25 12 4.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12ZM16.3553 9.98033L11.2553 15.0803C10.9624 15.3732 10.4876 15.3732 10.1947 15.0803L7.64467 12.5303L8.70533 11.4697L10.725 13.4893L15.2947 8.91967L16.3553 9.98033Z"
            />
          </svg>
        </span>
        <span className="button-example-header__text">Do</span>
      </div>
      <div className="button-example-header__divider" />
    </div>
  );
}

function DoDontCard({type, title, children}: {type: 'do' | 'dont'; title: string; children: ReactNode}): React.ReactElement {
  return (
    <article className={`button-guide-card button-guide-card--${type}`}>
      {type === 'dont' ? <DontExampleHeader /> : <DoExampleHeader />}
      <h3>{title}</h3>
      <div className="button-guide-card__artwork">{children}</div>
    </article>
  );
}

function TreeMenuVariantExplorer(): React.ReactElement {
  const [style, setStyle] = useState<TreeMenuStyle>('base');
  const [leadingIcon, setLeadingIcon] = useState<LeadingIconOption>('true');
  const [floating, setFloating] = useState<FloatingOption>('true');
  const styleOptions: Array<{label: string; value: TreeMenuStyle}> = [
    {label: 'List', value: 'base'},
    {label: 'Selection', value: 'selection'},
  ];
  const iconOptions: Array<{label: string; value: LeadingIconOption}> = [
    {label: 'True', value: 'true'},
    {label: 'False', value: 'false'},
  ];

  return (
    <div className="button-variant-explorer tree-menu-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <TreeMenuDemo
          leadingIcon={leadingIcon === 'true'}
          items={[
            {
              key: 'all-store',
              label: 'All Store',
              count: 100,
              expanded: true,
              children: [
                {
                  key: 'seoul',
                  label: 'Seoul',
                  count: 82,
                  expanded: true,
                  selected: style === 'selection',
                  children: [
                    {key: 'gangnam', label: 'Gangnam Store', count: 20},
                    {key: 'sinsa', label: 'Sinsa Store', count: 22},
                    {key: 'seongsu', label: 'Seongsu Store', count: 18},
                  ],
                },
                {key: 'busan', label: 'Busan', count: 18},
              ],
            },
          ]}
        />
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Style</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Tree Menu style">
            {styleOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="tree-menu-style"
                  checked={style === item.value}
                  onChange={() => setStyle(item.value)}
                />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="button-control-group">
          <span>Leading Icon</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Tree Menu leading icon">
            {iconOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="tree-menu-leading-icon"
                  checked={leadingIcon === item.value}
                  onChange={() => setLeadingIcon(item.value)}
                />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="button-control-group">
          <span>Floating expand/collapse button</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Tree Menu floating expand collapse button">
            {iconOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="tree-menu-floating-button"
                  checked={floating === item.value}
                  onChange={() => setFloating(item.value)}
                />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HierarchyPreview(): React.ReactElement {
  return (
    <div className="tree-menu-guide-card">
      <div className="tree-menu-hierarchy-row">
        <span>Level 1</span>
        <TreeMenuDemo heading="" items={[{key: 'level-1', label: 'Level 1'}]} />
      </div>
      <div className="tree-menu-hierarchy-row">
        <span>Level 2</span>
        <TreeMenuDemo
          heading=""
          items={[
            {
              key: 'level-1',
              label: 'Level 1',
              selected: true,
              expanded: true,
              children: [{key: 'level-2', label: 'Level 2'}],
            },
          ]}
        />
      </div>
      <div className="tree-menu-hierarchy-row">
        <span>Level 3</span>
        <TreeMenuDemo
          heading=""
          items={[
            {
              key: 'level-1',
              label: 'Level 1',
              expanded: true,
              children: [
                {
                  key: 'level-2',
                  label: 'Level 2',
                  selected: true,
                  expanded: true,
                  children: [{key: 'level-3', label: 'Level 3'}],
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}

function PlacementPreview(): React.ReactElement {
  return (
    <div className="tree-menu-placement-browser">
      <div className="tree-menu-placement-browser__bar">
        <span />
        <span />
        <span />
      </div>
      <div className="tree-menu-placement-browser__body">
        <aside className="tree-menu-placement-browser__sidebar">
          <TreeMenuDemo
            heading="Panel Heading"
            leadingIcon
            items={[
              {
                key: 'all-store',
                label: 'All Store',
                expanded: true,
                children: [
                  {
                    key: 'seoul',
                    label: 'Seoul',
                    expanded: true,
                    selected: true,
                    children: [{key: 'node', label: 'Node'}],
                  },
                  {key: 'busan', label: 'Busan'},
                ],
              },
            ]}
          />
        </aside>
        <main className="tree-menu-placement-browser__main">
          <div />
          <div />
          <div />
        </main>
      </div>
    </div>
  );
}

function GuidanceList({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-priority-grid tree-menu-text-guidelines">
      {items.map((item) => (
        <article className="button-priority-row" key={item}>
          <h3>{item.split(':')[0]}</h3>
          <p>{item.includes(':') ? item.slice(item.indexOf(':') + 1).trim() : item}</p>
        </article>
      ))}
    </div>
  );
}

export default function TreeMenuGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Structure"
        title="Tree menu"
        description="Tree Menu는 부모-자식 관계가 있는 데이터를 단계적으로 탐색하거나 선택할 수 있도록 제공하는 컴포넌트입니다. 사용자는 항목을 펼치거나 접으면서 계층 구조를 확인하고, 현재 위치와 선택 상태를 명확하게 인지할 수 있습니다."
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy tree-menu-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <TreeMenuDemo
                      heading="Panel Heading"
                      leadingIcon
                      items={[
                        {
                          key: 'all',
                          label: 'All',
                          count: 512,
                          expanded: true,
                          children: [
                            {key: 'node-1', label: 'Node N/N'},
                            {key: 'node-2', label: 'Node N/N', selected: true},
                            {
                              key: 'node-3',
                              label: 'Node N/N',
                              expanded: true,
                              children: [
                                {key: 'child-1', label: 'Node N/N'},
                                {key: 'child-2', label: 'Node'},
                              ],
                            },
                            {key: 'node-4', label: 'Node'},
                          ],
                        },
                      ]}
                    />
                  </div>
                  <div className="button-anatomy__legend">
                    <span className="button-anatomy__legend-item"><b>1</b> Header</span>
                    <span className="button-anatomy__legend-item"><b>2</b> Total count</span>
                    <span className="button-anatomy__legend-item"><b>3</b> Leading Icon</span>
                    <span className="button-anatomy__legend-item"><b>4</b> Menu Text and Total Count</span>
                    <span className="button-anatomy__legend-item"><b>5</b> Selected Container</span>
                    <span className="button-anatomy__legend-item"><b>6</b> Expanded</span>
                    <span className="button-anatomy__legend-item"><b>7</b> Collapsed</span>
                    <span className="button-anatomy__legend-item"><b>8</b> Floating/Expand/Collapse button</span>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <TreeMenuVariantExplorer />
                <p className="tree-menu-guide-desc">Tree Menu는 정보 구조의 복잡도와 사용 목적에 따라 List 또는 Selection 스타일을 선택합니다. 항목의 유형을 빠르게 구분해야 하는 경우 Leading Icon을 사용하고, 텍스트만으로 구분 가능한 경우에는 아이콘을 생략할 수 있습니다.</p>
              </SectionBlock>

              <SectionBlock title="Hierarchy">
                <HierarchyPreview />
                <p className="tree-menu-guide-desc">Tree Menu는 최대 2~3단계 수준의 계층 구조에 사용하는 것을 권장합니다. 계층이 지나치게 깊어지면 탐색이 어려워지므로, 복잡한 구조는 정보 그룹을 재정리하거나 별도 화면으로 분리하는 것을 고려해야 합니다.</p>
              </SectionBlock>

              <SectionBlock title="State">
                <div className="accordion-state-table tree-menu-state-table">
                  {[
                    ['Enabled', <TreeMenuDemo key="enabled" heading="" items={[{key: 'item', label: 'Item 2'}]} />],
                    ['Hover', <TreeMenuDemo key="hover" heading="" items={[{key: 'item', label: 'Item 2', selected: true}]} />],
                    ['Pressed', <TreeMenuDemo key="pressed" heading="" className="tree-menu-doc--pressed" items={[{key: 'item', label: 'Item 2', selected: true}]} />],
                    ['Selected - Expanded', <TreeMenuDemo key="selected-expanded" heading="" items={[{key: 'item', label: 'Item 2', selected: true, expanded: true, children: [{key: 'sub-1', label: 'Lorem ipsum dolor sit amet'}, {key: 'sub-2', label: 'Lorem ipsum dolor sit amet'}]}]} />],
                    ['Selected - Collapsed', <TreeMenuDemo key="selected-collapsed" heading="" items={[{key: 'item', label: 'Item 2', selected: true, expanded: false, children: [{key: 'sub', label: 'Lorem'}]}]} />],
                    ['Disabled', <TreeMenuDemo key="disabled" heading="" items={[{key: 'item', label: 'Item 2', disabled: true}]} />],
                  ].map(([label, preview]) => (
                    <div className="accordion-state-table__row" key={label as string}>
                      <span>{label}</span>
                      <div className="accordion-state-table__content">{preview}</div>
                    </div>
                  ))}
                </div>
                <p className="tree-menu-guide-desc">Tree Menu의 상태는 사용자가 현재 위치, 선택된 항목, 조작 가능한 항목을 명확히 구분할 수 있도록 표현해야 합니다. Selected 상태는 Hover나 Pressed보다 우선적으로 인지될 수 있어야 하며, Disabled 항목은 선택 및 확장 동작을 제공하지 않습니다.</p>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork tree-menu-size-row">
                  <div className="tree-menu-size-item tree-menu-size-item--compact"><span>Compact</span><TreeMenuDemo heading="" items={[{key: 'item', label: 'Item 2', selected: true}]} /></div>
                  <div className="tree-menu-size-item"><span>Default</span><TreeMenuDemo heading="" items={[{key: 'item', label: 'Item 2', selected: true}]} /></div>
                  <div className="tree-menu-size-item tree-menu-size-item--comfortable"><span>Comfortable</span><TreeMenuDemo heading="" items={[{key: 'item', label: 'Item 2', selected: true}]} /></div>
                </div>
                <p className="tree-menu-guide-desc">Tree Menu는 기본적으로 Default 크기를 권장합니다. 항목 수가 많고 공간이 제한적인 경우 Compact 크기를 사용할 수 있으며, 터치 환경이나 가독성이 중요한 화면에서는 Comfortable 크기를 사용할 수 있습니다.</p>
              </SectionBlock>

              <SectionBlock title="Placement">
                <div className="button-guide-artwork tree-menu-placement-preview">
                  <PlacementPreview />
                </div>
                <p className="tree-menu-guide-desc">Tree Menu는 사용자가 계층형 정보를 탐색해야 하는 영역에 배치합니다. 주로 좌측 사이드바나 패널 내부에 사용하며, 화면의 주요 작업 영역을 방해하지 않도록 고정된 탐색 영역에 배치하는 것을 권장합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="상위 항목과 하위 항목의 들여쓰기, selected 상태, expanded 상태를 명확하게 구분합니다.">
                    <TreeMenuDemo heading="" items={[{key: 'region', label: 'Region', expanded: true, children: [{key: 'seoul', label: 'Seoul', expanded: true, selected: true, children: [{key: 'gangnam', label: 'Gangnam Store'}, {key: 'device-01', label: 'Device 01'}, {key: 'device-02', label: 'Device 02'}]}]}]} />
                  </DoDontCard>
                  <DoDontCard type="dont" title="상위/하위 구조가 구분되지 않거나, 선택 상태와 계층 상태가 혼동되도록 표현하지 않습니다.">
                    <TreeMenuDemo heading="" items={[{key: 'status', label: 'Status', expanded: true, children: [{key: 'active', label: 'Active', selected: true}, {key: 'pending', label: 'Pending'}, {key: 'disabled', label: 'Disabled'}]}, {key: 'inactive', label: 'Inactive'}]} />
                  </DoDontCard>
                  <DoDontCard type="do" title="2~3단계 이내의 구조로 정리하고, 사용자가 현재 위치를 쉽게 파악할 수 있도록 합니다.">
                    <TreeMenuDemo heading="" leadingIcon items={[{key: 'node', label: 'Node N/N', expanded: true, children: [{key: 'node-1', label: 'Node N/N'}, {key: 'node-2', label: 'Node N/N', selected: true}, {key: 'node-3', label: 'Node N/N'}]}]} />
                  </DoDontCard>
                  <DoDontCard type="dont" title="4단계 이상의 깊은 구조를 한 화면에 과도하게 펼쳐 사용하지 않습니다.">
                    <TreeMenuDemo heading="" leadingIcon items={[{key: 'node', label: 'Node N/N', expanded: true, children: [{key: 'node-1', label: 'Node N/N', expanded: true, children: [{key: 'node-2', label: 'Node N/N', expanded: true, children: [{key: 'node-3', label: 'Node N/N'}]}]}]}]} />
                  </DoDontCard>
                  <DoDontCard type="do" title="긴 항목명은 말줄임 처리하고, 필요한 경우 tooltip 또는 상세 정보를 제공합니다.">
                    <TreeMenuDemo heading="" items={[{key: 'all', label: 'All Stores', count: 512, expanded: true, children: [{key: 'seoul', label: 'Seoul', count: 231}, {key: 'incheon', label: 'Incheon', count: 21}, {key: 'gangwon', label: 'Gangwon Province Store Group', count: 5}]}]} />
                  </DoDontCard>
                  <DoDontCard type="dont" title="긴 텍스트가 다음 영역을 침범하거나, count / icon / toggle 영역과 겹치도록 두지 않습니다.">
                    <TreeMenuDemo heading="" items={[{key: 'all', label: 'All Stores', count: 512, expanded: true, children: [{key: 'seoul', label: 'Gangnam Store assigned device currently unavailable', count: 231, selected: true}, {key: 'sinsa', label: 'Sinsa Store currently unavailable'}]}]} />
                  </DoDontCard>
                </div>
              </SectionBlock>

              <SectionBlock title="Accessibility">
                <GuidanceList
                  items={[
                    'Keyboard: 방향키로 상하 항목 이동이 가능해야 하며, Enter 또는 Space로 항목 선택이 가능해야 합니다.',
                    'Expanded: 확장 가능한 항목은 펼침/접힘 상태를 스크린리더가 인식할 수 있어야 합니다.',
                    'Selected: 선택된 항목은 selected 상태가 명확하게 전달되어야 합니다.',
                    'Disabled: Disabled 항목은 포커스 및 선택 대상에서 제외하거나 비활성 상태를 명확히 전달해야 합니다.',
                    'Focus: focus 상태는 시각적으로 명확하게 표시되어야 합니다.',
                  ]}
                />
                <p className="tree-menu-guide-desc">Tree Menu는 키보드와 스크린리더 사용자가 계층 구조, 선택 상태, 확장 상태를 동일하게 이해할 수 있도록 설계해야 합니다. 확장 가능한 항목에는 적절한 aria-expanded 상태를 제공하고, 선택 가능한 항목에는 selected 상태를 명확히 전달해주세요.</p>
              </SectionBlock>

              <SectionBlock title="Content Guidelines">
                <GuidanceList
                  items={[
                    'Menu name: 메뉴명은 짧고 명확하게 작성합니다.',
                    'Consistency: 동일한 레벨의 항목은 같은 문장 구조와 명명 규칙을 유지합니다.',
                    'Description: 불필요한 설명형 문장은 메뉴명으로 사용하지 않습니다.',
                    'Count: count가 있는 경우 항목명 뒤에 일관된 형식으로 표시합니다.',
                    'Abbreviation: 축약어는 조직 내에서 명확히 통용되는 경우에만 사용합니다.',
                    'Truncation: 긴 항목명은 말줄임 처리 기준을 따릅니다.',
                  ]}
                />
                <p className="tree-menu-guide-desc">Tree Menu의 항목명은 사용자가 계층 관계와 탐색 목적을 빠르게 이해할 수 있도록 간결하게 작성합니다. 같은 레벨의 항목은 동일한 명명 규칙을 유지하고, 불필요하게 긴 설명형 문장은 피해주세요.</p>
              </SectionBlock>
          </>}
          example={<>
              <ExampleCard title="Basic Tree Menu" storyId="components-tree-menu--basic" />
              <ExampleCard title="Tree Menu with Count" storyId="components-tree-menu--with-count" />
              <ExampleCard title="Tree Menu with Leading Icon" storyId="components-tree-menu--with-leading-icon" />
              <ExampleCard title="Selectable Tree Menu" storyId="components-tree-menu--selectable" />
              <ExampleCard title="Expanded and Collapsed" storyId="components-tree-menu--expanded-collapsed" />
              <ExampleCard title="Disabled Item" storyId="components-tree-menu--disabled-item" />
          </>}
        />
      </ComponentGuideLayout>
  );
}
