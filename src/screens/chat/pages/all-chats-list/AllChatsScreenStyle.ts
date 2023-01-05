import {ms, s, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import {colorPalates} from 'theme';

export const styles = colors =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorPalates.white,
    },
    viewContainer: {
      flex: 1,
      backgroundColor: colors.background,
      borderTopLeftRadius: colorPalates.size.defaultBorderRadius,
      borderTopRightRadius: colorPalates.size.defaultBorderRadius,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      paddingBottom: s(10),
    },
    backImageVIew: {
      alignItems: 'center',
      justifyContent: 'center',
      top: 150,
    },
    backImage: {
      width: ms(240),
      height: ms(240),
    },
    boldText: {
      fontFamily: fonts.primarySemiBoldFont,
      fontSize: ms(24),
      color: colorPalates.AppTheme.primary,
      paddingTop: ms(200),
      marginBottom: ms(10),
    },
    lightGrayText: {
      fontFamily: fonts.primaryMediumFont,
      fontSize: ms(16),
      color: colorPalates.grayShade80,
    },
    messageListStyle: {
      width: '95%',
      alignSelf: 'center',
      marginEnd: ms(10),
    },
  });
