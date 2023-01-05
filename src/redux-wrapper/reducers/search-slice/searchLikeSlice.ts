import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  requestedIds: [],
};

const searchLikeSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    addRequestID: (state, action) => {
      const data = JSON.parse(JSON.stringify(state.requestedIds));
      data.push(action.payload);
      state.requestedIds = _.uniqBy(data, i => i);
    },
    removeId: (state, action) => {
      const data = JSON.parse(JSON.stringify(state.requestedIds));
      const filterData = _.filter(data, i => i !== action.payload?.id);
      state.requestedIds = filterData;
    },
  },
});

export const searchLikeSliceActions = searchLikeSlice.actions;
export default searchLikeSlice.reducer;
