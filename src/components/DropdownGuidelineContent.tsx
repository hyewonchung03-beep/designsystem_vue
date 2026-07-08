import React, {useState} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {getStorybookIframeUrl} from '@site/src/components/storybookUrls';

type DropdownVariant = 'default' | 'checkbox' | 'avatar' | 'flag';

function Legend({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-anatomy__legend">
      {items.map((item, index) => (
        <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
      ))}
    </div>
  );
}

function VariantsExplorer(): React.ReactElement {
  const [type, setType] = useState<DropdownVariant>('default');
  const [compact, setCompact] = useState(false);
  const [loading, setLoading] = useState(false);
  const {colorMode} = useColorMode();
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const storybookId = type === 'checkbox'
    ? 'components-dropdown-dropdown--checkbox-type'
    : type === 'avatar' || type === 'flag'
      ? 'components-dropdown-dropdown--with-description'
      : loading
        ? 'components-dropdown-dropdown--with-disabled-item'
        : 'components-dropdown-dropdown--default';
  const storybookArgs = [`compact:${compact}`].join(';');
  const storybookDropdownSrc = getStorybookIframeUrl({
    storyId: storybookId,
    args: storybookArgs,
    theme: storybookTheme,
    embed: 'component',
  });

  return (
    <div className="button-variant-explorer dropdown-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <iframe
          title="Dropdown Storybook preview"
          src={storybookDropdownSrc}
          className="button-variant-explorer__iframe"
          loading="lazy"
        />
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Type</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Dropdown type">
            {(['default', 'checkbox', 'avatar', 'flag'] as DropdownVariant[]).map((value) => (
              <label key={value} className="button-radio-option">
                <input type="radio" name="dropdown-type" checked={type === value} onChange={() => setType(value)} />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
        {[
          ['Compact', compact, setCompact],
          ['Loading icon', loading, setLoading],
        ].map(([label, current, setter]) => (
          <div className="button-control-group" key={label as string}>
            <span>{label as string}</span>
            <div className="button-radio-list" role="radiogroup" aria-label={`Dropdown ${label}`}>
              {[true, false].map((value) => (
                <label key={String(value)} className="button-radio-option">
                  <input type="radio" name={`dropdown-${label}`} checked={current === value} onChange={() => (setter as (value: boolean) => void)(value)} />
                  <span className="button-radio-indicator" aria-hidden="true" />
                  <span>{value ? 'True' : 'False'}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DropdownGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Dropdown"
        title="Dropdown"
        description="Dropdown은 사용자가 선택 가능한 항목 목록을 열어 특정 옵션을 선택하거나 실행할 수 있도록 제공하는 컴포넌트입니다. 좁은 공간에서 여러 선택지를 효율적으로 제공하며, 정렬, 필터, 액션 메뉴처럼 사용자가 다음 행동을 선택해야 하는 상황에 사용합니다."
        className="dropdown-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy dropdown-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <img src="/img/components/dropdown-anatomy.svg" alt="Dropdown anatomy" className="button-guide-artwork-img" />
                  </div>
                  <Legend items={['Label', 'Option item', 'Container', 'Scroll bar']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <VariantsExplorer />
              </SectionBlock>

              <SectionBlock title="Dropdown Item">
                <div className="button-guide-artwork dropdown-item-grid">
                  <img src="/img/components/dropdown-item.svg" alt="Dropdown item" className="button-guide-artwork-img" />
                </div>
              </SectionBlock>

              <SectionBlock title="State">
                <div className="button-guide-artwork dropdown-state-table">
                  <img src="/img/components/dropdown-state.svg" alt="Dropdown state" className="button-guide-artwork-img" />
                </div>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork dropdown-size-artwork">
                  <img src="/img/components/dropdown-size.svg" alt="Dropdown size" className="button-guide-artwork-img" />
                </div>
                <p className="component-section-copy">Dropdown의 너비는 Trigger 또는 관련 입력 영역의 너비를 기준으로 맞추는 것을 기본으로 합니다. 목록이 Trigger보다 짧아져 옵션 텍스트가 잘리는 경우에는 최소 너비를 Trigger와 동일하게 유지하고, 필요한 경우 콘텐츠 기준으로 확장할 수 있습니다.</p>
              </SectionBlock>

              <SectionBlock title="Placement">
                <div className="button-guide-artwork dropdown-placement-artwork">
                  <img src="/img/components/dropdown-placement.svg" alt="Dropdown placement" className="button-guide-artwork-img" />
                </div>
                <p className="component-section-copy">Dropdown은 사용자가 선택을 수행하는 Trigger 바로 아래 또는 가까운 위치에 배치합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="국가, 언어, 지역처럼 시각적 식별이 필요한 옵션에는 보조 정보를 함께 제공합니다."><img src="/img/components/dropdown-do-01.svg" alt="Dropdown 보조 정보 사용 권장 예시" className="button-guide-artwork-img" /></DoDontCard>
                  <DoDontCard type="dont" title="수십 개 이상의 옵션을 일반 Dropdown 안에 그대로 나열하지 않습니다."><img src="/img/components/dropdown-dont-01.svg" alt="과도하게 긴 Dropdown 목록 사용 비권장 예시" className="button-guide-artwork-img" /></DoDontCard>
                  <DoDontCard type="do" title="옵션의 성격이 다른 경우 group label을 사용해 항목을 구분합니다."><img src="/img/components/dropdown-do-02.svg" alt="Dropdown group label 사용 권장 예시" className="button-guide-artwork-img" /></DoDontCard>
                  <DoDontCard type="dont" title="서로 다른 유형의 옵션을 구분 없이 하나의 목록에 섞어 표시하지 않습니다."><img src="/img/components/dropdown-dont-02.svg" alt="서로 다른 Dropdown 옵션 혼합 비권장 예시" className="button-guide-artwork-img" /></DoDontCard>
                  <DoDontCard type="do" title="동일하거나 비슷한 이름의 옵션이 있을 때는 구분 가능한 보조 정보를 함께 제공합니다."><img src="/img/components/dropdown-do-03.svg" alt="Dropdown 옵션 보조 정보 사용 권장 예시" className="button-guide-artwork-img" /></DoDontCard>
                  <DoDontCard type="dont" title="flag나 icon만으로 option을 표시하지 않습니다."><img src="/img/components/dropdown-dont-03.svg" alt="Dropdown 아이콘 단독 사용 비권장 예시" className="button-guide-artwork-img" /></DoDontCard>
                  <DoDontCard type="do" title="위험하거나 되돌릴 수 없는 액션은 일반 액션과 시각적으로 분리합니다."><img src="/img/components/dropdown-do-04.svg" alt="Dropdown 위험 액션 분리 권장 예시" className="button-guide-artwork-img" /></DoDontCard>
                  <DoDontCard type="dont" title="삭제와 같은 위험 액션을 일반 액션 사이에 구분 없이 배치하지 않습니다."><img src="/img/components/dropdown-dont-04.svg" alt="Dropdown 위험 액션 혼합 비권장 예시" className="button-guide-artwork-img" /></DoDontCard>
                  <DoDontCard type="do" title="Dropdown option은 짧고 명확한 label을 사용합니다."><img src="/img/components/dropdown-do-05.svg" alt="간결한 Dropdown label 사용 권장 예시" className="button-guide-artwork-img" /></DoDontCard>
                  <DoDontCard type="dont" title="option label에 긴 설명 문장을 사용하지 않습니다."><img src="/img/components/dropdown-dont-05.svg" alt="긴 Dropdown label 사용 비권장 예시" className="button-guide-artwork-img" /></DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Dropdown/Dropdown","Components/Dropdown/DropdownItem"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
