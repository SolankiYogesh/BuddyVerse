import {ms, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  container4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: ms(15),
    elevation: 5,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    marginVertical: ms(5),
    paddingVertical: ms(10),
    borderRadius: ms(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imagemain: {
    width: ms(32),
    height: ms(32),
    borderRadius: ms(300),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: ms(300),
  },
  containerinner: {
    marginLeft: ms(18),
  },
  text1: {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(14),
    color: colors.blackShade02,
  },
  textrepeat: {
    color: colors.grayShade80,
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
    alignSelf: 'center',
    width: '68%',
  },
  textrepeat1: {
    color: colors.black1F,
    fontSize: ms(12),
    fontFamily: fonts.primaryRegularFont,
    flex: 1,
    width: ms(260),
  },
  innerpart: {
    position: 'absolute',
    right: 20,
    bottom: ms(50),
    width: ms(18),
    height: ms(18),
  },
  image1: {
    width: ms(18),
    height: ms(18),
  },
  smallImage: {
    width: ms(15),
    height: ms(15),
    position: 'absolute',
    zIndex: 1000,
    bottom: 0,
    right: 0,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },

  ParentView: {
    height: '135%',
    position: 'absolute',
    right: -1,
    justifyContent: 'center',
  },
});
