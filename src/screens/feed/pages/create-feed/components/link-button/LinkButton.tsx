import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colorPalates} from 'theme';

export interface LinkButtonProps {
  onPressLinkButton: () => void;
}

const LinkButton = ({onPressLinkButton}: LinkButtonProps) => {
  return (
    <TouchableOpacity
      style={LinkButtonStyle.menuButtons}
      activeOpacity={0.7}
      onPress={onPressLinkButton}>
      <IconMaterialIcons
        name="insert-link"
        size={24}
        color={colorPalates.AppTheme.text}
      />
    </TouchableOpacity>
  );
};

export default LinkButton;

const LinkButtonStyle = ScaledSheet.create({
  menuButtons: {paddingHorizontal: ms(16)},
});
