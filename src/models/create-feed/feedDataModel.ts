import {feedAuthor} from './feedAuthorModel';
import {feedMediaModel} from './feedMediaModel';
import {feedReactionModel} from './feedReactionModel';
import {feedSourceModel} from './feedSourceModel';

export interface feedDataModel {
  author: feedAuthor;
  bookmarksCount: number;
  commenters: feedAuthor[];
  commentsCount: number;
  createdAt: number;
  id: number;
  isAnnouncement: boolean;
  isBookmarked: boolean;
  labels: string[];
  mediaAttachments: feedMediaModel[];
  mentions: string[];
  myReactions: string[];
  popularity: number;
  reactions: string[];
  reactionsCount: feedReactionModel;
  source: feedSourceModel;
  status: string;
  text: string;
  type: string;
}
