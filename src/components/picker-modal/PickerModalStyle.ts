import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates, fonts} from 'theme';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    padding: 0,
    margin: 0,
  },
  secondContainer: {
    backgroundColor: colors.white,
    borderTopEndRadius: ms(15),
    borderTopStartRadius: ms(15),
    padding: ms(10),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: ms(20),
    backgroundColor: colors.white,
    width: '80%',
    paddingHorizontal: ms(10),
    alignSelf: 'center',
  },
  btnContainer: {
    alignItems: 'center',
    // borderBottomColor: colors.blackShade02,
    // borderBottomWidth: 1,
  },
  btnText: {
    fontSize: ms(11),
    fontFamily: fonts.primaryMediumFont,
    color: colors.blackShade02,
    padding: ms(5),
  },
  btnImage: {
    width: ms(40),
    height: ms(40),
    tintColor: colorPalates.AppTheme.primary,
  },
  titleText: {
    fontSize: ms(13),
    color: colors.grayShade80,
    fontFamily: fonts.primaryMediumFont,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
