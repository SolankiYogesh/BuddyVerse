import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1},
  header: {fontSize: ms(16)},
  goToLoginButton: {
    marginHorizontal: ms(16),
    marginTop: ms(32),
    borderRadius: 50,
  },
  goToLoginButtonTitle: {
    fontSize: ms(16),
    color: colorPalates.white,
  },
  checkMark: {
    height: ms(64),
    width: ms(64),
    alignItems: 'center',
    marginTop: ms(40),
  },
  passwordSuccessText: {
    fontSize: ms(24),
    fontWeight: 'bold',
    marginTop: ms(30),
    textAlign: 'center',
    color:colorPalates.AppTheme.text,
  },
});
