import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import RootReducer from './RootReducer';
import { watchUploadPhotosAndGetQuoteAsync } from './quote';
import { watchGetVehicleDetailsAsync } from './vehicle';
import { watchChangePhotoUriAsync as watchLicensePlateChangePhotoUriAsync } from '../../features/license-plate-photo';
import { watchChangePhotoUriAsync as watchDriverLicenseChangePhotoUriAsync } from '../../features/driver-license-photo';
import { watchGetLocationAsync } from './location';
import { watchCreateInsuranceApplicationAsync } from './insurance';

const rootSagas = function* sagas() {
  yield all([
    watchDriverLicenseChangePhotoUriAsync(),
    watchLicensePlateChangePhotoUriAsync(),
    watchUploadPhotosAndGetQuoteAsync(),
    watchGetVehicleDetailsAsync(),
    watchGetLocationAsync(),
    watchCreateInsuranceApplicationAsync(),
  ]);
};

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: RootReducer,
  middleware,
});

sagaMiddleware.run(rootSagas);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./RootReducer', () => {
    const { newRootReducer } = require('./RootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
