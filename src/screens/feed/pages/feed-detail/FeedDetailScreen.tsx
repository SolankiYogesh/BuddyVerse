/* eslint-disable react-hooks/exhaustive-deps */
import {useRoute} from '@react-navigation/core';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import {colorPalates} from 'theme';
import {debugLogs} from 'utils/logs/logs';
import FeedDetailScreenStyle from './FeedDetailScreenStyle';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {ms} from 'react-native-size-matters';
import commonStyle from 'utils/common-style/commonStyle';
import {shareContent, showToast} from 'utils/helper/helper';
import {useFeedService} from 'services/feed-service/useFeedService';
import appConstants from 'models/appConstants';
import {useNetInfo} from '@react-native-community/netinfo';
import CommentInput from 'screens/feed/components/comment-input/CommentInput';
import ReportPostModal from './components/report-post-modal/ReportPostModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoadingContainer from 'components/loading-container/LoadingContainer';
import {
  ReportingReason,
  Communities,
  UserIdList,
} from 'getsocial-react-native-sdk';
import {feedSliceActions, useUserState} from 'redux-wrapper/reducers';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import ImageVideoLoader from 'components/image-video-loader/ImageVideoLoader';
import DeletePostModel from './components/delete-post-modal/DeletePostModal';
import screenNameEnum from 'models/screenNameEnum';
import Orientation from 'react-native-orientation-locker';
import {useIsFocused, useTheme} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import svg from '../../../../theme/images/svg';
import {
  Emmiter,
  ManualModerationTool,
  SpaceWordModeration,
} from '../../../../utils/helper/helper';
import RenderLikeButton from './components/RenderLikeButton';
import CommentBox from '../../components/comment-box/CommentBox';
import validations from '../../../../utils/validation/validation';
import alerts from '../../../../utils/alerts/alerts';
import IosBottomButtonAvoid from '../../../../components/ios-bottom-helper/IosBottomButtonAvoid';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import UserImage from '../../../../components/user-profile-image/UserImage';
import moment from 'moment';

