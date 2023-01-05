import {ms, vs, ScaledSheet, s} from 'react-native-size-matters';
import {colorPalates, fonts} from 'theme';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalates.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colorPalates.white,
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
    paddingTop: ms(10),
  },
  imageURL: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: vs(200),
  },
  textView: {
    flexDirection: 'column',
    paddingVertical: ms(10),
    paddingHorizontal: s(16),
  },
  titleText: {
    fontSize: ms(18),
    fontFamily: fonts.primarySemiBoldFont,
    color: colors.black,
  },
  star: {
    marginVertical: ms(10),
    flexDirection: 'row',
  },
  starrate: {
    width: ms(90),
    justifyContent: 'space-between',
  },
  rate: {
    color: colors.grayShade80,
    marginLeft: ms(5),
  },
  secondtext: {
    fontSize: ms(12),
    fontFamily: fonts.primaryRegularFont,
    color: colors.blackShade02,
  },
  row: {
    flexDirection: 'row',
    height: ms(45),
    marginHorizontal: s(16),
  },
  column: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  loginButton: {
    height: ms(35),
    width: ms(65),
    borderRadius: ms(5),
    backgroundColor: colors.blueShadeD4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: ms(15),
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  openBtnTxt: {
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
    color: colors.grayShade80,
  },
  likeBtn: {
    marginLeft: ms(15),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  likeText: {
    marginLeft: ms(5),
  },
  icon: {
    width: ms(24),
    height: ms(24),
  },
});
