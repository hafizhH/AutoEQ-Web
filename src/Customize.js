import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function Customize(props) {
  const [file, setFile] = useState('No file selected');
  const [maxGain, setMaxGain] = useState(0.0);
  const [bassBoost, setBassBoost] = useState(0.0);
  const [tilt, setTilt] = useState(0.0);
  const [trebleMaxGain, setTrebleMaxGain] = useState(0.0);
  const [trebleGainCoef, setTrebleGainCoef] = useState(0.0);
  const [trebleTransFreq, setTrebleTransFreq] = useState(100);
  const [geq, setGeq] = useState(0);
  const [peq, setPeq] = useState(0);
  const [ceq, setCeq] = useState(0);
  const [feq, setFeq] = useState(0);

  const changeOutputOptions = (event) => {
    //console.log(event.target.checked + ',' + event.target.value);
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
    if (gfile !== null) setFile(gfile);

    const gmaxGain = sessionStorage.getItem('maxGain');
    if (gmaxGain !== null) setMaxGain(Number.parseFloat(gmaxGain));

    const gbassBoost = sessionStorage.getItem('bassBoost');
    if (gbassBoost !== null) setBassBoost(Number.parseFloat(gbassBoost));

    const gtilt = sessionStorage.getItem('tilt');
    if (gtilt !== null) setTilt(Number.parseFloat(gtilt));

    const gtrebleMaxGain = sessionStorage.getItem('trebleMaxGain');
    if (gtrebleMaxGain !== null) setTrebleMaxGain(Number.parseFloat(gtrebleMaxGain));

    const gtrebleGainCoef = sessionStorage.getItem('trebleGainCoef');
    if (gtrebleGainCoef !== null) setTrebleGainCoef(Number.parseFloat(gtrebleGainCoef));

    const gtrebleTransFreq = sessionStorage.getItem('trebleTransFreq');
    if (gtrebleTransFreq !== null) setTrebleTransFreq(Number.parseInt(gtrebleTransFreq));

    const ggeq = sessionStorage.getItem('geq');
    if (ggeq !== null) setGeq(Number.parseInt(ggeq));
    const gpeq = sessionStorage.getItem('peq');
    if (gpeq !== null) setPeq(Number.parseInt(gpeq));
    const gceq = sessionStorage.getItem('ceq');
    if (gceq !== null) setCeq(Number.parseInt(gceq));
    const gfeq = sessionStorage.getItem('feq');
    if (gfeq !== null) setFeq(Number.parseInt(gfeq));

    console.log('Item retrieved');
  }, []);

  useEffect (() => {
    sessionStorage.setItem('file', file);
    sessionStorage.setItem('maxGain', maxGain.toString());
    sessionStorage.setItem('bassBoost', bassBoost.toString());
    sessionStorage.setItem('tilt', tilt.toString());
    sessionStorage.setItem('trebleMaxGain', trebleMaxGain.toString());
    sessionStorage.setItem('trebleGainCoef', trebleGainCoef.toString());
    sessionStorage.setItem('trebleTransFreq', trebleTransFreq.toString());
    sessionStorage.setItem('geq', geq.toString());
    sessionStorage.setItem('peq', peq.toString());
    sessionStorage.setItem('ceq', ceq.toString());
    sessionStorage.setItem('feq', feq.toString());
    console.log('Item saved');
  }, [file, maxGain, bassBoost, tilt, trebleMaxGain, trebleGainCoef, trebleTransFreq, geq, peq, ceq, feq]);

  return (
    <div id="customize" className={styles.page}>
      <div className={styles.pageContainer}>
        <div className={`${styles.floatLeft} ${styles.addHMargin}`}>
          <img alt="preview-graph" className={styles.imgGraph2x3}/>
        </div>
        <div className={`${styles.floatRight} ${styles.addHMargin}`}>
          <div className={styles.addVMargin}>
            <span className={`${styles.header2} ${styles.addVMargin}`}>Customize</span>
            <span className={styles.text1}>Max Gain (dB)</span>
            <input type="range" min="-20.0" max="20.0" defaultValue={maxGain} step="0.1" id="max-gain" onChange={(event) => setMaxGain(event.target.value)}/>
            {maxGain}
            <br/>
            <span className={styles.text1}>Bass boost (dB)</span>
            <input type="range" min="-20.0" max="20.0" defaultValue={bassBoost} step="0.1" id="bass-boost" onChange={(event) => setBassBoost(event.target.value)}/>
            {bassBoost}
            <br/>
            <span className={styles.text1}>Tilt (dB)</span>
            <input type="range" min="-5.0" max="5.0" defaultValue={tilt} step="0.1" id="tilt" onChange={(event) => setTilt(event.target.value)}/>
            {tilt}
            <br/>
            <span className={styles.text1}>Treble Max Gain (dB)</span>
            <input type="range" min="-20.0" max="20.0" defaultValue={trebleMaxGain} step="0.1" id="treble-max-gain" onChange={(event) => setTrebleMaxGain(event.target.value)}/>
            {trebleMaxGain}
            <br/>
            <span className={styles.text1}>Treble Gain Coefficient</span>
            <input type="range" min="-5.0" max="5.0" defaultValue={trebleGainCoef} step="0.1" id="treble-gain-coef" onChange={(event) => setTrebleGainCoef(event.target.value)}/>
            {trebleGainCoef}
            <br/>
            <span className={styles.text1}>Treble Transition Frequencies</span>
            <input type="range" min="20" max="20000" defaultValue={trebleTransFreq} step="10" id="treble-trans-freq" onChange={(event) => setTrebleTransFreq(event.target.value)}/>
            {trebleTransFreq}
            <br/>
            <span className={styles.text1}>Sound Signature</span>
            <label htmlFor="soundSignature" className={styles.button}>Upload CSV</label>
            <input type="file" id="soundSignature" className={styles.hidden} name="soundSignature" accept=".csv" onChange={(event) => setFile(event.target.files[0].name)} />
            {file}
            <br/>
          </div>
          <div className={styles.addVMargin}>
            <span className={`${styles.header2} ${styles.addVMargin}`}>Output Options</span>
            <input type="checkbox" id="graphicEQ" name="graphicEQ" value="geq" checked={(geq === 1) ? true : null} onChange={changeOutputOptions} />
            <label htmlFor="graphicEQ" className={styles.text1}>Graphic EQ</label>
            <br/>
            <input type="checkbox" id="parametricEQ" name="parametricEQ" value="peq" checked={(peq === 1) ? true : null} onChange={changeOutputOptions} />
            <label htmlFor="parametricEQ" className={styles.text1}>Parametric EQ</label>
            <br/>
            <input type="checkbox" id="convolutionEQ" name="convolutionEQ" value="ceq" checked={(ceq === 1) ? true : null} onChange={changeOutputOptions} />
            <label htmlFor="convolutionEQ" className={styles.text1}>Convolution EQ</label>
            <br/>
            <input type="checkbox" id="fixedEQ" name="fixedEQ" value="feq" checked={(feq === 1) ? true : null} onChange={changeOutputOptions}/>
            <label htmlFor="fixedEQ" className={styles.text1}>Fixed Band EQ</label>
            <br/>
          </div>
        </div>
      </div>
      <div className={styles.navigate}>
        <button className={`${styles.button} ${styles.floatLeft}`} onClick={() => props.changePage('ChooseTarget')}>Back</button>
        <button className={`${styles.button} ${styles.floatRight}`} onClick={() => props.changePage('Customize')}>Continue</button>
      </div>
    </div>
  );
}