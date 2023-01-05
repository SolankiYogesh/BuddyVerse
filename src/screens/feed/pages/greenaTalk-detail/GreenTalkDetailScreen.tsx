import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View, SafeAreaView} from 'react-native';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import {colorPalates} from 'theme';
import {debugLogs} from 'utils/logs/logs';
import FeedDetailScreenStyle from '../feed-detail/FeedDetailScreenStyle';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {ms, s} from 'react-native-size-matters';
import commonStyle from 'utils/common-style/commonStyle';
import {shareContent, showToast} from 'utils/helper/helper';
import {useFeedService} from 'services/feed-service/useFeedService';
import appConstants from 'models/appConstants';
import {useNetInfo} from '@react-native-community/netinfo';
import CommentInput from 'screens/feed/components/comment-input/CommentInput';
import ReportPostModal from '../feed-detail/components/report-post-modal/ReportPostModal';
import LoadingContainer from 'components/loading-container/LoadingContainer';
import {
  ReportingReason,
  Communities,
  UserIdList,
} from 'getsocial-react-native-sdk';
import {feedSliceActions, useUserState} from 'redux-wrapper/reducers';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import DeletePostModel from '../feed-detail/components/delete-post-modal/DeletePostModal';
import screenNameEnum from 'models/screenNameEnum';
import {useRoute} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import svg from '../../../../theme/images/svg';
import {
  ManualModerationTool,
  SpaceWordModeration,
} from '../../../../utils/helper/helper';
import RenderLikeButton from '../feed-detail/components/RenderLikeButton';
import CommentBox from '../../components/comment-box/CommentBox';
import validations from '../../../../utils/validation/validation';
import alerts from '../../../../utils/alerts/alerts';
import IosBottomButtonAvoid from '../../../../components/ios-bottom-helper/IosBottomButtonAvoid';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import UserImage from '../../../../components/user-profile-image/UserImage';
import moment from 'moment';

