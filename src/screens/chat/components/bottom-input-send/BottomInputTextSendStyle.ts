import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';
import fonts from '../../../../theme/fonts/fonts';

export const styles = colors =>
  ScaledSheet.create({
    inputConntainer: {
      width: '90%',
      padding: ms(5),
      paddingHorizontal: ms(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'center',
      borderRadius: ms(300),
      overflow: 'hidden',
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      borderColor: '#80848F80',
      borderWidth: 1,
    },
    mentionsViewHeight: {
      maxHeight: ms(180),
      width: '80%',
      alignSelf: 'center',
      backgroundColor: colorPalates.grayShadeE9,
      borderRadius: ms(15),
      padding: ms(10),
    },
    profileView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: s(10),
      marginVertical: vs(5),
    },
    profileImage: {
      marginRight: s(10),
    },
    profileText: {
      fontSize: ms(15),
      fontFamily: fonts.primaryMediumFont,
      color: colorPalates.blackShade02,
    },
    mainContainer: {},
    iconStyle: {
      width: ms(20),
      height: ms(20),
      tintColor: colorPalates.grayShade80,
      marginHorizontal: ms(10),
    },
    input: {
      flex: 1,
    },
    openKeyStyle: {
      width: '95%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      alignSelf: 'center',
    },
    rowView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageStyleContainer: {
      height: ms(200),
      width: '80%',
      alignSelf: 'center',
      backgroundColor: colorPalates.grayShadeE9,
      borderRadius: ms(15),
      padding: ms(10),
    },
    imageStyle: {
      width: '100%',
      height: '100%',
      borderRadius: ms(15),
    },
    crossImage: {
      width: '100%',
      height: '100%',
      tintColor: colorPalates.red,
    },
    crossContainer: {
      width: ms(20),
      height: ms(20),
      position: 'absolute',
      top: 15,
      right: 15,
      zIndex: 1000,
    },
    textInput: {
      borderWidth: 1,
      // marginVertical: ms(20),
      minHeight: ms(48),
      padding: ms(12),
      // width: ms(220),
      // paddingHorizontal: ms(8),
      paddingVertical: 0,
      borderRadius: 4,
      borderColor: colorPalates.grayShadeE6,
      fontFamily: fonts.primaryRegularFont,
      fontSize: ms(14),
      flex: 1,
      color: colors.text,
    },
    feedVideo: {
      borderRadius: ms(10),
    },
  });

export const InputTextStyle = (isTextInputActive: boolean) => {
  return {
    // marginVertical: ms(20),
    minHeight: ms(48),
    padding: ms(12),
    // width: ms(220),
    // paddingHorizontal: ms(8),
    paddingVertical: 0,
    borderColor: isTextInputActive
      ? colorPalates.AppTheme.primary
      : colorPalates.grayShadeE6,
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(14),
    flex: 1,
    color: colorPalates.grayShade80,
  };
};