const FeedDetailScreen = props => {
  const route = useRoute();
  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const commentRef = useRef();
  const listRef = useRef();
  const [viewH] = useState(0);
  const scrollRef = useRef();
  const {colors} = useTheme();
  const [error, setError] = useState(false);

  const {type, feed, isFromUser} = route.params;
  const {commentOnFeedPost, getReferredSmartLink, getCommentsOnPost} =
    useFeedService();
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [isLikedByMe, setIsLikedByMe] = useState(false);
  const [isVisibleReportModal, setIsVisibleReportModal] = useState(false);
  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
  const actvityID = props?.route?.params?.id;
  const commentID = props?.route?.params?.commentID;
  const [isLoading, setIsLoading] = useState(false);
  const allFeedData = useSelector(state => state?.feedData[type]);
  const dataItem = _.find(allFeedData, {id: feed?.id || actvityID});
  const [newData, setNewData] = useState(dataItem || null);
  const {userData} = useUserState();
  const [isPopUp, setIsPopUp] = useState(false);
  const [commentUsers, setCommentUsers] = useState([]);
  const isFromProfile = props?.route?.params?.isFromProfile;
  const [isGreenTalk, setISGreenTalk] = useState(false);
  const [blockPopUpmodal, setBlockPopUpModel] = useState(false);
  const [reportPopUpmodal, setReportPopUpModel] = useState(false);
  const [isActivityDeleted, setActivityDeleted] = useState(false);

  const isCommentFocused = !!route?.params?.isCommentFocused;

  useEffect(() => {
    if (isFocus) {
      Orientation.lockToPortrait();
    }
  }, [isFocus]);

  useEffect(() => {
    setISGreenTalk(newData?.source?.id === appConstants.APIGreenTalk);
  }, [newData]);

  useEffect(() => {
    if (
      listRef.current &&
      isCommentFocused &&
      viewH !== 0 &&
      type !== 'greentalk'
    ) {
      setTimeout(() => {
        listRef.current?.scrollToPosition(0, viewH > 200 ? 200 : viewH);
      }, 1000);
    }
  }, [viewH]);

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
          setIsLoading(false);
          setNewData(data);
          setIsLikedByMe(
            data?.myReactions && data?.myReactions.includes(appConstants.like),
          );
          scrollRef.current?.updateComments();

          setLikeCount(data?.reactionsCount?.like || 0);
          setShareCount(data?.reactionsCount?.share || 0);
          setCommentCount(data?.commentsCount || 0);
          if (commentID) {
            scrollRef.current?.focusComment();
          }
        })
        .catch(e => {
          if (_.includes(e?.message, 'Not Found')) {
            setActivityDeleted(true);
          }

          setIsLoading(false);
        });
    } catch (error) {
      console.log('error', error);
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
          routeName: isFromUser ? 'UsersPost' : type || newData?.source?.title,
          id: newData.id,
        }),
      );
    }
  };

  const hideShowVideoFullScreenMode = () => {
    props?.navigation.navigate(screenNameEnum.VideoPlayScreen, {
      link: newData?.mediaAttachments[0].videoUrl,
    });
  };

  const FullScreenButton = () => {
    return (
      <TouchableOpacity
        style={{position: 'absolute', top: 16, right: 16}}
        onPress={hideShowVideoFullScreenMode}
      >
        <IconEntypo
          name="resize-full-screen"
          size={ms(24)}
          color={colorPalates.white}
        />
      </TouchableOpacity>
    );
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
            routeName: isFromUser ? 'UsersPost' : type || objFeed?.source?.id,
            id: objFeed.id,
          }),
        );
        setNewData(objFeed);

        setCommentCount(c => c + 1);
        setTimeout(() => {
          scrollRef.current?.updateComments();
          Emmiter.emit('updateComments');
        }, 1000);
        commentRef?.current?.clearComment();
        // commentRef?.current?.clearComment();
      }
    } else {
      setIsPopUp(true);
    }
  };

  const blockUser = () => {
    setBlockPopUpModel(false);
    setReportPopUpModel(false);
    Communities.blockUsers(UserIdList.create([newData?.author?.userId])).then(
      () => {
        showToast('USER BLOCKED');
      },
    );
  };

  const onPressMenuButton = () => {
    if (newData.author.userId !== userData?.id) {
      setIsVisibleReportModal(true);
    } else {
      setIsVisibleDeleteModal(!isVisibleDeleteModal);
    }
  };

  const onHideShowReportModal = () => {
    setIsVisibleReportModal(false);
  };

  const onHideShowDeleteModal = () => {
    setIsVisibleDeleteModal(!isVisibleReportModal);
  };

  const onPressShare = () => {
    try {
      getReferredSmartLink(newData).then(async shareData => {
        debugLogs('shareData', shareData);
        const isShare = await shareContent(shareData, newData, userData);
        if (isShare) {
          Communities.addReaction('share', newData?.id);
          if (!actvityID) {
            dispatch(
              feedSliceActions.UpdateShareAction({
                routeName: isFromUser
                  ? 'UsersPost'
                  : type || newData?.source?.title,
                id: newData.id,
              }),
            );
          }
        }
      });

      setTimeout(() => {
        getFeedById();
      }, 1000);
    } catch (error) {
      console.log('error', error);
      setError(true);
    }
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
        <UserImage Url={newData?.author?.avatarUrl} size={48} />

        <View style={FeedDetailScreenStyle.profileDetailContainer}>
          <Text style={FeedDetailScreenStyle.profileName}>
            {(newData?.author && newData?.author?.displayName) || 'Greenlync'}
          </Text>

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
      <TouchableOpacity
        onPress={() => {
          if (listRef.current && type !== 'greentalk') {
            setTimeout(() => {
              listRef.current?.scrollToPosition(0, viewH > 200 ? 200 : viewH);
            }, 1000);
          }
        }}
      >
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
    setReportPopUpModel(false);
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

  const CustomView = !isGreenTalk ? KeyboardAwareScrollView : View;
  return (
    <>
      <SafeAreaView style={FeedDetailScreenStyle.container}>
        <ScreenHeader
          isBackVisible={true}
          title={type || newData?.source?.title}
        />
        <View style={{flex: 1}}>
          {isLoading ? (
            <LoadingContainer />
          ) : isActivityDeleted ? (
            <View style={FeedDetailScreenStyle.noFeedView}>
              <Text style={FeedDetailScreenStyle.noFeedText}>Feed Deleted</Text>
            </View>
          ) : (
            <CustomView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              ref={listRef}
              contentContainerStyle={{flexGrow: 0}}
              style={{flex: 1}}
            >
              <View style={{marginHorizontal: ms(16)}}>
                <FeedDetailProfile />
                {newData?.mediaAttachments && newData?.mediaAttachments[0] && (
                  <View>
                    {
                      <ImageVideoLoader
                        isVideoVisible
                        data={newData?.mediaAttachments[0]}
                        feed={newData}
                      />
                    }
                    {newData?.mediaAttachments[0]?.videoUrl !== null &&
                      Platform.OS !== 'ios' && <FullScreenButton />}
                  </View>
                )}
                {!!newData?.text && (
                  <Text
                    style={
                      isGreenTalk
                        ? FeedDetailScreenStyle.greenTalkTextStyle
                        : FeedDetailScreenStyle.feedDescription
                    }
                  >
                    {newData?.text}
                  </Text>
                )}
                <FeedActionContainer />
              </View>
              <View style={FeedDetailScreenStyle.devider} />

              <View
                style={[
                  FeedDetailScreenStyle.viewContainer,
                  {backgroundColor: colors.background},
                  !isGreenTalk && {
                    height: Dimensions.get('window').height / 1.5,
                  },
                ]}
              >
                <CommentInput
                  feed={newData}
                  ref={scrollRef}
                  type={type || newData?.source?.id}
                  isFromUser={isFromUser}
                  CommentId={commentID}
                />
              </View>
            </CustomView>
          )}

          {isVisibleReportModal && (
            <ReportPostModal
              reportFeed={newData}
              isShowReportModal={isVisibleReportModal}
              onPressCancel={onHideShowReportModal}
              onPressReportFeed={() => {
                setIsVisibleReportModal(false);
                setTimeout(() => {
                  setBlockPopUpModel(true);
                }, 300);
              }}
              onPressBlockUser={() => {
                setIsVisibleReportModal(false);

                setTimeout(() => {
                  setReportPopUpModel(true);
                }, 300);
              }}
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
          {!isActivityDeleted && (
            <CommentBox
              onPressCommentSend={comment => onPressComment(comment)}
              ref={commentRef}
              mentionsList={commentUsers}
            />
          )}
        </View>

        {(reportPopUpmodal || blockPopUpmodal) && (
          <AnnounceMentModal
            secondButton
            modalVisible={reportPopUpmodal || blockPopUpmodal}
            onPressButton={() => {
              !reportPopUpmodal ? reportUser() : blockUser();
            }}
            onPressSecondButton={() => {
              setBlockPopUpModel(false);
              setReportPopUpModel(false);
            }}
            buttonText={'YES'}
            secondButtonText={'NO'}
            messageText={
              !reportPopUpmodal
                ? ModalsMessages.ModalsMassages.areYouSureWantToReport
                : ModalsMessages.ModalsMassages.areYouSureWantToBlock
            }
            title={
              !reportPopUpmodal
                ? ModalsMessages.ModalsTitles.Report
                : ModalsMessages.ModalsTitles.Block
            }
          />
        )}

        <AnnounceMentModal
          modalVisible={isPopUp}
          buttonText={'ok'}
          messageText={ModalsMessages.ModalsMassages.offensiveWord}
          onPressButton={() => setIsPopUp(false)}
        />
        <AnnounceMentModal
          modalVisible={error}
          title={'Oops'}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
          onPressButton={() => setError(false)}
        />
        <IosBottomButtonAvoid />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.background}} />
    </>
  );
};

export default FeedDetailScreen;
