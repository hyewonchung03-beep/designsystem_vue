import React, {useState, type ReactNode} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {getStorybookIframeUrl} from '@site/src/components/storybookUrls';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonIcon = 'none' | 'leading' | 'trailing' | 'both';
type ButtonState = 'enabled' | 'hover' | 'focused' | 'pressed' | 'disabled';
type VariantStyle = 'filled' | 'ghost' | 'link';
type VariantType = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'inverse';
type VariantIcon = 'left' | 'right' | 'none';

function ArrowIcon({dir = 'right'}: {dir?: 'left' | 'right'}): React.ReactElement {
  return (
    <span className={`button-doc-icon button-doc-icon--${dir}`} aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ButtonDemo({
  variant = 'primary',
  size = 'md',
  icon = 'none',
  state = 'enabled',
  children = 'Label',
  dir = 'ltr',
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ButtonIcon;
  state?: ButtonState;
  children?: ReactNode;
  dir?: 'ltr' | 'rtl';
}): React.ReactElement {
  return (
    <button
      type="button"
      className={`button-doc-demo button-doc-demo--${variant} button-doc-demo--${size} button-doc-demo--${state}`}
      disabled={state === 'disabled'}
      dir={dir}
    >
      {(icon === 'leading' || icon === 'both') && <ArrowIcon dir={dir === 'rtl' ? 'right' : 'left'} />}
      <span>{children}</span>
      {(icon === 'trailing' || icon === 'both') && <ArrowIcon dir={dir === 'rtl' ? 'left' : 'right'} />}
    </button>
  );
}

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

function VariantExplorer(): React.ReactElement {
  const [style, setStyle] = useState<VariantStyle>('filled');
  const [type, setType] = useState<VariantType>('primary');
  const [icon, setIcon] = useState<VariantIcon>('left');
  const {colorMode} = useColorMode();
  const styleOptions: Array<{label: string; value: VariantStyle}> = [
    {label: 'Filled', value: 'filled'},
    {label: 'Ghost', value: 'ghost'},
    {label: 'Link', value: 'link'},
  ];
  const typeOptions: Array<{label: string; value: VariantType}> = [
    {label: 'Primary', value: 'primary'},
    {label: 'Secondary', value: 'secondary'},
    {label: 'Tertiary', value: 'tertiary'},
    {label: 'Danger', value: 'danger'},
    {label: 'Inverse', value: 'inverse'},
  ];
  const iconOptions: Array<{label: string; value: VariantIcon}> = [
    {label: 'Left', value: 'left'},
    {label: 'Right', value: 'right'},
    {label: 'None', value: 'none'},
  ];
  const buttonType = type === 'inverse' ? 'white' : type === 'danger' ? 'primary' : type;
  const buttonStyle = type === 'danger' ? 'danger' : style === 'filled' ? 'solid' : style;
  const storybookArgs = [
    `type:${buttonType}`,
    `styleType:${buttonStyle}`,
    'size:lg',
    'state:enabled',
    'label:Button',
    'showLabel:true',
    `showLeftIcon:${icon === 'left'}`,
    `showRightIcon:${icon === 'right'}`,
    'showLoading:false',
  ].join(';');
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const storybookButtonSrc = getStorybookIframeUrl({
    storyId: 'components-button-button--primary-solid',
    args: storybookArgs,
    theme: storybookTheme,
    embed: 'component',
  });

  return (
    <div className="button-variant-explorer">
      <div className={`button-guide-artwork button-variant-explorer__preview${type === 'inverse' ? ' button-variant-explorer__preview--inverse' : ''}`}>
        <iframe
          title="Button Storybook preview"
          src={storybookButtonSrc}
          className="button-variant-explorer__iframe"
          loading="lazy"
        />
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Style</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Button style">
            {styleOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="button-style"
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
          <div className="button-radio-list" role="radiogroup" aria-label="Button type">
            {typeOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="button-type"
                  checked={type === item.value}
                  onChange={() => setType(item.value)}
                />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="button-control-group">
          <span>Icon</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Button icon">
            {iconOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="button-icon"
                  checked={icon === item.value}
                  onChange={() => setIcon(item.value)}
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

export default function ButtonGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Button"
        title="Button"
        description="버튼은 사용자가 명확한 액션을 실행할 수 있도록 돕는 컴포넌트입니다. 액션의 중요도, 맥락, 상태에 맞춰 일관된 버튼 패턴을 사용합니다."
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <img src="/img/components/button-anatomy.svg" alt="Button anatomy" className="button-guide-artwork-img" />
                  </div>
                  <div className="button-anatomy__legend">
                    <span className="button-anatomy__legend-item"><b>1</b> Left Icon</span>
                    <span className="button-anatomy__legend-item"><b>2</b> Label</span>
                    <span className="button-anatomy__legend-item"><b>3</b> Right Icon</span>
                    <span className="button-anatomy__legend-item"><b>4</b> Container</span>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <VariantExplorer />
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork button-size-row">
                  <div className="button-size-measurement button-size-measurement--sm">
                    <ButtonDemo size="sm">Small</ButtonDemo>
                    <span className="button-size-measurement__line" aria-hidden="true" />
                    <span className="button-size-measurement__value">32</span>
                  </div>
                  <div className="button-size-measurement button-size-measurement--md">
                    <ButtonDemo size="md">Medium</ButtonDemo>
                    <span className="button-size-measurement__line" aria-hidden="true" />
                    <span className="button-size-measurement__value">36</span>
                  </div>
                  <div className="button-size-measurement button-size-measurement--lg">
                    <ButtonDemo size="lg">Large</ButtonDemo>
                    <span className="button-size-measurement__line" aria-hidden="true" />
                    <span className="button-size-measurement__value">46</span>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="State">
                <div className="button-state-table">
                  <img src="/img/components/button-state.svg" alt="Button state" className="button-guide-artwork-img" />
                </div>
              </SectionBlock>

              <SectionBlock title="Action Priority">
                <div className="button-priority-grid">
                  <img src="/img/components/button-action.svg" alt="Button action priority" className="button-guide-artwork-img" />
                </div>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="아이콘은 선택적으로 텍스트 보조하는 용도로만 사용합니다.">
                    <img src="/img/components/button-do-01.svg" alt="텍스트를 보조하는 아이콘 사용 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="버튼 중앙에 아이콘과 텍스트를 세로로 정렬하지 않습니다.">
                    <img src="/img/components/button-dont-01.svg" alt="아이콘과 텍스트 세로 정렬 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="do" title="Chevron 아이콘은 우측에, 이해를 돕는 보조용 꾸밈 아이콘은 좌측에 배치합니다.">
                    <img src="/img/components/button-do-02.svg" alt="Chevron 아이콘 우측, 보조 아이콘 좌측 배치 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="아이콘 양쪽 사용은 권장하지 않습니다.">
                    <img src="/img/components/button-dont-02.svg" alt="아이콘 양쪽 사용 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="do" title="페이지 전체에 영향을 끼치는 CTA는 ‘Primary’ 버튼 컬러를 사용합니다. 보조 액션은 ‘Secondary’ 버튼 컬러를 사용해 시각적으로 구분합니다.">
                    <img src="/img/components/button-do-03.svg" alt="Primary CTA와 Secondary 보조 액션 구분 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="주요 액션이 2개 이상이면 사용자가 혼란을 느낄 수 있으므로, ‘Primary’ 버튼을 여러개 사용하지 않습니다.">
                    <img src="/img/components/button-dont-03.svg" alt="Primary 버튼 중복 사용 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="do" title="페이지 전체에 영향을 끼치는 CTA는 ‘Primary’ 버튼 컬러를 사용합니다. 보조 액션은 ‘Secondary’ 버튼 컬러를 사용해 시각적으로 구분합니다.">
                    <img src="/img/components/button-do-04.svg" alt="위험 액션 버튼 사용 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="Retry, Cancel, Stop 등 복구 가능한 행동이나 영향도가 낮은 액션인 경우 사용하지 않습니다. (‘Primary’ 버튼 컬러를 사용합니다.)">
                    <img src="/img/components/button-dont-04.svg" alt="복구 가능한 액션에 위험 버튼 사용 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Button/Button"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
