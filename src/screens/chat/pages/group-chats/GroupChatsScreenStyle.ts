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
      paddingBottom: s(10),
      elevation: 5,
    },
    noGroupText: {
      fontFamily: fonts.primaryMediumFont,
      fontSize: ms(18),
    },
    noGroupView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
      marginBottom: ms(10),
      paddingTop: ms(200),
    },
    lightGrayText: {
      fontFamily: fonts.primaryMediumFont,
      fontSize: ms(16),
      color: colorPalates.grayShade80,
    },
    messageListStyle: {
      width: '95%',
      alignSelf: 'center',
    },
  });
