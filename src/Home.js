import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function Home(props) {
  const [presetName, setPresetName] = useState('');

  useEffect (() => {
    const gpresetName = sessionStorage.getItem('presetName');
    if (gpresetName != null) setPresetName(gpresetName);
  }, []);

  useEffect (() => {
    sessionStorage.setItem('presetName', presetName.toString());
  }, [presetName]);

  const navNextPage = (page) => {
    if (sessionStorage.getItem('presetName') !== '')
      props.changePage(page);
    else
      alert('Please input preset name');
  }

  return (
    <div id="home" className={styles.page}>
      <div className={`${styles.centerBlock} ${styles.pageContainer}`}>
        <label htmlFor="presetName" className={`${styles.text1} ${styles.centerBlock} ${styles.addVMargin}`}>Name a Preset</label>
        <input type="text" id="presetName" className={`${styles.textInput} ${styles.addVMargin}`} defaultValue={presetName} onChange={(event) => setPresetName(event.target.value)}></input>
        <br/>
      </div>
      <div className={styles.navigate}>
        <button className={`${styles.button} ${styles.centerBlock}`} onClick={() => navNextPage('SelectMeasurement')}>Get Started</button>
      </div>
    </div>
  );
}