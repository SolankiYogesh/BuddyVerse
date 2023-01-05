import {ms, ScaledSheet} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';
import colors from '../../../../theme/colors/colors';
import fonts from '../../../../theme/fonts/fonts';

export default ScaledSheet.create({
  mainContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    padding: ms(10),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
  },
  imgView: {
    width: ms(24),
    height: ms(24),
    tintColor: colorPalates.blackShade02,
  },
  profileImageView: {
    marginLeft: ms(10),
  },
  textViewContainer: {
    marginLeft: ms(8),
  },
  nameText: {
    fontSize: ms(12),
    fontFamily: fonts.primarySemiBoldFont,
    color: colorPalates.blackShade02,
  },
  timeSeen: {
    fontSize: ms(11),
    fontFamily: fonts.primaryMediumFont,
    color: colors.grayShade80,
  },
});
