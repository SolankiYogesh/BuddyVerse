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
  verificationCodeText: {
    textAlign: 'center',
    marginTop: ms(12),
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
  },
  verificationCodeTextInput: {
    height: ms(48),
    padding: ms(16),
    marginTop: ms(24),
    borderColor: colorPalates.grayShadeCC,
    borderWidth: ms(1),
    borderRadius: ms(50),
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
  },
  resendButton: {
    marginHorizontal: ms(16),
    marginTop: ms(32),
    borderRadius: ms(50),
  },
  verifyEmailButton: {
    marginHorizontal: ms(16),
    marginTop: ms(32),
    borderRadius: ms(50),
  },
  resendButtonTitle: {
    fontSize: ms(16),
    color: colorPalates.white,
  },
  verificationCodeTextContainer: {
    textAlign: 'center',
    fontSize: ms(14),
    marginTop: ms(24),
    marginHorizontal: ms(16),
  },
});
