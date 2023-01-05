import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  currentLocation: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 1,
    longitudeDelta: 1,
  },
  topics: [],
};

const shopSlice = createSlice({
  name: 'Shop',
  initialState: initialState,
  reducers: {
    SetTopicsAction: (state, action) => {
      state.topics = action.payload.topic;
    },
    SetLocationAction: (state, action) => {
      state.currentLocation = action.payload;
    },
    SetFeedDataAction: (state, action) => {
      state[action.payload.collection_name] = action.payload.data;
    },
    UpdateLikeAction: (state, action) => {
      let items = JSON.parse(JSON.stringify(state[action.payload.routeName]));
      // console.log('items', items);
      const index = _.findIndex(items, {id: action.payload.id});

      if (items[index].likes == undefined) {
        items[index].likes = 0;
      }
      if (items[index].myReactions.includes('like')) {
        items[index].myReactions.pop('like');
        items[index].likes--;
      } else {
        items[index].myReactions.push('like');
        items[index].likes++;
      }

      state[action.payload.routeName] = items;
    },
    UpdateShareAction: (state, action) => {
      let items = JSON.parse(JSON.stringify(state[action.payload.routeName]));

      const index = _.findIndex(items, {id: action.payload.id});

      if (items[index].reactionsCount.share == undefined) {
        items[index].reactionsCount.share = 0;
      }
      if (items[index].myReactions.includes('share')) {
      } else {
        items[index].myReactions.push('share');
        items[index].reactionsCount.share++;
      }
      state[action.payload.routeName] = items;
    },
  },
});

export const shopSliceActions = shopSlice.actions;
export default shopSlice.reducer;
