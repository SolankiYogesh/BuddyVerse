import React from 'react';
import {Platform, StyleProp, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Video from 'react-native-video';
import {debugLogs} from 'utils/logs/logs';
import colorPalates from '../../../../../../theme/colors/colorPalates';

interface videoDimeProps {
  height: number;
  width: number;
  isLandScape: boolean;
}

interface infoProps {
  width: number;
  height: number;
}

export interface FeedVideoProps {
  videoURI: string;
  containerStyle?: StyleProp<ViewStyle>;
  isPortrait?: boolean;
  onVideoLoad?: (Data: videoDimeProps) => void;
  info: infoProps;
}

const FeedVideo = ({
  videoURI,
  containerStyle = {},
  info,
  onVideoLoad,
}: FeedVideoProps) => {
  const aspectRatio = Number(info?.width) / Number(info?.height);
  const onError = error => {
    debugLogs('video URI', videoURI);
    debugLogs('video error', error);
  };

  return (
    <Video
      source={{
        uri: videoURI,
      }}
      onLoad={event => {
        onVideoLoad({
          height: event?.naturalSize?.height,
          width: event?.naturalSize?.width,
          isLandScape: event?.naturalSize?.orientation === 'landscape',
        });
      }}
      onError={onError}
      style={[FeedVideoStyle.feedVideo, containerStyle, {aspectRatio}]}
      controls={Platform.select({ios: true, android: false})}
      resizeMode="cover"
    />
  );
};

export default FeedVideo;

const FeedVideoStyle = ScaledSheet.create({
  feedVideo: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: colorPalates.size.defaultBorderRadius,
  },
});
