import React from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import colorPalates from '../../../../../../theme/colors/colorPalates';

interface videoDimeProps {
  height: number;
  width: number;
  isLandScape: boolean;
}

export interface FeedImageProps {
  info: any;
  imgURI: string;
  containerStyle?: StyleProp<ImageStyle>;
  onImageLoad?: (data: videoDimeProps) => void;
}

const FeedImage = ({
  info,
  imgURI,
  containerStyle = {},
  onImageLoad,
}: FeedImageProps) => {
  const aspectRatio = Number(info.width) / Number(info.height);

  return (
    <Image
      source={{uri: imgURI}}
      style={[FeedImageStyle.feedImage, {aspectRatio}, containerStyle]}
      resizeMode="contain"
      onLoad={e => {
        onImageLoad({
          height: e.nativeEvent.source.height,
          width: e.nativeEvent.source.width,
          isLandScape: e.nativeEvent.source.height < e.nativeEvent.source.width,
        });
      }}
    />
  );
};

export default FeedImage;

const FeedImageStyle = ScaledSheet.create({
  feedImage: {
    width: '100%',
    borderRadius: colorPalates.size.defaultBorderRadius,
  },
});
