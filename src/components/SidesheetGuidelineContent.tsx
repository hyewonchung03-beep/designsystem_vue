import React, {useState, type ReactNode} from 'react';
import {ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';

type SidesheetType = 'modal' | 'modeless' | 'modeless-footer';

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

// ── Sidesheet mockup primitives ─────────────────────────────────────────────

function SidesheetCloseIcon(): React.ReactElement {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SidesheetBox({
  title,
  children,
  hasFooter = false,
  cancelLabel = 'Cancel',
  actionLabel = 'Action',
  width = 'sm',
  markers = false,
}: {
  title: string;
  children?: ReactNode;
  hasFooter?: boolean;
  cancelLabel?: string;
  actionLabel?: string;
  width?: 'sm' | 'md';
  markers?: boolean;
}): React.ReactElement {
  return (
    <div className={`sidesheet-doc sidesheet-doc--${width}`}>
      {markers && <span className="surface-marker surface-marker--tl">1</span>}
      <div className="sidesheet-doc__header">
        {markers && <span className="surface-marker surface-marker--left">2</span>}
        <span className="sidesheet-doc__title">{title}</span>
        <span className="sidesheet-doc__close">
          {markers && <span className="surface-marker surface-marker--tr">4</span>}
          <SidesheetCloseIcon />
        </span>
      </div>
      <div className="sidesheet-doc__body">
        {markers && <span className="surface-marker surface-marker--left">3</span>}
        {children}
      </div>
      {hasFooter && (
        <div className="sidesheet-doc__footer">
          {markers && <span className="surface-marker surface-marker--left">6</span>}
          {cancelLabel && <button type="button" className="button-doc-demo button-doc-demo--secondary button-doc-demo--sm">{cancelLabel}</button>}
          <button type="button" className="button-doc-demo button-doc-demo--primary button-doc-demo--sm">{actionLabel}</button>
        </div>
      )}
    </div>
  );
}

function FieldRow({label}: {label: string}): React.ReactElement {
  return (
    <div className="sidesheet-doc__field">
      <span className="sidesheet-doc__field-label">{label}</span>
      <span className="sidesheet-doc__field-input" />
    </div>
  );
}

function SummaryRow({label}: {label: string}): React.ReactElement {
  return (
    <div className="sidesheet-doc__summary-row">
      <span className="sidesheet-doc__summary-label">{label}</span>
      <span className="sidesheet-doc__summary-value" />
    </div>
  );
}

// ── Variant explorer ───────────────────────────────────────────────────────

function SidesheetVariantExplorer(): React.ReactElement {
  const [type, setType] = useState<SidesheetType>('modal');

  const typeOptions: Array<{label: string; value: SidesheetType}> = [
    {label: 'Modal sidesheet', value: 'modal'},
    {label: 'Modeless sidesheet', value: 'modeless'},
    {label: 'Modeless sidesheet with footer', value: 'modeless-footer'},
  ];

  return (
    <div className="button-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview sidesheet-variant-explorer__preview">
        <div className={`sidesheet-scrim${type === 'modal' ? ' sidesheet-scrim--dimmed' : ''}`}>
          <SidesheetBox title="Edit store information" hasFooter={type === 'modeless-footer'} width="sm">
            <FieldRow label="Select a store" />
            <FieldRow label="Select a manager" />
          </SidesheetBox>
        </div>
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Type</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Sidesheet type">
            {typeOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input type="radio" name="sidesheet-type" checked={type === item.value} onChange={() => setType(item.value)} />
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

// ── Main export ────────────────────────────────────────────────────────────

export default function SidesheetGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Overlaying surface"
        title="Sidesheet"
        description="Sidesheet은 화면 전체에서 열려 현재 페이지의 맥락을 유지한 채 추가 정보 확인, 세부 설정, 편집 작업을 수행할 수 있도록 돕는 패널입니다. 사용자는 페이지를 벗어나지 않고 관련 데이터를 조회하거나 설정을 변경할 수 있습니다."
        className="sidesheet-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>

              <SectionBlock title="Anatomy">
                <div className="button-anatomy sidesheet-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview sidesheet-anatomy__preview">
                    <div className="sidesheet-scrim sidesheet-scrim--dimmed">
                      <span className="surface-marker surface-marker--tl">5</span>
                      <SidesheetBox title="Audit log details" hasFooter actionLabel="Done" cancelLabel="Cancel" markers>
                        <SummaryRow label="Audit type" />
                        <SummaryRow label="User ID" />
                        <SummaryRow label="Origin" />
                      </SidesheetBox>
                    </div>
                  </div>
                  <div className="button-anatomy__legend">
                    <span className="button-anatomy__legend-item"><b>1</b> Sidesheet container</span>
                    <span className="button-anatomy__legend-item"><b>2</b> Header</span>
                    <span className="button-anatomy__legend-item"><b>3</b> Content area</span>
                    <span className="button-anatomy__legend-item"><b>4</b> Close button</span>
                    <span className="button-anatomy__legend-item"><b>5</b> Scrim</span>
                    <span className="button-anatomy__legend-item"><b>6</b> Footer</span>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <SidesheetVariantExplorer />
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork sidesheet-size-row">
                  <SidesheetBox title="Audit log details" width="sm">
                    <SummaryRow label="Summary" />
                    <SummaryRow label="Audit type" />
                    <SummaryRow label="User ID" />
                    <SummaryRow label="Origin" />
                    <SummaryRow label="Resource" />
                    <SummaryRow label="Event" />
                    <SummaryRow label="Request time" />
                    <SummaryRow label="Response time" />
                  </SidesheetBox>
                  <SidesheetBox title="Select a store" hasFooter width="md">
                    <FieldRow label="Source store" />
                    <span className="sidesheet-doc__field-label">Select properties</span>
                    <label className="sidesheet-doc__checkbox-row"><span className="sidesheet-doc__checkbox sidesheet-doc__checkbox--checked" /><span>Location hierarchy</span></label>
                    <label className="sidesheet-doc__checkbox-row"><span className="sidesheet-doc__checkbox sidesheet-doc__checkbox--checked" /><span>Operational settings</span></label>
                    <label className="sidesheet-doc__checkbox-row"><span className="sidesheet-doc__checkbox" /><span>Device &amp; infrastructure</span></label>
                    <FieldRow label="Target store" />
                  </SidesheetBox>
                </div>
                <p className="sidesheet-section-desc">Sidesheet은 화면 높이를 기준으로 세로 전체 영역을 사용할 수 있으며, 콘텐츠 길이에 따라 내부 영역이 스크롤됩니다. Header와 Footer는 고정하고, Content area만 스크롤되도록 구현하는 것을 권장합니다.</p>
              </SectionBlock>

              <SectionBlock title="Placement">
                <div className="sidesheet-placement-wrap">
                  <div className="sidesheet-placement-browser">
                    <div className="sidesheet-placement-browser__bar">
                      <span className="sidesheet-placement-browser__dot" />
                      <span className="sidesheet-placement-browser__dot" />
                      <span className="sidesheet-placement-browser__dot" />
                    </div>
                    <div className="sidesheet-placement-browser__body">
                      <div className="sidesheet-placement-nav">
                        <span className="sidesheet-placement-nav__item" />
                        <span className="sidesheet-placement-nav__item" />
                        <span className="sidesheet-placement-nav__item" />
                      </div>
                      <div className="sidesheet-placement-main">
                        <span className="sidesheet-placement-main__title" />
                        <div className="sidesheet-placement-main__table">
                          {Array.from({length: 4}).map((_, i) => <span className="sidesheet-placement-main__row" key={i} />)}
                        </div>
                      </div>
                      <div className="sidesheet-scrim sidesheet-scrim--dimmed sidesheet-scrim--overlay">
                        <SidesheetBox title="Audit log details" width="sm">
                          <SummaryRow label="Summary" />
                          <SummaryRow label="Audit type" />
                        </SidesheetBox>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="sidesheet-section-desc">Sidesheet은 일반적으로 화면 우측에서 열립니다. 사용자가 목록, 데이터 등 기존 화면의 맥락을 유지하면서 추가 정보를 확인하거나 편집할 수 있도록 돕습니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="현재 페이지의 맥락을 유지한 상태에서 세부 정보 조회, 설정 변경, 편집 작업을 수행할 때 사용합니다.">
                    <SidesheetBox title="Audit log details" width="sm">
                      <SummaryRow label="Summary" />
                      <SummaryRow label="Audit type" />
                      <SummaryRow label="User ID" />
                    </SidesheetBox>
                  </DoDontCard>
                  <DoDontCard type="dont" title="사용자가 반드시 결정해야 하거나, 현재 작업을 완전히 차단해야 하는 중요한 확인 작업에는 Sidesheet을 사용하지 않습니다.">
                    <div className="sidesheet-doc sidesheet-doc--sm sidesheet-doc--confirm">
                      <div className="sidesheet-doc__header"><span className="sidesheet-doc__title">Delete this organization permanently?</span><span className="sidesheet-doc__close"><SidesheetCloseIcon /></span></div>
                      <div className="sidesheet-doc__footer">
                        <button type="button" className="button-doc-demo button-doc-demo--secondary button-doc-demo--sm">Cancel</button>
                        <button type="button" className="button-doc-demo button-doc-demo--danger button-doc-demo--sm">Delete</button>
                      </div>
                    </div>
                  </DoDontCard>
                  <DoDontCard type="do" title="Title은 사용자가 현재 어떤 패널을 보고 있는지 짐작할 수 있도록 간결하게 구성합니다.">
                    <SidesheetBox title="Edit store information" width="sm">
                      <FieldRow label="Select a store" />
                      <FieldRow label="Select a manager" />
                    </SidesheetBox>
                  </DoDontCard>
                  <DoDontCard type="dont" title="Title에 모든 작업 내용을 길게 설명하거나, 하나의 Sidesheet에서 여러 목적을 한 번에 처리하려 하지 않습니다.">
                    <SidesheetBox title="Edit store information and update device settings and configure assigned users" width="sm">
                      <FieldRow label="Select a store" />
                    </SidesheetBox>
                  </DoDontCard>
                  <DoDontCard type="do" title="작업이 복잡하거나 정보량이 많다면 Sidesheet 대신 별도 Page를 활용합니다.">
                    <SidesheetBox title="Edit store information" width="sm">
                      <FieldRow label="Source store" />
                      <FieldRow label="Source store" />
                    </SidesheetBox>
                  </DoDontCard>
                  <DoDontCard type="dont" title="여러 단계의 복잡한 설정 변경을 한 화면에 모두 넣지 않습니다.">
                    <SidesheetBox title="Title" width="sm">
                      <FieldRow label="Select a store" />
                      <FieldRow label="Source store" />
                      <FieldRow label="Select a store" />
                    </SidesheetBox>
                  </DoDontCard>
                  <DoDontCard type="do" title="Primary button은 저장·생성·적용처럼 결과를 확정하는 액션에, Secondary button은 취소나 닫기에 사용합니다.">
                    <SidesheetBox title="Edit store information" hasFooter width="sm">
                      <FieldRow label="Select a store" />
                    </SidesheetBox>
                  </DoDontCard>
                  <DoDontCard type="dont" title="Footer에 너무 많은 액션을 넣거나, 같은 수준의 버튼을 여러 개 배치하지 않습니다.">
                    <div className="sidesheet-doc sidesheet-doc--sm">
                      <div className="sidesheet-doc__header"><span className="sidesheet-doc__title">Edit store information</span><span className="sidesheet-doc__close"><SidesheetCloseIcon /></span></div>
                      <div className="sidesheet-doc__body"><FieldRow label="Select a store" /></div>
                      <div className="sidesheet-doc__footer sidesheet-doc__footer--crowded">
                        <button type="button" className="button-doc-demo button-doc-demo--secondary button-doc-demo--sm">Next</button>
                        <button type="button" className="button-doc-demo button-doc-demo--secondary button-doc-demo--sm">OK</button>
                        <button type="button" className="button-doc-demo button-doc-demo--secondary button-doc-demo--sm">Submit</button>
                        <button type="button" className="button-doc-demo button-doc-demo--primary button-doc-demo--sm">Done</button>
                      </div>
                    </div>
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<>
              <p className="button-example-placeholder">실제 Sidesheet 컴포넌트 예시는 추후 추가될 예정입니다.</p>
          </>}
        />
      </ComponentGuideLayout>
  );
}
