import {ms, s, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  itemContainer: {
    width: '100%',
    backgroundColor: colors.white,
    padding: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCirculerView: {
    marginRight: ms(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgView: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: ms(16),
    fontFamily: fonts.primaryMediumFont,
    color: colors.black,
  },
  rowTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typing: {
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
    color: colors.grayShade80,
  },
  message: {
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
    color: colors.grayShade80,
    maxWidth: '60%',
  },
  smallLatsIcons: {
    width: ms(12),
    height: ms(12),
    marginRight: s(5),
    tintColor: colors.grayShade80,
  },
  dot: {
    width: ms(5),
    height: ms(5),
    borderRadius: ms(300),
    backgroundColor: colors.grayShade80,
    marginHorizontal: ms(10),
  },
  time: {
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
    color: colors.grayShade80,
  },
  unReadMassageView: {
    borderRadius: ms(20),
    backgroundColor: colors.greenShade94,
    alignItems: 'center',
    paddingVertical: ms(5),
    paddingHorizontal: ms(10),
  },
  unReadMassageText: {
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
    color: colors.white,
  },
  verticalTextView: {
    flex: 1,
  },
  onlineDot: {
    width: ms(13),
    height: ms(13),
    borderRadius: ms(300),
    backgroundColor: colors.greenShade2A,
    marginHorizontal: ms(10),
    position: 'absolute',
    zIndex: 1000,
    bottom: 5,
    right: -7,
    borderColor: colors.white,
    borderWidth: 2,
  },
});
