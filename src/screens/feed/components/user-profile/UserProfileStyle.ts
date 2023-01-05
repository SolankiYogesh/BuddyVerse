import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  viewMyPage: {
    marginTop: ms(10),
    marginHorizontal: ms(16),
    marginBottom: ms(4),
    borderRadius: 50,
  },
  profileImage: {
    // backgroundColor:colorPalates.grayShadeAB,

    marginTop: ms(16),
    marginLeft: ms(16),
  },
  logoutButtonTitle: {
    color: colorPalates.redShadeDF,
    fontSize: ms(16),
    padding: ms(16),
  },
  logoutButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: ms(16),
  },
});
