import React, { ReactNode } from 'react';
import styles from './DocSection.module.css';

interface DocSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

function DocSection({
  id,
  title,
  subtitle,
  children,
}: DocSectionProps): React.ReactElement {
  return (
    <section id={id} className={styles.section}>
      {(title || subtitle) && (
        <div className={styles.sectionHeader}>
          {title && <h2 className={styles.sectionTitle}>{title}</h2>}
          {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.sectionContent}>
        {children}
      </div>
    </section>
  );
}

export { DocSection };
export default DocSection;
