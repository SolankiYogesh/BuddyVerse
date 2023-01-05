import {combineReducers} from 'redux';

import feedTopicReducer, {
  feedTopicActions,
  feedTopicSelectors,
  useFeedTopicState,
} from './feed-topic-slice/feedTopicSlice';

import feedListReducer, {
  feedListActions,
  feedListSelectors,
  useFeedListState,
} from './feed-list-slice/feedListSlice';
import userReducer, {
  useUserState,
  userAction,
  userSelector,
} from './user-slice/userSlice';
import shopSliceReducer, {shopSliceActions} from './shop-slice/shopSlice';
import feedSliceReducer, {feedSliceActions} from './feed-slice/feedSlice';
import themeReducer, {themeSliceActions} from './theme-slice/themeSlice';
import GetSocialUsersReducer, {
  getSocialUsersSliceAction,
} from './getSocial-users-slice/GetSocialUsersSlice';

import notificationSliceReducer, {
  notificationSliceAction,
} from './notification-list/NotificationSlice';
import GroupSlice, {groupSliceActions} from './group-slice/GroupSlice';
import searchLikeSlice, {
  searchLikeSliceActions,
} from './search-slice/searchLikeSlice';

const rootReducer = combineReducers({
  feedTopic: feedTopicReducer,
  feedList: feedListReducer,
  shopData: shopSliceReducer,
  feedData: feedSliceReducer,
  user: userReducer,
  notification: notificationSliceReducer,
  theme: themeReducer,
  getScoailUsers: GetSocialUsersReducer,
  group: GroupSlice,
  searchLike: searchLikeSlice,
});

// Slides Actions
export {
  feedTopicActions,
  feedListActions,
  shopSliceActions,
  userAction,
  feedSliceActions,
  notificationSliceAction,
  themeSliceActions,
  getSocialUsersSliceAction,
  groupSliceActions,
  searchLikeSliceActions,
};

// Selectors
export {feedTopicSelectors, feedListSelectors, userSelector};

// State Hook
export {useFeedTopicState, useFeedListState, useUserState};

// Root Reducer
export default rootReducer;
