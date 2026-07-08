import React, { type ReactNode } from 'react';
import { DocTabs, DocTab } from '@site/src/components/DocTabs';
import { DocSection } from '@site/src/components/DocSection';

type RadioState = 'enabled' | 'disabled' | 'error';
type RadioSize = 'md' | 'sm';

function SectionBlock({ title, children, className }: { title: string; children: ReactNode; className?: string }): React.ReactElement {
  return (
    <section className={`button-guide-section${className ? ` ${className}` : ''}`}>
      <h2>{title}</h2>
      <div className="button-guide-section__content">{children}</div>
    </section>
  );
}

function RadioIndicator({
  state = 'enabled',
  selected = false,
  size = 'md',
}: {
  state?: RadioState;
  selected?: boolean;
  size?: RadioSize;
}): React.ReactElement {
  const cls = [
    'radio-demo',
    `radio-demo--${size}`,
    `radio-demo--${state}`,
    selected ? 'radio-demo--selected' : '',
  ].filter(Boolean).join(' ');
  return <span className={cls} aria-hidden="true" />;
}

function RadioControlLabel({
  state = 'enabled',
  selected = false,
  size = 'md',
  label = 'Option',
}: {
  state?: RadioState;
  selected?: boolean;
  size?: RadioSize;
  label?: string;
}): React.ReactElement {
  return (
    <label className={`radio-control-label radio-control-label--${size} radio-control-label--${state}`}>
      <RadioIndicator state={state} selected={selected} size={size} />
      <span className="radio-control-label__text">{label}</span>
    </label>
  );
}

export default function RadioGuidelineContent(): React.ReactElement {
  return (
    <DocSection>
      <div className="button-guide-page">
        <header className="button-guide-header">
          <div className="button-guide-header__category">Controls</div>
          <h1>Radio</h1>
          <p>라디오 버튼은 여러 옵션 중 하나를 단일 선택할 때 사용합니다. 항상 그룹으로 제공되며, 동시에 하나의 옵션만 활성화됩니다.</p>
        </header>

        <DocTabs defaultActiveId="guideline">
          <DocTab id="guideline" label="Guideline">
            <div className="button-guide-tab">

              {/* ── Anatomy ───────────────────────────────── */}
              <SectionBlock title="Anatomy">
                <div className="button-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview radio-anatomy__preview">
                    <div className="radio-anatomy-wrap">
                      <RadioControlLabel state="enabled" selected size="md" label="Option" />
                      <span className="button-anatomy__marker button-anatomy__marker--one">1</span>
                      <span className="button-anatomy__marker button-anatomy__marker--two">2</span>
                    </div>
                  </div>
                  <div className="button-anatomy__legend">
                    <span className="button-anatomy__legend-item"><b>1</b> Radio indicator</span>
                    <span className="button-anatomy__legend-item"><b>2</b> Label</span>
                  </div>
                </div>
              </SectionBlock>

              {/* ── Variants ──────────────────────────────── */}
              <SectionBlock title="Variants">
                <div className="radio-state-table button-state-table">
                  {/* Header row */}
                  <div className="radio-state-table__row radio-state-table__row--header">
                    <span />
                    <div className="radio-state-table__cells">
                      <span className="radio-state-table__col-label">Unselected</span>
                      <span className="radio-state-table__col-label">Selected</span>
                    </div>
                  </div>

                  {/* Enabled */}
                  <div className="radio-state-table__row">
                    <span>Enabled</span>
                    <div className="radio-state-table__cells">
                      <RadioControlLabel state="enabled" selected={false} size="md" />
                      <RadioControlLabel state="enabled" selected size="md" />
                    </div>
                  </div>

                  {/* Disabled */}
                  <div className="radio-state-table__row">
                    <span>Disabled</span>
                    <div className="radio-state-table__cells">
                      <RadioControlLabel state="disabled" selected={false} size="md" />
                      <RadioControlLabel state="disabled" selected size="md" />
                    </div>
                  </div>

                  {/* Error */}
                  <div className="radio-state-table__row">
                    <span>Error</span>
                    <div className="radio-state-table__cells">
                      <RadioControlLabel state="error" selected={false} size="md" />
                      <RadioControlLabel state="error" selected size="md" />
                    </div>
                  </div>
                </div>
              </SectionBlock>

              {/* ── Size ──────────────────────────────────── */}
              <SectionBlock title="Size">
                <div className="button-guide-artwork radio-size-row">
                  <div className="radio-size-item">
                    <RadioControlLabel state="enabled" selected size="md" label="MD — 20px" />
                    <RadioControlLabel state="enabled" selected={false} size="md" label="MD — 20px" />
                  </div>
                  <div className="radio-size-item">
                    <RadioControlLabel state="enabled" selected size="sm" label="SM — 16px" />
                    <RadioControlLabel state="enabled" selected={false} size="sm" label="SM — 16px" />
                  </div>
                </div>
              </SectionBlock>

            </div>
          </DocTab>
        </DocTabs>
      </div>
    </DocSection>
  );
}
