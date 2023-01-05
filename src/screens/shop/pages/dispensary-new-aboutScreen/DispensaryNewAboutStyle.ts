import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';
import colors from '../../../../theme/colors/colors';
import fonts from '../../../../theme/fonts/fonts';

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  gradientCOntainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageListStyle: {
    height: '30%',
  },
  aboutContainer: {
    width: '100%',
    paddingHorizontal: s(10),
  },
  tasTitle: {
    color: colors.grayShade80,
    fontSize: ms(13),
    fontFamily: fonts.primaryMediumFont,
  },
  tabBar: {
    backgroundColor: colors.white,
  },
  indicatorStyle: {
    color: colors.blueShade02,
  },
  imageViewStyle: {
    borderRadius: ms(10),
    width: s(150),
    height: '100%',
  },
  nameText: {
    color: colors.blackShade02,
    fontFamily: fonts.primaryMediumFont,
    marginBottom: s(5),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: s(5),
  },
  dotView: {
    width: vs(2),
    height: vs(2),
    marginHorizontal: s(3),
    backgroundColor: colors.grayShade80,
    borderRadius: ms(300),
    alignSelf: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: s(5),
  },
  directionBtn: {
    padding: s(10),
    backgroundColor: colors.greenShade60,
    borderRadius: ms(20),
    paddingHorizontal: s(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: s(10),
    borderColor: colors.greenShade60,
    borderWidth: 1,
    elevation: 5,
  },
  directionBtnText: {
    color: colors.white,
    fontSize: ms(13),
    marginHorizontal: s(7),
  },
  directionsIcon: {
    width: ms(16),
    height: ms(16),
    tintColor: colors.white,
  },
  ratingText: {
    color: colors.grayShade8F,
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(13),
    marginRight: s(5),
  },
  textList: {
    marginVertical: ms(5),
  },
  tavContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    marginVertical: s(1),
    elevation: 5,
  },
  btnContainerTab: {
    padding: s(10),
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    borderBottomColor: colorPalates.AppTheme.primary,
    paddingBottom: ms(12),
    
  },
  focusText: {
    color: colorPalates.AppTheme.primary,
  },
  focusButton: {
    borderBottomColor: colorPalates.AppTheme.primary,
    borderBottomWidth: 1,
  },
  tabBarTitle: {fontSize: ms(14), fontFamily: fonts.primaryRegularFont, color: colorPalates.grayShade80},
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: ms(10),
  },
  icon: {
    width: ms(24),
    height: ms(24),
  },
  openBtnTxt: {
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
    color: colors.grayShade80,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: s(15),
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
