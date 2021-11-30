import axios from 'axios';
import React, { useState } from 'react';
import styles from './styles.module.css';

export default function SelectMeasurement(props) {
  const [customCSVFileName, setCustomCSVFileName] = useState('No file selected');
  const [uploadStatus, setUploadStatus] = useState('');
  
  const uploadChanged = (event) => {
    setCustomCSVFileName(event.target.files[0].name);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    formData.append('presetName', sessionStorage.getItem('presetName'));
    formData.append('skey',sessionStorage.getItem('skey'));
    setUploadStatus('Uploading to server');
    axios({
      method: 'post',
      url: 'http://localhost:8000/uploadmeasurement',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data', 'X-CSRFToken': sessionStorage.getItem('csrftoken') },
    }).then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem('customCSVFileName', customCSVFileName);
        sessionStorage.setItem('measureGraphURL', response.data.imgurl);
        console.log(response.data)
        props.changePage('ChooseTarget');
        setUploadStatus('Upload success');
      }
    }).catch((e) => {
      console.log(e.message);
      sessionStorage.setItem('imgurl', '/');
      setUploadStatus('Error occured while uploading to server');
    });
  }

  return (
    <div id="select-measurement" className={styles.page}>
      <div className={styles.pageContainer}>
        <button className={`${styles.centerBlock} ${styles.button} ${styles.addVMargin}`} onClick={() => props.changePage('SelectSource')}>Choose Measurement</button>
        <span className={`${styles.centerBlock} ${styles.text1}`}>or</span>
        <label htmlFor="measurementCSV" className={`${styles.centerBlock} ${styles.button} ${styles.addVMargin}`}>Upload CSV</label>
        <form enctype="multipart/form-data" onSubmit={handleSubmit} className={styles.centerBlock}>
          <input type="file" id="measurementCSV" className={styles.hidden} name="measurementCSV" accept=".csv" onChange={uploadChanged} />
          <span className={styles.text1}>{customCSVFileName}</span>
          <button className={`${styles.button} ${styles.centerBlock} ${(customCSVFileName === 'No file selected' ? styles.hidden : '')}`}>Confirm</button>
        </form>
        <br/><br/>
      </div>
      <div className={styles.navigate}>
        <button className={`${styles.button} ${styles.centerBlock}`} onClick={() => props.changePage('Home')}>Back</button>
      </div>
    </div>
  );
}