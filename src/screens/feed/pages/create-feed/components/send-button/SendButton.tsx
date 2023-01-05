import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import colorPalates from '../../../../../../theme/colors/colorPalates';

export interface SendButtonProps {
  onPressSendButton: () => void;
  isDisable: boolean;
}

const SendButton = ({
  onPressSendButton,
  isDisable = false,
}: SendButtonProps) => {
  return (
    <TouchableOpacity
      style={SendButtonStyle.menuButtons}
      activeOpacity={0.7}
      onPress={onPressSendButton}
      disabled={isDisable}
    >
      <IconIonicons
        name="paper-plane-sharp"
        size={24}
        color={
          isDisable ? colorPalates.grayShade80 : colorPalates.AppTheme.primary
        }
      />
    </TouchableOpacity>
  );
};

export default SendButton;

const SendButtonStyle = ScaledSheet.create({
  menuButtons: {paddingHorizontal: ms(16)},
});
