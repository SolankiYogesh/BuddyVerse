import {ms, s, ScaledSheet} from 'react-native-size-matters';
import colors from 'theme/colors/colors';
import fonts from 'theme/images/fonts/fonts';
import colorPalates from '../../../../theme/colors/colorPalates';

export default ScaledSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: colors.white,
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
    marginTop: s(5),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  publicText: {
    fontFamily: fonts.primaryBoldFont,
    fontSize: ms(16),
    color: colors.blackShade02,
    width: '100%',
    paddingHorizontal: ms(20),
    marginVertical: ms(5),
  },
  noGroupText: {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(16),
    color: colors.grayShade80,
  },
});
