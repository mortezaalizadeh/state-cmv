import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Column, Container, Row } from '@iag-packages/chroma-react/lib/layouts';
import { Image } from '@iag-packages/chroma-react/lib/components';

import carImage from '../../assets/images/i-car.svg';
import userImage from '../../assets/images/i-user.svg';
import styles from './NeedAnalysis.module.css';
import { selectState as quoteSelectState } from '../../framework/redux/quote/QuoteSlice';
import { getLocation, selectState as locationSelectState } from '../../framework/redux/location/LocationSlice';
import { createInsuranceApplication, selectState as insuranceSelectState } from '../../framework/redux/insurance/InsuranceSlice';
import { selectState as drivingLicensePhotoSelectState } from '../driver-license-photo/DriverLicensePhotoSlice';
import { selectState as licensePlatePhotoSelectState } from '../license-plate-photo/LicensePlatePhotoSlice';

const NeedAnalysisContainer = ({ history }) => {
  const { city, getLocationStarted, getLocationFinished } = useSelector(locationSelectState),
    { ia, createInsuranceApplicationStarted, createInsuranceApplicationFinished } = useSelector(insuranceSelectState),
    { photoUri: driversLicenseImage } = useSelector(drivingLicensePhotoSelectState),
    { photoUri: vehicleImage } = useSelector(licensePlatePhotoSelectState),
    { uploadFinished } = useSelector(quoteSelectState),
    dispatch = useDispatch();

  if (city === '' && !getLocationStarted && !getLocationFinished) {
    dispatch(getLocation());
  }

  if (ia === null && !createInsuranceApplicationStarted && !createInsuranceApplicationFinished) {
    dispatch(createInsuranceApplication());
  }

  if (!!driversLicenseImage && !!vehicleImage && !!ia && !!city && uploadFinished) {
    history.push('/quote');
  }

  const takeLicensePlatePhoto = () => {
    history.push('/license-plate-photo');
  };

  const takeDriverLicensePhoto = () => {
    history.push('/driver-license-photo');
  };

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Column>
            <h2 className={styles.h2}>2-Step Quick Quote for your Business Vehicle</h2>
          </Column>
        </Row>
        <Row alignItems="center">
          <Column>
            <button className={`${styles.analysisBtn}`} onClick={takeLicensePlatePhoto}>
              <Container>
                <Row alignItems="center">
                  <Column xs={4} className={`${styles.column}`}>
                    <Image src={carImage} alt="alt" />
                  </Column>
                  <Column xs={8} className={`${styles.column}`}>
                    <span>Snap a photo of your license plate</span>
                  </Column>
                </Row>
              </Container>
            </button>
          </Column>
        </Row>
        <Row alignItems="center">
          <Column>
            <button className={`${styles.analysisBtn}`} onClick={takeDriverLicensePhoto}>
              <Container>
                <Row alignItems="center">
                  <Column xs={4} className={`${styles.column}`}>
                    <Image src={userImage} alt="alt" />
                  </Column>
                  <Column xs={8} className={`${styles.column}`}>
                    <span>Snap a photo of your driver's license</span>
                  </Column>
                </Row>
              </Container>
            </button>
          </Column>
        </Row>
        <Row>
          <Column>
            <p className={`p p--bold ${styles.p}`}>
              Quick quote to be generated are based on your car and driver’s licence information. They are subject to change depending on your answers
              to additional questions.
              <br />
              {ia ? ia.id : '...'}
            </p>
          </Column>
        </Row>
      </Container>
    </Fragment>
  );
};

export default withRouter(NeedAnalysisContainer);
