import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';

// Styles
import ThemeButtonStyle from './ThemeButtonStyle';

// Models
import {themeButtonProps} from './models/themeButtonProps';

// Utils
import {colorPalates} from 'theme';
import LinearGradient from 'react-native-linear-gradient';

const ThemeButton = ({
  title = 'Button',
  loading = false,
  containerStyle = ThemeButtonStyle.container,
  titleStyle = ThemeButtonStyle.titleTextStyle,
  onPress,
}: themeButtonProps) => {
  return (
    <TouchableOpacity
      style={[ThemeButtonStyle.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}
    >
      <LinearGradient
        start={{x: 0.0, y: 2.5}}
        end={{x: 1.5, y: 2.5}}
        locations={[0, 0.5]}
        colors={[colorPalates.greenShade60, colorPalates.AppTheme.primary]}
        style={ThemeButtonStyle.linearGradientContainer}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={colorPalates.AppTheme.primaryButtonTextColor}
          />
        ) : (
          <Text style={[ThemeButtonStyle.titleTextStyle, titleStyle]}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ThemeButton;
