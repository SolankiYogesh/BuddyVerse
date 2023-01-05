import {ms, s, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';
import colorPalates from '../../../../theme/colors/colorPalates';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  publicViewContainer: {
    width: '95%',
    alignSelf: 'center',
    padding: ms(10),
  },
  switchViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  privateText: {
    fontSize: ms(16),
    fontWeight: '500',
    fontFamily: fonts.primaryMediumFont,
    color: colors.blackShade02,
  },
  descriptionText: {
    fontSize: ms(14),
    fontWeight: '400',
    fontFamily: fonts.primaryRegularFont,
    color: colors.grayShade80,
  },
  btnContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.grayShadeCC,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: ms(10),
    borderRadius: ms(50),
    marginTop: ms(10),
  },
  listItems: {
    marginVertical: ms(10),
    width: '100%',
  },
  plusIcon: {
    width: ms(14),
    height: ms(14),
    tintColor: colors.blackShade02,
    marginRight: ms(10),
  },
  coverImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(20),
    overflow: 'hidden',
    height: ms(100),
    width: ms(100),
    alignSelf: 'center',
    marginTop: ms(5),
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: ms(5),
  },
  cancelMemberImageBack: {
    height: ms(20),
    width: ms(20),
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 2,
  },
  memberCoverImage: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(300),
  },

  coverImage: {
    width: '100%',
    height: '100%',
  },
  cancelImageBack: {
    height: ms(20),
    width: ms(20),
    position: 'absolute',
    zIndex: 1000,
    top: 5,
    right: 5,
  },
  seperator: {
    marginHorizontal: ms(5),
  },
  topright: {
    right: -5,
  },
  textContainer: {
    marginLeft: ms(10),
  },
  name: {
    fontSize: ms(11),
    fontFamily: fonts.primaryMediumFont,
    color: colors.blackShade02,
  },
  mutualText: {
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
    color: colors.grayShade8F,
  },
  roleContainer: {
    backgroundColor: colors.greenShade2A,
    borderRadius: ms(15),
    alignItems: 'center',
    justifyContent: 'center',
    padding: ms(5),
    paddingHorizontal: ms(10),
    marginRight: ms(10),
  },
  roleText: {
    fontSize: ms(10),
    fontFamily: fonts.primaryMediumFont,
    color: colors.white,
  },
  leftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  leaveContainer: {
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: ms(10),
    padding: ms(10)
  },
  thmemeTitle: {
    color: colors.white,
    marginHorizontal:ms(10),
    padding: ms(10),
    fontSize: ms(15),
    fontFamily: fonts.primaryMediumFont,
  },
  crossImage: {
    width: ms(20),
    height: ms(20),
    tintColor: colors.grayShade80,
    marginRight: ms(5),
  },
  viewContainer: {
    flex: 1,
    backgroundColor: colorPalates.white,
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
    paddingTop: s(10),
  },
});
