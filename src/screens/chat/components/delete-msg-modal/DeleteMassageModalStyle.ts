import {ms, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';

export const styles = ScaledSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: ms(15),
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: ms(10),
    width: '100%',
  },
  btnText: {
    color: colors.grayShade80,
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(14),
  },
});
