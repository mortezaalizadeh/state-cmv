import { takeLatest, put, call } from 'redux-saga/effects';

import {
  reset,
  createInsuranceApplicationStarted,
  createInsuranceApplicationFinishedSuccessfully,
  createInsuranceApplicationFailed,
  updateInsuranceApplicationId,
  createInsuranceApplication,
} from './InsuranceSlice';

const createIA = async () => {
  const response = await fetch('https://statecmvhackathonwebapi20200730141853.azurewebsites.net/api/insuranceapplication/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

function* createInsuranceApplicationAsync() {
  try {
    yield put(reset());
    yield put(createInsuranceApplicationStarted());

    const result = yield call(createIA);

    yield put(createInsuranceApplicationFinishedSuccessfully());
    yield put(updateInsuranceApplicationId(result));
  } catch (e) {
    console.log(e);
    yield put(createInsuranceApplicationFailed());
  }
}

export function* watchCreateInsuranceApplicationAsync() {
  yield takeLatest(createInsuranceApplication.toString(), createInsuranceApplicationAsync);
}
