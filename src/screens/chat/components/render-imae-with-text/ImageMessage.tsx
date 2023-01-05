import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import ImageMessageStyle from './ImageMessageStyle';
import RenderChatItemStyle from '../render-chat-item/RenderChatItemStyle';
import colors from '../../../../theme/colors/colors';
import ImageView from 'react-native-image-viewing';
import {ResizeMode} from 'react-native-fast-image';
import CachedImage from 'react-native-image-cache-wrapper';
import _ from 'lodash';
import Hyperlink from 'react-native-hyperlink';

const ImageMessage = ({onPressDeleteMessage, item, isYou}) => {
  const time = moment.unix(item?.sentAt || item?.createdAt).format('hh:mm');
  const imageUrl = item?.mediaAttachments
    ? item?.mediaAttachments[0]?.imageUrl ||
      item?.mediaAttachments[0]?.__private_8_imageUrl
    : item?.attachments[0]?.imageUrl ||
      item?.attachments[0]?.__private_8_imageUrl;
  const [image, setImageUrl] = useState(imageUrl || '');
  const [isVisisble, setIsvisisble] = useState(false);
  let aspectRatio = 1;
  let resize = 'contain';

  if (
    item &&
    item?.properties &&
    item?.properties?.width &&
    item?.properties?.height
  ) {
    aspectRatio =
      Number(item?.properties?.width) / Number(item?.properties?.height);
    resize =
      Number(item?.properties?.width) < 500 &&
      Number(item?.properties?.height) < 500
        ? 'cover'
        : 'contain';
  }
  const [newAspectRatio, setNewAspectRatio] = useState(aspectRatio);
  const [resizeMode, setResizeMode] = useState<ResizeMode>(resize);
  const t = item?.text?.split(' ');

  useEffect(() => {
    if (_.includes(imageUrl, 'original')) {
      setImageUrl(imageUrl);
    } else {
      let fileName = imageUrl?.split('/')?.pop();
      fileName = fileName.split('.');
      fileName = `${fileName[0]}-original.${fileName[1]}`;
      const imgUrl = `https://d1c70unjid1vm2.cloudfront.net/public/${fileName}`;
      setImageUrl(imgUrl);
    }
  }, [imageUrl]);

  const onLoadImage = event => {
    if (!item?.properties?.width || !item?.properties?.height) {
      const width = event?.nativeEvent?.source?.width;
      const height = event?.nativeEvent?.source?.height;
      if (width < 500 && height < 500) {
        setResizeMode('cover');
      }

      setNewAspectRatio(width / height);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => setIsvisisble(true)}
      onLongPress={onPressDeleteMessage}
      delayLongPress={500}
    >
      {!isYou && (
        <Text style={RenderChatItemStyle.nameText}>
          {item?.author?.displayName}
        </Text>
      )}
      {!!image && (
        <CachedImage
          source={{uri: image}}
          defaultSource={image}
          style={[ImageMessageStyle.imageView, {aspectRatio: newAspectRatio}]}
          activityIndicator={
            <View style={ImageMessageStyle.loaderStyle}>
              <ActivityIndicator color={colors.greenShade2A} size="small" />
            </View>
          }
          onLoad={onLoadImage}
          resizeMode={resizeMode}
        />
      )}

      {!!item?.text && (
        <Hyperlink
          linkStyle={ImageMessageStyle.urlFeedDescription}
          style={[
            ImageMessageStyle.messageText,
            isYou && {alignSelf: 'flex-end'},
          ]}
          onPress={url => {
            Linking.openURL(url).then(() => {});
          }}
        >
          <Text style={RenderChatItemStyle.WithoutMentionStyle}>
            <Text>
              {t.map((text: string) => {
                if (text.startsWith('@')) {
                  const mentionText = text?.substring(text?.indexOf('@'));
                  return (
                    <Text style={RenderChatItemStyle.mentionStyle}>
                      {mentionText}
                    </Text>
                  );
                }

                return (
                  <Text style={RenderChatItemStyle.WithoutMentionStyle}>
                    {text}
                  </Text>
                );
              })}
            </Text>
          </Text>
        </Hyperlink>
      )}

      <View style={ImageMessageStyle.timeReadView}>
        <Text style={ImageMessageStyle.timeText}>{time}</Text>
      </View>

      {!!imageUrl && isVisisble && (
        <ImageView
          images={[
            {
              uri: imageUrl,
            },
          ]}
          imageIndex={0}
          visible={isVisisble}
          onRequestClose={() => setIsvisisble(false)}
        />
      )}
    </TouchableOpacity>
  );
};

export default ImageMessage;
