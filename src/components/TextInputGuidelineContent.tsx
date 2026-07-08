import React, {useState} from 'react';
import {ExampleCard} from '@site/src/components/ExampleCard';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {TextInputDemo} from '@site/src/components/InputComponentExamples';

type LeadingContent = 'none' | 'icon';
type TrailingContent = 'none' | 'slot' | 'button';

function Legend({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-anatomy__legend">
      {items.map((item, index) => (
        <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
      ))}
    </div>
  );
}

export default function TextInputGuidelineContent(): React.ReactElement {
  const [leading, setLeading] = useState<LeadingContent>('none');
  const [trailing, setTrailing] = useState<TrailingContent>('none');

  return (
    <ComponentGuideLayout
        category="Input"
        title="Text input"
        description="텍스트 입력은 사용자가 텍스트를 입력하거나 수정할 수 있는 컴포넌트입니다."
        className="input-guide-page text-input-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy input-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="input-anatomy__stage">
                      <TextInputDemo label="Label" placeholder="placeholder text" helper="Helper text" required />
                      <span className="guide-marker guide-marker--1">1</span>
                      <span className="guide-marker guide-marker--2">2</span>
                      <span className="guide-marker guide-marker--3">3</span>
                      <span className="guide-marker guide-marker--4">4</span>
                    </div>
                  </div>
                  <Legend items={['Label', 'Input Text', 'Helper Text', 'Required/Optional']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer input-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <TextInputDemo
                      label="Label"
                      helper="Helper text"
                      leading={leading === 'icon' ? '$' : undefined}
                      trailing={trailing === 'slot' ? 'kg' : trailing === 'button' ? 'Clear' : undefined}
                    />
                  </div>
                  <div className="button-variant-explorer__panel">
                    <div className="button-control-group">
                      <span>Leading content</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Leading content">
                        {(['none', 'icon'] as LeadingContent[]).map((item) => (
                          <label className="button-radio-option" key={item}>
                            <input type="radio" name="text-input-leading" checked={leading === item} onChange={() => setLeading(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item === 'none' ? 'None' : 'Icon'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="button-control-group">
                      <span>Trailing contents</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Trailing content">
                        {(['none', 'slot', 'button'] as TrailingContent[]).map((item) => (
                          <label className="button-radio-option" key={item}>
                            <input type="radio" name="text-input-trailing" checked={trailing === item} onChange={() => setTrailing(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item === 'none' ? 'None' : item === 'slot' ? 'Slot' : 'Button'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="component-section-copy">기본 입력에는 leading content 없이 사용합니다. 입력 의미를 보조해야 할 때 leading content를 사용하고, 필요한 경우에만 trailing content를 제공합니다.</p>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork input-size-artwork">
                  <TextInputDemo size="sm" placeholder="Small" />
                  <TextInputDemo size="md" placeholder="Medium" />
                  <span className="size-callout size-callout--input-sm">30</span>
                  <span className="size-callout size-callout--input-md">36</span>
                </div>
                <p className="component-section-copy">Small은 좁은 영역이나 밀도가 높은 UI에서 사용하고, Medium은 일반적인 form 입력에 사용합니다. 같은 form 안에서는 가능한 동일한 size를 유지합니다.</p>
              </SectionBlock>

              <SectionBlock title="State">
                <div className="button-state-table input-state-table">
                  {[
                    ['Enabled', <TextInputDemo placeholder="placeholder text" />],
                    ['Focused', <TextInputDemo value="input" state="focused" trailing="i" />],
                    ['Done', <TextInputDemo value="input" state="done" />],
                    ['Error', <TextInputDemo value="input" helper="Helper text" state="error" />],
                    ['Disabled', <TextInputDemo value="input" state="disabled" />],
                  ].map(([state, preview]) => (
                    <div className="button-state-table__row" key={state as string}>
                      <span>{state as string}</span>
                      <div className="input-state-table__preview">{preview as React.ReactNode}</div>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="라벨은 입력 필드 위에 배치합니다.">
                    <TextInputDemo label="Label" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="텍스트가 길어지더라도 placeholder에만 의미를 넣지 않습니다. 자세한 입력 설명은 helper text를 사용합니다.">
                    <TextInputDemo placeholder="placeholder text" />
                  </DoDontCard>
                  <DoDontCard type="do" title="통화 단위는 입력값 내부가 아닌 입력 필드 바깥 또는 보조 요소로 표시합니다.">
                    <TextInputDemo leading="$" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="아이콘 없이 검색 입력창을 사용하지 않습니다.">
                    <TextInputDemo placeholder="Search" />
                  </DoDontCard>
                  <DoDontCard type="do" title="비밀번호와 같은 민감한 정보는 마스킹 처리하여 노출을 방지합니다.">
                    <TextInputDemo label="Label" value="password" password trailing="Show" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="비밀번호를 기본 상태에서 텍스트로 노출하지 않습니다.">
                    <TextInputDemo label="Label" value="12345678" trailing="Show" />
                  </DoDontCard>
                  <DoDontCard type="do" title="플레이스홀더는 입력 예시 또는 보조 설명 용도로 사용합니다. 필수 입력 항목에는 레이블 우측에 필수 표시를 제공합니다.">
                    <TextInputDemo label="Email Address" required placeholder="you@company.com" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="레이블과 플레이스홀더에 동일한 내용을 중복 사용하지 않습니다.">
                    <TextInputDemo label="Email Address" required placeholder="Email address" />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<>
              <ExampleCard title="Basic text input" storyId="components-text-input--basic" />
              <ExampleCard title="Text input with helper text" storyId="components-text-input--with-helper" />
              <ExampleCard title="Required text input" storyId="components-text-input--required" />
              <ExampleCard title="Text input with leading content" storyId="components-text-input--leading" />
              <ExampleCard title="Text input with trailing button" storyId="components-text-input--trailing-button" />
              <ExampleCard title="Error text input" storyId="components-text-input--error" />
              <ExampleCard title="Disabled text input" storyId="components-text-input--disabled" />
              <StorybookExampleList storyTitles={['Components/TextHelper', 'Components/TextLabel']} />
          </>}
        />
      </ComponentGuideLayout>
  );
}
