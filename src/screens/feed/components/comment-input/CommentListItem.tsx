/* eslint-disable react-hooks/exhaustive-deps */
import {feedDataModel} from 'models/create-feed/feedDataModel';
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Linking} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import {colorPalates, fonts} from 'theme';
import IconEntypo from 'react-native-vector-icons/Entypo';
import appConstants from 'models/appConstants';

import {useNavigation, useTheme} from '@react-navigation/native';
import screenNameEnum from '../../../../models/screenNameEnum';
import RenderLikeButton from '../../pages/feed-detail/components/RenderLikeButton';
import moment from 'moment';
import {timeFetcher} from '../../../../utils/helper/helper';
import UserImage from '../../../../components/user-profile-image/UserImage';
import _ from 'lodash';
import Hyperlink from 'react-native-hyperlink';

export interface CommentListItemContainerProps {
  comment: feedDataModel;
  onPressMenu: () => void;
  onPressCommentLike: () => void;
  isFocus: boolean;
  onFocusClicked: () => {};
}

const CommentListItemContainer = ({
  comment,
  onPressMenu,
  onPressCommentLike,
  isFocus,
  onFocusClicked,
}: CommentListItemContainerProps) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLikedByMe, setIsLikedByMe] = useState(false);
  const navigation = useNavigation();
  const {colors} = useTheme();
  const CommentListItemContainerStyle = styles(colors);
  const createTime = timeFetcher(moment.unix(comment?.createdAt).toDate());

  useEffect(() => {
    if (comment.myReactions) {
      setIsLikedByMe(comment.myReactions.includes(appConstants.like));
      setLikeCount(comment.reactionsCount.like || 0);
    }
  }, [comment]);

  useEffect(() => {
    if (comment.myReactions) {
      setIsLikedByMe(comment.myReactions.includes(appConstants.like));
      setLikeCount(comment.reactionsCount.like || 0);
    }
    setTimeout(() => {
      onFocusClicked();
    }, 5000);
  }, []);

  const MenuButton = () => {
    return (
      <TouchableOpacity
        onPress={() => onPressMenu()}
        hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
        style={{marginLeft: s(10)}}
      >
        <IconEntypo
          name="dots-three-vertical"
          size={ms(22)}
          color={colorPalates.grayShade80}
        />
      </TouchableOpacity>
    );
  };

  const onPressProfile = () => {
    navigation.push(screenNameEnum.UserProfileScreen, {
      userId: comment?.author?.userId,
    });
  };

  const FeedReactions = () => {
    return (
      <View style={CommentListItemContainerStyle.feedReactionContainer}>
        <Text style={CommentListItemContainerStyle.feedReactionCount}>
          {createTime}
        </Text>
        {likeCount !== 0 && (
          <Text style={CommentListItemContainerStyle.feedReactionCount}>
            {likeCount} likes
          </Text>
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        CommentListItemContainerStyle.commentListItemContainer,
        isFocus && {
          backgroundColor: '#eaf7e9',
          borderRadius: ms(10),
          padding: 5,
        },
      ]}
      disabled={!isFocus}
      onPress={onFocusClicked}
    >
      <UserImage
        Url={comment.author.avatarUrl}
        size={30}
        onPress={onPressProfile}
        style={CommentListItemContainerStyle.profileImage}
      />
      <View style={{flex: 1, margin: 0, padding: 0}}>
        <View
          style={{
            flex: 1,
            paddingLeft: s(10),
          }}
        >
          <Text style={CommentListItemContainerStyle.userName}>
            {comment.author.displayName}
          </Text>
          {!!comment.text && (
            <Hyperlink
              linkStyle={CommentListItemContainerStyle.urlCommentText}
              onPress={url => {
                Linking.openURL(url).then(() => {});
              }}
              style={CommentListItemContainerStyle.commentTextContainer}
            >
              <Text style={CommentListItemContainerStyle.commentText}>
                {comment?.text}
              </Text>
            </Hyperlink>
          )}
        </View>
        <FeedReactions />
      </View>
      <View style={CommentListItemContainerStyle.buttonView}>
        <RenderLikeButton
          isLikedByMe={isLikedByMe}
          onPressLike={onPressCommentLike}
          isComment={true}
        />
        <MenuButton />
      </View>
    </TouchableOpacity>
  );
};

export default CommentListItemContainer;
const styles = colors =>
  ScaledSheet.create({
    profileContainer: {
      flexDirection: 'row',
      marginVertical: ms(8),
      alignItems: 'center',
    },
    profileImage: {
      width: ms(30),
      height: ms(30),
      borderRadius: 1000,
      marginTop: vs(5),
    },
    userName: {
      fontSize: ms(11),
      color: colors.text,
      fontFamily: fonts.primaryLightFont,
      width: '100%',
    },
    commentText: {
      fontFamily: fonts.primaryRegularFont,
      fontSize: ms(12),
      color: colors.text,
    },
    urlCommentText: {
      fontFamily: fonts.primaryRegularFont,
      fontSize: ms(12),
      color: colorPalates.blueShade02,
    },
    commentTextContainer: {
      marginTop: vs(5),
    },
    commentHeader: {
      fontFamily: fonts.primaryMediumFont,
      fontSize: ms(12),
      color: colorPalates.AppTheme.text,
    },
    commentListItemContainer: {
      width: '100%',
      flexDirection: 'row',
      marginTop: vs(10),
    },
    feedReactionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginTop: s(10),
      marginLeft: s(5),
    },
    feedReactionCount: {
      fontSize: ms(12),
      color: colorPalates.grayShade80,
      marginRight: ms(16),
      marginLeft: ms(4),
      fontFamily: fonts.primaryMediumFont,
    },
    heartIcon: {width: ms(26), height: ms(26)},
    buttonView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      minWidth: s(50),
      marginLeft: s(10),
    },
  });
