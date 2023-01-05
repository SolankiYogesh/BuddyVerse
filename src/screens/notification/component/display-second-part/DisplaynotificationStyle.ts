import {ms, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  container4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    padding: ms(10),
    marginVertical: ms(5),
    elevation: 5,
    backgroundColor: colors.white,
    width: '95%',
    alignSelf: 'center',
    borderRadius: ms(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerinner: {
    justifyContent: 'space-around',
  },
  text1: {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(14),
    color: colors.blackShade02,
    marginVertical: ms(1),
  },
  textrepeat: {
    color: colors.grayShade80,
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
    marginVertical: ms(1),
  },
  textrepeat1: {
    color: colors.blackShade02,
    fontSize: ms(12),
    fontFamily: fonts.primaryRegularFont,
    marginVertical: ms(1),
    width: ms(260),
  },
  imagemain: {
    width: ms(32),
    height: ms(32),
    marginRight: ms(15),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: ms(300),
  },
  innerpart: {
    position: 'absolute',
    right: 20,
    bottom: ms(40),
    width: ms(18),
    height: ms(18),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    alignSelf: 'center',
    marginVertical: ms(2),
  },
  txtbtn: {
    height: ms(37),
  },
  button1: {
    backgroundColor: colors.grayShadeCC,
    borderRadius: ms(8),
    width: ms(97),
    height: ms(37),
    padding: ms(8),
  },
  button2: {
    width: ms(97),
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(14),
  },
  textbtn1: {
    textAlign: 'center',
    fontSize: ms(14),
    fontFamily: fonts.primaryMediumFont,
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
});
