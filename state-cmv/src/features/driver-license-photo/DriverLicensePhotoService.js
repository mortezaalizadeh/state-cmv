import { put, takeLatest } from 'redux-saga/effects';
import { changePhotoUri } from './DriverLicensePhotoSlice';

import { uploadPhotosAndGetQuote } from '../../framework/redux/quote/QuoteSlice';

function* changePhotoUriAsync() {
  yield put(uploadPhotosAndGetQuote());
}

export function* watchChangePhotoUriAsync() {
  yield takeLatest(changePhotoUri.toString(), changePhotoUriAsync);
}
