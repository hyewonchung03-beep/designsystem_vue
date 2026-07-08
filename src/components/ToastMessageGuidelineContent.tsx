import React, {useState} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {getStorybookIframeUrl} from '@site/src/components/storybookUrls';

type ToastType = 'error' | 'warning' | 'info' | 'success' | 'default';

function Legend({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-anatomy__legend">
      {items.map((item, index) => (
        <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
      ))}
    </div>
  );
}

export default function ToastMessageGuidelineContent(): React.ReactElement {
  const [type, setType] = useState<ToastType>('error');
  const [progress, setProgress] = useState(true);
  const [button, setButton] = useState(true);
  const {colorMode} = useColorMode();
  const typeOptions: Array<{label: string; value: ToastType}> = [
    {label: 'Error', value: 'error'},
    {label: 'Warning', value: 'warning'},
    {label: 'Info', value: 'info'},
    {label: 'Success', value: 'success'},
    {label: 'Default', value: 'default'},
  ];
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const storybookArgs = [
    `status:${type}`,
    'text:Notification',
    'description:This is a notification',
    `showDescription:${progress}`,
    `showAction:${button}`,
    'showClose:true',
  ].join(';');
  const storybookToastSrc = getStorybookIframeUrl({
    storyId: 'components-feedback-toastmessage--default',
    args: storybookArgs,
    theme: storybookTheme,
    embed: 'component',
  });

  return (
    <ComponentGuideLayout
        category="Feedback"
        title="Toast message"
        description="사용자의 행동 결과나 시스템 상태 변화를 짧게 알려주는 비차단형 피드백 메시지로, 화면의 흐름을 방해하지 않으면서 작업이 성공/실패했거나 확인이 필요한지를 즉시 전달하는 데 사용합니다."
        className="feedback-guide-page toast-message-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy feedback-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <img src="/img/components/toast-message-anatomy.svg" alt="Toast message anatomy" className="button-guide-artwork-img svg-img-dark-mode-guideline-md" />
                  </div>
                  <Legend items={['Status icon', 'Title', 'Close button', 'Description', 'Progress bar']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer feedback-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <iframe
                      title="Toast message Storybook preview"
                      src={storybookToastSrc}
                      className="button-variant-explorer__iframe"
                      loading="lazy"
                    />
                  </div>
                  <div className="button-variant-explorer__panel">
                    <div className="button-control-group">
                      <span>Type</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Toast message type">
                        {typeOptions.map((item) => (
                          <label className="button-radio-option" key={item.value}>
                            <input type="radio" name="toast-type" checked={type === item.value} onChange={() => setType(item.value)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="button-control-group">
                      <span>Progress bar</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Toast message progress">
                        {[true, false].map((item) => (
                          <label className="button-radio-option" key={String(item)}>
                            <input type="radio" name="toast-progress" checked={progress === item} onChange={() => setProgress(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item ? 'True' : 'False'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="button-control-group">
                      <span>Button</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Toast message button">
                        {[true, false].map((item) => (
                          <label className="button-radio-option" key={String(item)}>
                            <input type="radio" name="toast-button" checked={button === item} onChange={() => setButton(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item ? 'True' : 'False'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="component-section-copy">성공, 실패, 경고, 정보, 사용자 활동 등 상황에 맞는 type을 사용합니다. 사용자가 직접 후속 행동을 해야 하는 경우에만 action button을 제공하고, 자동 dismiss가 필요한 경우 progress bar를 사용할 수 있습니다.</p>
              </SectionBlock>

              <SectionBlock title="Behavior">
                <div className="button-guide-artwork">
                  <img src="/img/components/toast-message-behavior.svg" alt="Toast message behavior" className="button-guide-artwork-img svg-img-dark-mode-guideline-md" />
                </div>
                <p className="component-section-copy">3초 노출 이후 자동으로 닫힙니다.<br />저장 완료, 복사 완료, 일반 정보 안내처럼 사용자가 빠르게 인지하면 되는 메시지에 사용합니다.<br />별도의 후속 행동이 필요하지 않는 단순 피드백이므로 프로그래스바를 사용하지 않습니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="Toast에 표시되는 기능적인 문구는 짧고, 목적을 잘 이해할 수 있도록 작성합니다.">
                    <img src="/img/components/toast-message-do-01.svg" alt="Toast message concise text usage example" className="button-guide-artwork-img svg-img-dark-mode-guideline-md" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="제목과 메시지에 동일한 문구를 반복하지 않습니다.">
                    <img src="/img/components/toast-message-dont-01.svg" alt="Toast message repeated text non-recommended example" className="button-guide-artwork-img svg-img-dark-mode-guideline-md" />
                  </DoDontCard>
                  <DoDontCard type="do" title="작은 피드백 내용을 작성합니다.">
                    <img src="/img/components/toast-message-do-02.svg" alt="Toast message short feedback usage example" className="button-guide-artwork-img svg-img-dark-mode-guideline-md" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="경고, 해결 방법, 정책 설명이 길어지는 경우에는 Toast message 대신 Section Message 또는 Banner를 사용합니다.">
                    <img src="/img/components/toast-message-dont-02.svg" alt="Toast message long warning non-recommended example" className="button-guide-artwork-img svg-img-dark-mode-guideline-md" />
                  </DoDontCard>
                  <DoDontCard type="do" title="Action 버튼은 수행할 수 있는 행동이 있을 때만 사용하며, 메시지 내용과 관련된 Action을 사용합니다.">
                    <img src="/img/components/toast-message-do-03.svg" alt="Toast message related action usage example" className="button-guide-artwork-img svg-img-dark-mode-guideline-md" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="현재 상태와 관련 없는 Action, 이중적 의미의 Action을 넣지 않습니다.">
                    <img src="/img/components/toast-message-dont-03.svg" alt="Toast message unrelated action non-recommended example" className="button-guide-artwork-img svg-img-dark-mode-guideline-md" />
                  </DoDontCard>
                  <DoDontCard type="do" title="상황에 맞는 타입을 사용합니다.">
                    <img src="/img/components/toast-message-do-04.svg" alt="Toast message appropriate type usage example" className="button-guide-artwork-img svg-img-dark-mode-guideline-md" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="성공 메시지에 Error 아이콘을 쓰거나, 단순 정보성 Warning 스타일을 쓰는 등 메시지 내용과 다른 상태를 표현하지 않습니다.">
                    <img src="/img/components/toast-message-dont-04.svg" alt="Toast message mismatched type non-recommended example" className="button-guide-artwork-img svg-img-dark-mode-guideline-md" />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Feedback/ToastMessage"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
