import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {colorPalates} from 'theme';

export interface VideoPlayButtonProps {
  onPressVideoButton: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  iconColor?: string;
}

const VideoPlayButton = ({
  onPressVideoButton,
  containerStyle = {},
  iconColor = colorPalates.AppTheme.text,
}: VideoPlayButtonProps) => {
  return (
    <TouchableOpacity
      style={[VideoPlayButtonStyle.container, containerStyle]}
      onPress={onPressVideoButton}>
      <IconAntDesign name="caretright" size={24} color={iconColor} />
    </TouchableOpacity>
  );
};

export default VideoPlayButton;

const VideoPlayButtonStyle = ScaledSheet.create({
  container: {
    borderRadius: 100,
    height: 48,
    width: 48,
    backgroundColor: colorPalates.AppTheme.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
