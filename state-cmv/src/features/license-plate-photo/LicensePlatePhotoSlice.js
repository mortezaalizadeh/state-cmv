import { createSlice } from '@reduxjs/toolkit';

export const licensePlatePhotoSlice = createSlice({
  name: 'licensePlatePhoto',
  initialState: {
    photoUri: '',
  },
  reducers: {
    changePhotoUri: (state, action) => {
      state.photoUri = action.payload;
    },
  },
});

export const { changePhotoUri } = licensePlatePhotoSlice.actions;
export const selectState = (state) => ({
  photoUri: state.licensePlatePhoto.photoUri,
});

export default licensePlatePhotoSlice.reducer;
