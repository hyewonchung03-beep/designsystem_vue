import React, {useState, type ReactNode} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {getStorybookIframeUrl} from '@site/src/components/storybookUrls';

type ToggleKey = 'image' | 'badge' | 'metadata' | 'description';
type Orientation = 'vertical' | 'horizontal';

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
            <path fillRule="evenodd" clipRule="evenodd" d="M11.9998 4.25C7.71955 4.25 4.24976 7.71979 4.24976 12C4.24976 16.2802 7.71955 19.75 11.9998 19.75C16.28 19.75 19.7498 16.2802 19.7498 12C19.7498 7.71979 16.28 4.25 11.9998 4.25ZM2.74976 12C2.74976 6.89137 6.89112 2.75 11.9998 2.75C17.1084 2.75 21.2498 6.89137 21.2498 12C21.2498 17.1086 17.1084 21.25 11.9998 21.25C6.89112 21.25 2.74976 17.1086 2.74976 12ZM16.3551 9.98033L11.2551 15.0803C10.9622 15.3732 10.4873 15.3732 10.1944 15.0803L7.64443 12.5303L8.70509 11.4697L10.7248 13.4893L15.2944 8.91967L16.3551 9.98033Z" />
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
  const [orientation, setOrientation] = useState<Orientation>('vertical');
  const [enabled, setEnabled] = useState<Record<ToggleKey, boolean>>({
    image: true,
    badge: true,
    metadata: true,
    description: true,
  });
  const options: Array<{label: string; key: ToggleKey}> = [
    {label: 'Thumbnail', key: 'image'},
    {label: 'Badge', key: 'badge'},
    {label: 'Metadata', key: 'metadata'},
    {label: 'Description', key: 'description'},
  ];
  const orientationOptions: Array<{label: string; value: Orientation}> = [
    {label: 'Vertical', value: 'vertical'},
    {label: 'Horizontal', value: 'horizontal'},
  ];
  const {colorMode} = useColorMode();
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const cardStoryId = !enabled.badge && !enabled.metadata && !enabled.description
    ? 'components-card--title-only'
    : !enabled.badge
      ? 'components-card--without-thumbnail'
      : !enabled.metadata
        ? 'components-card--without-meta'
        : orientation === 'horizontal'
          ? 'components-card--horizontal-md'
          : 'components-card--vertical-md';
  const storybookArgs = [
    'title:Title',
    `description:${enabled.description ? 'Lorem ipsum dolor sit amet consectetur. Eu elementum blandit posuere ac.' : ''}`,
    `badgeLabel:${enabled.badge ? 'NEW' : ''}`,
    `showDragHandle:${enabled.metadata}`,
  ].join(';');
  const storybookCardSrc = getStorybookIframeUrl({
    storyId: cardStoryId,
    args: storybookArgs,
    theme: storybookTheme,
    embed: 'component',
  });

  return (
    <div className="button-variant-explorer card-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <iframe
          title="Card Storybook preview"
          src={storybookCardSrc}
          className="button-variant-explorer__iframe"
          loading="lazy"
        />
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Orientation</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Card orientation">
            {orientationOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="card-orientation"
                  checked={orientation === item.value}
                  onChange={() => setOrientation(item.value)}
                />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
        {options.map((item) => (
          <div className="button-control-group" key={item.key}>
            <span>{item.label}</span>
            <div className="button-radio-list" role="radiogroup" aria-label={`${item.label} visibility`}>
              {[true, false].map((value) => (
                <label key={String(value)} className="button-radio-option">
                  <input
                    type="radio"
                    name={`card-${item.key}`}
                    checked={enabled[item.key] === value}
                    onChange={() => setEnabled((current) => ({...current, [item.key]: value}))}
                  />
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

export default function CardGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Card"
        title="Card"
        description="카드는 이미지, 제목, 설명 등 관련 정보를 하나의 컨테이너 안에 묶어 사용자에게 구조화된 정보를 제공하는 컴포넌트입니다."
        className="card-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy card-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <img src="/img/components/card-anatomy.svg" alt="Card anatomy" className="button-guide-artwork-img" />
                  </div>
                  <div className="button-anatomy__legend">
                    <span className="button-anatomy__legend-item"><b>1</b> Image</span>
                    <span className="button-anatomy__legend-item"><b>2</b> Badge</span>
                    <span className="button-anatomy__legend-item"><b>3</b> Title</span>
                    <span className="button-anatomy__legend-item"><b>4</b> Description</span>
                    <span className="button-anatomy__legend-item"><b>5</b> Supporting text</span>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <VariantExplorer />
                <div className="card-section-copy card-section-copy--after-preview">Card는 콘텐츠의 복잡도에 따라 이미지, 배지, 메타데이터, 설명 텍스트를 선택적으로 조합할 수 있습니다. 필요한 정보만 노출하여 카드 간 정보 밀도와 시각적 균형을 유지합니다.</div>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork button-size-row">
                  <img src="/img/components/card-size.svg" alt="Card size" className="button-guide-artwork-img" />
                </div>
                <div className="card-section-copy card-section-copy--after-preview">Card는 사용되는 영역과 정보 밀도에 따라 크기를 조정할 수 있습니다. 리스트, 그리드, 요약 정보 영역 등 사용 맥락에 맞는 크기를 선택합니다.<br />Thumbnail 이미지는 Vertical card - ‘16:9’ / Horizontal card - ‘1:1’ 비율을 주로 사용합니다.</div>
              </SectionBlock>

              <SectionBlock title="State">
                <div className="button-guide-artwork button-size-row">
                  <img src="/img/components/card-state.svg" alt="Card state" className="button-guide-artwork-img" />
                </div>
              </SectionBlock>

              <SectionBlock title="Usage Guidelines" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid card-usage-guideline-grid">
                  <DoDontCard type="do" title="카드에는 핵심 정보만 포함하여 빠르게 내용을 파악할 수 있도록 합니다.">
                    <img src="/img/components/card-do-01.svg" alt="핵심 정보만 포함한 Card 사용 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="하나의 카드 안에 너무 많은 정보를 넣어 가독성을 떨어뜨리지 않습니다.">
                    <img src="/img/components/card-dont-01.svg" alt="과도한 정보를 포함한 Card 사용 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="do" title="같은 목록 안에서는 카드의 정보 구조와 정렬 방식을 일관되게 유지합니다.">
                    <img src="/img/components/card-do-02.svg" alt="일관된 Card 정보 구조 사용 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="동일한 카드 그룹 안에서 이미지, 제목, 설명의 위치를 임의로 다르게 배치하지 않습니다.">
                    <img src="/img/components/card-dont-02.svg" alt="일관되지 않은 Card 정보 구조 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="do" title="카드가 클릭 가능한 경우 hover, focused 상태를 명확하게 제공합니다.">
                    <img src="/img/components/card-do-03.svg" alt="클릭 가능한 Card 상태 표현 권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="클릭 가능한 카드와 단순 정보 카드가 시각적으로 구분되지 않게 만들지 않습니다.">
                    <img src="/img/components/card-dont-03.svg" alt="클릭 가능한 Card 구분 부족 비권장 예시" className="button-guide-artwork-img" />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Card"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
