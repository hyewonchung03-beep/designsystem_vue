import React, { Children, ReactElement, ReactNode, isValidElement, useState } from 'react';

type DocTabProps = {
  id: string;
  label: string;
  children: ReactNode;
};

type DocTabsProps = {
  defaultActiveId?: string;
  children: ReactNode;
};

export function DocTab({ children }: DocTabProps): React.ReactElement {
  return <>{children}</>;
}

function isDocTabElement(node: ReactNode): node is ReactElement<DocTabProps> {
  return isValidElement(node) && node.type === DocTab;
}

export function DocTabs({ defaultActiveId, children }: DocTabsProps): React.ReactElement {
  const tabs = Children.toArray(children).filter(isDocTabElement);
  const firstTabId = tabs[0]?.props.id ?? '';
  const [activeId, setActiveId] = useState(defaultActiveId ?? firstTabId);

  return (
    <div className="doc-tabs">
      <div className="doc-tablist" role="tablist" aria-label="Documentation tabs">
        {tabs.map((tab) => {
          const selected = tab.props.id === activeId;
          return (
            <button
              key={tab.props.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`doc-tab-panel-${tab.props.id}`}
              id={`doc-tab-${tab.props.id}`}
              className={`doc-tab${selected ? ' doc-tab--selected' : ''}`}
              onClick={() => setActiveId(tab.props.id)}
            >
              <span>{tab.props.label}</span>
              {selected && <span className="doc-tab-indicator" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      <div className="doc-tab-divider" />

      {tabs.map((tab) => {
        const selected = tab.props.id === activeId;
        return (
          <div
            key={tab.props.id}
            role="tabpanel"
            id={`doc-tab-panel-${tab.props.id}`}
            aria-labelledby={`doc-tab-${tab.props.id}`}
            hidden={!selected}
            className="doc-tab-panel"
          >
            {tab.props.children}
          </div>
        );
      })}
    </div>
  );
}

DocTabs.Tab = DocTab;

export type { DocTabProps };
