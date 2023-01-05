import {feedTopicType} from 'models/types';
import appConstants from '../../../../../models/appConstants';

export interface feedType {
  name: string;
  isSelected: boolean;
  topicName: feedTopicType;
}

export const feedTypesList: feedType[] = [
  {name: 'thejoint', isSelected: true, topicName: appConstants.APITheJoint},
  // {name: 'Memes', isSelected: false, topicName: 'memes'},
  // {name: 'Moments', isSelected: false, topicName: 'moments'},
  {name: 'greentalk', isSelected: false, topicName: appConstants.APIGreenTalk},
];
