import React from 'react';

export type CardDocDemoProps = {
  size?: 'small' | 'medium' | 'large' | 'horizontal';
  state?: 'enabled' | 'hover' | 'focused' | 'disabled';
  image?: boolean;
  badge?: boolean;
  metadata?: boolean;
  description?: boolean;
  title?: string;
};

export function CardImageIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="5" y="6" width="22" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="13" r="2.2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 23l6.2-6.2a1.5 1.5 0 0 1 2.1 0L19 19.5l2.1-2.1a1.5 1.5 0 0 1 2.1 0L27 21.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CardDocDemo({
  size = 'medium',
  state = 'enabled',
  image = true,
  badge = true,
  metadata = true,
  description = true,
  title = 'Card Title',
}: CardDocDemoProps): React.ReactElement {
  return (
    <article className={[
      'card-doc-demo',
      `card-doc-demo--${size}`,
      `card-doc-demo--${state}`,
      !image ? 'card-doc-demo--no-image' : '',
    ].filter(Boolean).join(' ')} aria-disabled={state === 'disabled'}>
      {image && (
        <div className="card-doc-demo__image">
          <CardImageIcon />
        </div>
      )}
      <div className="card-doc-demo__body">
        <div className="card-doc-demo__meta-row">
          {badge && <span className="card-doc-demo__badge">Badge</span>}
          {metadata && <span className="card-doc-demo__metadata">Updated May 24</span>}
        </div>
        <strong>{title}</strong>
        {description && <p>Card Description Text Here</p>}
      </div>
    </article>
  );
}

function ExampleWrap({children}: {children: React.ReactNode}): React.ReactElement {
  return <div className="card-example-wrap">{children}</div>;
}

export function BasicCardExample(): React.ReactElement {
  return (
    <ExampleWrap>
      <CardDocDemo />
    </ExampleWrap>
  );
}

export function CardWithoutImageExample(): React.ReactElement {
  return (
    <ExampleWrap>
      <CardDocDemo image={false} />
    </ExampleWrap>
  );
}

export function CardHorizontalExample(): React.ReactElement {
  return (
    <ExampleWrap>
      <CardDocDemo size="horizontal" />
    </ExampleWrap>
  );
}

export function CardStatesExample(): React.ReactElement {
  return (
    <ExampleWrap>
      <div className="card-example-state-list">
        <CardDocDemo size="horizontal" state="enabled" />
        <CardDocDemo size="horizontal" state="hover" />
        <CardDocDemo size="horizontal" state="focused" />
        <CardDocDemo size="horizontal" state="disabled" />
      </div>
    </ExampleWrap>
  );
}

export const cardSourceMap = {
  basic: `<Card>
  <Card.Image alt="Store overview" />
  <Card.Badge>Badge</Card.Badge>
  <Card.Metadata>Updated May 24</Card.Metadata>
  <Card.Title>Card Title</Card.Title>
  <Card.Description>Card Description Text Here</Card.Description>
</Card>`,
  withoutImage: `<Card>
  <Card.Badge>Badge</Card.Badge>
  <Card.Metadata>Updated May 24</Card.Metadata>
  <Card.Title>Card Title</Card.Title>
  <Card.Description>Card Description Text Here</Card.Description>
</Card>`,
  horizontal: `<Card orientation="horizontal">
  <Card.Image alt="Store overview" />
  <Card.Content>
    <Card.Badge>Badge</Card.Badge>
    <Card.Metadata>Updated May 24</Card.Metadata>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card Description Text Here</Card.Description>
  </Card.Content>
</Card>`,
  states: `<Card interactive>Enabled</Card>
<Card interactive state="hover">Hover</Card>
<Card interactive state="focused">Focused</Card>
<Card disabled>Disabled</Card>`,
};
