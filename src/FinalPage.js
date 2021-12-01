import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function FinalPage(props) {
  const [presetName, setPresetName] = useState('');
  const [finalGraphURL, setFinalGraphURL] = useState('');
  const [downloadURL, setDownloadURL] = useState('');

  useEffect (() => {
    setPresetName(sessionStorage.getItem('presetName'));
    setFinalGraphURL(sessionStorage.getItem('finalGraphURL'));
    setDownloadURL(sessionStorage.getItem('downloadURL'));
  }, []);

  return (
    <div id="final-page" className={styles.page}>
      <div className={`${styles.centerBlock} ${styles.pageContainer}`}>
        <div className={`${styles.centerBlock} ${styles.addHMargin}`}>
          <img id="final-graph" src={finalGraphURL} alt="final-graph" className={styles.imgGraph2x3}/>
        </div>
        <span className={`${styles.text1} ${styles.centerBlock} ${styles.addVMargin}`}>{presetName}</span>
        <br/>
      </div>
      <div className={styles.navigate}>
        <a href={downloadURL} className={`${styles.button} ${styles.centerBlock} ${styles.noTextDecoration}`}>Download</a>
      </div>
    </div>
  );
}