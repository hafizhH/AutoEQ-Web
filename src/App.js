import React,{ useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import './global.css';

import Home from './Home';
import SelectMeasurement from './SelectMeasurement';
import SelectSource from './SelectSource';
import SelectType from './SelectType';
import SelectModel from './SelectModel';
import ChooseTarget from './ChooseTarget';
import Customize from './Customize';
import FinalPage from './FinalPage';

export default function App() {
  const [page, setPage] = useState('Home');

  const changePage = (tgtPageId) => {
    setPage(tgtPageId);
  }

  let returnComp = null;
  if (page === 'Home') returnComp = <Home changePage={changePage} />;
  else if (page === 'SelectMeasurement') returnComp = <SelectMeasurement changePage={changePage} />;
  else if (page === 'SelectSource') returnComp = <SelectSource changePage={changePage} />;
  else if (page === 'SelectType') returnComp = <SelectType changePage={changePage} />;
  else if (page === 'SelectModel') returnComp = <SelectModel changePage={changePage} />;
  else if (page === 'ChooseTarget') returnComp = <ChooseTarget changePage={changePage} />;
  else if (page === 'Customize') returnComp = <Customize changePage={changePage} />;
  else if (page === 'FinalPage') returnComp = <FinalPage changePage={changePage} />;

  return <Layout childComponent={returnComp} />;
}