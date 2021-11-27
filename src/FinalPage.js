import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function FinalPage(props) {
  const [presetName, setPresetName] = useState('');

  useEffect (() => {
    const gpresetName = sessionStorage.getItem('presetName');
    if (gpresetName != null) setPresetName(gpresetName);
  }, []);

  return (
    <div id="final-page" className={styles.page}>
      <div className={`${styles.centerBlock} ${styles.pageContainer}`}>
        <div className={`${styles.centerBlock} ${styles.addHMargin}`}>
          <img alt="preview-graph" className={styles.imgGraph2x3}/>
        </div>
        <span className={`${styles.text1} ${styles.centerBlock} ${styles.addVMargin}`}>{presetName}</span>
        <br/>
      </div>
      <div className={styles.navigate}>
        <button className={`${styles.button} ${styles.centerBlock}`} onClick={() => props.changePage('Customize')}>Download</button>
      </div>
    </div>
  );
}