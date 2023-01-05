import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colorPalates from '../../../../theme/colors/colorPalates';
import RenderLikeButton from '../feed-detail/components/RenderLikeButton';
import {ms, s} from 'react-native-size-matters';
import IconEntypo from 'react-native-vector-icons/Entypo';
import fonts from '../../../../theme/fonts/fonts';
import moment from 'moment';
import {SvgXml} from 'react-native-svg';
import svg from '../../../../theme/images/svg';
import {useDispatch} from 'react-redux';
import {useFeedService} from '../../../../services/feed-service/useFeedService';
import _ from 'lodash';
import useUserState from '../../../../redux-wrapper/reducers/user-slice/userState';
import appConstants from '../../../../models/appConstants';
import {feedSliceActions} from '../../../../redux-wrapper/reducers/feed-slice/feedSlice';
import {shareContent, showToast} from '../../../../utils/helper/helper';
import screenNameEnum from '../../../../models/screenNameEnum';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  Communities,
  ReportingReason,
  UserIdList,
} from 'getsocial-react-native-sdk';
import DeletePostModel from '../feed-detail/components/delete-post-modal/DeletePostModal';
import ReportPostModal from '../feed-detail/components/report-post-modal/ReportPostModal';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import UserImage from '../../../../components/user-profile-image/UserImage';
import Hyperlink from 'react-native-hyperlink';

