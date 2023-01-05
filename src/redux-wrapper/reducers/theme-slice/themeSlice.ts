import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isDark: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    isDark: (state, action) => {
      state.isDark = action.payload;
    },
  },
});

export const themeSliceActions = themeSlice.actions;
export default themeSlice.reducer;
