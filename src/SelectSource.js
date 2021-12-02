import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const sampleSource = ['headphonecom', 'innerfidelity', 'oratory1990'];

export default function SelectSource(props) {
  const [sourcelist, setSourcelist] = useState([]);
  const [selSource, setSelSource] = useState('');

  useEffect (() => {
    axios.get('getDirSource')
    .then((response) => {
      if (response.status === 200)
        setSourcelist(response.data.sourcelist);
    }).catch((err) => {
      console.log(err.message);
      setSourcelist(sampleSource);
    });

    const gselSource = sessionStorage.getItem('selSource');
    if (gselSource !== null) setSelSource(gselSource);
  }, []);

  useEffect (() => {
    sessionStorage.setItem('selSource', selSource);
  }, [selSource]);

  const navNextPage = (page) => {
    if (sessionStorage.getItem('selSource') !== '')
      props.changePage(page);
    else
      alert('Please select measurement source');
  }

  return (
    <div id="select-source" className={styles.page}>
      <div className={`${styles.pageContainer}`}>
        <span className={`${styles.header2} ${styles.centerBlock}`}>Select Measurement Source</span>
        <ul className={`${styles.ulist}`}>
          {sourcelist.map((name, index) => {
            return <li key={index} className={`${styles.ulistItem} ${(name === selSource ? styles.ulistItemSelected : '')}`} onClick={() => setSelSource(sourcelist[index])}>{name}</li>
          })}
        </ul>
      </div>
      <div className={styles.navigate}>
        <button className={`${styles.button} ${styles.floatLeft}`} onClick={() => props.changePage('SelectMeasurement')}>Back</button>
        <button className={`${styles.button} ${styles.floatRight}`} onClick={() => navNextPage('SelectType')}>Continue</button>
      </div>
    </div>
  );
}