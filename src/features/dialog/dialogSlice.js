import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  url: '',
  open: false
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    dialogURL: (state, action) => {
        state.url = action.payload
    },
    dialogOpen: (state, action) => {
        state.open = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { dialogURL, dialogOpen } = dialogSlice.actions

export default dialogSlice.reducer