import { createSlice } from '@reduxjs/toolkit';

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState: {
    id: '',
    getVehicleDetailsStarted: false,
    getVehicleDetailsFinished: false,
    error: false,
    vehicle: {},
  },
  reducers: {
    reset: (state) => {
      state.id = '';
      state.getVehicleDetailsStarted = false;
      state.getVehicleDetailsFinished = false;
      state.error = false;
      state.vehicle = {};
    },
    getVehicleDetailsStarted: (state) => {
      state.getVehicleDetailsStarted = true;
      state.getVehicleDetailsFinished = false;
    },
    getVehicleDetailsFinishedSuccessfully: (state) => {
      state.getVehicleDetailsStarted = false;
      state.getVehicleDetailsFinished = true;
      state.error = false;
    },
    getVehicleDetailsFailed: (state) => {
      state.getVehicleDetailsStarted = false;
      state.getVehicleDetailsFinished = true;
      state.error = true;
    },
    updateVehicleDetails: (state, action) => {
      state.vehicle = action.payload;
    },
    getVehicleDetails: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const {
  reset,
  getVehicleDetailsStarted,
  getVehicleDetailsFinishedSuccessfully,
  getVehicleDetailsFailed,
  updateVehicleDetails,
  getVehicleDetails,
} = vehicleSlice.actions;
export const selectState = (state) => ({
  getVehicleDetailsStarted: state.vehicle.getVehicleDetailsStarted,
  getVehicleDetailsFinished: state.vehicle.getVehicleDetailsFinished,
  vehicle: state.vehicle.vehicle,
});

export default vehicleSlice.reducer;
