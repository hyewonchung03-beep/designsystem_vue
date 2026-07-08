import React from 'react';

// ── Shared primitives ──────────────────────────────────────────────────────

function CheckSvg(): React.ReactElement {
  return (
    <svg viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronSvg(): React.ReactElement {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AccordionCheckbox({checked = false}: {checked?: boolean}): React.ReactElement {
  return (
    <span className={`accordion-doc__checkbox${checked ? ' accordion-doc__checkbox--checked' : ''}`}>
      {checked && <CheckSvg />}
    </span>
  );
}

export function AccordionChevron({open = false}: {open?: boolean}): React.ReactElement {
  return (
    <span className={`accordion-doc__chevron${open ? ' accordion-doc__chevron--open' : ''}`}>
      <ChevronSvg />
    </span>
  );
}

export type AccordionRowProps = {
  label: string;
  badge?: number;
  hasLeading?: boolean;
  checked?: boolean;
  selected?: boolean;
  expanded?: boolean;
  size?: 'md' | 'lg';
};

export function AccordionRow({
  label,
  badge,
  hasLeading = false,
  checked = false,
  selected = false,
  expanded = false,
  size = 'md',
}: AccordionRowProps): React.ReactElement {
  return (
    <div className={[
      'accordion-doc__row',
      size === 'lg' ? 'accordion-doc__row--lg' : '',
      selected ? 'accordion-doc__row--selected' : '',
    ].filter(Boolean).join(' ')}>
      <div className="accordion-doc__leading">
        {hasLeading && <AccordionCheckbox checked={checked} />}
        <span className="accordion-doc__label">{label}</span>
        {badge !== undefined && (
          <span className={`accordion-doc__badge${selected ? ' accordion-doc__badge--active' : ''}`}>
            {badge}
          </span>
        )}
      </div>
      <AccordionChevron open={expanded} />
    </div>
  );
}

export type NestedRowProps = {
  label: string;
  checked?: boolean;
  selected?: boolean;
  hasCheckbox?: boolean;
};

export function AccordionNestedRow({
  label,
  checked = false,
  selected = false,
  hasCheckbox = true,
}: NestedRowProps): React.ReactElement {
  return (
    <div className={`accordion-doc__row accordion-doc__row--nested${selected ? ' accordion-doc__row--selected' : ''}`}>
      {hasCheckbox && <AccordionCheckbox checked={checked} />}
      <span className="accordion-doc__label">{label}</span>
    </div>
  );
}

// ── High-level example components ─────────────────────────────────────────

export function BasicAccordionExample(): React.ReactElement {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'32px',gap:'16px'}}>
      <div className="accordion-doc">
        <AccordionRow label="All Stores" badge={0} />
      </div>
    </div>
  );
}

export function AccordionExpandedExample(): React.ReactElement {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'32px',gap:'16px'}}>
      <div className="accordion-doc">
        <AccordionRow label="All Stores" badge={0} expanded />
        <div className="accordion-doc__children">
          <AccordionNestedRow label="Store A" hasCheckbox={false} />
          <AccordionNestedRow label="Store B" hasCheckbox={false} />
        </div>
      </div>
    </div>
  );
}

export function AccordionSelectableExample(): React.ReactElement {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'32px',gap:'16px'}}>
      <div className="accordion-doc">
        <AccordionRow label="All Stores" badge={1} hasLeading checked expanded />
        <div className="accordion-doc__children">
          <AccordionNestedRow label="Store A" checked selected />
          <AccordionNestedRow label="Store B" />
        </div>
      </div>
    </div>
  );
}

export function AccordionWithDividerExample(): React.ReactElement {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'32px',gap:'16px'}}>
      <div className="accordion-doc">
        <AccordionRow label="Parent Item" badge={2} hasLeading expanded />
        <div className="accordion-doc__children">
          <AccordionNestedRow label="Child Item" checked />
          <div className="accordion-doc__divider" />
          <AccordionNestedRow label="Child Item" />
        </div>
        <div className="accordion-doc__divider" />
        <AccordionRow label="Parent Item" badge={0} hasLeading />
      </div>
    </div>
  );
}

export function AccordionSizesExample(): React.ReactElement {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'32px',gap:'24px',flexWrap:'wrap'}}>
      <div className="accordion-doc">
        <AccordionRow label="Parent Item" badge={2} hasLeading size="md" />
      </div>
      <div className="accordion-doc">
        <AccordionRow label="Parent Item" badge={2} hasLeading size="lg" />
      </div>
    </div>
  );
}

// ── Source maps ────────────────────────────────────────────────────────────

export const accordionSourceMap = {
  basic: `<Accordion>
  <AccordionItem label="All Stores" badge={0} />
</Accordion>`,
  expanded: `<Accordion>
  <AccordionItem label="All Stores" badge={0} defaultExpanded>
    <AccordionNestedItem label="Store A" />
    <AccordionNestedItem label="Store B" />
  </AccordionItem>
</Accordion>`,
  selectable: `<Accordion>
  <AccordionItem
    label="All Stores"
    badge={1}
    hasLeading
    checked
    defaultExpanded
  >
    <AccordionNestedItem label="Store A" checked selected />
    <AccordionNestedItem label="Store B" />
  </AccordionItem>
</Accordion>`,
  withDivider: `<Accordion>
  <AccordionItem label="Parent Item" badge={2} hasLeading defaultExpanded>
    <AccordionNestedItem label="Child Item" checked />
    <AccordionDivider />
    <AccordionNestedItem label="Child Item" />
  </AccordionItem>
  <AccordionDivider />
  <AccordionItem label="Parent Item" badge={0} hasLeading />
</Accordion>`,
  sizes: `{/* Medium */}
<AccordionItem size="md" label="Parent Item" badge={2} hasLeading />

{/* Large */}
<AccordionItem size="lg" label="Parent Item" badge={2} hasLeading />`,
};
