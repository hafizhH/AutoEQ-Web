import React, { useState } from 'react';
import styles from './styles.module.css';

export default function Home(props) {
  const [file, setFile] = useState('No file selected');

  const uploadChanged = (event) => {
    setFile(event.target.files[0].name);
    props.changePage('ChooseTarget');
  }

  return (
    <div id="home" className={styles.page}>
      <div className={styles.pageContainer}>
        <button className={`${styles.centerBlock} ${styles.button} ${styles.addVMargin}`} onClick={() => props.changePage('SelectSource')}>Choose Measurement</button>
        <span className={`${styles.centerBlock} ${styles.text1}`}>or</span>
        <label htmlFor="chooseCSV" className={`${styles.centerBlock} ${styles.button} ${styles.addVMargin}`}>Upload CSV</label>
        <div className={styles.centerBlock}>
          <input type="file" id="chooseCSV" className={styles.hidden} name="chooseCSV" accept=".csv" onChange={uploadChanged} />
          <span className={styles.text1}>{file}</span>
        </div>
        <br/>
      </div>
      <div className={styles.navigate}>
        
      </div>
    </div>
  );
}