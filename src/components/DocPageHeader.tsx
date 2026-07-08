import React from 'react';
import { useLocation } from '@docusaurus/router';

interface Tab {
  label: string;
  href: string;
}

interface DocPageHeaderProps {
  section?: string;
  title?: string;
  description?: string;
  tabs?: Tab[];
}

const defaultTabs: Tab[] = [
  { label: 'Semantic Token', href: '' },
  { label: 'Example', href: '' },
];

export function DocPageHeader({ section, title, description, tabs }: DocPageHeaderProps): React.ReactElement {
  const { pathname } = useLocation();
  const resolvedTabs = tabs ?? defaultTabs;

  return (
    <div className="icono-page-header">
      <div className="icono-page-header__label">{section ?? 'Foundation'}</div>
      <div className="icono-page-header__title-block">
        <h1 className="icono-page-header__title">{title ?? ''}</h1>
        {description && (
          <p className="icono-page-header__desc">{description}</p>
        )}
      </div>
      <div className="icono-page-header__tabs">
        <div className="icono-page-header__tabs-inner">
          {resolvedTabs.map((tab) => {
            const isActive = tab.href ? pathname === tab.href || pathname === tab.href + '/' : tab.label === 'Semantic Token';
            return tab.href ? (
              <a
                key={tab.label}
                href={tab.href}
                className={`icono-page-header__tab${isActive ? ' icono-page-header__tab--active' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                <span>{tab.label}</span>
                {isActive && <div className="icono-page-header__tab-indicator" />}
              </a>
            ) : (
              <div
                key={tab.label}
                className={`icono-page-header__tab${isActive ? ' icono-page-header__tab--active' : ''}`}
              >
                <span>{tab.label}</span>
                {isActive && <div className="icono-page-header__tab-indicator" />}
              </div>
            );
          })}
        </div>
        <div className="icono-page-header__divider" />
      </div>
    </div>
  );
}
