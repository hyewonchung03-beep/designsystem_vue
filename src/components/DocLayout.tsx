import React, { ReactNode } from 'react';
import styles from './DocLayout.module.css';

interface DocLayoutProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

export default function DocLayout({ sidebar, header, children }: DocLayoutProps): React.ReactElement {
  return (
    <div className={styles.docContainer}>
      <aside className={styles.sidebar}>
        {sidebar}
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.header}>
          {header}
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
