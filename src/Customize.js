import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function Customize(props) {
  const [file, setFile] = useState('No file selected');
  const [maxGain, setMaxGain] = useState(6.0);
  const [bassBoost, setBassBoost] = useState(0.0);
  const [tilt, setTilt] = useState(0.0);
  const [trebleMaxGain, setTrebleMaxGain] = useState(6.0);
  const [trebleGainCoef, setTrebleGainCoef] = useState(1.0);
  const [trebleTransFreqStart, setTrebleTransFreqStart] = useState(6000);
  const [trebleTransFreqEnd, setTrebleTransFreqEnd] = useState(8000);
  const [geq, setGeq] = useState(1);
  const [peq, setPeq] = useState(0);
  const [ceq, setCeq] = useState(0);
  const [feq, setFeq] = useState(0);
  const [maxFilters, setMaxFilters] = useState('5+5');
  const [samplingRate, setSamplingRate] = useState(48000);
  const [frequency, setFrequency] = useState('31.25,62.5,125,250,500,1000,2000,4000,8000,16000');
  const [freqQ, setFreqQ] = useState('1.41');
  const [requestStatus, setRequestStatus] = useState('');
  const [previewGraphURL, setPreviewGraphURL] = useState('');

  const changeOutputOptions = (event) => {
    if (event.target.checked === true) {
      if (event.target.value === 'geq') setGeq(1);
      else if (event.target.value === 'peq') setPeq(1);
      else if (event.target.value === 'ceq') setCeq(1);
      else if (event.target.value === 'feq') setFeq(1);
    } else if (event.target.checked === false) {
      if (event.target.value === 'geq') setGeq(0);
      else if (event.target.value === 'peq') setPeq(0);
      else if (event.target.value === 'ceq') setCeq(0);
      else if (event.target.value === 'feq') setFeq(0);
    }
  }

  useEffect (() => {
    const gfile = sessionStorage.getItem('file');
    if (gfile != null) setFile(gfile);

    const gmaxGain = sessionStorage.getItem('maxGain');
    if (gmaxGain != null) setMaxGain(Number.parseFloat(gmaxGain));

    const gbassBoost = sessionStorage.getItem('bassBoost');
    if (gbassBoost != null) setBassBoost(Number.parseFloat(gbassBoost));

    const gtilt = sessionStorage.getItem('tilt');
    if (gtilt != null) setTilt(Number.parseFloat(gtilt));

    const gtrebleMaxGain = sessionStorage.getItem('trebleMaxGain');
    if (gtrebleMaxGain != null) setTrebleMaxGain(Number.parseFloat(gtrebleMaxGain));

    const gtrebleGainCoef = sessionStorage.getItem('trebleGainCoef');
    if (gtrebleGainCoef != null) setTrebleGainCoef(Number.parseFloat(gtrebleGainCoef));

    const gtrebleTransFreqStart = sessionStorage.getItem('trebleTransFreqStart');
    if (gtrebleTransFreqStart != null) setTrebleTransFreqStart(Number.parseInt(gtrebleTransFreqStart));

    const gtrebleTransFreqEnd = sessionStorage.getItem('trebleTransFreqEnd');
    if (gtrebleTransFreqEnd != null) setTrebleTransFreqEnd(Number.parseInt(gtrebleTransFreqEnd));

    const ggeq = sessionStorage.getItem('geq');
    if (ggeq != null) setGeq(Number.parseInt(ggeq));
    const gpeq = sessionStorage.getItem('peq');
    if (gpeq != null) setPeq(Number.parseInt(gpeq));
    const gceq = sessionStorage.getItem('ceq');
    if (gceq != null) setCeq(Number.parseInt(gceq));
    const gfeq = sessionStorage.getItem('feq');
    if (gfeq != null) setFeq(Number.parseInt(gfeq));

    const gmaxFilters = sessionStorage.getItem('maxFilters');
    if (gmaxFilters != null) setMaxFilters(gmaxFilters);
    const gsamplingRate = sessionStorage.getItem('samplingRate');
    if (gsamplingRate != null) setSamplingRate(Number.parseInt(gsamplingRate));
    const gfrequency = sessionStorage.getItem('frequency');
    if (gfrequency != null) setFrequency(gfrequency);
    const gfreqQ = sessionStorage.getItem('freqQ');
    if (gfreqQ != null) setFreqQ(gfreqQ);

    axios.post('getCustomizePreviewGraph',{
      skey: sessionStorage.getItem('skey'),
      presetName: sessionStorage.getItem('presetName'),
    },{
      headers: {'X-CSRFToken': sessionStorage.getItem('csrftoken')}
    })
    .then((response) => {
      if (response.status === 200)
        sessionStorage.setItem('previewGraphURL', response.data.imgurl);
        setPreviewGraphURL(response.data.imgurl);
    }).catch((err) => console.log(err.message));

    console.log('Item retrieved');
  }, []);

  useEffect (() => {
    sessionStorage.setItem('file', file);
    sessionStorage.setItem('maxGain', maxGain.toString());
    sessionStorage.setItem('bassBoost', bassBoost.toString());
    sessionStorage.setItem('tilt', tilt.toString());
    sessionStorage.setItem('trebleMaxGain', trebleMaxGain.toString());
    sessionStorage.setItem('trebleGainCoef', trebleGainCoef.toString());
    sessionStorage.setItem('trebleTransFreqStart', trebleTransFreqStart.toString());
    sessionStorage.setItem('trebleTransFreqStart', trebleTransFreqStart.toString());
    sessionStorage.setItem('geq', geq.toString());
    sessionStorage.setItem('peq', peq.toString());
    sessionStorage.setItem('ceq', ceq.toString());
    sessionStorage.setItem('feq', feq.toString());

    sessionStorage.setItem('maxFilters', maxFilters.toString());
    sessionStorage.setItem('samplingRate', samplingRate.toString());
    sessionStorage.setItem('frequency', frequency);
    sessionStorage.setItem('freqQ', freqQ);
    console.log('Item saved');
  }, [file, maxGain, bassBoost, tilt, trebleMaxGain, trebleGainCoef, trebleTransFreqStart,trebleTransFreqEnd, geq, peq, ceq, feq, maxFilters, samplingRate, frequency, freqQ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    formData.append('skey',sessionStorage.getItem('skey'));
    formData.append('presetName', sessionStorage.getItem('presetName'));
    setRequestStatus('Uploading to server');
    axios({
      method: 'post',
      url: 'uploadsoundsig',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data', 'X-CSRFToken': sessionStorage.getItem('csrftoken') },
    }).then((response) => {
      if (response.status === 200) {
        setRequestStatus('Upload success');
      }
    }).catch((e) => {
      console.log(e.message);
      setRequestStatus('Error occured while uploading to server');
    });
  }

  const navNextPage = (page) => {
    setRequestStatus('Uploading to server');
      axios.post('submitcustomization', 
      {
        maxGain: maxGain,
        bassBoost: bassBoost,
        tilt: tilt,
        trebleMaxGain: trebleMaxGain,
        trebleGainCoef: trebleGainCoef,
        trebleTransFreqStart: trebleTransFreqStart,
        trebleTransFreqEnd: trebleTransFreqEnd,
        geq: 1,
        peq: peq,
        ceq: ceq,
        feq: feq,
        maxFilters: (peq === 1 ? maxFilters : -1),
        samplingRate: (ceq === 1 ? samplingRate : -1),
        frequency: (feq === 1 ? frequency : ''),
        freqQ: (feq === 1 ? freqQ : ''),
        presetName:sessionStorage.getItem('presetName'),
        skey:sessionStorage.getItem('skey'),
      },{
        headers: {'X-CSRFToken': sessionStorage.getItem('csrftoken')}
      }
      ).then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem('finalGraphURL', response.data.imgurl);
          sessionStorage.setItem('downloadURL', response.data.downloadurl);
          setRequestStatus('Upload Success');
          props.changePage(page);
        }
      }).catch((err) => {
        console.log(err.message);
        setRequestStatus('Error occured while uploading to server');
        //props.changePage(page);   //Hapus saat build
      })
  }

  const clampInputValue = (event, min, max, isFloat) => {
    let value = event.target.value;
    if (value === "") {
      value = (isFloat ? 0.0 : 0);
    } else if (typeof value === 'string') {
      value = (isFloat ? Number.parseFloat(value) : Number.parseInt(value));
      if (!isFloat)
        event.target.value = value;
    }
    if (value > max) {
      event.target.value = max;
      return max;
    } else if (value < min) {
      event.target.value = min;
      return min;
    } else 
      return value;
  }

  return (
    <div id="customize" className={styles.page}>
      <div className={styles.pageContainer}>
        <div className={`${styles.floatLeft} ${styles.addHMargin}`}>
          <img id="preview-graph" src={previewGraphURL} alt="preview-graph" className={styles.imgGraph2x3}/>
        </div>
        <div className={`${styles.floatRight} ${styles.addHMargin}`}>
          <div className={styles.addVMargin}>
            <span className={`${styles.header2} ${styles.addVMargin}`}>Customize</span>
            <span className={styles.text1}>Max Gain (dB)</span>
            <input type="number" id="max-gain" className={`${styles.textInput2}`} min="-20.0" max="20.0" step="0.1" defaultValue={maxGain} onChange={(event) => setMaxGain(clampInputValue(event, -20.0, 20.0, true))}/>
            <br/>
            <span className={styles.text1}>Bass boost (dB)</span>
            <input type="number" id="bass-boost" className={`${styles.textInput2}`} min="-20.0" max="20.0" step="0.1" defaultValue={bassBoost} onChange={(event) => setBassBoost(clampInputValue(event, -20.0, 20.0, true))}/>
            <br/>
            <span className={styles.text1}>Tilt (dB)</span>
            <input type="number" id="tilt" className={`${styles.textInput2}`} min="-5.0" max="5.0" step="0.1" defaultValue={tilt} onChange={(event) => setTilt(clampInputValue(event, -5.0, 5.0, true))}/>
            <br/>
            <span className={styles.text1}>Treble Max Gain (dB)</span>
            <input type="number" id="treble-max-gain" className={`${styles.textInput2}`} min="-20.0" max="20.0" step="0.1" defaultValue={trebleMaxGain} onChange={(event) => setTrebleMaxGain(clampInputValue(event, -20.0, 20.0, true))}/>
            <br/>
            <span className={styles.text1}>Treble Gain Coefficient</span>
            <input type="number" id="treble-gain-coef" className={`${styles.textInput2}`} min="-5.0" max="5.0" step="0.1" defaultValue={trebleGainCoef} onChange={(event) => setTrebleGainCoef(clampInputValue(event, -5.0, 5.0, true))}/>
            <br/>
            <span className={styles.text1}>Treble Transition Frequencies Start (Hz)</span>
            <input type="number" id="treble-trans-freqstart" className={`${styles.textInput2}`} min="20" max="20000" step="10" defaultValue={trebleTransFreqStart} onChange={(event) => setTrebleTransFreqStart(clampInputValue(event, 20, 20000, false))}/>
            <br/>
            <span className={styles.text1}>Treble Transition Frequencies End (Hz)</span>
            <input type="number" id="treble-trans-freqend" className={`${styles.textInput2}`} min="20" max="20000" step="10" defaultValue={trebleTransFreqEnd} onChange={(event) => setTrebleTransFreqEnd(clampInputValue(event, 20, 20000, false))}/>
            <br/>
            <span className={styles.text1}>Sound Signature</span>
            <form enctype="multipart/form-data" onSubmit={handleSubmit} className={styles.centerBlock}>
              <label htmlFor="soundSignature" className={`${styles.button} ${styles.addVMargin}`}>Upload CSV</label>
              <input type="file" id="soundSignature" className={styles.hidden} name="soundSignature" accept=".csv" onChange={(event) => setFile(event.target.files[0].name)} />
              <span className={`${styles.text1} ${styles.addVMargin}`}>{file}</span>
              <button className={`${styles.button} ${styles.centerBlock} ${(file === 'No file selected' ? styles.hidden : '')}`}>Submit</button>
            </form>
            <br/>
            <br/>
          </div>

          <br/>

          <div className={styles.addVMargin}>
            <span className={`${styles.header2} ${styles.addVMargin}`}>Output Options</span>
            <br/>
            <label htmlFor="graphicEQ" className={`${styles.text1} ${styles.switchLabel}`}>
              <input type="checkbox" id="graphicEQ" className={styles.switchCheckbox} name="graphicEQ" value="geq" disabled="disabled" checked onChange={changeOutputOptions} />
              <span className={`${styles.switchSlider} ${styles.switchSliderContent1}`}></span>
            </label>
            <br/><br/>
            <label htmlFor="parametricEQ" className={`${styles.text1} ${styles.switchLabel}`}>
              <input type="checkbox" id="parametricEQ" className={styles.switchCheckbox} name="parametricEQ" value="peq" checked={(peq === 1) ? true : null} onChange={changeOutputOptions} />
              <span className={`${styles.switchSlider} ${styles.switchSliderContent2}`}></span>
            </label>
            <div className={(peq === 0 ? styles.hidden : `${styles.popupPanel} ${styles.addVMargin} `)}>
              <span className={styles.text1}>Max filters</span>
              <input type="text" id="max-filters" className={`${styles.textInput}`} min="1" max="64" step="1" defaultValue={maxFilters} onChange={(event) => setMaxFilters(event.target.value)}/>
            </div>
            <br/><br/>
            <label htmlFor="convolutionEQ" className={`${styles.text1} ${styles.switchLabel}`}>
              <input type="checkbox" id="convolutionEQ" className={styles.switchCheckbox} name="convolutionEQ" value="ceq" checked={(ceq === 1) ? true : null} onChange={changeOutputOptions} />
              <span className={`${styles.switchSlider} ${styles.switchSliderContent3}`}></span>
            </label>
            <div className={(ceq === 0 ? styles.hidden : `${styles.popupPanel} ${styles.addVMargin} `)}>
              <span className={styles.text1}>Sampling rate</span>
              <select name="sampling-rate" className={`${styles.dropdown} ${styles.text2}`} defaultValue={samplingRate} onChange={(event) => setSamplingRate(event.target.value)}>
                <option value="44100">44100</option>
                <option value="48000">48000</option>
              </select>
            </div>
            <br/><br/>
            <label htmlFor="fixedEQ" className={`${styles.text1} ${styles.switchLabel}`}>
              <input type="checkbox" id="fixedEQ" className={styles.switchCheckbox} name="fixedEQ" value="feq" checked={(feq === 1) ? true : null} onChange={changeOutputOptions}/>
              <span className={`${styles.switchSlider} ${styles.switchSliderContent4}`}></span>
            </label>
            <div className={(feq === 0 ? styles.hidden : `${styles.popupPanel} ${styles.addVMargin} `)}>
              <span className={`${styles.text1} ${styles.block}`}>Frequency</span>
              <input type="text" id="frequency" className={`${styles.textInput}`} defaultValue={frequency} onChange={(event) => setFrequency(event.target.value)}/>
              <span className={`${styles.text1} ${styles.block}`}>Q</span>
              <input type="text" id="freqQ" className={`${styles.textInput}`} defaultValue={freqQ} onChange={(event) => setFreqQ(event.target.value)}/>
            </div>
            <br/><br/>
          </div>
        </div>
      </div>
      <div className={styles.navigate}>
        <button className={`${styles.button} ${styles.floatLeft}`} onClick={() => props.changePage('ChooseTarget')}>Back</button>
        <button className={`${styles.button} ${styles.floatRight}`} onClick={() => navNextPage('FinalPage')}>Continue</button>
      </div>
    </div>
  );
}