const GreenTalkDetailScreen = props => {
  const route = useRoute();
  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const commentRef = useRef();
  const listRef = useRef();
  const {type, feed} = route.params;
  const {commentOnFeedPost, getReferredSmartLink, getCommentsOnPost} =
    useFeedService();
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [isLikedByMe, setIsLikedByMe] = useState(false);
  const [isVisibleReportModal, setIsVisibleReportModal] = useState(false);
  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
  const actvityID = props?.route?.params?.id;
  const [isLoading, setIsLoading] = useState(false);
  const allFeedData = useSelector(state => state?.feedData[type]);
  const dataItem = _.find(allFeedData, {id: feed?.id || actvityID});
  const [newData, setNewData] = useState(dataItem || null);
  const {userData} = useUserState();
  const [isPopUp, setIsPopUp] = useState(false);
  const [commentUsers, setCommentUsers] = useState([]);
  const isFromProfile = props?.route?.params?.isFromProfile;
  const [error, setError] = useState(false);

  useEffect(() => {
    if (actvityID) {
      getFeedById(true);
    } else {
      const dItem = _.find(allFeedData, {id: feed?.id || actvityID});
      setNewData(dItem);

      intialSetup();
    }
    getPostComments();
  }, []);

  useEffect(() => {
    if (allFeedData) {
      actvityID ? getFeedById(false) : intialSetup();
    }
  }, [allFeedData]);
  const getPostComments = () => {
    if (newData) {
      try {
        getCommentsOnPost(newData)
          .then(result => {
            if (result.entries?.length !== 0) {
              const usersIds = _.map(result.entries, i => {
                return i?.author;
              });
              const uniqIds = _.unionBy(usersIds, i => i?.userId);
              const filterIds = _.filter(
                uniqIds,
                i => i?.userId !== userData?.id,
              );
              setCommentUsers(filterIds);
            }
          })
          .catch(error => {
            debugLogs('Failed to get comments, error: ', error);
          });
      } catch (e) {
        setError(true);
      }
    }
  };

  const getFeedById = (isLoad = false) => {
    setIsLoading(isLoad);
    try {
      Communities.getActivity(actvityID)
        .then(resp => {
          const data = JSON.parse(JSON.stringify(resp));

          setNewData(data);
          setIsLikedByMe(
            data?.myReactions && data?.myReactions.includes(appConstants.like),
          );
          setLikeCount(data?.reactionsCount?.like || 0);
          setShareCount(data?.reactionsCount?.share || 0);
          setCommentCount(data?.commentsCount || 0);
          scrollRef.current?.updateComments();
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } catch (e) {
      setIsLoading(false);
      setError(true);
    }
  };

  const intialSetup = () => {
    const dItem = _.find(allFeedData, {id: feed?.id || actvityID});
    setCommentCount(dItem?.commentsCount);
    setNewData(dItem);
    getFeedById(false);
    refressLikeShareComment();
  };

  const refressLikeShareComment = () => {
    const dItem = _.find(allFeedData, {id: feed?.id || actvityID});
    setNewData(dItem);

    setIsLikedByMe(
      dItem?.myReactions && dItem?.myReactions.includes(appConstants.like),
    );
    setLikeCount(dItem?.reactionsCount?.like || 0);
    setShareCount(dItem?.reactionsCount?.share || 0);
    setCommentCount(dItem?.commentsCount || 0);
  };

  const blockUser = () => {
    Communities.blockUsers(UserIdList.create([dItem?.author?.userId])).then(
      () => {
        showToast('USER BLOCKED');
      },
    );
  };

  const onPressLike = async () => {
    if (actvityID) {
      if (_.includes(newData.myReactions, 'like')) {
        await Communities.removeReaction('like', newData.id);
      } else {
        await Communities.setReaction('like', newData.id);
      }
      getFeedById();
    } else {
      dispatch(
        feedSliceActions.UpdateLikeAction({
          routeName: type,
          id: newData.id,
        }),
      );
    }
  };

  const onPressComment = (comment: string) => {
    if (validations.isEmpty(comment)) {
      alerts.errorAlert('Please enter comment first.');
      return;
    }
    const isSafe = ManualModerationTool(comment);
    const advIsSafe = isSafe && SpaceWordModeration(comment);

    if (advIsSafe) {
      if (netInfo.isConnected) {
        let objFeed = JSON.parse(JSON.stringify(newData));

        objFeed.commentsCount = objFeed.commentsCount + 1;
        commentOnFeedPost(objFeed, comment);
        dispatch(
          feedSliceActions.UpdateCommentAction({
            routeName: type,
            id: objFeed.id,
          }),
        );
        setNewData(objFeed);

        setCommentCount(c => c + 1);
        setTimeout(() => {
          listRef.current?.updateComments();
        }, 1000);
        commentRef?.current?.clearComment();
        // commentRef?.current?.clearComment();
      }
    } else {
      setIsPopUp(true);
    }
  };

  const onPressMenuButton = () => {
    if (newData.author.userId !== userData?.id) {
      setIsVisibleReportModal(true);
    } else {
      setIsVisibleDeleteModal(!isVisibleDeleteModal);
    }
  };

  const onHideShowReportModal = () => {
    setIsVisibleReportModal(!isVisibleReportModal);
  };

  const onHideShowDeleteModal = () => {
    setIsVisibleDeleteModal(!isVisibleReportModal);
  };

  const onPressShare = () => {
    try {
      getReferredSmartLink(newData).then(async shareData => {
        const isShare = await shareContent(shareData, newData, userData);
        if (isShare) {
          Communities.addReaction('share', newData?.id);
          if (!actvityID) {
            dispatch(
              feedSliceActions.UpdateShareAction({
                routeName: type,
                id: newData.id,
              }),
            );
          }
        }
      });
    } catch (e) {
      setError(true);
    }

    setTimeout(() => {
      getFeedById();
    }, 1000);
  };

  const onPressProfile = () => {
    props?.navigation.navigate(screenNameEnum.UserProfileScreen, {
      userId: newData?.author?.userId,
    });
  };

  const FeedDetailProfile = () => {
    const time = moment.unix(newData?.createdAt).fromNow();

    return (
      <TouchableOpacity
        style={FeedDetailScreenStyle.feedDetailProfile}
        onPress={onPressProfile}
      >
        <UserImage Url={newData?.author.avatarUrl} size={48} />

        <View style={FeedDetailScreenStyle.profileDetailContainer}>
          <Text style={FeedDetailScreenStyle.profileName}>
            {(newData?.author && newData?.author?.displayName) || 'Greenlync'}
          </Text>
          {/* <Text style={FeedDetailScreenStyle.profileUserName}>
                    {(newData?.author && newData?.author?.displayName) || '@greenLync'}
                  </Text> */}
          {/* <Text style={FeedDetailScreenStyle.feedTime}>{time}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  const LikeButton = () => {
    return (
      <RenderLikeButton onPressLike={onPressLike} isLikedByMe={isLikedByMe} />
    );
  };
  const CommentButton = () => {
    return (
      <TouchableOpacity>
        <SvgXml height={ms(24)} width={ms(24)} xml={svg.commentIcon} />
      </TouchableOpacity>
    );
  };
  const ForwardButton = () => {
    return (
      <TouchableOpacity onPress={onPressShare}>
        <SvgXml height={ms(24)} width={ms(24)} xml={svg.charm_forward} />
      </TouchableOpacity>
    );
  };

  const MenuButton = () => {
    return (
      <TouchableOpacity
        onPress={onPressMenuButton}
        hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
      >
        <IconEntypo
          name="dots-three-vertical"
          size={ms(18)}
          color={colorPalates.grayShade80}
        />
      </TouchableOpacity>
    );
  };

  const ActionCount = ({count}: {count: string | number}) => {
    return <Text style={FeedDetailScreenStyle.actionCount}>{count}</Text>;
  };

  const FeedActionContainer = () => {
    return (
      <View style={FeedDetailScreenStyle.actionContainer}>
        <LikeButton />
        <ActionCount count={likeCount} />
        <CommentButton />
        <ActionCount count={commentCount} />
        <ForwardButton />
        <View style={commonStyle.flexOne}>
          <ActionCount count={shareCount} />
        </View>
        <MenuButton />
      </View>
    );
  };

  const reportUser = () => {
    onHideShowReportModal();
    const id = props?.route?.params?.feed?.id;
    try {
      Communities.reportActivity(id, ReportingReason.Spam, 'ban user').then(
        () => {
          showToast(
            'This post has been reported and is being reviewed. Thank you!',
          );
        },
      );
    } catch (e) {
      setError(true);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorPalates.AppTheme.background,
      }}
    >
      <ScreenHeader isBackVisible={true} title={newData?.source?.title} />
      <View style={FeedDetailScreenStyle.GreenTalkcontainer}>
        <FeedDetailProfile />
        {!!newData?.text && (
          <Text style={FeedDetailScreenStyle.greenTalkTextStyle}>
            {newData?.text}
          </Text>
        )}
        <FeedActionContainer />

        <View style={FeedDetailScreenStyle.GreenTalkcontainerDevider} />
        <AnnounceMentModal
          modalVisible={isPopUp}
          buttonText={'ok'}
          messageText={ModalsMessages.ModalsMassages.offensiveWord}
          onPressButton={() => setIsPopUp(false)}
        />
        {isLoading ? (
          <LoadingContainer />
        ) : (
          <>
            {isVisibleReportModal && (
              <ReportPostModal
                reportFeed={newData}
                isShowReportModal={isVisibleReportModal}
                onPressCancel={onHideShowReportModal}
                onPressReportFeed={() => reportUser()}
                onPressBlockUser={() => blockUser()}
              />
            )}
            {isVisibleDeleteModal && !isVisibleReportModal && (
              <DeletePostModel
                deletePost={newData}
                isShowDeleteModal={isVisibleDeleteModal}
                onPressCancel={onHideShowDeleteModal}
                isFromProfile={isFromProfile}
              />
            )}
          </>
        )}
        <CommentInput
          feed={newData}
          // onPressComment={}
          type={type}
          ref={listRef}
        />
        <CommentBox
          onPressCommentSend={comment => onPressComment(comment)}
          ref={commentRef}
          mentionsList={commentUsers}
        />
        <AnnounceMentModal
          modalVisible={error}
          title={'Oops'}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
          onPressButton={() => setError(false)}
        />
      </View>
      <IosBottomButtonAvoid />
    </SafeAreaView>
  );
};

export default GreenTalkDetailScreen;
