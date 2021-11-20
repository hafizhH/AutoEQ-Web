import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const source = ['headphonecom', 'innerfidelity', 'oratory1990', 'referenceaudioanalyzer', 'rtings'];

export default function SelectSource(props) {
  const [selSource, setSelSource] = useState(0);

  useEffect (() => {
    const gselSource = sessionStorage.getItem('selSource');
    if (gselSource !== null) setSelSource(Number.parseInt(gselSource));
  }, []);

  useEffect (() => {
    sessionStorage.setItem('selSource', selSource.toString());
  }, [selSource]);

  return (
    <div id="select-source" className={styles.page}>
      <div className={`${styles.pageContainer}`}>
        <span className={`${styles.header2} ${styles.centerBlock}`}>Select Measurement Source</span>
        <ul className={`${styles.ulist}`}>
          {source.map((name, index) => {
            return <li key={index} className={`${styles.ulistItem} ${(index === selSource) ? styles.ullistItemSelected : ''}`} onClick={() => setSelSource(index)}>{name}</li>
          })}
        </ul>
      </div>
      <div className={styles.navigate}>
        <button className={`${styles.button} ${styles.floatLeft}`} onClick={() => props.changePage('Home')}>Back</button>
        <button className={`${styles.button} ${styles.floatRight}`} onClick={() => props.changePage('SelectType')}>Continue</button>
      </div>
    </div>
  );
}