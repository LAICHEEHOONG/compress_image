import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  screenWidth: 1000,
}

export const screenWidthSlice = createSlice({
  name: 'screen width',
  initialState,
  reducers: {
    setScreenWidth: (state, action) => {
        state.screenWidth = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setScreenWidth } = screenWidthSlice.actions

export default screenWidthSlice.reducer