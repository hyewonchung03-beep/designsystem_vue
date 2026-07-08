import React from 'react';
import styles from './DocSidebar.module.css';

interface NavItem {
  id: string;
  label: string;
  active?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface DocSidebarProps {
  sections: NavSection[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
}

export default function DocSidebar({
  sections,
  activeItem,
  onItemClick,
}: DocSidebarProps): React.ReactElement {
  return (
    <nav className={styles.sidebar}>
      {sections.map((section) => (
        <div key={section.title} className={styles.section}>
          <div className={styles.sectionTitle}>{section.title}</div>
          <ul className={styles.navList}>
            {section.items.map((item) => (
              <li key={item.id}>
                <button
                  className={`${styles.navItem} ${activeItem === item.id ? styles.active : ''}`}
                  onClick={() => onItemClick?.(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