const GreenTalkNewDetailsItem = ({item, index}) => {
  const [isVisibleReportModal, setIsVisibleReportModal] = useState(false);
  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
  const [isLikedByMe, setIsLikedByMe] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [blockPopUpmodal, setBlockPopUpModel] = useState(false);
  const [reportPopUpmodal, setReportPopUpModel] = useState(false);
  const [error, setError] = useState(false);

  const {colors} = useTheme();
  const styles = myStyle(colors);

  const dispatch = useDispatch();

  const {getReferredSmartLink} = useFeedService();
  const {userData} = useUserState();
  const [isPopUp, setIsPopUp] = useState(false);
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  useEffect(() => {
    setCommentCount(item?.commentsCount || 0);
    setLikeCount(item?.reactionsCount?.like || 0);
    setIsLikedByMe(
      item?.myReactions && _.includes(item?.myReactions, appConstants.like),
    );
    setShareCount(item?.reactionsCount?.share || 0);
  }, [item]);

  const onPressProfile = () => {
    navigation.navigate(screenNameEnum.UserProfileScreen, {
      userId: item?.author?.userId,
    });
  };

  const onPressLike = async () => {
    dispatch(
      feedSliceActions.UpdateLikeAction({
        routeName: appConstants.APIGreenTalk,
        id: item.id,
      }),
    );
  };

  const onPressShare = () => {
    try {
      getReferredSmartLink(item).then(async shareData => {
        const isShare = await shareContent(shareData, item, userData);
        if (isShare) {
          Communities.addReaction('share', item?.id);
          dispatch(
            feedSliceActions.UpdateShareAction({
              routeName: appConstants.APIGreenTalk,
              id: item?.id,
            }),
          );
        }
      });
    } catch (e) {
      setError(true);
    }
  };

  const reportUser = () => {
    setReportPopUpModel(false);
    try {
      Communities.reportActivity(
        item?.id,
        ReportingReason.Spam,
        'ban user',
      ).then(() => {
        showToast(
          'This post has been reported and is being reviewed. Thank you!',
        );
      });
    } catch (e) {
      setError(true);
    }
  };

  const blockUser = () => {
    setBlockPopUpModel(false);
    Communities.blockUsers(UserIdList.create([item?.author?.userId])).then(
      () => {
        showToast('USER BLOCKED');
      },
    );
  };

  const onPressMenuButton = () => {
    if (item?.author?.userId !== userData?.id) {
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

  const renderMedia = () => {
    const time = moment.unix(item?.createdAt).fromNow();
    return (
      <View style={styles.mediaCOntainer}>
        {!!item?.text && (
          <View style={styles.textViewContainer}>
            {!!item?.text && (
              <Hyperlink
                linkStyle={styles.urlFeedDescription}
                onPress={url => {
                  console.log('url', url);

                  Linking.openURL(url).then(() => {});
                }}
              >
                <Text style={styles.feedDescription}>{item?.text} </Text>
              </Hyperlink>
            )}
          </View>
        )}
        <View style={styles.feedDetailProfile}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={onPressProfile}
          >
            <UserImage Url={item?.author?.avatarUrl} size={35} />

            <Text style={styles.profileName}>
              {(item?.author && item?.author?.displayName) || 'Greenlync'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reactionView}>
          <View style={styles.innerView}>
            <TouchableOpacity
              onPress={onPressLike}
              style={[styles.likeButtonContainer]}
            >
              <RenderLikeButton
                onPressLike={onPressLike}
                isLikedByMe={isLikedByMe}
              />
              <Text style={styles.countText}>{likeCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.likeButtonContainer]}
              onPress={() => {
                navigation.navigate(screenNameEnum.CommentScreen, {
                  feedId: item?.id,
                  feed: item,
                  actvityID: item?.id,
                });
              }}
            >
              <SvgXml height={ms(24)} width={ms(24)} xml={svg.commentIcon} />
              <Text style={styles.countText}>{commentCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPressShare}
              style={[styles.likeButtonContainer, styles.margin0]}
            >
              <SvgXml height={ms(24)} width={ms(24)} xml={svg.charm_forward} />
              <Text style={[styles.countText]}>{shareCount}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={onPressMenuButton}
            hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
          >
            <IconEntypo
              name="dots-three-vertical"
              size={ms(18)}
              color={colorPalates.blackShade02}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        width: width,
        marginVertical: s(5),
      }}
      onPress={() => {
        navigation.navigate(screenNameEnum.CommentScreen, {
          feedId: item?.id,
          feed: item,
          actvityID: item?.id,
        });
      }}
      key={`feedListItems${index}${index + index}`}
    >
      <View style={styles.container}>{renderMedia()}</View>
      <AnnounceMentModal
        modalVisible={isPopUp}
        buttonText={'ok'}
        messageText={ModalsMessages.ModalsMassages.offensiveWord}
        onPressButton={() => setIsPopUp(false)}
      />
      {isVisibleReportModal && (
        <ReportPostModal
          reportFeed={item}
          isShowReportModal={isVisibleReportModal}
          onPressCancel={onHideShowReportModal}
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
        />
      )}
      {isVisibleDeleteModal && !isVisibleReportModal && (
        <DeletePostModel
          deletePost={item}
          isShowDeleteModal={isVisibleDeleteModal}
          onPressCancel={onHideShowDeleteModal}
        />
      )}
      {(reportPopUpmodal || blockPopUpmodal) && (
        <AnnounceMentModal
          secondButton
          modalVisible={reportPopUpmodal || blockPopUpmodal}
          onPressButton={() => {
            reportPopUpmodal ? reportUser(0) : blockUser();
          }}
          onPressSecondButton={() => {
            setBlockPopUpModel(false);
            setReportPopUpModel(false);
          }}
          buttonText={'YES'}
          secondButtonText={'NO'}
          messageText={
            reportPopUpmodal
              ? ModalsMessages.ModalsMassages.areYouSureWantToReport
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
    </TouchableOpacity>
  );
};

export default React.memo(GreenTalkNewDetailsItem);

const myStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    mediaCOntainer: {
      borderRadius: colorPalates.size.defaultBorderRadius,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 5,

      backgroundColor: colorPalates.white,
      marginTop: s(2),
    },
    reactionView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingVertical: s(2),
      paddingBottom: s(10),
      paddingHorizontal: s(10),
      paddingLeft: ms(55),
      justifyContent: 'space-between',
    },
    feedDetailProfile: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: ms(10),
      paddingHorizontal: s(10),
    },
    profileImage: {width: ms(35), height: ms(35), borderRadius: 1000},

    profileDetailContainer: {
      marginLeft: ms(16),
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    profileName: {
      fontFamily: fonts.primaryMediumFont,
      fontSize: ms(16),
      color: colorPalates.blackShade02,
      marginLeft: ms(16),
    },
    profileUserName: {
      fontFamily: fonts.primaryRegularFont,
      fontSize: ms(12),
      color: colorPalates.blackShade02,
      lineHeight: ms(18),
    },
    feedTime: {
      fontFamily: fonts.primaryRegularFont,
      fontSize: ms(12),
      color: colorPalates.grayShade80,
    },
    countText: {
      fontSize: ms(12),
      color: colorPalates.blackShade02,
      marginRight: ms(10),
      marginLeft: ms(2),
      fontFamily: fonts.primaryMediumFont,
    },
    feedDescription: {
      fontSize: ms(16),
      fontWeight: '500',
      color: colorPalates.AppTheme.primary,
    },
    urlFeedDescription: {
      fontSize: ms(16),
      fontWeight: '400',
      color: colorPalates.blueShade02,
    },
    textViewContainer: {
      width: '100%',
      backgroundColor: colorPalates.white,
      borderRadius: colorPalates.size.defaultBorderRadius,
      justifyContent: 'center',
      paddingVertical: s(20),
      paddingHorizontal: s(10),
    },
    commentContainer: {
      flex: 1,
      backgroundColor: colors.background,
      marginTop: s(10),
    },
    likeButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: ms(40),
    },
    margin0: {
      marginRight: 0,
    },
    innerView: {
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
