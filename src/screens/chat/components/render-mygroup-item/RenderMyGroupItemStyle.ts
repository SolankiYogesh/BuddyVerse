import {ms, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  mainContainer: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    padding: ms(10),
    width: '90%',
    borderRadius: ms(10),
    backgroundColor: colors.white,
    marginVertical: ms(5),
    margin: ms(10),
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(300),
  },
  verticalTextView: {
    flex: 1,
    marginStart: ms(20),
  },
  groupName: {
    fontSize: ms(16),
    fontFamily: fonts.primaryMediumFont,
    color: colors.blackShade02,
  },
  membersCount: {
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
    color: colors.grayShade80,
  },
  timeText: {
    fontSize: ms(10),
    fontFamily: fonts.primaryMediumFont,
    color: colors.grayShade80,
    alignSelf: 'flex-start',
  },
  btnWithTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  smallIcon: {
    width: ms(13),
    height: ms(13),
    tintColor: colors.grayShade80,
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
    color: colors.grayShade80,
    marginHorizontal: ms(10),
  },
  joiBtnView: {
    padding: ms(10),
    borderRadius: ms(10),
    paddingHorizontal: ms(10),
    backgroundColor: colors.grayShadeCC,
  },
  joinBtnText: {
    fontSize: ms(14),
    fontFamily: fonts.primaryMediumFont,
    color: colors.white,
  },
  cn2: {
    width: '78%',
    alignSelf: 'flex-end',
  },
  flex: {
    justifyContent:"flex-end"
  },
});
