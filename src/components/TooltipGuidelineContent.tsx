import React, {useState, type ReactNode} from 'react';
import {ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';

type TooltipType = 'informational' | 'helper';
type TooltipPlacement =
  | 'top-start' | 'top-center' | 'top-end'
  | 'right-start' | 'right-center' | 'right-end'
  | 'bottom-start' | 'bottom-center' | 'bottom-end'
  | 'left-start' | 'left-center' | 'left-end';

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

// ── Tooltip mockup primitives ───────────────────────────────────────────────

function CursorIcon(): React.ReactElement {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="tooltip-doc__cursor-icon">
      <path d="M3 1.5L13 8.5L8.5 9.5L10.5 14L8.5 14.8L6.5 10.2L3 13V1.5Z" fill="currentColor" />
    </svg>
  );
}

function InfoIcon(): React.ReactElement {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 7.2V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function TooltipBubble({
  children,
  pointer = 'top-start',
  hasIcon = false,
  markers,
}: {
  children: ReactNode;
  pointer?: TooltipPlacement;
  hasIcon?: boolean;
  markers?: {container?: boolean; message?: boolean; pointer?: boolean; icon?: boolean};
}): React.ReactElement {
  return (
    <div className="tooltip-doc">
      {markers?.container && <span className="surface-marker surface-marker--tr">1</span>}
      {hasIcon && (
        <span className="tooltip-doc__icon">
          {markers?.icon && <span className="surface-marker surface-marker--tl">4</span>}
          <InfoIcon />
        </span>
      )}
      <span className="tooltip-doc__message">
        {markers?.message && <span className="surface-marker surface-marker--bottom">2</span>}
        {children}
      </span>
      <span className={`tooltip-doc__pointer tooltip-doc__pointer--${pointer}`}>
        {markers?.pointer && <span className="surface-marker surface-marker--bottom">3</span>}
      </span>
    </div>
  );
}

// ── Variant explorer ────────────────────────────────────────────────────────

function TooltipVariantExplorer(): React.ReactElement {
  const [type, setType] = useState<TooltipType>('informational');
  const [placement, setPlacement] = useState<TooltipPlacement>('top-start');

  const typeOptions: Array<{label: string; value: TooltipType}> = [
    {label: 'Informational tooltip', value: 'informational'},
    {label: 'Helper tooltip', value: 'helper'},
  ];
  const placementOptions: Array<{label: string; value: TooltipPlacement}> = [
    {label: 'Top+Start', value: 'top-start'},
    {label: 'Top+Center', value: 'top-center'},
    {label: 'Top+End', value: 'top-end'},
    {label: 'Right+Start', value: 'right-start'},
    {label: 'Right+Center', value: 'right-center'},
    {label: 'Right+End', value: 'right-end'},
    {label: 'Bottom+Start', value: 'bottom-start'},
    {label: 'Bottom+Center', value: 'bottom-center'},
    {label: 'Bottom+End', value: 'bottom-end'},
    {label: 'Left+Start', value: 'left-start'},
    {label: 'Left+Center', value: 'left-center'},
    {label: 'Left+End', value: 'left-end'},
  ];

  return (
    <div className="button-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview tooltip-variant-explorer__preview">
        <div className="tooltip-doc__anchor">
          <CursorIcon />
          <TooltipBubble pointer={placement} hasIcon={type === 'helper'}>
            This shows the last time the device was synced.
          </TooltipBubble>
        </div>
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Type</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Tooltip type">
            {typeOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input type="radio" name="tooltip-type" checked={type === item.value} onChange={() => setType(item.value)} />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="button-control-group">
          <span>Placement</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Tooltip placement">
            {placementOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input type="radio" name="tooltip-placement" checked={placement === item.value} onChange={() => setPlacement(item.value)} />
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

function PlacementPair({side, align}: {side: 'top' | 'bottom' | 'left' | 'right'; align: 'start' | 'center' | 'end'}): React.ReactElement {
  const pointer = `${side === 'top' ? 'bottom' : side === 'bottom' ? 'top' : side === 'left' ? 'right' : 'left'}-${align}` as TooltipPlacement;
  const bubble = <TooltipBubble pointer={pointer}>This is a tooltip</TooltipBubble>;
  const trigger = <span className="tooltip-placement-pair__trigger" />;

  if (side === 'top') {
    return <div className="tooltip-placement-pair tooltip-placement-pair--vertical">{bubble}{trigger}</div>;
  }
  if (side === 'bottom') {
    return <div className="tooltip-placement-pair tooltip-placement-pair--vertical">{trigger}{bubble}</div>;
  }
  if (side === 'left') {
    return <div className="tooltip-placement-pair tooltip-placement-pair--horizontal">{bubble}{trigger}</div>;
  }
  return <div className="tooltip-placement-pair tooltip-placement-pair--horizontal">{trigger}{bubble}</div>;
}

// ── Main export ────────────────────────────────────────────────────────────

export default function TooltipGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
        category="Overlaying surface"
        title="Tooltip"
        description="Tooltip은 사용자가 특정 요소에 hover 또는 focus 했을 때, 해당 요소의 의미나 기능을 짧게 보충 설명하는 컴포넌트입니다. 사용자가 화면 흐름을 벗어나지 않고 아이콘, 버튼, 상태값, 약어처럼 즉시 이해하기 어려운 요소의 의미를 빠르게 파악할 수 있도록 돕습니다."
        className="tooltip-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>

              <SectionBlock title="Anatomy">
                <div className="button-anatomy tooltip-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview tooltip-anatomy__preview">
                    <div className="tooltip-anatomy__cell">
                      <div className="tooltip-doc__anchor tooltip-doc__anchor--offset">
                        <span className="tooltip-placement-pair__trigger" />
                        <TooltipBubble pointer="top-start" markers={{container: true, message: true}}>Tooltip message</TooltipBubble>
                      </div>
                    </div>
                    <div className="tooltip-anatomy__divider" />
                    <div className="tooltip-anatomy__cell">
                      <TooltipBubble pointer="top-center" hasIcon markers={{pointer: true, icon: true}}>Tooltip message</TooltipBubble>
                    </div>
                  </div>
                  <div className="button-anatomy__legend">
                    <span className="button-anatomy__legend-item"><b>1</b> Tooltip container</span>
                    <span className="button-anatomy__legend-item"><b>2</b> Tooltip message</span>
                    <span className="button-anatomy__legend-item"><b>3</b> Pointer</span>
                    <span className="button-anatomy__legend-item"><b>4</b> Helper/Info icon</span>
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <TooltipVariantExplorer />
              </SectionBlock>

              <SectionBlock title="Size">
                <div className="button-guide-artwork tooltip-size-stack">
                  <div className="tooltip-size-item">
                    <span className="button-size-measurement__value">Max 240</span>
                    <div className="tooltip-doc__anchor">
                      <CursorIcon />
                      <TooltipBubble pointer="top-start">Tooltip width is content-based and should not exceed 240px.</TooltipBubble>
                    </div>
                  </div>
                  <div className="tooltip-size-item">
                    <span className="button-size-measurement__value">Max 240</span>
                    <div className="tooltip-doc__anchor">
                      <CursorIcon />
                      <TooltipBubble pointer="top-start">Tooltip width is content-based and should not exceed 240px.</TooltipBubble>
                    </div>
                  </div>
                </div>
                <p className="tooltip-section-desc">Tooltip은 짧은 보조 정보를 제공하는 컴포넌트이므로, 콘텐츠가 과도하게 길어지지 않도록 최대 너비를 제한합니다. 한 줄 메시지를 권장하며, 필요한 경우 최대 두 줄까지 사용할 수 있습니다.</p>
              </SectionBlock>

              <SectionBlock title="Tooltip with Placement">
                <div className="button-guide-artwork tooltip-placement-grid">
                  <div className="tooltip-placement-grid__cell tooltip-placement-grid__cell--r1-c1"><PlacementPair side="top" align="start" /></div>
                  <div className="tooltip-placement-grid__cell tooltip-placement-grid__cell--r1-c2"><PlacementPair side="top" align="center" /></div>
                  <div className="tooltip-placement-grid__cell tooltip-placement-grid__cell--r1-c3"><PlacementPair side="top" align="end" /></div>

                  <div className="tooltip-placement-grid__cell tooltip-placement-grid__cell--r2-c1"><PlacementPair side="left" align="start" /></div>
                  <div className="tooltip-placement-grid__cell tooltip-placement-grid__cell--r2-c3"><PlacementPair side="right" align="start" /></div>

                  <div className="tooltip-placement-grid__cell tooltip-placement-grid__cell--r3-c1"><PlacementPair side="left" align="center" /></div>
                  <div className="tooltip-placement-grid__cell tooltip-placement-grid__cell--r3-c3"><PlacementPair side="right" align="center" /></div>

                  <div className="tooltip-placement-grid__cell tooltip-placement-grid__cell--r4-c1"><PlacementPair side="left" align="end" /></div>
                  <div className="tooltip-placement-grid__cell tooltip-placement-grid__cell--r4-c3"><PlacementPair side="right" align="end" /></div>

                  <div className="tooltip-placement-grid__cell tooltip-placement-grid__cell--r5-c1"><PlacementPair side="bottom" align="start" /></div>
                  <div className="tooltip-placement-grid__cell tooltip-placement-grid__cell--r5-c2"><PlacementPair side="bottom" align="center" /></div>
                  <div className="tooltip-placement-grid__cell tooltip-placement-grid__cell--r5-c3"><PlacementPair side="bottom" align="end" /></div>
                </div>
                <p className="tooltip-section-desc">대상 요소의 위치에 따라 Tooltip을 상단, 하단, 좌측, 우측에 배치합니다. Pointer는 대상 요소를 명확히 가리키도록 Start, Center, End 정렬을 사용할 수 있습니다.</p>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="사용자가 아이콘, 버튼, 상태값, 약어처럼 직관적으로 이해하기 어려운 요소를 빠르게 파악할 수 있도록 돕습니다.">
                    <div className="tooltip-usage-preview">
                      <div className="tooltip-usage-row">
                        <span className="tooltip-usage-badge">Method Not Allowed</span>
                      </div>
                      <TooltipBubble pointer="top-start">The HTTP method used is not supported for this endpoint (405)</TooltipBubble>
                    </div>
                  </DoDontCard>
                  <DoDontCard type="dont" title="사용자가 반드시 알아야 하는 핵심 정보를 Tooltip 안에만 숨기지 않습니다.">
                    <div className="tooltip-usage-banner">
                      <span className="tooltip-usage-banner__icon">!</span>
                      <span>Your subscription will expire tomorrow. Update your billing information.</span>
                    </div>
                  </DoDontCard>
                  <DoDontCard type="do" title="Tooltip은 설명 대상 요소와 가까운 위치에 표시합니다.">
                    <div className="tooltip-usage-field-demo">
                      <span className="tooltip-usage-field-demo__label">Label</span>
                      <span className="tooltip-usage-field-demo__input">Paste here</span>
                      <div className="tooltip-usage-field-demo__id-row">
                        <span>{'{id: abcdefg01234567890}'}</span>
                        <span className="tooltip-usage-field-demo__copy-anchor">
                          <span className="tooltip-usage-field-demo__copy-icon" />
                          <TooltipBubble pointer="bottom-start">Copied!</TooltipBubble>
                        </span>
                      </div>
                    </div>
                  </DoDontCard>
                  <DoDontCard type="dont" title="여러 문장, 링크, 버튼이 필요한 내용은 Tooltip으로 제공하지 않습니다.">
                    <div className="tooltip-usage-field-demo">
                      <span className="tooltip-usage-field-demo__label">Label</span>
                      <span className="tooltip-usage-field-demo__input tooltip-usage-field-demo__input--split">Paste here</span>
                      <div className="tooltip-usage-field-demo__id-row tooltip-usage-field-demo__id-row--apart">
                        <span>{'{id: abcdefg01234567890}'}</span>
                        <span className="tooltip-usage-field-demo__copy-anchor">
                          <span className="tooltip-usage-field-demo__copy-icon" />
                          <TooltipBubble pointer="bottom-end">Copied!</TooltipBubble>
                        </span>
                      </div>
                    </div>
                  </DoDontCard>
                  <DoDontCard type="do" title="Tooltip 문구는 1~2줄 안에서 이해할 수 있도록 짧게 작성합니다.">
                    <div className="tooltip-doc__anchor">
                      <TooltipBubble pointer="bottom-center">Only active stores are shown.</TooltipBubble>
                    </div>
                  </DoDontCard>
                  <DoDontCard type="dont" title="긴 정책 설명, 복잡한 조건, 여러 개의 정보를 하나의 Tooltip에 넣지 않습니다.">
                    <div className="tooltip-doc__anchor">
                      <TooltipBubble pointer="bottom-center">Active stores are stores that currently have at least one enabled device, have completed setup, and are included in the selected company scope.</TooltipBubble>
                    </div>
                  </DoDontCard>
                </div>
              </SectionBlock>
          </>}
          example={<>
              <p className="button-example-placeholder">실제 Tooltip 컴포넌트 예시는 추후 추가될 예정입니다.</p>
          </>}
        />
      </ComponentGuideLayout>
  );
}
