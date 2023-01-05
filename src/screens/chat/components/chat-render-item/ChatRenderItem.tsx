import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import ChatRenderItemStyle from './ChatRenderItemStyle';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';
import moment from 'moment';
import images from '../../../../theme/images/images';
import UserImage from '../../../../components/user-profile-image/UserImage';

const ChatRenderItem = ({item}: any) => {
  const navigation = useNavigation();
  const lastMessage =
    item?.lastMessage?.text !== ''
      ? item?.lastMessage?.text
      : !!item?.lastMessage?.attachments[0]?.__private_8_imageUrl
      ? 'Image'
      : !!item?.lastMessage?.attachments[0]?.__private_10_videoUrl
      ? 'Video'
      : '';

  let time =
    moment.unix(item?.lastMessage?.sentAt).fromNow() === 'a few seconds ago'
      ? 'Now'
      : moment.unix(item?.lastMessage?.sentAt).fromNow();

  useEffect(() => {
    const interval = setInterval(() => {
      time =
        moment.unix(item?.lastMessage?.sentAt).fromNow() === 'a few seconds ago'
          ? 'Now'
          : moment.unix(item?.lastMessage?.sentAt).fromNow();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onPressItem = () => {
    navigation.navigate(screenNameEnum.AllChatsScreen, {item: item});
  };

  return (
    <TouchableOpacity
      style={ChatRenderItemStyle.itemContainer}
      onPress={onPressItem}
    >
      <UserImage
        Url={item?.avatarUrl}
        size={48}
        style={ChatRenderItemStyle.imageCirculerView}
      />

      <View style={ChatRenderItemStyle.verticalTextView}>
        <Text style={ChatRenderItemStyle.userName}>{item?.title}</Text>
        <View style={ChatRenderItemStyle.rowTextView}>
          {(lastMessage === 'Video' || lastMessage === 'Image') && (
            <Image
              style={ChatRenderItemStyle.smallLatsIcons}
              source={
                lastMessage === 'Video' ? images.videoCall : images.fillgallery
              }
              resizeMode="cover"
            />
          )}
          {item?.isTyping ? (
            <Text style={ChatRenderItemStyle.typing}>is typing...</Text>
          ) : (
            <Text
              style={ChatRenderItemStyle.message}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {lastMessage}
            </Text>
          )}
          <View style={ChatRenderItemStyle.dot} />
          <Text style={ChatRenderItemStyle.time}>{time}</Text>
        </View>
      </View>
      {item.unReadMessageCount && (
        <View style={ChatRenderItemStyle.unReadMassageView}>
          <Text style={ChatRenderItemStyle.unReadMassageText}>
            {item.unReadMessageCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ChatRenderItem;
