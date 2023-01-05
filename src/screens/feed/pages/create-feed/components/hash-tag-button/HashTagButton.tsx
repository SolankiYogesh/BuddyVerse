import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colorPalates} from 'theme';

export interface HashTagButtonProps {
  onPressHashTagButton: () => void;
}

const HashTagButton = ({onPressHashTagButton}: HashTagButtonProps) => {
  return (
    <TouchableOpacity
      style={HashTagButtonStyle.menuButtons}
      activeOpacity={0.7}
      onPress={onPressHashTagButton}>
      <IconMaterialIcons
        name="tag"
        size={24}
        color={colorPalates.AppTheme.text}
      />
    </TouchableOpacity>
  );
};

export default HashTagButton;

const HashTagButtonStyle = ScaledSheet.create({
  menuButtons: {paddingHorizontal: ms(16)},
});
