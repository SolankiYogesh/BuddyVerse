import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1},
  header: {fontSize: ms(16)},
  passwordTermTextTop: {
    textAlign: 'center',
    marginTop: ms(12),
    fontSize: ms(16),
  },
  passwordTextContainer: {
    height: ms(48),
    padding: ms(16),
    marginTop: ms(24),
    borderColor: colorPalates.grayShadeCC,
    borderWidth: ms(1),
    borderRadius: ms(4),
    fontSize: ms(16),
    color:colorPalates.AppTheme.text
  },
  savePasswordButton: {
    marginHorizontal: ms(16),
    marginTop: ms(32),
  },
  savePasswordTitle: {
    fontSize: ms(16),
    color: colorPalates.white,
  },
  passwordTermTextBottom: {
    textAlign: 'center',
    fontSize: ms(14),
    marginTop: ms(24),
    opacity: 0.7,
  },
  changePasswordTitle: {
    fontSize: ms(24),
    fontWeight: 'bold',
    marginTop: ms(30),
  },
});
