import React, { useContext } from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getCssUrl } from '@iag-packages/chroma-react/lib/utils/cdn';
import { ChromaContext } from '@iag-packages/chroma-react/lib/components';

import './App.css';
import Routes from './Routes';

const browserHistory = createBrowserHistory();

const App = () => {
  useContext(ChromaContext);
  const brand = 'state';

  return (
    <Router history={browserHistory}>
      <Helmet>
        <link href={getCssUrl(brand)} rel="stylesheet" />
      </Helmet>
      <Routes brand={brand} />
    </Router>
  );
};

export default App;
