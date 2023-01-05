import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import {fonts} from 'theme';
import colorPalates from '../../../../theme/colors/colorPalates';
import colors from '../../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalates.white,
  },
  listStyle: {
    width: '100%',
    paddingHorizontal: ms(10),
  },
  deleteImage: {
    width: ms(20),
    height: ms(20),
    tintColor: colors.white,
    marginHorizontal: ms(20),
  },
  bottomFooter: {
    width: '100%',
    height: vs(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: s(10),
  },
  gradientBack: {
    flex: 1,
    padding: ms(15),
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderRadius: ms(10),
  },
  rowBack: {
    elevation: 5,
    // width: '45%',
    alignSelf: 'flex-end',
    marginVertical: ms(5),
    // flex: 1,
    overflow: 'hidden',
    padding: 0,
    margin: 0,
  },
  firsttitle: {
    fontFamily: fonts.primaryExtraBoldFont,
    fontSize: ms(16),
    color: colors.blackShade02,
    padding: ms(10),
  },
  firsttitle1: {
    fontFamily: fonts.primaryExtraBoldFont,
    fontSize: ms(16),
    color: colors.blackShade02,
    padding: ms(10),
    marginBottom: ms(20),
  },
  container1: {
    backgroundColor: 'white',
    flex: 1,
  },
  rowFront: {
    backgroundColor: 'white',
  },

  backRightBtn: {
    alignItems: 'center',
    marginTop: ms(10),
    bottom: 0,
    justifyContent: 'space-around',
    position: 'absolute',
    paddingTop: 10,
    top: 0,
    flexDirection: 'row',
    width: ms(160),
  },
  backRightBtnLeft: {
    backgroundColor: colors.greenShade5F,
    borderBottomLeftRadius: ms(6),
    borderTopLeftRadius: ms(6),
    right: 0,
  },
  backRightBtnRight: {
    backgroundColor: colors.greenShade5F,
    right: 0,
  },
  notification: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderTopLeftRadius: colorPalates.size.defaultBorderRadius,
    borderTopRightRadius: colorPalates.size.defaultBorderRadius,
  },
  notificationtext: {
    paddingTop: ms(200),
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(24),
    color: colorPalates.AppTheme.primary,
  },
  smalltext: {
    color: colors.grayShade80,
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(16),
    paddingTop: ms(10),
  },
  mainCOntainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: colorPalates.size.defaultBorderRadius,
    borderTopRightRadius: colorPalates.size.defaultBorderRadius,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollContainer: {
    backgroundColor: colors.white,
  },
  imageBack: {
    width: vs(250),
    height: vs(250),
  },
  badgeRightIcon: {
    position: 'absolute',
    right: 20,
    top: 18,
  },
});
