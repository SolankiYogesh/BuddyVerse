import {ms, s, ScaledSheet} from 'react-native-size-matters';
import colors from 'theme/colors/colors';
import colorPalates from '../../../../theme/colors/colorPalates';
import fonts from '../../../../theme/fonts/fonts';

export default ScaledSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorPalates.white,
  },
  containerStyle: {
    backgroundColor: colors.white,
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
    flex: 1,
  },
  container: {
    flex: 1,
  },
  gradientContainer: {
    alignItems: 'center',
    padding: ms(15),
    flexDirection: 'row',
  },
  followBtnText: {
    color: colorPalates.white,
    fontSize: ms(14),
  },
  friedsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '65%',
    height: '100%',
    paddingHorizontal: ms(15),
    alignItems: 'flex-end',
  },
  countrFriends: {
    fontSize: ms(20),
    color: colorPalates.black,
  },
  userFriendsContainer: {
    alignItems: 'center',
    borderRadius: ms(10),
    justifyContent: 'center',
    elevation: 8,
    backgroundColor: colorPalates.white,
    padding: ms(5),
    width: ms(75),
    height: ms(55),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  textFriends: {
    fontSize: ms(13),
    color: colorPalates.grayShadeAB,
  },
  postText: {
    height: ms(31),
    fontSize: ms(24),
    marginLeft: ms(20),
    color: colorPalates.black,
    marginBottom: ms(18),
  },
  pencileIcon: {
    marginTop: ms(18),
    marginRight: ms(23),
  },
  btnView: {
    width: s(120),
    height: ms(50),
    borderRadius: ms(10),
    overflow: 'hidden',
  },
  dotMenuContainer: {
    width: ms(50),
    height: ms(50),
    borderRadius: ms(10),
    overflow: 'hidden',
    backgroundColor: colors.grayShadeCC,
    padding: ms(12),
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(15),
    justifyContent: 'space-between',
    padding: s(5),
    marginTop: s(5),
  },

  profileImage: {width: ms(80), height: ms(80), borderRadius: 1000},
  profileName: {
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
    width: '100%',
    paddingHorizontal: s(15),
  },
  headText: {
    fontSize: ms(22),
    fontWeight: '600',
    color: colorPalates.AppTheme.text,
    paddingHorizontal: s(15),
    marginVertical: s(15),
  },
  editIcon: {
    width: s(18),
    height: s(18),
  },
  editIconView: {
    marginRight: ms(12),
    // width: s(35),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: s(10),
  },
  userIdText: {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(12),
    color: colorPalates.AppTheme.text,
    paddingHorizontal: s(16),
    marginTop: s(5),
  },
  verifyIcon: {
    width: s(20),
    height: s(20),
    position: 'absolute',
    right: 2,
    bottom: 0,
  },
  ProfileBadgeVerify: {
    height: ms(22),
    width: ms(22),
  },
  verifyImage: {
    width: s(20),
    height: s(20),
    position: 'absolute',
    right: -4,
    bottom: 25,
  },
  detailsView: {
    flexDirection: 'row',
    padding: s(10),
  },
  titleText: {
    color: colors.grayShade8F,
    fontSize: s(14),
    width: s(90),
    fontWeight: '400',
  },
  descText: {
    flex: 1,
    marginLeft: s(5),
    color: colors.blackShade20,
    fontSize: s(14),
    fontWeight: '400',
  },
  themeContainer: {
    width: '100%',
    paddingHorizontal: s(15),
  },
  chatCommentText: {
    fontSize: ms(13),
    fontFamily: fonts.primaryRegularFont,
    color: colorPalates.grayShade80,
    marginLeft: ms(15),
  },
  rowThemeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(10),
  },
  editProfileText: {
    color: colorPalates.AppTheme.primary,
    fontSize: ms(12),
    fontFamily: fonts.primaryRegularFont,
  },
});
