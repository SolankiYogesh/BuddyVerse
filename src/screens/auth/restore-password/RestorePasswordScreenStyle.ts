import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1},
  headerTitle: {
    fontSize: ms(24),
    fontWeight: 'bold',
    marginTop: ms(30),
    color: colorPalates.AppTheme.text,
  },
  restorePasswordTextInput: {
    height: ms(48),
    padding: ms(16),
    marginTop: ms(24),
    borderColor: colorPalates.grayShadeCC,
    borderWidth: ms(1),
    borderRadius: ms(50),
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
  },
  restorePasswordText: {
    textAlign: 'center',
    marginTop: ms(12),
    paddingHorizontal: ms(20),
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
  },
  sendCodeButton: {
    marginHorizontal: ms(16),
    marginTop: ms(32),
    borderRadius: ms(50),
  },
  sendCodeButtonTitle: {
    fontSize: ms(16),
    color: colorPalates.white,
  },
  cancelButton: {
    marginHorizontal: ms(16),
    marginTop: ms(16),
    backgroundColor: colorPalates.grayShadeCC,
    height: ms(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(50),
  },
});
