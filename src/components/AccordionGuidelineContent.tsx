import React, {useState, type ReactNode} from 'react';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {ComponentGuideLayout, ComponentGuideTabs, SectionBlock, DoDontCard} from '@site/src/components/ComponentGuidelinePrimitives';

// ── Shared icon ────────────────────────────────────────────────────────────

function ChevronIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── FAQ Accordion item primitives ──────────────────────────────────────────

type FaqState = 'enabled' | 'hover' | 'pressed' | 'expanded';
type FaqSize = 'md' | 'lg';

function FaqItem({
  question,
  answer,
  state = 'enabled',
  size = 'md',
}: {
  question: string;
  answer?: string;
  state?: FaqState;
  size?: FaqSize;
}): React.ReactElement {
  const isExpanded = state === 'expanded';
  const stateClass = state !== 'enabled' && state !== 'expanded' ? ` faq-doc__row--${state}` : '';
  return (
    <div className="faq-doc__item">
      <div className={`faq-doc__row${size === 'lg' ? ' faq-doc__row--lg' : ''}${stateClass}${isExpanded ? ' faq-doc__row--expanded' : ''}`}>
        <span className="faq-doc__question">{question}</span>
        <span className={`faq-doc__chevron${isExpanded ? ' faq-doc__chevron--open' : ''}`}>
          <ChevronIcon />
        </span>
      </div>
      {isExpanded && answer && (
        <div className="faq-doc__content">{answer}</div>
      )}
    </div>
  );
}

function FaqDivider(): React.ReactElement {
  return <div className="faq-doc__divider" />;
}

// ── Anatomy ────────────────────────────────────────────────────────────────

function AccordionAnatomyPreview(): React.ReactElement {
  return (
    <div className="button-anatomy faq-anatomy">
      <div className="button-guide-artwork button-anatomy__preview">
        <img src="/img/components/accordion-anatomy.svg" alt="Accordion anatomy" className="button-guide-artwork-img" />
      </div>
    </div>
  );
}

// ── Variant explorer ───────────────────────────────────────────────────────

