import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  progress: 0
}

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    progressOpen: (state, action) => {
        state.open = action.payload
    },
    progressPercent: (state, action) => {
        state.progress = state.progress + action.payload
    },
    progressReset: (state, action) => {
        state.open = initialState.open;
        state.progress = initialState.progress;
    }
  },
})

// Action creators are generated for each case reducer function
export const { progressOpen, progressPercent, progressReset } = progressSlice.actions

export default progressSlice.reducer