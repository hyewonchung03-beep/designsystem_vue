import React, {useState} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {TextAreaDemo, TextInputDemo} from '@site/src/components/InputComponentExamples';
import {getStorybookIframeUrl} from '@site/src/components/storybookUrls';

type TrailingContent = 'none' | 'copy' | 'button' | 'counter' | 'resize';

function Legend({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-anatomy__legend">
      {items.map((item, index) => (
        <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
      ))}
    </div>
  );
}

export default function TextAreaGuidelineContent(): React.ReactElement {
  const [trailing, setTrailing] = useState<TrailingContent>('none');
  const {colorMode} = useColorMode();
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const textareaStoryId = trailing === 'button'
    ? 'components-input-textarea--with-action-button'
    : trailing === 'counter'
      ? 'components-input-textarea--with-counter'
      : trailing === 'resize'
        ? 'components-input-textarea--with-label-and-helper'
        : 'components-input-textarea--with-label-and-helper';
  const storybookArgs = [
    'label:Label',
    'helperText:Helper text',
    `showCounter:${trailing === 'counter'}`,
    `showResize:${trailing === 'resize'}`,
    `actionLabel:${trailing === 'button' ? 'Submit' : ''}`,
    'rows:3',
  ].join(';');
  const storybookTextAreaSrc = getStorybookIframeUrl({
    storyId: textareaStoryId,
    args: storybookArgs,
    theme: storybookTheme,
    embed: 'component',
  });

  return (
    <ComponentGuideLayout
        category="Input"
        title="Text area"
        description="텍스트 영역은 사용자가 장문의 텍스트를 입력하거나 편집할 수 있는 컴포넌트입니다."
        className="input-guide-page text-area-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy input-anatomy text-area-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="input-anatomy__stage">
                      <TextAreaDemo label="Label" helper="Helper text" counter="57/100" action="Button" copy resize required />
                      <span className="guide-marker guide-marker--1">1</span>
                      <span className="guide-marker guide-marker--2">2</span>
                      <span className="guide-marker guide-marker--3">3</span>
                      <span className="guide-marker guide-marker--4">4</span>
                      <span className="guide-marker guide-marker--5">5</span>
                      <span className="guide-marker guide-marker--6">6</span>
                      <span className="guide-marker guide-marker--7">7</span>
                      <span className="guide-marker guide-marker--8">8</span>
                    </div>
                  </div>
                  <Legend items={['Label', 'Field Content', 'Counter', 'Helper Text', 'Action Button', 'Resize Handle', 'Copy Action', 'Required/Optional']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer input-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <iframe
                      title="Text area Storybook preview"
                      src={storybookTextAreaSrc}
                      className="button-variant-explorer__iframe"
                      loading="lazy"
                    />
                  </div>
                  <div className="button-variant-explorer__panel">
                    <div className="button-control-group">
                      <span>Trailing contents</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Text area trailing contents">
                        {(['none', 'copy', 'button', 'counter', 'resize'] as TrailingContent[]).map((item) => (
                          <label className="button-radio-option" key={item}>
                            <input type="radio" name="text-area-trailing" checked={trailing === item} onChange={() => setTrailing(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item === 'none' ? 'None' : item === 'copy' ? 'Copy Action' : item === 'button' ? 'Button' : item === 'counter' ? 'Character Counter' : 'Resize Handle'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="component-section-copy">기본 장문 입력에는 trailing content 없이 사용합니다. 복사, 제출, 글자 수 제한, 높이 조정이 필요한 경우에만 해당 trailing content를 제공합니다.</p>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork input-size-artwork text-area-size-artwork">
                  <TextAreaDemo size="sm" value="Small is used for compact layouts." counter="57/100" />
                  <TextAreaDemo size="md" value="Medium is used for standard layouts. Supports longer input." counter="57/100" />
                  <span className="size-callout size-callout--textarea-sm">84</span>
                  <span className="size-callout size-callout--textarea-md">96</span>
                </div>
                <p className="component-section-copy">Small은 짧은 메모, 코멘트, 보조 입력에 사용합니다. Medium은 설명, 상세 내용, 장문 입력에 사용합니다.</p>
              </SectionBlock>

              <SectionBlock title="State">
                <div className="button-state-table input-state-table text-area-state-table">
                  {[
                    ['Enabled', <TextAreaDemo counter="57/100" />],
                    ['Disabled', <TextAreaDemo counter="57/100" state="disabled" />],
                    ['Focused', <TextAreaDemo counter="57/100" state="focused" />],
                    ['Done', <TextAreaDemo counter="57/100" state="done" />],
                    ['Error', <TextAreaDemo counter="57/100" helper="Helper text" state="error" />],
                    ['Read only', <TextAreaDemo counter="57/100" state="readonly" />],
                  ].map(([state, preview]) => (
                    <div className="button-state-table__row" key={state as string}>
                      <span>{state as string}</span>
                      <div className="input-state-table__preview">{preview as React.ReactNode}</div>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              <SectionBlock title="Resize">
                <div className="button-guide-artwork input-resize-artwork">
                  <TextAreaDemo size="sm" value="Dorem ipsum dolor sit amet" counter="26/100" resize />
                  <span className="input-resize-artwork__badge">Min - 2 lines</span>
                  <TextAreaDemo size="md" value="Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra." counter="295/500" resize />
                </div>
                <p className="component-section-copy">입력된 텍스트가 최소 높이를 초과하면 resize handle 또는 내부 스크롤을 제공합니다. 최소/최대 높이 기준을 유지해 레이아웃을 과도하게 밀어내지 않도록 합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="Text input보다 구분할 위계가 있는 경우 높이를 준수합니다.">
                    <TextAreaDemo counter="26/100" resize />
                  </DoDontCard>
                  <DoDontCard type="dont" title="Text area를 Text input처럼 사용하지 않도록 최소 높이를 확보합니다.">
                    <TextInputDemo placeholder="Korem ipsum dolor" />
                  </DoDontCard>
                  <DoDontCard type="do" title="입력 완료와 관련된 주요 액션은 우측 하단에 배치합니다.">
                    <TextAreaDemo value="Dorem ipsum dolor sit amet" counter="26/100" action="Submit" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="주요 액션 버튼을 입력 흐름을 방해하는 위치에 배치하지 않습니다.">
                    <TextAreaDemo value="Dorem ipsum dolor sit amet" counter="26/100" action="Submit" />
                  </DoDontCard>
                  <DoDontCard type="do" title="입력 길이에 제한이 있는 경우 현재 글자 수 또는 최대 글자 수를 함께 제공합니다.">
                    <TextAreaDemo value="Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis." counter="500/500" helper="Helper text" state="error" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="최대 입력 길이 없이 현재 글자 수만 제공하지 않습니다.">
                    <TextAreaDemo value="Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum." counter="500" state="error" />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Textarea"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
