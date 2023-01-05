import {createSelector} from 'reselect';
import {feedListStateModel} from '../models/feedListStateModel';
import feedListStateSelector from './feedListStateSelector';

export default createSelector(
  feedListStateSelector,
  (feedListState: feedListStateModel) => feedListState.greenTalkFeedList,
);
