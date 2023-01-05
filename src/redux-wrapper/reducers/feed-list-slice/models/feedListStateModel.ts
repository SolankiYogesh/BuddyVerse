import {feedDataModel} from 'models/create-feed/feedDataModel';

export interface feedListStateModel {
  theJointfeedList: feedDataModel[];
  memeFeedList: feedDataModel[];
  momentFeedList: feedDataModel[];
  greenTalkFeedList: feedDataModel[];
}
