import {ms, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  container: {
    width: '95%',
    borderWidth: 1,
    borderRadius: ms(5),
    borderColor: colors.grayShadeE6,
    padding: ms(10),
    marginHorizontal: ms(10),
    alignSelf: 'center',
    marginVertical: ms(5),
  },
  title: {
    fontSize: ms(10),
    fontFamily: fonts.primaryRegularFont,
    fontWeight: '400',
    color: colors.grayShade80,
  },
  input: {
    height: ms(21),
    padding: 0,
    width: '100%',
    fontSize: ms(14),
    fontFamily: fonts.primaryRegularFont,
    fontWeight: '400',
    color: colors.blackShade02,
  },
  multiLineStyle: {
    minHeight: ms(60),
    textAlignVertical: 'top',
    color: colors.blackShade02,
  },
});
