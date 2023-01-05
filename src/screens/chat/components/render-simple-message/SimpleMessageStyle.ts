import {ms, s, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  messageText: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(14),
    color: colors.blackShade02,
    minWidth: s(35),
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
  mentionStyle: {
    color: 'green',
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(14),
    minWidth: s(35),
  },
  urlStyle: {
    color: colors.blueShade02,
    fontSize: ms(14),
    minWidth: s(35),
  },
  WithoutMentionStyle: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(14),
    color: colors.blackShade02,
    minWidth: s(35),
  },
});
