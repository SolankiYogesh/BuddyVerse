import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import {colorPalates} from 'theme';

export interface EmojiButtonProps {
  onPressEmojiButton: () => void;
}

const EmojiButton = ({onPressEmojiButton}: EmojiButtonProps) => {
  return (
    <TouchableOpacity
      style={EmojiButtonStyle.menuButtons}
      activeOpacity={0.7}
      onPress={onPressEmojiButton}>
      <IconFontisto
        name="smiley"
        size={20}
        color={colorPalates.AppTheme.text}
      />
    </TouchableOpacity>
  );
};

export default EmojiButton;

const EmojiButtonStyle = ScaledSheet.create({
  menuButtons: {paddingHorizontal: ms(16)},
});
