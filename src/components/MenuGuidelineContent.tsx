import React, {useState} from 'react';
import {ExampleCard} from '@site/src/components/ExampleCard';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {MenuDemo, MenuPanel} from '@site/src/components/MenuExamples';

type TriggerType = 'button' | 'icon' | 'select';
type MenuType = 'default' | 'cascading';

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

function RadioOption({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  checked: boolean;
  onChange: () => void;
}): React.ReactElement {
  return (
    <label className="button-radio-option">
      <input type="radio" name={name} checked={checked} onChange={onChange} />
      <span className="button-radio-indicator" aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}

function VariantsExplorer(): React.ReactElement {
  const [trigger, setTrigger] = useState<TriggerType>('button');
  const [type, setType] = useState<MenuType>('default');
  const [leadingIcon, setLeadingIcon] = useState(false);

  return (
    <div className="button-variant-explorer menu-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <MenuDemo trigger={trigger} cascading={type === 'cascading'} leadingIcon={leadingIcon} />
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Trigger</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Menu trigger">
            <RadioOption label="Button" name="menu-trigger" checked={trigger === 'button'} onChange={() => setTrigger('button')} />
            <RadioOption label="Icon trigger" name="menu-trigger" checked={trigger === 'icon'} onChange={() => setTrigger('icon')} />
            <RadioOption label="Select" name="menu-trigger" checked={trigger === 'select'} onChange={() => setTrigger('select')} />
          </div>
        </div>
        <div className="button-control-group">
          <span>Menu type</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Menu type">
            <RadioOption label="Default" name="menu-type" checked={type === 'default'} onChange={() => setType('default')} />
            <RadioOption label="Cascading" name="menu-type" checked={type === 'cascading'} onChange={() => setType('cascading')} />
          </div>
        </div>
        <div className="button-control-group">
          <span>Leading icon</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Menu leading icon">
            <RadioOption label="True" name="menu-leading-icon" checked={leadingIcon} onChange={() => setLeadingIcon(true)} />
            <RadioOption label="False" name="menu-leading-icon" checked={!leadingIcon} onChange={() => setLeadingIcon(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PatternsPreview(): React.ReactElement {
  return (
    <div className="button-guide-artwork menu-patterns">
      <div className="menu-patterns__item">
        <h3>Button trigger menu</h3>
        <p>기본 액션 옆에 관련 보조 액션이 있을 때 사용합니다.</p>
        <MenuDemo />
      </div>
      <div className="menu-patterns__item">
        <h3>Select trigger menu</h3>
        <p>사용자가 항목 값을 선택해야 하는 상황에 사용합니다.</p>
        <MenuDemo trigger="select" selected="Last 30 days" />
      </div>
      <div className="menu-patterns__item">
        <h3>Icon trigger menu</h3>
        <p>공간이 제한된 영역에서 보조 액션을 제공할 때 사용합니다.</p>
        <MenuDemo trigger="icon" danger />
      </div>
      <div className="menu-patterns__item">
        <h3>Cascading menu</h3>
        <p>상위 항목 안에 관련 하위 항목이 있을 때 사용합니다.</p>
        <MenuDemo cascading leadingIcon items={['Trigger item', 'Download as', 'Trigger item']} />
      </div>
    </div>
  );
}

function SizePreview(): React.ReactElement {
  return (
    <div className="button-guide-artwork menu-size-preview">
      <MenuPanel compact items={['Menu item', 'Menu item', 'Menu item', 'Menu item']} />
      <MenuPanel items={['Menu item', 'Menu item', 'Menu item', 'Menu item']} />
      <MenuPanel items={['Menu item', 'Menu item', 'Menu item', 'Menu item', 'Menu item']} />
      <span className="size-callout menu-size-preview__callout menu-size-preview__callout--sm">32</span>
      <span className="size-callout menu-size-preview__callout menu-size-preview__callout--md">36</span>
    </div>
  );
}

function PlacementPreview(): React.ReactElement {
  return (
    <div className="button-guide-artwork menu-placement-preview">
      {['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right'].map((item) => (
        <div className={`menu-placement-preview__card menu-placement-preview__card--${item}`} key={item}>
          <span />
          <strong />
          <i />
          <i />
          <i />
        </div>
      ))}
    </div>
  );
}

export default function MenuGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Menu"
        title="Menu"
        description="Menu는 사용자가 특정 트리거를 통해 실행 가능한 액션 또는 선택 가능한 옵션을 맥락과 관련해 빠르게 선택할 수 있도록 제공하는 오버레이 컴포넌트입니다."
        className="menu-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy menu-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="menu-anatomy__stage">
                      <MenuDemo danger className="menu-anatomy__default" />
                      <MenuDemo cascading leadingIcon items={['Trigger item', 'Download as', 'Trigger item']} className="menu-anatomy__cascade" />
                      {[1, 2, 3, 4, 5, 6, 7].map((item) => <span className={`guide-marker guide-marker--${item}`} key={item}>{item}</span>)}
                    </div>
                  </div>
                  <Legend items={['Trigger container', 'Menu item', 'Divider', 'Destructive menu', 'Parent item', 'Leading icon', 'Trailing icon']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <VariantsExplorer />
              </SectionBlock>

              <SectionBlock title="Patterns">
                <PatternsPreview />
              </SectionBlock>

              <SectionBlock title="Size">
                <SizePreview />
                <TextList items={['Menu item의 기본 높이는 32px를 사용합니다.', '모든 항목은 동일한 높이를 유지하며, icon이나 destructive 항목이 포함되어도 행 높이는 일관되게 유지합니다.']} />
              </SectionBlock>

              <SectionBlock title="Placement">
                <PlacementPreview />
                <TextList items={['트리거가 화면 안쪽에 있을 때는 trigger 기준으로 배치합니다.', '화면 가장자리와 가까울 때는 viewport 밖으로 잘리지 않도록 방향을 조정합니다.']} />
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="테이블, 리스트, 카드처럼 항목별 보조 액션을 제공할 때 사용합니다.">
                    <div className="menu-table-preview"><span>Yesterday</span><button>•••</button><MenuPanel items={['View detail', 'Edit', 'Delete']} danger compact /></div>
                  </DoDontCard>
                  <DoDontCard type="dont" title="주요 탐색이나 계속 노출되어야 하는 정보를 Menu 안에 숨기지 않습니다.">
                    <MenuPanel items={['Data', 'Data', 'Data', 'Data']} />
                  </DoDontCard>
                  <DoDontCard type="do" title="Menu의 목적에 따라 적절한 trigger를 선택합니다.">
                    <MenuDemo trigger="select" selected="Last 30 days" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="서로 다른 목적의 항목을 하나의 Menu 안에 섞지 않습니다.">
                    <MenuPanel items={['Manage account', 'View last 30 days', 'Export to PDF', 'Deactivate user']} danger />
                  </DoDontCard>
                  <DoDontCard type="do" title="Cascading menu는 상위 항목 아래에 관련 하위 옵션이 있을 때 사용합니다.">
                    <MenuDemo cascading leadingIcon items={['Trigger item', 'Download as', 'Trigger item']} />
                  </DoDontCard>
                  <DoDontCard type="dont" title="Cascading menu를 여러 단계로 깊게 중첩하지 않습니다.">
                    <div className="menu-nested-preview"><MenuDemo cascading /><MenuPanel compact items={['Design system', 'Dashboard', 'Data management']} /></div>
                  </DoDontCard>
                  <DoDontCard type="do" title="Icon은 항목의 의미를 빠르게 보조할 때만 사용합니다.">
                    <MenuDemo leadingIcon />
                  </DoDontCard>
                  <DoDontCard type="dont" title="모든 항목에 불필요한 icon을 반복해서 사용하지 않습니다.">
                    <MenuPanel leadingIcon items={['View detail', 'Manage account', 'Edit information', 'Delete']} danger />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<>
              <ExampleCard title="Basic menu" storyId="components-menu--basic" />
              <ExampleCard title="Cascading menu" storyId="components-menu--cascading" />
              <ExampleCard title="Icon trigger menu" storyId="components-menu--icon-trigger" />
              <ExampleCard title="Select trigger menu" storyId="components-menu--select-trigger" />
          </>}
        />
      </ComponentGuideLayout>
  );
}
