import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import VideoMessageStyle from './VideoMessageStyle';

import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';

import FastImage from 'react-native-fast-image';
import RenderChatItemStyle from '../render-chat-item/RenderChatItemStyle';
import {ActivityIndicator} from 'react-native-paper';
import colors from '../../../../theme/colors/colors';
import images from '../../../../theme/images/images';

const VideoMessage = ({onPressDeleteMessage, item, isYou}) => {
  const naviagtion = useNavigation();
  const time = moment.unix(item?.sentAt || item?.createdAt).format('hh:mm');
  const videoUrl = item?.mediaAttachments
    ? item?.mediaAttachments[0]?.videoUrl
    : item?.attachments[0]?.videoUrl;
  const [isLoading, setIsLoading] = useState(false);
  const index = videoUrl?.lastIndexOf('mediafilename=');
  const removeExt = videoUrl?.replace('.mp4', '');
  const finalString = removeExt?.slice(index, removeExt?.length);
  const fileName = finalString?.replace('mediafilename=', '');

  const onPressPlayVideo = () => {
    naviagtion.navigate(screenNameEnum.VideoPlayScreen, {
      link: videoUrl,
    });
  };

  const CustomText = () => {
    const t = item?.text.split(' ');
    return (
      <Text>
        {t.map((text: string) => {
          if (text.startsWith('@')) {
            return (
              <Text style={RenderChatItemStyle.mentionStyle}>{text} </Text>
            );
          }
          return (
            <Text style={RenderChatItemStyle.WithoutMentionStyle}>{text} </Text>
          );
        })}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPressPlayVideo}
      onLongPress={onPressDeleteMessage}
      delayLongPress={500}
    >
      {!isYou && (
        <Text style={RenderChatItemStyle.nameText}>
          {item?.author?.displayName}
        </Text>
      )}
      <FastImage
        source={{
          uri: `https://d1c70unjid1vm2.cloudfront.net/public/${fileName.replace(
            '.mp4',
            '',
          )}.jpg`,
        }}
        resizeMode="cover"
        style={VideoMessageStyle.imageView}
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
        }}
      />

      {isLoading && (
        <View style={VideoMessageStyle.loaderStyle}>
          <ActivityIndicator color={colors.greenShade2A} size="small" />
        </View>
      )}

      {!!item?.text && (
        <Text
          style={[
            VideoMessageStyle.messageText,
            isYou && {alignSelf: 'flex-end'},
          ]}
        >
          <CustomText />
        </Text>
      )}
      <View style={VideoMessageStyle.timeReadView}>
        <Text style={VideoMessageStyle.timeText}>{time}</Text>
        {/* {isYou && <View style={SimpleMessageStyle.dotView} />} */}
        {/* {isYou && <Text style={SimpleMessageStyle.timeText}>Read</Text>} */}
      </View>
      {!isLoading && (
        <Image
          source={images.play}
          resizeMode="contain"
          style={[VideoMessageStyle.playImage, !!!item?.text && {top: '30%'}]}
        />
      )}
    </TouchableOpacity>
  );
};

export default VideoMessage;
