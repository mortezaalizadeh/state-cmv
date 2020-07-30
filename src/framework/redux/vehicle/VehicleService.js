import { takeLatest, put, call } from 'redux-saga/effects';

import {
  reset,
  getVehicleDetailsStarted,
  getVehicleDetailsFinishedSuccessfully,
  getVehicleDetailsFailed,
  updateVehicleDetails,
  getVehicleDetails,
} from './VehicleSlice';

const fetchVehicleDetails = async (id) => {
  const response = await fetch('https://statecmvhackathonwebapi20200730141853.azurewebsites.net/api/vehicle/' + id, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

function* getVehicleDetailsAsync(action) {
  try {
    yield put(reset());
    yield put(getVehicleDetailsStarted());

    const details = yield call(fetchVehicleDetails, action.payload);

    yield put(getVehicleDetailsFinishedSuccessfully());
    yield put(updateVehicleDetails(details));
  } catch (e) {
    console.log(e);
    yield put(getVehicleDetailsFailed());
  }
}

export function* watchGetVehicleDetailsAsync() {
  yield takeLatest(getVehicleDetails.toString(), getVehicleDetailsAsync);
}
