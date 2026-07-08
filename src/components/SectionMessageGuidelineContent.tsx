import React, {useState} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {SectionMessageDemo, ToastDemo} from '@site/src/components/FeedbackComponentExamples';
import {getStorybookIframeUrl} from '@site/src/components/storybookUrls';

type MessageType = 'error' | 'warning' | 'info' | 'success';

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
    <div className="feedback-browser-mock">
      <div className="feedback-browser-mock__chrome" />
      <div className="feedback-browser-mock__body">
        <div className="feedback-browser-mock__rail" />
        <div className="feedback-browser-mock__content">
          <span />
          <span />
          <span />
          <span />
        </div>
        {children}
      </div>
    </div>
  );
}

export default function SectionMessageGuidelineContent(): React.ReactElement {
  const [type, setType] = useState<MessageType>('error');
  const [solid, setSolid] = useState(false);
  const [link, setLink] = useState(true);
  const [dismiss, setDismiss] = useState(true);
  const {colorMode} = useColorMode();
  const typeOptions: Array<{label: string; value: MessageType}> = [
    {label: 'Error', value: 'error'},
    {label: 'Warning', value: 'warning'},
    {label: 'Info', value: 'info'},
    {label: 'Success', value: 'success'},
  ];
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const storybookArgs = [
    `status:${type}`,
    'heading:Heading',
    `linkLabel:${solid ? 'Button' : 'Link'}`,
    `showLink:${link}`,
    `showClose:${dismiss}`,
  ].join(';');
  const storybookSectionMessageSrc = getStorybookIframeUrl({
    storyId: 'components-feedback-sectionmessage--neutral',
    args: storybookArgs,
    theme: storybookTheme,
    embed: 'component',
  });

  return (
    <ComponentGuideLayout
        category="Feedback"
        title="Section message"
        description="특정 영역 안에서 사용자에게 중요한 상태나 안내를 전달하는 메시지로, 사용자가 해당 영역의 맥락을 이해하고 필요한 행동을 할 수 있도록 돕는 컴포넌트입니다."
        className="feedback-guide-page section-message-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy feedback-anatomy section-message-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="feedback-anatomy__stage">
                      <SectionMessageDemo title="Heading" description="Description" action="Link" />
                      <span className="guide-marker guide-marker--1">1</span>
                      <span className="guide-marker guide-marker--2">2</span>
                      <span className="guide-marker guide-marker--3">3</span>
                      <span className="guide-marker guide-marker--4">4</span>
                      <span className="guide-marker guide-marker--5">5</span>
                    </div>
                  </div>
                  <Legend items={['Status icon', 'Header', 'Description', 'Link button', 'Dismiss icon']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer feedback-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <iframe
                      title="Section message Storybook preview"
                      src={storybookSectionMessageSrc}
                      className="button-variant-explorer__iframe"
                      loading="lazy"
                    />
                  </div>
                  <div className="button-variant-explorer__panel">
                    <div className="button-control-group">
                      <span>Type</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Section message type">
                        {typeOptions.map((item) => (
                          <label className="button-radio-option" key={item.value}>
                            <input type="radio" name="section-message-type" checked={type === item.value} onChange={() => setType(item.value)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {[
                      ['Solid Button', solid, setSolid],
                      ['Link button', link, setLink],
                      ['Dismiss button', dismiss, setDismiss],
                    ].map(([label, value, setter]) => (
                      <div className="button-control-group" key={label as string}>
                        <span>{label as string}</span>
                        <div className="button-radio-list" role="radiogroup" aria-label={label as string}>
                          {[true, false].map((item) => (
                            <label className="button-radio-option" key={String(item)}>
                              <input type="radio" name={`section-${label}`} checked={value === item} onChange={() => (setter as React.Dispatch<React.SetStateAction<boolean>>)(item)} />
                              <span className="button-radio-indicator" aria-hidden="true" />
                              <span>{item ? 'True' : 'False'}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="component-section-copy">영역 내 상태를 안내할 때 사용합니다. 사용자가 즉시 조치해야 하는 경우 action button 또는 link button을 제공하고, 단순 정보 제공에는 dismiss icon을 선택적으로 제공합니다.</p>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork feedback-size-artwork section-size-artwork">
                  <SectionMessageDemo title="Heading" />
                  <SectionMessageDemo title="Heading" description="This section cannot be displayed right now. Please refresh the page or try again later." />
                  <span className="size-callout size-callout--section">36</span>
                </div>
                <p className="component-section-copy">Section Message는 부모 영역의 너비에 맞게 확장됩니다. Header만 있는 형태와 description이 포함된 형태를 구분하고, 내부 padding과 icon 위치, dismiss icon 위치를 일관되게 유지합니다.</p>
              </SectionBlock>

              <SectionBlock title="Placement">
                <div className="button-guide-artwork feedback-placement-artwork">
                  <BrowserMock>
                    <div className="feedback-placement-artwork__section">
                      <SectionMessageDemo title="Heading" />
                    </div>
                  </BrowserMock>
                </div>
                <p className="component-section-copy">Section Message는 관련 콘텐츠 영역 가까이에 배치합니다. 전체 페이지 공지보다 특정 section, form, table, card 영역의 상태를 설명할 때 사용하며 메시지가 영향을 주는 영역과 시각적으로 연결되어야 합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="특정 영역의 상태나 오류를 사용자에게 안내하는 데 사용합니다.">
                    <SectionMessageDemo title="Unable to load data" description="This section cannot be displayed right now. Please refresh the page or try again later." />
                  </DoDontCard>
                  <DoDontCard type="dont" title="짧은 완료 피드백이나 즉시 사라져도 되는 메시지는 Toast message로 전달합니다.">
                    <ToastDemo tone="error" title="Upload failed." action="Retry" />
                  </DoDontCard>
                  <DoDontCard type="do" title="메시지에 의미에 맞는 variant를 선택합니다.">
                    <SectionMessageDemo tone="success" title="Setup is complete. You can now invite team members." action="Invite Members" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="상태 의미에 다른 색상, 아이콘, 배경을 사용하지 않습니다.">
                    <SectionMessageDemo tone="info" title="Setup is complete. You can now invite team members." action="Invite Members" />
                  </DoDontCard>
                  <DoDontCard type="do" title="사용자에게 필요한 경우 Button button이나 Link button을 함께 제공합니다.">
                    <SectionMessageDemo title="You are not allowed to change these restrictions." action="Request Edit Access" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="제목과 본문을 중복해서 작성하지 않습니다.">
                    <SectionMessageDemo tone="success" title="Setup is complete." description="Setup is complete. You can now invite team members." action="Invite Members" />
                  </DoDontCard>
                  <DoDontCard type="do" title="Header는 짧고 명확하게 작성하고, Description은 원인이나 다음 행동을 필요한 만큼만 설명합니다.">
                    <SectionMessageDemo title="Unable to load data" description="This page cannot be displayed right now. Please refresh the page or try again later." />
                  </DoDontCard>
                  <DoDontCard type="dont" title="긴 정책 설명, 복잡한 해결 방법, 여러 문제를 한 메시지에 모두 넣지 않습니다.">
                    <SectionMessageDemo title="Unable to load data" description="The data could not be loaded because the server failed to respond, the user session may have expired, and filters may not be compatible." />
                  </DoDontCard>
                  <DoDontCard type="do" title="사용자가 메시지를 닫아도 되는 상태에서는 Dismiss icon을 제공합니다.">
                    <SectionMessageDemo tone="info" title="Setup is complete." dismissible />
                  </DoDontCard>
                  <DoDontCard type="dont" title="사용자가 반드시 확인해야 하는 Error 또는 Warning 메시지에는 불필요한 Dismiss icon을 제공하지 않습니다.">
                    <SectionMessageDemo title="Unable to load data" dismissible />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Feedback/SectionMessage"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
