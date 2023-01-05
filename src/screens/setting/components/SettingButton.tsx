import IconAntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import SettingButtonStyle from './SettingButtonStyle';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';

export interface SettingButtonProps {
  title: string;
  onPressButton?: () => void;
}

const SettingButton = ({
  title,
  onPressButton = () => {},
}: SettingButtonProps) => {
  const buttonScreen = () => {
    onPressButton();
  };
  return (
    <TouchableOpacity
      style={SettingButtonStyle.settingButton}
      onPress={buttonScreen}>
      <Text style={SettingButtonStyle.buttonTitle}>{title}</Text>
      <IconAntDesign
        size={14}
        style={SettingButtonStyle.rightCornerIcon}
        name={'right'}
      />
    </TouchableOpacity>
  );
};
export default SettingButton;
