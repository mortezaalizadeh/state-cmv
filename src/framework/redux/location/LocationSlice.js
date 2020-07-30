import { createSlice } from '@reduxjs/toolkit';

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    getLocationStarted: false,
    getLocationFinished: false,
    error: false,
    city: '',
  },
  reducers: {
    reset: (state) => {
      state.getLocationStarted = false;
      state.getLocationFinished = false;
      state.error = false;
      state.location = {};
    },
    getLocationStarted: (state) => {
      state.getLocationStarted = true;
      state.getLocationFinished = false;
    },
    getLocationFinishedSuccessfully: (state) => {
      state.getLocationStarted = false;
      state.getLocationFinished = true;
      state.error = false;
    },
    getLocationFailed: (state) => {
      state.getLocationStarted = false;
      state.getLocationFinished = true;
      state.error = true;
    },
    updateLocation: (state, action) => {
      state.city = action.payload;
    },
    getLocation: () => {},
  },
});

export const { reset, getLocationStarted, getLocationFinishedSuccessfully, getLocationFailed, updateLocation, getLocation } = locationSlice.actions;
export const selectState = (state) => ({
  getLocationStarted: state.location.getLocationStarted,
  getLocationFinished: state.location.getLocationFinished,
  city: state.location.city,
});

export default locationSlice.reducer;
