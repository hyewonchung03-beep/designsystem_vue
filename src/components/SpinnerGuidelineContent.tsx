import React, {useState} from 'react';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {SpinnerDemo} from '@site/src/components/LoadingComponentExamples';

type SpinnerStyle = 'default' | 'inverse';
type LabelPosition = 'below' | 'right';

function Legend({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-anatomy__legend">
      {items.map((item, index) => (
        <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
      ))}
    </div>
  );
}

function LoadingPanel({children, dimmed = false}: {children: React.ReactNode; dimmed?: boolean}): React.ReactElement {
  return <div className={`loading-usage-panel${dimmed ? ' loading-usage-panel--dimmed' : ''}`}>{children}</div>;
}

export default function SpinnerGuidelineContent(): React.ReactElement {
  const [style, setStyle] = useState<SpinnerStyle>('default');
  const [loaderText, setLoaderText] = useState(true);
  const [labelPosition, setLabelPosition] = useState<LabelPosition>('below');

  return (
    <ComponentGuideLayout
        category="Loading"
        title="Spinner"
        description="작업이 진행 중이지만 완료 시점을 예측하기 어려울 때 사용하는 로딩 컴포넌트로, 짧은 처리 상태, 화면 전환, 데이터 호출 등 완료 전까지 사용자의 대기 상태를 전달하는 데 사용합니다."
        className="loading-guide-page spinner-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy loading-anatomy spinner-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="loading-anatomy__stage">
                      <SpinnerDemo label="Loader Text" />
                      <span className="guide-marker guide-marker--1">1</span>
                      <span className="guide-marker guide-marker--2">2</span>
                      <span className="guide-marker guide-marker--3">3</span>
                    </div>
                  </div>
                  <Legend items={['Indicator', 'Track', 'Loader text']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer loading-variant-explorer">
                  <div className={`button-guide-artwork button-variant-explorer__preview${style === 'inverse' ? ' loading-inverse-preview' : ''}`}>
                    <SpinnerDemo
                      label={loaderText ? 'Loader Text' : undefined}
                      inverse={style === 'inverse'}
                      position={labelPosition}
                    />
                  </div>
                  <div className="button-variant-explorer__panel">
                    <div className="button-control-group">
                      <span>Style</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Spinner style">
                        {(['default', 'inverse'] as SpinnerStyle[]).map((item) => (
                          <label className="button-radio-option" key={item}>
                            <input type="radio" name="spinner-style" checked={style === item} onChange={() => setStyle(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item === 'default' ? 'Default' : 'Inverse'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="button-control-group">
                      <span>Loader text</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Loader text">
                        {[true, false].map((item) => (
                          <label className="button-radio-option" key={String(item)}>
                            <input type="radio" name="spinner-loader-text" checked={loaderText === item} onChange={() => setLoaderText(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item ? 'True' : 'False'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="button-control-group">
                      <span>Label position</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Label position">
                        {(['below', 'right'] as LabelPosition[]).map((item) => (
                          <label className="button-radio-option" key={item}>
                            <input type="radio" name="spinner-label-position" checked={labelPosition === item} onChange={() => setLabelPosition(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item === 'below' ? 'Below' : 'Right'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="component-section-copy">Default는 일반적인 밝은 배경에서 사용하고, Inverse는 어두운 배경이나 dimmed overlay 위에서 사용합니다. Loader text와 label position은 화면 맥락과 공간에 맞춰 선택합니다.</p>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork loading-size-artwork spinner-size-artwork">
                  <SpinnerDemo label="Loader text" size="sm" />
                  <SpinnerDemo label="Loader text" size="md" />
                  <SpinnerDemo label="Loader text" size="lg" />
                  <span className="size-callout size-callout--spinner-sm">32</span>
                  <span className="size-callout size-callout--spinner-md">48</span>
                  <span className="size-callout size-callout--spinner-lg">64</span>
                </div>
                <p className="component-section-copy">Small은 버튼 내부나 작은 영역에, Medium은 카드나 section 단위 로딩에, Large는 전체 화면 또는 주요 영역 로딩에 사용합니다.</p>
              </SectionBlock>

              <SectionBlock title="Placement">
                <div className="button-guide-artwork loading-placement-artwork">
                  <div className="loading-browser-mock">
                    <div className="loading-browser-mock__chrome" />
                    <div className="loading-browser-mock__body">
                      <span className="loading-browser-mock__rail" />
                      <span className="loading-browser-mock__block" />
                      <span className="loading-browser-mock__block" />
                      <div className="loading-placement-target loading-placement-target--side"><SpinnerDemo size="sm" /></div>
                      <div className="loading-placement-target loading-placement-target--main"><SpinnerDemo size="sm" /></div>
                    </div>
                  </div>
                </div>
                <p className="component-section-copy">Spinner는 로딩 중인 영역의 중앙에 배치합니다. 전체 페이지 로딩은 viewport 중심에, 특정 카드나 패널 로딩은 해당 container 중앙에 배치합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="진행률을 알 수 없는 작업에 사용합니다.">
                    <LoadingPanel><SpinnerDemo label="Loading Data..." size="sm" position="right" /></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="dont" title="진행률을 계산할 수 있는 작업에는 Spinner 대신 Progress Bar를 사용합니다.">
                    <LoadingPanel><SpinnerDemo label="Export Data...(24 MB of 100 MB)" size="sm" position="right" /></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="do" title="Spinner가 화면의 중앙에 오도록 하여 어떤 영역이 처리 중인지 명확히 표현합니다.">
                    <LoadingPanel><div className="loading-container-example"><SpinnerDemo label="Loading Data table Data..." size="sm" position="right" /></div></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="dont" title="여러 개의 작은 Spinner를 동시에 배치해 화면을 복잡하게 만들지 않습니다.">
                    <LoadingPanel><div className="loading-many-spinners"><SpinnerDemo size="sm" /><SpinnerDemo size="sm" /><SpinnerDemo size="sm" /></div></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="do" title="실제 로딩 중인 섹션, 카드, 또는 전체 영역의 중앙에 배치합니다.">
                    <LoadingPanel><div className="loading-container-example loading-container-example--large"><SpinnerDemo label="Loading Workspace..." size="sm" position="right" /></div></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="dont" title="로딩 대상과 관계없는 위치에 배치하지 않습니다.">
                    <LoadingPanel><div className="loading-offset-spinner"><SpinnerDemo label="Loading Workspace..." size="sm" position="right" /></div></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="do" title="Dimmed 처리된 화면에서는 배경과 대비가 충분한 inverse 타입을 선택합니다.">
                    <LoadingPanel dimmed><SpinnerDemo label="Loading settings..." inverse /></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="dont" title="Spinner가 잘 보이지 않는 배경 위에 기본 스타일을 사용하지 않습니다.">
                    <LoadingPanel dimmed><SpinnerDemo label="Loading Settings..." /></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="do" title="Label은 짧고 명확하게 작성하며, 사용자가 기다리는 작업을 이해할 수 있도록 합니다.">
                    <LoadingPanel><SpinnerDemo label="Generating Report..." position="right" /></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="dont" title="모호하거나 반복적인 문구를 사용하지 않습니다.">
                    <LoadingPanel><SpinnerDemo label="Please Wait..." position="right" /><SpinnerDemo label="Processing..." position="right" /></LoadingPanel>
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Loading/Spinner"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
