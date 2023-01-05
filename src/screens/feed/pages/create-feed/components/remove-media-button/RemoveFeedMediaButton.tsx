import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {colorPalates} from 'theme';

export interface RemoveFeedMediaButtonProps {
  onPressRemoveFeedMediaButton: () => void;
}

const RemoveFeedMediaButton = ({
  onPressRemoveFeedMediaButton,
}: RemoveFeedMediaButtonProps) => {
  return (
    <TouchableOpacity
      style={RemoveFeedMediaStyle.removeFeedMediaContainer}
      activeOpacity={0.7}
      onPress={onPressRemoveFeedMediaButton}
    >
      <IconIonicons
        name="ios-close-circle"
        size={25}
        color={colorPalates.white}
      />
    </TouchableOpacity>
  );
};

export default RemoveFeedMediaButton;

const RemoveFeedMediaStyle = ScaledSheet.create({
  removeFeedMediaContainer: {
    padding: ms(4),
    position: 'absolute',
    top: ms(5),
    right: ms(4),
  },
});
