import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates, fonts} from 'theme';

export default ScaledSheet.create({
  container: {
    flex: 1,
  },
  switchContainer: {
    marginTop: ms(14),
    height: ms(84),
    justifyContent: 'center',
  },
  switchText: {
    marginLeft: ms(16),
    fontSize: ms(14),
  },
  commentsBlockText: {
    marginTop: ms(16),
    marginLeft: ms(16),
    fontSize: ms(12),
  },
  addPersonbtn: {
    marginTop: ms(16),
    marginHorizontal: ms(16),
    marginBottom: ms(15),
  },
  profile: {
    paddingVertical: ms(10),
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  profileImage: {
    width: ms(48),
    height: ms(48),
    borderRadius: 1000,
    marginLeft: ms(16),
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileNameContainer: {
    marginLeft: ms(16),
  },
  profileName: {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
  },
  cancelIcon: {
    marginVertical: ms(16),
    marginRight: ms(16),
    // margin: ms(24)
  },
});
