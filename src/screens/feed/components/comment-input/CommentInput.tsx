/* eslint-disable react-hooks/exhaustive-deps */
import {feedDataModel} from 'models/create-feed/feedDataModel';
import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';

import {useDispatch} from 'react-redux';
import {feedSliceActions, useUserState} from 'redux-wrapper/reducers';
import DeletePostModal from 'screens/feed/pages/feed-detail/components/delete-post-modal/DeletePostModal';
import ReportPostModal from 'screens/feed/pages/feed-detail/components/report-post-modal/ReportPostModal';
import {useFeedService} from 'services/feed-service/useFeedService';
import {fonts} from 'theme';
import appConstants from '../../../../models/appConstants';
import CommentListItemContainer from './CommentListItem';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  Communities,
  ActivitiesQuery,
  PagingQuery,
  UserIdList,
} from 'getsocial-react-native-sdk';
import _ from 'lodash';
import LoadingContainer from '../../../../components/loading-container/LoadingContainer';
import {useTheme} from '@react-navigation/native';
import colorPalates from '../../../../theme/colors/colorPalates';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import {Emmiter, showToast} from '../../../../utils/helper/helper';

export interface commentInputProps {
  feed: feedDataModel;
  type: string;
  isFromUser: boolean;
  CommentId: string;
}

