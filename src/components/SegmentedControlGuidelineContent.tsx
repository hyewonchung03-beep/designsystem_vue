import React, {useState, type ReactNode} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {getStorybookIframeUrl} from '@site/src/components/storybookUrls';

type SegmentedControlVariant = 'solid' | 'outline';

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
            <path d="M19.7498 12C19.7498 7.71979 16.28 4.25 11.9998 4.25C7.71955 4.25 4.24976 7.71979 4.24976 12C4.24976 16.2802 7.71955 19.75 11.9998 19.75C16.28 19.75 19.7498 16.2802 19.7498 12ZM21.2498 12C21.2498 17.1086 17.1084 21.25 11.9998 21.25C6.89112 21.25 2.74976 17.1086 2.74976 12C2.74976 6.89137 6.89112 2.75 11.9998 2.75C17.1084 2.75 21.2498 12Z" />
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

function SegmentedVariantExplorer(): React.ReactElement {
  const [variant, setVariant] = useState<SegmentedControlVariant>('solid');
  const {colorMode} = useColorMode();
  const options: Array<{label: string; value: SegmentedControlVariant; description: string}> = [
    {label: 'Solid', value: 'solid', description: '선택된 segment가 채워진 배경으로 강조되는 기본 스타일입니다.'},
    {label: 'Outline', value: 'outline', description: '선택된 segment가 외곽선 또는 강조 border로 표시되는 스타일입니다.'},
  ];
  const storybookArgs = [`type:${variant === 'solid' ? 'solid' : 'outlined'}`].join(';');
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const storybookSegmentedButtonSrc = getStorybookIframeUrl({
    storyId: 'components-button-segmentedcontrol--default',
    args: storybookArgs,
    theme: storybookTheme,
    embed: 'component',
  });

  return (
    <div className="button-variant-explorer segmented-control-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <iframe
          title="Segmented button Storybook preview"
          src={storybookSegmentedButtonSrc}
          className="button-variant-explorer__iframe"
          loading="lazy"
        />
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Style</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Segmented control style">
            {options.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="segmented-control-style"
                  checked={variant === item.value}
                  onChange={() => setVariant(item.value)}
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

function MiniChart(): React.ReactElement {
  return (
    <div className="segmented-control-chart" aria-hidden="true">
      <span>40K</span>
      <svg viewBox="0 0 220 70" fill="none">
        <path d="M10 48L48 34L86 50L124 50L162 44L200 58L212 55" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span>600</span>
    </div>
  );
}

export default function SegmentedControlGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Button"
        title="Segmented control"
        description="세그먼트 컨트롤은 2개 이상의 관련 옵션 중 하나를 즉시 전환해 콘텐츠나 뷰를 변경하는 버튼 그룹입니다."
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy segmented-control-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <img src="/img/components/segmented-control-anatomy.svg" alt="Segmented Control anatomy" className="button-guide-artwork-img" />
                  </div>
                  <div className="button-anatomy__legend">
                    <span className="button-anatomy__legend-item"><b>1</b> Label</span>
                    <span className="button-anatomy__legend-item"><b>2</b> Segment</span>
                    <span className="button-anatomy__legend-item"><b>3</b> Container</span>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <SegmentedVariantExplorer />
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork button-size-row segmented-control-size-row">
                  <img src="/img/components/segmented-control-size.svg" alt="Segmented Control size" className="button-guide-artwork-img" />
                </div>
              </SectionBlock>

              <SectionBlock title="State">
                <div className="button-guide-artwork segmented-control-state-artwork">
                  <img src="/img/components/segmented-control-state.svg" alt="Segmented Control state" className="button-guide-artwork-img" />
                </div>
              </SectionBlock>

              <SectionBlock title="Usage Guidelines" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="최소 2개, 최대 5개의 segment를 사용합니다.">
                    <img src="/img/components/segmented-control-do-01.svg" alt="2개에서 5개의 Segment 사용 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="6개 이상의 segment를 사용하지 않습니다.">
                    <img src="/img/components/segmented-control-dont-01.svg" alt="6개 이상 Segment 사용 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="do" title="하나의 segment만 선택될 수 있도록 사용합니다.">
                    <img src="/img/components/segmented-control-do-02.svg" alt="단일 Segment 선택 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="여러 segment를 동시에 선택하지 않습니다.">
                    <img src="/img/components/segmented-control-dont-02.svg" alt="복수 Segment 선택 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="do" title="하나의 콘텐츠 영역이나 뷰를 전환할 때 사용합니다.">
                    <img src="/img/components/segmented-control-do-03.svg" alt="콘텐츠 영역 전환에 Segmented Control 사용 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="동일 영역에 여러 개의 Segmented control을 중첩해서 사용하지 않습니다.">
                    <img src="/img/components/segmented-control-dont-03.svg" alt="Segmented Control 중첩 사용 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Button/SegmentedControl","Components/Button/SegmentedControl Solid"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
