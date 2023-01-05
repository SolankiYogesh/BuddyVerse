import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  Communities,
  NotificationContent,
  UserIdList,
  SendNotificationTarget,
  Notifications,
  Action,
  GetSocial,
} from 'getsocial-react-native-sdk';

const initialState = {
  thejoint: [],
  memes: [],
  moments: [],
  greentalk: [],
  myPost: [],
  UsersPost: [],
  greentalk_stage: [],
  memes_stage: [],
  thejoint_stage: [],
  APITheJoint: [],
  puff_puff_pass_stag: [],
  moments_stage: [],
};

const feedSlice = createSlice({
  name: 'Feed',
  initialState: initialState,

  reducers: {
    SetFeedDataAction: (state, action) => {
      state[action.payload.collection_name] = action.payload.data;
    },
    UpdateLikeAction: (state, action) => {
      let items = JSON.parse(JSON.stringify(state[action.payload.routeName]));
      const index = _.findIndex(items, {id: action.payload.id});

      if (items[index].reactionsCount.like === undefined) {
        items[index].reactionsCount.like = 0;
      }
      if (items[index].myReactions.includes('like')) {
        items[index].myReactions.pop('like');
        items[index].reactionsCount.like--;
        Communities.removeReaction('like', action.payload.id);
      } else {
        items[index].myReactions.push('like');
        items[index].reactionsCount.like++;
        Communities.setReaction('like', action.payload.id);
        sendNotification(items[index]);
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
    UpdateCommentAction: (state, action) => {
      let items = JSON.parse(JSON.stringify(state[action.payload.routeName]));

      const index = _.findIndex(items, {id: action.payload.id});

      items[index].commentsCount++;
      // if (items[index].commentsCount === 0) {
      //   items[index].commentsCount = 0;
      // } else {

      // }
      state[action.payload.routeName] = items;
    },
    DeleteCommentAction: (state, action) => {
      let items = JSON.parse(JSON.stringify(state[action.payload.routeName]));

      const index = _.findIndex(items, {id: action.payload.id});

      if (items[index].commentsCount === undefined) {
        items[index].commentsCount = 0;
      } else {
        items[index].commentsCount =
          items[index].commentsCount === 0 ? 0 : items[index].commentsCount - 1;
      }
      state[action.payload.routeName] = items;
    },

    addFileSize: (state, action) => {
      let items = JSON.parse(JSON.stringify(state[action.payload.routeName]));

      const index = _.findIndex(items, {id: action.payload.id});
      items[index].size = action.payload?.size;
      state[action.payload.routeName] = items;
    },
  },
});

const sendNotification = async item => {
  const user = await GetSocial.getCurrentUser();
  if (user?.id !== item?.author?.userId) {
    const isImage = !!item?.mediaAttachments[0]?.imageUrl;
    const isGreenTalk = _.includes(['greentalk','greentalk stage'],item?.source?.title);
    const notificationContent = new NotificationContent();
    notificationContent.templateName = isGreenTalk ? 'GreenTalkLike' : isImage ? 'isImage' : 'videoLike';
    const action = Action.create('like', {$activity_id: item?.id});
    notificationContent.action = action;
    const target = SendNotificationTarget.usersWithIds(
      UserIdList.create([item?.author?.userId]),
    );
    await Notifications.send(notificationContent, target);
  }
};

export const feedSliceActions = feedSlice.actions;
export default feedSlice.reducer;
