import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import { NeedAnalysisContainer } from './features/need-analysis';
import { QuoteContainer } from './features/quote';

import { PageHeader, PageFooter } from './features/general';
import { DriverLicensePhotoContainer } from './features/driver-license-photo';
import { LicensePlatePhotoContainer } from './features/license-plate-photo';

const Routes = (props) => {
  return (
    <Fragment>
      <PageHeader brand={props.brand} />
      <Switch>
        <Route exact path="/">
          <NeedAnalysisContainer />
        </Route>
        <Route exact path="/need-analysis">
          <NeedAnalysisContainer />
        </Route>
        <Route exact path="/quote">
          <QuoteContainer />
        </Route>
        <Route exact path="/driver-license-photo">
          <DriverLicensePhotoContainer />
        </Route>
        <Route exact path="/license-plate-photo">
          <LicensePlatePhotoContainer />
        </Route>
      </Switch>
      <PageFooter />
    </Fragment>
  );
};

export default Routes;