function VariantExplorer(): React.ReactElement {
  const [type, setType] = useState<'expanded' | 'collapsed'>('expanded');

  const typeOptions: Array<{label: string; value: 'expanded' | 'collapsed'}> = [
    {label: 'Expanded', value: 'expanded'},
    {label: 'Collapsed', value: 'collapsed'},
  ];

  return (
    <div className="button-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <div className="faq-doc faq-doc--preview">
          <FaqItem
            question="Why can't I access a store or company?"
            answer="Your access may be limited by your assigned role or tenant permissions. Contact your administrator to update your access."
            state={type === 'expanded' ? 'expanded' : 'enabled'}
          />
          <FaqDivider />
          <FaqItem question="How do I create a new user account?" />
        </div>
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Type</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Accordion type">
            {typeOptions.map((item) => (
              <label key={item.value} className="button-radio-option">
                <input
                  type="radio"
                  name="faq-type"
                  checked={type === item.value}
                  onChange={() => setType(item.value)}
                />
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

// ── Size ───────────────────────────────────────────────────────────────────

function SizeSection(): React.ReactElement {
  return (
    <>
      <div className="button-guide-artwork faq-size-row">
        <img src="/img/components/accordion-size.svg" alt="Accordion size" className="button-guide-artwork-img" />
      </div>
      <p className="faq-section-desc">
        기본 사이즈는 md이며, 사이즈 별 Content 영역의 차이를 줍니다. md 기준 Content 영역에서 더 많은 내용을 보여줄 때는 lg 사이즈를 사용합니다.
      </p>
    </>
  );
}

// ── State ──────────────────────────────────────────────────────────────────

function StateSection(): React.ReactElement {
  return (
    <>
      <div className="button-guide-artwork faq-state-table">
        <img src="/img/components/accordion-state.svg" alt="Accordion state" className="button-guide-artwork-img" />
      </div>
      <p className="faq-section-desc">
        Accordion은 Hover 및 Pressed 상태를 사용합니다. 서비스의 특성에 따라 선택적으로 적용할 수 있습니다.
      </p>
    </>
  );
}

// ── Placement mockup ───────────────────────────────────────────────────────

function PlacementMockup(): React.ReactElement {
  const questions = [
    "Why can't I access a store or company?",
    'How do I create a new user account?',
    'How do I add a new store?',
    'How do I change my password?',
    'What are the supported file formats?',
  ];

  return (
    <div className="faq-placement-wrap">
      <div className="faq-placement-browser">
        <div className="faq-placement-browser__bar">
          <span className="faq-placement-browser__dot" />
          <span className="faq-placement-browser__dot" />
          <span className="faq-placement-browser__dot" />
        </div>
        <div className="faq-placement-browser__body">
          <div className="faq-placement-sidebar">
            <div className="faq-placement-sidebar__block" />
            <div className="faq-placement-sidebar__block faq-placement-sidebar__block--short" />
            <div className="faq-placement-sidebar__block faq-placement-sidebar__block--medium" />
          </div>
          <div className="faq-placement-content">
            <div className="faq-doc faq-doc--placement">
              {questions.map((q, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <FaqDivider />}
                  <FaqItem question={q} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Usage helper ───────────────────────────────────────────────────────────

function UsageFaqExpanded({
  question,
  items,
}: {
  question: string;
  items: string[];
}): React.ReactElement {
  return (
    <div className="faq-doc faq-doc--usage">
      <div className="faq-doc__item">
        <div className="faq-doc__row faq-doc__row--expanded">
          <span className="faq-doc__question">{question}</span>
          <span className="faq-doc__chevron faq-doc__chevron--open">
            <ChevronIcon />
          </span>
        </div>
        <div className="faq-doc__content">
          {items.map((item, i) => (
            <div key={i} className="faq-usage-list-item">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsageFaqWithActions({
  question,
  buttons,
}: {
  question: string;
  buttons: string[];
}): React.ReactElement {
  return (
    <div className="faq-doc faq-doc--usage">
      <div className="faq-doc__item">
        <div className="faq-doc__row">
          <span className="faq-doc__question">{question}</span>
          <div className="faq-usage-actions">
            {buttons.map((btn) => (
              <span key={btn} className="faq-usage-btn">{btn}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export default function AccordionGuidelineContent(): React.ReactElement {
  return (
    <ComponentGuideLayout
      category="Accordion"
      title="Accordion"
      description="Accordion은 관련 정보를 섹션 단위로 접고 펼쳐 보여 주는 컴포넌트입니다. 사용자는 필요한 액션만 열어 상세 내용을 확인할 수 있어, 콘텐츠 선택에서 이어지는 세부 흐름을 간결하게 만들 수 있습니다."
    >
      <ComponentGuideTabs
        guideline={<>
          <SectionBlock title="Anatomy">
            <AccordionAnatomyPreview />
          </SectionBlock>

          <SectionBlock title="Variants">
            <VariantExplorer />
          </SectionBlock>

          <SectionBlock title="Size">
            <SizeSection />
          </SectionBlock>

          <SectionBlock title="State">
            <StateSection />
          </SectionBlock>

          <SectionBlock title="Placement">
            <div className="button-guide-artwork faq-placement-preview">
              <img src="/img/components/accordion-placement.svg" alt="Accordion placement" className="button-guide-artwork-img" />
            </div>
          </SectionBlock>

          <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
            <div className="button-do-dont-grid button-usage-guideline-grid">
              <DoDontCard type="do" title="관련된 콘텐츠를 접고 펼쳐 확인할 때 사용합니다.">
                <img src="/img/components/accordion-usage-do-01.svg" alt="Accordion 콘텐츠 사용 권장 예시" className="button-guide-artwork-img" />
              </DoDontCard>
              <DoDontCard type="dont" title="페이지 이동을 위한 내비게이션 메뉴로 사용하지 않습니다.">
                <img src="/img/components/accordion-usage-dont-01.svg" alt="Accordion 내비게이션 사용 비권장 예시" className="button-guide-artwork-img" />
              </DoDontCard>
              <DoDontCard type="do" title="Header 하나에 단 하나의 답변을 담도록 사용합니다.">
                <img src="/img/components/accordion-usage-do-02.svg" alt="Accordion 단일 답변 사용 권장 예시" className="button-guide-artwork-img" />
              </DoDontCard>
              <DoDontCard type="dont" title="Header 안에 Edit, Delete, Save와 같이 여러 액션이 함께 있지 않습니다.">
                <img src="/img/components/accordion-usage-dont-02.svg" alt="Accordion 복수 액션 사용 비권장 예시" className="button-guide-artwork-img" />
              </DoDontCard>
              <DoDontCard type="do" title="Header 하나에 단 하나의 내용만 담도록 합니다.">
                <img src="/img/components/accordion-usage-do-03.svg" alt="Accordion 간결한 콘텐츠 사용 권장 예시" className="button-guide-artwork-img" />
              </DoDontCard>
              <DoDontCard type="dont" title="콘텐츠가 길거나 복잡한 내용을 아코디언 항목에 담지 않습니다.">
                <img src="/img/components/accordion-usage-dont-03.svg" alt="Accordion 복잡한 콘텐츠 사용 비권장 예시" className="button-guide-artwork-img" />
              </DoDontCard>
            </div>
          </SectionBlock>
        </>}
          example={<StorybookExampleList storyTitles={["Components/Accordion"]} storybookPathMode="story" />}
      />
    </ComponentGuideLayout>
  );
}
