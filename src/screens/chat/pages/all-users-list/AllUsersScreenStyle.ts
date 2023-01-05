import {Dimensions} from 'react-native';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 150,
  },
  lineView: {
    width: '100%',
    height: vs(1),
    backgroundColor: colors.grayShadeEx,
    marginBottom: s(5),
  },
  scrollContainer: {
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerF2: {
    flex: 1,
    backgroundColor: colorPalates.white,
  },
  viewContainer: {
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
  },
  backImage: {
    alignSelf: 'center',
    width: ms(240),
    height: ms(240),
  },
  boldText: {
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(24),
    marginBottom: ms(10),
    paddingTop: ms(200),
    color: colorPalates.AppTheme.primary,
  },
  lightGrayText: {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(16),
    color: colors.grayShade80,
  },
  btnView: {
    width: ms(50),
    height: ms(50),
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  editIcon: {
    width: '100%',
    height: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
    marginVertical: ms(5),
  },
  rowItemVIew: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ms(10),
    overflow: 'hidden',
    marginVertical: ms(5),
  },
  imageView: {
    marginRight: ms(5),
  },
  textName: {
    fontSize: ms(14),
    fontFamily: fonts.primaryMediumFont,
    color: colors.blackShade02,
  },
});
