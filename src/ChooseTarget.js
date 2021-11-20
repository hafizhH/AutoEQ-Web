import React, { useState } from 'react';
import styles from './styles.module.css';

export default function ChooseTarget(props) {
  const [file, setFile] = useState('No file selected');

  return (
    <div id="choose-target" className={styles.page}>
      <div className={styles.pageContainer}>
        <div className={`${styles.floatLeft} ${styles.addHMargin}`}>
          <img alt="measure-graph" className={styles.imgGraph3x4}/>
          <span className={`${styles.header2} ${styles.addVMargin}`}>Measure</span>
        </div>
        <div className={`${styles.floatRight} ${styles.addHMargin}`}>
          <img alt="target-graph" className={styles.imgGraph3x4}/>
          <span className={`${styles.header2} ${styles.addVMargin}`}>Target</span>
          <select name="measure" className={`${styles.dropdown} ${styles.text2}`} defaultValue="Select Target">
            <option value="none">Select Target</option>
          </select>
          <br/>
          <span className={styles.text1}>or</span>
          <label htmlFor="chooseTarget" className={styles.button}>Upload</label>
          <input type="file" id="chooseTarget" className={styles.hidden} name="chooseTarget" accept=".csv" onChange={(event) => setFile(event.target.files[0].name)} />
          {file}
        </div>
      </div>
      <div className={styles.navigate}>
        <button className={`${styles.button} ${styles.floatLeft}`} onClick={() => props.changePage('SelectModel')}>Back</button>
        <button className={`${styles.button} ${styles.floatRight}`} onClick={() => props.changePage('Customize')}>Continue</button>
      </div>
    </div>
  );
}