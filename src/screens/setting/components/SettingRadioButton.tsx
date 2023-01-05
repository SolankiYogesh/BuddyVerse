import React from 'react';
import {View, Text} from 'react-native';
import {RadioButton, Title} from 'react-native-paper';
import {colorPalates} from 'theme';
import SettingRadioButtonStyle from './SettingRadioButtonStyle';

export interface SettingRadioButtonProps {
  title: string;
  onPressChecked?: () => void;
}
const SettingRadioButton = ({
  title,
  onPressChecked = () => {},
}: SettingRadioButtonProps) => {
  const radioButton = () => {
    onPressChecked();
  };
  return (
    <View style={SettingRadioButtonStyle.radioButton}>
      <Text style={SettingRadioButtonStyle.radioButtonTitle}>{title}</Text>
      <RadioButton
        color={colorPalates.AppTheme.primary}
        value="true"
        status={offRadioButton === 'true' ? 'checked' : 'unchecked'}
        onPress={radioButton}
      />
    </View>
  );
};
export default SettingRadioButton;
