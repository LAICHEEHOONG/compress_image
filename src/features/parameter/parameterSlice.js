import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  width: 1024,
  height: 768,
  quality: 0.8,
  fileType: "keep",
  openAlert: false,
  alertText: "",
};

export const parameterSlice = createSlice({
  name: "parameter",
  initialState,
  reducers: {
    setWidth: (state, action) => {
      state.width = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setQuality: (state, action) => {
      state.quality = action.payload;
    },
    setFileType: (state, action) => {
      state.fileType = action.payload;
    },
    setAlertStatus: (state, action) => {
      state.openAlert = action.payload;
    },
    setAlertText: (state, action) => {
      state.alertText = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  setWidth,
  setHeight,
  setQuality,
  setAlertStatus,
  setAlertText,
  setFileType,
  reset,
} = parameterSlice.actions;

export default parameterSlice.reducer;

