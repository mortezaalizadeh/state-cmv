import { createSlice } from '@reduxjs/toolkit';

export const insuranceSlice = createSlice({
  name: 'insurance',
  initialState: {
    createInsuranceApplicationStarted: false,
    createInsuranceApplicationFinished: false,
    error: false,
    ia: null,
  },
  reducers: {
    reset: (state) => {
      state.createInsuranceApplicationStarted = false;
      state.createInsuranceApplicationFinished = false;
      state.error = false;
      state.ia = null;
    },
    createInsuranceApplicationStarted: (state) => {
      state.createInsuranceApplicationStarted = true;
      state.createInsuranceApplicationFinished = false;
    },
    createInsuranceApplicationFinishedSuccessfully: (state) => {
      state.createInsuranceApplicationStarted = false;
      state.createInsuranceApplicationFinished = true;
      state.error = false;
    },
    createInsuranceApplicationFailed: (state) => {
      state.createInsuranceApplicationStarted = false;
      state.createInsuranceApplicationFinished = true;
      state.error = true;
    },
    updateInsuranceApplicationId: (state, action) => {
      state.ia = action.payload;
    },
    createInsuranceApplication: () => {},
  },
});

export const {
  reset,
  createInsuranceApplicationStarted,
  createInsuranceApplicationFinishedSuccessfully,
  createInsuranceApplicationFailed,
  updateInsuranceApplicationId,
  createInsuranceApplication,
} = insuranceSlice.actions;
export const selectState = (state) => ({
  createInsuranceApplicationStarted: state.insurance.createInsuranceApplicationStarted,
  createInsuranceApplicationFinished: state.insurance.createInsuranceApplicationFinished,
  ia: state.insurance.ia,
});

export default insuranceSlice.reducer;
