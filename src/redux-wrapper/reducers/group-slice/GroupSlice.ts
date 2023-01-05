import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  requestedIds: [],
};

const groupSlice = createSlice({
  name: 'Groups',
  initialState: initialState,
  reducers: {
    addRequestID: (state, action) => {
      const data = JSON.parse(JSON.stringify(state.requestedIds));
      data.push(action.payload);
      state.requestedIds = data;
    },
    removeId: (state, action) => {
      const data = JSON.parse(JSON.stringify(state.requestedIds));
      const filterData = _.filter(data, i => i !== action.payload?.id);
      state.requestedIds = filterData;
    },
  },
});

export const groupSliceActions = groupSlice.actions;
export default groupSlice.reducer;
