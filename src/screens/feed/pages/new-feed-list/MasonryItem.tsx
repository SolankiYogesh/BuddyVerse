import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import svg from '../../../../theme/images/svg';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colors from '../../../../theme/colors/colors';
import fonts from '../../../../theme/fonts/fonts';
import colorPalates from '../../../../theme/colors/colorPalates';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from '../../../../models/screenNameEnum';
import {useDispatch} from 'react-redux';
import {feedSliceActions} from '../../../../redux-wrapper/reducers/feed-slice/feedSlice';
import {Communities} from 'getsocial-react-native-sdk';
import {shareContent} from '../../../../utils/helper/helper';
import {useFeedService} from '../../../../services/feed-service/useFeedService';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import appConstants from '../../../../models/appConstants';
import ImageVideoLoader from '../../../../components/image-video-loader/ImageVideoLoader';
import UserImage from '../../../../components/user-profile-image/UserImage';
import Hyperlink from 'react-native-hyperlink';
import useUserState from '../../../../redux-wrapper/reducers/user-slice/userState';

const MasonryItem = ({
  item,
  isFromUser = false,
  isFromProfile = false,
  visisbleID2,
  visisbleID1,
}) => {
  const isVideo = !!item?.mediaAttachments[0]?.videoUrl;
  const isImage = !!item?.mediaAttachments[0]?.imageUrl;
  const isLiked = item?.myReactions?.includes('like');
  const likes: number = item?.reactionsCount?.like;
  const commentCount = item?.commentsCount;
  const shareCount = item?.reactionsCount?.share || 0;
  const {getReferredSmartLink} = useFeedService();
  const [itemData, setItemData] = useState(item || null);
  const [error, setError] = useState(false);
  const [isVisislbe, setIsVisislbe] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isGreenTalk = appConstants.APIGreenTalk === itemData?.source?.id;
  const userData = useUserState();

  useEffect(() => {
    setIsVisislbe(visisbleID1 === item?.id || visisbleID2 === item?.id);
  }, [visisbleID1, visisbleID2]);

  useEffect(() => {
    setItemData(item);
  }, [item]);

  const onPressShare = () => {
    try {
      getReferredSmartLink(itemData).then(async shareData => {
        const isShare = await shareContent(shareData, itemData, userData);
        if (isShare) {
          Communities.addReaction('share', itemData?.id);
          dispatch(
            feedSliceActions.UpdateShareAction({
              routeName: appConstants.APITheJoint,
              id: itemData?.id,
            }),
          );
        }
      });
    } catch (e) {
      setError(true);
    }
  };

  const onPressProfile = () => {
    navigation.navigate(screenNameEnum.UserProfileScreen, {
      userId: itemData?.author?.userId,
    });
  };

  const onPressComments = () => {
    navigation.navigate(screenNameEnum.FeedDetailScreen, {
      feed: itemData,
      type: isFromProfile ? 'myPost' : itemData?.source?.id,
      isFromComment: true,
      isCommentFocused: true,
      id: itemData?.id,
      isFromUser: isFromUser,
    });
  };

  const goToFeedDetail = () => {
    if (itemData?.source?.id === 'UsersPost') {
      navigation.navigate(screenNameEnum.FeedDetailScreen, {
        id: itemData?.id,
        type: isFromProfile ? 'myPost' : itemData?.source?.id,
        feed: itemData,
        isFromProfile: isFromProfile,
        isFromUser: isFromUser,
      });
    } else {
      navigation.navigate(screenNameEnum.FeedDetailScreen, {
        feed: itemData,
        type: isFromProfile ? 'myPost' : itemData?.source?.id,
        id: itemData?.id,
        isFromProfile: isFromProfile,
        isFromUser: isFromUser,
      });
    }
  };

  const onPressLike = async () => {
    dispatch(
      feedSliceActions.UpdateLikeAction({
        routeName: isFromUser ? 'UsersPost' : itemData?.source?.id,
        id: itemData?.id,
      }),
    );
  };

  const renderLikeContainer = () => {
    return (
      <View style={styles.likeComntainer}>
        <TouchableOpacity
          onPress={onPressLike}
          style={styles.likeButtonContainer}
        >
          {isLiked ? (
            <SvgXml xml={svg.like} height={ms(24)} width={ms(24)} />
          ) : (
            <SvgXml xml={svg.unlike} height={ms(24)} width={ms(24)} />
          )}
          <Text style={styles.countText}>{likes || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPressComments}
          style={[styles.likeButtonContainer, {marginLeft: ms(10)}]}
        >
          <SvgXml xml={svg.commentIcon} height={ms(20)} width={ms(20)} />
          <Text style={styles.countText}>{commentCount || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressShare}
          style={[styles.likeButtonContainer, {marginLeft: ms(10)}]}
        >
          <SvgXml height={ms(24)} width={ms(24)} xml={svg.charm_forward} />
          <Text style={[styles.countText, {flex: 1}]}>{shareCount || 0}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToFeedDetail}>
      <TouchableOpacity style={styles.profileView} onPress={onPressProfile}>
        <UserImage
          Url={itemData?.author?.avatarUrl}
          size={25}
          style={styles.profileImage}
        />

        <Text style={styles.userNametext}>{itemData?.author?.displayName}</Text>
      </TouchableOpacity>
      <View
        style={[styles.feedView, {borderRadius: isGreenTalk ? ms(10) : ms(25)}]}
      >
        {(isImage || isVideo) && (
          <ImageVideoLoader
            data={itemData?.mediaAttachments[0]}
            feed={itemData}
            isMuteVisible={false}
            isVideoVisible={isVisislbe}
          />
        )}
        {!!itemData?.text && (
          <Hyperlink linkStyle={styles.urlFeedDescription}>
            <Text style={styles.feedText}>{itemData?.text}</Text>
          </Hyperlink>
        )}
        {renderLikeContainer()}
      </View>
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

export default React.memo(MasonryItem);

const styles = ScaledSheet.create({
  container: {
    margin: s(5),
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: s(10),
    paddingHorizontal: s(10),
  },
  profileImage: {
    marginRight: s(10),
  },
  userNametext: {
    fontSize: ms(15),
    fontFamily: fonts.primaryMediumFont,
    color: colors.blackShade02,
  },
  feedView: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: ms(10),
    // overflow: 'hidden',
  },
  likeComntainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: s(10),
  },
  countText: {
    fontSize: ms(12),
    color: colorPalates.grayShade80,
    fontFamily: fonts.primaryMediumFont,
    marginLeft: s(2),
  },
  CommentsText: {
    fontSize: ms(12),
    color: colorPalates.grayShade80,
    fontFamily: fonts.primaryMediumFont,
    marginLeft: s(5),
  },
  feedText: {
    paddingHorizontal: s(10),
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(12),
    color: colorPalates.AppTheme.text,
  },
  urlFeedDescription: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(14),
    color: colors.blueShade02,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: ms(10),
  },
  videoCOntainer: {
    position: 'absolute',
    zIndex: 1000,
  },
  imageViewLoading: {
    width: '100%',
  },
  playImg: {
    width: vs(100),
    height: vs(100),
  },
  likeTOuchView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  LoaderView: {
    flex: 1,
    zIndex: 1000,
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  margin0: {
    marginRight: 0,
  },
});
