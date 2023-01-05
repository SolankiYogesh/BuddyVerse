import {ms} from 'react-native-size-matters';
import colors from './colors';

const colorPalates = {
  separatorColor: colors.SeparatorColor,
  AppTheme: {
    primary: colors.greenShade2A,
    secondary: colors.redShadeC3,
    background: colors.white,
    card: colors.redShadeD9,
    primaryButtonColor: colors.redShadeC0,
    primaryButtonTextColor: colors.white,
    // text: 'green',
    text: colors.blackShade02,
    border: colors.SeparatorColor,
    notification: colors.red,
    container: colors.grayShadeC8,
    cardColor: colors.greenShade59,
  },
  size: {
    defaultBorderRadius: ms(25),
  },

  DarkTheme: {
    colors: {
      background: '#121212',
      text: colors.white,
      separator: colors.grayShade80,
      primary: colors.blueShade13,
      card: colors.blueShade13,
      border: colors.blueShade13,
      notification: colors.blueShade13,
      // cardColor: colors.blueShade13,
      // otherText: colors.white,
    },
    dark: true,
  },
  LightTheme: {
    colors: {
      background: colors.white,
      text: colors.blackShade02,
      separator: colors.grayShade80,
      primary: colors.blueShade13,
      card: colors.blueShade13,
      border: colors.blueShade13,
      notification: colors.blueShade13,
      // cardColor: colors.white,
      // otherText: colors.blackShade02,
    },
    dark: false,
  },

  ...colors,
};

export default colorPalates;
