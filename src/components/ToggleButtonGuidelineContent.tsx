import React, {useState, type ReactNode} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {getStorybookIframeUrl} from '@site/src/components/storybookUrls';

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
            <path d="M19.7498 12C19.7498 7.71979 16.28 4.25 11.9998 4.25C7.71955 4.25 4.24976 7.71979 4.24976 12C4.24976 16.2802 7.71955 19.75 11.9998 19.75C16.28 19.75 19.7498 16.2802 19.7498 12ZM21.2498 12C21.2498 17.1086 17.1084 21.25 11.9998 21.25C6.89112 21.25 2.74976 17.1086 2.74976 12C2.74976 6.89137 6.89112 2.75 11.9998 2.75C17.1084 2.75 21.2498 6.89137 21.2498 12Z" />
            <path d="M16.0607 8.99995L9.0002 16.0605L7.93965 15L15.0002 7.9394L16.0607 8.99995Z" />
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
              d="M11.9998 4.25C7.71955 4.25 4.24976 7.71979 4.24976 12C4.24976 16.2802 7.71955 19.75 11.9998 19.75C16.28 19.75 19.7498 16.2802 19.7498 12C19.7498 7.71979 16.28 4.25 11.9998 4.25ZM2.74976 12C2.74976 6.89137 6.89112 2.75 11.9998 2.75C17.1084 2.75 21.2498 6.89137 21.2498 12C21.2498 17.1086 17.1084 21.25 11.9998 21.25C6.89112 21.25 2.74976 17.1086 2.74976 12ZM16.3551 9.98033L11.2551 15.0803C10.9622 15.3732 10.4873 15.3732 10.1944 15.0803L7.64443 12.5303L8.70509 11.4697L10.7248 13.4893L15.2944 8.91967L16.3551 9.98033Z"
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

function ToggleButtonVariantExplorer(): React.ReactElement {
  const [style, setStyle] = useState<'selected' | 'unselected'>('selected');
  const [type, setType] = useState<'label-only' | 'label-badge'>('label-only');
  const {colorMode} = useColorMode();

  const styleOptions: Array<{label: string; value: 'selected' | 'unselected'}> = [
    {label: 'Selected', value: 'selected'},
    {label: 'Unselected', value: 'unselected'},
  ];
  const typeOptions: Array<{label: string; value: 'label-only' | 'label-badge'}> = [
    {label: 'Label only', value: 'label-only'},
    {label: 'Label with Badge', value: 'label-badge'},
  ];
  const storybookId = type === 'label-badge' ? 'components-button-togglebuttongroup--with-badge' : 'components-button-togglebuttongroup--default';
  const storybookArgs = [`selectedIndex:${style === 'selected' ? 0 : -1}`].join(';');
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const storybookToggleButtonSrc = getStorybookIframeUrl({
    storyId: storybookId,
    args: storybookArgs,
    theme: storybookTheme,
    embed: 'component',
  });

  return (
    <div className="button-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <iframe
          title="Toggle button Storybook preview"
          src={storybookToggleButtonSrc}
          className="button-variant-explorer__iframe"
          loading="lazy"
        />
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Style</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Toggle button style">
            {styleOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="toggle-button-style"
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
          <span>Type</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Toggle button type">
            {typeOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="toggle-button-type"
                  checked={type === item.value}
                  onChange={() => setType(item.value)}
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

export default function ToggleButtonGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Button"
        title="Toggle button"
        description="토글 버튼은 상태를 켜고 끄거나 선택 여부를 전환하는 버튼입니다. 뱃지를 통해 현재 적용된 항목 수를 표시할 수 있습니다."
      >
        <ComponentGuideTabs
          guideline={<>

              {/* ── Anatomy ─────────────────────────────── */}
              <SectionBlock title="Anatomy">
                <div className="button-anatomy toggle-button-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <img src="/img/components/toggle-button-anatomy.svg" alt="Toggle Button anatomy" className="button-guide-artwork-img" />
                  </div>
                  <div className="button-anatomy__legend">
                    <span className="button-anatomy__legend-item"><b>1</b> Main action container</span>
                    <span className="button-anatomy__legend-item"><b>2</b> Label</span>
                    <span className="button-anatomy__legend-item"><b>3</b> Badge counter</span>
                    <span className="button-anatomy__legend-item"><b>4</b> Dropdown trigger</span>
                  </div>
                </div>
              </SectionBlock>

              {/* ── Variants ────────────────────────────── */}
              <SectionBlock title="Variants">
                <ToggleButtonVariantExplorer />
              </SectionBlock>

              {/* ── Size ────────────────────────────────── */}
              <SectionBlock title="Size">
                <div className="button-guide-artwork toggle-button-size-row">
                  <img src="/img/components/toggle-button-size.svg" alt="Toggle Button size" className="button-guide-artwork-img" />
                </div>
              </SectionBlock>

              {/* ── State ───────────────────────────────── */}
              <SectionBlock title="State">
                <div className="toggle-button-state-table">
                  <img src="/img/components/toggle-button-state.svg" alt="Toggle Button state" className="button-guide-artwork-img" />
                </div>
              </SectionBlock>

              {/* ── Usage Guidelines ─────────────────────── */}
              <SectionBlock title="Usage Guidelines" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">

                  {/* Guideline 1 */}
                  <DoDontCard type="do" title="2개 이상의 옵션을 제공할 경우 토글 버튼을 사용합니다.">
                    <img src="/img/components/toggle-button-do-01.svg" alt="복수 옵션 Toggle Button 사용 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="옵션이 하나인 경우 토글 버튼을 사용하지 않습니다.">
                    <img src="/img/components/toggle-button-dont-01.svg" alt="단일 옵션 Toggle Button 사용 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>

                  {/* Guideline 2 */}
                  <DoDontCard type="do" title="동일한 범주의 속성 옵션을 함께 그룹화합니다.">
                    <img src="/img/components/toggle-button-do-02.svg" alt="동일 범주 Toggle Button 그룹 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="목적이나 속성이 다른 옵션을 하나의 그룹에 혼합하지 않습니다.">
                    <img src="/img/components/toggle-button-dont-02.svg" alt="다른 범주 Toggle Button 혼합 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>

                  {/* Guideline 3 */}
                  <DoDontCard type="do" title="옵션이 많거나 초과할 경우 가로 스크롤을 제공하고, Chevron 아이콘으로 추가 옵션이 있음을 안내합니다.">
                    <img src="/img/components/toggle-button-do-03.svg" alt="Toggle Button 초과 옵션 안내 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="화면 너비가 좁아진 이후에도 가로 스크롤과 Chevron 없이 추가 옵션을 숨기지 않습니다.">
                    <img src="/img/components/toggle-button-dont-03.svg" alt="Toggle Button 초과 옵션 숨김 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>

                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Button/ToggleButtonGroup"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
