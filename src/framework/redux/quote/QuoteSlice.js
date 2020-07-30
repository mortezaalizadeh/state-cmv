import { createSlice } from '@reduxjs/toolkit';

export const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    uploadStarted: false,
    uploadFinished: false,
    error: false,
    quote: null,
  },
  reducers: {
    reset: (state) => {
      state.uploadStarted = false;
      state.uploadFinished = false;
      state.error = false;
      state.quote = null;
    },
    uploadStarted: (state) => {
      state.uploadStarted = true;
      state.uploadFinished = false;
    },
    uploadFinishedSuccessfully: (state) => {
      state.uploadStarted = false;
      state.uploadFinished = true;
      state.error = false;
    },
    uploadFailed: (state) => {
      state.uploadStarted = false;
      state.uploadFinished = true;
      state.error = true;
    },
    updateQuoteDetails: (state, action) => {
      state.quote = action.payload;
    },
    uploadPhotosAndGetQuote: () => {},
  },
});

export const { reset, uploadStarted, uploadFinishedSuccessfully, uploadFailed, updateQuoteDetails, uploadPhotosAndGetQuote } = quoteSlice.actions;
export const selectState = (state) => ({
  uploadStarted: state.quote.uploadStarted,
  uploadFinished: state.quote.uploadFinished,
  quote: state.quote.quote,
});

export default quoteSlice.reducer;
