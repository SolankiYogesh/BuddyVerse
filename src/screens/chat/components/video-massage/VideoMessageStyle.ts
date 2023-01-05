import {ms, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  messageText: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(14),
    color: colors.blackShade02,
    alignSelf: 'flex-start',
    marginTop: ms(5),
  },
  timeReadView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  timeText: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(10),
    color: colors.grayShade80,
  },
  dotView: {
    width: ms(3),
    height: ms(3),
    backgroundColor: colors.grayShade80,
    borderRadius: ms(300),
    marginHorizontal: ms(5),
  },
  imageView: {
    width: ms(240),
    height: ms(200),
    borderRadius: ms(15),
  },
  loaderContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  playImage: {
    width: ms(100),
    height: ms(100),
    position: 'absolute',
    top: '25%',
    left: '30%',
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  loaderStyle: {
    flex: 1,
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
