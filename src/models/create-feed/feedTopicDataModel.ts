import {feedTopicSetting} from './feedTopicSettingModel';

export interface feedTopicData {
  avatarUrl: string;
  createdAt: number;
  description: string;
  followersCount: number;
  id: string;
  isFollowedByMe: boolean;
  popularity: number;
  title: string;
  updatedAt: number;
  settings: feedTopicSetting;
}