const CommentInput = forwardRef(
  ({feed, isFromUser, type, CommentId}: commentInputProps, ref) => {
    const {likeOnFeedPost} = useFeedService();
    const [isLoadMore, setIsLoadMore] = useState(false);
    const {colors} = useTheme();
    const [blockPopUpmodal, setBlockPopUpModel] = useState(false);
    const [reportPopUpmodal, setReportPopUpModel] = useState(false);
    const [error, setError] = useState(false);
    const CommentInputStyle = styles(colors);
    const [feedComments, setFeedComments] = useState<feedDataModel[]>();
    const [reportComment, setReportComment] = useState<feedDataModel>();
    const [isVisibleReportModal, setIsVisibleReportModal] = useState(false);
    const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
    const {userData} = useUserState();
    const dispatch = useDispatch();
    const netInfo = useNetInfo();
    const [next, setNext] = useState('');
    const [loading, setLoading] = useState(false);
    const Listref = useRef<FlatList>();
    const [foxusIndex, setFocusIndex] = useState(-1);

    useEffect(() => {
      getPostComments(false);
      const emit = Emmiter.addListener('updateComments', () => {
        updateComments();
      });
      return () => {
        emit.remove();
      };
    }, []);

    useImperativeHandle(ref, () => ({
      updateComments,
      focusComment,
    }));

    // useEffect(() => {
    //   if (CommentId && !!feedComments) {
    //     console.log('CommentId', CommentId);
    //     console.log('feedComments', feedComments);
    //     const index = _.findIndex(feedComments, i => i?.id === CommentId);
    //     console.log('index', index);

    //     if (index > 0) {
    // Listref.current?.scrollToIndex({
    //   index: index,
    //   animated: true,
    // });
    //     }
    //   }
    // }, [feedComments]);

    const updateComments = () => {
      getPostComments(!!next, true);
    };

    useEffect(() => {
      getPostComments(false, true);
    }, [feed]);

    const focusComment = async () => {
      setLoading(true);
      let n = '',
        result = [],
        index = -1;
      do {
        const query = ActivitiesQuery.commentsToActivity(feed?.id);
        let pagingQuery = new PagingQuery(query);
        pagingQuery.next = n;
        const payload = await Communities.getActivities(pagingQuery);
        n = payload.next;
        setNext(payload.next);
        result = result.concat(payload?.entries);
        index = _.findIndex(result, i => i?.id === CommentId);
        setFeedComments(result);
      } while (!!n && index === -1);
      setLoading(false);

      setTimeout(() => {
        setFocusIndex(index);
        Listref.current?.scrollToIndex({
          index: index,
          animated: true,
        });
      }, 200);
    };

    const getPostComments = (isPagination = false, isLoad = false) => {
      if (isPagination && !next && next === '') {
        return;
      }

      if (isLoad) {
        setLoading(false);
      } else {
        setLoading(!isPagination);
      }

      setIsLoadMore(isPagination);
      const query = ActivitiesQuery.commentsToActivity(feed?.id);
      let pagingQuery = new PagingQuery(query);
      pagingQuery.next = next;

      try {
        Communities.getActivities(pagingQuery)
          .then(result => {
            setLoading(false);

            setNext(result?.next);
            const items = result.entries;

            if (items.length > 0) {
              setFeedComments(
                !isPagination ? items : [...feedComments, ...items],
              );
              setIsLoadMore(false);
            } else {
              setFeedComments(isPagination ? feedComments : []);
              setIsLoadMore(false);
              setNext('');
            }
          })
          .catch(() => {
            setNext('');
            setIsLoadMore(false);
            setLoading(false);
          });
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };

    const CommentMenuPress = item => {
      setReportComment(item);
      setTimeout(() => {
        if (userData?.id === item.author.userId) {
          setIsVisibleDeleteModal(!isVisibleDeleteModal);
        } else {
          setIsVisibleReportModal(true);
        }
      }, 100);
    };

    const onHideShowReportModal = () => {
      setIsVisibleReportModal(!isVisibleReportModal);
    };
    const onHideShowDeleteModal = (isDelete = false) => {
      setIsVisibleDeleteModal(!isVisibleReportModal);

      if (isDelete) {
        setTimeout(() => {
          dispatch(
            feedSliceActions.DeleteCommentAction({
              routeName: isFromUser ? 'UsersPost' : type || feed?.source?.id,
              id: feed.id,
            }),
          );

          const filterComments = _.filter(
            feedComments,
            i => i?.id !== reportComment?.id,
          );

          setFeedComments(filterComments);
        }, 200);
      }
    };

    const commentsKeyextractor = (item: feedDataModel) => item.id + item.text;

    const renderCommentList = ({item, index}: {item: feedDataModel}) => {
      return (
        <CommentListItemContainer
          comment={item}
          onPressMenu={() => CommentMenuPress(item)}
          onPressCommentLike={() => onPressCommentLike(item)}
          isFocus={foxusIndex === index}
          onFocusClicked={() => setFocusIndex(-1)}
        />
      );
    };

    const onPressCommentLike = item => {
      if (netInfo.isConnected) {
        const objFeed: feedDataModel = JSON.parse(JSON.stringify(item));

        if (
          objFeed.myReactions &&
          objFeed.myReactions.includes(appConstants.like)
        ) {
          objFeed.reactionsCount[appConstants.like] =
            objFeed.reactionsCount[appConstants.like] - 1;
          objFeed.myReactions = objFeed.myReactions?.filter(
            (reaction: string) => reaction !== appConstants.like,
          );

          Communities.removeReaction('like', objFeed?.id);
        } else {
          objFeed.reactionsCount[appConstants.like] =
            objFeed.reactionsCount && objFeed.reactionsCount[appConstants.like]
              ? objFeed.reactionsCount &&
                objFeed.reactionsCount[appConstants.like] + 1
              : 1;
          objFeed.myReactions?.push(appConstants.like);
          Communities.setReaction('like', objFeed?.id);
        }

        const findIndex = _.findIndex(feedComments, i => i?.id === item?.id);

        if (findIndex !== -1) {
          const data = JSON.parse(JSON.stringify(feedComments));

          data[findIndex] = objFeed;
          setFeedComments(data);
        }
        likeOnFeedPost(objFeed);
      }
    };

    const renderCommentListHeader = () => {
      return (
        <Text style={CommentInputStyle.commentHeader}>
          {'Comments '}({feed?.commentsCount || 0})
        </Text>
      );
    };

    const renderBottomLoader = () => {
      if (isLoadMore) {
        return (
          <>
            <View style={CommentInputStyle.indicatorStyle} />
            <ActivityIndicator
              size={'small'}
              color={colorPalates.AppTheme.primary}
            />
          </>
        );
      }
      return null;
    };

    const blockUser = () => {
      setBlockPopUpModel(false);
      setReportPopUpModel(false);

      Communities.blockUsers(UserIdList.create([feed?.author?.userId])).then(
        () => {
          showToast('USER BLOCKED');
        },
      );
    };

    const reportCommentData = () => {
      setBlockPopUpModel(false);
      setReportPopUpModel(false);
      showToast(
        'This Comment has been reported and is being reviewed. Thank you!',
      );
    };

    const noCommentView = () => {
      return (
        <View style={CommentInputStyle.noCommentsView}>
          <Text style={CommentInputStyle.noCommentsText}>No Comments</Text>
        </View>
      );
    };

    return (
      <View
        style={[
          CommentInputStyle.container,
          feedComments?.length === 0 && {height: vs(300)},
        ]}
      >
        {feedComments?.length !== 0 && !loading ? (
          <FlatList
            keyExtractor={commentsKeyextractor}
            data={feedComments}
            ref={Listref}
            onEndReached={() => getPostComments(true)}
            renderItem={renderCommentList}
            nestedScrollEnabled
            style={CommentInputStyle.listStyle}
            contentContainerStyle={{
              paddingHorizontal: s(10),
              paddingBottom: vs(50),
            }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderCommentListHeader}
            ListFooterComponent={renderBottomLoader}
            onScrollToIndexFailed={({index, averageItemLength}) => {
              const wait = new Promise(resolve => setTimeout(resolve, 150));
              wait.then(() => {
                Listref.current?.scrollToIndex({index: index, animated: true});
              });
              // Listref.current?.scrollToOffset({
              //   offset: index * averageItemLength,
              //   animated: true,
              // });
            }}
          />
        ) : (
          <View style={CommentInputStyle.absoluteView}>
            {loading ? (
              <LoadingContainer />
            ) : (
              feedComments?.length === 0 && noCommentView()
            )}
          </View>
        )}

        {isVisibleReportModal && reportComment && (
          <ReportPostModal
            reportFeed={reportComment}
            isShowReportModal={isVisibleReportModal}
            onPressCancel={() => setReportPopUpModel(false)}
            onPressReportFeed={() => {
              onHideShowReportModal();
              setTimeout(() => {
                setReportPopUpModel(true);
              }, 300);
            }}
            onPressBlockUser={() => {
              onHideShowReportModal();
              setTimeout(() => {
                setBlockPopUpModel(true);
              }, 300);
            }}
            title={'Report Comment'}
          />
        )}
        {isVisibleDeleteModal && reportComment && (
          <DeletePostModal
            deleteComment={reportComment}
            isShowDeleteModal={isVisibleDeleteModal}
            onPressCancel={onHideShowDeleteModal}
            onDeleteComment={() => {
              onHideShowDeleteModal(true);
            }}
            topic="deleteComment"
          />
        )}

        {(reportPopUpmodal || blockPopUpmodal) && (
          <AnnounceMentModal
            secondButton
            modalVisible={reportPopUpmodal || blockPopUpmodal}
            onPressButton={() => {
              reportPopUpmodal ? reportCommentData() : blockUser();
            }}
            onPressSecondButton={() => {
              setBlockPopUpModel(false);
              setReportPopUpModel(false);
            }}
            buttonText={'YES'}
            secondButtonText={'NO'}
            messageText={
              reportPopUpmodal
                ? ModalsMessages.ModalsMassages.reportComment
                : ModalsMessages.ModalsMassages.areYouSureWantToBlock
            }
            title={
              reportPopUpmodal
                ? ModalsMessages.ModalsTitles.Report
                : ModalsMessages.ModalsTitles.Block
            }
          />
        )}
        <AnnounceMentModal
          modalVisible={error}
          title={'Oops'}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
          onPressButton={() => setError(false)}
        />
      </View>
    );
  },
);

export default memo(CommentInput);

const styles = colors =>
  ScaledSheet.create({
    container: {flex: 1},
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      justifyContent: 'space-between',
      flex: 1,
      marginBottom: 8,
    },

    profileContainer: {
      flexDirection: 'row',
      marginVertical: ms(8),
      alignItems: 'center',
    },
    profileImage: {width: ms(24), height: ms(24), borderRadius: 1000},
    userName: {
      fontSize: ms(12),
      color: colors.text,
      marginLeft: ms(8),
      fontFamily: fonts.primaryMediumFont,
      flex: 1,
    },
    commentText: {
      fontFamily: fonts.primaryRegularFont,
      fontSize: ms(12),
      color: colors.text,
    },
    commentHeader: {
      fontFamily: fonts.primaryMediumFont,
      fontSize: ms(12),
      color: colors.text,
    },
    commentListItemContainer: {marginVertical: 0},
    feedReactionContainer: {
      flexDirection: 'row',
      marginVertical: ms(12),
      alignItems: 'center',
    },
    feedReactionCount: {
      fontSize: ms(12),
      color: colorPalates.grayShade80,
      marginRight: ms(16),
      marginLeft: ms(4),
      fontFamily: fonts.primaryMediumFont,
    },
    noCommentsView: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    noCommentsText: {
      fontSize: ms(15),
      color: colors.text,
      fontFamily: fonts.primaryMediumFont,
    },
    indicatorStyle: {
      marginVertical: s(15),
    },
    absoluteView: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      zIndex: 1000,
      position: 'absolute',
      height: vs(300),
      width: '100%',
    },
    listStyle: {
      marginBottom: vs(30),
      flex: 1,
      marginTop: vs(10),
    },
  });
