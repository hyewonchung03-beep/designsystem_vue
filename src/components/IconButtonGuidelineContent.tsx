import React, {useState, type ReactNode} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {getStorybookIframeUrl} from '@site/src/components/storybookUrls';

type IconButtonStyle = 'filled' | 'ghost' | 'link';
type IconButtonVariant = 'square' | 'circle';
type IconButtonType = 'primary' | 'secondary' | 'tertiary';

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

function IconButtonVariantExplorer(): React.ReactElement {
  const [style, setStyle] = useState<IconButtonStyle>('filled');
  const [variant, setVariant] = useState<IconButtonVariant>('square');
  const [type, setType] = useState<IconButtonType>('primary');
  const {colorMode} = useColorMode();
  const styleOptions: Array<{label: string; value: IconButtonStyle}> = [
    {label: 'Filled', value: 'filled'},
    {label: 'Ghost', value: 'ghost'},
  ];
  const variantOptions: Array<{label: string; value: IconButtonVariant}> = [
    {label: 'Square', value: 'square'},
    {label: 'Circle', value: 'circle'},
  ];
  const typeOptions: Array<{label: string; value: IconButtonType}> = [
    {label: 'Primary', value: 'primary'},
    {label: 'Secondary', value: 'secondary'},
    {label: 'Tertiary', value: 'tertiary'},
  ];
  const storybookArgs = [
    `buttonStyle:${variant}`,
    `variant:${style === 'ghost' ? 'secondary' : type}`,
    'size:lg',
    'disabled:false',
  ].join(';');
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const storybookIconButtonSrc = getStorybookIframeUrl({
    storyId: 'components-button-iconbutton--default',
    args: storybookArgs,
    theme: storybookTheme,
    embed: 'component',
  });

  return (
    <div className="button-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <iframe
          title="Icon button Storybook preview"
          src={storybookIconButtonSrc}
          className="button-variant-explorer__iframe"
          loading="lazy"
        />
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Style</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Icon button style">
            {styleOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="icon-button-style"
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
          <span>Variant</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Icon button variant">
            {variantOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="icon-button-variant"
                  checked={variant === item.value}
                  onChange={() => setVariant(item.value)}
                />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="button-control-group">
          <span>Type</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Icon button type">
            {typeOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="icon-button-type"
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

export default function IconButtonGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Button"
        title="Icon button"
        description="텍스트 라벨 없이 아이콘으로 구성된 버튼으로, 클릭을 통해 즉각적인 트리거 또는 액션을 실행합니다. 공간이 제한적이거나 사용자가 즉시 이해할 수 있는 작업에 제한적으로 사용합니다."
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy icon-button-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <img src="/img/components/icon-button-anatomy.svg" alt="Icon Button anatomy" className="button-guide-artwork-img" />
                  </div>
                  <div className="button-anatomy__legend">
                    <span className="button-anatomy__legend-item"><b>1</b> Icon</span>
                    <span className="button-anatomy__legend-item"><b>2</b> Fill</span>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <IconButtonVariantExplorer />
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork button-size-row icon-button-size-row">
                  <img src="/img/components/icon-button-size.svg" alt="Icon Button size" className="button-guide-artwork-img" />
                </div>
              </SectionBlock>

              <SectionBlock title="State">
                <div className="button-state-table icon-button-state-table">
                  <img src="/img/components/icon-button-state.svg" alt="Icon Button state" className="button-guide-artwork-img" />
                </div>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="간단하고 직관적인 기능에 한해 아이콘 버튼을 사용합니다.">
                    <img src="/img/components/icon-button-do-01.svg" alt="직관적인 Icon Button 사용 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="텍스트 없이 의미 전달이 어려운 액션을 아이콘 버튼으로 대체하지 않습니다.">
                    <img src="/img/components/icon-button-dont-01.svg" alt="의미 전달이 어려운 Icon Button 사용 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="do" title="Square 타입을 기본으로 사용합니다.">
                    <img src="/img/components/icon-button-do-02.svg" alt="Square Icon Button 사용 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="동일 기능 그룹 내에서 하나의 스타일을 유지하지 않고 다른 형태를 혼합하지 않습니다.">
                    <img src="/img/components/icon-button-dont-02.svg" alt="Icon Button 형태 혼합 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="do" title="간단하고 직관적인 기능에 한해 아이콘 버튼을 사용하며, 복합적인 의미 전달이 필요한 액션은 텍스트 버튼을 함께 사용합니다.">
                    <img src="/img/components/icon-button-do-03.svg" alt="Icon Button과 텍스트 버튼 사용 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="텍스트 없이 의미 전달이 가능한지 검증되지 않은 아이콘만 단독으로 사용하지 않습니다.">
                    <img src="/img/components/icon-button-dont-03.svg" alt="검증되지 않은 Icon Button 단독 사용 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Button/IconButton"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
