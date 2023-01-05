import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import SimpleMessage from '../render-simple-message/SimpleMessage';
import RenderChatItemStyle from './RenderChatItemStyle';
import FastImage from 'react-native-fast-image';
import {images} from 'theme';
import ImageMessage from '../render-imae-with-text/ImageMessage';
import VideoMessage from '../video-massage/VideoMessage';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from '../../../../models/screenNameEnum';
import {s} from 'react-native-size-matters';
import UserImage from '../../../../components/user-profile-image/UserImage';

const RenderChatItem = ({item, userID, onPressDeleteMessage}: any) => {
  const isYou = userID === item?.author?.userId;

  const navigation = useNavigation();

  const isImageWithText = item?.mediaAttachments
    ? !!item?.mediaAttachments[0]?.imageUrl
    : item?.attachments[0]?.imageUrl;

  const isVideoWithText = item?.mediaAttachments
    ? !!item?.mediaAttachments[0]?.videoUrl
    : item?.attachments[0]?.videoUrl;

  const onPressProfile = () => {
    navigation.push(screenNameEnum.UserProfileScreen, {
      userId: item?.author?.userId,
    });
  };

  return (
    <TouchableOpacity
      onLongPress={() => onPressDeleteMessage(item)}
      delayLongPress={500}
      style={[
        RenderChatItemStyle.mainCOntainer,
        {justifyContent: isYou ? 'flex-end' : 'flex-start'},
      ]}
    >
      {!isYou && (
        <UserImage
          Url={item?.author?.avatarUrl}
          size={24}
          onPress={onPressProfile}
          style={RenderChatItemStyle.profileAlign}
        />
      )}
      <View
        style={[
          !isYou && {marginLeft: s(5)},
          isYou
            ? RenderChatItemStyle.senderMessageContainer
            : RenderChatItemStyle.receiverMessageContainer,
        ]}
      >
        {isImageWithText ? (
          <ImageMessage
            item={item}
            isYou={isYou}
            onPressDeleteMessage={() => onPressDeleteMessage(item)}
          />
        ) : isVideoWithText ? (
          <VideoMessage
            item={item}
            isYou={isYou}
            onPressDeleteMessage={() => onPressDeleteMessage(item)}
          />
        ) : (
          <SimpleMessage item={item} isYou={isYou} />
        )}
      </View>

      {isYou && (
        <TouchableOpacity
          onPress={onPressProfile}
          style={[
            RenderChatItemStyle.profileAlign,
            isYou && {marginLeft: s(10)},
          ]}
        >
          <FastImage
            source={
              item?.author?.avatarUrl
                ? {
                    uri: item?.author?.avatarUrl,
                    priority: FastImage.priority.normal,
                  }
                : images.dp
            }
            resizeMode="cover"
            style={RenderChatItemStyle.profileImageView}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

RenderChatItem.defaultProps = {
  onPressDeleteMessage: () => {},
};

export default RenderChatItem;
