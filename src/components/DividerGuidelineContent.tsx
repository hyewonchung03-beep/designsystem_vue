import React, {useState} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {getStorybookIframeUrl} from '@site/src/components/storybookUrls';

type Orientation = 'horizontal' | 'vertical';
type Padding = 0 | 12 | 24;
type Tone = 'grey150' | 'grey100';

function DividerUsagePanel({detached = false, tree = false, transparent = false}: {detached?: boolean; tree?: boolean; transparent?: boolean}): React.ReactElement {
  if (tree) {
    return (
      <div className={`divider-tree-panel${detached ? ' divider-tree-panel--detached' : ''}`}>
        <strong>Panel Heading</strong>
        <span>All NN</span>
        <span>Region</span>
        <span>Seoul</span>
        <b>Gangnam store</b>
        <span>Device 01</span>
        <span>Device 02</span>
        <span>Busan</span>
      </div>
    );
  }

  return (
    <div className={`divider-usage-panel${detached ? ' divider-usage-panel--detached' : ''}${transparent ? ' divider-usage-panel--transparent' : ''}`}>
      <div className="divider-usage-panel__media" />
      <div className="divider-usage-panel__content">
        <span>Content</span>
        <span>Content</span>
        <span>Content</span>
        <span>Content</span>
      </div>
    </div>
  );
}

export default function DividerGuidelineContent(): React.ReactElement {
  const [orientation, setOrientation] = useState<Orientation>('horizontal');
  const [padding, setPadding] = useState<Padding>(0);
  const [tone, setTone] = useState<Tone>('grey150');
  const {colorMode} = useColorMode();
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const dividerStoryId = orientation === 'vertical'
    ? tone === 'grey100'
      ? 'components-divider--vertical-default'
      : 'components-divider--vertical-g-150'
    : padding === 12
      ? 'components-divider--horizontal-spacing-12'
      : padding === 24
        ? 'components-divider--horizontal-spacing-24'
        : tone === 'grey100'
          ? 'components-divider--horizontal-default'
          : 'components-divider--horizontal-g-150';
  const storybookDividerSrc = getStorybookIframeUrl({
    storyId: dividerStoryId,
    theme: storybookTheme,
    embed: 'component',
  });

  return (
    <ComponentGuideLayout
        category="Divider"
        title="Divider"
        description="Divider는 화면 안에서 관련성이 다른 콘텐츠, 섹션, 항목을 시각적으로 구분하기 위해 사용하는 컴포넌트입니다. 사용자가 정보의 경계를 빠르게 이해하고, 콘텐츠 흐름을 더 쉽게 따라갈 수 있도록 돕습니다."
        className="divider-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy divider-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <span className="divider-anatomy__horizontal" />
                    <span className="divider-anatomy__vertical" />
                    <span className="guide-marker guide-marker--1">1</span>
                    <span className="guide-marker guide-marker--2">2</span>
                  </div>
                  <div className="button-anatomy__legend">
                    <span className="button-anatomy__legend-item"><b>1</b> Horizontal divider</span>
                    <span className="button-anatomy__legend-item"><b>2</b> Vertical divider</span>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer divider-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <iframe
                      title="Divider Storybook preview"
                      src={storybookDividerSrc}
                      className="button-variant-explorer__iframe"
                      loading="lazy"
                    />
                  </div>
                  <div className="button-variant-explorer__panel">
                    <div className="button-control-group">
                      <span>Orientation</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Divider orientation">
                        {(['vertical', 'horizontal'] as Orientation[]).map((item) => (
                          <label key={item} className="button-radio-option">
                            <input type="radio" name="divider-orientation" checked={orientation === item} onChange={() => setOrientation(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item === 'vertical' ? 'Vertical' : 'Horizontal'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="button-control-group">
                      <span>Padding</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Divider padding">
                        {([0, 12, 24] as Padding[]).map((item) => (
                          <label key={item} className="button-radio-option">
                            <input type="radio" name="divider-padding" checked={padding === item} onChange={() => setPadding(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item}px</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="button-control-group">
                      <span>Color</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Divider color">
                        {(['grey150', 'grey100'] as Tone[]).map((item) => (
                          <label key={item} className="button-radio-option">
                            <input type="radio" name="divider-tone" checked={tone === item} onChange={() => setTone(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item === 'grey150' ? 'Grey 150' : 'Grey 100'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork divider-size-artwork">
                  <span className="divider-size-artwork__vertical" />
                  <span className="divider-size-artwork__horizontal" />
                  <span className="size-callout size-callout--divider-thickness">1</span>
                  <span className="size-callout size-callout--divider-pad-sm">12</span>
                  <span className="size-callout size-callout--divider-pad-lg">24</span>
                </div>
                <p className="component-section-copy">기본 두께는 1px 사용을 권장하며, 사용 맥락에 따라 padding 값을 조정합니다. Padding은 콘텐츠 간 분리 강도를 조절하기 위한 값으로 사용합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="Divider는 구분하려는 콘텐츠 사이에 배치하고, 항목 간 관계와 흐름을 이해할 수 있도록 사용합니다.">
                    <DividerUsagePanel />
                  </DoDontCard>
                  <DoDontCard type="dont" title="구분 대상과 직접 연결되지 않은 위치에 Divider를 배치하지 않습니다. 사용자가 어떤 항목을 나누는지 이해하기 어렵습니다.">
                    <DividerUsagePanel detached />
                  </DoDontCard>
                  <DoDontCard type="do" title="콘텐츠 간의 위계와 관계를 유지하면서 필요한 곳에만 Divider를 사용합니다.">
                    <DividerUsagePanel tree />
                  </DoDontCard>
                  <DoDontCard type="dont" title="단순히 화면이 비어 보인다는 이유로 Divider를 장식처럼 사용하지 않습니다.">
                    <DividerUsagePanel tree detached />
                  </DoDontCard>
                  <DoDontCard type="do" title="Divider가 다른 구분선과 겹쳐 보이는 컴포넌트에서는 Solid 타입을 사용합니다.">
                    <DividerUsagePanel />
                  </DoDontCard>
                  <DoDontCard type="dont" title="Divider가 다른 구분선과 겹쳐 보이는 컴포넌트에 Transparent 타입을 사용하지 않습니다.">
                    <DividerUsagePanel transparent />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={['Components/Divider']} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
