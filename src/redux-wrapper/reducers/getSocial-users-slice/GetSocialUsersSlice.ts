import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  users: [],
};

const getSocialUsersSlice = createSlice({
  name: 'getSocialUsers',
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      let data = JSON.parse(JSON.stringify(state.users));
      data.push(action.payload);
      state.users = _.uniqBy(data, i => i?.userId || i?.id);
    },
    addFollowersTouser: (state, action) => {
      let data = JSON.parse(JSON.stringify(state.users));
      let user = _.findIndex(
        data,
        i => (i?.userId || i?.id) === action.payload?.id,
      );
      data[user].followers = action.payload.followers;
      state.users = data;
    },
    addFollowingTouser: (state, action) => {
      let data = JSON.parse(JSON.stringify(state.users));
      let user = _.findIndex(
        data,
        i => (i?.userId || i?.id) === action.payload?.id,
      );
      data[user].following = action.payload.following;
      state.users = data;
    },
    setIsFollowing: (state, action) => {
      let data = JSON.parse(JSON.stringify(state.users));
      let user = _.findIndex(
        data,
        i => (i?.userId || i?.id) === action.payload?.id,
      );
      data[user].isFollowing = action.payload?.isFollowing;
      state.users = data;
    },
    clearAllUsers: (state, action) => {
      state.users = [];
    },
  },
});
export const getSocialUsersSliceAction = getSocialUsersSlice.actions;
export default getSocialUsersSlice.reducer;
