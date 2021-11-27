import react, { useState } from 'react';
import './Layout.css';
import styles from './styles.module.css';

export default function Layout(props) {
  return (
    <div id="main-container">
      <h1 className={`${styles.header1L} ${styles.centerBlock} ${styles.addVMargin2}`}>AutoEQ-<span className={styles.blueText}>Web</span></h1>
      <h3 className={`${styles.header3} ${styles.centerBlock} ${styles.addVMargin2}`}>Original AutoEQ code by <a href="https://github.com/jaakkopasanen/AutoEq" className={styles.link}>Jaakko Pasanen</a></h3>
      {props.childComponent}
    </div>
  );
}