import {Platform} from 'react-native';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colorPalates from '../../../theme/colors/colorPalates';
import colors from '../../../theme/colors/colors';
import fonts from '../../../theme/fonts/fonts';
export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  gradientContainer: {
    alignItems: 'center',
    padding: ms(15),
    justifyContent: 'center',
  },
  updateText: {
    color: colorPalates.white,
    fontSize: ms(14),
  },
  btnView: {
    width: '80%',
    height: ms(50),
    borderRadius: ms(10),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  imageBack: {
    width: '100%',
    height: vs(400),
  },
  absoluteView: {
    backgroundColor: colors.white,
    width: '100%',
    flex: 1,
    // justifyContent: 'center',
  },
  btnStyle: {
    width: '80%',
    alignSelf: 'center',
  },
  btnTitleText: {
    margin: s(10),
  },
  progressBar: {
    width: '85%',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    width: vs(25),
    height: vs(25),
    top: Platform.OS === 'android' ? 20 : 70,
    right: -180,
    zIndex: 1000,
    tintColor: colors.red,
  },
  obsoluteView: {
    zIndex: 1000,
    position: 'absolute',
    top: Platform.OS === 'android' ? 10 : 50,
    right: 10,
  },
  bitTetx: {
    fontSize: ms(22),
    fontFamily: fonts.primaryBoldFont,
    color: colors.blackShade02,
    width: '100%',
    textAlign: 'center',
    marginBottom: vs(10),
  },
  smallText: {
    fontSize: ms(18),
    fontFamily: fonts.primaryMediumFont,
    color: colors.blackShade02,
    width: '100%',
    textAlign: 'center',
    lineHeight: 30,
  },
});
