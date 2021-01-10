import { takeLatest, put, call } from 'redux-saga/effects';

import { reset, getLocationStarted, getLocationFinishedSuccessfully, getLocationFailed, updateLocation, getLocation } from './LocationSlice';

const fetchLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos),
      (err) => reject(err),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  });
};

const fetchCity = async (latitude, longitude) => {
  const response = await fetch(
    'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyB6qi1V2387Fj-K4kTPJzJ-Daxumo34a2g',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return (await response.json()).results[0].address_components.filter(
    (_) => _.types.filter((addressComponentType) => addressComponentType === 'administrative_area_level_1').length > 0,
  )[0].long_name;
};

function* getLocationAsync() {
  try {
    yield put(reset());
    yield put(getLocationStarted());

    const {
      coords: { latitude, longitude },
    } = yield call(fetchLocation);

    const city = yield call(fetchCity, latitude, longitude);

    yield put(getLocationFinishedSuccessfully());

    yield put(updateLocation(city));
  } catch (e) {
    console.log(e);
    yield put(getLocationFailed());
  }
}

export function* watchGetLocationAsync() {
  yield takeLatest(getLocation.toString(), getLocationAsync);
}
