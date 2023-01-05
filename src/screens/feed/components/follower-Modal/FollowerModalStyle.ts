import {ms, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
    width: '100%',
    flex: 1,
  },
  container: {
    backgroundColor: colors.white,
    paddingTop: ms(10),
    borderTopLeftRadius: ms(20),
    borderTopEndRadius: ms(20),
    maxHeight: '50%',
  },
  widthContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: ms(10),
  },
  shapContainer: {
    paddingHorizontal: ms(20),
    backgroundColor: colors.grayShade80,
    borderRadius: ms(20),
    height: ms(9),
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    padding: ms(5),
    marginVertical: ms(5),
    borderBottomColor: colors.grayShadeCC,
    borderBottomWidth: 1,
  },
  btnText: {
    color: colors.blackShade02,
    fontSize: ms(16),
    fontFamily: fonts.primaryMediumFont,
    fontWeight: '500',
  },
  cancelBtnContainer: {
    backgroundColor: colors.grayShadeCC,
    padding: ms(10),
    borderRadius: ms(10),
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: ms(10),
  },
});
