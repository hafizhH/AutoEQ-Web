import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const types = ['earbud','inear','onear'];

export default function SelectType(props) {
  const [selType, setSelType] = useState('');

  useEffect (() => {
    const gselType = sessionStorage.getItem('selType');
    if (gselType !== null) setSelType(gselType);
  }, []);

  useEffect (() => {
    sessionStorage.setItem('selType', selType);
  }, [selType]);

  const navNextPage = (page) => {
    if (sessionStorage.getItem('selType') !== '')
      props.changePage(page);
    else
      alert('Please select device type');
  }

  return (
    <div id="select-type" className={styles.page}>
      <div className={styles.pageContainer}>
        <span className={styles.header2}>Select Device Type</span>
        <ul className={styles.ulist}>
          {types.map((name, index) => {
            return <li key={index} className={`${styles.ulistItem} ${(name === selType ? styles.ulistItemSelected:'')}`} onClick={() => setSelType(name)}>{name}</li>
          })}
        </ul>
      </div>
      <div className={styles.navigate}>
        <button className={`${styles.button} ${styles.floatLeft}`} onClick={() => props.changePage('SelectSource')}>Back</button>
        <button className={`${styles.button} ${styles.floatRight}`} onClick={() => navNextPage('SelectModel')}>Continue</button>
      </div>
    </div>
  );
}