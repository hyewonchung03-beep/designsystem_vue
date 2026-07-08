import React, {useState, type ReactNode} from 'react';
import {ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';

type ModalType = 'basic' | 'destructive' | 'form';
type ModalAlign = 'left' | 'center';

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

// ── Modal mockup primitives ─────────────────────────────────────────────────

function ModalCloseButton({marker}: {marker?: string}): React.ReactElement {
  return (
    <span className="modal-doc__close">
      {marker && <span className={`surface-marker surface-marker--${marker}`}>6</span>}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function ModalBox({
  title,
  description,
  checkboxLabel,
  checkboxChecked = true,
  cancelLabel = 'Cancel',
  actionLabel = 'Action',
  actionVariant = 'primary',
  align = 'left',
  size = 'sm',
  markers = false,
  children,
}: {
  title: string;
  description?: string;
  checkboxLabel?: string;
  checkboxChecked?: boolean;
  cancelLabel?: string;
  actionLabel?: string;
  actionVariant?: 'primary' | 'danger';
  align?: ModalAlign;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  markers?: boolean;
  children?: ReactNode;
}): React.ReactElement {
  return (
    <div className={`modal-doc modal-doc--${size} modal-doc--align-${align}`}>
      {markers && <span className="surface-marker surface-marker--tl">2</span>}
      <div className="modal-doc__header">
        {markers && <span className="surface-marker surface-marker--left">3</span>}
        <span className="modal-doc__title">{title}</span>
        <ModalCloseButton marker={markers ? 'right' : undefined} />
      </div>
      <div className="modal-doc__body">
        {description && (
          <p className="modal-doc__desc">
            {markers && <span className="surface-marker surface-marker--left">4</span>}
            {description}
          </p>
        )}
        {children}
        {checkboxLabel && (
          <label className="modal-doc__checkbox-row">
            {markers && <span className="surface-marker surface-marker--left">5</span>}
            <span className={`modal-doc__checkbox${checkboxChecked ? ' modal-doc__checkbox--checked' : ''}`} aria-hidden="true" />
            <span>{checkboxLabel}</span>
          </label>
        )}
      </div>
      <div className="modal-doc__footer">
        {markers && <span className="surface-marker surface-marker--left">7</span>}
        {cancelLabel && <button type="button" className="button-doc-demo button-doc-demo--secondary button-doc-demo--sm">{cancelLabel}</button>}
        <button type="button" className={`button-doc-demo button-doc-demo--sm ${actionVariant === 'danger' ? 'button-doc-demo--danger' : 'button-doc-demo--primary'}`}>{actionLabel}</button>
      </div>
    </div>
  );
}

// ── Variant explorer ───────────────────────────────────────────────────────

function ModalVariantExplorer(): React.ReactElement {
  const [type, setType] = useState<ModalType>('basic');
  const [align, setAlign] = useState<ModalAlign>('left');
  const [confirmation, setConfirmation] = useState(true);

  const typeOptions: Array<{label: string; value: ModalType}> = [
    {label: 'Basic', value: 'basic'},
    {label: 'Destructive', value: 'destructive'},
    {label: 'Form', value: 'form'},
  ];
  const alignOptions: Array<{label: string; value: ModalAlign}> = [
    {label: 'Left', value: 'left'},
    {label: 'Center', value: 'center'},
  ];
  const confirmationOptions = [
    {label: 'True', value: true},
    {label: 'False', value: false},
  ];

  return (
    <div className="button-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview modal-variant-explorer__preview">
        <ModalBox
          title="Change user role"
          description={type === 'form' ? undefined : 'This member will get new permissions based on the selected role.'}
          checkboxLabel={confirmation ? 'I understand this will change the member’s access.' : undefined}
          cancelLabel="Cancel"
          actionLabel="Change role"
          actionVariant={type === 'destructive' ? 'danger' : 'primary'}
          align={align}
        >
          {type === 'form' && (
            <div className="modal-doc__field">
              <span className="modal-doc__field-label">Role</span>
              <span className="modal-doc__field-input" />
            </div>
          )}
        </ModalBox>
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Type</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Modal type">
            {typeOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input type="radio" name="modal-type" checked={type === item.value} onChange={() => setType(item.value)} />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="button-control-group">
          <span>Align</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Modal align">
            {alignOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input type="radio" name="modal-align" checked={align === item.value} onChange={() => setAlign(item.value)} />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="button-control-group">
          <span>Confirmation label</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Confirmation label">
            {confirmationOptions.map((item) => (
              <label key={String(item.value)} className="button-radio-option">
                <input type="radio" name="modal-confirmation" checked={confirmation === item.value} onChange={() => setConfirmation(item.value)} />
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

export default function ModalGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Overlaying surface"
        title="Modal"
        description="Modal은 사용자가 진행 중인 흐름을 잠시 멈추고, 중요한 정보를 확인하거나 즉각적인 작업을 완료하도록 유도하는 컴포넌트입니다. 사용자가 작업을 명확히 인지하고 의도적으로 결정을 내릴 수 있도록 돕습니다."
        className="modal-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>

              <SectionBlock title="Anatomy">
                <div className="button-anatomy modal-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview modal-anatomy__preview">
                    <div className="modal-scrim">
                      <span className="surface-marker surface-marker--tl">1</span>
                      <ModalBox
                        title="Delete store"
                        description="This action is permanent and the data cannot be recovered."
                        checkboxLabel="I understand that this action cannot be undone."
                        cancelLabel="Cancel"
                        actionLabel="Delete"
                        actionVariant="danger"
                        markers
                      />
                    </div>
                  </div>
                  <div className="button-anatomy__legend">
                    <span className="button-anatomy__legend-item"><b>1</b> Scrim</span>
                    <span className="button-anatomy__legend-item"><b>2</b> Modal container</span>
                    <span className="button-anatomy__legend-item"><b>3</b> Title</span>
                    <span className="button-anatomy__legend-item"><b>4</b> Description</span>
                    <span className="button-anatomy__legend-item"><b>5</b> Confirmation label</span>
                    <span className="button-anatomy__legend-item"><b>6</b> Close button</span>
                    <span className="button-anatomy__legend-item"><b>7</b> Footer</span>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <ModalVariantExplorer />
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork modal-size-stack">
                  <ModalBox size="sm" title="Quit Solum CMS?" cancelLabel="Cancel" actionLabel="Quit" />
                  <ModalBox
                    size="md"
                    title="Reset dashboard data"
                    description="This will clear all custom dashboard settings and restore the default layout."
                    cancelLabel="Cancel"
                    actionLabel="Reset"
                    actionVariant="danger"
                  />
                  <ModalBox
                    size="lg"
                    title="Select properties"
                    description="Choose the properties you want to apply to the selected devices."
                    cancelLabel="Cancel"
                    actionLabel="Apply"
                  >
                    <div className="modal-doc__grid">
                      <span className="modal-doc__grid-cell" />
                      <span className="modal-doc__grid-cell" />
                    </div>
                  </ModalBox>
                  <ModalBox
                    size="xl"
                    title="Audit log details"
                    description="Review the full record before exporting this audit log entry."
                    cancelLabel="Cancel"
                    actionLabel="Export"
                  >
                    <div className="modal-doc__grid modal-doc__grid--2x2">
                      <span className="modal-doc__grid-cell" />
                      <span className="modal-doc__grid-cell" />
                      <span className="modal-doc__grid-cell" />
                      <span className="modal-doc__grid-cell" />
                    </div>
                  </ModalBox>
                </div>
                <p className="modal-section-desc">Modal은 콘텐츠 양에 따라 유동적으로 높이가 확장되며, 화면 너비에 따라 Modal의 너비도 함께 조정됩니다.</p>
              </SectionBlock>

              <SectionBlock title="Alignment">
                <div className="modal-align-grid">
                  <div className="button-guide-artwork modal-align-grid__cell">
                    <ModalBox
                      align="left"
                      title="Select options"
                      description="Choose which options should be visible to your team."
                      cancelLabel="Cancel"
                      actionLabel="Select"
                    >
                      <div className="modal-doc__option-list">
                        <span className="modal-doc__option-row" />
                        <span className="modal-doc__option-row" />
                      </div>
                    </ModalBox>
                  </div>
                  <div className="button-guide-artwork modal-align-grid__cell">
                    <ModalBox align="center" title="Quit Solum CMS?" cancelLabel="Cancel" actionLabel="Quit" />
                  </div>
                </div>
                <p className="modal-section-desc">Modal의 콘텐츠는 기본적으로 Left align을 권장합니다. Center align은 짧은 텍스트나 단순 확인 절차, 이미지가 포함되는 경우 화면 중앙성을 고려해 사용합니다.</p>
              </SectionBlock>

              <SectionBlock title="Overflow">
                <div className="button-guide-artwork modal-overflow-wrap">
                  <div className="modal-doc modal-doc--xl modal-doc--overflow">
                    <div className="modal-doc__header">
                      <span className="modal-doc__title">Title</span>
                      <ModalCloseButton />
                    </div>
                    <div className="modal-doc__body modal-doc__body--scroll">
                      <span className="modal-doc__scroll-track" />
                      {Array.from({length: 4}).map((_, i) => (
                        <div className="modal-doc__grid modal-doc__grid--2x2" key={i}>
                          <span className="modal-doc__grid-cell" />
                          <span className="modal-doc__grid-cell" />
                        </div>
                      ))}
                    </div>
                    <div className="modal-doc__footer">
                      <button type="button" className="button-doc-demo button-doc-demo--secondary button-doc-demo--sm">Cancel</button>
                      <button type="button" className="button-doc-demo button-doc-demo--primary button-doc-demo--sm">Action</button>
                    </div>
                  </div>
                </div>
                <p className="modal-section-desc">콘텐츠 길이가 화면 높이를 초과할 경우 Modal container 내부에 스크롤을 적용하고, Header와 Footer는 고정한 채 Content 영역만 스크롤되도록 합니다.</p>
              </SectionBlock>

              <SectionBlock title="Placement">
                <div className="modal-placement-wrap">
                  <div className="modal-placement-browser">
                    <div className="modal-placement-browser__bar">
                      <span className="modal-placement-browser__dot" />
                      <span className="modal-placement-browser__dot" />
                      <span className="modal-placement-browser__dot" />
                    </div>
                    <div className="modal-placement-browser__body">
                      <div className="modal-scrim modal-scrim--inset">
                        <ModalBox title="Session expired" description="Your session has ended. Please sign in again to continue." cancelLabel="Cancel" actionLabel="Sign in again" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="modal-section-desc">Modal은 현재 화면 위에 표시되며, 배경에 Scrim(Overlay)을 적용해 사용자의 시선이 Modal에 집중되도록 합니다. Modal 바깥 영역을 클릭해도 닫히지 않게 하여, Modal 안에서 명확한 선택을 유도합니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="긍정적인 톤으로 짧고 명확하게, 사용자에게 필요한 정보만 전달할 때 사용합니다.">
                    <ModalBox size="sm" title="Quit Solum CMS?" cancelLabel="Cancel" actionLabel="Quit" />
                  </DoDontCard>
                  <DoDontCard type="dont" title="단순 알림이나 환영 메시지처럼 사용자의 결정이 필요하지 않은 경우 Modal을 사용하지 않습니다.">
                    <ModalBox size="sm" title="Welcome to the dashboard!" cancelLabel="" actionLabel="Done" />
                  </DoDontCard>
                  <DoDontCard type="do" title="삭제처럼 되돌릴 수 없는 액션은 Description으로 영향을 명확히 설명합니다.">
                    <ModalBox
                      size="sm"
                      title="Permanently delete file"
                      checkboxLabel="I understand this file will be permanently deleted."
                      cancelLabel="Cancel"
                      actionLabel="Delete"
                      actionVariant="danger"
                    />
                  </DoDontCard>
                  <DoDontCard type="dont" title="‘Something happened’처럼 의미가 불분명한 메시지나 모호한 버튼 라벨은 사용하지 않습니다.">
                    <ModalBox size="sm" title="Something happened" cancelLabel="Retry" actionLabel="Click Me" />
                  </DoDontCard>
                  <DoDontCard type="do" title="Toast message 대신 Description으로 영향을 명확히 설명하고, Confirmation 또는 Destructive 스타일을 사용합니다.">
                    <ModalBox
                      size="sm"
                      title="Delete store"
                      checkboxLabel="I understand that this action cannot be undone."
                      cancelLabel="Cancel"
                      actionLabel="Delete store"
                      actionVariant="danger"
                    />
                  </DoDontCard>
                  <DoDontCard type="dont" title="Title, Description, Confirmation label에 동일한 표현을 반복적으로 사용하지 않습니다.">
                    <ModalBox
                      size="sm"
                      title="Delete store"
                      checkboxLabel="Delete store"
                      cancelLabel="Cancel"
                      actionLabel="Click here"
                      actionVariant="danger"
                    />
                  </DoDontCard>
                  <DoDontCard type="do" title="Action label에는 구체적인 행동을 표현합니다.">
                    <ModalBox
                      size="sm"
                      title="Delete store"
                      checkboxLabel="I understand that this action cannot be undone."
                      cancelLabel="Cancel"
                      actionLabel="Delete store"
                      actionVariant="danger"
                    />
                  </DoDontCard>
                  <DoDontCard type="dont" title="모호한 표현이나 일반적인 단어 사용을 피합니다.">
                    <ModalBox
                      size="sm"
                      title="Delete store"
                      checkboxLabel="I understand that this action cannot be undone."
                      cancelLabel="Cancel"
                      actionLabel="Click here"
                      actionVariant="danger"
                    />
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<StorybookExampleList storyTitles={["Components/Modal"]} storybookPathMode="story" />}
        />
      </ComponentGuideLayout>
  );
}
