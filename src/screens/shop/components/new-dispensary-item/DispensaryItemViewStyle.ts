import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colors from '../../../../theme/colors/colors';
import fonts from '../../../../theme/fonts/fonts';

export const styles = ScaledSheet.create({
  mainContainer: {
    width: '90%',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: s(5),
    padding: s(10),
    borderRadius: ms(10),
    alignSelf: 'center',
  },
  like: {
    fontSize: ms(12),
    marginLeft: ms(5),
    color: colors.grayShade80,
  },
  imageView: {
    width: vs(80),
    height: vs(80),
    borderRadius: ms(10),
    marginLeft: s(5),
  },
  imageListStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: s(5),
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
    marginTop: ms(5),
  },
  directionBtn: {
    padding: s(10),
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
  gradientCOntainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
