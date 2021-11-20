import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const models = ['AKG K240','AKG K250','AKG K271'];

export default function SelectModel(props) {
  const [selModel, setSelModel] = useState(0);

  useEffect (() => {
    const gselModel = sessionStorage.getItem('selModel');
    if (gselModel !== null) setSelModel(Number.parseInt(gselModel));
  }, []);

  useEffect (() => {
    sessionStorage.setItem('selModel', selModel.toString());
  }, [selModel]);

  return (
    <div id="select-model" className={styles.page}>
      <div className={styles.pageContainer}>
        <span className={styles.header2}>Select Device Model</span>
        <ul className={styles.ulist}>
          {models.map((name, index) => {
            return <li key={index} className={styles.ulistItem} onClick={() => setSelModel(index)}>{name}</li>
          })}
        </ul>
      </div>
      <div className={styles.navigate}>
        <button className={`${styles.button} ${styles.floatLeft}`} onClick={() => props.changePage('SelectType')}>Back</button>
        <button className={`${styles.button} ${styles.floatRight}`} onClick={() => props.changePage('ChooseTarget')}>Continue</button>
      </div>
    </div>
  );
}