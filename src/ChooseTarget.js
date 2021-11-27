import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

export default function ChooseTarget(props) {
  const [targetList, setTargetList] = useState([]);
  const [selTarget, setSelTarget] = useState('');
  const [targetFileName, setTargetFileName] = useState('No file selected');
  const [requestStatus, setRequestStatus] = useState('');

  useEffect (() => {
    document.getElementById('measure-graph').src = sessionStorage.getItem('measureGraphURL');

    const gselTarget = sessionStorage.getItem('selTarget');
    if (gselTarget != null) setSelTarget(gselTarget);

    const gTargetFileName = sessionStorage.getItem('targetFileName');
    if (gTargetFileName != null) setTargetFileName(gTargetFileName);

    axios.get('http://localhost:8000/targetList')
    .then((response) => {
      if (response.status === 200)
        setTargetList(response.data.targetList);
    }).catch((err) => console.log(err.message));
  }, []);

  const handleSelTargetChange = (event) => {
    axios.post('http://localhost:8000/uploadClientData',
    {
      target: event.target.value
    }
    ).then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem('selTarget', event.target.value);
        sessionStorage.setItem('targetFileName', 'No file selected');
        sessionStorage.setItem('targetGraphURL', response.data.imgurl);
        document.getElementById('target-graph').src = sessionStorage.getItem('targetGraphURL');
        setSelTarget(event.target.value);
        setTargetFileName('No file selected');
        setRequestStatus('Success');
      }
    }).catch(err => console.log(err.message));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    axios({
      method: 'post',
      url: 'http://localhost:8000/uploadCustomTarget',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem('selTarget', '');
        sessionStorage.setItem('targetFileName', event.target.files[0].name);
        sessionStorage.setItem('targetGraphURL', response.data.imgurl);
        document.getElementById('target-graph').src = sessionStorage.getItem('targetGraphURL');
        setTargetFileName(event.target.files[0].name);
        setSelTarget('');
        setRequestStatus('Success');
      }
    }).catch((err) => console.log(err.message));
  }

  const navNextPage = (page) => {
    if (requestStatus === 'Success')
      props.changePage(page);
    else {
      alert('Please input target measurement');
      props.changePage(page); //Untuk debugging, hapus saat build
    }
  }

  return (
    <div id="choose-target" className={styles.page}>
      <div className={styles.pageContainer}>
        <div className={`${styles.floatLeft} ${styles.addHMargin}`}>
          <img id="measure-graph" alt="measure-graph" src={sessionStorage.getItem('measureGraphURL')} className={styles.imgGraph3x4}/>
          <span className={`${styles.header2} ${styles.centerBlock} ${styles.addVMargin}`}>Measure</span>
        </div>
        <div className={`${styles.floatRight} ${styles.addHMargin}`}>
          <img id="target-graph" alt="target-graph" src={(sessionStorage.getItem('targetGraphURL') !== null ? sessionStorage.getItem('targetGraphURL') : '')} className={styles.imgGraph3x4}/>
          <span className={`${styles.header2} ${styles.centerBlock} ${styles.addVMargin}`}>Target</span>
          <select name="measure" className={`${styles.dropdown} ${styles.text2}`} defaultValue={(selTarget === '' ? 'Select Target' : selTarget)} onChange={handleSelTargetChange}>
            {targetList.map((name, index) => {
              return <option key={index} className={`${styles.text2}`} value={name}>{name}</option>
            })}
          </select>
          <br/>
          <span className={`${styles.text1} ${styles.centerBlock} ${styles.addVMargin}`}>or</span>
          <form enctype="multipart/form-data" onSubmit={handleSubmit} className={styles.centerBlock}>
            <label htmlFor="targetCSV" className={`${styles.button} ${styles.centerBlock}`}>Upload</label>
            <input type="file" id="targetCSV" className={styles.hidden} name="targetCSV" accept=".csv" onChange={(event) => setTargetFileName(event.target.value)} />
            <span className={`${styles.text1} ${styles.centerBlock} ${styles.addVMargin}`}>{targetFileName}</span>
            <button className={`${styles.button} ${styles.centerBlock} ${(targetFileName === 'No file selected' ? styles.hidden : '')}`}>Confirm</button>
          </form>
          <br/>
        </div>
      </div>
      <div className={styles.navigate}>
        <button className={`${styles.button} ${styles.floatLeft}`} onClick={() => props.changePage('SelectModel')}>Back</button>
        <button className={`${styles.button} ${styles.floatRight}`} onClick={() => navNextPage('Customize')}>Continue</button>
      </div>
    </div>
  );
}