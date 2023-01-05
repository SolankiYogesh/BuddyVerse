import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {colorPalates} from 'theme';

export interface VideoButtonProps {
  color?: String;
  onPressVideoButton: () => void;
}

const VideoButton = ({
  onPressVideoButton,
  color = '#02091F',
}: VideoButtonProps) => {
  return (
    <TouchableOpacity
      style={VideoButtonStyle.menuButtons}
      activeOpacity={0.7}
      onPress={onPressVideoButton}
    >
      <IconFontAwesome name="video-camera" size={20} color={color} />
    </TouchableOpacity>
  );
};

export default VideoButton;

const VideoButtonStyle = ScaledSheet.create({
  menuButtons: {paddingRight: ms(16)},
});
