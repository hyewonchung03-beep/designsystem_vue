import React, {useState} from 'react';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {ProgressBarDemo} from '@site/src/components/LoadingComponentExamples';

type ProgressType = 'default' | 'success' | 'error';

function Legend({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-anatomy__legend">
      {items.map((item, index) => (
        <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
      ))}
    </div>
  );
}

function LoadingPanel({children}: {children: React.ReactNode}): React.ReactElement {
  return <div className="loading-usage-panel">{children}</div>;
}

export default function ProgressBarGuidelineContent(): React.ReactElement {
  const [type, setType] = useState<ProgressType>('default');
  const [topLabel, setTopLabel] = useState(true);
  const [helper, setHelper] = useState(true);

  return (
    <ComponentGuideLayout
        category="Loading"
        title="Progress bar"
        description="작업의 진행 상태를 0~100% 범위로 시각화하는 컴포넌트로, 파일 업로드, 데이터 처리, 설치, 동기화처럼 사용자가 완료까지의 진행 정도를 확인해야 하는 상황에서 사용합니다."
        className="loading-guide-page progress-bar-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy loading-anatomy progress-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="loading-anatomy__stage">
                      <ProgressBarDemo label="Label" helper="Helper text" value={50} />
                      <span className="guide-marker guide-marker--1">1</span>
                      <span className="guide-marker guide-marker--2">2</span>
                      <span className="guide-marker guide-marker--3">3</span>
                      <span className="guide-marker guide-marker--4">4</span>
                      <span className="guide-marker guide-marker--5">5</span>
                      <span className="guide-marker guide-marker--6">6</span>
                    </div>
                  </div>
                  <Legend items={['Top label', 'Helper text', 'Indicator', 'Track', 'Status icon', 'Percentage label']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer loading-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <ProgressBarDemo
                      label={topLabel ? 'Export Data' : undefined}
                      helper={helper ? '24.3 MB of 48 MB' : undefined}
                      type={type}
                      value={type === 'success' ? 100 : type === 'error' ? 42 : 50}
                    />
                  </div>
                  <div className="button-variant-explorer__panel">
                    <div className="button-control-group">
                      <span>Type</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Progress type">
                        {(['default', 'success', 'error'] as ProgressType[]).map((item) => (
                          <label className="button-radio-option" key={item}>
                            <input type="radio" name="progress-type" checked={type === item} onChange={() => setType(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item[0].toUpperCase() + item.slice(1)}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="button-control-group">
                      <span>Top label</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Top label">
                        {[true, false].map((item) => (
                          <label className="button-radio-option" key={String(item)}>
                            <input type="radio" name="progress-label" checked={topLabel === item} onChange={() => setTopLabel(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item ? 'True' : 'False'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="button-control-group">
                      <span>Helper text</span>
                      <div className="button-radio-list" role="radiogroup" aria-label="Helper text">
                        {[true, false].map((item) => (
                          <label className="button-radio-option" key={String(item)}>
                            <input type="radio" name="progress-helper" checked={helper === item} onChange={() => setHelper(item)} />
                            <span className="button-radio-indicator" aria-hidden="true" />
                            <span>{item ? 'True' : 'False'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="component-section-copy">Default는 일반적인 진행 중 상태에 사용합니다. Success는 완료 상태, Error는 확인이나 재시도가 필요한 문제 상황에 사용하며, top label과 helper text는 작업 맥락을 이해하는 데 필요한 경우에만 제공합니다.</p>
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork loading-size-artwork progress-size-artwork">
                  <ProgressBarDemo label="Label" value={50} />
                  <ProgressBarDemo label="Label" value={50} size="sm" />
                  <span className="size-callout size-callout--progress-md">4</span>
                  <span className="size-callout size-callout--progress-sm">8</span>
                </div>
                <p className="component-section-copy">기본 Progress Bar와 강조된 Progress Bar의 두께 차이를 보여주고, 진행률 label과 bar 사이 spacing을 유지합니다. 같은 화면 안에서는 동일한 size를 일관되게 사용합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="현재 진행 상황과 남은 작업량을 함께 이해할 수 있게 표시합니다.">
                    <LoadingPanel><ProgressBarDemo label="Export Data" helper="24.3 MB of 48 MB" value={50} /></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="dont" title="진행률을 알 수 없는 로딩 상태라면 Progress Bar보다 Spinner 또는 Skeleton을 사용합니다.">
                    <LoadingPanel><ProgressBarDemo label="Loading..." value={50} /></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="do" title="짧거나 즉시 완료되는 작업에는 사용하지 않습니다.">
                    <LoadingPanel><ProgressBarDemo label="Export Data" helper="24.3 MB of 48 MB" value={50} /></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="dont" title="저장처럼 짧게 끝나는 작업은 Button loading, Toast message, Spinner가 더 적합합니다.">
                    <LoadingPanel><ProgressBarDemo label="Saving..." value={35} /></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="do" title="Error 상태가 되었을 때는 색상만으로 상태를 전달하지 않고, 사용자가 무엇을 해야 하는지 알 수 있는 메시지를 함께 제공합니다.">
                    <LoadingPanel><ProgressBarDemo label="Export failed" helper="Check your network connection and try again." value={42} type="error" /></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="dont" title="사용자가 다음 행동을 할 수 있는 원인 또는 해결 방법 없이 단순 오류 상태만 표시하지 않습니다.">
                    <LoadingPanel><ProgressBarDemo label="Export Data" helper="Something went wrong." value={42} type="error" /></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="do" title="수치나 사용량을 시각화할 때는 Md size를 사용합니다.">
                    <LoadingPanel><ProgressBarDemo label="Current Usage" helper="5,482 GB of 10,000GM" value={55} /></LoadingPanel>
                  </DoDontCard>
                  <DoDontCard type="dont" title="Sm size는 정확한 수치 비교나 사용량 확인에 적합하지 않습니다.">
                    <LoadingPanel><ProgressBarDemo label="Active Users" helper="24 of 100" value={24} size="sm" /></LoadingPanel>
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Loading/ProgressBar"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
