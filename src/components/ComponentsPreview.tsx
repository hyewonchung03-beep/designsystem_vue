import React from 'react';
import styles from '@site/src/pages/components-mock.module.css';

const cards = [
  'Badge','Button','Chip','Control','Data table','Divider','Feedback','Input','Modal','Navigation','Date Picker','Popover','Loading','Tooltip','Upload'
];

export default function ComponentsPreview(): React.ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {cards.map((c) => (
          <article key={c} className={styles.card}>
            <div className={styles.preview}>
              <img src={`/img/previews/${c.toLowerCase().replace(/ /g,'-')}.svg`} alt={`${c} preview`} className={styles.previewImage} />
            </div>
            <div className={styles.cardLabel}>{c}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
