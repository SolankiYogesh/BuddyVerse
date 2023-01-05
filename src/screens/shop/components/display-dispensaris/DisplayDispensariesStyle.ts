import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import {colorPalates, fonts} from 'theme';
import colors from 'theme/colors/colors';

export const dispensaryContainerStyle = () =>
  ScaledSheet.create({
    item: {
      backgroundColor: colorPalates.white,
      flexDirection: 'row',
      marginHorizontal: ms(16),
      borderRadius: ms(10),
      elevation: 5,
      marginTop: vs(2),
      marginBottom: vs(8),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
    },
  });
export const styles = ScaledSheet.create({
  leftContainer: {
    width: '50%',

    borderRadius: ms(10),
    alignItems: 'center',
    justifyContent: 'center',
    // resizeMode: 'contain',
  },
  loader: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgSize: {
    margin: ms(16),
    height: '70%',
    width: '70%',
    alignSelf: 'center',
    borderRadius: ms(10),
    // width: '60%',
    // height: '60%',
    // padding:20
  },
  rightContainer: {
    width: '50%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: ms(10),
    borderRadius: ms(10),
  },
  name: {
    fontSize: ms(15),
    fontFamily: fonts.primaryMediumFont,
    color: colors.blackShade02,
  },
  star: {
    marginTop: ms(3),
    flexDirection: 'row',
  },
  starrate: {
    width: '50%',
    justifyContent: 'space-between',
  },
  rate: {
    color: colors.grayShade80,
    marginLeft: ms(5),
  },
  image: {
    height: vs(160),
    width: '100%',
    flex: 1,
    borderRadius: ms(10),
  },
  likeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: vs(3),
    alignItems: 'center',
  },
  like: {
    fontSize: ms(12),
    marginLeft: ms(5),
    color: colors.grayShade80,
  },
  likeIcon: {
    marginRight: s(5),
  },
  cityName: {
    fontSize: ms(12),
    color: colors.blackShade02,
    marginVertical: vs(3),
    textTransform: 'capitalize',
  },
  miles: {
    fontSize: ms(12),
    marginVertical: vs(3),
    color: colors.grayShade80,
  },

  icon: {width: ms(24), height: ms(24)},
  iconMedium: {width: ms(24), height: ms(24)},
});
