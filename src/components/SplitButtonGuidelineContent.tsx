import React, {useState, type ReactNode} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {SplitButtonDemo} from '@site/src/components/SplitButtonExamples';
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

function SplitButtonVariantExplorer(): React.ReactElement {
  const [leadingContent, setLeadingContent] = useState<'none' | 'icon'>('icon');
  const {colorMode} = useColorMode();
  const options: Array<{label: string; value: 'none' | 'icon'}> = [
    {label: 'None', value: 'none'},
    {label: 'Icon', value: 'icon'},
  ];
  const storybookArgs = [
    `showIcon:${leadingContent === 'icon'}`,
    `label:${leadingContent === 'icon' ? 'Add' : 'Action'}`,
  ].join(';');
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const storybookSplitButtonSrc = getStorybookIframeUrl({
    storyId: 'components-button-splitbutton--default',
    args: storybookArgs,
    theme: storybookTheme,
    embed: 'component',
  });

  return (
    <div className="button-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <iframe
          title="Split button Storybook preview"
          src={storybookSplitButtonSrc}
          className="button-variant-explorer__iframe"
          loading="lazy"
        />
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Leading content</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Split button leading content">
            {options.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="split-button-leading-content"
                  checked={leadingContent === item.value}
                  onChange={() => setLeadingContent(item.value)}
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

function SplitButtonUsagePreview({
  label = 'Add Member',
  dense = false,
}: {
  label?: string;
  dense?: boolean;
}): React.ReactElement {
  return (
    <div className={`split-button-usage-preview${dense ? ' split-button-usage-preview--dense' : ''}`}>
      <SplitButtonDemo label={label} menuOpen />
    </div>
  );
}

export default function SplitButtonGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Button"
        title="Split button"
        description="스플릿 버튼은 동일한 카테고리 내에서 메인 액션과 관련 옵션을 선택할 수 있도록 제공하는 컴포넌트입니다."
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy split-button-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <img src="/img/components/split-button-anatomy.svg" alt="Split Button anatomy" className="button-guide-artwork-img" />
                  </div>
                  <div className="button-anatomy__legend">
                    <span className="button-anatomy__legend-item"><b>1</b> Main action content</span>
                    <span className="button-anatomy__legend-item"><b>2</b> Left icon</span>
                    <span className="button-anatomy__legend-item"><b>3</b> Label</span>
                    <span className="button-anatomy__legend-item"><b>4</b> Dropdown trigger</span>
                    <span className="button-anatomy__legend-item"><b>5</b> Secondary actions menu</span>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <SplitButtonVariantExplorer />
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork button-size-row split-button-size-row">
                  <img src="/img/components/split-button-size.svg" alt="Split Button size" className="button-guide-artwork-img" />
                </div>
              </SectionBlock>

              <SectionBlock title="State">
                <div className="button-guide-artwork split-button-state-artwork">
                  <img src="/img/components/split-button-state.svg" alt="Split Button state" className="button-guide-artwork-img" />
                </div>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="기본 액션과 추가 액션을 함께 제공해야 할 때 스플릿 버튼을 사용합니다.">
                    <img src="/img/components/split-button-do-01.svg" alt="기본 액션과 추가 액션을 함께 제공하는 Split Button 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="실행 가능한 액션이 하나뿐인 경우 스플릿 버튼을 사용하지 않습니다.">
                    <img src="/img/components/split-button-dont-01.svg" alt="단일 액션에 Split Button 사용 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="do" title="기본 액션과 추가 액션이 동일한 맥락 안에 있을 때 사용합니다.">
                    <img src="/img/components/split-button-do-02.svg" alt="동일한 맥락의 액션을 제공하는 Split Button 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="목적이 다른 액션들을 하나의 스플릿 버튼 안에 혼합하지 않습니다.">
                    <img src="/img/components/split-button-dont-02.svg" alt="목적이 다른 액션 혼합 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="do" title="드롭다운 메뉴에는 사용 빈도가 낮은 보조 액션을 배치합니다.">
                    <img src="/img/components/split-button-do-03.svg" alt="보조 액션을 Dropdown에 배치하는 Split Button 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="자주 사용하는 핵심 액션을 dropdown 안에 숨기지 않습니다.">
                    <img src="/img/components/split-button-dont-03.svg" alt="핵심 액션을 Dropdown에 숨기는 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Button/SplitButton"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
