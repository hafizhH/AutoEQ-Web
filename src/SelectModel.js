import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const sampleModels = ['AKG K240','AKG K250','AKG K271'];  //Hapus saat build

export default function SelectModel(props) {
  const [models, setModels] = useState([]);
  const [selModel, setSelModel] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect (() => {
    const selSource = sessionStorage.getItem('selSource');
    axios.get('http://localhost:8000/getDirData/' + selSource)
    .then((response) => {
      if (response.status === 200) {
        const selType = sessionStorage.getItem('selType');
        if (selType === 'earbud') setModels(response.data.earbud);
        else if (selType === 'inear') setModels(response.data.inear);
        else if (selType === 'onear') setModels(response.data.onear);
      }
    }).catch((err) => {
      console.log(err.message);
      setModels(sampleModels);
      
    });
    const gselModel = sessionStorage.getItem('selModel');
    if (gselModel != null) setSelModel(gselModel);
  }, []);

  useEffect (() => {
    sessionStorage.setItem('selModel', selModel);
  }, [selModel]);

  const navNextPage = (page) => {
    const source = sessionStorage.getItem('selSource');
    const type = sessionStorage.getItem('selType');
    const gselModel = sessionStorage.getItem('selModel');
    if (gselModel !== '') {
      setUploadStatus('Uploading to server');
      axios.post('http://localhost:8000/updateData', 
      {
        source: source,
        type: type,
        model: gselModel,
        skey: sessionStorage.getItem('skey'),
        presetName: sessionStorage.getItem('presetName')        
      },{
        headers: {'X-CSRFToken': sessionStorage.getItem('csrftoken')}
      }
      ).then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem('measureGraphURL', response.data.imgurl);
          setUploadStatus('Upload Success');
          console.log("choose success")
          props.changePage(page);
        }
      }).catch((err) => {
        console.log(err.message);
        setUploadStatus('Error occured while uploading to server');
        //props.changePage(page); //Hapus saat build
      })
    }
    else
      alert('Please select model');
  }

  return (
    <div id="select-model" className={styles.page}>
      <div className={styles.pageContainer}>
        <span className={styles.header2}>Select Device Model</span>
        <ul className={styles.ulist}>
          {models.map((name, index) => {
            return <li key={index} className={`${styles.ulistItem} ${(name === selModel ? styles.ulistItemSelected:'')}`} onClick={() => setSelModel(name)}>{name}</li>
          })}
        </ul>
      </div>
      <div className={styles.navigate}>
        <button className={`${styles.button} ${styles.floatLeft}`} onClick={() => props.changePage('SelectType')}>Back</button>
        <button className={`${styles.button} ${styles.floatRight}`} onClick={() => navNextPage('ChooseTarget')}>Continue</button>
      </div>
    </div>
  );
}