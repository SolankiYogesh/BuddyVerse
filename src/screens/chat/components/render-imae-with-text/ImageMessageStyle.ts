import {ms, ScaledSheet, vs} from 'react-native-size-matters';
import {fonts, colorPalates} from 'theme';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  messageText: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(14),
    color: colors.blackShade02,
    alignSelf: 'flex-start',
    marginTop: ms(5),
  },
  urlFeedDescription: {
    fontSize: ms(16),
    fontWeight: '400',
    color: colorPalates.blueShade02,
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
    width: vs(200),
    // height: vs(150),
    borderRadius: ms(10),
  },
  landScapeStyle: {
    height: vs(150),
  },
});
