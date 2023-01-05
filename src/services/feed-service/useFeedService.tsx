import {useDispatch} from 'react-redux';
import {
  PagingQuery,
  Communities,
  ActivitiesQuery,
  ActivityContent,
  PostActivityTarget,
  ReportingReason,
  Invites,
} from 'getsocial-react-native-sdk';
import {debugLogs} from 'utils/logs/logs';
import {feedListActions} from 'redux-wrapper/reducers';
import {feedDataModel} from 'models/create-feed/feedDataModel';
import appConstants from '../../models/appConstants';

export const useFeedService = () => {
  const dispatch = useDispatch();

  const activityContent = new ActivityContent();

  const likeOnFeedPost = (feed: feedDataModel) => {
    debugLogs('like feed', feed);
    const reaction = appConstants.like;
    const myReactions = feed.myReactions;
    const id = feed.id;
    const action = myReactions.includes(reaction) ? 'added' : 'removed';
    const method = action === 'added' ? 'addReaction' : 'removeReaction';
    dispatch(feedListActions.updateFeed({updatedFeed: feed}));
    return Communities[method](reaction, id)
      .then(() => {
        debugLogs('reaction response', reaction);
      })
      .catch(error => {
        debugLogs('reaction response error', error);
      });
  };

  const commentOnFeedPost = (feed: feedDataModel, feedComment: string) => {
    debugLogs('comment feed', feed);
    const target = PostActivityTarget.comment(`${feed?.id}`);
    activityContent.text = feedComment;
    dispatch(feedListActions.updateFeed({updatedFeed: feed}));
    Communities.postActivity(activityContent, target)
      .then(result => {
        debugLogs('Posted comment: ', result);
      })
      .catch(error => {
        debugLogs('Failed to post comment, error: ', error);
      });
  };

  const reportPost = (
    reportFeed: feedDataModel,
    reportReason: string = 'post report ',
  ) => {
    debugLogs('report feed', reportFeed);
    const activityId = reportFeed.id;
    Communities.reportActivity(
      activityId,
      ReportingReason.Spam,
      reportReason,
    ).then(
      result => {
        debugLogs('Post was reported', result);
      },
      error => {
        debugLogs('Failed to post report activity, error: ', error);
      },
    );
  };

  const getReferredSmartLink = (feed: feedDataModel) => {
    const linkParams = {
      $channel: 'my_custom_channel',
      activity_id: feed.id,
    };
    return Invites.createURL(linkParams);
  };

  const getGooglePlacesReferredSmartLink = feed => {
    const linkParams = {
      $channel: 'my_custom_channel',
      PlaceID: feed?.place_id,
    };

    return Invites.createURL(linkParams);
  };
  const getDoctorPlacesReferredSmartLink = feed => {
    const linkParams = {
      $channel: 'my_custom_channel',
      shopID: feed?.shopid?.toString(),
    };
    return Invites.createURL(linkParams);
  };

  const sharePost = (feed: feedDataModel) => {
    Communities.addReaction('share', feed.id)
      .then(result => {
        debugLogs('share feed', result);
        dispatch(feedListActions.updateFeed({updatedFeed: feed}));
      })
      .catch(error => {
        debugLogs('Failed to add share feed reaction, error: ', error);
      });
  };

  const getCommentsOnPost = (feed: feedDataModel) => {
    const query = ActivitiesQuery.commentsToActivity(feed?.id);
    var pagingQuery = new PagingQuery(query);
    return Communities.getActivities(pagingQuery);
  };

  return {
    likeOnFeedPost,
    commentOnFeedPost,
    reportPost,
    sharePost,
    getCommentsOnPost,
    getReferredSmartLink,
    getGooglePlacesReferredSmartLink,
    getDoctorPlacesReferredSmartLink,
  };
};
