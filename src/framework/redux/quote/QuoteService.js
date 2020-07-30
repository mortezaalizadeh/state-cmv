import { takeLatest, select, put, call } from 'redux-saga/effects';

import { reset, uploadStarted, uploadFinishedSuccessfully, uploadFailed, updateQuoteDetails, uploadPhotosAndGetQuote } from './QuoteSlice';
import { selectState as drivingLicensePhotoSelectState } from '../../../features/driver-license-photo/DriverLicensePhotoSlice';
import { selectState as licensePlatePhotoSelectState } from '../../../features/license-plate-photo/LicensePlatePhotoSlice';
import { selectState as locationSelectState } from '../location/LocationSlice';
import { selectState as insuranceSelectState } from '../insurance/InsuranceSlice';

const fetchQuote = async (driversLicenseImage, vehicleImage, ia, city) => {
  const response = await fetch('https://statecmvhackathonwebapi20200730141853.azurewebsites.net/api/quote', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      driversLicenseImage,
      vehicleImage,
      insuranceApplication: ia.insuranceApplication,
      insuranceApplicationEtag: ia.etag,
      city,
    }),
  });

  if (response.status !== 201) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

function* uploadPhotosAndGetQuoteAsync() {
  try {
    const { photoUri: driversLicenseImage } = yield select(drivingLicensePhotoSelectState);
    const { photoUri: vehicleImage } = yield select(licensePlatePhotoSelectState);
    const { city } = yield select(locationSelectState);
    const { ia } = yield select(insuranceSelectState);

    if (!!driversLicenseImage && !!vehicleImage && !!ia && !!city) {
      yield put(reset());
      yield put(uploadStarted());

      const quote = yield call(fetchQuote, driversLicenseImage, vehicleImage, ia, city);

      yield put(uploadFinishedSuccessfully());
      yield put(updateQuoteDetails(quote));
    }
  } catch (e) {
    console.log(e);
    yield put(uploadFailed());
  }
}

export function* watchUploadPhotosAndGetQuoteAsync() {
  yield takeLatest(uploadPhotosAndGetQuote.toString(), uploadPhotosAndGetQuoteAsync);
}
