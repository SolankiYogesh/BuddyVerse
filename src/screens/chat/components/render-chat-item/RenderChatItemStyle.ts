import {ms, s, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';
import {colorPalates} from '../../../../theme';

export default ScaledSheet.create({
  senderMessageContainer: {
    maxWidth: '75%',
    padding: ms(7),
    backgroundColor: colors.blueShadeD4,
    alignSelf: 'flex-end',
    borderRadius: ms(5),
    // borderBottomStartRadius: ms(10),
    // borderTopStartRadius: ms(10),
    // borderTopEndRadius: ms(10),
    margin: ms(5),
    marginRight: 0,
  },

  WithoutMentionStyle: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(14),
    color: colors.blackShade02,
    minWidth: s(35),
  },
  receiverMessageContainer: {
    maxWidth: '75%',
    padding: ms(7),
    backgroundColor: colors.grayShadeE6,
    alignSelf: 'flex-start',
    // borderBottomEndRadius: ms(10),
    // borderTopStartRadius: ms(10),
    borderRadius: ms(5),
    // borderTopEndRadius: ms(10),
    margin: ms(5),
  },
  profileImageView: {
    width: ms(24),
    height: ms(24),
    borderRadius: ms(300),
  },
  senderProfileView: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: ms(10),
  },
  receiverProfileView: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: ms(10),
  },
  nameText: {
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(10),
    color: colors.blackShade02,
    width: '100%',
  },
  mentionStyle: {
    color: 'green',
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(14),
    minWidth: s(35),
  },

  urlFeedDescription: {
    fontSize: ms(16),
    fontWeight: '400',
    color: colorPalates.blueShade02,
  },
  mainCOntainer: {
    flexDirection: 'row',
    width: '100%',
  },
  profileAlign: {
    justifyContent: 'flex-end',
    marginBottom: s(5),
    bottom: 0,
  },
});
