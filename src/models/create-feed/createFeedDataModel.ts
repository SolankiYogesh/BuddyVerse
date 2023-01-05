import {feedMediaType, feedTopicType} from 'models/types';

export interface createFeedDataModel {
  height: number;
  width: number;
  timeStamp: number;
  feedText: string;
  feedTarget: feedTopicType;
  feedMedia?: string;
  mediaTypeOfFeed?: feedMediaType;
  feedExtention?: string;
  type?: string;
  //   feedTags?: string;
}
