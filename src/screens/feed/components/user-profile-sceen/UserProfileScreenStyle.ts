import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';
import colors from '../../../../theme/colors/colors';
import fonts from '../../../../theme/fonts/fonts';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalates.white,
  },
  containerStyle: {
    flex: 1,
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
  },
  imgView: {
    width: ms(24),
    height: ms(24),
    tintColor: colors.blackShade02,
    top: -25,
  },
  profileImage: {
    marginLeft: ms(20),
  },
  profileNameContainer: {
    marginLeft: ms(16),
  },
  profileName: {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
    marginTop: ms(15),
  },
  profileUserName: {
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
    width: '100%',
    paddingHorizontal: s(15),
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: s(5),
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetails: {
    marginTop: ms(26),
    marginLeft: ms(35),
  },
  detailsText: {
    fontSize: ms(14),
    marginBottom: ms(10),
    height: ms(21),
  },
  detailsContainer: {
    flexDirection: 'row',
  },
  userDetailsText: {
    fontSize: ms(13),
    marginBottom: ms(10),
    color: colorPalates.black,
    height: ms(21),
  },
  friedsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: s(10),
    paddingLeft: ms(20),
    height: '100%',
    alignItems: 'center',
  },
  countrFriends: {
    fontSize: ms(20),
    color: colorPalates.black,
  },
  userFriendsContainer: {
    alignItems: 'center',
    borderRadius: ms(10),
    justifyContent: 'space-between',
    elevation: 8,
    backgroundColor: colorPalates.white,
    padding: ms(5),
    width: ms(70),
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
    fontSize: ms(11),
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
    height: vs(33),
    overflow: 'hidden',
    borderRadius: ms(50),
  },
  userIdText: {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(12),
    color: colorPalates.AppTheme.text,
    paddingHorizontal: s(16),
    marginTop: s(5),
  },
  dotMenuContainer: {
    width: ms(50),
    height: ms(50),
    borderRadius: ms(10),
    overflow: 'hidden',
    backgroundColor: colors.grayShadeCC,
    padding: ms(12),
  },
  gradientContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  editIcon: {
    width: vs(15),
    height: vs(15),
    tintColor: colors.white,
    marginRight: s(10),
  },
  addFreindButton: {
    width: '40%',
    height: ms(50),
  },
  followerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(15),
    marginBottom: ms(20),
    width: '90%',
    alignSelf: 'center',
    marginVertical: s(30),
  },
  followeBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: ms(10),
    borderRadius: ms(5),
    paddingHorizontal: ms(20),
    height: ms(50),
    elevation: 5,
    backgroundColor: colors.white,
  },
  followBtnText: {
    color: colorPalates.white,
    fontSize: ms(14),
    marginLeft: s(10),
  },
  aboutContainer: {
    padding: s(16),
  },
  aboutText: {
    marginTop: ms(8),
    color: colorPalates.AppTheme.text,
    fontSize: ms(16),
  },
  MessgeStyle: {
    fontFamily: fonts.primaryBoldFont,
    color: colors.blackShade02,
  },
  vipIcon: {
    width: s(20),
    height: s(20),
    position: 'absolute',
    right: 2,
    bottom: 0,
  },
});
