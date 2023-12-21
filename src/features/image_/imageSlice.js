import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  urls: [],
  compressUrls: [],
  names: [],
  oriTypes: [],
  compressTypes: [],
  oriSizes: [],
  compressSizes: [],
  compressionPercentage: [],
  oriWH: [],
  compressWH: [],
  mergeData: [],
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.urls = [action.payload.url, ...state.urls];
      state.compressUrls = [action.payload.compressUrl, ...state.compressUrls];
      state.names = [action.payload.name, ...state.names];
      state.oriTypes = [action.payload.oriType, ...state.oriTypes];
      state.compressTypes = [
        action.payload.compressType,
        ...state.compressTypes,
      ];
      state.oriSizes = [action.payload.oriSize, ...state.oriSizes];
      state.compressSizes = [
        action.payload.compressSize,
        ...state.compressSizes,
      ];
      state.compressionPercentage = [
        action.payload.compressionPercentage,
        ...state.compressionPercentage,
      ];
      state.oriWH = [action.payload.oriWH, ...state.oriWH];
    },
    addCompressWH: (state, action) => {
      state.compressWH = [action.payload, ...state.compressWH];
    },
    mergeData: (state) => {
      state.mergeData = [];
      for (let i = 0; i < state.urls.length; i++) {
        let objOri = {
          name: state.names[i],
          urls: state.urls[i],
          type: state.oriTypes[i],
          size: state.oriSizes[i],
          wH: state.oriWH[i],
          percentage: null
        }
        let objCompress = {
          name: state.names[i],
          urls: state.compressUrls[i],
          type: state.compressTypes[i],
          size: state.compressSizes[i],
          wH: state.compressWH[i],
          percentage: state.compressionPercentage[i]
        }
        state.mergeData = [...state.mergeData, objOri, objCompress]
      }
    },
    reset: () => initialState
  },
});

// Action creators are generated for each case reducer function
export const { addImage, addCompressWH, mergeData, reset } = imageSlice.actions;

export default imageSlice.reducer;



