import React, {type ReactNode} from 'react';
import {DocTabs, DocTab} from '@site/src/components/DocTabs';
import {DocSection} from '@site/src/components/DocSection';

export function ComponentGuideLayout({
  category,
  title,
  description,
  className,
  children,
}: {
  category: string;
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
}): React.ReactElement {
  return (
    <DocSection>
      <div className={`button-guide-page${className ? ` ${className}` : ''}`}>
        <header className="button-guide-header">
          <div className="button-guide-header__category">{category}</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        {children}
      </div>
    </DocSection>
  );
}

export function ComponentGuideTabs({
  guideline,
  example,
  exampleId = 'example',
  exampleLabel = 'Example',
  defaultActiveId = 'guideline',
}: {
  guideline: ReactNode;
  example: ReactNode;
  exampleId?: string;
  exampleLabel?: string;
  defaultActiveId?: string;
}): React.ReactElement {
  return (
    <DocTabs defaultActiveId={defaultActiveId}>
      <DocTab id="guideline" label="Guideline">
        <div className="button-guide-tab">{guideline}</div>
      </DocTab>

      <DocTab id={exampleId} label={exampleLabel}>
        <div className="button-example-tab">{example}</div>
      </DocTab>
    </DocTabs>
  );
}

export function SectionBlock({title, children, className}: {title: string; children: ReactNode; className?: string}): React.ReactElement {
  return (
    <section className={`button-guide-section${className ? ` ${className}` : ''}`}>
      <h2>{title}</h2>
      <div className="button-guide-section__content">{children}</div>
    </section>
  );
}

function StatusHeader({type}: {type: 'do' | 'dont'}): React.ReactElement {
  const isDo = type === 'do';

  return (
    <div className={`button-example-header button-example-header--${type}`} data-type={isDo ? 'green' : 'red'}>
      <div className="button-example-header__row">
        <span className="button-example-header__icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={isDo
                ? 'M11.9998 4.25C7.71955 4.25 4.24976 7.71979 4.24976 12C4.24976 16.2802 7.71955 19.75 11.9998 19.75C16.28 19.75 19.7498 16.2802 19.7498 12C19.7498 7.71979 16.28 4.25 11.9998 4.25ZM2.74976 12C2.74976 6.89137 6.89112 2.75 11.9998 2.75C17.1084 2.75 21.2498 6.89137 21.2498 12C21.2498 17.1086 17.1084 21.25 11.9998 21.25C6.89112 21.25 2.74976 17.1086 2.74976 12ZM16.3551 9.98033L11.2551 15.0803C10.9622 15.3732 10.4873 15.3732 10.1944 15.0803L7.64443 12.5303L8.70509 11.4697L10.7248 13.4893L15.2944 8.91967L16.3551 9.98033Z'
                : 'M19.7498 12C19.7498 7.71979 16.28 4.25 11.9998 4.25C7.71955 4.25 4.24976 7.71979 4.24976 12C4.24976 16.2802 7.71955 19.75 11.9998 19.75C16.28 19.75 19.7498 16.2802 19.7498 12ZM21.2498 12C21.2498 17.1086 17.1084 21.25 11.9998 21.25C6.89112 21.25 2.74976 17.1086 2.74976 12C2.74976 6.89137 6.89112 2.75 11.9998 2.75C17.1084 2.75 21.2498 6.89137 21.2498 12Z'}
            />
            {!isDo && <path d="M16.0607 8.99995L9.0002 16.0605L7.93965 15L15.0002 7.9394L16.0607 8.99995Z" />}
          </svg>
        </span>
        <span className="button-example-header__text">{isDo ? 'Do' : "Don't"}</span>
      </div>
      <div className="button-example-header__divider" />
    </div>
  );
}

export function DoDontCard({type, title, children}: {type: 'do' | 'dont'; title: string; children: ReactNode}): React.ReactElement {
  return (
    <article className={`button-guide-card button-guide-card--${type}`}>
      <StatusHeader type={type} />
      <h3>{title}</h3>
      <div className="button-guide-card__artwork">{children}</div>
    </article>
  );
}
