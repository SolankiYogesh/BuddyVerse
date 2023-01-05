import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import VideoPlayer from 'react-native-video-controls';
import {useNavigation} from '@react-navigation/native';
import colorPalates from '../../../../theme/colors/colorPalates';
import Orientation from 'react-native-orientation-locker';

const VideoPlayScreen = props => {
  const link = props?.route?.params?.link;

  const navigation = useNavigation();

  useEffect(() => {
    const navi = navigation.addListener('blur', () => {
      Orientation.lockToPortrait();
    });
    return navi;
  }, []);

  return (
    <VideoPlayer
      source={{uri: link}}
      navigator={navigation}
      toggleResizeModeOnFullscreen={true}
      seekColor={colorPalates.AppTheme.primary}
    />
  );
};

export default VideoPlayScreen;

const styles = StyleSheet.create({});
