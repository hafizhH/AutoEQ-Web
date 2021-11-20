import react, { useState } from 'react';
import './Layout.css';
import styles from './styles.module.css';

export default function Layout(props) {
  return (
    <div id="main-container">
      <h1 className={`${styles.header1L} ${styles.centerBlock} ${styles.addVMargin}`}>AutoEQ-<span className={styles.blueText}>Web</span></h1>
      {props.childComponent}
    </div>
  );
}