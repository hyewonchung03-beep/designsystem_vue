import React from 'react';
import clsx from 'clsx';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

export default function DocRootLayoutMain({
  hiddenSidebarContainer,
  children,
}: {
  hiddenSidebarContainer: boolean;
  children: React.ReactNode;
}) {
  const sidebar = useDocsSidebar();

  return (
    <main
      className={clsx(
        styles.docMain,
        styles.docMainContainer,
        (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced,
      )}
    >
      <div
        className={clsx(
          'container padding-top--md padding-bottom--lg',
          styles.docMainWrapper,
          hiddenSidebarContainer && styles.docMainWrapperEnhanced,
        )}
      >
        <div className={styles.docContentWrapper}>{children}</div>
      </div>
    </main>
  );
}
