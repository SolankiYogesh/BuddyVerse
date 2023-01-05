import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isNotification: false,
  lastNotificationID: [],
};

const notificationSlice = createSlice({
  name: 'Notification',
  initialState: {initialState},
  reducers: {
    UpdateNotification: (state, action) => {
      state.initialState.isNotification = action.payload;
    },
    UpdateNotificationID: (state, action) => {
      state.initialState.lastNotificationID = action.payload;
    },
  },
});
export const notificationSliceAction = notificationSlice.actions;
export default notificationSlice.reducer;
