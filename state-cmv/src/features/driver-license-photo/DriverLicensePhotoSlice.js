import { createSlice } from '@reduxjs/toolkit';

export const driverLicensePhotoSlice = createSlice({
  name: 'driverLicensePhoto',
  initialState: {
    photoUri: '',
  },
  reducers: {
    changePhotoUri: (state, action) => {
      state.photoUri = action.payload;
    },
  },
});

export const { changePhotoUri } = driverLicensePhotoSlice.actions;
export const selectState = (state) => ({
  photoUri: state.driverLicensePhoto.photoUri,
});

export default driverLicensePhotoSlice.reducer;
