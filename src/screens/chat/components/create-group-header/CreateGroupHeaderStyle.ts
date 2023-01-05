import {ms, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: ms(10),
    backgroundColor: colors.white,
  },
  sideText: {
    fontSize: ms(16),
    fontFamily: fonts.primaryRegularFont,
    fontWeight: '400',
    color: colors.blackShade02,
  },
  middleText: {
    fontSize: ms(18),
    fontFamily: fonts.primarySemiBoldFont,
    fontWeight: '600',
    color: colors.blackShade02,
  },
});
