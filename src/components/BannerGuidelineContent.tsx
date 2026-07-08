import React, {useState} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {BannerDemo, SectionMessageDemo} from '@site/src/components/FeedbackComponentExamples';
import {getStorybookIframeUrl} from '@site/src/components/storybookUrls';

type BannerType = 'error' | 'warning' | 'announcement' | 'brand';

function Legend({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-anatomy__legend">
      {items.map((item, index) => (
        <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
      ))}
    </div>
  );
}

function BrowserMock({children}: {children: React.ReactNode}): React.ReactElement {
  return (
    <div className="feedback-browser-mock feedback-browser-mock--banner">
      <div className="feedback-browser-mock__chrome" />
      <div className="feedback-browser-mock__body">
        {children}
        <div className="feedback-browser-mock__rail" />
        <div className="feedback-browser-mock__content">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export default function BannerGuidelineContent(): React.ReactElement {
  const [type, setType] = useState<BannerType>('error');
  const [link, setLink] = useState(true);
  const {colorMode} = useColorMode();
  const typeOptions: Array<{label: string; value: BannerType}> = [
    {label: 'Error', value: 'error'},
    {label: 'Warning', value: 'warning'},
    {label: 'Announcement', value: 'announcement'},
    {label: 'Brand', value: 'brand'},
  ];
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const storybookArgs = [
    `color:${type}`,
    `heading:${type === 'announcement' ? 'Service maintenance is scheduled for tonight.' : 'We are unable to save changes right now.'}`,
    `showIcon:${type !== 'announcement'}`,
    `showAction:${link}`,
    'showClose:true',
  ].join(';');
  const storybookBannerSrc = getStorybookIframeUrl({
    storyId: 'components-feedback-banner--error',
    args: storybookArgs,
    theme: storybookTheme,
    embed: 'component',
  });

  return (
    <ComponentGuideLayout
        category="Feedback"
        title="Banner"
        description="페이지 상단에서 사용자에게 주요 서비스 공지, 접근 제한, 정책 변경, 장애 안내와 같은 중요한 정보를 전달할 때 사용하는 메시지 컴포넌트입니다."
        className="feedback-guide-page banner-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy feedback-anatomy banner-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="feedback-anatomy__stage">
                      <BannerDemo tone="error" text="We are unable to save changes right now." action="Button" />
                      <span className="guide-marker guide-marker--1">1</span>
                      <span className="guide-marker guide-marker--2">2</span>
                      <span className="guide-marker guide-marker--3">3</span>
                      <span className="guide-marker guide-marker--4">4</span>
                    </div>
                  </div>
                  <Legend items={['Status icon', 'Text message', 'Link button', 'Close icon']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer feedback-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <iframe
                      title="Banner Storybook preview"
                      src={storybookBannerSrc}
                      className="button-variant-explorer__iframe"
                      loading="lazy"
                    />
                  </div>
                  <div className="button-variant-explorer__panel">
                    <div className="button-control-group">
                      <span>Type</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Banner type">
                        {typeOptions.map((item) => (
                          <label className="button-radio-option" key={item.value}>
                            <input type="radio" name="banner-type" checked={type === item.value} onChange={() => setType(item.value)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="button-control-group">
                      <span>Link button</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Banner link button">
                        {[true, false].map((item) => (
                          <label className="button-radio-option" key={String(item)}>
                            <input type="radio" name="banner-link" checked={link === item} onChange={() => setLink(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item ? 'True' : 'False'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="component-section-copy">서비스 전역에 영향을 주는 메시지에 사용합니다. 사용자에게 중요한 상태를 페이지 상단에서 즉시 전달하고, 상세 설명이 필요한 경우 link button을 통해 별도 페이지나 추가 정보로 연결합니다.</p>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork feedback-size-artwork banner-size-artwork">
                  <BannerDemo tone="error" text="We are unable to save changes right now." action="Button" />
                  <span className="size-callout size-callout--banner">36</span>
                </div>
                <p className="component-section-copy">Banner는 페이지 또는 콘텐츠 영역의 전체 너비를 기준으로 표시합니다. 한 줄 메시지를 기본으로 사용하고, 긴 문장은 피하며 필요한 경우 link button으로 상세 내용을 분리합니다.</p>
              </SectionBlock>

              <SectionBlock title="Placement">
                <div className="button-guide-artwork feedback-placement-artwork">
                  <BrowserMock>
                    <BannerDemo tone="announcement" text="Service maintenance is scheduled for tonight." action="Learn More" />
                  </BrowserMock>
                </div>
                <p className="component-section-copy">Banner는 페이지 최상단 또는 주요 레이아웃 상단에 배치합니다. 사용자가 페이지에 진입했을 때 즉시 인지할 수 있는 위치에 두고, 페이지 내부 특정 영역의 안내에는 Section Message를 사용합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="페이지 전체 또는 주요 작업 흐름에 영향을 주는 메시지에 Banner를 사용합니다.">
                    <BrowserMock><BannerDemo tone="announcement" text="Service maintenance is scheduled for tonight." /></BrowserMock>
                  </DoDontCard>
                  <DoDontCard type="dont" title="특정 카드, 테이블, 폼 영역에만 해당하는 메시지에 Banner를 사용하지 않습니다. 이 경우 Section Message를 사용합니다.">
                    <BrowserMock><SectionMessageDemo title="Unable to load data" /></BrowserMock>
                  </DoDontCard>
                  <DoDontCard type="do" title="핵심 상태와 필요한 행동을 짧은 문장으로 전달합니다.">
                    <BannerDemo tone="announcement" text="Service maintenance is scheduled for tonight." action="Learn More" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="정책 설명, 기술적 원인, 여러 개의 문제를 하나의 Banner에 모두 넣지 않습니다.">
                    <BannerDemo tone="announcement" text="Your changes could not be saved because the server request timed out, your session may have expired, and permission settings may not be configured correctly." action="Request Access" />
                  </DoDontCard>
                  <DoDontCard type="do" title="메시지의 심각도와 사용자 대응 행동에 맞는 type을 사용합니다.">
                    <BannerDemo tone="warning" text="Service maintenance is scheduled for tonight." action="Learn More" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="상태와 맞지 않는 색상이나 아이콘을 혼용해서 사용하지 않습니다.">
                    <BannerDemo tone="error" text="Service maintenance is scheduled for tonight." action="Learn More" />
                  </DoDontCard>
                  <DoDontCard type="do" title="Banner의 행동이 필요한 경우 H1 Text Link와 연결해 제공합니다.">
                    <BannerDemo tone="brand" text="You do not have permission to edit this page." action="Request Access" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="하나의 banner 안에 여러 개의 액션을 넣어 사용자의 판단을 어렵게 만들지 않습니다.">
                    <BannerDemo tone="brand" text="You do not have permission to edit this page." action="Request Access Contact Admin" />
                  </DoDontCard>
                  <DoDontCard type="do" title="사용자가 메시지를 닫아도 되는 경우에만 Close icon을 제공합니다.">
                    <BannerDemo tone="announcement" text="A new update is available." action="Learn More" dismissible />
                  </DoDontCard>
                  <DoDontCard type="dont" title="반드시 확인해야 하는 Error 또는 Warning 메시지에 닫기 버튼을 제공하지 않습니다.">
                    <BannerDemo tone="error" text="We are unable to save changes right now." action="Learn More" dismissible />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Feedback/Banner"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
