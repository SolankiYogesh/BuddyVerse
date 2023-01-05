import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import useFeedStateHook from './useFeedState';
import feedListSliceSelector from './selectors/index';
import {feedListPayload} from './models/payload/feedListPayload';
import {feedListStateModel} from './models/feedListStateModel';
import {feedUpdatePayload} from './models/payload/feedUpdatePayload';
import appConstants from 'models/appConstants';
import {feedDataModel} from 'models/create-feed/feedDataModel';
import {getFeedListWithMediaAttachment} from 'utils/helper/helper';
import {debugLogs} from 'utils/logs/logs';

const initialState: feedListStateModel = {
  theJointfeedList: [],
  memeFeedList: [],
  momentFeedList: [],
  greenTalkFeedList: [],
};

const updateList = (listOfFeed: feedDataModel[], feed: feedDataModel) => {
  const feedList = JSON.parse(JSON.stringify(listOfFeed));
  return feedList.map((objFeed: feedDataModel) => {
    return objFeed.id === feed.id ? feed : objFeed;
  });
};

const listWithMediaSize = async (listOfFeeds: feedDataModel[]) => {
  const feedPromiseResult = await getFeedListWithMediaAttachment(listOfFeeds);
  debugLogs('promise results slice', feedPromiseResult);
  return feedPromiseResult;
};

const feedListSlice = createSlice({
  name: 'FeedList',
  initialState: initialState,
  reducers: {
    setTheJointFeedList: (state, action: PayloadAction<feedListPayload>) => {
      const {listFeeds} = action.payload;
      state.theJointfeedList = listFeeds;
    },
    setMemeFeedList: (state, action: PayloadAction<feedListPayload>) => {
      const {listFeeds} = action.payload;
      state.memeFeedList = listFeeds;
    },
    setMomentFeedList: (state, action: PayloadAction<feedListPayload>) => {
      const {listFeeds} = action.payload;
      state.momentFeedList = listFeeds;
    },
    setGreenTalkFeedList: (state, action: PayloadAction<feedListPayload>) => {
      const {listFeeds} = action.payload;
      state.greenTalkFeedList = listFeeds;
    },
    updateFeed: (state, action: PayloadAction<feedUpdatePayload>) => {
      const {updatedFeed} = action.payload;
      const sourceOfFeed = updatedFeed.source.id;
      switch (sourceOfFeed) {
        case appConstants.thejoint:
          state.theJointfeedList = updateList(
            state.theJointfeedList,
            updatedFeed,
          );
          break;
        case appConstants.memes:
          state.memeFeedList = updateList(state.memeFeedList, updatedFeed);
          break;
        case appConstants.moments:
          state.momentFeedList = updateList(state.momentFeedList, updatedFeed);
          break;
        case appConstants.greentalk:
          state.greenTalkFeedList = updateList(
            state.greenTalkFeedList,
            updatedFeed,
          );
          break;

        default:
          break;
      }
    },
  },
});

export const feedListActions = feedListSlice.actions;
export const feedListSelectors = feedListSliceSelector;
export const useFeedListState = useFeedStateHook;
export default feedListSlice.reducer;
