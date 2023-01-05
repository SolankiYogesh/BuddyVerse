import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {colorPalates} from 'theme';
import SimpleButtonStyle from './SimpleButtonStyle';
import {buttonProps} from './models/buttonProps';

const SimpleButton = ({
  title = 'Button',
  loading = false,
  containerStyle = {},
  buttonTitleStyle = SimpleButtonStyle.buttonTitle,
  onPress,
}: buttonProps) => {
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={colorPalates.AppTheme.primaryButtonTextColor}
        />
      ) : (
        <Text style={[SimpleButtonStyle.buttonTitle, buttonTitleStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default SimpleButton;
