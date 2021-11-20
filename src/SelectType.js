import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const type = ['Earbud','In-Ear','On-Ear'];

export default function SelectType(props) {
  const [selType, setSelType] = useState(0);

  useEffect (() => {
    const gselType = sessionStorage.getItem('selType');
    if (gselType !== null) setSelType(Number.parseInt(gselType));
  }, []);

  useEffect (() => {
    sessionStorage.setItem('selType', selType.toString());
  }, [selType]);

  return (
    <div id="select-type" className={styles.page}>
      <div className={styles.pageContainer}>
        <span className={styles.header2}>Select Device Type</span>
        <ul className={styles.ulist}>
          {type.map((name, index) => {
            return <li key={index} className={styles.ulistItem} onClick={() => setSelType(index)}>{name}</li>
          })}
        </ul>
      </div>
      <div className={styles.navigate}>
        <button className={`${styles.button} ${styles.floatLeft}`} onClick={() => props.changePage('SelectSource')}>Back</button>
        <button className={`${styles.button} ${styles.floatRight}`} onClick={() => props.changePage('SelectModel')}>Continue</button>
      </div>
    </div>
  );
}