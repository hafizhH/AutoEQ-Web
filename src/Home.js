import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Cookies from 'js-cookie'
import axios from 'axios';
export default function Home(props) {
  const [presetName, setPresetName] = useState('');

  useEffect (() => {
    const gpresetName = sessionStorage.getItem('presetName');
    if (gpresetName != null) setPresetName(gpresetName);
  }, []);

  useEffect (() => {
    sessionStorage.setItem('presetName', presetName.toString());
    sessionStorage.setItem('csrftoken',Cookies.get('csrftoken'))
    sessionStorage.setItem('maxGain',6.0);
    sessionStorage.setItem('bassBoost',0.0);
    sessionStorage.setItem('tilt',0.0);
    sessionStorage.setItem('trebleMaxGain',6.0);
    sessionStorage.setItem('trebleGainCoef',1.0);
    sessionStorage.setItem('trebleTransFreqStart',6000.0);
    sessionStorage.setItem('trebleTransFreqEnd',8000.0);
    sessionStorage.setItem('geq',1);
    sessionStorage.setItem('peq',0);
    sessionStorage.setItem('ceq',0);
    sessionStorage.setItem('feq',0);
    sessionStorage.setItem('maxFilters','5+5');
    sessionStorage.setItem('samplingRate',48000);
    sessionStorage.setItem('frequency','31.25,62.5,125,250,500,1000,2000,4000,8000,16000');
    sessionStorage.setItem('freqQ','1.41');

    axios.get('getKey').then((response)=>{
      sessionStorage.setItem('skey',response.data.skey);
    })
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