import React from 'react';
import styles from './QoverButton.module.scss';

function QoverCheckbox() {
  return (
    <span className={`${styles.QoverCheckbox}`}>
      <input type="checkbox" />
      <span className={styles.checkmark} />
    </span>
  );
}

export default QoverCheckbox;
