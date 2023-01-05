import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import useFeedTopicStateHook from './useFeedTopicState';
import feedTopicSliceSelector from './feed-topic-selector/index';
import {feedTopicStateModel} from './models/feedTopicStateModel';
import {feedTopicPayload} from './models/payload/feedTopicPayload';

const initialState: feedTopicStateModel = {
  feedTopicList: [],
};

const feedTopicSlice = createSlice({
  name: 'FeedTopics',
  initialState: initialState,
  reducers: {
    setFeedTopics: (state, action: PayloadAction<feedTopicPayload>) => {
      const {listFeedTopic} = action.payload;
      state.feedTopicList = listFeedTopic;
    },
  },
});

export const feedTopicActions = feedTopicSlice.actions;
export const feedTopicSelectors = feedTopicSliceSelector;
export const useFeedTopicState = useFeedTopicStateHook;
export default feedTopicSlice.reducer;
