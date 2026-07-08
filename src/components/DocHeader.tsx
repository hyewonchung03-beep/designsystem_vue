import React from 'react';
import styles from './DocHeader.module.css';

interface TabItem {
  id: string;
  label: string;
}

interface DocHeaderProps {
  title: string;
  subtitle?: string;
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function DocHeader({
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
}: DocHeaderProps): React.ReactElement {
  return (
    <div className={styles.header}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      <div className={styles.tabsSection}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
