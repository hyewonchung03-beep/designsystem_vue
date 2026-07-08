import React, {useState} from 'react';
import {ExampleCard} from '@site/src/components/ExampleCard';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {UploadDemo} from '@site/src/components/UploadExamples';

type UploadState = 'default' | 'drag' | 'uploading' | 'done' | 'error' | 'disabled';

function Legend({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-anatomy__legend">
      {items.map((item, index) => (
        <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
      ))}
    </div>
  );
}

function TextList({items}: {items: string[]}): React.ReactElement {
  return <div className="data-table-text-list"><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

function RadioOption({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  checked: boolean;
  onChange: () => void;
}): React.ReactElement {
  return (
    <label className="button-radio-option">
      <input type="radio" name={name} checked={checked} onChange={onChange} />
      <span className="button-radio-indicator" aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}

function VariantsExplorer(): React.ReactElement {
  const [helper, setHelper] = useState(true);
  const [file, setFile] = useState(true);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="button-variant-explorer upload-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <UploadDemo helper={helper} file={file} state={disabled ? 'disabled' : 'uploading'} />
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Helper text</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Upload helper text">
            <RadioOption label="True" name="upload-helper" checked={helper} onChange={() => setHelper(true)} />
            <RadioOption label="False" name="upload-helper" checked={!helper} onChange={() => setHelper(false)} />
          </div>
        </div>
        <div className="button-control-group">
          <span>File item</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Upload file item">
            <RadioOption label="True" name="upload-file" checked={file} onChange={() => setFile(true)} />
            <RadioOption label="False" name="upload-file" checked={!file} onChange={() => setFile(false)} />
          </div>
        </div>
        <div className="button-control-group">
          <span>Disabled</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Upload disabled">
            <RadioOption label="True" name="upload-disabled" checked={disabled} onChange={() => setDisabled(true)} />
            <RadioOption label="False" name="upload-disabled" checked={!disabled} onChange={() => setDisabled(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatePreview(): React.ReactElement {
  const states: Array<{label: string; value: UploadState}> = [
    {label: 'Default', value: 'default'},
    {label: 'Drag', value: 'drag'},
    {label: 'Uploading', value: 'uploading'},
    {label: 'Done', value: 'done'},
    {label: 'Error', value: 'error'},
    {label: 'Disabled', value: 'disabled'},
  ];

  return (
    <div className="upload-state-table">
      {states.map((state) => (
        <div className="upload-state-table__row" key={state.value}>
          <span>{state.label}</span>
          <UploadDemo state={state.value} />
        </div>
      ))}
    </div>
  );
}

function PlacementPreview(): React.ReactElement {
  return (
    <div className="button-guide-artwork upload-placement-preview">
      <div className="upload-placement-preview__modal">
        <strong>Upload file</strong>
        <UploadDemo file={false} />
        <button type="button">Upload</button>
      </div>
      <div className="upload-placement-preview__page">
        <span />
        <span />
        <UploadDemo file={false} />
        <i />
        <i />
      </div>
    </div>
  );
}

export default function UploadGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Upload"
        title="Upload"
        description="파일을 선택하거나 드래그 앤 드롭하여 시스템에 업로드할 수 있도록 돕는 컴포넌트입니다."
        className="upload-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy upload-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="upload-anatomy__stage">
                      <UploadDemo state="uploading" />
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => <span className={`guide-marker guide-marker--${item}`} key={item}>{item}</span>)}
                    </div>
                  </div>
                  <Legend items={['Drop display area', 'Supported file format', 'File item', 'File name', 'File size', 'Progress', 'Action button', 'Error message']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <VariantsExplorer />
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork upload-size-preview">
                  <UploadDemo state="default" />
                  <span className="size-callout upload-size-preview__w">320</span>
                  <span className="size-callout upload-size-preview__h">170</span>
                </div>
                <TextList items={['Upload 영역은 파일 안내 문구와 액션이 충분히 읽히는 크기로 제공합니다.', '좁은 영역에서는 file item을 줄바꿈하지 않고 말줄임 처리합니다.']} />
              </SectionBlock>

              <SectionBlock title="State">
                <StatePreview />
              </SectionBlock>

              <SectionBlock title="Placement">
                <PlacementPreview />
                <TextList items={['Upload는 사용자가 파일을 추가해야 하는 작업 흐름 안에 배치합니다.', 'Modal 안에서는 upload area와 action button의 관계가 명확하게 보이도록 구성합니다.']} />
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="지원 가능한 파일 형식과 최대 용량을 명확하게 안내합니다.">
                    <UploadDemo file={false} />
                  </DoDontCard>
                  <DoDontCard type="dont" title="사용자가 업로드 조건을 알 수 없는 상태로 파일 선택을 요구하지 않습니다.">
                    <UploadDemo file={false} helper={false} />
                  </DoDontCard>
                  <DoDontCard type="do" title="드래그 중인 상태를 명확하게 표시합니다.">
                    <UploadDemo state="drag" file={false} />
                  </DoDontCard>
                  <DoDontCard type="dont" title="드래그 상태와 기본 상태를 시각적으로 동일하게 표시하지 않습니다.">
                    <UploadDemo state="default" file={false} />
                  </DoDontCard>
                  <DoDontCard type="do" title="오류가 발생하면 원인과 다음 행동을 함께 제공합니다.">
                    <UploadDemo state="error" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="오류 상태를 색상만으로 전달하지 않습니다.">
                    <UploadDemo state="error" />
                  </DoDontCard>
                  <DoDontCard type="do" title="업로드 진행률은 파일 항목과 가까운 위치에 표시합니다.">
                    <UploadDemo state="uploading" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="진행률과 파일 정보가 서로 분리되어 보이게 배치하지 않습니다.">
                    <div className="upload-separated-preview">
                      <UploadDemo state="uploading" file={false} />
                      <UploadDemo state="uploading" helper={false} />
                    </div>
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<>
              <ExampleCard title="Basic upload" storyId="components-upload--basic" />
              <ExampleCard title="Drag upload" storyId="components-upload--drag" />
              <ExampleCard title="Uploading" storyId="components-upload--uploading" />
              <ExampleCard title="Error upload" storyId="components-upload--error" />
          </>}
        />
      </ComponentGuideLayout>
  );
}
