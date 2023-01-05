import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';
import colors from '../../../../theme/colors/colors';
import fonts from '../../../../theme/fonts/fonts';

export default ScaledSheet.create({
  container: {flex: 1, backgroundColor: colorPalates.white},

  feedDetailProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(16),
    marginBottom: s(10),
  },
  noFeedView: {alignItems: 'center', justifyContent: 'center', flex: 1},
  profileImage: {width: ms(48), height: ms(48), borderRadius: 1000},
  profileDetailContainer: {
    marginLeft: ms(16),
  },
  profileName: {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
  },
  noFeedText: {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(18),
  },
  profileUserName: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(12),
    color: colorPalates.AppTheme.text,
    lineHeight: ms(18),
  },
  feedTime: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(12),
    color: colorPalates.grayShade8F,
  },
  feedDescription: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
    marginTop: ms(16),
  },
  feedImage: {
    width: '100%',
    aspectRatio: 1.33,
    borderRadius: ms(8),
  },
  actionContainer: {
    flexDirection: 'row',
    marginVertical: ms(12),
    alignItems: 'center',
  },
  commentIcon: {width: ms(20), height: ms(20)},
  actionCount: {
    fontSize: ms(12),
    color: colorPalates.grayShade80,
    marginRight: ms(16),
    marginLeft: ms(4),
    fontFamily: fonts.primaryMediumFont,
  },
  heartIcon: {width: ms(26), height: ms(26)},
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'tan',
    overflow: 'hidden',
    borderRadius: ms(8),
  },
  fullScreenVideoModal: {
    margin: 0,
    flex: 1,
    backgroundColor: colorPalates.black,
  },
  fullScreenVideoModalContainer: {
    flex: 1,
    backgroundColor: colorPalates.black,
    // padding: ms(16),
    borderRadius: ms(16),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenVideo: {width: '100%', flex: 1},
  greenTalkTextStyle: {
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(16),
    color: 'green',
    marginTop: ms(16),
  },
  devider: {
    width: '100%',
    height: vs(1),
    backgroundColor: colors.grayShadeC8,
    margin: ms(10),
  },
  GreenTalkcontainerDevider: {
    width: '100%',
    height: vs(1),
    backgroundColor: colors.grayShadeC8,
    marginBottom: s(10),
  },
  GreenTalkcontainer: {
    flex: 1,
    padding: s(10),
  },
  viewContainer: {
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
    marginTop: ms(10),
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
