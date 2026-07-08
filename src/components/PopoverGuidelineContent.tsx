import React, {useState, type ReactNode} from 'react';
import {ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';

type PopoverType = 'basic' | 'action' | 'selection';
type PopoverPlacement = 'top-start' | 'top-center' | 'top-end' | 'right-start' | 'right-center' | 'right-end';

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
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.9998 4.25C7.71955 4.25 4.24976 7.71979 4.24976 12C4.24976 16.2802 7.71955 19.75 11.9998 19.75C16.28 19.75 19.7498 16.2802 19.7498 12C19.7498 7.71979 16.28 4.25 11.9998 4.25ZM2.74976 12C2.74976 6.89137 6.89112 2.75 11.9998 2.75C17.1084 2.75 21.2498 6.89137 21.2498 12C21.2498 17.1086 17.1084 21.25 11.9998 21.25C6.89112 21.25 2.74976 17.1086 2.74976 12ZM16.3551 9.98033L11.2551 15.0803C10.9622 15.3732 10.4873 15.3732 10.1944 15.0803L7.64443 12.5303L8.70509 11.4697L10.7248 13.4893L15.2944 8.91967L16.3551 9.98033Z"
            />
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

// ── Popover mockup primitives ───────────────────────────────────────────────

function PopoverCloseIcon(): React.ReactElement {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PopoverBox({
  title,
  children,
  cancelLabel,
  actionLabel,
  hasFooter = false,
  hasHeader = true,
  pointer = 'bottom-start',
  width,
  markers = false,
}: {
  title?: string;
  children?: ReactNode;
  cancelLabel?: string;
  actionLabel?: string;
  hasFooter?: boolean;
  hasHeader?: boolean;
  pointer?: 'bottom-start' | 'bottom-center' | 'bottom-end' | 'top-start' | 'top-center' | 'top-end' | 'left-center';
  width?: 'sm' | 'md' | 'lg';
  markers?: boolean;
}): React.ReactElement {
  return (
    <div className={`popover-doc${width ? ` popover-doc--${width}` : ''}`}>
      {hasHeader && (
        <>
          <div className="popover-doc__header">
            {markers && <span className="surface-marker surface-marker--tl">1</span>}
            {markers && <span className="surface-marker surface-marker--top">2</span>}
            <span className="popover-doc__title">{title}</span>
            <span className="popover-doc__close">
              {markers && <span className="surface-marker surface-marker--tr">3</span>}
              <PopoverCloseIcon />
            </span>
          </div>
          <div className="popover-doc__divider">
            {markers && <span className="surface-marker surface-marker--left">4</span>}
          </div>
        </>
      )}
      <div className="popover-doc__body">
        {markers && <span className="surface-marker surface-marker--left">5</span>}
        {children}
      </div>
      {hasFooter && (
        <div className="popover-doc__footer">
          {markers && <span className="surface-marker surface-marker--left">6</span>}
          {cancelLabel && <button type="button" className="button-doc-demo button-doc-demo--secondary button-doc-demo--sm">{cancelLabel}</button>}
          <button type="button" className="button-doc-demo button-doc-demo--primary button-doc-demo--sm">{actionLabel ?? 'Action'}</button>
        </div>
      )}
      <span className={`popover-doc__pointer popover-doc__pointer--${pointer}`}>
        {markers && <span className="surface-marker surface-marker--bottom">7</span>}
      </span>
    </div>
  );
}

// ── Variant explorer ───────────────────────────────────────────────────────

function PopoverVariantExplorer(): React.ReactElement {
  const [type, setType] = useState<PopoverType>('basic');
  const [placement, setPlacement] = useState<PopoverPlacement>('top-start');

  const typeOptions: Array<{label: string; value: PopoverType}> = [
    {label: 'Basic', value: 'basic'},
    {label: 'Action popover', value: 'action'},
    {label: 'Selection popover', value: 'selection'},
  ];
  const placementOptions: Array<{label: string; value: PopoverPlacement}> = [
    {label: 'Top+Start', value: 'top-start'},
    {label: 'Top+Center', value: 'top-center'},
    {label: 'Top+End', value: 'top-end'},
    {label: 'Right+Start', value: 'right-start'},
    {label: 'Right+Center', value: 'right-center'},
    {label: 'Right+End', value: 'right-end'},
  ];

  return (
    <div className="button-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <PopoverBox title="Permission roles" hasFooter={type === 'action'} cancelLabel="Cancel" actionLabel="Save">
          {type === 'selection' ? (
            <div className="popover-doc__option-list">
              <label className="popover-doc__option-row"><span className="popover-doc__radio popover-doc__radio--checked" /><span>Admin</span></label>
              <label className="popover-doc__option-row"><span className="popover-doc__radio" /><span>Editor</span></label>
              <label className="popover-doc__option-row"><span className="popover-doc__radio" /><span>Viewer</span></label>
            </div>
          ) : (
            <p>Admins can manage users, billing, and organization settings.</p>
          )}
        </PopoverBox>
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Type</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Popover type">
            {typeOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input type="radio" name="popover-type" checked={type === item.value} onChange={() => setType(item.value)} />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="button-control-group">
          <span>Placement</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Popover placement">
            {placementOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input type="radio" name="popover-placement" checked={placement === item.value} onChange={() => setPlacement(item.value)} />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Placement matrix ────────────────────────────────────────────────────────

type CellPlacement = 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';

const upwardPointerByPlacement: Record<CellPlacement, 'top-start' | 'top-center' | 'top-end'> = {
  'top-start': 'top-start',
  'top-center': 'top-center',
  'top-end': 'top-end',
  'bottom-start': 'top-start',
  'bottom-center': 'top-center',
  'bottom-end': 'top-end',
};

function PlacementCell({pointer}: {pointer: CellPlacement}): React.ReactElement {
  const isTop = pointer.startsWith('top');
  return (
    <div className={`popover-placement-cell popover-placement-cell--${isTop ? 'pop-above' : 'pop-below'}`}>
      {isTop && <PopoverBox title="Header" width="sm"><span className="popover-doc__line" /></PopoverBox>}
      <span className="popover-placement-cell__trigger" />
      {!isTop && <PopoverBox title="Header" width="sm" pointer={upwardPointerByPlacement[pointer]}><span className="popover-doc__line" /></PopoverBox>}
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export default function PopoverGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Overlaying surface"
        title="Popover"
        description="Popover는 사용자가 특정 요소를 선택했을 때, 해당 요소와 관련된 보조 정보나 간단한 작업을 작은 패널에서 제공하는 컴포넌트입니다. Tooltip보다 더 긴 설명이 필요하거나, 제목·본문·액션을 함께 제공해야 할 때 사용할 수 있습니다."
        className="popover-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>

              <SectionBlock title="Anatomy">
                <div className="button-anatomy popover-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview popover-anatomy__preview">
                    <PopoverBox
                      title="Header"
                      hasFooter
                      cancelLabel="Cancel"
                      actionLabel="Action"
                      markers
                    >
                      <span className="popover-doc__line" />
                      <span className="popover-doc__line popover-doc__line--short" />
                    </PopoverBox>
                  </div>
                  <div className="button-anatomy__legend">
                    <span className="button-anatomy__legend-item"><b>1</b> Header container</span>
                    <span className="button-anatomy__legend-item"><b>2</b> Header</span>
                    <span className="button-anatomy__legend-item"><b>3</b> Close icon</span>
                    <span className="button-anatomy__legend-item"><b>4</b> Divider</span>
                    <span className="button-anatomy__legend-item"><b>5</b> Content area</span>
                    <span className="button-anatomy__legend-item"><b>6</b> Action area</span>
                    <span className="button-anatomy__legend-item"><b>7</b> Pointer</span>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <PopoverVariantExplorer />
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork popover-size-row">
                  <div className="popover-size-item">
                    <PopoverBox title="Header" width="sm" hasFooter cancelLabel="Cancel" actionLabel="Action">
                      <span className="popover-doc__line" />
                      <span className="popover-doc__line popover-doc__line--short" />
                    </PopoverBox>
                    <span className="button-size-measurement__value">Max 200</span>
                  </div>
                  <div className="popover-size-item">
                    <PopoverBox title="Header" width="lg" hasFooter cancelLabel="Cancel" actionLabel="Action">
                      <span className="popover-doc__line" />
                      <span className="popover-doc__line" />
                      <span className="popover-doc__line popover-doc__line--short" />
                      <span className="popover-doc__step">Skip&nbsp;&nbsp;1/5</span>
                    </PopoverBox>
                    <span className="button-size-measurement__value">Max 300</span>
                  </div>
                </div>
                <p className="popover-section-desc">Popover의 크기는 콘텐츠 유형과 정보량에 따라 조정되며, 내용이 많아 전체 화면 흐름을 방해할 경우 Modal 사용을 고려합니다.</p>
              </SectionBlock>

              <SectionBlock title="Placement">
                <div className="button-guide-artwork popover-placement-grid">
                  <PlacementCell pointer="top-start" />
                  <PlacementCell pointer="top-center" />
                  <PlacementCell pointer="top-end" />
                  <PlacementCell pointer="bottom-start" />
                  <PlacementCell pointer="bottom-center" />
                  <PlacementCell pointer="bottom-end" />
                </div>
                <p className="popover-section-desc">Popover는 항상 Trigger와 가까운 위치에 표시됩니다. 사용자가 어떤 요소에서 열렸는지 즉시 이해할 수 있어야 합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="Tooltip보다 긴 설명이 필요하거나, 화면을 벗어나지 않고 추가 정보를 확인해야 할 때 사용합니다.">
                    <PopoverBox title="Permission roles" width="sm"><p>Admins can manage users, billing, and organization settings.</p></PopoverBox>
                  </DoDontCard>
                  <DoDontCard type="dont" title="별다른 인사이트가 없는 단순한 정보를 Popover로 과도하게 제공하지 않습니다. 이런 경우 Tooltip을 사용합니다.">
                    <div className="popover-doc popover-doc--plain popover-doc--sm"><div className="popover-doc__body"><p>Refresh data</p></div></div>
                  </DoDontCard>
                  <DoDontCard type="do" title="Title, 본문, 선택 항목을 함께 제공해야 하는 구조화된 정보에 사용합니다.">
                    <PopoverBox title="Response status" width="md">
                      <p><b>Success</b> The request was processed successfully. (200)</p>
                      <p><b>Accepted</b> The request has been accepted and is being processed. (202)</p>
                    </PopoverBox>
                  </DoDontCard>
                  <DoDontCard type="dont" title="Popover 안에서 여러 항목의 데이터 입력이나 중요한 확인 절차를 처리하지 않습니다.">
                    <PopoverBox title="Complete organization setup" width="md" hasFooter cancelLabel="" actionLabel="Submit">
                      <span className="popover-doc__field-label">Organization name</span>
                      <span className="popover-doc__field-input" />
                      <span className="popover-doc__field-label">Country</span>
                      <span className="popover-doc__field-input" />
                    </PopoverBox>
                  </DoDontCard>
                  <DoDontCard type="do" title="제목은 짧게 작성하고, 본문은 핵심 정보 중심으로 1~3문장으로 구성합니다.">
                    <PopoverBox title="Data sync is disabled" width="sm">
                      <p>Turn on data sync to update this information automatically.</p>
                      <span className="popover-doc__link">Go to setting page →</span>
                    </PopoverBox>
                  </DoDontCard>
                  <DoDontCard type="dont" title="긴 정보나 여러 항목을 한 번에 담지 않습니다. 내용이 길어지면 별도 상세 화면으로 연결합니다.">
                    <PopoverBox title="Data sync is disabled" width="md">
                      <p>The request was processed successfully. Accepted: the request has been accepted and is being processed. No Content: the request was successful, but there is no content to return. Bad Request: the request is invalid.</p>
                    </PopoverBox>
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Popover/Popover"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
