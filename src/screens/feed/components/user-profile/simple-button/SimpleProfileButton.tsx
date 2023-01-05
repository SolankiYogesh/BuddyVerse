import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SimpleProfileButtonStyle from './SimpleProfileButtonStyle';
import {ms} from 'react-native-size-matters';
import colorPalates from 'theme/colors/colorPalates';

export interface SettingButtonProps {
  title: string;
  frontIcon: string;
  onPressButton?: () => void;
}

const SimpleProfileButton = ({
  title,
  frontIcon = 'hearto',
  onPressButton = () => {},
}: SettingButtonProps) => {
  const buttonScreen = () => {
    onPressButton();
  };
  return (
    <TouchableOpacity
      style={SimpleProfileButtonStyle.settingButton}
      onPress={buttonScreen}
    >
      <View style={SimpleProfileButtonStyle.buttonTitle}>
        <IconMaterialIcons
          size={24}
          style={SimpleProfileButtonStyle.rightCornerIcon}
          name={frontIcon}
        />
        <Text
          style={{
            color: colorPalates.blackShade02,
            fontSize: ms(16),
            marginTop: ms(16),
          }}
        >
          {title}
        </Text>
      </View>
      <IconAntDesign
        size={14}
        style={SimpleProfileButtonStyle.rightCornerIcon}
        name={'right'}
      />
    </TouchableOpacity>
  );
};
export default SimpleProfileButton;
