import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

export interface CameraButtonProps {
  onPressCameraButton: () => void;
  color?: String;
}

const CameraButton = ({
  onPressCameraButton,
  color = '#02091F',
}: CameraButtonProps) => {
  return (
    <TouchableOpacity
      style={CameraButtonStyle.menuButtons}
      activeOpacity={0.7}
      onPress={onPressCameraButton}
    >
      <IconFontAwesome name="camera" size={20} color={color} />
    </TouchableOpacity>
  );
};

export default CameraButton;

const CameraButtonStyle = ScaledSheet.create({
  menuButtons: {paddingRight: ms(16)},
});
